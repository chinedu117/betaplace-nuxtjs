<template>
        <div>
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
           <v-tabs
               v-model="tabActive"
               color="accent"
               dark
               grow
               slider-color="primary"
           >
               <v-tab ripple>
                   PHOTO
               </v-tab>
               <v-tab ripple>
                   DETAILS
               </v-tab>
               <v-tab ripple>
                   AGENT
               </v-tab>
               <v-tab-item>
                   <v-subheader class="font-weight-bold">VIEWS</v-subheader> 
                   
                  <v-card 
                        flat 
                        class="pa-2 mb-2"
                        v-for="(image, index) in place.images.images"
                        :key="index"
                        color="grey lighten-2"
                        >
                       

                       <v-img 
                        :src="image.src"
                         max-width="100%"
                         height="auto"
                         >
                         
                            <v-layout 
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5">

                                    </v-progress-circular>
                            </v-layout>
                       </v-img>

                       
                        <v-card-title class="pb-2" >
                            <div class="text-truncate subheading font-weight-bold">
                                {{ image.title }}
                            </div>
                              
                        </v-card-title >
                        <v-card-text class="pt-0">

                            <read-more 
                                more-str="Read more" 
                                :text="image.description" 
                                link="#" 
                                less-str="Read Less" 
                                :max-chars="50"
                                class="text--grey"
                                >
                            </read-more>
                           
                       </v-card-text>
                   </v-card>
               </v-tab-item>
               <v-tab-item>
                   <v-card flat class="pa-2">
                       <v-card-title class="font-weight-bold pb-2">
                            <h1 class="hash" id="desc" @click="$vuetify.goTo('#desc',scrollOptions)">
                                {{ place.category.name }}
                            </h1>
                        </v-card-title>
                        <v-card-text class="pt-0">
                            
                            <p>{{ place.description }}</p>
                        </v-card-text>
                         <v-card-title class="font-weight-bold pb-2">
                            <h1 class="hash">
                                Location
                            </h1>
                        </v-card-title>
                        <v-card-text class="pt-0">
                        
                           <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(place.address,place.location,place.state,place.country) | insertBreaks">
                           </p>
                            
                        </v-card-text>

                        <v-card-title class="font-weight-bold pb-2" id="price">
                            <h2 class="hash" @click="$vuetify.goTo('#price',scrollOptions)">
                               Price: {{ place.price | currency }}
                            </h2>
                        </v-card-title>
                        <v-card-text class="pt-0">
                         <p>{{ place.price_description }}</p>
                        </v-card-text>
                         <v-card-title class="font-weight-bold pb-2" id="spec">
                            <h1 class="hash" @click="$vuetify.goTo('#spec',scrollOptions)">
                                Details
                            </h1>
                        </v-card-title>
                        
                          <v-container grid-list-xs class="pb-5" >
                              <v-layout 
                              row 
                              wrap 
                              v-for="(feature,index) in place.features.features" 
                              :key="index"
                              :index="index"
                               fill-height
                               height="auto"
                               >
                                <v-flex xs4 fill-height>
                                    <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word"> 
                                        {{ feature.feature }}
                                    </div>
                                    
                                </v-flex>
                                <v-flex xs8 fill-height> 
                                    <div style="height:auto" class="d-block pa-2 grey lighten-4">
                                         {{ feature.value }}
                                    </div>

                                </v-flex>
                                
                              </v-layout>
                              
                          </v-container>

                    

                        


                         <v-divider></v-divider>
                        <v-card-actions height="100px" background-color="grey lighten-5">
                         
                              <action-btn
                               :stat_id="place.statistics.id"
                               color="accent"
                               class="action-btn-mobile elevate-3"
                               :longitude="place.longitude"
                               :latitude="place.latitude"
                               :likes="place.statistics.like_no"
                               :agentID="place.agent.id"
                               :social_description="place.description"
                               :social_category="place.category.name"
                               :social_location="place.location"
                                  />
                        </v-card-actions>

                       
                   </v-card>
               </v-tab-item>
               <v-tab-item class="pa-2">
                   
                    <!-- <v-subheader class="pb-0 font-weight-bold">AGENT INFO</v-subheader> -->
                      <agent-info
                         :agent_slug="place.agent.slug"
                         class="mx-auto mb-2"
                        >
                        <v-card-actions slot="link">
                                <v-btn large class="mx-auto" outline :to="`/${place.agent.slug}`">
                                 See Other Places by this agent
                                 </v-btn>
                        </v-card-actions>
                      </agent-info>
                       
               </v-tab-item>
           </v-tabs>   
              
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>

        <v-container grid-list-md v-if="$vuetify.breakpoint.mdAndUp">
            <v-layout row wrap>
                <v-flex md8 lg8 xs12>
                        <agent-info
                                :agent_slug="place.agent.slug"
                                :show_body=false
                                class="mb-2"
                               >
                                 
                                 <v-card-actions slot="link">
                                  <v-btn large class="mx-auto" outline :to="`/${place.agent.slug}`">
                                 See Other Places by this agent
                                 </v-btn>
                                </v-card-actions>
                        </agent-info>

                    <v-card width="700px"  class="mx-auto" height="auto">
                      <!-- header -->
                        <v-toolbar>
                          
                            <v-toolbar-title>
                                {{ place.category.name }}
                                
                            </v-toolbar-title>
                    
                            <v-spacer></v-spacer>
                            <v-toolbar-items class="hidden-xs-only">
                                <v-btn flat @click="$vuetify.goTo('#desc',scrollOptions)">Description</v-btn>
                                <v-btn flat  @click="$vuetify.goTo('#spec',scrollOptions)">Details</v-btn>
                                <v-btn flat  @click="$vuetify.goTo('#price',scrollOptions)">Price</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <!-- header end -->
                        <!-- carouse -->
                        <v-carousel
                            cycle
                            lazy
                            dark light
                            delimiter-icon="fiber_manual_record"
                            height="500px"
                            next-icon="chevron_right"
                            prev-icon="chevron_left"
                        
                        >
                            <v-carousel-item
                            
                                transition="tab-transition"
                                v-for="(image,i) in place.images.images"
                                :key="i"
                                :src="image.src"
                                :aspect-ratio="4/3"
                            ></v-carousel-item>
                        </v-carousel>

                         <!-- carousel ends -->


                        <!-- <v-card-title class="font-weight-bold">
                            <h1 class="hash title" id="desc" @click="$vuetify.goTo('#desc',scrollOptions)">
                                {{ place.category.name }}
                            </h1>
                        </v-card-title> -->
                        <v-card-text>

                            <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <h1 class="hash title" id="desc" @click="$vuetify.goTo('#desc',scrollOptions)">
                                    {{ place.category.name }}
                                 </h1>
                              </span>
                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">
                                 <p style="font-size: 18px; line-height: 1.8">
                          
                                    <read-more 
                                            more-str="Read more" 
                                            :text="place.description" 
                                            link="#" 
                                            less-str="Read Less" 
                                            :max-chars="350"
                                            class="text--grey"
                                            >
                                        </read-more>
                                  </p>

                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
