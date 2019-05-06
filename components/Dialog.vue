<template >

   <v-dialog v-model="dialogActive" max-width="600px">
        <slot></slot>
   
 
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="primary" flat="" @click.stop="dialogActive = false">Close</v-btn>
       </v-card-actions> 
    </v-dialog>
</template>

<script>

export default {
  name: 'custom-dialog',

  data () {
    return {
      // Dialog settings
      dialog: false
    }
  },

  computed: {
    dialogActive: {
      get () {
        return this.$store.state.common.dialog.show
      },
      set (val) {
        this.$store.dispatch('common/updateDialog', { show: val })
      }
    }
  }
}
</script>
