import * as API from '@/api'
import Vue from 'vue'

export const state = () => {

  return {

     planList: [],
     places: [],
     subscriptions:[],
     hasLoadedSubscriptions: false,
     hasLoadedPlans: false,
     hasLoadedPlaces: false,

  }
  

}


export const getters = {

   planList(state){
       return state.planList
   },

   places(state){
     return state.places
   },

   subscriptions(state){
     return state.subscriptions
   },

   summary(state,getters,rootState,rootGetters){
      const user = rootGetters['auth/getUser']
     
    
      return {
         'places_no': state.places.length,
         'subscriptions_no': state.subscriptions.length,
         'created_by': user.name,
         'agent_statistics': user.agent_statistics
      }
   }

  }

  export const mutations = {
    
      deletePlace(state,slug){
            let index = state.places.findIndex((place) =>{
                  return place.slug == slug
             })
              let place = state.places[index]

            state.places.splice(index,1)

        },
      publishPlace(state,slug){

             let index = state.places.findIndex((place) =>{
                  return place.slug == slug
             })
              let place = state.places[index]
            
             place.agent_published = true
             state.places.splice(index,1,place)
          
        },
        unpublishPlace(state,slug){
            let index = state.places.findIndex((place) =>{
                  return place.slug == slug
             })
             
             let place = state.places[index]
             place.agent_published = false
             state.places.splice(index,1,place)
         
            
        },
        unexpirePlace(state,slug){
             let index = state.places.findIndex((place) =>{
                  return place.slug == slug
             })
             let place = state.places[index]
             place.expired = 0
             state.places.splice(index,1,place)
        },
        addPlan(state,plan){
            // state.planList.push.call(plans)
           state.planList.push(plan)

        },
        addSubscription(state,subscription){
            // state.subscriptions.push.call(subscriptions)
            state.subscriptions.push(subscription)
        },
        addPlace(state,place){
            // state.places.push.call(places)
             
           state.places.push(place)
        },

        reset(state,option){
             switch(option){

                 case "SUBSCRIPTION":
                    state.hasLoadedSubscriptions = false
                    break
                 case "PLACES":
                    state.hasLoadedPlaces = false
                    break
                case "PLANS":
                   state.hasLoadedPlans= false
                break
                
                default:
                   state.hasLoadedPlans= false
                   state.hasLoadedPlaces = false
                   state.hasLoadedSubscriptions = false
                   break
             }
        }
    
  }

