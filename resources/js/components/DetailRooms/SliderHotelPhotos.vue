<template>
    <v-carousel hide-delimiters height="450">
        <v-carousel-item
        :src="`/img/${hotel.image}`" 
        reverse-transition="fade-transition" 
        transition="fade-transition"
        
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
import {mapState } from "vuex";
export default {
    data(){
        return{
        }
    },

     computed:{
        ...mapState({
            hotel: state => state.HotelModule.hotel,
        }),
    },
}
</script>