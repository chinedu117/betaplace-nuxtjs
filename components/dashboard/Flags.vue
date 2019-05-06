<template>
    <div class="d-inline">
        <v-chip small left v-if="published" color="green lighten-2" class="caption font-weight-medium">Published</v-chip>
         <v-chip small left v-else color="grey lighten-2" class="caption font-weight-medium">Not Published</v-chip>
        
        <v-chip small left v-if="expired" color="red" class="caption font-weight-medium">Expired</v-chip>
   </div>
</template>

<script>
export default {
   name: 'flags',
   data(){
       return {
           place_published:this.published,
           place_expired: this.expired,
       }
   },
   props: {
       "published":{
           required: true,
        
       },
       "expired": {
           required: true,
           
       }
   }
}
</script>

<style>

</style>
