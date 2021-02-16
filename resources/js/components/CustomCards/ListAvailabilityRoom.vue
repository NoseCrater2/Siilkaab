<template>
    <v-item-group mandatory v-model="bookings.rooms[index]">
        <v-container>
            <v-row>
                <v-col cols="12"  v-for="r in room" :key="r.id">
                    <v-item  v-slot="{ active, toggle }" :value="r" >
                        <v-hover   v-slot="{ hover }" >
                            <v-card flat  height="200"  :outlined="hover?true:false" :color="active?'#F0F2F5':''" >
                                <div class="d-flex flex-no-wrap justify-left">
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
                                            <b v-if="r.quantity == 1" style="color: red">¡Última unidad!</b>
                                            <b v-else-if="r.quantity <= 5" style="color: red">¡Solo quedan {{ r.quantity }} unidades!</b><br>

                                            Capacidad máxima: <br>
                                            Adultos: {{ r.max_adults}}. Niños: {{ r.max_children}} <br>
                                        </v-card-text>
                                        <v-card-actions class="py-1">
                                            <v-btn small depressed tile outlined><v-icon left>mdi-magnify-plus</v-icon>Ampliar información</v-btn>
                                        </v-card-actions>
                                    </div>
                                    <div>
                                        <v-card-title>TARIFA Y REGIMEN</v-card-title>
                                        <v-card-actions>
                                            <v-checkbox @click="toggle" v-model="active"></v-checkbox>
                                        </v-card-actions>
                                        
                                    </div>
                                    <div >
                                        <v-card-title  > {{configuration.currency_symbol + r.rack_rate +' '+ configuration.currency_code}}</v-card-title>
                                        <v-btn tile small>RESERVAR</v-btn>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-item>
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
            selected_room: null,
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

        selectedRoom: {
            get: function(){
                return this.bookings.rooms[this.index]
            },
            set: function(newValue){
                this.$store.commit('setNewRoom' , {'index':this.index, 'room':newValue })
                
            }
            
        }
    },

    methods: {
        openRoomDetail(id){
            this.roomId = id
            this.dialog = true
        },
        closeRoomDetail(){
            this.dialog = false
            this.icon = 'photos'
        },
        addRoomToBooking(){
            this.$store.dispatch('addRoom', {'room':this.selected_room,'index':this.index})
        }
    },

    components:{
        DialogDetailRooms,
    },

}
</script>