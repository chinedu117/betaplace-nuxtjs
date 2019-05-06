<template>
    <v-rating v-model="rating"></v-rating>
</template>

<script>
// import Service from './../Service.js'
export default {
    name: 'rate-agent',
    data(){
        return {
            rating: this.agent_rating,
            userHasRated:false
        }
    },

    props:{
        agent_rating:{
            required: true,
        },
        agent_id:{
            required:true,
        }
    },
    
    watch:{

        rating(){
            if(!this.userHasRated){
                 
                //send users rating
                // this.$options.service.rateAgent(this.agent_id,this.rating)
                //to api
            }
            //say thank you for your feed back
            this.userHasRated = true
            this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Thank you!',
                color: ''
            })
            
        }
    },
    methods:{

        rateAgent(){
            

            //here make the api call to rate agent
            // axios.post(API.AGENT_RATING_URL(this.agent_id),{rating:this.rating})
            //   .then(response => {

            //   })
            //   .catch(error => {

            //   })
        }
    }
}
</script>

<style>

</style>
