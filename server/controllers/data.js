const Data = require('../services/data')

async function get (req, res, next) {
  try {
    const { resource, row } = req.params

    if (!resource) throw new $.errors.E406('Please define the resource')
    if (!row) throw new $.errors.E406('Please define the row index')

    const result = await Data.get(resource, row)
    return res.json(result)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  get
}
