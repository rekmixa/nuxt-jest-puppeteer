import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'

describe('Register & Auth & Change profile test', () => {
  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: true,
    fps: 25,
    videoFrame: {
      width: 1024,
      height: 768,
    },
    aspectRatio: '4:3',
  })

  beforeAll(async () => {
    await page.goto(`http://${process.env.DOMAIN}`)

    await page.setViewport({
      width: 1920,
      height: 1080,
    })

    if (process.env.PUPPETEER_RECORD_VIDEO === 'true') {
      await recorder.start(process.env.PUPPETEER_RECORD_FILE_NAME)
    }
  })

  afterAll(async () => {    
    if (process.env.PUPPETEER_RECORD_VIDEO === 'true') {
      await recorder.stop()
    }
  })

  describe('Register test', () => {
    it('see welcome page title', async () => {
      await expect(page).toMatchElement('.title', { text: 'Добро пожаловать на сайт!' })
    })
  
    it('click register link', async () => {
      await expect(page).toClick('a', { text: 'Регистрация' })
      await expect(page).toMatchElement('.title', { text: 'Регистрация' })
    })
  
    it('see error if login are empty', async () => {
      await expect(page).toClick('button', { text: 'Зарегистрироваться' })
      await expect(page).toMatchElement('.error', { text: 'Введите логин' })
    })
  
    it('fill login input', async () => {
      await expect(page).toFill('input[name=login]', 'test-user@example.com')
    })
  
    it('see error if password are empty', async () => {
      await expect(page).toClick('button', { text: 'Зарегистрироваться' })
      await expect(page).toMatchElement('.error', { text: 'Введите пароль' })
    })
  
    it('fill password input', async () => {
      await expect(page).toFill('input[name=password]', 'password')
    })
  
    it('see error if password repeat are empty', async () => {
      await expect(page).toClick('button', { text: 'Зарегистрироваться' })
      await expect(page).toMatchElement('.error', { text: 'Введите подтверждение пароля' })
    })
  
    it('fill password repeat input', async () => {
      await expect(page).toFill('input[name=passwordRepeat]', 'wrongPassword')
    })
  
    it('see error if password repeat are wrong', async () => {
      await expect(page).toClick('button', { text: 'Зарегистрироваться' })
      await expect(page).toMatchElement('.error', { text: 'Пароли не совпадают' })
    })
  
    it('fill password repeat input right', async () => {
      await expect(page).toFill('input[name=passwordRepeat]', 'password')
    })
  
    it('register account', async () => {
      await expect(page).toClick('button', { text: 'Зарегистрироваться' })
    })

    it('see no errors', async () => {
      await expect(page).not.toMatchElement('.error')
    })
  
    it('see logout link', async () => {
      await expect(page).toMatchElement('a', { text: 'Выйти' })
    })
  })

  describe('Logout test', () => {
    it('click logout link', async () => {
      await expect(page).toClick('a', { text: 'Выйти' })
      await expect(page).toMatchElement('.title', { text: 'Добро пожаловать на сайт!' })
    })
  })

  describe('Login test', () => {
    it('go to login page', async () => {
      await expect(page).toClick('a', { text: 'Авторизация' })
      await expect(page).toMatchElement('.title', { text: 'Авторизация' })
    })

    it('see error if login are empty', async () => {
      await expect(page).toClick('button', { text: 'Войти' })
      await expect(page).toMatchElement('.error', { text: 'Введите логин' })
    })

    it('fill login input', async () => {
      await expect(page).toFill('input[name=login]', 'not-existing-user@example.com')
    })

    it('fill password input', async () => {
      await expect(page).toFill('input[name=password]', 'wrondPassword')
    })

    it('see error if user does not exists', async () => {
      await expect(page).toClick('button', { text: 'Войти' })
      await expect(page).toMatchElement('.error', { text: 'Неверный логин или пароль' })
    })

    it('fill login input right', async () => {
      await expect(page).toFill('input[name=login]', 'test-user@example.com')
    })

    it('see error if password is wrong', async () => {
      await expect(page).toClick('button', { text: 'Войти' })
      await expect(page).toMatchElement('.error', { text: 'Неверный логин или пароль' })
    })

    it('fill password input right', async () => {
      await expect(page).toFill('input[name=password]', 'password')
    })

    it('login', async () => {
      await expect(page).toClick('button', { text: 'Войти' })
    })

    it('see no errors', async () => {
      await expect(page).not.toMatchElement('.error')
    })

    it('see logout link', async () => {
      await expect(page).toMatchElement('a', { text: 'Выйти' })
    })

    it('see login in logout link', async () => {
      await expect(page).toMatchElement('.small-text', { text: '(test-user@example.com)' })
    })
  })

  describe('Change profile test', () => {
    it('see change profile title', async () => {
      await expect(page).toMatchElement('.title', { text: 'Заполнение профиля' })
    })

    it('see error if lastName are empty', async () => {
      await expect(page).toClick('button', { text: 'Сохранить' })
      await expect(page).toMatchElement('.error', { text: 'Введите фамилию' })
    })

    it('fill lastName input', async () => {
      await expect(page).toFill('input[name=lastName]', 'LastName')
    })

    it('see error if firstName are empty', async () => {
      await expect(page).toClick('button', { text: 'Сохранить' })
      await expect(page).toMatchElement('.error', { text: 'Введите имя' })
    })

    it('fill firstName input', async () => {
      await expect(page).toFill('input[name=firstName]', 'FirstName')
    })

    it('change profile', async () => {
      await expect(page).toClick('button', { text: 'Сохранить' })
    })

    it('see no errors', async () => {
      await expect(page).not.toMatchElement('.error')
    })
  })
})
