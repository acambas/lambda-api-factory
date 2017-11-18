[![CircleCI](https://circleci.com/gh/acambas/lambda-api-factory.svg?style=svg)](https://circleci.com/gh/acambas/lambda-api-factory)

# Lambda API factory

This is a small library that helps in reducing boilerplate and creating conventions with creating aws lambda HTTP API:

Most of the time your code for aws lambda will be something like:
```javascript
return async (event, context, callback) => {
  try {
    // code for VALIDATING inputs that are in event or context object
    if (event.foo === 'bar') {
      return callback({ //Boilerplate
        statusCode: 404, //Boilerplate
        headers: { //Boilerplate
          'Content-Type': 'application/json', //Boilerplate
        }, //Boilerplate
        body: JSON.stringify({
          message: 'foo cant be bar',
        }),//Boilerplate
      })
    }
    // Code that does SERVICE work
    const dbStuff = await getStuffFromDB(event.bar)
    const serviceStuff = await getStuffFromSomeService(context)

    return callback(null, { //Boilerplate
      statusCode: 200, //Boilerplate
      headers: { //Boilerplate
        'Content-Type': 'application/json', //Boilerplate
      }, //Boilerplate
      body: JSON.stringify({ dbStuff, serviceStuff }),  //Boilerplate
    })
  } catch (error) {
    callback(null, { //Boilerplate
      statusCode: 500,  //Boilerplate
      headers: {
        'Content-Type': 'application/json',  //Boilerplate
      },  //Boilerplate
      body: JSON.stringify(error),  //Boilerplate
    })
  }
}
```
As you can see most of the time code can be split into 2 categories:
- validation
- whatever the service is suppose to do, lets call this part service

This library helps reducing the boilerplate part of the code by passing service function to it(and validation if it exists) and it will return a lambda handler function that will output result as HTTP API response.


## lambda-api-factory

### service function
- The simplest way of using the lambda-api-factory is to pass it a function
that is supposed to return api result.
- The parameters that will be passed to the service function are 'event' and 'context' from the lambda handler function
- The function can be either synchronous or promise based
- if this service returns some result it handler will return 200 api
- in case this function returns null or undefined the API will return 404 not found response

Example with service part only:
```javascript
// handler.js
const lambdaFactory = require('lambda-api-factory')

const service = async (event, context) => {
  const stuffFromDB = await getStuffFromDb(event.foo, context)
  return stuffFromDB
}

module.exports.basicApi = lambdaFactory(service)
```

### validation
In case there is validation for the API you can pass a second parameter which is validation function and if the validation fails the API handler will return 400 Bad Request error with details of the validation. In order for validation to pass the function MUST not return any result (undefined or null is fine :) )
- The parameters that will be passed to the validation function are 'event' and 'context' from the lambda handler function
- The function can be either synchronous or promise based
- The function can either throw an error or return the result of validation and in either case it will cause validation to fail 

Example with validation that throws
```javascript
const lambdaFactory = require('lambda-api-factory')

const validate = async (event, context) => {
  if (event.foo === 'bar') {
    throw new Error(`foo can't be bar`)
  }
}

const service = async (event, context) => {
  const stuffFromDB = await getStuffFromDb(event.foo, context)
  return {
    stuffFromDB,
  }
}

module.exports.basicApi = lambdaFactory(service, validate)
```

Example with validation that return validation result
```javascript
const lambdaFactory = require('lambda-api-factory')

const validate = async (event, context) => {
  if (event.foo === 'bar') {
    return { message: `foo can't be bar`}
  }
}

const service = async (event, context) => {
  const stuffFromDB = await getStuffFromDb(event.foo, context)
  return {
    stuffFromDB,
  }
}

module.exports.basicApi = lambdaFactory(service, validate)
```

## Notes
Some of the benefits of using this library
- less boilerplate code
- unified way of writing APIs
- separation of concerns (split validation from service code)
- easier testing (handler was split into smaller pieces)


It was built using:
- eslint for linting
- prettier for code reformating 
- babel for building
- jest for testing