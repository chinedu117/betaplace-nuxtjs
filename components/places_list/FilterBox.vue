<template>
    <div v-if="showFilters" id="filter-box" class="d-block pa-2 mx-auto">
            
            <ul 
              v-if="activeFilters"
              >

                <span color="accent">Actvie Filters</span><br>

                <li 
                  v-for="filter in activeFilters"
                 >{{ filter[0] }}</li>
                
            </ul>

            <v-select
                 v-for="(filter,filIndex) in filters"
                :key="filIndex"
                :label="filter.label"
                :items="filter.values"
                item-value="value"
                item-text="label"
                :ref = "filter.name"
                @change="addFilter"
                return-object
                v-model="selected"
                
            >
               
            </v-select>

            
                     
            <v-btn flat  color="accent" @click="closeFilterBox">CLOSE</v-btn>
            
            <v-btn flat  color="accent" @click="resetFilter">RESET</v-btn>

            <v-btn flat  color="accent" @click="filterItems">OK</v-btn>
             
            
        </div>
</template>
<script>
import NaijaStates from 'naija-state-local-government'
export default {
    name:'filter-box',

    data(){
        return{
           showFilters: this.$store.state.places_list_store.filter_box.show,
           selected:[],
            filters:[
                    {
                    name: 'budget',
                    label: 'Filter by Your Budget',
                    values: [  
                                {
                                 'label': 'Less than 100,000',
                                 'name': 'budget',
                                 'value':'100000'
                                 },
                                 {
                                 'label': 'Less than 200,000',
                                 'name': 'budget',
                                 'value':'200000'
                                 },
                                 
                                 {
                                 'label': 'Less than 300,000',
                                 'name': 'budget',
                                 'value':'300000'
                                 },
                                 
                                 {
                                 'label': 'Less than 450,000',
                                 'name': 'budget',
                                 'value':'450000'
                                 },
                                 {
                                 'label': 'Less than 600,000',
                                 'name': 'budget',
                                 'value':'600000'
                                 },
                                 {
                                 'label': 'Less than 1m',
                                 'name': 'budget',
                                 'value':'1000000'
                                 },
                                 {
                                 'label': 'Less than 1m',
                                 'name': 'budget',
                                 'value':'2000000'
                                 },


                            ]
                }
            ],
        }
    },
    created(){

        //add the states

        if(this.$store.getters['places_list_store/placeCategories'] == null){

           this.$store.dispatch('places_list_store/getCategoryList')
               .then((response) => {

                  let categoryFilter = { name: 'category',
                                         label: 'Filter by Apartment',
                                         values: []
                                       }

                  response.data.forEach((category) => {
                      categoryFilter.values.push({
                                            'label': category.name,
                                            'name': "category",
                                            'value': category.id
                                             })
                  })
                  
                  this.filters.push(categoryFilter)


               })


        }else{
             
            let categoryFilter = {      name: 'category',
                                         label: 'Filter by Apartment',
                                         values: []
                                       }

             this.$store.getters['places_list_store/placeCategories'].forEach((category) => {
                        categoryFilter.values.push({
                                            'label': category.name,
                                            'name': "category",
                                            'value': category.id
                                             })
                  })
            this.filters.push(categoryFilter)

        }

        this.addStatesToFilters()
    },

    computed:{
       activeFilters(){
             

             let activeObj = this.$store.state.places_list_store.preferredFilters
             var objKeys = Object.keys(activeObj)

             if(objKeys.length < 1) return false

                let activeArray = objKeys.map(function(key) {
                                             
                                      return [key.replace('filter_','')];
                                    });


                        

             return activeArray

       }
    },
    methods:{
        addStatesToFilters(){
              let stateFilter =         { name: 'state',
                                          label: 'Filter by State',
                                         values: []
                                        }
                    NaijaStates.states().forEach((state)=>{
                            stateFilter.values.push({
                                            'label': state,
                                            'name': "state",
                                            'value': state
                                             })
                    })
            this.filters.push(stateFilter)

        },
        _closeFilterBox()
        {
            this.$store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
            this.$store.commit('places_list_store/updateFilterBox',{show: false})
            this.$store.commit('places_list_store/changeMode',"all")

        },
        filterItems()
        {
            //this._closeFilterBox()
            this.$store.dispatch('places_list_store/filterList')
            
            
        },

        addFilter(payload){
           
           
            const filterName = payload.name
            const filterValue = payload.value
            
             
            if(filterName == "state"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_state: filterValue })
                
            }else if(filterName == "budget"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_budget: filterValue })
                 
            }else if(filterName == "category"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_category: filterValue })
                 
            }else{

            }
        },
        resetFilter()
        {

            this.$store.dispatch('places_list_store/clearFilters')
            this.selected = []
            //refresh the filters
           // this._closeFilterBox()
        },

        closeFilterBox(){
            this._closeFilterBox()
        }
    }
}
</script>

<style lang="stylus" scoped>
ul,li
    list-style: none
li::before
    content: "#"
    margin-left: -10px

</style>