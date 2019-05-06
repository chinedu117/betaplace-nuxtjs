import axios from 'axios'
// import store from '~/store/index.js'
import Vue from 'vue'
import store from 'vuex'
//here we want to use this to make api calls
export const http  = {
  install (Vue , options) 
  { 
    if (process.SERVER_BUILD) return
    Vue.prototype.$http = Vue.http = axios.create()
    this.addInterceptors()
  },
  
  addInterceptors()
  {
    if (process.SERVER_BUILD) return
    if(store.getters['auth/getToken'])
    {
      Vue.http.interceptors.request.eject() //clears previoius token
      Vue.http.interceptors.request.use(function(config){
        const token = store.getters['auth/getToken']
        config.headers.Authorization = token ? token : ''
        return config
      })
    }
      
    // Intercept the response and refresh (one retry) if invalid token.
    Vue.http.interceptors.response.use(function (response) {
        
        // console.log('intercepted');
        if(response.data.message !== undefined && response.data.message !== '')
        {
          store.dispatch('common/updateSnackBar',{
            show: true,
            msg: response.data.message,
            color: ''
            })
        }
        return Promise.resolve(response)
  
        
      }, function (error) {
         //reply to errors due to network problems
        if(error.request){
            store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Network Error: Please check your network',
                color: 'red'
                })
            
        }

        if(error.response){
            store.dispatch('common/updateSnackBar',{
             show: true,
             msg: error.response.data.message,
             color: ''
             })
             
        }
        
        return Promise.reject(error)
      })
    }
}

