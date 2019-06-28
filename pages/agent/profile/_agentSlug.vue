<template>
 <v-container grid-list-md text-xs-center >
  <v-layout row wrap>
     <v-flex xs12>

        <agent-info
         :agent_slug="agentSlug"
         :image_src="imageUrl ? imageUrl : profile.profile_img"
         :show_body=true
         >
           <template slot="uploader">
               <v-progress-linear :indeterminate="true" v-if="loading" class="mt-0"></v-progress-linear>

                    <v-btn fab dark @click='pickFile'  v-bind="upload_button"   color="primary">
                        <v-icon dark>camera</v-icon>
                    </v-btn>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                            >
                   <v-btn fab dark @click='editProfile'  v-bind="edit_button"   color="accent">
                        <v-icon dark>edit</v-icon>
                    </v-btn>
           </template>
        </agent-info>
      </v-flex>
          
    </v-layout>
  </v-container>
</template>

<script>

import UploadsImage from '@/utils/UploadsImage'
import HandleRequest from '@/utils/RequestHandler'
import AgentInfo from '@/components/places_list/AgentInfo'
export default {
  middleware: ['authenticated','has-profile'],
  layout: 'dashboard',
  data() {
      return {
           in_maxWidth: "700",
           in_maxHeight: "500",
           in_compressionQuality: "0.8",
           profile: this.$store.state.place_view_store.agent_info,
      }
  },
  components:{ AgentInfo },
  computed: {
         card_style(){

           if(!this.$vuetify.breakpoint.smAndDown){
             return {
              "width": "100%",
              "class": "mx-auto pa-2",
             }
           }else{
             return {
              "class": "mx-auto px-2",
               }
           }
         },
         upload_button(){
           if(!this.$vuetify.breakpoint.smAndDown){
             return {

              "style":"position: absolute; "
             }
           }else{

             return {
            
              "style":"position: absolute; "

               }
           }
               
         },
         edit_button(){
           if(!this.$vuetify.breakpoint.smAndDown){
             return {
           
              
              "style":"position: absolute; left: 90%; top:80% "
             }
           }else{

             return {
            
              "style":"position: absolute; right: 10%; bottom:10% "

               }
           }
               
         },
         agentSlug(){
              return this.$store.getters['auth/getUser'].slug
         },

         

         
      },
  watch:{
      imageUrl(val){
           this.upload()
      }

  },
  mixins: [ UploadsImage, HandleRequest ],

  async fetch({store}){
       
       await store.dispatch('auth/getMyProfile')

  },


  methods:{
      upload(){

          if(!this.imageBlob)return  false
          let  formData = new FormData()
          formData.append('profile_img',this.imageBlob)
          formData.append('user_id',this.$store.getters['auth/getUser'].id)
         this.mixin_handleRequest(this.$store.dispatch('auth/uploadProfileImage',formData).then(response =>{ 
             this.profile.profile_img = response.data
            //  this.imageUrl = ''
             this.imageBlob = ''
         }))
      },
      editProfile(){

         let slug = this.$store.getters['auth/getUser'].slug
                   this.$router.push({path: '/agent/profile/create'})
      }
  }
}
</script>

<style>

</style>
