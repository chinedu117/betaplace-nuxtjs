  
import { PLACE_URL,PLACE_STAT_URL,AGENT_PUBLIC_INFO_URL,PLACE_DEFAULT_IMAGE_URL, AGENT_PROFILE_DEFAULT_IMAGE_URL } from '@/api'
// import store from 'vuex'

function placeFromCache(state,slug){
       let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }
  
}
function agentFromCache(state,slug){
       let index = state.agents_cache.findIndex((agent) =>{
             return agent.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.agents_cache[index]

          }
  
}

  export const state = () => {

    return {
      place:{},
      agent_info:null,
      agents_cache:[],
      place_cache:[],
    }
    
  }

   export const getters =  {

    place(state) {

        return state.place
    },
    agentInfo(state){
      return state.agent_info
    },

    placeFromCache(state,slug){
             let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }
    }

  
  }

   export const mutations = {
    addPlace(state,place){

        if(place.images == null || (place.images.images.length < 1) ){
            
            place.images = { "images": [   
                                    { "id": 1,
                                       "title": "Image not provided",
                                        "Description": "Betaplace: Accomodation made easy",
                                        "src": PLACE_DEFAULT_IMAGE_URL
                                          }]  
                                        } 
        }
        state.place = place
         
        state.place_cache.push(place)
    }, 
    addAgentInfo(state,agent){
        
        if(agent.profile_img.length == 0){

           agent.profile_img = AGENT_PROFILE_DEFAULT_IMAGE_URL
           
        }
        state.agent_info = agent
        state.agents_cache.push(agent)
    },

    clearCache(state){
          state.place_cache = []
          state.agents_cache = []
    }
  }

  export const  actions = {

    retrievePlaceFromCache({state},slug){

           let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }

    },

    async retrievePlace({commit,dispatch,state},placeSlug){
       
     //allow it to also send and r eceive cookies
        
        var fromCache = placeFromCache(state,placeSlug)
      

        if(fromCache !== false){
         
               return fromCache

        } else{

            
              this.$axios.defaults.withCredentials = true
            
             
              let response = await this.$axios.get(PLACE_URL(placeSlug))
              
                         commit('places_list_store/updateUserPreferences',response.data,{root: true})//{root: true})
                         commit('addPlace',response.data)
                         
                         dispatch("retrieveAgentInfo",response.data.agent.slug)
                            
                        // dispatch('places_list_store/retrieveByPreferences',null,{root: true})
                            

                       return response  

        }//elseif
       
      

    },

        //api called on like share or goto map
    async  statRequest({commit}, payload){
        

        return this.$axios.post(PLACE_STAT_URL(payload.stat_id),{'action': payload.stat_name})
                          
      },
  

    async retrieveAgentInfo({commit,state},agentSlug){
         //allow it to also send and r eceive cookies
        
        var fromCache = agentFromCache(state,agentSlug)



        if(fromCache !== false){
               

               return fromCache

        } else{

        

              let response = await this.$axios.get(AGENT_PUBLIC_INFO_URL(agentSlug))
                 
                            response.data.slug = agentSlug
                            await commit("addAgentInfo",response.data)
      
                  return response     
        }//else end
    },

    clearCache({state,commit}){
          commit('clearCache')
          
    }

  }

