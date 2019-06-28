<template>
    <div> 
      <v-container grid-list-xs class="container--mobile">
        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >
          <div
           v-if="places.length > 0"
           class="mx-auto"
          > 

           <div class="d-flex justify-space-between">
              <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
           </div>

                <place-list-item
                 v-for="(place, index) in places"
                 :index = "index"
                 :key="Math.random() + '_' + place.slug"
                 :place="place"
                />
        
                <load-more/>
         </div>

           <div class="pa-2 mt-3 mx-auto elevate-2 checking-place"  v-else >
        
              <p>Oops....All the available accomodation has been taken</p>

               <v-btn class="ma-2" v-if="!loggedIn" to="/agent/login" outline>Become An Agent</v-btn>

          </div>

         </v-flex>
         
        </v-layout>

      </v-container>
       <mobile-footer/>
    </div>
      
      <!-- loader spinerre -->

</template>

<script>

import MobileFooter from '@/components/places_list/MobileFooter'
import Subscribe from '@/components/Subscribe.vue'
import LoadMore from '@/components/places_list/LoadMore.vue'
import PlaceListItem from '@/components/places_list/PlaceListItem'

export default {
  name: 'places-list',
  layout: 'default',
  middleware: "toolbar-items",
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },

  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
      //remove the searach box and the filters
      this.$store.dispatch('common/updateToolBar',{show: true, component: ''})
      next()
  },
  components: { Subscribe, LoadMore, MobileFooter, PlaceListItem},
 
  async fetch({store}){
       
          await store.dispatch('places_list_store/retrievePlaces')
        
    },


  computed: {
    card_style(){
         

    },
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFiltered']

        },
        set(val){}

    },
    
  }, 
}
</script>

<style lang="stylus">
.checking-place
  font-size: 20px
  width: 80%
  border-radius: 3px
  background: #dfe1e6

@media screen and (max-width: 1080px)
  .container--mobile
    width="100%"
    padding: 0px 0px !important
</style>
