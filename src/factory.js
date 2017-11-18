import {
  createErrorResponse,
  createSuccessResponse,
  createNotFoundResponse,
} from './apiResponseWrapper'
import isResultEmpty from './isResultEmpty'

const factory = (service, validate) => {
  return async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {
      if (validate) {
        try {
          const errors = await validate(event)
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
      const result = await service(event, context)
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
