<template>
        <v-row>
            <v-col cols="4">
                <v-card height="450" flat>
                <v-img width="216" height="161" :src="`/img/${room.default_image}`">
                </v-img>
                </v-card>
              
            </v-col >
            <v-col cols="8">
                <v-card height="450" flat>
                    <v-card-title>{{room.name}}</v-card-title>
                    <v-card-text>
                        <p>Capacidad Máxima ({{ room.max_adults }} Adultos y {{ room.max_children}} Niños )</p>
                        <p> <b>Esta {{room.type }} cuenta con:</b> </p>
                        {{room.large_text}}
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
            room: (state) => state.RoomModule.roomDetails,
        }),
    },
}
</script>