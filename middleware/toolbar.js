 export default function ({ store, redirect }) {
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
             store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
             next()
         }