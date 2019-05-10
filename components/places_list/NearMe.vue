<template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" :size="$vuetify.breakpoint.mdAndUp ? '40' : '24'" :color="nearMeFilter ? 'red' : 'white'"  @click="toggleNearMe">my_location</v-icon>
      </template>
      <span v-if="!nearMeFilter">Customize content to your location</span>
      <span v-else>Click to switch off your location</span>

    </v-tooltip>
     

     <!-- <v-switch label="Near me" v-model="nearMeFilter" ></v-switch> -->
</template>
<script>
export default {
    name: 'near-me',
    data() {
        return {
            nearMeFilter: this.$store.getters['places_list_store/hasUserCoords'],
        }

    },
    watch: {
        nearMeFilter(val)
        {
            if(val){
                this.filterByDistance()
            }else{
                 
                 this.resetFilter()
            }
        }
    },
    methods: {

        filterByDistance(){
               
                // navigator.geolocation.getCurrentPosition(function(position){
                    
                // })
                let myLocation 
                
                    

                    this.$getLocation({
                        enableHighAccuracy: false,
                        timeout: Infinity,
                        maximumAge: 0
                    })
                    .then((coordinates) => {
                       
                        myLocation  =  {
                                latitude: coordinates.lat,
                                longitude: coordinates.lng
                            }
                        // console.log(myLocation.length > 0)
                        this.$store.dispatch('places_list_store/updateUserCoords',myLocation)
                        
                    })  
            
                    .catch( (error) => {

                        this.nearMeFilter = false
                        this.$store.dispatch('common/updateSnackBar',{
                            show: true,
                            msg: error,
                            color: ''
                    })

                    })
               
        
            },

            resetFilter()
            {
                 this.$store.dispatch('places_list_store/clearUserCoords')
            },


            toggleNearMe(){

                if(this.nearMeFilter){
                    
                    this.nearMeFilter = false
                }else{
                     
                     this.nearMeFilter = true
                }
            }
    

    },


}
</script>

