<template>
    <!-- the app component helps to determine the viewport -->
    <v-app>
    
    <sidebar/>

    <!-- the main toolbar of the page -->
    
    <tool-bar app v-if="showToolBar"/>
    
    <!-- Search Bar will show only when the search icon is clicked -->
    <search
        v-if="$store.state.places_list_store.search.show"
    />

    <!-- Filter box will display Price filters -->
    <filter-box
        v-if="$store.state.places_list_store.filter_box.show"
    />
        
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
    <!-- social share -->
          <social-share>
          </social-share>
   <!-- the snackbar or toast section for displaying errors and success messages -->
    <v-snackbar
    
	  :right="$vuetify.breakpoint.lgAndUp"
	  v-model="snackBarActive"
	  :timeout="$store.state.common.snackBar.timeout"
	  :bottom="$vuetify.breakpoint.mdAndDown"
      :top="$vuetify.breakpoint.lgAndUp"
      :color="$store.state.common.snackBar.color"
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
     <app-footer >
     </app-footer>
    </v-app>
</template>
<script>
// import InstallPrompt from '@/components/InstallPrompt'
import AppFooter from '@/components/AppFooter.vue'
import Loader from '@/components/Loader'
import ToolBar from '@/components/ToolBar.vue'
import sidebar from '@/components/SideBar.vue'
import search from '@/components/places_list/Search.vue'
import FilterBox from '@/components/places_list//FilterBox.vue'
import SocialShare from '@/components/SocialShare'

export default {

    data() {
        return {
  

            
        }
    },

    components:{  SocialShare, AppFooter, FilterBox, Loader, sidebar, search, ToolBar},
  
    computed: {
    //   loggedIn() {
	// 	return	this.$store.getters["auth/loggedIn"]
			
    //     },
        sidebarVisibility () {
          return this.$store.state.common.sidebar.visible && this.$vuetify.breakpoint.mdAndUp
       },
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

    
}
</script>

<style>
.my-appfooter {
  justify-content: center;
}
  

.my-appfooter--sidebar-open {
  justify-content: center;
  padding-left: 300px;
}

 .footer-item {
     list-style: none;
     display: inline-block;
     
 }

 .wrapper{

	  animation-duration: 0.2s;
     
  }

 

</style>
