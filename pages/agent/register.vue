<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
 	<v-layout row wrap>
 	   <v-flex xs12>
	 		 <v-card  v-bind="card_style" >
			 		<v-toolbar>
			 			<v-toolbar-side-icon/>
			 			<v-toolbar-title>
			 				Register
			 		    </v-toolbar-title>
			        </v-toolbar>
                 
                <form action="#" @submit.prevent="beforeSubmit" >	
	                 <v-flex xs12 px-4>
									
						<v-text-field 
						  label="Email"
						  name="email"
						  v-model="registerParams.email"
				          ripple
						  :error-messages="serverErrors.email ? serverErrors.email : errors.collect('email')"
						  v-validate="'required|email'"
                          data-vv-name="email"
						 />
					 </v-flex>

		            <v-flex xs12 px-4>
						<v-text-field 
						  label="Name"
						  name="name"
						  v-validate="'required'"
						  :error-messages="serverErrors.name ? serverErrors.name : errors.collect('name')"
						   data-vv-name="name"
						  v-model="registerParams.name"
				          ripple
						 />
						 
					 </v-flex>
      
				      <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-validate="'required|min:6' "
						  v-model="registerParams.password"
						  name="password"
						  data-vv-name="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password')"
						  ref="password"
						/>
				       </v-flex>

					   <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-validate="'required|confirmed:password'"
						  placeholder="Re-enter Password"
						  v-model="registerParams.password_confirmation"
						  type="password"
						  name="password_confirmation"
						  data-vv-as="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password_confirmation')"
						/>
				       </v-flex>

				       <v-flex xs12 px-4>
				       	   <v-btn type="submit" :loading="loading">Register</v-btn>
				       </v-flex>
 
                	</form>
				  
		    </v-card>
		</v-flex>
   </v-layout>
</v-container>
</template>



<script>

	// import serverErrors from '@/components/ServerErrors'
    import HandleRequest from '@/utils/RequestHandler.js'
	export default {
	  middleware: 'anonymous',
      layout: 'default',
	  name: 'register',
	//   components: {serverErrors},
	  data () {
	    return {
			'registerParams': 
					{	
						name: '',
						password: '',
						password_confirmation:'',
						email: '',
						
	    			},
	    
					
	    }
	  },
	  mixins: [ HandleRequest ],
      computed: {
         card_style(){

         	 if(!this.$vuetify.breakpoint.smAndDown){
         	 	 return {
         	 	 	"width": "500",
         	 	 	"class": "mx-auto",
         	 	 }
         	 }else{
         	 	 return {
         	 	 	"class": "mx-auto",
         	 	   }
         	 }
         }
      },
	  methods: {
		  //called before form is submitted
        beforeSubmit () {
			   //this refers to the validate method of the plugin "veeValidate" imported in the root file
      			this.$validator.validateAll().then(result => {
        			if (result) {
							 //submit only if all the from is valid
						
							 this.register()
       				 }
      			});
   			 },
 		
	  	register() {
            
			this.mixin_handleRequest(this.$store.dispatch('auth/register',this.registerParams)
					   .then(response => 
					   {
                       
						
						this.$store.commit('common/updateLoader',false)
						this.$router.push({ path: "/agent/verify-email"})
 
						}))

						
	  	}, //register

	  	socialRegister(){

	  	}
	  },//methods
	}
	
	</script>
	
<style>
   .server-alert {
		   padding: 15px 10px;
			 margin: 20px 10px;
			 border: 1px solid #e08989c7;
			 background: #eb898941;
			 border-radius: 10px;
			 display: block;
			 text-align: left;
			 font-size: 16px;

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

	 .error {
		 color: red;
		 text-align: left;
		 font-size: 12px;
		 
	 }

	

</style>