<template>
  <div v-bind="style_bind" v-if="show">
    
    <slot></slot>
    <v-icon color="red darken-4" size="18px" @click.prevent="close">close</v-icon>
 </div>
</template>
<script>
export default {
  name: 'CloseablePrompt',
  data() {
    return {
      visible: this.show
    }
  },
  // mounted(){
  //    window.eventBus.$on("SHOW_PROMPT",(payload) => {
  //          this.visible = payload   
  //    })
  // },
  // beforeDestroy(){
  //     window.eventBus.$off("SHOW_PROMPT")
  // },
  props:{
     show:{
        required: true,
        default: false,
        type: Boolean
     }
  },
  computed:{
       showPrompt(){
           return this.visible
       },
       style_bind(){
            if(this.$vuetify.breakpoint.mdAndUp){
                //large screen 
               return {
                   "class":"d-flex justify-space-between elevation-4 prompt prompt--big-screen grey--text font-weight-bold"
               }
            }else{
              //small screen
                return {
                  "class":"d-flex justify-space-between elevation-4 prompt prompt--mobile grey--text font-weight-bold",
               }
            }
           
       }
  },
  created() {
   
  },
  methods: {
    close(){
    	this.$emit('close-prompt')
    }
  }
};
</script>
<style lang="stylus">
  .prompt
    background-color: #ffff
    border-radius: 2px
    color: #0000
    padding: 10px 10px
    height: auto
    text-align: center
    font-size: 18px
    text-decoration: none
    z-index: 900000

    &--big-screen
      position: fixed
      left: 20%
      bottom: 20%
      width: auto
      
    &--mobile
      position: fixed
      left: 0px
      bottom: 0px
      width: 100%
</style>
