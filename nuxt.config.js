require('dotenv').config()

export default {
  ssr: true,

  head: {
    title: 'nuxt-js-kit',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    './assets/styles/main.scss'
  ],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxtjs/dotenv',
  ],

  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],

  axios: {},

  build: {}
}
