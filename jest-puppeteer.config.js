require('dotenv').config()

module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === 'true',
    executablePath: process.env.CHROME_PATH,
    product: 'chrome',
  },
  browserContext: 'default',
}
