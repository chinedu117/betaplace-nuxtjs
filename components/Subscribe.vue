<template>
    <v-card height="auto" class="pa-2 px-4" flat>
                              
        <v-card-title class="mx-0 px-0">
            <div class="headline mb-0"> Subscribe </div>
        </v-card-title>
        <v-text-field
            label="E-mail"
            v-model="feed.email"
            
        ></v-text-field>
        <v-text-field
            name="Location"
            label="Location"
            id="location"
            v-model="feed.location"
        ></v-text-field>
        <v-text-field
            name="budget"
            label="Your Budget"
            id="budget"
            v-model="feed.budget"
            suffix="naira"
        ></v-text-field>

            <v-btn flat outline block color="accent">
                <span class="mx-auto font-weight-medium">SUBSCRIBE</span>
            </v-btn>
        
    </v-card>
</template>
<script>
export default {
    name: 'subscribe',
    data(){
        return {
            feed:{
               email:'',
               location:'',
               budget:'',
           },
        }
    }
}
</script>

