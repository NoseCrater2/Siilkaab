<template>
    <v-card flat height="452">
            <v-row>
                <v-col cols="4" xl="4" lg="4" md="4" sm="4" xs="4">
                    <v-img width="216" height="161" :src="`/img/${hotel.image}`">
                    </v-img>
                </v-col >
                <v-col cols="8" xl="8" lg="8" md="8" sm="8" xs="8">
                    <span v-html="hotel.large_text"></span>
                </v-col>
            </v-row>
    </v-card>
</template>

<script>
import {mapState } from 'vuex';
export default {
    computed:{
        ...mapState({
            hotel : state => state.HotelModule.hotel,
        }),
    },
}
</script>
