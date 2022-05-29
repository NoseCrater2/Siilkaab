<template>
    <v-item-group v-model="selectedCard">
        <div>
            <v-alert outlined type="info" color="blue darken-3" class="mt-1 mb-n1">
              Seleccione la habitación que desee con un toque
            </v-alert>
            <v-row>
                <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="(r, i) in room" :key="i">
                    <v-item v-slot="{ active, toggle }" @change="localSetRoom((index-1), r, i)" class="mx-auto">
                        <v-hover v-slot="{ hover }">
                            <v-card outlined flat height="590" width="300" :elevation="hover?'5':'0'" @click="toggle" :style="active?'border-bottom: 4mm solid #43A047;':''" >
                                <v-avatar size="298"  tile @click="openRoomDetail(r.id)">
                                    <v-hover v-slot="{ hover }">
                                        <v-img width="298" :src="`/img/${r.default_image}`">
                                            <template v-slot:placeholder>
                                                <v-img width="298" src="/img/unavailable.jpg">
                                                </v-img>
                                            </template>
                                           <v-row style="background-color: rgba(10, 10, 10, 0.5);" align="center" justify="center" v-if="hover">
                                                <v-icon size="50" dark>mdi-magnify</v-icon>
                                           </v-row>
                                        </v-img>
                                    </v-hover>
                                </v-avatar>
                                <div class="d-flex flex-column align-center justify-center mt-4">
                                    <v-card-title class="py-1" style="color: #1976D2" >{{r.name}}</v-card-title>
                                    <v-card-text class="d-flex flex-column align-center justify-center py-1">
                                        <b v-if="minDisponibility(r.rates[0]) == 1" style="color: red">¡Última unidad!</b>
                                        <b v-else-if="minDisponibility(r.rates[0]) <= 5" style="color: red">¡Solo quedan {{ minDisponibility(r.rates[0]) }} unidades!</b><br>

                                        Capacidad máxima: <br>
                                        Adultos: {{ r.max_adults}}. Niños: {{ r.max_children}} <br>
                                    </v-card-text>

                                    <v-card-title class="py-1" >
                                       {{configuration.currency_symbol}}{{roomPrice(r.rates[0])}} {{configuration.currency_code}}
                                    </v-card-title>
                                    <v-card-actions class="py-1">
                                        <v-btn tile depressed color="primary" small>RESERVAR</v-btn>
                                        <!-- <v-checkbox  v-model="active"></v-checkbox> -->
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-item>
                </v-col>
                <DialogDetailRooms @closeDialog="closeRoomDetail" :dialog="dialog" v-if="dialog"  :id="roomId"/>
            </v-row>
        </div>
    </v-item-group>
</template>

<script>
import {mapState, mapActions } from 'vuex';
import DialogDetailRooms from '../DetailRooms/DialogDetailRooms'
export default {
    data(){
        return{
            selectedCard: typeof(JSON.parse(localStorage.getItem('reservationStorage')).booking.rooms[this.index - 1]) != 'undefined' ? JSON.parse(localStorage.getItem('reservationStorage')).booking.rooms[this.index - 1].selectedCard : 0,
            dialog: false,
            icon: 'photos',
            roomId: 0,
        }
    },
    props: {
        room: Array,
        index: Number,

    },
    components:{
        DialogDetailRooms,
    },

    computed:{
        ...mapState({
            bookings: state => state.bookingsModule.bookings,
            configuration: state => state.HotelModule.configuration,
        }),
    },

     methods: {
         ...mapActions(["addRoom"]),
        //Mandamos llamar la acción que seteara las habitaciones en el state (NO MODIFICAR)
        localSetRoom(localIndex, localRoom, localSelectedCard){
                this.addRoom({index: localIndex, room: localRoom, selectedCard: localSelectedCard})
            console.log("SHI", localIndex, localRoom)
        },
        roomPrice(rates){
            let price =  0
            rates.forEach(r => {
                price +=r.price
            });
            return price
        },

        minDisponibility(rates){
            return Math.min.apply(null,rates.map(rate => rate.quantity));
        },
        openRoomDetail(id){
            this.roomId = id
            this.dialog = true
        },
        closeRoomDetail(){
            this.dialog = false
            this.icon = 'photos'
        }
    },

}
</script>
