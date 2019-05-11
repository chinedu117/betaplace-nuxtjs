<template>
   <v-layout row>
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
          <v-container grid-list-xs>
              <v-layout row wrap>
                  <v-flex xs12>
                      <!-- first page -->
                      <v-card :width="$vuetify.breakpoint.mdAndUp ? '700px' : 'auto' " class="mx-auto" style="border-radius: 5px" v-if="pageNum === 1">
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">
                                          Basic Information
                                       </span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >
                                         
                                           Step {{ pageNum }} of 4
                                       </span>
                                     </v-flex>
                                 </v-layout>
                            </div>
                         <!-- header -end -->
                        <!-- <v-form> -->
                          <v-card-text>
                            
                            <v-select
                                item-value="id"
                                item-text="name"
                                :items="category"
                                v-model="newPlace.place_category_id"
                                label="Select Category"
                                
                                :error-messages="errors.collect('category')"
                                v-validate="'required'"
                                data-vv-name="category"
                                outline
                            ></v-select>
                            
                            
                            <v-textarea
                                label="Description"
                                name="description"
                                v-model="newPlace.description"
                                :counter="200"
                                :error-messages="errors.collect('description')"
                                v-validate="'required|max:200'"
                                data-vv-name="description"
                                outline
                            ></v-textarea>

                            <v-text-field
                                label="Price"
                                name="price"
                                v-model="newPlace.price"
                                :error-messages="errors.collect('price')"
                                v-validate="'required|integer'"
                                data-vv-name="price"
                                @blur="showPriceDescripition"
                                outline
                            ></v-text-field>
                            <v-textarea
                               name="price_description"
                               v-validate="'required|max:150'"
                               :error-messages="errors.collect('price_description')"
                               data-vv-name="price_description"
                               label="Price Description"
                               id="price_description"
                               v-model="newPlace.price_description"
                                
                                outline
                                
                           ></v-textarea>
                      </v-card-text>
                            
                            <v-card-actions :class="creating ? 'justify-end' : 'justify-space-between'">
                                <v-btn v-if="!creating" color="success" @click="prevPage">OK</v-btn>
                               <!-- <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn> -->
                               <v-btn color="success" @click.prevent="nextPage">NEXT</v-btn>

                           </v-card-actions>

                        </v-card >
                        <!--First page end  -->

                        <!-- second page -->
                         <v-card :width="$vuetify.breakpoint.mdAndUp ? '700px' : 'auto' " class="mx-auto" style="border-radius: 5px" v-if="pageNum === 2">
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">
                                          Location Information
                                       </span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >
                                         
                                           Step {{ pageNum }} of 4
                                       </span>
                                     </v-flex>
                                 </v-layout>
                            </div>
                         <!-- header -end -->
                        <!-- <v-form> -->
                          <v-card-text>
                                

                              <v-text-field
                               outline
                               name="country"
                               label="Country"
                               id="country"
                               disabled
                               v-model="newPlace.country"
                           ></v-text-field>

                            <v-select
                                name="state"
                                :items="states"
                                outline
                                v-validate="'required'"
                               :error-messages="errors.collect('state')"
                               data-vv-name="state"
                                label="State"
                                v-model="newPlace.state"
                               id="state"

                            ></v-select>

            
                           <v-text-field
                               name="city"
                               label="City"
                               :error-messages="errors.collect('city')"
                               data-vv-name="city"
                               v-validate="'required|max:200'"
                               id="city"
                                v-model="newPlace.location"
                                outline
                           ></v-text-field>

                           <v-textarea
                               name="address"
                               label="Address"
                               v-validate="'required|max:200'"
                               :error-messages="errors.collect('address')"
                               data-vv-name="address"
                               id="address"
                                v-model="newPlace.address"
                                @blur="showAddress = true"
                                outline
                           ></v-textarea>
                            
                            <v-card v-if="showAddress"> 
                             <v-subheader class="subheading font-weight-medium">It Will Be Shown Like this:</v-subheader>

                             <v-card-text>  
                              <span class="caption red--text">Use comma(,) to punctuate your address</span>
                                <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(newPlace.address,newPlace.location,newPlace.state,newPlace.country) | insertBreaks">
                            </p>
                             </v-card-text>
                            
                            </v-card>
                            

                           <v-switch  v-if="!geoLocation" label="Mark this Point" v-model="geoLocation"></v-switch>
                            <div v-if="geoLocation">
                                <v-subheader>Location of the Accomodation</v-subheader>   
                                <v-text-field
                                name="latitude"
                                label="Latitude"
                                id="latitude"
                                    v-model="newPlace.latitude"
                                    disabled
                              ></v-text-field>

                                <v-text-field
                                    name="longitude"
                                    label="Longitude"
                                    id="longitude"
                                    v-model="newPlace.longitude"
                                    disabled
                                ></v-text-field>
                           </div>
                          </v-card-text>
                           <v-card-actions class="justify-space-between">

                               <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn>

                               <!-- <v-btn color="success" @click.prevent="submitPlace">SUBMIT</v-btn> -->

                               <v-btn color="success" @click.prevent="nextPage">NEXT</v-btn>

                           </v-card-actions>
                         </v-card>

                         <!-- second page end -->
                          
                     <v-card :width="$vuetify.breakpoint.mdAndUp ? '700px' : 'auto' " class="mx-auto" style="border-radius: 5px" v-if="pageNum === 3">
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">
                                          Features 
                                       </span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >
                                         
                                           Step {{ pageNum }} of 4
                                       </span>
                                     </v-flex>
                                 </v-layout>
                            </div>
                         <!-- header -end -->
                        <!-- <v-form> -->
                          <v-card-text>
                                
                               
                              <v-container grid-list-xs class="pb-5" >
                                <v-layout row wrap>
                                    <v-flex xs4>
                                    <v-text-field
                                        outline
                                        name="feature"
                                        label="Feature"
                                        id="feature"
                                        v-model="newFeature.feature"   
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                        outline
                                        name="value"
                                        label="Specification"
                                        id="specification"
                                        append-icon="save"
                                        @click:append="addFeature"
                                        v-model="newFeature.value" 
                                    ></v-text-field>
                                </v-flex>
                                </v-layout> 
                                

                                <v-layout 
                                row 
                                wrap 
                                v-for="(feature,index) in features" 
                                :key="index"
                                :index="index"
                                
                                >
                                    <v-flex xs4 >
                                        <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word; height: 100%"> 
                                            {{ feature.feature }}
                                        </div>
                                        
                                    </v-flex>
                                    <v-flex xs6 class="justify-space-between" > 
                                        <div style="height:100%" class="d-block pa-2 grey lighten-4 ">
                                            {{ feature.value }}
                                            
                                        </div>
                                    </v-flex>
                                    <v-flex xs2 >
                                        <v-icon class="pa-2 grey lighten-4" style="display: block; height: 100%" color="red" @click="removeFeature(index)">close</v-icon>
                                    </v-flex>
                                </v-layout>
                              
                          </v-container>
                           </v-card-text>
                         <v-card-actions class="justify-space-between">
                               

                               <v-btn color="success" @click="prevPage">PREVIOUS</v-btn>

                               <v-btn align-end v-if="features.length > 0" color="success" @click.prevent="nextPage">NEXT</v-btn>

                           </v-card-actions>
                     </v-card>

                    <v-card :width="$vuetify.breakpoint.mdAndUp ? '700px' : 'auto' " class="mx-auto" style="border-radius: 5px" v-if="pageNum === 4">
                        <!-- header -->
                        <div class="pa-3 mb-3" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">
                                         Cover image
                                       </span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >
                                         
                                           Step {{ pageNum }} of 4
                                       </span>
                                     </v-flex>
                                 </v-layout>
                            </div>
                         <!-- header -end -->
                        <!-- <v-form> -->
                          <v-card-text>


                        <v-card 
                        flat 
                        
                        v-for="(image, index) in images"
                        :key="index"
                        color="grey lighten-2"
                         class="pa-3 ma-2"
                        >
                            <v-img 
                            :src="image.src"
                            max-width="100%" 
                                
                            >
                                <v-layout 
                                    slot="placeholder"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                    >
                                        <v-progress-circular indeterminate color="grey lighten-5">

                                        </v-progress-circular>
                                </v-layout>
                        </v-img>
                        <v-card-title class="pb-2" >
                            <div class="text-truncate subheading font-weight-bold">
                                {{ image.title }}
                            </div>
                              
                        </v-card-title >
                        <v-card-text class="pt-0">

                            <read-more 
                                more-str="Read more" 
                                :text="image.description" 
                                link="#" 
                                less-str="Read Less" 
                                :max-chars="50"
                                class="text--grey"
                                >
                            </read-more>
                           
                       </v-card-text>
                       <v-card-actions>
                           <v-btn color="success" @click="removeImage(image.id,index)">DELETE</v-btn>
                       </v-card-actions>
                   </v-card>


                         <!-- <img src="http://betaplace.test/storage/place_images/LiKt73H1M3jWgOpA4YSGv4Y8ofQHDf3go5FtxNWA.jpeg" style="max-width:400" /> -->
                        <v-card 
                          v-if="imageUrl"
                           class="pa-3"
                           
                           >
                            <img :src="imageUrl"  height="auto" style="max-width:100%"/>
                            <v-text-field
                                name="image_title"
                                label="Image Title"
                                id="title"
                                :error-messages="errors.collect('image_title')"
                                v-validate="'required'"
                                data-vv-name="image_title"
                                v-model="imageTitle"
                            ></v-text-field>
                            <v-text-field
                                name="image_description"
                                label="Image Description"
                                id="image-description"
                                :error-messages="errors.collect('image_description')"
                                v-validate="'required'"
                                data-vv-name="image_description"
                                v-model="imageDescription"
                            ></v-text-field>
                             <v-card-actions>
                                 <v-btn color="success">CANCEL</v-btn>
                                 <v-btn  color="success" @click="uploadImage"><v-icon> cloud_upload</v-icon></v-btn>
                             </v-card-actions>
                        </v-card>
                        
                        <v-btn fab dark @click='pickFile' left center v-bind="upload_button" bottom color="primary">
                            <v-icon dark>camera</v-icon>
                        </v-btn>
                        <!-- <v-text-field label="Select Image"  v-model='imageName' prepend-icon='attach_file'></v-text-field> -->
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >
                     </v-card-text>
                        <v-card-actions class="justify-space-between">
                               

                               <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn>

                               <v-btn align-end v-if="images.length > 0" color="success" @click="publish">PUBLISH</v-btn>


                           </v-card-actions>
                     </v-card>
                  </v-flex>
                  
              </v-layout>
          </v-container>
          
           
              
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>
</template>

