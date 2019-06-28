const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')


module.exports = {
  mode: 'spa',

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
    '~/plugins/app.js',
    { src: '~/plugins/app-no-ssr', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    '~/plugins/http.js',
    
    
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  generate: {
     fallback: true
  },
  
   /*
    ** Environement variables
    */
    // env: {
     
    // }, 

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
  ** Generate location
  */
   workbox: {
      runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: 'https://fonts.googleapis.com/.*',
        // Defaults to `networkFirst` if omitted
        // handler: 'networkFirst',
        // Defaults to `GET` if omitted
        // method: 'GET'
      }
    ]
  },

  

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
