<template>
   <div  v-if="$vuetify.breakpoint.mdAndUp">
    <div>
    <near-me  v-bind="iconProps"></near-me>
    </div>
    
    <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
      <v-icon v-on="on" v-bind="iconProps"  @click="displaySearchBox">search</v-icon>
       
     </template>
      <span>Search by Location</span>
    </v-tooltip>
    </div>

    <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
      <v-icon v-on="on"  v-bind="iconProps" @click="displayFilterBox">filter_list</v-icon>
     
     </template>
      <span>Filter by your priorities </span>
    </v-tooltip>
     </div>
   </div>
</template>

<script>
import NearMe from '@/components/places_list/NearMe.vue'
export default {
    name: 'tool-bar-items',
    components:{NearMe},
    computed: {
        iconProps(){

         if(this.$vuetify.breakpoint.mdAndUp){
              return {
                "class": "pr-2 mr-4",
                 "size": "40"

              }
            }else{
               return {
                "class": "pr-2 mr-1",
                 "size": "24"

             }
            }
            
        }
    },
    methods:{
        displaySearchBox()
        {  
            this.$router.push({path: '/search'})
        },

        displayFilterBox(){
             
            //  this.showFilters = true
            //  this.$vuetify.goTo(0,this.scrollOptions)
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateFilterBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
            
        },
    }
}
</script>

<style>

</style>
