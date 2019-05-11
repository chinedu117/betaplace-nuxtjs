import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = Vue.http = axios.create()


export default ({store}) => {
 
  // if (process.server) {
  //   return
  // }


    
    if(store.state.auth.token)
    {
      Vue.http.interceptors.request.eject() //clears previoius token
      Vue.http.interceptors.request.use(function(config){
        const token = store.state.auth.token
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
    
  // $axios.interceptors.request.use(request => {
  //   request.baseURL = 'https://api.com/api/'

  //   // Get token from auth.js store
  //   const token = store.state.token

  //   // Update token axios header
  //   if (token) {
  //     request.headers.common['Authorization'] = token
  //   }
  //   return request
  // })
}

