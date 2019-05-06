<template>
</template>
<script>

	
	export default {
	    middleware: 'authenticated',
      layout: 'dashboard',
      name: 'logout',
      created() {

          this.logout()
      },
      methods: {

	  	logout() {

              this.$store.dispatch('auth/logout')
              .then(response => {
                   
                   this.$router.push({ path: '/agent/login'})
                   this.$store.dispatch('common/updateSnackBar',{
                        msg: 'You are logged out!',
                        color: 'red',
                        show: true
                        })
                  
               
        
              })
              .catch(error => {
                  this.$router.push({ path: '/agent/login'})
                //   this.$store.dispatch('common/updateSnackBar',{
                //                                    msg: 'Unable to Log out',
                //                                    color: 'red',
                //                                    show: true
                //                     })
               //  console.log(error)                                    
                
              })
               
	  	}
	  }
	}
	</script>
	
<style scoped>
</style>