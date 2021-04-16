<template>
        <v-row>
            <v-col cols="4">
                <v-card height="450" flat>
                <v-img width="216" height="161" :src="`/img/${hotel.image}`">
                </v-img>
                </v-card>
              
            </v-col >
            <v-col cols="8">
                <v-card height="450" flat>
                    <v-card-text>
                        {{hotel.large_text}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
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