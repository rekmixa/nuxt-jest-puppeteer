require('dotenv').config()

const args = [
  '--disable-dev-shm-usage',
]

if (process.env.NO_SANDBOX === 'true') {
  args.push('--no-sandbox')
  args.push('--disable-setuid-sandbox')
}

module.exports = {
  launch: {
    dumpio: true,
    slowMo: Number(process.env.SLOWMO || 0),
    headless: process.env.HEADLESS === 'true',
    executablePath: process.env.CHROME_PATH,
    args,
    product: 'chrome',
  },
  browserContext: 'default',
}
