module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/koskel/'
    : '/',
  css: {
    sourceMap: true
  }
}