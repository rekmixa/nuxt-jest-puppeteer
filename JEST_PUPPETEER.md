# Installation

https://jestjs.io/ru/docs/puppeteer

Node JS requirements:  
`^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0`

```bash
yarn add puppeteer puppeteer-core jest-puppeteer --dev
```

Add to *jest.config.js*:  

```js
preset: 'jest-puppeteer',
```

## Run first test

```bash
yarn test tests/hello-world.test.js
```
