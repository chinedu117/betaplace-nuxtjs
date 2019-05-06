<template>
     <div v-if="loading" class="loader">
        <v-progress-circular :indeterminate="loading" :size="100" :width="4" color="white" class="mx-auto"></v-progress-circular>
      </div>
</template>
<script>
export default {
    name: 'loader',
    computed: {
        loading: {
            get(){
                return this.$store.state.common.loading
            }
        }
    }
}
</script>
<style>
 
 .loader {

   z-index: 20000000;
   position: fixed;
   top: 0px;
   left: 0px;
   width: 100%;
   display: flex;
   justify-content: center;
   flex-direction: column;
   height: 100%;
   background: rgba(87, 83, 83, 0.452)
  
 }
</style>
