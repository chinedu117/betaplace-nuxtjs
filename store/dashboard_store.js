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
              // let place = state.places[index]

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
                    state.subscriptions = []
                    break
                 case "PLACES":
                    state.hasLoadedPlaces = false
                    state.places = []
                    break
                case "PLANS":
                   state.hasLoadedPlans= false
                   state.planList = []
                break
                
                default:
                   state.hasLoadedPlans= false
                   state.hasLoadedPlaces = false
                   state.hasLoadedSubscriptions = false
                   state.subscriptions = []
                   state.places = []
                   state.planList = []
                   break
             }
        }
    
  }

export const actions = {
    
   async retrievePlace({commit},placeSlug){
   
        return Vue.http.get(API.DASHBORD_PLACE_RETRIEVE_URL(placeSlug))
     
    },
   async  retrieveMySubscriptions({commit,state}){
        if(!state.hasLoadedSubscriptions){
           
     
              const {data} = await Vue.http.get(API.MY_SUBSCRIPTIONS_URL)
                    
                     data.forEach((subscription) =>{
                           commit("addSubscription",subscription)
                           
                       })
                         state.hasLoadedSubscriptions = true
                       
        }

    },
    async retrieveAgentPlacesList({commit,state},payload) {
         if(!state.hasLoadedPlaces){
          
               const {data} =   await Vue.http.get(API.AGENT_PLACES_URL)
                     

                        data.forEach((place) =>{
                           commit("addPlace",place)
                       })
                        state.hasLoadedPlaces = true
                        
        }
   }, 
    //Payment
    async confirmPayment({commit},transactionRef){

          return await  Vue.http.post(API.PAYSTACK_CONFIRM_URL,{transaction_ref: transactionRef})
             

    },
    cancelOrder({commit}){

    },

    async retrievePlans({commit,state}){
       
        if(!state.hasLoadedPlans){
             
              const {data } = await Vue.http.get(API.PACKAGES_URL)
                data.forEach((plan) =>{
                           commit("addPlan",plan)

                       })
              state.hasLoadedPlans = true
           
              
            
            }
                    
        
    },

    async retrievePlan({commit},planID){
    
          return await  Vue.http.get(API.PACKAGE_URL(planID))
                
        
    },
    //PLACE ACTIONS
    async  publishPlace({commit},payload){
       
  
           let result = await Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_PUBLISH_URL(payload.place_slug))
                 
              await commit("publishPlace",payload.place_slug)
           return result             
        
    },




    async unpublishPlace({commit},payload){
        // if(state.planList.lenght < 1){
            
            let result =   await Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_UNPUBLISH_URL(payload.place_slug))
                 
                      await   commit("unpublishPlace",payload.place_slug)
             return result           
        
    },

   async renewPlace({commit},payload){
        
               let result =   await Vue.http.post(API.DASHBOARD_PLACE_RENEW_URL(payload.place_slug))
     
                     await commit("unexpirePlace",payload.place_slug)
                return result
    },

   async  removeImage({commit},payload){

            return await  Vue.http.post(API.DASHBORD_PLACE_IMAGE_REMOVE_URL(payload.get('place_slug')),payload)
             
  },
  async saveImage({commit},payload){

    
    return await Vue.http.post(API.DASHBORD_PLACE_IMAGE_SAVE_URL(payload.get('place_slug')),payload)
       
  },

   //api call to create a place
 async   saveFeatures({commit},payload){

    return await  Vue.http.post(API.DASHBORD_PLACE_FEATURE_SAVE_URL(payload.place_slug),payload)
                   
  },

  //api call to create a place
 async savePlace({commit,state},payload){
      let url = ''
      if(payload.editing_mode)
      {
         url = API.DASHBORD_PLACE_EDIT_URL(payload.slug)
      }else{
         url = API.DASHBORD_PLACE_CREATE_URL
      }
          commit("reset","PLACES")
          return await  Vue.http.post(url,payload)
                

  },
  
   async  getCategoryList({commit}) {
        
       
       return await  Vue.http.get(API.PLACE_CATEGORY_LIST_URL)
        
  },

 async deletePlace({commit},payload){

     await   Vue.http.post(API.AGENT_PLACE_DELETE_URL(payload.place_slug))
     await   commit("deletePlace",payload.place_slug)
                   
             
   },
  
    async publishPlaceToggle({commit},payload){

       return await  Vue.http.post(API.DASHBOARD_PLACE_PUBLISH_URL(payload.place_slug))
            
  },

}

