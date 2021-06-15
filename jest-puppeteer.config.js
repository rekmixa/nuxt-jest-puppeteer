module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === 'true',
    product: 'chrome',
  },
  browserContext: 'default',
}
