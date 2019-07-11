<template>	
  
  <div v-if="$store.state.place_view_store.agent_info !== null">
     <v-card  v-bind="card_style">
      <!-- header -->
        <div class="pa-3 text-xs-left" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                  <v-layout row wrap>
                      <v-flex md10 xs12>
                       <span class="headline text-capitalize">
                          {{ agentInfo.agency_name }}
                       </span><br>
                       <span class="grey--text subheading text-lowercase" style="letter-spacing: 2px; overflow: hidden">
                        {{ agent_slug }}
                       </span>
                     </v-flex>
                     <v-flex md2 xs12>
                        <v-layout>
                          <v-flex xs6>

                            <v-avatar >
                              <v-icon ref="share_profile" @click="share">share</v-icon>
                            </v-avatar>
                            

                          </v-flex>
                          <v-flex xs6>
                            <v-avatar>
                              <v-icon @click="toggleHideBody" v-if="!showBodyDetails">visibility</v-icon>
                              <v-icon @click="toggleHideBody" v-else>visibility_off</v-icon>
                            </v-avatar>
                          </v-flex>
                        </v-layout>
                        
                     </v-flex>
                 </v-layout>
            </div>
         <!-- header -end -->
               <!-- Hide body -->
		            <div ref="profile_body" :style="showBodyDetails ? 'display:block' : 'display:none' ">
                <v-layout row>
                  <v-flex xs12> 
                    
                       <v-img
                         max-width="700px"
                         :src="imageSource"
                         :aspect-ratio="4/3"
                         
                       >
                          <slot name="uploader"></slot>
                       </v-img> 
                      
                  </v-flex>
                </v-layout>
                 
                 <!-- about us goes here -->
                 <v-card-text class="text-xs-left" >

                       <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <v-icon>people_outline</v-icon> About us
                                </span>

                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">
                                 <p style="font-size: 18px; line-height: 1.8">
                          
                                    <read-more 
                                            more-str="Read more" 
                                            :text="agentInfo.about_us" 
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

                 </v-card-text>
                  <!-- about us ends -->


                <v-card-actions class="elevate-1"> 
                   <v-layout row wrap justify-center>
                     <v-flex xs12 md6>
                           <div class="pl-3 mb-2">
                                <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize">
                                  <v-icon>phone</v-icon> Phone </span>

                                  <div class="pa-2  title font-weight-medium">
                                      <a style="text-decoration:none; color: grey" :href="`tel:${ agentInfo.phone_number_main }`">{{ agentInfo.call }}</a>
                                  </div>
                                  <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize">
                                  <v-icon>chat</v-icon> Whatsapp </span>

                                  <div class="pa-2  title font-weight-medium">
                                      <a style="text-decoration:none; color: grey" :href="`https://wa.me/${ agentInfo.phone_number_other }?text=${text_whatsapp}`">{{ agentInfo.whatsapp }}
                                      </a>
                                  </div>
                           </div>
                     </v-flex>
                     <v-flex xs12 md6>

                       <div class="pl-3 mb-2">
                                <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize">
                                  <v-icon>business</v-icon> Address </span>

                                  <div class="pa-2 title font-weight-medium" :inner-html.prop="buildAddress(agentInfo.office_address,agentInfo.state,agentInfo.country) | insertBreaks">
                       
                                 </div>
                        </div>
                        
                     </v-flex>
                   </v-layout>

                     <!-- <v-list-tile :to="{name : 'Agent', params:{ 'agentSlug': agent_slug}}">
                          <v-list-tile-title>Our Places</v-list-tile-title>
                    </v-list-tile> -->
                      
                </v-card-actions>
                    
                   <slot name="link"></slot>
                </div>
              </v-card>
             <!--  <social-share 
                       :title='shareable_title'
                       :description="social_description"
                       :url="social_url"
                       >
                </social-share> -->
    </div>
</template>				
<script>	

   import insertBreaksFilter from  '@/utils/InsertBreaksFilter'
   // import SocialShare from '@/components/SocialShare'
  export default {
  	 name: "agent-info",
  	 data(){
  	 	return {
         
         show_details: this.show_body
  	 	}
  	 },
  	 props:{
  	 	"agent_slug":{
  	 		required: true,

  	 	},
      "image_src": {
         required: false,
      },

      "show_body": {
         required: false,
         default: true,
         type: Boolean
      }
  	 },
     mixins:[ insertBreaksFilter ],
     
     mounted(){
     	this.$store.dispatch("common/updateTitle",this.agentInfo.agency_name)
          //the default appearance
     
        // this.toggleHideBody()
     		document.title = this.agentInfo.agency_name
     },


     // components: { SocialShare },
     computed:{
        text_whatsapp(){
               let text = "I am inquiring about the apartment listing "
             return encodeURI(text)
        },
        social_url(){
             return process.env.ROOT_URL + this.$route.fullPath
        },
        shareable_title(){
             return this.agentInfo.agency_name
        },

        social_description(){
              return this.agentInfo.about_us
        },
        showBodyDetails(){
           return this.show_details
        },
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
         agentInfo(){

         	return this.$store.state.place_view_store.agent_info
         },
         imageSource(){

                return this.image_src ?  this.image_src : this.agentInfo.profile_img

         }
     },

     methods:{
        
        toggleHideBody(){
                
                let currentDisplay = this.$refs.profile_body.style.display
                 if(currentDisplay == "none"){
                     this.show_details = true
                     this.$refs.profile_body.style.display = "block"
                 }else{
                       this.show_details = false
                      this.$refs.profile_body.style.display = "none"
                 }
        },
         share(){  
             
            
                 let sourceEl = this.$refs.share_profile.$el
                
                 var   elemRect = sourceEl.getBoundingClientRect()

                
                this.$store.dispatch("common/updateSocialShare",{
                     'show': true,
                     'shareable_title': this.agentInfo.name,
                     'description': this.agentInfo.about_us,
                     'url': process.env.ROOT_URL + this.$route.fullPath,
                     'source_element': elemRect,

                })

        },


     },

     



  }
</script>
<style scoped>
a, a::visited {
  text-decoration: none;
  color: grey;
}
</style>