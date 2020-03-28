module.exports = function (err, req, res, next) {
  // $.log.error(err.toString())
  $.log.error(err)
  $.log.error(err.stack)
  if (!err.httpStatus) {
    err.httpStatus = 500
  }
  return res
    .status(err.httpStatus)
    .json({ message: err.message })
}
