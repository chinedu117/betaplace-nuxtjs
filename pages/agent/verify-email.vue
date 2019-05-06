<template>
    <v-container grid-list-md text-xs-center class="page-wrapper">
    <v-layout>
        <v-card v-bind="card_style" >
            <v-card-text>
               <v-flex xs12>
                   <div class="d-block mx-auto">
                       <v-icon size="72" class="d-block mx-auto text-xs-center">mail</v-icon>
                   </div>
                  
               </v-flex>
                  <p class="font-size-14">
                      A Verification email has been sent to your mail.
                      Check your email and click the link provided. 

                      But if you did not see the mail, kindly click the button below to resend another one to your mail
                  </p>
                  
            </v-card-text>
            <v-btn :loading="loading" :disabled="loading" @click="resendVerificationEmail" class="d-block mx-auto">Resend Verification Email</v-btn>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import HandlesRequest from '@/utils/RequestHandler'
export default {
    middleware: 'authenticated,has-profile',
    layout: 'default',
    data(){
        return {
        
        }
    },
    computed: {
         card_style(){

           if(!this.$vuetify.breakpoint.smAndDown){
             return {
              "width": "500",
               "class": "mx-auto pa-2 my-2",
             }
           }else{
             return {
              "class": "mx-auto pa-2 my-2",
               }
           }
         }
      },
    mixins: [HandlesRequest],
    methods:{
        resendVerificationEmail(){
            this.mixin_handleRequest(this.$store.dispatch('auth/resendVerificationMail')
                                .then(response => {

                                  //snack sent
                                  this.$store.dispatch('common/updateSnackBar',{
                                   show: true,
                                   msg: "Another Verification Email has been Sent",
                                   color: ''
                                   })
                                }))

        },
      

    }, // Method
}
</script>

<style>

</style>
