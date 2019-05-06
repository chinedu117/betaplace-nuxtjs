var HandleRequest = {
  data(){
      return {
          loading: false,
          serverErrors: [] //validation Errors
      }
  },
  
  methods:{
    mixin_handleRequest(promiseCallBack){
        
        this.loading = true

        promiseCallBack.catch(error => {
            // console.log(error)
            //  console.log(error.response.data)
            const status = error.response.status
            let message = ''

            //unauthenticated response
            if(status == 401){
                message = error.response.data.message
            }
            else if(status == 500){
                message = 'internal server error'
            }
            else if(status == 422){
                //form validation error
                 message = error.response.data.message
                 this.serverErrors = error.response.data.errors
            }else{
                 
                message = error.response.data.message
            }

            this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: message,
                color: ''
            })
             

        })
        .finally(() => {
            this.loading = false
        })
    }
  }

}//end of obj

export default HandleRequest