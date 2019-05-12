<template>
       <div
         class="list-card"
          @click="visitPlace(place.agent.slug, place.slug)"
         
                
        >
             
           <v-card-title class="text-md-left mb-0 pb-0">
             <div style="width:100%">
              
              <v-layout  row wrap v-if="place.prefered || place.distance ">
                <v-flex xs8>
                   <div  v-if="place.prefered">
                     <span  class="grey--text font-weight-medium text-xs-left" >By Your Preference</span><br>
                   </div>
                 </v-flex>
                <v-flex xs4>
                   <div class="grey--text font-weight-medium text-xs-right" v-show="hasUserCoords && $vuetify.breakpoint.smAndDown" v-if="place.distance"><b>{{place.distance | distance }}</b>
                   </div>
                </v-flex>
              </v-layout>

               <v-layout  row wrap>
                   <v-flex md9>
                   <span class="title headline--mobile">{{place.category.name}}</span>
                 </v-flex>
                 <v-flex md3 class="text-xs-right red--text font-weight-medium">
                   <div  class="text-xs-right red--text font-weight-medium" > {{place.price | currency}}</div>
                 </v-flex>
               </v-layout>
               


               <div class="text--grey lighten-4 subheading text-capitalize">
                <v-icon class="pr-2 lighten-4" >place</v-icon>
                <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span><br>
                
              </div>
             </div>
           </v-card-title>


         <v-card-text class="text-xs-left list-body">

            <span class=" wrap">{{ place.description }}</span><br>
            
         </v-card-text>
          
         <v-card-actions class="list-body">
           <v-layout  row wrap justify-space-between>
                 <v-flex md6>
                  <v-btn flat color="accent" @click="visitPlace(place.agent.slug, place.slug)">Let's See</v-btn>
               </v-flex>
               <v-flex md6>
                 <span class="grey--text font-weight-medium" v-show="hasUserCoords" v-if="place.distance"> approx <b>{{place.distance | distance }}</b> from your location</span>
               </v-flex>
             </v-layout>
          
           
           
         </v-card-actions>
      </div>
  </template>

  <script>
    
    export default {

      name: 'place-list-item',

      data(){
         return {

         }
      },

      props:{

          place: {
                required: true,
                type: Object,

          }
      },

   computed: {
      hasUserCoords(){

           return this.$store.getters['places_list_store/hasUserCoords']
        }
     
   },
   methods: {

       visitPlace(agentSlug,place)
       {
          
           this.$router.push({path: `/${agentSlug}/${place}`})
       },
    },

    filters:{
     distance(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " KM"
    }
   }
}
  </script>
<style lang="stylus" scoped>
.list-body
  display: block

.list-card
  display: block
  width: 700px
  border-radius: 5px
  margin-bottom: 16px
  margin-left: auto 
  margin-right: auto
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  cursor: pointer
@media screen and (max-width: 1080px)
  .list-card
    width: 100%
    margin: 0px 0px
    padding: 0px 0px
    border-bottom: 2px solid #ddd
    border-radius: 0px
    box-shadow: 0px 0px
    padding-bottom: 5px

  .container--mobile
    width="100%"
    padding: 0px 0px !important
  .list-body
    display: none
</style>