export const actions = {
    
    retrievePlace({commit},placeSlug){

       axios.defaults.withCredentials = true
            return new Promise( (resolve,reject) =>{
          // console.log(API.PLACE_URL(placeSlug))
              Vue.http.get(API.DASHBORD_PLACE_RETRIEVE_URL(placeSlug))
              .then(function (response) {
                         
                      resolve(response)
                  })
              .catch(function (error) {
                  //  console.log(error)
                       reject(error)
              });


             })

    },
    retrieveMySubscriptions({commit,state}){
        if(!state.hasLoadedSubscriptions){
            return new Promise( (resolve,reject) =>{
     
                Vue.http.get(API.MY_SUBSCRIPTIONS_URL)
                 .then(function (response) {

                         response.data.forEach((subscription) =>{
                           commit("addSubscription",subscription)
                           
                       })
                         state.hasLoadedSubscriptions = true
                         resolve(response)
                     })
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 })
     
     
             })
        }

    },
    retrieveAgentPlacesList({commit,state},payload) {
         if(!state.hasLoadedPlaces){
            return new Promise((resolve,reject) =>{
                  Vue.http.get(API.AGENT_PLACES_URL,{params:payload})
                      .then(response => {

                        response.data.forEach((place) =>{
                           commit("addPlace",place)
                       })
                        state.hasLoadedPlaces = true
                        resolve(response)
                        
                      })
                    .catch((error) => {

                        reject(error)
                    })
            })
        }
   }, 
    //Payment
    confirmPayment({commit},transactionRef){

        return new Promise( (resolve,reject) =>{

            Vue.http.post(API.PAYSTACK_CONFIRM_URL,{transaction_ref: transactionRef})
             .then(function (response) {
                     resolve(response)
                 })
             .catch(function (error) {
                 //  console.log(error)
                      reject(error)
             });
 
 
         })

    },
    cancelOrder({commit}){

    },
    retrievePlans({commit,state}){
       
        if(!state.hasLoadedPlans){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(API.PACKAGES_URL)
                 .then(function (response) {
                       
                       response.data.forEach((plan) =>{
                           commit("addPlan",plan)

                       })
                       state.hasLoadedPlans = true
                        resolve(response)
                     })
                   
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        }
        
    },

    retrievePlan({commit},planID){
       
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(API.PACKAGE_URL(planID))
                 .then(function (response) {

                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        // }
        
    },
    //PLACE ACTIONS
     publishPlace({commit},payload){
       
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_PUBLISH_URL(payload.place_slug))
                 .then(function (response) {
                          commit("publishPlace",payload.place_slug)
                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        // }
        
    },

    unpublishPlace({commit},payload){
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_UNPUBLISH_URL(payload.place_slug))
                 .then(function (response) {
                         commit("unpublishPlace",payload.place_slug)
                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 })
     
     
             })
        // }
        
    },

    renewPlace({commit},payload){
          return new Promise((resolve,reject) =>{
               Vue.http.post(API.DASHBOARD_PLACE_RENEW_URL(payload.place_slug))
                  .then(response => {
                       // commit("reset","PLACES")
                       commit("unexpirePlace",payload.place_slug)
                      resolve(response)
                  })
                  .catch((error) => {

                     reject(error)
                  })
          })
    },

    removeImage({commit},payload){

        return new Promise((resolve, reject) => {
            Vue.http.post(API.DASHBORD_PLACE_IMAGE_REMOVE_URL(payload.get('place_slug')),payload)
              .then(response => {
                 
                resolve(response)
            })
            .catch((error) => {

               reject(error)
            })
     

        }) 
  },
  saveImage({commit},placeSlug,payload){

    return new Promise((resolve, reject) => {
       Vue.http.post(API.DASHBORD_PLACE_IMAGE_SAVE_URL(placeSlug),payload)
              .then(response => {

                resolve(response)
            })
            .catch((error) => {

                reject(error)
            })
        })
  },

   //api call to create a place
   saveFeatures({commit},payload){

    return new Promise((resolve, reject) => { 
               Vue.http.post(API.DASHBORD_PLACE_FEATURE_SAVE_URL(payload.place_slug),payload)
                      .then(response => {

                        resolve(response)
                    })
                    .catch((error) => {

                      reject(error)
                    })
                })
  },

  //api call to create a place
  savePlace({commit,state},payload,editingMode){
    let url = ''
    if(editingMode)
    {
       url = API.DASHBORD_PLACE_EDIT_URL(payload.slug)
    }else{
       url = API.DASHBORD_PLACE_CREATE_URL
    }

    return new Promise((resolve, reject) => {  
              Vue.http.post(url,payload)
                      .then(response => {

                         commit("reset","PLACES")

                        resolve(response)
                    })
                    .catch((error) => {

                      reject(error)
                    })
                })
  },
  
    getCategoryList({commit}) {

        return new Promise((resolve, reject) => {
                  Vue.http.get(API.PLACE_CATEGORY_LIST_URL)
                    .then(response => {

                        resolve(response)
                    })
                    .catch((error) => {

                        reject(error)
                    })
                })
     
  },

  deletePlace({commit},payload){

          return new Promise((resolve,reject)=>{
                Vue.http.post(API.AGENT_PLACE_DELETE_URL(payload.place_slug))
                  .then(response => {
                       commit("deletePlace",payload.place_slug)
                      resolve(response)
                  })
                  .catch((error) => {

                      reject(error)
                  })

          })
             
   },
  
    publishPlaceToggle({commit},payload){

       return new Promise((resolve,reject)=>{

              Vue.http.post(API.DASHBOARD_PLACE_PUBLISH_URL(payload.place_slug))
              .then(response => {

                  resolve(response)
              })
              .catch((error) => {

                  reject(error)
              })
          })
},

}

