<template>
    <div>
        <v-row justify="space-around" no-gutters>
            <v-col cols="12" md="8">
                <v-card min-height="300">
                    <canvas ref="chart"></canvas>
                </v-card>
            </v-col>
        </v-row>
        <v-row  justify="space-around" no-gutters>
            <v-col cols="12" md="6" sm="12" v-for="n in 2" :key="n">
                <v-card  flat class="ma-4" outlined >
                    <v-card-title :class="`${colors[n]} lighten-2`" class="white--text">
                        Estrella de Oro
                        <v-spacer></v-spacer>
                         GANANCIAS
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list-item three-line >
                        <v-list-item-content>
                            <div class="overline mb-4">
                              <v-select
                              dense
                              :color="colors[n]"
                              :item-color="colors[n]"
                              hide-details
                              style="width: 250px"
                              rounded
                              outlined
                              v-model="typeAmount"
                              :items="['Últimos 15 días','Este mes', 'Este año','Todas']"
                              ></v-select>
                            </div>
                            <v-list-item-title class="headline mb-1">
                              $4,055.56 MXN
                            </v-list-item-title>
                            <v-list-item-subtitle>68.2 % más que el último mes</v-list-item-subtitle>
                        </v-list-item-content>
  
                        <v-progress-circular
                        
                        :rotate="360"
                        :size="100"
                        :width="15"
                        :value="35"
                        color="darken-3"
                        >
                        <template v-slot:default>
                            <v-progress-circular
                            style="opacity: 0.7; z-index: 2"
                            :rotate="360"
                            :size="100"
                            :width="15"
                            :value="100"
                            :color="`${colors[n]} lighten-2`"
                            >
                             35%
                            </v-progress-circular>
                        </template>
                        </v-progress-circular>
                    </v-list-item>
                </v-card>
            </v-col>
            
        </v-row>

        
        
    </div>
</template>
<script>
import Chart from 'chart.js'
// import LineChart from '../../plugins/LineChart'
import axios from 'axios'
export default {

   data(){
       return{
           typeAmount: 'Últimos 15 días',
           datasets: [],
           datacollection: null,
           colors:[
               'red',
               'pink',
               'purple',
               'deep-purple',
               'indigo',
               'blue',
               'light-blue',
               'cyan',
               'teal',
               'green',
               'light-green',
               'lime',
               'yellow',
               'amber',
               'orange',
               'deep-orange',
               'brown',
               'blue-grey',
           ]
       }
   },

   mounted(){
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
       }
   }
}
</script>


