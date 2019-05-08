  <!-- the Navigation drawer showing the links -->
  <template>
        <!-- the Navigation drawer showing the links -->
    <v-navigation-drawer  v-model="active" app >
        <v-toolbar flat dark color="accent">
             <v-btn flat icon large @click.stop="toggleNav()">
                <v-icon>chevron_left</v-icon>
            </v-btn>    
        </v-toolbar>
        
        <v-divider></v-divider>

        

        <v-list class="pt-4">
            <v-list-tile avatar to="/">
                <v-list-tile-avatar>
                    <v-icon>home</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>HOME</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-divider></v-divider>
            
             <v-list-tile avatar to="/dashboard/">
                <v-list-tile-avatar>
                    <v-icon>place</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>DASHBOARD</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar to="/company/getting-started">
                <v-list-tile-avatar>
                    <v-icon>android</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>GET STARTED</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="loggedIn" avatar to="/agent/logout">
                <v-list-tile-avatar>
                    <v-icon>logout</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>LOGOUT</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="loggedIn" avatar to="`/agent/profile/${agent_slug}`">
                <v-list-tile-avatar>
                    <v-icon>person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>MY PROFILE</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


           <v-list-tile avatar to="/pricing">
                <v-list-tile-avatar>
                    <v-icon>money</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>PRICING</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar to="/dashboard/subscription-history">
                <v-list-tile-avatar>
                    <v-icon>notes</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>SUBSCRIPTION</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar v-if="!loggedIn" to="/agent/forgot-password">
                <v-list-tile-avatar>
                    <v-icon>vpn_key</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>FORGOT PASSWORD</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
 
        
    </v-navigation-drawer>
    </template>

    <script>
    export default {
      
      name: 'sidebar',
      data() {
        return {
          
        }
      },

      created()
      {
          this.$store.dispatch('common/updateSidebar',{visible: this.$vuetify.breakpoint.lgAndUp})
      },

    //   props: {
    //     active:{
    //        required: true,
    //        type: Boolean,
    //        default: false //this.$vuetify.breakpoint.lgAndUp
    //     }
    //   },

      computed:{
        loggedIn() {
		      return	this.$store.getters["auth/loggedIn"]
			
        },
        agent_slug(){

             if(this.$store.getters["auth/loggedIn"]){
                 return	this.$store.getters["auth/getUser"].slug
             }else{
                 return	''
             }
             
        },
        active:{
            get()
            {
                return this.$store.state.common.sidebar.visible
            },

            set(val)
            {
                this.$store.dispatch('common/updateSidebar',{visible: val})
            }
        }
      },
     
      methods: {

        toggleNav() {
            if(this.active){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }else{
                 
                 this.$store.dispatch('common/updateSidebar',{visible: true})
            }

            console.log('Toggle')
        }
    }
    }
    </script>
    <style>
    
    </style>
    