import axios from 'axios'
import * as API from '@/api'


   export const state = () => {
     return {
        token: null, //localStorage.getItem('access_token') || null,
        user: null, //Object.assign({},JSON.parse(localStorage.getItem('user'))) || null
     }
        
    }
  
   export const  mutations = {
        saveUser(state, user) {
            
            //localStorage.removeItem('user')
            state.user = ""
            const loggedUser = user
            state.user = loggedUser
            //   localStorage.setItem('user',JSON.stringify(loggedUser))
      
          },

          clearUser(state){
            state.user = ""
            localStorage.removeItem('user')
          },
      
        //set token in the local storage after successfull log in 
          saveToken(state, token) {
               
              const access_token  = 'Bearer ' + token
               state.token = access_token
      
              // localStorage.setItem('access_token',access_token)
          },
          
          //clear the toekn from local storage after succccesfull logout
          clearToken(state) {
      
              //localStorage.removeItem('access_token')
              state.token = null
              //localStorage.removeItem('user')
              state.user = null
          }
          
    }

    export const getters = {

        userEmailVerified(state){

            return state.user ? state.user.email_verified_at !== null : false
        },
        
        userHasProfile(state){
            return state.user ? state.user.has_profile === true : false
        },
        getUser(state) {
            
            return state.user //== null ? Object.assign({},JSON.parse(localStorage.getItem('user'))) : state.user
        },
        getToken(state) {
            
            return state.token //== null ?  localStorage.getItem('access_token') : state.token
        },
        loggedIn(state) {

            return state.token != null
        }


    }
  
    export const actions = {
    //   clear ({ state, commit, rootState, dispatch }) {
    //     commit('clear')
    //     dispatch('auth/clear', {}, { root: true })
    //   },
    //
    uploadProfileImage({getters},formData){
        
        axios.defaults.headers.common['Authorization'] = getters.getToken
          
        return new Promise((resolve,reject) => {
  
            axios.post(API.AGENT_PROFILE_IMAGE_UPLOAD_URL,formData)
                .then(function (response) {
                 
                 resolve(response)
                  })
                .catch(function (error) {
                     reject(error)
                 })
                })
    },
         
    retrieveUser({state, commit, getters}) {

        axios.defaults.headers.common['Authorization'] = getters.getToken
          
        return new Promise((resolve,reject) => {
  
            axios.get(API.USER_INFO_URL)
                .then(function (response) {
                  
                 // console.log(response.data)
                  //save the token to local storage
                 // console.log(response.data)
                 commit('saveUser', response.data)
                 resolve(response)
                  })
                .catch(function (error) {
  
                     // console.log(error)
                     reject(error)
                 })
  
          })
      },
  
      logout({state, commit, getters}) {
        
        
        axios.defaults.headers.common['Authorization'] = getters.getToken
  
        if(getters.loggedIn){
  
          return new Promise( (resolve,reject) => {
            axios.post(API.LOGOUT_URL)
                .then((response) => {
  
                  //clear tkoen from the local storage and the state
                   commit('clearToken')
                  //console.log(response)
                  
                 
                 resolve(response)
                  })
                .catch((error)=> {
                     
                    commit('clearToken')
                     // console.log(error)
                     reject(error)
                 })
          
  
        })
  
        }
        
        
      },
  
      register({state, commit},params) {
  
          //console.log(params)
          // console.log('auth store register callled');
          
          return new Promise((resolve,reject) => {
             
             //clear any user saved
             commit('clearUser')
            axios.post(API.REGISTER_URL,{
                       'name': params.name,
                       'password': params.password,
                       'email': params.email,
                       'password_confirmation': params.password_confirmation
                       }) 
                .then(function (response) {
                   
                 // console.log(response)
                  //save the token to local storage
                //  context.commit('saveToken',response.data.access_token)
                   commit('saveUser',response.data)
                 resolve(response)
                  })
                .catch(function (error) {
  
                     //console.log(error)
                     reject(error)
                 })
  
          })
  
      },
  
      login({state, commit}, credentials) {
          
          
          return new Promise((resolve,reject) => {
  
            axios.post(API.LOGIN_URL,{
                       'username': credentials.username,
                       'password': credentials.password
                       })
                .then(function (response) {
                  
                  /// console.log(response)
                  //save the token to local storage
                 commit('saveToken',response.data.access_token)
           
                 resolve(response)
                  })
                .catch(function (error) {
  
                     // console.log(error)
                     reject(error)
                 })
  
          })
          
  
      },
      socialLogin({state, commit},payload){
            return new Promise((resolve,reject) => {
  
            axios.post(API.SOCIAL_LOGIN_URL(payload.provider),payload)
                .then(function (response) {
                 commit('saveToken',response.data.access_token)
                 resolve(response)
                  })
                .catch(function (error) {
  
                     // console.log(error)
                     reject(error)
                 })
  
          })
      },

      
      submitProfile({getters,dispatch},profile){

        axios.defaults.headers.common['Authorization'] = getters.getToken

          return new Promise( (resolve,reject) => {
            axios.post(API.SUBMIT_PROFILE_URL,profile)
                .then((response) => {
                  dispatch("retrieveUser")
                 resolve(response)
                  })
                .catch((error)=> {
                     reject(error)
                 })
        })
      
    },
      
      getMyProfile({getters}){
        axios.defaults.headers.common['Authorization'] = getters.getToken
          return new Promise( (resolve,reject) => {
            axios.get(API.GET_MY_PROFILE_URL)
                .then((response) => {
                 resolve(response)
                  })
                .catch((error)=> {
                     reject(error)
                 })
          
  
        })
      
      },

      resendVerificationMail({getters}){

         if(!getters.getUser.email) return
         return new Promise( (resolve,reject) => {
            axios.post(API.RESEND_VERIFICATION_MAIL_URL,{el:getters.getUser.email})
                .then((response) => {
                 resolve(response)
                  })
                .catch((error)=> {
                     reject(error)
                 })
      })
    },

    forgotPassword({getters},payload){
        return new Promise( (resolve,reject) => {
            axios.post(API.FORGOT_PASSWORD_URL,payload)
                .then((response) => {
                 resolve(response)
                  })
                .catch((error)=> {
                     reject(error)
                 })
      })
    },

    resetPassword({getters},payload){
        return new Promise( (resolve,reject) => {
            axios.post(API.RESET_PASSWORD_URL,payload)
                .then((response) => {
                 resolve(response)
                  })
                .catch((error)=> {
                     reject(error)
                 })
      })
    },


}
  