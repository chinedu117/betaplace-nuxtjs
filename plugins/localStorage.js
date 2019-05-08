import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  // window.onNuxtReady(() => {
    createPersistedState({
        key: 'betaplace',
        paths: [
                'auth.user',
                'auth.token',
        		'places_list_store.userPreferences', 
        		'places_list_store.userCoordinates'
        		]
      
    })(store)
  // })
}