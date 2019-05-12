<template>
     <v-layout row>
         <v-flex  xs12 >
                
               <v-card :width="$vuetify.breakpoint.mdAndUp ? '700px' : 'auto' " class="mx-auto" style="border-radius: 5px; margin-top: 20px !important;">
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">
                                          {{plan.package_name}}
                                       </span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-xs-right red--text font-weight-medium" style="font-weight: 700; ">
                                         
                                          N {{plan.price}}
                                       </span>
                                     </v-flex>
                                 </v-layout>
                            </div>
                         <!-- header -end -->

                        <v-card-text class="pa-3" style="line-height: 1.9; font-size:16px">

                          <p>
                            You are about to pay <b>N {{plan.price}}</b>, for the purchase of  <b>{{plan.package_name}}</b>, which will enable you to upload <b>{{plan.quantity_slot}}</b> more places.
                          </p>

                          <p>
                            This plan would last for <b> {{plan.duration_days}} days</b> and would expire on  <b>{{plan.expires_on }}.</b>
                          </p>
                            
                          <p>
                            Any active plan would be merged to the most recent subscription. Terms and conditions apply. Thank you.
                          </p>
                          

                        </v-card-text>
                        <v-card-actions>
                           <div class="pricing-action mx-auto">
                           
                                 <paystack
                                    :metadata="paystackMetaData"
                                    :amount="plan.price * 100"
                                    :email="agentEmail"
                                    :paystackkey="paystackkey"
                                    :reference="reference"
                                    :callback="callback"
                                    :close="close"
                                    :embed="false"
                                 >
                                <i class="fas fa-money-bill-alt"></i>
                                   <v-btn class="btn-color-action" color="white" :loading="loading" flat :disabled="loading"  @click="loading = true">BUY</v-btn>
                                </paystack>
            
                         </div>

                        </v-card-actions>

                </v-card>

                
          </v-flex> <!-- End template for mobile display -->
         
      </v-layout>  
</template>

<script>
import paystack from 'vue-paystack'
export default {

middleware: ['authenticated','has-profile'],
layout: 'dashboard',
components: {
        paystack
    },
 data(){
     return {
         // plan:null,
         paystackkey: process.env.PAYSTACK_PUBLIC_KEY, //paystack public key
         loading: false

     }
 },

  async fetch({store,params, error}){
          
          try{

             let response = await store.dispatch('dashboard_store/retrievePlan',params.packageID)

          }catch(e){
               
               error({statusCode: 400, message: "Unable to get item"})
          } 
         
          
   },
  computed: {

       plan() {
            return this.$store.getters['dashboard_store/plan']
       }
      reference(){
        let text = "";
        let t = new Date()
            t = "_"+t.getTime()
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text.concat(t)
      },

      paystackMetaData(){

          return {
              "package_id": this.$route.params.packageID,
          }
      },

      agentEmail(){
          return this.$store.getters["auth/getUser"].email
      }
    },

  

  methods:{
    // placeOrder(){
    //     this.$store.dispatch('dashboard_store/placeOrder',{package_id: this.plan.id,transaction_ref:this.reference})
    // },
    callback: function(response){
        // console.log(response)
        if(response.status == "success")
        {  
            //confirm Payment
            //approve
            this.loading = true
            this.$store.dispatch('dashboard_store/confirmPayment',response.trxref)
            .then((response) =>{
                //reload the user object
                this.$store.dispatch("auth/retrieveUser")
                this.$router.push({name: "MyPlaces", params:{agentSlug: this.$store.getters['auth/getUser'].slug}})
                this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Payment Successfull: A receipt has been sent to your Mail',
                color: ''
                })
                
            })
            .catch((error) => {
                // console.log(error.response)
                 if(error.response.status == 409){
                    this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Payment was not successful',
                    color: ''
                    })
                    
                 }
                 this.$router.push({path: "/pricing"})
            })
            .finally(()=> {

                this.loading = false
            })
            

        }else{

                this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Unable to Make Transaction',
                color: ''
                })
        
            this.$router.push({path: "/pricing"})
        }
        //if succcessful
            //confirm payment
            //give value
            //redirect to myplaces
        //not successful
            //cancel the order
            //go back to the list of packages

      },
      close: function(){
          // console.log("Payment closed")
          //cancel the order
          //go back to list of packages

      },
    getPlan(packageID){
        this.$store.dispatch('dashboard_store/retrievePlan',packageID)
        .then((response) => {
            this.plan = response.data
        })
    }
}
}
</script>

<style scoped>
.pricing-action:hover {
    background: #cf4f3e;
}
.pricing-action {
    color: #FFF;
    background: #e95846;
    padding: 10px 16px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-weight: 700;
    font-size: 1.4em;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
}
 
</style>
