const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/app',
    { src: '~/plugins/http', ssr: true },
    { src: '~/plugins/app-no-ssr', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false }

    
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** Environement variables
    */
    env: {
      ROOT_URL: '"http://localhost:3000"',
      ROOT_API: '"http://betaplace.test/api"',
      GOOGLE_CLIENT_ID: '"41873985302-224fgf0n2hk74ejp413fk01fca5a07s0.apps.googleusercontent.com"',
      GOOGLE_CALLBACK_URL: '"http://localhost:3000/login/google/callback"',
      FACEBOOK_CLIENT_ID: '"838567409811629"',
      FACEBOOK_CALLBACK_URL: '"http://localhost:3000/login/facebook/callback"',
      PAYSTACK_PUBLIC_KEY: '" pk_test_22bdd340817a7abd23c1ade4fb5f131c60be3e7f"',
      CONTACT_EMAIL: '"contact@betaplace.com.ng"',
      PHONE_NUMBER_HELP_TWO: '"09929994949"',
      PHONE_NUMBER_HELP_ONE: '"009593942949"'
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
