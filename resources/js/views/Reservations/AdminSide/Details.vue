<template>
    <div>
        <v-card class="pa-2" outlined tile>
            <div class="d-flex align-center ml-1">
                <v-row>
                    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                        <div>
                            <h1 class="font-weight-bold" :class="!$vuetify.breakpoint.mdAndUp ? 'text-center': ''">Detalles de reserva</h1>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-4"></v-divider>
            <v-expansion-panels focusable multiple v-model="panel" v-if="reservation">
                <v-expansion-panel>
                    <v-expansion-panel-header color="#b2b2b2">
                      <div class="d-inline">
                          <v-icon dark>mdi-calendar-month</v-icon>
                          <span class="white--text font-weight-bold">Reserva</span>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Creada el: </td>
                                            <td class="text-right">{{reservation.created_at}}</td>
                                        </tr>
                                        <tr>
                                            <td>Modificada el: </td>
                                            <td class="text-right">{{reservation.updated_at}}</td>
                                        </tr>
                                        <tr>
                                            <td>Moneda: </td>
                                            <td class="text-right">{{reservation.currency}}</td>
                                        </tr>
                                        <tr class="font-weight-bold">
                                            <td>ID de reserva: </td>
                                            <td class="text-right">{{reservation.id}}</td>
                                        </tr>
                                        <tr>
                                            <td>Estatus de reserva: </td>
                                            <td class="text-right">{{reservation.state}}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de entrada: </td>
                                            <td class="text-right">{{reservation.from}}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de salida: </td>
                                            <td class="text-right">{{reservation.to}}</td>
                                        </tr>
                                        <tr>
                                            <td>Noches: </td>
                                            <td class="text-right">{{reservation.nights}}</td>
                                        </tr>
                                        <tr>
                                            <td>Habitaciones: </td>
                                            <td class="text-right">{{reservation.count_rooms}}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe total: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{reservation.total_price}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Cantidad pagada: </td>
                                            <td class="text-right" >
                                                <v-chip label small>
                                                    {{reservation.payed}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                 <v-expansion-panel class="my-6">
                    <v-expansion-panel-header color="#b2b2b2">
                        <div class="d-inline">
                          <v-icon dark>mdi-chart-pie</v-icon>
                          <span class="white--text font-weight-bold">Importes</span>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-simple-table dense v-for="(rate,index) in reservation.rates" :key="index">
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Monto: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.amount}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Lunes: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.monday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Martes: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.tuesday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Miércoles: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.wednesday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jueves: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.thursday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Viernes</td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.friday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sábado: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.saturday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Domingo: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{rate.sunday}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                                <v-divider></v-divider>
                            </v-simple-table>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                 <!-- <v-expansion-panel class="my-4">
                    <v-expansion-panel-header color="#E0E0E0">
                        <div class="d-inline">
                          <v-icon>mdi-check-bold</v-icon>
                          CONFIRMACIÓN
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
                    </v-expansion-panel-content>
                </v-expansion-panel> -->

                 <v-expansion-panel>
                    <v-expansion-panel-header color="#b2b2b2">
                        <div class="d-inline">
                          <v-icon dark>mdi-account</v-icon>
                          <span class="white--text font-weight-bold">Cliente</span>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Nombre(s): </td>
                                            <td class="text-right">{{reservation.guest_name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Apellidos: </td>
                                            <td class="text-right">{{reservation.guest_last_name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Email: </td>
                                            <td class="text-right">{{reservation.guest_email}}</td>
                                        </tr>
                                        <tr >
                                            <td>Teléfono: </td>
                                            <td class="text-right">{{reservation.guest_phone}}</td>
                                        </tr>
                                        <tr>
                                            <td>País: </td>
                                            <td class="text-right">{{reservation.guest_country}}</td>
                                        </tr>
                                        <tr>
                                            <td>Hora de entrada: </td>
                                            <td class="text-right">{{reservation.check_in}}</td>
                                        </tr>
                                        <tr>
                                            <td>Peticiones especiales: </td>
                                            <td class="text-right" style="font-size: 0.85em; ">{{reservation.guest_petitions}}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                 <v-expansion-panel v-for="(room,index)  in reservation.rooms" :key="index" :class="(((index % 2) == 0) && index < reservation.rooms.length) ? 'my-6' : ''">
                    <v-expansion-panel-header color="#b2b2b2">
                        <div class="d-inline">
                          <v-icon dark>mdi-bed</v-icon>
                          <span class="white--text font-weight-bold">Habitación {{ index + 1 }}</span>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Nombre: </td>
                                            <td class="text-right">{{room.name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Tipo: </td>
                                            <td class="text-right">{{room.type}}</td>
                                        </tr>
                                        <tr>
                                            <td>Huesped: </td>
                                            <td class="text-right">{{room.guest_name.name}}</td>
                                        </tr>
                                        <tr >
                                            <td>Políticas tabaqueras: </td>
                                            <td class="text-right">{{room.smoking_policy}}</td>
                                        </tr>
                                        <tr>
                                            <td>Tarifa base: </td>
                                            <td class="text-right">{{room.rack_rate}}</td>
                                        </tr>
                                        <tr>
                                            <td>Adultos: </td>
                                            <td class="text-right">{{room.adults}}</td>
                                        </tr>
                                        <tr>
                                            <td>Niños: </td>
                                            <td class="text-right">{{room.children}}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe: </td>
                                            <td class="text-right">
                                                <v-chip label small>
                                                    {{room.price}}
                                                </v-chip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            panel: [0],
        }
    },

    mounted(){

    },

    computed:{
         ...mapState({
            reservation: state => state.bookingsModule.reservation,
        }),
    },
}
</script>
