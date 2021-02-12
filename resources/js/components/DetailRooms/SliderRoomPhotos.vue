<template>
    <v-carousel hide-delimiters height="450">
        <v-carousel-item
        v-for="(item, i) in additionalImages" 
        :key="i" :src="`/img/${item.name}`" 
        reverse-transition="fade-transition" 
        transition="fade-transition"
        
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data(){
        return{
        }
    },

     computed:{
        ...mapState({
            additionalImages: (state) => state.RoomModule.additionalImages,
        }),
    },

    props: {
        id:{
            type: Number,
            required: true,
        },
    },

     mounted(){
        this.$store.dispatch('getAdditionalImages', this.id)
    }
}
</script>