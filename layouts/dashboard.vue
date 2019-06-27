<template>
    <!-- the app component helps to determine the viewport -->
    <v-app>
    
    <sidebar/>

    <!-- the main toolbar of the page -->
    <tool-bar app v-if="showToolBar"/>
       
    <v-content>
         <!-- the transition of the route view -->
        <transition 
	            name="router-animation"
	            enter-active-class="animated fadeIn"
	            leave-active-class="animated  fadeOut"
	            mode="out-in"
	        >
                <!-- <v-container class="wrapper" fluid> -->
             
                    <nuxt/>
            
                <!-- </v-container> -->

         </transition>
    </v-content>
  
   <!-- the snackbar or toast section for displaying errors and success messages -->
    <v-snackbar
    
	  :right="$vuetify.breakpoint.lgAndUp"
	  v-model="snackBarActive"
	  :timeout="$store.state.common.snackBar.timeout"
	  :bottom="$vuetify.breakpoint.mdAndDown"
      :top="$vuetify.breakpoint.lgAndUp"
      color="$store.state.common.snackBar.color"
      >
    
        {{ $store.state.common.snackBar.msg }}
        <v-btn
            color="$store.state.common.snackBar.color"
            flat
            @click="snackBarActive = false"
        >
            Close
        </v-btn>
	 </v-snackbar>
     <loader/>
     <!-- the footer section -->
     <app-footer/>
      
    
    </v-app>
</template>
<script>
import Loader from '@/components/Loader'
import AppFooter from '@/components/AppFooter'
import ToolBar from '@/components/ToolBar.vue'
import sidebar from '@/components/dashboard/Sidebar.vue'

export default {

    data() {
        return {
  

            
        }
    },

    components:{ AppFooter,Loader, sidebar, ToolBar},
  
    computed: {
    //   loggedIn() {
	// 	return	this.$store.getters["auth/loggedIn"]
			
    //     },
        
        showToolBar()
        {   
            return this.$store.state.common.toolBar.show
           
        },

        snackBarActive: {

             get () {
                 return this.$store.state.common.snackBar.show
            },

            set (val) {
                this.$store.dispatch('common/updateSnackBar',{ show : val})
            }

           
        }
    },
    methods: {
        
    }
    
}
</script>

<style>
 .footer-item {
     list-style: none;
     display: inline-block;
     
 }

 .wrapper{

	  animation-duration: 0.2s;
     
  }

 

</style>
