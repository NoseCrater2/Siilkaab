<template>
    <div>
        <v-card class="ma-3" flat style="position: sticky; z-index: 7; top: 64px">
            <v-card-actions>
            <v-btn color="red" small class="white--text" @click="$router.push({name:'Reservations'})" depressed>CERRAR <v-icon right>mdi-close-circle</v-icon> </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>RESERVA {{reservation.id}}</v-toolbar-title>
            </v-card-actions>
            <v-divider></v-divider>
        </v-card>
        <v-card flat>
            <v-row no-gutters>
                <v-col cols="12"  md="3" sm="12">
                    <v-card  flat class="ma-4"  tile style="position: sticky; z-index: 2; top: 120px">
                        <v-list dense >
                            <v-list-item-group color="primary" v-model="selectedItem">
                                <v-list-item v-for="(item, i) in items" :key="i" :to="{name:item.route}">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                        
                    </v-card>
                    <v-divider vertical></v-divider>
                </v-col>
                <v-col cols="12" md="9" sm="12">
                    <router-view :key="$route.path"></router-view>        
                </v-col>
            </v-row>
        </v-card>

    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            selectedItem: 0,
            items: [
                { text: 'Voucher', icon: 'mdi-ticket-account', route: 'Reservation' },
                { text: 'Detalles', icon: 'mdi-note-text-outline', route: 'Details' },
                { text: 'Notas', icon: 'mdi-file-outline', route: 'Notes' },
                { text: 'Historial', icon: 'mdi-history', route: 'History' },
            ],
        }
    },

    mounted(){
        this.$store.dispatch('getReservation', this.id)
    },

    computed:{
         ...mapState({
            reservation: state => state.bookingsModule.reservation,
            
        }),
    },

    props:['id']
}
</script>