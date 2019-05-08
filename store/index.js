import Vue from 'vue'
export const strict = false

export const state = () => {
  return {
    
  }
}

export const actions = {

	 // async nuxtServerInit ({dispatch,commit},{ req, route, app, store }) {
	 // 	console.log("store called")
  //       // let cookies = new Cookies(req)
  //       // let token = cookies.get('x-access-token')
	 //   const token = app.$cookies.get('x-access-token')
  //        console.log("token from cookie is "+token)
	 //    if (token) {
	 //      try {
	 //        await commit('auth/saveToken', token)
	 //        await dispatch('auth/retrieveUser', token)
	 //      } catch(e) {
	 //        console.log("error occured "+e)
	 //        try{
	 //        	console.log("logging out")
	 //        	await dispatch('auth/logout')
	 //          } catch (e){
	 //          	 console.log("error logging out "+e)
	 //          }


	 //      }
	 //    }
  // }
}
