<template>
    <div> 
      <v-container grid-list-xs class="container--mobile">
        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >

          
          <v-card  width="700px">
            <v-card-text>
               <v-text-field 
                      focus="true"
                      v-model="searchText"
                      autofocus
                      placeholder='Search Place eg. Wuse, Abuja'
                      @keyup.enter="search"    
                      outline
                      >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
               <v-btn class="ml-2" dark color="primary" @click="search">Search</v-btn>
            </v-card-actions>    

          </v-card>

          <div
           v-if="places.length > 0"
           class="mx-auto"
          > 

           <div class="d-flex justify-space-between">
              <v-subheader>Result <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
           </div>
                
                <place-list-item
                 v-for="(place, index) in places"
                 :index = "index"
                 :key="Math.random() + '_' + place.slug"
                 :place="place"
                />
              <api-pagination v-on:pagination-results="handlePaginationResult" ></api-pagination>
                
                <!-- <load-more/> -->

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
import PlaceListItem from '@/components/places_list/PlaceListItem'
import ApiPagination from '@/components/ApiPagination.vue'

export default {
  name: 'places-list',
  layout: 'default',
  middleware: "toolbar-items",
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
            searchText: '',
            showSearch: true
    }
  },

  components: { MobileFooter, PlaceListItem, ApiPagination },
 
  computed: {
    card_style(){
         

    },
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFound']

        },
        set(val){

        }

    },

  
    
  },

  methods: {
        handlePaginationResult(foundResponse){

          this.$store.dispatch('places_list_store/clearSearch')
          .then(response => {
               this.$store.dispatch('places_list_store/updateSearchBox',{ 'found': foundResponse.data.data,'show': true})  
          })

         },

        search(){
            // let search = val.trim().toLowerCase();
            if(this.searchText.trim().toLowerCase() == '' || this.searchText.trim().toLowerCase().length < 3)return
            this.$store.dispatch('places_list_store/search',this.searchText.trim().toLowerCase())
        },
      
    }
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
