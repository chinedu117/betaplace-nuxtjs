<template>
    <!-- <div>you can only get here through the server</div> -->
     <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
          <v-container grid-list-xs>
              <v-layout row wrap>
                  <v-flex xs12>
                        <v-card class="pa-2">
                            <v-card-title primary-title>
                            <v-subheader>Reset Password</v-subheader>
                            </v-card-title>
                            <!-- <v-flex xs12 px-4>
                                <v-text-field
                                outline
                                name="Email"
                                label="Enter your email"
                                id="email"
                                :error-messages="serverErrors.email ? serverErrors.email : errors.collect('email')"
                                v-validate="'required|email'"
                                data-vv-name="email"
                                v-model="email"
                                required
                                ></v-text-field>
                            </v-flex> -->
                        
                                <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
                          outline
						  v-validate="'required|min:6' "
						  v-model="password"
						  name="password"
						  data-vv-name="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password')"
						  ref="password"
						/>
				       </v-flex>

					   <v-flex xs12 px-4>
						<v-text-field
                          outline                         
						  label="Password"
						  v-validate="'required|confirmed:password'"
						  placeholder="Re-enter Password"
						  v-model="password_confirmation"
						  type="password"
						  name="password_confirmation"
						  data-vv-as="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password_confirmation')"
						/>
				       </v-flex>


                                <v-card-actions>
                                    <v-btn color="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
                                </v-card-actions>
                        </v-card>
                  </v-flex>
              </v-layout>
          </v-container>
         </v-flex>
    </v-layout>
</template>

<script>
import HandlesRequest from '@/utils/RequestHandler'
export default {
    middleware: 'authenticated',
    layout: 'dashboard',
    data(){
        return{
            email: this.$route.params.email,//encoded
            password:'',
            password_confirmation: '',
            token: this.$route.params.token
        }
    },
  mixins: [ HandlesRequest],
  methods:{
     submit(){
         this.$validator.validate().then(result => {
        			if (result) {
						this.mixin_handleRequest(this._submit())
       				 }
      			})
         
     },

     _submit(){
         let formData = new FormData()
         formData.append('email',this.email)
         formData.append('password',this.password)
         formData.append('password_confirmation',this.password_confirmation)
         formData.append('token',this.token)


         return this.$store.dispatch("auth/resetPassword",formData)
             .then(response => {
 
                 this.$router.push({name: 'Login'})
                 this.token = ''
                 this.password = ''
                 this.password_confirmation = ''
                 this.email = ''
                 this.$store.dispatch('common/updateSnackBar',{
                 show: true,
                 msg: response.data,
                 color: ''
                 })
                 
             })
     }
  },
}
</script>

<style>

</style>
