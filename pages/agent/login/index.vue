<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
 	<v-layout row wrap>
 	   <v-flex xs12>

	 		<v-card>
			 		<v-toolbar flat>
			 			<v-toolbar-side-icon/>
			 			<v-toolbar-title>
			 				Login
			 		    </v-toolbar-title>
			        </v-toolbar>
			        <v-flex xs12 px-4>
			          <v-btn dark color="blue" :disabled="loading" @click="AuthProvider('facebook')"> Continue With Facebook</v-btn>
				       </v-flex>
				      <v-flex xs12 px-4>
				      <v-btn dark  color="red darken-3" :disabled="loading" @click="AuthProvider('google')">Continue With Google</v-btn>
						 
			       </v-flex>
                 
                    <v-flex xs12 px-4>
                    	<div align="center" class="mx-auto pa-3 grey--text subheading font-weight-thick">
                    		or
                    	</div>
                    </v-flex>
		            <v-flex xs12 px-4>
						<v-text-field 
						  label="Email"
						  v-model="credentials.username"
				          ripple
						  :error-messages="serverErrors.email ? serverErrors.email : errors.collect('email')"
                           v-validate="'required|email'"
                           data-vv-name="email"
						 />
					 </v-flex>
						
				       
				      <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-model="credentials.password"
						  type="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password')"
                          v-validate="'required'"
                          data-vv-name="password"
						/>
				       </v-flex>
                       
				       <v-flex xs12 px-4>
						   
				       	   <v-btn 
							  
							  :disabled="loading"
							  @click="login"> Login</v-btn>

							 <v-btn 
					   </v-flex>
					   <v-divider></v-divider>
					   <v-flex xs12 px-4>
					   	     <v-btn
							  :disabled="loading"
							  flat

							  to="/agent/forgot-password"
							  >
							   Forgot Password
			      			 </v-btn>
			      			 <v-btn 
							
							  :disabled="loading"
							  flat

							  to="/agent/register">
							   Register
			      			 </v-btn>
				       </v-flex>
				       
		    </v-card>

		     



		</v-flex>
   </v-layout>
</v-container>
</template>



<script>
	import HandleRequest from '@/utils/RequestHandler.js'
	export default {
	  middleware: 'anonymous',
      layout: 'default',
	  name: 'login',
	
	  data () {
	    return {
	    	credentials: { 
						  username: '',
	    	               password: ''
						},
	    }
		},
		
        mixins: [ HandleRequest],
		
	    methods: {
  
        AuthProvider(provider) {
                var bb = this
              this.$auth.authenticate(provider).then(response =>{
              	// console.log(response)
                this.SocialLogin(provider,response)

                }).catch(err => {
                    // console.log({err:err})
                })

            },
          SocialLogin(provider,payload){
              const sm = this
             payload.provider = provider
            this.mixin_handleRequest(sm.$store.dispatch('auth/socialLogin',payload)
			   .then((response) => {
					// console.log('login Successfull')
					return sm.mixin_handleRequest(sm.$store.dispatch('auth/retrieveUser')
					   .then((response) => {
						     return sm.redirectAfterLogin(true)

					})
					)
			})
			)


            },
       
	  	login() {

			const sm = this
				
			this.mixin_handleRequest(this.$store.dispatch('auth/login',this.credentials)
			.then((response) => {
					
					return sm.mixin_handleRequest(sm.$store.dispatch('auth/retrieveUser')
					  .then((response) => {
						  
						  
						 return sm.redirectAfterLogin(false)
                        
					})
				)
			})
			)
				 
		

				
				
		  },

		redirectAfterLogin(social = false){
           let slug = ''
           slug = this.$store.getters['auth/getUser'].slug
           
           this.$router.push({ path: `/dashboard/${slug}`})

           
		}
	  }
	}
	</script>
	
<style scoped>

  .container {
  	 max-width: 500px;

  }
	
	 .success-alert {
		 
		  padding: 15px 10px;
			 margin: 20px 10px;
			 border: 1px solid #36854ec7;
			 background: #61a57b5d;
			 border-radius: 10px;
			 display: block;
			 text-align: left;
			 font-size: 16px;
	 }

</style>