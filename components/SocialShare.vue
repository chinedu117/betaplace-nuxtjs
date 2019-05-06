<template>
  <!-- <closable-prompt :show="show_prompt" @close-prompt="show_prompt = false"> -->

  <div v-bind="style_bind"  v-if="show">
	<social-sharing 
          :url="url"
          :title="title"
          :description="description"
          :quote="quote"
          :hashtags="hashtags"
          :twitter-user="twitter_user"
          inline-template>
                  <div>
                      
                      <network network="facebook">
                      
                        <i class="fa fa-facebook"></i> facebook
                       <!--  </v-chip> -->
                      </network>
                      <network network="googleplus">
                        <i class="fa fa-google-plus"></i> Google +
                      </network>
                      <network network="telegram">
                        <i class="fa fa-telegram"></i> Telegram
                      </network>
                      <network network="twitter">
                        <i class="fa fa-twitter"></i> Twitter
                      </network>
                      <network network="whatsapp">
                        <i class="fa fa-whatsapp"></i> Whatsapp
                </network>
                  </div>
            </social-sharing>
            <v-icon color="red darken-4" size="18px" @click.prevent="close">close</v-icon>
        </div>
      <!-- </closable-prompt> -->
</template>
<script type="text/javascript">

	export default {
  
		name: 'social-share',
    
    data(){
      return {
      }
    },

    computed:{
         
       url(){

           return this.$store.state.common.socialShare.url
       },

       show: {
           get(){
              return this.$store.state.common.socialShare.show

           },

           set(val){
               this.$store.dispatch("common/updateSocialShare",
                                       { show: false,
                                         shareable_title: null,
                                         description: null,
                                         url: null,
                                         // quote: null,
                                        
                                         twitter_user: null,
                                         position_x:null,
                                         position_y: null
                                       })
                                                                 }
       },

       title(){

            return this.$store.state.common.socialShare.shareable_title
       },

       description(){

          return this.$store.state.common.socialShare.description
       },

       quote(){

          return this.$store.state.common.socialShare.quote

       },

       hashtags(){

          return this.$store.state.common.socialShare.hashtags

       },

       twitter_user(){

          return this.$store.state.common.socialShare.twitter_user

       },
       
       position_x(){
          return this.$store.state.common.socialShare.position_x

       },

        position_y(){
          return this.$store.state.common.socialShare.position_y

       },

       style_bind(){
       
            let style = "left:"+this.position_x +'px;'
                style = style.concat("top:" + this.position_y +'px;')
              // console.log(style)
            if(this.$vuetify.breakpoint.mdAndUp){
                //large screen 
               return {
                   "class":"d-flex justify-space-between elevation-4 prompt prompt--big-screen grey--text font-weight-bold",
                   "style": style
               }
            }else{
              //small screen
                return {
                  "class":"d-flex justify-space-between elevation-4 prompt prompt--mobile grey--text font-weight-bold",
               }
            }
           
       }

    },
		

    methods:{
        close(){
            this.show = false
      }
    }
	}
</script>
<style lang="stylus">
  .prompt
    background-color: #ffff
    border-radius: 2px
    color: #0000
    padding: 10px 10px
    height: auto
    text-align: center
    font-size: 18px
    text-decoration: none
    z-index: 900000

    &--big-screen
      position: absolute
      width: auto
      
    &--mobile
      position: fixed
      left: 0px
      bottom: 0px
      width: 100%
</style>