<script>
import accounting from 'accounting'
import insertBreaksFilter from  '@/utils/InsertBreaksFilter'
import UploadsImage from '@/utils/UploadsImage'
import HandlesRequest from '@/utils/RequestHandler'
import NaijaStates from 'naija-state-local-government'

export default {
    middleware:[ 'authenticated','has-profile'],
    layout: 'dashboard',
    data(){
        return {
            pageNum:1,
            geoLocation: false,
            // imageName: '',
		    // imageUrl: '',
		    // imageFile: '',
            imageDescription:'',
            imageTitle:'',
            // imageBlob:"",
            newFeature:{ feature: '',value:''},
            newPlace:{
                place_category_id:'',
                description:'',
                latitude:'',
                longitude:'',
                address:'',
                state:'',
                country: 'Nigeria',
                agent_id: this.$route.params.agentSlug,
                price:'',
                price_description: '',
                location: '',
                timezone: 'Africa/Lagos',
                
           },
           placeSlug:'',//after creating the place
           features:[],
           images:[],
           category:[],
           featuresEdited: false,
          showAddress:false
        }
    },
    mixins: [UploadsImage, HandlesRequest,insertBreaksFilter],
    watch:{
        geoLocation(val){
            if(val){
                this.markLocation()
            }
        }
    },

    async asyncData({store, params}){
        
         var catResponse =  await store.dispatch('dashboard_store/getCategoryList')
         var category = catResponse.data
         let images = []   
         let features = []
         let place = null

         if(params.placeSlug != 'new'){
            
            var  { data } = await store.dispatch('dashboard_store/retrievePlace',params.placeSlug)
             // console.log(data.images)
           
                if(data.features !== null)
                {
                   features = data.features.features
                }
 
                if(data.images !== null)
                {
                  images = data.images.images
                }
                
                delete data['images']
                delete data['features']
                place  = data
                

          } 
          
          return  { 
                    images : images,
                    features : features,
                    newPlace : place,
                    category: category
                    }
            
    },
    computed:{
         upload_button(){
               
               if (this.$vuetify.breakpoint.mdAndUp) {

                   return {
                            "style":" position: absolute; bottom: 30%" 
                           } 
               }else{
                    return{
                          "style":" position: fixed;"
                       }
               }
         },
         states(){
             return NaijaStates.states()
         },
         creating(){
            return  this.newPlace.slug === undefined ?   true : false 
         }
    },
    methods:{
      showPriceDescripition(){
         if(this.newPlace.price_description.length > 0)return
            
          this.newPlace.price_description = accounting.formatMoney(this.newPlace.price,this.$CurrencyFilter.getConfig()).concat('  Per Year')
      },
       prevPage(){
           if(this.pageNum == 1 && (!this.creating)){
               //go back to the list
                this.submitPlace()
                this.$router.go(-1)
             }else if(this.pageNum == 2 && (!this.creating)){
               //go to page one
                this.submitPlace()
                this.pageNum--
            }else if(this.pageNum == 3){

                   //features
                   if(this.featuresEdited)
                   {
                           if(this.submitFeatures()){
                             this.pageNum--
                           }
                          
                      
                   }else{
                        this.pageNum--
                   }
           }else{

              this.pageNum--
           }

           

        
       },

       nextPage(){

           this.$validator.validate().then(result => {
        			if (result) {
							//only go to the next field if all is well
                if(this.pageNum == 3){

							     if(this.submitFeatures()){
                       this.pageNum++
                   }

                }else if(this.pageNum == 2){
                    this.submitPlace()
                    this.pageNum++
                }else{
                  this.pageNum++
                }
                
       				 }
      			})
   			
           
       },

       markLocation(){
            let myLocation 
        
            this.$getLocation({
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0
            })
            .then((coordinates) => {
        
                this.newPlace.latitude = coordinates.lat
                this.newPlace.longitude =  coordinates.lng
            
            })  
            .catch( error => {
                this.geoLocation = false
                this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: error,
                    color: ''
            })

            })
               
       },

       addFeature(){
            
            this.featuresEdited = true
            if(this.newFeature.feature != '' && this.newFeature.value != ''){
                    //copy the new feature
                let newFeatureCopy = Object.assign({},this.newFeature)
                //add to feature list
                this.features.push(newFeatureCopy)
                //clear new feature
                this.newFeature.feature = ''
                this.newFeature.value = ''
            }
            // console.log('unable to add feature');
            
       },
       removeFeature(index){
            this.featuresEdited = true
            this.features.splice(index,1)
        },

        uploadImage(){

           this.$validator.validate()
                .then(result => {
        	 		if (result) {
                    let formData = new FormData()
                    formData.append('image',this.imageBlob)
                    formData.append('title', this.imageTitle)
                    formData.append('description',this.imageDescription)
                    formData.append('place_id',this.newPlace.id)
                    formData.append('place_slug',this.newPlace.slug)
                

                 this.$store.dispatch('dashboard_store/saveImage',formData)
                            .then(response => {
                                //set the new data
                                this.images = response.data
                                //console.log(response.data);
                                
                                //this.nextPage()
                                //clear vars
                                this.imageTitle = ''
                                this.imageDescription = ''
                                this.imageBlob = ''
                                this.imageUrl = ''
                                this.imageName = ''
                                this.$store.dispatch('common/updateSnackBar',{
                                    show: true,
                                    msg: "Upload Successful !",
                                    color: ''
                                })
                            })
                            .catch(error => {
                                this.$store.dispatch('common/updateSnackBar',{
                                    show: true,
                                    msg: error.response.data,
                                    color: ''
                                })
                                
                            })
                     }
                })

        },

        removeImage(imageID,index){
            let formData = new FormData()
            formData.append('place_id',this.newPlace.id)
            formData.append('image_id',imageID)
            formData.append('place_slug',this.newPlace.slug)
            // console.log(index,this.images[index].src)
            const sm = this
            this.mixin_handleRequest(this.$store.dispatch('dashboard_store/removeImage',formData)
                    .then((response) => {

                        sm.images.splice(index,1)
                        
                        sm.$store.dispatch('common/updateSnackBar',{
                        show: true,
                        msg: 'Image Removed Successfully',
                        color: ''
                        })
                 
             }))

            //if all the images are removed, unpublish the place
            if(this.images.length < 1){

                this.unpublish()
            }
            

        },
       submitFeatures(){
              if(this.featuresEdited){

                  if(this.features.length < 1)
                  {
                     //features cannot be empty
                     this.$store.dispatch('common/updateSnackBar',{
                          show: true,
                          msg: 'features cannot be empty',
                          color: ''
                          })

                     return false
                  }

                this.mixin_handleRequest(this.$store.dispatch('dashboard_store/saveFeatures',{
                                    features:this.features,
                                    place_id:this.newPlace.id,
                                    place_slug:this.newPlace.slug
                                    })
                            .then(response => {
                                //set the new data
                                this.features = response.data.features
                                this.featuresEdited = false
                                // this.nextPage()
                                // console.log(response.data.id)
                            }))//end handlereq

              }
              return true
            
              
       },
       submitPlace(){
        const editingMode = this.newPlace.slug !== undefined ? true : false
      
        //check foro geoloaction data
        const locationPresent = (this.newPlace.latitude !== null) &&( this.newPlace.longitude !== null)

        if(!locationPresent){

           this.$store.dispatch('common/updateSnackBar',{
                        show: true,
                        msg: 'Please click "Makr this point" button',
                        color: 'red'
                        })

           return false
        }
        const sm = this
        this.$validator.validate().then(result => {
        	if (result) {
                  //only go to the next field if all is well
                  
                  sm.newPlace.editing_mode =  editingMode        
                sm.mixin_handleRequest(sm.$store.dispatch('dashboard_store/savePlace',sm.newPlace)
                            .then(response => {
                                //set the new data
                                sm.newPlace = Object.assign(sm.newPlace,response.data)
                                // this.nextPage()
                                //console.log(response.data.id)
                            }))
       				 }
                  })
    
       },

       // savePlace(){
       //      //saves place during editing
       // },

       publish(){
              //expilicity publish a place
              this.$store.dispatch("dashboard_store/publishPlace",{place_slug:this.newPlace.slug})
              this.$store.dispatch('common/updateSnackBar',{
                        show: true,
                        msg: 'Your Acomodation has been published',
                        color: ''
                        })
              //go back to list


       },

       unpublish(){
          //expilicity unpublish a place
          this.$store.dispatch("dashboard_store/unpublishPlace",{ place_slug:this.newPlace.slug})
       }
  

    }//end method

    
}
</script>

