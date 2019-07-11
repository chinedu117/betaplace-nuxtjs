// Common State.
const defaults = {
    sidebar: {  
      visible: true
    },
    loading: false,
    title: '',
    layout: 'DefaultLayout',
    dialog: {
      visible: false,
      text: ''
    },
    snackBar: {
      show: false,
      msg: '',
      timeout: 6000,
      color: ''
    },
    error: {
      code: null,
      level: null,
      message: ''
    },

    toolBar:{
      show: true,
      component:''
    },
    validation_errors: [],
    socialShare:{
      show: false,
      shareable_title: null,
      description: null,
      url: null,
      quote: " House for rent",
      hashtags: "Accomodation made Easy @ betaplace.com.ng",
      twitter_user: null,
      position_x:null,
      position_y: null,
    },
    pagination: {
       total_page: null,
       url: null,
    }
  }

export const state = () => {

  return Object.assign({}, defaults)
}

export const mutations = {
   updatePagination(state, options) {
        state.pagination = Object.assign({}, defaults.pagination, options)
      },
   updateServerValidationErrors(state, errors){
          state.validation_errors = errors
      },
    updateSidebar (state, options) {
        state.sidebar = Object.assign({}, defaults.sidebar, options)
      },

      updateToolBar (state, options) {
        state.toolBar = Object.assign({}, defaults.toolBar, options)
      },
  
      updateTitle (state, title) {
        state.title = title
      },
  
      updateLayout (state, layout) {
        state.layout = layout
      },

      updateLoader(state,value){

        state.loading = value
      },
  
      updateDialog (state, options) {
        state.dialog = Object.assign({}, defaults.dialog, options)
      },
  
      updateSnackBar (state, options) {
        state.snackBar = Object.assign({}, defaults.snackBar, options)
      },

      updateSocialShare (state, options) {
        state.socialShare = Object.assign({}, defaults.socialShare, options)
      },
}

export const actions = {

      updateLoader({commit},value)
      {
        commit('updateLoader',value)
      },
    //   clear ({ state, commit, rootState, dispatch }) {
    //     commit('clear')
    //     dispatch('auth/clear', {}, { root: true })
    //   },
      updateSocialShare ({ commit }, options) {
        // alert("social share called")
      if(options.show){
           var bodyRect = document.body.getBoundingClientRect()
         

          let pos_x = Math.floor(options.source_element.left - bodyRect.left)

          let pos_y = Math.floor(options.source_element.top - bodyRect.top)
                    // console.log(sourceEl,pos_x,pos_y)

          options.position_y = pos_y
          options.position_x = pos_x
         }
              
        commit('updateSocialShare', options)
      },
  
      updateSidebar ({ commit }, options) {
        commit('updateSidebar', options)
      },
      updateToolBar ({ commit }, options) {
        commit('updateToolBar', options)
      },
  
      updateTitle ({ commit }, title) {
        commit('updateTitle', title)
      },
  
      updateLayout ({ commit }, layout) {
        commit('updateLayout', layout)
      },
  
      updateDialog ({ commit }, options) {
        commit('updateDialog', options)
      },
  
      updateSnackBar ({ commit }, options) {
        commit('updateSnackBar', options)
      },
       updateServerValidationErrors({commit},error){
          
          commit('updateServerValidationErrors',error)
     },

}

