import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation' 
import veeValidate from 'vee-validate'
import VueCookie from 'vue-cookie'
import  SocialSharing from 'vue-social-sharing'
import VueSocialauth from 'vue-social-auth'
import ReadMore from 'vue-read-more'
Vue.use(ReadMore)           

// Vue.use(ReadMore)
Vue.use(VueSocialauth, {

  providers: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      redirectUri: process.env.FACEBOOK_CALLBACK_URL,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.GOOGLE_CALLBACK_URL,
    },

  }
})

Vue.use(SocialSharing)
Vue.use(veeValidate)
Vue.use(VueCookie)
Vue.use(VueGeolocation)