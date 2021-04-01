<template>
    <div>
        <v-row justify="space-around" no-gutters>
            <v-col cols="12" md="6" sm="12">
                <v-card min-height="450" class="ma-2" elevation="5">
                    <canvas ref="chart"></canvas>
                </v-card>
               
            </v-col>
            <v-col cols="12" md="6" sm="12">
               <v-carousel hide-delimiters light >
                    <v-carousel-item    v-for="(hotel, index) in hotels" :key="index">
                        <HotelChart :info="{name: hotel.title,id: hotel.id,code:hotel.currency_code,symbol: hotel.currency_symbol}" :index="index"/>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col cols="12" >
               
                  <v-card class="ma-2" min-height="400" elevation="5">
                    <v-card-title>
                        <v-spacer></v-spacer>
                            RESERVACIONES RECIENTES
                         <v-spacer></v-spacer>
                    </v-card-title>
                   <v-data-table
                   dense
                   item-class="minimize-font"
                    :headers="headers"
                    :items="reservations"
                    hide-default-footer
                    >
                        <!-- <template v-slot:item.state="{item}">
                            <div v-if="item.state == 'Confirmed'">
                                <v-icon color="green">mdi-check-circle</v-icon>
                               CONFIRMADO
                            </div>
                            <div v-else-if="item.state == 'Cancelled'">
                                <v-icon color="red">mdi-close-circle</v-icon>
                               CANCELADO
                            </div>
                        </template> -->
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Chart from 'chart.js'
import HotelChart from './Hotelchart';
import {mapState} from 'vuex'
// import LineChart from '../../plugins/LineChart'
import axios from 'axios'
export default {

   data(){
       return{
           typeAmounts: [
               {name: 'Últimos 15 días', key:'days'},
               {name: 'Este mes', key:'month'},
               {name: 'Este año', key:'year'},
               {name: 'Todas', key:'all'}
            ],
           datasets: [],
           datacollection: null,
           earnings: [],
           typeAmount:['days'],
           headers: [
                {
                  text: "ID",
                  sortable: true,
                  value: "id",
                },
                { text: "Fecha", value: "created_at" },
                { text: "Cliente", value: "guest" },
                { text: "Hotel", value: "hotel" },
                { text: "Inicio", value: "from" },
                { text: "Final", value: "to" },
                { text: "Importe", value: "total_price", sortable: false },
                { text: "Estado", value: "state" },
            ],
       }
   },

    mounted(){

        this.$store.dispatch("getDasboardReservations").then(()=>{
            //  this.loadingHotels = false
         });
       axios.get('api/dashboard/').then(data => {
           this.range = data.data[1].range
          for (const key in data.data) {
                this.datasets.push(
                    { 
                        label: data.data[key].title,
                        backgroundColor: data.data[key].color,
                        borderColor: data.data[key].color,
                        data: data.data[key].counts,
                        fill: false
                    }
                )
          }
         this.createChart()
       })

        // axios.get('api/earnings/').then(data => {
        //    this.earnings = data.data
        // })

       
       
   },

   methods: {
       createChart(){
            let chart = this.$refs.chart
            let ctx = chart.getContext("2d");
            let myChart = new Chart(ctx, {
                type: 'line',
                    data: {
                        labels: this.range,
                        datasets: this.datasets,
                    },

                    options: {
                        responsive: true,
                    title: {
                        display: true,
                        text: 'Reservas de los últimos 15 días'
                    },
                    scales: {
                        xAxes: [{ display: true, scaleLabel: {display: true, labelString: 'Fechas'}}],
                        yAxes: [{ display: true, scaleLabel: {display: true, labelString: 'Reservas'}}]
                    }
                }
            })
       },
   },

   computed:{
        ...mapState({
            reservations: state => state.bookingsModule.reservations,
            hotels: state => state.HotelModule.allhotels
        }),
   },

   components:{
       HotelChart,
   }
}
</script>

<style>
    td{
        font-size: 15px !important;
    }
</style>


