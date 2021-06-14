<template>
    <div>
        <div id="app">
            <v-app id="inspire">
            <v-overlay :value="!chargeView" opacity="0.7" z-index="8">
                <div>
                    <div>
                        <v-progress-circular
                            class="ml-14 mb-2"
                            indeterminate
                            size="64"
                        ></v-progress-circular>
                    </div>
                    <div>Cargando información...</div>
                </div>
            </v-overlay>
                <div style="z-index: 7; background-color: white; position: sticky; top: 63px">
                  <v-banner :sticky="true" single-line>
                    <v-row class="d-flex align-center justify-end">
                      <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="d-flex justify-start">
                          <v-btn color="red" small class="white--text" @click="$router.push({name:'Reservations'})" depressed>CERRAR <v-icon right>mdi-close-circle</v-icon> </v-btn>
                          <v-spacer></v-spacer>
                          <h2 v-if="chargeView">RESERVA {{reservation.id}}</h2>
                      </v-col>
                    </v-row>
                  </v-banner>
                </div>

                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" v-if="$vuetify.breakpoint.mdAndUp">
                            <v-card class="pa-2" outlined tile style="position: sticky; z-index: 2; top: 131px">
                                <v-list dense>
                                    <v-list-item-group color="primary" v-model="selectedItem" mandatory>
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
                        </v-col>
                        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" v-if="!$vuetify.breakpoint.mdAndUp" :style="$vuetify.breakpoint.sm ? 'position: sticky; z-index: 3; top: 133px;' : $vuetify.breakpoint.xs ? 'position: sticky; z-index: 3; top: 133px;' : ''">
                            <v-tabs icons-and-text show-arrows v-model="selectedItem" background-color="white" color="primary" grow>
                                <v-tabs-slider color="primary"></v-tabs-slider>
                                <v-tab v-for="(item, i) in items" :key="i" :to="{name:item.route}">
                                    {{ item.text }}
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-tab>
                            </v-tabs>
                        </v-col>
                        <v-col cols="12" xl="9" lg="9" md="9" sm="12" xs="12">
                            <router-view :key="$route.path" v-if="chargeView"></router-view>
                        </v-col>
                    </v-row>
                </v-container>
            </v-app>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    created(){
        this.getPromiseInformation();
    },

    data(){
        return{
            chargeView: false,
            selectedItem: 0,
            items: [
                { text: 'Voucher', icon: 'mdi-ticket-account', route: 'Reservation' },
                { text: 'Detalles', icon: 'mdi-note-text', route: 'Details' },
                { text: 'Notas', icon: 'mdi-file', route: 'Notes' },
                { text: 'Historial', icon: 'mdi-history', route: 'History' },
            ],
        }
    },

    methods:{
        ...mapActions(["getReservation", "getCountries", "getNotes", "getHistory"]),
        async getPromiseInformation(){
            let promiseReservation = 1;
            let promiseCountries = 1;
            let promiseNotes = 1;
            let promiseHistory = 1;
            promiseReservation = this.getReservation(this.id);
            promiseCountries = this.getCountries();
            promiseNotes = this.getNotes(this.id);
            promiseHistory = this.getHistory(this.id);
            await Promise.all([promiseReservation, promiseCountries, promiseNotes, promiseHistory]).then(values => {
                this.chargeView = true;
            }).then(()=>{
                this.chargeView = true;
            });
        }
    },

    computed:{
         ...mapState({
            reservation: state => state.bookingsModule.reservation,

        }),
    },

    props:['id']
}
</script>
