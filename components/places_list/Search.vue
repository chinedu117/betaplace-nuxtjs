<template>
<v-text-field 
        :focus="showSearch"
        v-model="searchText"
        autofocus
        placeholder='Search Place eg. Wuse, Abuja'
        @keyup.enter="search"    
        box
        id="search-box"
        class="pa-2 elevation-2"
        @blur="clearSearch"
        append-icon="close"
        
        @click:prepend="clearSearch"
        @click:append="clearSearch"
        >
</v-text-field> 

</template>
<script>
//import store from './../store.js'
export default {
    name:'search',
    data(){
        return {
            searchText: '',
            showSearch: true//this.$store.state.places_list_store.search.show,
    
        }
    },
    
    methods: {

        search(){
            // let search = val.trim().toLowerCase();
            this.$store.dispatch('places_list_store/search',this.searchText.trim().toLowerCase())
        },
        clearSearch()
        {   
            this.$store.dispatch('places_list_store/clearSearch')
            this.$store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
        }
    }
    
}
</script>
<style>
   
</style>
