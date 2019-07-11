import * as API from '@/api'
// import haversine from 'haversine'
  // State loaded when this component is first loaded.
  export const state = () => {

    return {
        userPreferences: {
        visited:  null,
        pref_state:  null,
        pref_cords:  null,
        pref_price:  null
        },

        list_mode: 'all', // can be filter mode, search mode
        filter_box:{
            show: false,
            filtered:[] //stores items filtered in the filter mode
        },
        search: {
            show: false,
            searchText: '',
            found:[] //stores items found in the search mode
        },
        place_categories:null,
        nextPageUrl: null,
        preferredFilters: {},
        filterValue:'',
        filterType:'none',
        places: [], //hold places in the all mode
        loaded:false,
        userCoordinates: null,
        agent_places:[],
        agent_places_loaded:false,
    }
    

  }



 export const getters = {
     
     placesFound(state) {
        const userCoords = state.userCoordinates !== null ? true : false

           // if(userCoords){
           //        //
           //        return state.filter_box.filtered.sort(function (first, second) {
           //           return first.distance - second.distance
           //        })
           //    }
        return state.search.found
     },

     placeCategories(state){
        return state.place_categories
     },
     nextPageUrl(state){
        const userCoords = state.userCoordinates !== null ? true : false
         let Query = ""

        if(userCoords){
          Query = "&pref_cords=" + state.userCoordinates
        }

        return state.nextPageUrl.concat(Query)
     },
     userPreferences(state)
     { 
        const userCoords = state.userCoordinates !== null ? true : false
       
        if(userCoords){

            state.userPreferences.pref_cords = state.userCoordinates
        }
                
        return state.userPreferences
     },
     hasUserCoords(state){
       return state.userCoordinates !== null ? true : false
     },
     hasLoadedPLaces(state)
     {
       return state.loaded
     },
     hasAgentPlacesLoaded(state){
         return state.agent_places_loaded
     },
     placesFiltered(state) {

        const mode = state.list_mode
        const userCoords = state.userCoordinates !== null ? true : false

        if( mode == 'all'){

          return state.places

        }
        // else if(mode == 'search'){
           
        //    if(userCoords){
        //           //
        //           return state.filter_box.filtered.sort(function (first, second) {
        //              return first.distance - second.distance
        //           })
        //       }

        //   return state.search.found
          
        // }
        else if(mode == 'filter'){
             //sort by distance
              if(userCoords){
                  //
                  return state.filter_box.filtered.sort(function (first, second) {
                     return first.distance - second.distance
                  })
              }
             return state.filter_box.filtered

        }else if(mode == 'agent_places'){

             return state.agent_places

        }else{

          return state.places
          // return .getters['places_list_store/placesFiltered']
        }
        
     },

  }


  export const  mutations = {
    updateCategories(state,payload){
         state.place_categoriess = payload
    },
    clearUserCoords(state){
         // localStorage.removeItem('user_coords')
         state.userCoordinates = null
    },
    updateNextPage(state,Url){
        state.nextPageUrl = Url
    },
    updateUserPreferences(state,place){

        state.userPreferences = Object.assign({},state.userPreferences,{ 
            visited: place.id,
            pref_state: place.state,
            pref_cords: JSON.stringify([place.latitude,place.longitude]),
            pref_price: place.price,
            pref_category: place.place_category_id,
            pref_location: place.location
        })
    },

    updateUserCoords(state,Coords){
        // localStorage.setItem('user_coords',JSON.stringify([Coords.latitude,Coords.longitude]))

         state.userCoordinates = JSON.stringify([Coords.latitude,Coords.longitude])

    },

    hasLoadedPlaces(state,val){
         state.loaded = val
    },
    hasAgentPlacesLoaded(state,val){
         state.agent_places_loaded = val
    },
    changeMode(state,newMode = 'all'){
        state.list_mode = newMode
    },
    // addSearchFound(state,foundItems)
    // {
    //     state.search.found.concat(foundItems)
    // },
    addPlacePrefered(state,place)
    {   
        //add to the top
       //loaded based on preference
       place.prefered = true
       state.places.unshift(place)
    },
     addPlace(state,place)
     {  
        
        state.places.push(place)
     },

     addAgentPlace(state,place)
     {  
        
        state.agent_places.push(place)
     },

      addPreferredFilters(state, filterObj) {
        //   state.preferredFilters.push(filterObj)
        state.preferredFilters = Object.assign({},state.preferredFilters,filterObj)
          // TODO : store in local storage so we can use in subsequent requests
      },

      updateSearchBox(state, payload) {
          console.log(payload)
          state.search = Object.assign({}, state.search, payload)
      },
      updateFilterBox(state, payload) {
        state.filter_box = Object.assign({}, state.filter_box, payload)
      },

      setPlaces(state, payload){
           state.places = payload
      }

  
  }

  export const  actions = {

    getCategoryList({commit,dispatch,state}) {
        if(state.place_categories == null)
        {
          return new Promise( (resolve,reject) =>{
 
             this.$axios.get(API.PLACE_CATEGORY_LIST_URL)
                .then(response => {
                    
                    commit("updateCategories",response.data)
                    resolve(response)
                })
                .catch((error) => {

                    reject(error)
                })
        })
      }
        
     
   },
    updateUserCoords({commit,dispatch},userCoords){
         
         if(userCoords.latitude && userCoords.latitude)
         {
             commit("updateUserCoords",userCoords)
             dispatch("refreshPage")
             return
         }
        
         return false
         
    },
    async refreshPage({commit,dispatch,state}){
           //reload the page
            commit("hasLoadedPlaces",false)
            dispatch("clearPlaces")
         
            dispatch('common/updateLoader',true,{root:true})
            await dispatch('retrievePlaces')
            dispatch('common/updateLoader',false,{root: true})
         
    },  
     clearUserCoords({commit,dispatch}){
         commit("clearUserCoords")
         dispatch("refreshPage")
    },
    clearFilters({state}){
         state.preferredFilters = {}
    },
    filterList({state,commit}){
        
        commit('changeMode','filter')
       if(!Object.keys(state.preferredFilters).length) return //empty

        //add check user cords add
      const userCoords = state.userCoordinates !== null ? true : false
      let FILTER_URL = API.PLACES_FILTER_URL
         if(userCoords){
             let Query = '?user_coords='+ state.userCoordinates
            FILTER_URL = FILTER_URL.concat(Query)
         }
        
        return new Promise( (resolve,reject) =>{
            this.$axios.get(FILTER_URL,{params:state.preferredFilters})
            .then(function (response) {
                    commit('updateNextPage',null)
                    commit("updateFilterBox",{show:true,filtered:response.data})
                    resolve(response)
                })
            .catch(function (error) {
                //  console.log(error)
                     reject(error)
            });


        })
    },
    
    retrievePlaces({state,commit,getters})
    {   
        
        commit('changeMode','all')
        const userCoords = state.userCoordinates !== null ? true : false
         let Query = ""
        if(userCoords){
          Query = "?pref_cords=" + getters.userPreferences.pref_cords
        }
      
        if(!getters.hasLoadedPLaces)
        {  
            return new Promise( (resolve,reject) =>{
              this.$axios.get(API.PLACES_URL.concat(Query))
                .then(function (response) {
                    
                 // commit('updateNextPage',response.data.next_page_url)

                  commit('common/updatePagination',
                                  { 'total_pages': response.data.last_page,
                                    'url':response.data.first_page_url},
                                    {root: true})

                   response.data.data.forEach((place) => {
                           commit('addPlace',place)
                        })
                        commit("hasLoadedPlaces",true)
                        resolve(response)
                    })
                  
                
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });
    
    
            })
        }
        
    },
    retrieveAgentPlaces({commit,getters,dispatch},agentSlug){
        commit('changeMode','agent_places')
        if(!getters.hasAgentPlacesLoaded)
        {  
          
           
            return new Promise( (resolve,reject) =>{
               this.$axios.get(API.AGENT_PUBLIC_PLACES_URL(agentSlug))
                .then(function (response) {
                  
                 // commit('updateNextPage',response.data.next_page_url)
                    commit('common/updatePagination',
                                  { 'total_pages': response.data.last_page,
                                    'url':response.data.first_page_url},
                                    {root: true})
                   response.data.data.forEach((place) => {
                          
                           commit('addAgentPlace',place)
                        })
                        commit("hasAgentPlacesLoaded",true)
                
                        dispatch('place_view_store/retrieveAgentInfo',agentSlug,{root: true})
                          .then(response => {
                               resolve(response)
                          })
                        
                    })
                  
                
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });
    
    
            })
        }
    },
    retrieveByPreferences({commit,getters}){
        //use preferences to fetch others
        let Query =  ''
        //if he has vivstied a place, use the preference
         if(getters.userPreferences.visited !== null){
            
            // commit('updateUserPreferences')
            const preferred = getters.userPreferences
             Query = "?pref_price=" + preferred.pref_price 
                    +"&pref_cords=" + preferred.pref_cords
                    + "&pref_state=" + preferred.pref_state
                    + "&pref_category=" + preferred.pref_category
                    + "&pref_location=" + preferred.pref_location
                    + "&exclude="+ preferred.visited 
                    
                    // console.log(API.PLACES_URL.concat(Query))
                    return new Promise( (resolve,reject) =>{
                        this.$axios.get(API.PLACES_URL.concat(Query))
                         .then(function (response) {
                            
                            response.data.forEach((place) => {
                                    commit('addPlacePrefered',place)
                                 })
                                 
                                 resolve(response)
                             })
                         .catch(function (error) {
                             //  console.log(error)
                                  reject(error)
                         });
             
             
                     })
            }
    },

    // retrieveNextPage({commit,getters}){
    //     //check if there is next page url in storage
    //     //load it
    //     //save next page url in the storage
    //     //use preferences to fetch others
        
    //      if(getters.nextPageUrl !== null){
    //         return new Promise( (resolve,reject) =>{
    //             this.$axios.get(getters.nextPageUrl)
    //              .then(function (response) {
                    
    //                 commit('updateNextPage',response.data.next_page_url)
    //                 response.data.data.forEach((place) => {
    //                         commit('addPlace',place)
    //                      })
                         
    //                      resolve(response)
    //                  })
    //              .catch(function (error) {
    //                  //  console.log(error)
    //                       reject(error)
    //              });
    //          })
    //      }
                   
            
    // },
    // updateUserPreferences({commit}){
    //     commit('updateUserPreferences')
    // },
   async search({commit},searchText)
    { 
       commit("addPreferredFilters",{filter_search: searchText})
    
        let SEARCH_URL = API.PLACES_SEARCH_URL
        
        let Query = 'search=' + searchText
      
        let response = await  this.$axios.get(SEARCH_URL+ '?' + Query)
                       
         await commit('updateSearchBox',{"found": response.data.data, "show":true})

         await  commit('common/updatePagination',{ 'total_pages': response.data.last_page,'url':response.data.first_page_url + '&' + Query},{root: true})
        
        return response
        // return new Promise( (resolve,reject) =>{
        //     this.$axios.get(SEARCH_URL+ '?' + Query)
        //     .then(function (response) {


        //             commit('updateSearchBox',{found: response.data.data, show:true})
        //             // commit('changeMode','search')
                    
        //             commit('common/updatePagination',{ 'total_pages': response.data.last_page,'url':response.data.first_page_url + '&' + Query},{root: true})
                    
        //             resolve(response)
        //         })
        //     .catch(function (error) {
        //         //  console.log(error)
        //              reject(error)
        //     });

  
        // })
        
        

    },

    async clearSearch({commit}){

         commit("updateSearchBox",{show:false,found:[],searchText:""})
         commit('changeMode','all')
        
    },
    
    async updateDistance({commit},myLocation)
    {
         commit('updateDistance',myLocation)
        commit('addPreferredFilters',{filter_distance: true})
        
    },

    async clearPlaces({commit}){

          commit('setPlaces',[])
    }
    
  }
