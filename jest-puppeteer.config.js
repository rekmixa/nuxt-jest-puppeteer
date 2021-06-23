require('dotenv').config()

const noSandboxArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox'
]

module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === 'true',
    executablePath: process.env.CHROME_PATH,
    args: process.env.NO_SANDBOX === 'true' ? noSandboxArgs : [],
    product: 'chrome',
  },
  browserContext: 'default',
}
