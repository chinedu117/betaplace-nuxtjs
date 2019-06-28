import axios from 'axios'
import * as API from '@/api'


   export const state = () => {
     return {
        token: null, //JSON.parse(localStorage.getItem('betaplace')).auth.token || null,
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
            // localStorage.removeItem('user')
          },
      
        //set token in the local storage after successfull log in 
          saveToken(state, token) {
               
              const access_token  = 'Bearer ' + token
               state.token = access_token
               this.$cookies.set('x-access-token',access_token,{
                                      path: '/',
                                      maxAge: 60 * 60 * 24 * 7
                                    })
               // this.$cookies.set('x-access-token', access_token, 60 * 60 * 24 * 30)
      
              // localStorage.setItem('access_token',access_token)
          },
          
          //clear the toekn from local storage after succccesfull logout
          clearToken(state) {
      
              //localStorage.removeItem('access_token')
              state.token = null
              //localStorage.removeItem('user')
              state.user = null
              this.$cookies.remove('x-access-token')
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
            //const betaplace = JSON.parse(localStorage.getItem('betaplace'))
            return state.user //== null ? betaplace.auth.user : state.user
        },
        getToken(state) {
             // const token = this.$cookies.get('x-access-token')
             
             const betaplace = JSON.parse(localStorage.getItem('betaplace'))

            return state.token //== null ?  betaplace.auth.token : state.token
        },
        loggedIn(state) {
            
           // const betaplace = JSON.parse(localStorage.getItem('betaplace'))
            // console.log(betaplace.auth.token)
            return !!state.token //!= null //|| betaplace.auth.token != null
        }


    }
  
    export const actions = {
    
    async uploadProfileImage({getters},formData){
        
        axios.defaults.headers.common['Authorization'] = getters.getToken
        
           return await axios.post(API.AGENT_PROFILE_IMAGE_UPLOAD_URL,formData)
              
    },
         
   async  retrieveUser({state, commit, getters}) {

        axios.defaults.headers.common['Authorization'] =  getters.getToken
        try {

         const  { data } = await axios.get(API.USER_INFO_URL)      
           await  commit('saveUser', data)
        }catch(e){
           console.log("unable to retrieve user info")
        }
              
      },
  
   async  logout({state, commit, getters}) {
        
        
        axios.defaults.headers.common['Authorization'] = getters.getToken
  
        if(getters.loggedIn){
             try {
                   await axios.post(API.LOGOUT_URL)
                  
                     commit('clearToken')
                     commit('clearUser')
               }catch(e){
                      commit('clearToken')
                      commit('clearUser')
               }
  
        }
        
        
      },
  
      async register({state, commit},params) {
  
          //console.log(params)
          // console.log('auth store register callled');
          
          
              await commit('clearUser')
              const { data } = await  axios.post(API.REGISTER_URL,{
                         'name': params.name,
                         'password': params.password,
                         'email': params.email,
                         'password_confirmation': params.password_confirmation
                         }) 
                  
               commit('saveUser',data)
                
  
      },
  
     async login({state, commit}, credentials) {
          
         const { data } = await axios.post(API.LOGIN_URL,{
                               'username': credentials.username,
                               'password': credentials.password
                               })

          await commit('saveToken',data.access_token)
           
          
          
  
      },
      async socialLogin({state, commit},payload){
            
           const { data } =  await axios.post(API.SOCIAL_LOGIN_URL(payload.provider),payload)

             commit('saveToken',data.access_token)
                
      },

      
      async submitProfile({getters,dispatch},profile){

        axios.defaults.headers.common['Authorization'] = getters.getToken
       
        await axios.post(API.SUBMIT_PROFILE_URL,profile)
                
        await dispatch("retrieveUser")
               
      
    },
      
      async getMyProfile({commit,getters}){
        axios.defaults.headers.common['Authorization'] = getters.getToken
         
            let response  = await  axios.get(API.GET_MY_PROFILE_URL)

            await commit('place_view_store/addAgentInfo',response.data,{root: true})

            return response
      
      },

   async resendVerificationMail({getters}){

         if(!getters.getUser.email) return
        
         return  await axios.post(API.RESEND_VERIFICATION_MAIL_URL,{el:getters.getUser.email})
                
    },

   async forgotPassword({getters},payload){
          return await  axios.post(API.FORGOT_PASSWORD_URL,payload)
    
    },

    async resetPassword({getters},payload){
      
           return await axios.post(API.RESET_PASSWORD_URL,payload)
         
    },


}
  
