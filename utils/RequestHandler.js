var HandleRequest = {
  data(){
      return {
          loading: false,
      }
  },
 
  computed: {
       serverErrors(){

          return this.$store.state.common.validation_errors
             
       }
  },

  methods:{
    mixin_handleRequest(promiseCallBack){
        
        this.loading = true

        promiseCallBack
        .finally(() => {
            this.loading = false
        })
    }
  }

}//end of obj

export default HandleRequest