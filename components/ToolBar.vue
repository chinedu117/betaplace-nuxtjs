<template>
    <v-toolbar flat fixed dark color="accent" app>
        
        <logo/> 
        <!-- <v-toolbar-title>{{ $store.state.common.title }}</v-toolbar-title> --> 
        <v-spacer></v-spacer>
        <v-toolbar-items>
           
            <component :is="component" class="d-flex justify-space-around align-center mt-1">
                <slot></slot>
                
            </component>
   
            <v-btn class="ma-2" style="height:50%" v-show="!$vuetify.breakpoint.smAndDown" v-if="!loggedIn" to="/agent/login" outline>Become An Agent</v-btn>
           
            
            <v-btn class="ma-2" style="height:50%" v-show="!$vuetify.breakpoint.smAndDown" v-if="loggedIn" to="/agent/logout" outline><v-icon>logout</v-icon></v-btn>

          </v-toolbar-items>
              <v-toolbar-side-icon size="$vuetify.breakpoint.mdAndUp ? '45' : '24'" @click.stop="toggleNav()">
              </v-toolbar-side-icon>
    </v-toolbar>
</template>

<script>
import Logo from '@/components/Logo.vue'
import PlacesListToolBarItems from '@/components/places_list/ToolBarItems.vue'
export default {
    name: 'tool-bar',
    data(){
        return {
            scrollOptions: {
                 duration: 300,
                 offset: -80,
                 easing: 'easeInOutCubic',
           },
          
        }
    },
    components:{ PlacesListToolBarItems, Logo },
    
    computed:{
        component:{
            get(){

                return this.$store.state.common.toolBar.component
            },
            set(val){
                return val
            }
            

        },

        loggedIn(){

            return this.$store.getters['auth/loggedIn']
        }
    },

    mounted () {
            // Update page title.
            

            this.$store.watch((state) => {
              return state.common.toolBar.component
            }, (component) => {

             this.component = component
            
            }, {
            deep: true
            })//watch end
        },
    methods: {
        
        toggleNav() {
            if(this.$store.state.common.sidebar.visible){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }else{
                 
                 this.$store.dispatch('common/updateSidebar',{visible: true})
            }

            //console.log('Toggle')
        },


    }

}
</script>

<style>

</style>
