export default function ({$axios, store}){
	
    	
             
            

             $axios.onRequest(function(config) {
                   
                  if(store.state.common.validation_errors.length > 0){

                     store.dispatch("common/updateServerValidationErrors",null)
                  }

                   if(store.state.auth.token)
                   {  
                   const token = store.state.auth.token
                   // console.log("New Token is   "+ token)
                   
                   config.headers.common['Authorization']  = token
                   // config.headers.common['Track'] = 'Sample header'
                   return config
                  }


                 
      	    })

              // $axios.setToken(token)

       


       
        // Intercept the response and refresh (one retry) if invalid token.
        $axios.onResponse(function (response) {
            
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
      
            
          })

        $axios.onError(function (error) {
            
          
            if(error.request){
                store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Network Error: Please check your network',
                    color: 'red'
                    })
                
            }

            

            if(error.response.status == 422){
                //form validation error
            

                 store.dispatch('common/updateServerValidationErrors',error.response.data.errors)


            }

          if(error.response !== undefined && error.response.data.message !== undefined && error.response.data.message !== '')
            {
                 //reply to errors due to network problems

                if(error.response){
                    store.dispatch('common/updateSnackBar',{
                     show: true,
                     msg: error.response.data.message,
                     color: ''
                     })
                     
                }
            }else{

               store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Failed: Something Happened',
                    color: 'red'
                    })

            }

            return Promise.reject(error)
            
          })

	
}