<!-- 
                           <p>{{ place.description }}</p> -->
                        </v-card-text>
                        <!--  <v-card-title class="font-weight-bold">
                            <h4 class="hash title">
                                Location
                            </h4>
                        </v-card-title>
                        <v-card-text>
                        
                            <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(place.address,place.location,place.state,place.country) | insertBreaks">
                             
                            </p>
                        
                        </v-card-text> 
 -->
                         <v-card-text>
                            <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <h4 class="hash title">
                                      Location
                                 </h4>
                              </span>
                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">
                                    <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(place.address,place.location,place.state,place.country) | insertBreaks">
                                     
                                    </p>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                         </v-card-text>
                         <!-- <v-card-title class="font-weight-bold" id="spec">
                            <h1 class="hash title" @click="$vuetify.goTo('#spec',scrollOptions)">
                                Details
                            </h1>
                        </v-card-title>
 -->
                           <v-card-text>
                            <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <h1 class="hash title" @click="$vuetify.goTo('#spec',scrollOptions)">
                                Details
                                  </h1>
                              </span>
                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">

                                <!-- features -->
                                  <v-container grid-list-xs class="pb-5" >
                                        <v-layout 
                                        row 
                                        wrap 
                                        v-for="(feature,index) in place.features.features" 
                                        :key="index"
                                        :index="index"
                                        
                                         >
                                          <v-flex xs4 >
                                              <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word; height: 100%"> 
                                                  {{ feature.feature }}
                                              </div>
                                              
                                          </v-flex>
                                          <v-flex xs8 fill-height> 
                                              <div style="height:100%" class="d-block pa-2 grey lighten-4">
                                                   {{ feature.value }}
                                              </div>

                                          </v-flex>
                                          
                                        </v-layout>
                                        
                                 </v-container>
                                <!-- features end -->
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                         </v-card-text>
                        <!-- <v-card-text>
                          <v-container grid-list-xs class="pb-5" >
                              <v-layout 
                              row 
                              wrap 
                              v-for="(feature,index) in place.features.features" 
                              :key="index"
                              :index="index"
                              fill-height
                               >
                                <v-flex xs4 fill-height>
                                    <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word"> 
                                        {{ feature.feature }}
                                    </div>
                                    
                                </v-flex>
                                <v-flex xs8 fill-height> 
                                    <div style="height:auto" class="d-block pa-2 grey lighten-4">
                                         {{ feature.value }}
                                    </div>

                                </v-flex>
                                
                              </v-layout>
                              
                          </v-container>
                          <v-divider></v-divider>       
                                  
                        </v-card-text>  -->

                        <!-- <v-card-title class="font-weight-bold" id="price">
                            <h2 class="hash" @click="$vuetify.goTo('#price',scrollOptions)">
                               Price: {{ place.price | currency }}
                            </h2>
                        </v-card-title>
                             <v-card-text class="">
                               <p>{{ place.price_description }}</p>
                             </v-card-text> -->
                        
                        <v-card-text>
                            <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <h2 class="hash title" @click="$vuetify.goTo('#price',scrollOptions)">
                                               Price: {{ place.price | currency }}
                                    </h2>
                              </span>
                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">
                                     <p>{{ place.price_description }}</p>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                         </v-card-text>


                        <v-card-actions height="100px" style="position:relative" background-color="blue-grey lighten-5">
                           
                             <custom-dialog :width="500">
                               <agent-info
                                :agent_slug="place.agent.slug"
                                class="mx-auto"
                               >
                                 
                                 <v-card-actions slot="link">
                                  <v-btn large class="mx-auto" outline :to="`/${place.agent.slug}`">

                                 See Other Places by this agent
                                 </v-btn>
                                </v-card-actions>
                               </agent-info>
                             </custom-dialog>

                              <action-btn
                               :stat_id="place.statistics.id"
                               color="accent"
                               class="action-btn-screen"
                               :longitude="place.longitude"
                               :latitude="place.latitude"
                               :likes="place.statistics.like_no"
                               :agentID="place.agent.id"
                               :social_description="place.description"
                               :social_category="place.category.name"
                               :social_location="place.location"
                                />
                        </v-card-actions>
                       
                    </v-card>
                </v-flex>
                
                <v-flex md4 lg4 xs12>
                    <subscribe/>
                
                </v-flex>
             </v-layout>
        </v-container>
   </div>
    
