<template>
    <v-flex xs12>
        <v-layout row wrap justify-center class="mt-2">
             <v-btn v-if="thereIsNextPage" @click="loadNextPage" :loading="loading" :disabled="loading" color="error" outline>See More</v-btn>
             <v-btn v-else justify-center disabled outline>Nothing More</v-btn>   
        </v-layout>
    </v-flex>
</template>

<script>
import RequestHandler from "@/utils/RequestHandler";
export default {
 name: 'load-more',
 data(){
     return {
     }
 },
 mixins: [ RequestHandler ],
 computed:{
     thereIsNextPage(){
        return this.$store.getters["places_list_store/nextPageUrl"] === null ? false : true

     }
 },
 methods: {
     loadNextPage(){
            this.mixin_handleRequest(this.$store.dispatch('places_list_store/retrieveNextPage'))
     }
 },
}
</script>

<style>

</style>
