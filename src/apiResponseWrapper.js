export const createSuccessResponse = data => ({
  statusCode: 200,
  headers: {
    'Content-Type':
      typeof data === 'string' ? 'text/plain' : 'application/json',
  },
  body: !Array.isArray(data)
    ? typeof data === 'string' ? data : JSON.stringify(data)
    : JSON.stringify({
        data,
      }),
})

export const createErrorResponse = err => ({
  statusCode: err && err.statusCode ? err.statusCode : 500,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    err && err.statusCode && err.message ? err.message : 'Server error'
  ),
})

export const createNotFoundResponse = () => ({
  statusCode: 404,
  headers: {
    'Content-Type': 'application/json',
  },
  body: 'Resource not found',
})
