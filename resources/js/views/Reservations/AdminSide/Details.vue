<template>
    <v-expansion-panels flat v-model="panel" multiple>
        <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0" >
              <div class="d-inline">
                  <v-icon>mdi-calendar-month</v-icon>
                  RESERVA
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="font-italic">created</td>
                                <td class="text-right">{{reservation.created_at}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">modified</td>
                                <td class="text-right">{{reservation.updated_at}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">currency</td>
                                <td class="text-right">{{reservation.currency}}</td>
                            </tr>
                            <tr class="font-weight-bold">
                                <td class="font-italic">booking_id</td>
                                <td class="text-right">{{reservation.id}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">booking_status</td>
                                <td class="text-right">{{reservation.state}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">start_date</td>
                                <td class="text-right">{{reservation.from}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">end_date</td>
                                <td class="text-right">{{reservation.to}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">nights</td>
                                <td class="text-right">{{reservation.nights}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">rooms</td>
                                <td class="text-right">{{reservation.count_rooms}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">amount_total</td>
                                <td class="text-right">
                                    <v-chip label small>
                                         {{reservation.total_price}}
                                    </v-chip>
                                </td>
                            </tr>
                            <tr>
                                <td class="font-italic">deposit_amount</td>
                                <td class="text-right" >
                                    <v-chip label small>
                                         {{reservation.payed}}
                                    </v-chip>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-chart-pie</v-icon>
                  IMPORTES
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-simple-table dense v-for="(rate,index) in reservation.rates" :key="index">
                   <template v-slot:default>
                       <tbody>
                           <tr>
                                <td class="font-italic">amount</td>
                                <td class="text-right">{{rate.amount}}</td>
                           </tr>
                           <tr>
                               <td class="font-italic">monday</td>
                                <td class="text-right">{{rate.monday}}</td>
                           </tr>
                           <tr>
                                <td class="font-italic">tuesday</td>
                                <td class="text-right">{{rate.tuesday}}</td>
                           </tr>
                           <tr>
                               <td class="font-italic">wednesday</td>
                                <td class="text-right">{{rate.wednesday}}</td>
                           </tr>
                           <tr>
                                <td class="font-italic">thursday</td>
                                <td class="text-right">{{rate.thursday}}</td>
                           </tr>
                           <tr>
                                <td class="font-italic">friday</td>
                                <td class="text-right">{{rate.friday}}</td>
                           </tr>
                           <tr>
                                <td class="font-italic">saturday</td>
                                <td class="text-right">{{rate.saturday}}</td>
                           </tr>
                           <tr>
                                <td class="font-italic">sunday</td>
                                <td class="text-right">{{rate.sunday}}</td>
                           </tr>
                       </tbody>
                   </template>
                   <v-divider></v-divider>
               </v-simple-table>
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

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-account</v-icon>
                  CLIENTE
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                   <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="font-italic">first_name</td>
                                <td class="text-right">{{reservation.guest_name}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">last_name</td>
                                <td class="text-right">{{reservation.guest_last_name}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">email</td>
                                <td class="text-right">{{reservation.guest_email}}</td>
                            </tr>
                            <tr >
                                <td class="font-italic">phone</td>
                                <td class="text-right">{{reservation.guest_phone}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">country</td>
                                <td class="text-right">{{reservation.guest_country}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">check_in_time</td>
                                <td class="text-right">{{reservation.check_in}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">requests</td>
                                <td class="text-right">{{reservation.guest_petitions}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4" v-for="(room,index)  in reservation.rooms" :key="index">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-bed</v-icon>
                  HABITACIÓN {{ index + 1 }}
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                 <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="font-italic">name</td>
                                <td class="text-right">{{room.name}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">type</td>
                                <td class="text-right">{{room.type}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">guest</td>
                                <td class="text-right">{{room.guest_name.name}}</td>
                            </tr>
                            <tr >
                                <td class="font-italic">smoking</td>
                                <td class="text-right">{{room.smoking_policy}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">rack_rate</td>
                                <td class="text-right">{{room.rack_rate}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">room_adults</td>
                                <td class="text-right">{{room.adults}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">room_children</td>
                                <td class="text-right">{{room.children}}</td>
                            </tr>
                            <tr>
                                <td class="font-italic">amount</td>
                                <td class="text-right">{{room.price}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
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