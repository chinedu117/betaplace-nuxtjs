<template>

  <v-footer class="my-appfooter" :class="{ 'my-appfooter--sidebar-open': sidebarVisibility }" >
       <ul>

          <li><nuxt-link to='/company/privacy'>privacy policy</nuxt-link></li>
          <li><nuxt-link to='/company/terms-and-conditions'>terms and conditions</nuxt-link></li>
           <li><nuxt-link to= '/company/rules'>Rules</nuxt-link></li>
           <li><nuxt-link to='/company/contact'>Contact us</nuxt-link></li>
       </ul>

          <p>copyright © 2019 betaplace.com.ng</p>
  </v-footer>   
</template>

<script>
export default {
  name:'AppFooter',
  data(){
     return {

     }
  },
  computed: {
    sidebarVisibility () {
      return this.$store.state.common.sidebar.visible && this.$vuetify.breakpoint.mdAndUp
    }
  }
}
</script>

<style scoped>
.my-appfooter {
  justify-content: center;
  text-align: center;
  background: #e7e9ef33 !important;
  padding: 35px 20px;
  font-size: 16px;
  display: block;
  height: auto !important;

}


.my-appfooter--sidebar-open {
  justify-content: center;
  margin-left: 300px;
}

.my-appfooter > ul {
    list-style: none;
    margin: 25px auto 35px;
    padding: 0;
    color: black;
}

.my-appfooter > ul > li {
    display: inline-block;
    margin: 0 18px;
    text-transform: capitalize;
}
 
a {
   text-decoration: none;
   color: inherit;
}

@media screen and (max-width: 1080px){
   .my-appfooter > ul {

      display: none;
   }
   .my-appfooter {
     padding: 10px 10px;
   }
}

</style>
