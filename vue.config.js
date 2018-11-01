module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/koshel/'
    : '/',
  css: {
    sourceMap: true
  }
}