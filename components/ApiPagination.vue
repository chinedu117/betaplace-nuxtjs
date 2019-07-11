 <template>
 	<div class="text-xs-center">
 		<v-pagination
           v-model="page"
           :length="total_pages"
           @next="nextPage"
           @input="gotoPage"
           @previous="previousPage"
 		>
    	
       </v-pagination>
 	</div>
    
 </template>
 <script>
    export default {
       name: 'api-pagination',
       data() {
          return {
             page:1,
          }
       },
       computed: {
            
            // baseUrl(){

            // 	 return this.url.replace('/page=\d+$/i','')
            // },
            total_pages(){

            	 return this.$store.state.common.pagination.total_pages
            },

            url(){

            	  return this.$store.state.common.pagination.url
            }
       },

       methods: {
           
           nextPage(){
              if(this.page < this.total_pages){
              	 	   var page = this.page++
            	       this.gotoPage(page)
              }
           },

            gotoPage(page){


                 var url = this.url.trim().replace(/page=\d+$/i,'page='+page)

                 this.$axios.get(url).then((response) => {

                 	 this.$emit('pagination-results',response)
                 })
 
            },

            previousPage(){

            	  if(this.page > 1) {
            	  	 var page = this.page--
            	     this.gotoPage(page)
            	  }
                  
            }


       }
    }
 </script>
