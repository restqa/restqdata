const got = require('got')
const { URLSearchParams } = require('url')

const gSheet = got.extend({
  prefixUrl: `https://sheets.googleapis.com/v4/spreadsheets/${$.config.google_sheet.id}`,
  searchParams: {
    key: $.config.google_sheet.apikey
  },
  responseType: 'json'
})

module.exports = async function (sheet, rowIndex) {
  const path = 'values:batchGet'
  const options = {
    searchParams: new URLSearchParams([
      ['key', $.config.google_sheet.apikey],
      ['ranges', `${sheet}!1:1`],
      ['ranges', `${sheet}!${rowIndex}:${rowIndex}`]
    ])
  }
  let sheetData = await gSheet(path, options)
  sheetData = sheetData.body.valueRanges

  const titles = sheetData[0].values[0]
  const data = sheetData[1].values && sheetData[1].values[0]

  if (!data) {
    throw new $.errors.E404(`The data at the row ${rowIndex} doesn't exist`)
  }

  const result = titles.reduce((obj, item, index) => {
    obj[item] = data[index]
    return obj
  }, {})

  return result
}
