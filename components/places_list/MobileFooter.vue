<template>
    <div class="agent-prompt elevate-3">
           <div class="tool-icon">
                 
                  <v-icon  size="30px" v-bind="iconProps"  @click="displaySearchBox">search</v-icon>
                     <br>
                   <span class="grey--text text-capitalize text-xs-center">Search</span>
               
            </div>


           <div class="tool-icon tool-icon-prominent">
            <near-me  v-bind="iconProps"></near-me>
            </div>
            

            <div class="tool-icon">


                  <v-icon  v-bind="iconProps" @click="displayFilterBox">filter_list</v-icon>
                    <br>
                    <span class="grey--text text-capitalize text-xs-center">Filter</span>
            
            </div>



    
</div>
</template>

<script>
import NearMe from '@/components/places_list/NearMe.vue'
export default {
    name: 'mobile-footer',
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
            //  console.log(this.$vuetify.goTo)
            //hide toolBar
            //show searchBox
            //scrol up
            //hide the sidebar
            if(this.$store.state.common.sidebar.visible){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateSearchBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
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

<style lang="stylus" scoped>
.agent-prompt
  display:none
@media screen and (max-width: 1080px)
  .toolbox
    width: 100%
  
  .agent-prompt
    display: grid
    grid-template-columns: repeat(3,33.3%)
    background-color: #fff;
    height: auto
    padding: 8px 5px
    position: fixed
    bottom: 0px
    width: 100%
    z-index: 100000
    border-top: 2px solid #3f51b5
    box-shadow: 0px -1.2px 6px rgba(0, 0, 0, 0.2)

  .tool-icon
    background-color: none
    margin: 0px auto;
  .tool-icon-prominent
    width: 50px
    height: 50px
    border-radius:50%
    background-color: #414190;
    color: white;
    margin: 0px auto;
    padding: 12.5px;
    box-shadow: 0px -1.2px 6px rgba(0, 0, 0, 0.2)
</style>
