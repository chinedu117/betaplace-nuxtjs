<template>
  <v-layout column>
      <v-flex xs12 justify-end>
        <h1 class="error-title"> Oops </h1>
        <p> The page cannot be found or no longer exxisting</p>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    layout: 'default',
    name: 'page-not-found',
}
</script>
<style scoped>
  
  .error-title {
      font-weight: 600;
      font-size: 3rem;
      color: rgb(92, 38, 16);
  }
</style>
