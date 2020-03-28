module.exports = {
  port: process.env.PORT || '8080',
  env: process.env.ENV,
  google_sheet: {
    id: process.env.GOOGLE_SHEEET_ID,
    apikey: process.env.GOOGLE_SHEEET_API_KEY
  }
}
