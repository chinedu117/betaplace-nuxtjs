<template>
 <v-container grid-list-md text-xs-left class="page-wrapper">
  <v-layout row wrap>
     <v-flex xs12>
       <v-card   v-bind="card_style" >
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md12>
                                       <span class="headline">
                                          Agency Information
                                       </span><br>
                                       <span class="grey--text subheading text-lowercase" style="letter-spacing: 2px; overflow: hidden">
                                        {{ profile.agent_slug ? profile.agent_slug : '' }}
                                       </span>
                                     </v-flex>
                                     
                                 </v-layout>
                            </div>
                         <!-- header -end -->
                        
                         <v-card-text>
                            <v-text-field
                            outline
                            name="agency_name"
                            label="Company Name"
                            id="agency_name"
						    :error-messages="serverErrors.agency_name ? serverErrors.agency_name.pop() : errors.collect('agency_name')"
                            v-validate.disable="'required|alpha_spaces'"
                            data-vv-name="agency_name"
                            v-model="profile.agency_name"
                            required
                            @change="setAgentHandle"
                            ></v-text-field>

                           <!--  <v-text-field
                            outline
                            name="agent_handle"
                            v-model="profile.agent_handle"
                            label="Your Handle"
                            id="agent_handle"
                           :error-messages="serverErrors.agent_handle ? serverErrors.agent_handle.pop() : errors.collect('agent_handle')"
                            v-validate.disable="'required'"
                            disabled
                            data-vv-name="agent_handle"
                            v-model="profile.agent_handle"
                            required
                             ></v-text-field> -->
    
                            <v-text-field
                            outline
                            name="phone_number_main"
                            label="Main Phone Number"
                            id="phone_number_main"
						    :error-messages="serverErrors.phone_number_main ? serverErrors.phone_number_main.pop() : errors.collect('phone_number_main')"
                            v-validate.disable="'required'"
                            data-vv-name="phone_number_main"
                            v-model="profile.phone_number_main"
                            required
                             ></v-text-field>

                            <v-text-field
                            outline
                            name="phone_number_other"
                            label="Other Phone Number"
                            id="phone_number_other"
						    :error-messages="serverErrors.phone_number_other ? serverErrors.phone_number_other.pop() : errors.collect('phone_number_other')"
                            v-validate.disable="'required'"
                            data-vv-name="phone_number_other"
                            v-model="profile.phone_number_other"
                            ></v-text-field>

                        
                            <v-text-field
                                outline
                                name="country"
                                label="Your country"
                                id="country"
                                v-validate.disable="'required'"
                                data-vv-name="country"
						         :error-messages="serverErrors.country ? serverErrors.country.pop(): errors.collect('country')"
                                disabled
                                v-model="profile.country"
                                required
                            ></v-text-field>

                             <v-select
                                name="state"
                                :items="states"
                                outline
                                v-validate="'required'"
                               :error-messages="serverErrors.state ? serverErrors.state.pop(): errors.collect('state')"
                               data-vv-name="state"
                                label="State"
                                v-model="profile.state"
                               id="state"

                            ></v-select>

                            <v-textarea
                                :counter="100"
                                outline
                                 data-vv-name="office_address"
                                name="office_address"
                                label="Address"
                                v-model="profile.office_address"
                                v-validate.disable="{ required: true, max:150, regex: /^([0-9a-zA-Z\s',-.]+)$/}"
                               
						                    :error-messages="serverErrors.office_address ? serverErrors.office_address.pop() : errors.collect('office_address')"
                                @blur="showAddress = true"
                                id="address"
                            ></v-textarea>

                              <v-card v-if="showAddress" class="mb-2"> 
                             <v-subheader class="subheading font-weight-medium">It Will Be Shown Like this:</v-subheader> 

                             <v-card-text>  
                              <span class="caption red--text">Use comma(,) to punctuate your address</span>
                                <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(profile.office_address,profile.state,profile.country) | insertBreaks">
                            </p>
                             </v-card-text>
                            
                            </v-card>

                              


                             <v-textarea
                                label="About Us"
                                name="about_us"
                                v-model="profile.about_us"
                                :counter="200"
						        :error-messages="serverErrors.about_us ? serverErrors.about_us.pop() : errors.collect('about_us')"
                                v-validate.disable="{ required: true, max:150, regex: /^([0-9a-zA-Z\s',-.]+)$/}"
                                data-vv-name="about_us"
                                outline
                            ></v-textarea>
                            </v-card-text>
                         <v-card-actions>
                             <v-btn color="success" @click="submit" :disabled="loading" :loading="loading">Submit</v-btn>
                         </v-card-actions>

                         </v-card>
                       </v-flex>
                     </v-layout>
                   </v-container>
 </v-layout>    

</template>

<script>
import HandleRequest from '@/utils/RequestHandler.js'
import insertBreaksFilter from  '@/utils/InsertBreaksFilter'
import NaijaStates from 'naija-state-local-government'
export default {
  middleware: ['authenticated','verified-email'],
  layout: 'dashboard',
  async fetch({store}){

    if(store.getters['auth/userHasProfile'])
    {
       await store.dispatch('auth/getMyProfile')
    }
  },

  data(){
      return {
          profile: Object.assign({country:"Nigeria"},this.$store.state.place_view_store.agent_info),
          showAddress: false,
          
      }
  },
  mixins: [ HandleRequest, insertBreaksFilter],

  computed: {
  
         states(){
             return NaijaStates.states()
             },
         card_style(){
           
           let cardStyle = {
                             "style":"border-radius: 5px",
                              "class": "mx-auto"
                              }
                              
           if(this.$vuetify.breakpoint.mdAndUp){
             return Object.assign(cardStyle,{"width": "700px"})
           }else{
             return Object.assign(cardStyle,{"width": "auto"})
           }
         }
      },
  methods:{
    setAgentHandle(){
       if(this.profile.agency_name.length < 1)return
        let agencyName = this.profile.agency_name.trim()
          if(agencyName.charAt(0) !== "@"){
             agencyName  = '@'.concat(agencyName) 
          }

        this.profile.agent_handle = agencyName.replace(/\s/g,"_").toLowerCase()
    },
    
    submit(){
         this.$validator.validate().then(result => {
        			if (result) {
						this._submitProfile()
       				 }
      			})
    },
    
    _submitProfile(){
         let profileData = new FormData()
         const profile = this.profile
         for(var k in profile){
             if(profile.hasOwnProperty(k)){
                 profileData.append(k,profile[k])
             }
         }
         this.mixin_handleRequest(this.$store.dispatch('auth/submitProfile',profileData)
                                .then(response => {
                                    let slug = this.$store.getters['auth/getUser'].slug
                                    this.$router.push({path: `/agent/profile/${slug}`})
                            }))
    },

    getMyProfile(){
         this.mixin_handleRequest(this.$store.dispatch('auth/getMyProfile')
                    .then(response => {
                      this.profile = response.data
                      this.setAgentHandle() 
         })) 
    },
  }//end methods
}
</script>

<style>

</style>
