import {
  createErrorResponse,
  createNotFoundResponse,
  createSuccessResponse,
} from '../apiResponseWrapper'

test('return success response for object', () => {
  const res = createSuccessResponse('test')
  expect(res).toEqual({
    body: '"test"',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
  })
})

test('return success response for array', () => {
  const res = createSuccessResponse(['test'])
  expect(res).toEqual({
    body: '{"data":["test"]}',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
  })
})

test('return not found response', () => {
  const res = createNotFoundResponse()
  expect(res).toEqual({
    body: '{"message":"Resource not found"}',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 404,
  })
})

test('return error response', () => {
  const res = createErrorResponse()
  expect(res).toEqual({
    body: '{"message":"Server error"}',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 500,
  })
})

test('return error response with custom message and status code', () => {
  const error = new Error('test error')
  error.statusCode = 401
  const res = createErrorResponse(error)
  expect(res).toEqual({
    body: '{"message":"test error"}',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 401,
  })
})
