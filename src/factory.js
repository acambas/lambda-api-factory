import {
  createErrorResponse,
  createSuccessResponse,
  createNotFoundResponse,
} from './apiResponseWrapper'
import isResultEmpty from './isResultEmpty'

const factory = (service, validate) => {
  return async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let newEvent = event
    try {
      if (!event.queryStringParameters) {
        event.queryStringParameters = {}
      }
      if (!event.pathParameters) {
        event.pathParameters = {}
      }
      if (
        event &&
        event.headers &&
        event.headers['Content-Type'] === 'application/json'
      ) {
        try {
          newEvent = { ...event, body: JSON.parse(event.body) }
        } catch (err) {
          const error = new Error(
            'There was an issue with request body, it cant be parsed into valid JSON'
          )
          error.statusCode = 400
          throw error
        }
      }
      if (validate) {
        try {
          const errors = await validate(newEvent, context)
          if (errors) {
            const error = new Error(
              `Validation error: 
              ${JSON.stringify(errors, null, 2)}`
            )
            error.statusCode = 400
            throw error
          }
        } catch (error) {
          error.statusCode = 400
          throw error
        }
      }
      const result = await service(newEvent, context)
      if (!isResultEmpty(result)) {
        callback(null, createSuccessResponse(result))
      } else {
        callback(null, createNotFoundResponse())
      }
    } catch (error) {
      callback(null, createErrorResponse(error))
    }
  }
}
module.exports = factory
