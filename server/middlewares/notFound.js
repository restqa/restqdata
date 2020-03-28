module.exports = function (req, res, next) {
  next(new $.errors.E404('No API found with those values'))
}
