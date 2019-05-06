<template>
    <div> 
      
      <v-container grid-list-xs class="container--mobile" v-if="true">

        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >

             <agent-info
                 :agent_slug="$route.params.agentSlug"
                 :show_body="false"
                 />

              <div
               v-if="places.length > 0"
               class="mx-auto"
              > 

                <place-list-item
                 v-for="(place, index) in places"
                 :index = "index"
                 :key="Math.random() + '_' + place.slug"
                 :place="place"
                />
        
                <load-more/>
         </div>

         </v-flex>
         
        </v-layout>

      </v-container>
       <mobile-footer/>
    </div>
      
      <!-- loader spinerre -->

</template>
<script>

import Subscribe from '@/components/Subscribe.vue'
import AgentInfo from '@/components/places_list/AgentInfo.vue'
import PlaceListItem from '@/components/places_list/PlaceListItem'
import LoadMore from '@/components/places_list/LoadMore.vue'


export default {
  layout: 'default',
  name: 'agent-places-list',
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },
 
  components: { Subscribe,  AgentInfo, PlaceListItem },
 
  async fetch({store, params}){
        // console.log(this.$http)
        
         await store.dispatch('places_list_store/retrieveAgentPlaces', params.agentSlug)
        

    },


  computed: {
    
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFiltered']

        },
        set(val){}

    },
    hasUserCoords(){

           return this.$store.getters['places_list_store/hasUserCoords']
        }
     
  },
 
 methods: {

   // visitPlace(place)
   // {  
   //     const agentSlug = this.$router.params.agentSlug

   //     console.log("route agentSlug   " + agentSlug)

   //     this.$router.push({path: `/${agentSlug}/${place}`})
   // },
 }
}
</script>
<style>

</style>