</template>
<script>

import Subscribe from '@/components/Subscribe.vue'
import ActionBtn from '@/components/place_view/ActionBtn.vue'
// import RateAgent from './components/RateAgent.vue'
import insertBreaksFilter from  '@/utils/InsertBreaksFilter'
import AgentInfo from '@/components/places_list/AgentInfo.vue'
import CustomDialog from '@/components/Dialog.vue'
export default {
    name: 'place-view',
    layout: 'default',
    mixins:[insertBreaksFilter],
    data(){
        return {
          
           tabActive: null,
           scrollOptions: {
                 duration: 300,
                 offset: -80,
                 easing: 'easeInOutCubic',
           },

        
        
        }
    },

    async fetch({store,params}) {
                                
            await store.dispatch('place_view_store/retrievePlace',params.place)
            

    },
    components: {
        Subscribe, ActionBtn, AgentInfo, CustomDialog
    },
    computed: {
       
        place() {
         
              return this.$store.getters['place_view_store/place']
         
           
          
        },
        
    },
    methods:{

    }
}
</script>
<style>
  .hash::before {
     content: '# '; 
     opacity: 0.5;
     color:red;
  }

  .action-btn-mobile {
   position: fixed;
   padding: 10px;
   background-color:#e7e9ef33;
   left: 0px;
   bottom:0px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   flex-direction: row;
 }
</style>
