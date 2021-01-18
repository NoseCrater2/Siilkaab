<template>
    <v-row>
        <v-col cols="12" md="12" sm="12">
            <v-select 
            prepend-icon="mdi-domain"
            label="HOTEL" 
            outlined 
            :loading="loadingHotels" 
            v-model="selectedHotel" 
            @change="getRooms" 
            :items="hotels" 
            item-text="title" 
            item-value="id">
            </v-select>
        </v-col>
        <v-col cols="12" md="3" sm="12" v-for="room in currentHotelRooms" :key="room.id">
            <v-card width="300"  >
                
                <v-img width="300" :src="room.default_image" height="290" lazy-src="https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg">
                    <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <v-card-title>{{room.name}}</v-card-title>
                <v-card-actions>
                    <v-btn>SUBIR FOTOS</v-btn>
                </v-card-actions>
            </v-card>
             <!-- <v-select 
             prepend-icon="mdi-bed"
             label="HABITACION" 
             :items="currentHotelRooms" 
             outlined item-text="name" 
             item-value="id">
             </v-select> -->
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data(){
        return{
            selectedHotel: null,
            selectedRoom: null,
            loadingHotels: false,
            loadingRooms: false,
        }
    },

    computed:{
         ...mapState({
            hotels: (state) => state.HotelModule.allhotels,
            currentHotelRooms: (state) => state.RoomModule.currentHotelRooms,
        }),
        // ...mapActions(["getCurrentHotelRooms"]),
    },

    mounted(){
        this.loadingHotels = true
         this.$store.dispatch("getHotels").then(()=>{
             this.loadingHotels = false
         });
    },

    methods: {
        getRooms(){
            this.loadingRooms = true
            this.$store.dispatch('getCurrentHotelRooms', this.selectedHotel).then(() => {
                this.loadingRooms = false
            });
        }
       
    }

}
</script>