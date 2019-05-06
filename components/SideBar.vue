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
        <v-list class="pt-4 text--capitalize">
            <v-list-tile avatar to="/">
                <v-list-tile-avatar>
                    <v-icon>home</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            
           
            <v-list-tile v-if="loggedIn" avatar to=" `/dashboard/${agent_slug}` ">
                <v-list-tile-avatar>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="loggedIn" avatar to="/agent/logout">
                <v-list-tile-avatar>
                    <v-icon>logout</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


            
            <v-btn class="ml-4" v-if="!loggedIn" to="/agent/login" outline>LET OUT YOUR SPACE</v-btn>

           

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

      computed:{
        loggedIn() {
		      return	this.$store.getters["auth/loggedIn"]
			
        },

        agent_slug(){
             return this.$store.getters["auth/getUser"].slug
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

     
        }
    }
    }
    </script>
    <style>
    
    </style>
    