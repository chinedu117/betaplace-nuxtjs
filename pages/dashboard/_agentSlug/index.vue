<template>
<div>
      <v-card  v-bind="card_style">
      <!-- header -->
        <div class="pa-3 text-xs-left" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                  <v-layout row wrap>
                      <v-flex md10 xs12>
                       <span class="headline text-capitalize">
                         Account Summary
                       </span><br>
                       <span class="grey--text subheading text-lowercase" style="letter-spacing: 2px; overflow: hidden">
                         <!-- {{ }} -->
                       </span>
                     </v-flex>
                     <v-flex md2 xs12>
                        <v-layout>
                          <v-flex xs6>
                          </v-flex>
                          <v-flex xs6>
                          </v-flex>
                        </v-layout>
                        
                     </v-flex>
                 </v-layout>
            </div>
             <v-card-text>
                <div class="account-summary-row">
                  <div class="account-summary-row--cell">
                     Total Places
                  </div>
                  <div class="account-summary-row--cell">
                     {{ account_summary.places_no }}
                  </div>
                </div>
                <div class="account-summary-row">
                  <div class="account-summary-row--cell">
                   Subscriptions
                   
                  </div>

                  <div class="account-summary-row--cell">
                     {{ account_summary.subscriptions_no }}
                    
                   </div>
                   
                </div>
                <div class="account-summary-row">
                  <div class="account-summary-row--cell">
                   Slots Remaining
                  </div>
                  <div class="account-summary-row--cell">
                     {{ account_summary.agent_statistics.max_no_places }}
                   </div>
                </div>

                <div class="account-summary-row">
                  <div class="account-summary-row--cell">
                     Expiry Date
                  </div>
                  <div class="account-summary-row--cell">
                      {{ account_summary.agent_statistics.active_subscription_expiry_date }}
                  </div>
                </div>
              </v-card-text>

          </v-card>


      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
           

              <v-list two-line subheader class="pt-2" v-if="places.length > 0">
                  
                 <div class="d-flex justify-space-between">
                    <v-subheader>Your Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
                 
                <template 
                  v-for="(place,index) in places"
                  
                  >
                  <div 
                  :index="index"
                  :key="place.id"
                  >
                  <!-- <v-subheader >{{ place.category }}</v-subheader> -->
                  <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
                  <v-list-tile ripple avatar  >
                    <v-list-tile-avatar >
                    <v-avatar color="blue-grey lighten-5">
                      <v-icon @click="editPlace(place.slug)">edit</v-icon>
                    </v-avatar>
                      
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="subheading font-weight-bold">{{ place.category.name }}</div></v-list-tile-title>
                      <v-list-tile-sub-title>
                        <div class="text--grey lighten-4 subheading text-capitalize">
                          <v-icon size="18px" class="pr-2 lighten-4" >place</v-icon>
                          <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span>
                        </div>
                      </v-list-tile-sub-title>
                      
                      <flags :expired="place.expired" :published="place.agent_published" />
                      
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <place-actions 
                        :published="place.agent_published == '1' ? true : false" 
                        :expired="place.expired" 
                        :slug="place.slug"
                        :index="index" 
                        
                        >
                          
                        </place-actions>
                     <!-- <v-avatar color="blue-grey lighten-5" >
                        
                         <v-icon @click="deletePlace(place.slug,index)" color="primary">delete</v-icon>
                        
                      </v-avatar> -->
                    </v-list-tile-action>
                   
                  </v-list-tile>
                   <v-divider inset></v-divider>
                  </div>
                </template>
                <v-list-tile>
                    <v-btn color="success" class="mx-auto" outline @click="seePlanList()">Subscribe to Add more Places</v-btn>
                </v-list-tile>
              </v-list>
              
              <div v-else class="pa-2 ma-3 text-xs-center subheading font-weigh-bold text--grey">
                Nothing to display
               
                </div>
          </v-flex> <!-- End template for mobile display -->
          <v-btn fab dark  color="primary" fixed bottom style="right: 40%"  @click="createPlace()">
              <v-icon dark>add</v-icon>
          </v-btn>
      </v-layout>
       
            <v-container v-else >
               <v-layout row wrap grid-list-xs >
                  <v-flex md12 lg12  >
                    <template 
                         v-for="(place,index) in places"
                  
                      >
                        <div 
                        :index="index"
                        :key="Math.random() + '_' + place.slug"
                   
                        >
                          <v-card height="auto" class="mb-3 mx-auto " width="700px">

                            <div class="pa-3" color="grey darken-3" width="100%" style="background-color:#dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">{{ place.category.name }}</span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >{{ place.price | currency }}</span>
                                     </v-flex>
                      
                                  </v-layout>
                            </div>

                           <v-card-text class="text-xs-left">
                                <div class=" text--grey lighten-4 subheading text-capitalize">

                                    <v-icon class="pr-2 lighten-4" >place</v-icon>
                                    <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span><br>

                                </div>
                                 
                                 {{ place.description }}
                                
                            </v-card-text>
                            
                             
                             <v-card-actions>
                              
                                   <div class=" d-inline text--grey lighten-4 subheading text-capitalize">
                                    
                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >thumb_up</v-icon>
                                          <span class="text-capitalize">{{place.statistics.like_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >place</v-icon>
                                          <span class="text-capitalize">{{place.statistics.map_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >share</v-icon>
                                          <span class="text-capitalize">{{place.statistics.share_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >visibility</v-icon>
                                          <span class="text-capitalize">{{place.statistics.seen_no}}</span>
                                        </div>

                                        <flags :expired="place.expired" :published="place.agent_published" />

                                        <place-actions 
                                          :published="place.agent_published == '1' ? true : false" 
                                          :expired="place.expired" 
                                          :slug="place.slug"
                                          :index="index" 
                                          v-on:place-edit="editPlace"
                                          class="d-inline"
                                          >
                                            
                                          </place-actions>
              
                                  </div>
                                   
                             </v-card-actions>
                                    

                          </v-card>

                        </div>

                      </template>

                        


                      <v-btn fab dark  color="primary" fixed bottom v-bind="floating_button_style"  @click="createPlace()">
                        <v-icon dark>add</v-icon>
                    </v-btn>

                  </v-flex>
                  <v-btn color="success" class="mx-auto " outline @click="seePlanList()">Click to increase your limits</v-btn>
                </v-layout>
            </v-container>
            <!-- end v-else -->
       
      
</div>
</template>

<script>
import HandlesRequest from '@/utils/RequestHandler'
// import Service from './Service.js'
import PlaceActions from "@/components/dashboard/PlaceActions"
import Flags from "@/components/dashboard/Flags"


export default {
    middleware: ['authenticated','has-profile'],
    layout: 'dashboard',
  

   components: { PlaceActions, Flags},

   mixins: [HandlesRequest],
  
   
   async fetch({store,params}){
        //load places
        await store.dispatch("dashboard_store/retrieveAgentPlacesList")
        await store.dispatch("dashboard_store/retrieveMySubscriptions")
                        
   },
   computed:{
     card_style(){
           
           let cardStyle = {
                             "style":"border-radius: 5px",
                              "class": "mx-auto  text-xs-left"
                              }
                              
           if(this.$vuetify.breakpoint.mdAndUp){
             return Object.assign(cardStyle,{"width": "700px"})
           }else{
             return Object.assign(cardStyle,{"width": "auto"})
           }
        },

       account_summary(){
           return this.$store.getters['dashboard_store/summary']
       },
       floating_button_style(){
         if(this.$store.state.common.sidebar.visible){

            return {
                      "style":"left: 20%; top: 18%"
              }
         }else{
             return {
                      "style":"left: 8%; top: 18%"
              }
         }
       },
       places(){
           return this.$store.getters['dashboard_store/places']
       },
       agent(){
            return this.$store.getters['auth/getUser']
       }
   },
    methods:{
       
        createPlace(){
            //check if the agenet still has enough subscription
            const agent = this.agent
            if(agent.agent_statistics.max_no_places > 0)
            { 

              const agentSlug = agent.slug 
              this.$router.push({path: `/dashboard/${agentSlug}/new` })

            }else{

              this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'You do not have enough subscription to continue',
                    color: ''
                    })
              this.seePlanList()
            
            }
            
        },

        editPlace(placeSlug){
            const agentSlug = this.agent.slug

            this.$router.push({path: `/dashboard/${agentSlug}/${placeSlug}` })
        },
        

        seePlanList(){
            this.$router.push({path: "/pricing"})
        }
    },

}
</script>

<style lang="stylus">
  .account-summary-row
    width: 80%
    padding: 0 2px
    height: auto
    margin: 0 auto
    display: inline-block
    border: 5px solid #dddd

    &--cell
      border-color: #dddd
      border-width: 2px
      display: inline
      float: left
      padding: 5px
      height: auto

    &--cell:first-child
      width: 40%

    &--cell:last-child
        width: 60%
        padding-left: 10px
        border-left: 5px solid #dddd




</style>
