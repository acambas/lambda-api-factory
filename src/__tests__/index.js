import apiFactory from '../index'

test('test simple api service', async () => {
  const service = async () => {
    return 5
  }
  const handler = apiFactory(service)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '5',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
      },
    ],
  ])
})

test('test simple api service with body', async () => {
  const service = async () => {
    return 5
  }
  const handler = apiFactory(service)
  const callback = jest.fn()
  await handler(
    {
      queryStringParameters: {},
      pathParameters: {},
      body: JSON.stringify({ test: 'test value' }),
      headers: { 'Content-Type': 'application/json' },
    },
    {},
    callback
  )
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '5',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
      },
    ],
  ])
})

test('it should fail because body is in wrong format', async () => {
  const service = async () => {
    return 5
  }
  const handler = apiFactory(service)
  const callback = jest.fn()
  await handler(
    {
      body: '{',
      headers: { 'Content-Type': 'application/json' },
    },
    {},
    callback
  )
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body:
          '{"message":"There was an issue with request body, it cant be parsed into valid JSON"}',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
      },
    ],
  ])
})

test('test simple api service that returns empty result', async () => {
  const service = async () => {
    return
  }
  const handler = apiFactory(service)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '{"message":"Resource not found"}',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 404,
      },
    ],
  ])
})

test('test simple api service with sync service', async () => {
  const service = () => {
    return 5
  }
  const handler = apiFactory(service)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '5',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
      },
    ],
  ])
})

test('test api service with validation', async () => {
  const service = () => {
    return 5
  }
  const validate = () => {}
  const handler = apiFactory(service, validate)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '5',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
      },
    ],
  ])
})

test('test api service with validation that throws exception', async () => {
  const service = () => {
    return 5
  }
  const validate = () => {
    throw new Error('validation issues')
  }
  const handler = apiFactory(service, validate)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '{"message":"validation issues"}',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
      },
    ],
  ])
})

test('test api service with validation that throws exception', async () => {
  const service = () => {
    return 5
  }
  const validate = () => {
    throw new Error('validation issues')
  }
  const handler = apiFactory(service, validate)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toEqual([
    [
      null,
      {
        body: '{"message":"validation issues"}',
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
      },
    ],
  ])
})

test('test api service with validation that returns error object', async () => {
  const service = () => {
    return 5
  }
  const validate = () => {
    return { msg: 'some value is wrong :)' }
  }
  const handler = apiFactory(service, validate)
  const callback = jest.fn()
  await handler({}, {}, callback)
  expect(callback.mock.calls).toMatchSnapshot()
})
