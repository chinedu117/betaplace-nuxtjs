<template>
      <v-layout row v-if="subscriptionList.length > 0">
         <v-flex  xs12>

            <div class="clearfix pricing-grid"
               
            >

                <ul>
                    <li v-for="(subscription,index) in plans"
                        @click="nextPlan(subscription.package_name)"
                        v-resize="onResize"
                        >
                       
                         {{subscription.package_name}}
                      
                    </li>
                    
                </ul>

                <div class="pricing-grid-header"> 
                    <div class="pricing-grid-cell"
                     v-for="(subscription,index) in plans"
                    >
                    {{subscription.package_name}}
                   </div>
 
                </div>

                
                    <!-- display the slots available -->
                <div class="pricing-grid-row" @click="showDetail" v-resize="onResize" >
                    <div class="pricing-grid-cell pricing-grid-cell--title"> Slots</div>

                    <div class="pricing-grid-cell"
                       v-for="(subscription,index) in plans"
                       :data-plan="subscription.package_name"
                    > {{subscription.quantity_slot}}</div>
                    
                </div>

                <div class="pricing-grid-detail" style="display: none">
                    SLOTS: The number of places or accomodations you can upload.
                </div>
                       <!-- slots end -->


                   <!-- display the Duration -->
                <div class="pricing-grid-row" @click="showDetail" >
                    <div class="pricing-grid-cell pricing-grid-cell--title">Duration</div>

                    <div class="pricing-grid-cell"
                       v-for="(subscription,index) in plans"
                        :data-plan="subscription.package_name"
                    > {{subscription.duration_days}}</div>
                    
                </div>

                <div class="pricing-grid-detail" style="display: none">
                   DURATION: The number of days, counting from the day of purchase, before your subscription expires.
                </div>
                       <!-- duration end -->

                <div class="pricing-grid-row" >

                    <div class="pricing-grid-cell pricing-grid-cell--price"
                      v-for="(subscription,index) in plans" 
                       :data-plan="subscription.package_name"
                    ><h4>N {{subscription.price}}</h4>
                        <v-btn success class="mt-2" color="primary" @click="viewPlan(subscription.id)" >BUY</v-btn>
                    </div>
                    
                </div>


            </div>
          </v-flex> <!-- End template for mobile display -->
         
      </v-layout>
</template>

<script>

import HandlesRequest from "@/utils/RequestHandler"
export default { 
    layout: 'default',
    data(){
        return {
            subscriptionList: [],

        }
    },
    computed:{
        plans(){
            // return this.subscriptionList
            return this.$store.getters["dashboard_store/planList"]
        }
    },

    fetch({store}){
         
         //load packages
             
             store.dispatch("dashboard_store/retrievePlans")
                                    .then((response) => {
                                        
                                   })
               
       
    },
  
    methods:{
        onResize(){
             
                  document.querySelectorAll('.pricing-grid-cell--mobile').forEach((element)=>{
                       element.classList.remove("pricing-grid-cell--mobile")
                  })

                 if(Number(window.innerWidth) < Number("959")){
                    
                     document.querySelectorAll('.pricing-grid-row > .pricing-grid-cell:nth-child(2)').forEach((element)=>{
                       
                         // console.log(element.classList.contains('pricing-grid-cell--price'))
                         if(element.classList.contains('pricing-grid-cell--price')){
                            //the price grid started from one since there is no title for price row
                           element.previousElementSibling.classList.add("pricing-grid-cell--mobile")
                         }else{
                            element.classList.add("pricing-grid-cell--mobile")
                         }

                         
                     document.querySelector('.pricing-grid > ul > li:last-child').click()          
                       
                  })

                 }
        },
        nextPlan(plan){
               if(document.querySelector('.pricing-grid ul li.active') !== null){
                 document.querySelector('.pricing-grid ul li.active').classList.remove("active")

               }
               document.querySelectorAll('.pricing-grid-cell--mobile').forEach((element)=>{
                   element.classList.remove("pricing-grid-cell--mobile")
              })
              
              event.target.classList.add('active')
              let elements = document.querySelectorAll('[data-plan="'+plan+'"]').forEach((element)=>{
                   element.classList.add("pricing-grid-cell--mobile")
              })
              
           

        },
        showDetail(event){
            let detailsBox = event.target.parentNode.nextElementSibling
            var currentDisplay = detailsBox.style.display
  
            if(currentDisplay == "none"){
                 
                 detailsBox.classList.add("animated", "slideInDown", "faster")
                
                 detailsBox.style.display = "block"
             
                
            }else{
                 detailsBox.style.display = "none"
                 detailsBox.classList.remove("slideInDown")
                 detailsBox.classList.add( "fadeOutUp")
                 
            }
        },
        loadPlans(){
            //load packages
             const sm = this

             this.mixin_handleRequest(sm.$store.dispatch("dashboard_store/retrievePlans")
                                    .then((response) => {
                                       sm.subscriptionList = sm.$store.getters["dashboard_store/planList"]
                                   }))
               

        },

        viewPlan(planID){
         
            this.$router.push({name: 'PackageView', params:{planID}})

        }
    }
}
</script>

