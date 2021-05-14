<template>
    <v-item-group mandatory  v-model="bookings.rooms[index-1]">
        <v-container>
            <span class="font-italic">Seleccione la habitación que desee haciendo clic o tap sobre esta</span>
            <!-- <span class="font-italic">Habitación {{index}}: precios para </span> -->
            <v-row>
                <v-col cols="12"  v-for="(r, i) in room" :key="i">
                    <v-item  v-slot="{ active, toggle }" :value="r" >
                        <!-- <v-hover   v-slot="{ hover }" > -->
                            <v-card flat min-height="166"  :elevation="active?'5':'0'"  @click="toggle" :style="active?'border-right: 4mm solid #43A047;':''">
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <v-avatar class="ma-2" size="150" tile @click="openRoomDetail(r.id)">
                                        <v-hover v-slot="{ hover }">
                                            <v-img height="200" :src="`/img/${r.default_image}`">
                                               <v-row style="background-color: rgba(10, 10, 10, 0.5);" align="center" justify="center" v-if="hover">
                                                    <v-icon size="50" dark>mdi-magnify</v-icon>
                                               </v-row>
                                            </v-img>
                                        </v-hover>
                                    </v-avatar>
                                    <div>
                                        <v-card-title class="py-1" style="color: #1976D2" > {{ r.name }} </v-card-title>
                                        <v-card-text class="py-1">
                                            <b v-if="minDisponibility(r.rates[0]) == 1" style="color: red">¡Última unidad!</b>
                                            <b v-else-if="minDisponibility(r.rates[0]) <= 5" style="color: red">¡Solo quedan {{ minDisponibility(r.rates[0]) }} unidades!</b><br>

                                            Capacidad máxima: <br>
                                            Adultos: {{ r.max_adults}}. Niños: {{ r.max_children}} <br>
                                        </v-card-text>
                                        <v-card-actions class="py-1">
                                            <v-btn small depressed tile outlined @click="openRoomDetail(r.id)">
                                                <v-icon left>mdi-magnify-plus</v-icon>Ampliar información
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                    <div>
                                        <v-card-title>TARIFAS</v-card-title>
                                        <!-- <span v-for="(rs, index) in r.rates[0]" :key="index">
                                            Noche {{index + 1}}: {{rs.price}}
                                        </span> -->
                                        
                                    </div>
                                    <div >
                                        <v-card-title > {{configuration.currency_symbol + roomPrice(r.rates[0]) +' '+ configuration.currency_code}}</v-card-title>
                                        <v-btn tile depressed color="primary" small>RESERVAR</v-btn>
                                         
                                    </div>
                                </div>
                            </v-card>
                        <!-- </v-hover> -->
                    </v-item>
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <DialogDetailRooms @closeDialog="closeRoomDetail" :dialog="dialog" v-if="dialog"  :id="roomId"/>
        </v-container>
    </v-item-group>
</template>

<script>
import {mapState } from 'vuex';
import DialogDetailRooms from '../DetailRooms/DialogDetailRooms'
export default {
    data(){
        return{
            dialog: false,
            icon: 'photos',
            roomId: 0,
        }
    },
    
    props: {
        room: Array,
        index: Number,
    },

    computed:{
        ...mapState({
            bookings: state => state.bookingsModule.bookings,
            configuration: state => state.HotelModule.configuration,
        }),

        
    },

    methods: {
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
        },
    },

    components:{
        DialogDetailRooms,
    },

}
</script>