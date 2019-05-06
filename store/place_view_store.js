
import axios from 'axios'
import * as API from '@/api'
import store from 'vuex'

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
        state.place = place
         
        state.place_cache.push(place)
    }, 
    addAgentInfo(state,agent){

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

    retrievePlace({commit,dispatch,state},placeSlug){
       
     //allow it to also send and r eceive cookies
        
        var fromCache = placeFromCache(state,placeSlug)
      

        if(fromCache !== false){
         
               return fromCache

        } else{

            
            axios.defaults.withCredentials = true
            return new Promise( (resolve,reject) =>{
          
               console.log(API.PLACE_URL(placeSlug))
              axios.get(API.PLACE_URL(placeSlug))
              .then(function (response) {
           

                         commit('places_list_store/updateUserPreferences',response.data,{root: true})//{root: true})
                         commit('addPlace',response.data)
                         
                         dispatch("retrieveAgentInfo",response.data.agent.slug)
                            .then(response => {
                              dispatch('places_list_store/retrieveByPreferences',null,{root: true})
                                 resolve(response)
                            })

                         
                        
                         
                     
                  })
              .catch(function (error) {
                  //  console.log(error)
                       reject(error)
              });


             })


        }//elseif
       
      

    },

        //api called on like share or goto map
      statRequest({commit}, payload){
        

        return new Promise( (resolve,reject) =>{

                axios.post(API.PLACE_STAT_URL(payload.stat_id),{'action': payload.stat_name})
                          .then(response => {

                            resolve(response)
                        })
                        .catch((error) => {

                           reject(error)
                        })
                    })
      },
  

    retrieveAgentInfo({commit,state},agentSlug){
         //allow it to also send and r eceive cookies
        
        // var fromCache = agentFromCache(state,agentSlug)



        // if(fromCache !== false){
               

        //        return fromCache

        // } else{

        

              return new Promise( (resolve,reject) =>{


                    
                axios.get(API.AGENT_PUBLIC_INFO_URL(agentSlug))
                .then(function (response) {
                            
                            response.data.slug = agentSlug
                          commit("addAgentInfo",response.data)
      
                        resolve(response)
                    })
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });


            })
        // }//else end
    },

    clearCache({state,commit}){
          commit('clearCache')
          
    }

  }