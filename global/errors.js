function ApiError (httpStatus) {
  const status = httpStatus
  return function (message) {
    const err = new Error(message)
    err.httpStatus = status
    return err
  }
}
module.exports = {
  E401: ApiError(401),
  E403: ApiError(403),
  E404: ApiError(404),
  E406: ApiError(406),
  E500: ApiError(500)
}