<style type="text/css" scoped>
 * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.pricing-grid {
    padding: 10px;
    width: 100%;
    
}

.pricing-grid ul {
    display: none;
}


.pricing-grid:after {
    content: "";
    clear: both;
}

.pricing-grid-row, .pricing-grid-header {
    display: grid;
    grid-template-columns: 25% repeat(5, 15%);

}

.pricing-grid-header .pricing-grid-cell:first-child, .pricing-grid-cell--price:first-child{

    grid-column-start: 2
}

.pricing-grid-header {
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
}

.pricing-grid-cell {
    border: 1px solid #3faad4e6;
    margin: -1px 0 0 -1px ;
    text-align: center;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-weight: 700;
    font-size: 16px;
}


.pricing-grid-cell--title {
    
    margin: -1px 0 0 0 !important;
    text-transform: uppercase;
    
}

.pricing-grid-row:nth-of-type(4n + 2), .pricing-grid-row:nth-of-type(4n + 2) + .pricing-grid-detail {

    background-color: #e2eff9cc;

}

.pricing-grid-cell--price {
     padding: 25px;
     align-items: center !important;
     flex-direction: column;
     margin-top: -1px !important;
     background-color: #fff !important;

}


.pricing-grid-detail {
    border: 1px solid #3faad4e6;
    border-top: 0px;
    margin: -1px -1px 0 0;
    text-align: left;
    padding: 10px;
}

.pricing-grid-cell.pricing-grid-cell--title {
        margin: -1px -1px 0 0;
        text-align: left !important;
        padding: 10px;
        display: flex !important;
        justify-content: center;
        font-weight: 700;

     }


.pricing-grid-cell.pricing-grid-cell--title::before {
        content: "\e5cf";
        font-family: 'Material Icons';
        font-size: 24px !important;
        position: relative;
        right: 5px;
        margin-left: -10px;

     }

.pricing-grid-cell:not(.pricing-grid-cell--title,.pricing-grid-header)::before {
        font-size: 24px !important;
        position: relative;
        right: 5px;
        margin: 0 25px 0 10px;
     }


 @media only screen and (max-width: 959px) {
    .pricing-grid-row {
        display: grid;
        grid-template-columns: 50% 50%;

     }
     .pricing-grid-cell--price.pricing-grid-cell--mobile{

         grid-column-start: span 2;
         margin-right: 0px !important;
     }

     .pricing-grid-cell--price:nth-child(n+1){

        display: none;
      } 

      

    .pricing-grid-cell.pricing-grid-cell--title {
        border-bottom-color: transparent;
        margin: -1px 0 0 0 !important;
        text-align: center;
        padding: 10px;
        -webkit-transition: border 1s;
         transition: border 1s;
        display: block !important;
     }

     .pricing-grid-cell.pricing-grid-cell--mobile{
        border: 1px solid #3faad4e6;
        margin: -1px 0 0 -1px !important;
        padding: 10px;
        
     }

    .pricing-grid ul {
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        list-style: none;
        font-weight: 700;
        font-size: 16px;
        text-transform: uppercase;
        width: 100%;
    }

    .pricing-grid ul li {
        list-style: none;
        padding: 5px;

    }

    .pricing-grid ul li:hover {
        border-bottom: 5px solid #ddd;
        color: #dddd;

    }
 
    .pricing-grid ul li.active {
        border-bottom: 5px solid red;

    }

    .pricing-grid-header{
        display: none;
    }
    .pricing-grid-cell:nth-child(n+1) {
        display:none;
    }
    .pricing-grid-cell--mobile {
         display:flex !important;
      }

 }

</style>