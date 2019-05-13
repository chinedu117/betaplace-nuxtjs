<template>
    <div class="action-btn">  
      
            <v-chip 
                :outline="$vuetify.breakpoint.lgAndUp" 
                text-color="accent"
                :class=" $vuetify.breakpoint.lgAndUp ? 'mr-2 pa-2' : 'tool-icon' "
                @click="like()"
                >
                <v-avatar>
                    <v-icon>thumb_up</v-icon>
                </v-avatar>
                {{ tempLikes | abbrNum(1) }}
            </v-chip>


            <v-chip 
            :outline="$vuetify.breakpoint.lgAndUp"
            :text-color="$vuetify.breakpoint.lgAndUp ? 'accent' : 'white'" 
            :class=" $vuetify.breakpoint.lgAndUp ? 'mr-2 pa-2' : 'tool-icon tool-icon-prominent' "
            ref="share_page"
            @click.prevent="share"
                >
                <v-icon :color="$vuetify.breakpoint.lgAndUp ? 'accent' : 'white'">share</v-icon>
            </v-chip>

            

            <v-chip 
            :outline="$vuetify.breakpoint.lgAndUp"
            
            text-color="accent" 
            :class=" $vuetify.breakpoint.lgAndUp ? 'mr-2 pa-2' : 'tool-icon' "
            @click.prevent="seeMap(latitude,longitude)"
            >
                <v-icon color="red darken-2" >place</v-icon>
            </v-chip> 

          
 </div>
</template>
<script>
// import SocialShare from '@/components/SocialShare'
export default {
    name: 'action-btn',
    data() {
        return {
            userHasLiked: false,
            tempLikes: Number(this.likes),
            userHasSeen: false,
            userHasShared: false,
            showAssessment: false,
            timer: null
        }
    },
    mounted(){
        this.seen()
       
        this.timer = setTimeout(()=>{
           this.showAssessment = true
            clearTimeout(this.timer)
        },15000)    
    },

    props:{

        stat_id:{
            required: true,
        },
        likes:{
            //type: Number,
            required: true,
        },

        latitude:{
            //type: Number,
            required:true,
           
        },

        longitude: {
           // type: Number,
            required: true,
           
        },

        agentID:{
            required: true,
            
        },

        social_description: {
          required: true,
          type: String
        },

        social_category: {
          required: true,
          type: String
        },

        social_location: {
          required: true,
          type: String
        }
    },

    computed:{
        shareable_title(){
            return "See this"+ this.social_category + '@' + this.social_location
        }
    },

    methods:{
        // accessment(val){
        //        //todo
            
        // },

        seeMap(lat,long){
           const googleMapUrl = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long 
        //    location.href = googleMapUrl
            this.$store.dispatch('place_view_store/statRequest',{stat_id: this.stat_id, stat_name: 'map'})

            window.open(googleMapUrl,'_blank')
        },

        showAgentInfo()
        {  
            this.$store.dispatch('common/updateDialog',{show: true})
        },

        // shareLink(link)
        // {
        //         const url = encodeURI(location.href)
        //         // this.share()
        //         // if mobile device is in use defined in main.js
        //         if(window.mobileAndTabletCheck){
        //             location.href = 'whatsapp://send?text='+url
        //         }

        // },

        like(){
            
            
            if(!this.userHasLiked)
            {
              
               // this.$store.dispatch('place-view/like')
               this.$store.dispatch('place_view_store/statRequest',{stat_id: this.stat_id, stat_name: 'like'})

               this.userHasLiked = true
            }
            this.tempLikes++
        },
        share(){  

                 let sourceEl = this.$refs.share_page.$el
                
                 var   elemRect = sourceEl.getBoundingClientRect()

                
                this.$store.dispatch("common/updateSocialShare",{
                     'show': true,
                     'shareable_title': this.shareable_title,
                     'description': this.description,
                     'url': process.env.ROOT_URL + this.$route.fullPath,
                     'source_element': elemRect,
                     // 'position_x': pos_x,
                     // 'position_y': pos_y

                })

                if(!this.userHasShared){
                 
                  this.$store.dispatch('place_view_store/statRequest',{stat_id: this.stat_id, stat_name: 'share'})
                }

        },

        seen(){
            if(!this.userHasSeen)
             {  
                this.$store.dispatch('place_view_store/statRequest',{stat_id: this.stat_id, stat_name: 'seen'})
                
                    
                   this.userHasSeen = true
             }
        }


        // convert(n,d)
        // {x=(''+n).length,p=Math.pow,d=p(10,d)
        //  x-=x%3
        // return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]
        // },

     
    },

 filters: {
          abbrNum(number, decPlaces) {

               if(!number) return ''

               if(isNaN(decPlaces)){

                   decPlaces = 1
               }
                // 2 decimal places => 100, 3 => 1000, etc
                decPlaces = Math.pow(10,decPlaces) 
                // console.log(decPlaces)
                // Enumerate number abbreviations
                var abbrev = [ "K", "M", "B", "T" ] 

                // Go through the array backwards, so we do the largest first
                for (var i=abbrev.length-1; i>=0; i--) {

                    // Convert array index to "1000", "1000000", etc
                    var size = Math.pow(10,(i+1)*3) 

                    // If the number is bigger or equal do the abbreviation
                    if(size <= number) {
                        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                        // This gives us nice rounding to a particular decimal place.
                        number = Math.round(number*decPlaces/size)/decPlaces 

                        // Handle special case where we round up to the next abbreviation
                        if((number == 1000) && (i < abbrev.length - 1)) {
                            number = 1 
                            i++ 
                        }

                        // Add the letter for the abbreviation
                        number += abbrev[i] 

                        // We are done... stop
                        break 
                    }
                }

                return number 
    },
 }
}
</script>
<style lang="stylus" scoped>

@media screen and (max-width: 1080px)
  .toolbox
    width: 100%
  
  .action-btn
    display: flex
    justify-content: space-between
    background: #fff !important;
    height: auto
    padding: 8px 5px
    position: fixed
    bottom: 0px
    width: 100%
    z-index: 100000
    border-top: 2px solid #3f51b5
    box-shadow: 0px -1.2px 6px rgba(0, 0, 0, 0.2)

  .tool-icon
    background: none;
  .tool-icon-prominent
    width: 50px
    height: 50px
    border-radius:50%
    background: #414190 !important;
    color: white;
    margin: 0px auto;
    box-shadow: 0px -1.2px 6px rgba(0, 0, 0, 0.2)
</style>

