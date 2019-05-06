<template>
  <v-container grid-list-md text-xs-center class="page-wrapper">
  <v-layout row wrap>
     <v-flex xs12>
       <v-card  v-bind="card_style" >

                            <v-card-title primary-title>
                            <v-subheader>Forgot Password</v-subheader>
                            </v-card-title>
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

                                <v-card-actions>
                                    <v-btn color="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
                                </v-card-actions>
                        </v-card>
                  </v-flex>
              </v-layout>
          </v-container>
         
</template>

<script>
import HandlesRequest from '@/utils/RequestHandler'
export default {
    layout: 'default',
    middleware: 'anonymous',
    data(){
        return{
            email: '',
        }
    },
    computed: {
         card_style(){

           if(!this.$vuetify.breakpoint.smAndDown){
             return {
              "width": "500",
              "class": "mx-auto pa-2",
             }
           }else{
             return {
              "class": "mx-auto",
               }
           }
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
         return this.$store.dispatch("auth/forgotPassword",formData)
             .then(response => {
                 this.$store.dispatch('common/updateSnackBar',{
                 show: true,
                 msg: response.data.message,
                 color: ''
                 })
                 
             })
     }
  },
}
</script>

<style>

</style>
