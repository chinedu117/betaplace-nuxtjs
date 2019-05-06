<template>
<v-text-field 
        :focus="showSearch"
        v-model="searchText"
        autofocus
        placeholder='Search Place eg. Wuse, Abuja'
            
        box
        id="search-box"
        class="pa-2 elevation-2"
        @blur="clearSearch"
        append-icon="close"
        prepend-icon="fa-arrow-left"
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
    
    watch:{
        searchText(val)
        {
            this.search(val)
        }
    },
    methods: {

        search(val){
            let search = val.trim().toLowerCase();
            this.$store.dispatch('places_list_store/search',search)
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
