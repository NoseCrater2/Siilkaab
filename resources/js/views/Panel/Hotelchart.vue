<template>
     <v-sheet   >
        <v-card-title class="black--text">
            <v-spacer></v-spacer>
            {{info.name}}
             <v-spacer></v-spacer>
        </v-card-title>
                
        <v-card :loading="loading" width="85%" style="margin: auto" >
            <v-card-title style="color: #BDBDBD" v-if="earnings.length == 0">
                Sin reservas
            </v-card-title>
            <v-card-text v-else>
                <v-row no-gutters>
                <v-col cols="6">
                <v-timeline reverse align-top dense>
                    <v-timeline-item
                    v-for="(ae, index) in anual_earnings"
                    :key="index"
                    color="red darken-1"
                    small
                    >
                        
                        <div class="font-weight-normal">
                          <strong>{{ ae.year  }}</strong> Reservaciones: {{ ae.count }}
                        </div>
                        <div>Ganancias: {{info.symbol+ae.summatory+' '+info.code }}</div>
                        
                    </v-timeline-item>
                </v-timeline>
                </v-col>
                 <v-col cols="6">
                     <div class="font-weight-bold ml-8 mb-2">
                        <v-select
                        dense
                        outlined
                        :items="years"
                        v-model="selectedOption"
                        @change="chargeData"
                        ></v-select>
                    </div>
                <v-timeline align-top dense>
                    <v-timeline-item
                    v-for="(earning, index) in earnings"
                    :key="index"
                    color="primary"
                    small
                    >
                        <div>
                            <div class="font-weight-normal">
                              <strong>{{  $moment().month(earning.month - 1).format('MMMM') }}</strong> Reservaciones: {{ earning.count }}
                            </div>
                            <div>Ganancias: {{ info.symbol+earning.summatory+' '+info.code }}</div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
                </v-col>
               </v-row>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>
<script>
import Chart from 'chart.js'
import axios from 'axios'
export default {
    data(){
        return{
            selectedOption : new Date().getFullYear().toString(),
            earnings: [],
            anual_earnings: [],
            loading: false,
            
        }
    },

    mounted(){
        this.loading = true
        axios.get('api/earnings/'+this.selectedOption+'/'+this.info.id).then(data => {
          this.earnings = data.data 
        })

        axios.get('api/anual-earnings/'+this.info.id).then(data => {
          this.anual_earnings = data.data 
          this.loading = false
        })
    },

    props: {
        index: Number,
        info: Object,
    },

    computed: {
        years(){
            const years = []
            const dateEnd = this.$moment()
            const dateStart = this.$moment('2021-01-01')
            while (dateEnd.diff(dateStart, 'years') >= 0) {
                years.push(dateStart.format('YYYY'))
                dateStart.add(1, 'year')
                }
            return years
        }
    },

    methods:{
        createDonut(){
            let donut = this.$refs.donut
            let context = donut.getContext("2d");
            let d = new Chart(context, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        backgroundColor:[
                            '#C62828',
                            '#FDD835',
                            '#42A5F5',
                        ],
                        hoverBackgroundColor:[
                           '#C62828',
                            '#FDD835',
                            '#42A5F5',
                        ],
                        hoverBorderWidth: 2,
                        data: [10,20,30]
                    }],

                    labels: [
                        'Red',
                        'Yellow',
                        'Blue',
                    ]
                },
            })
       },

       createCake(){
           let cake = this.$refs.cake
           let context = cake.getContext("2d");
           let d = new Chart(context, {
                type: 'pie',
                data: {
                    datasets: [{
                        backgroundColor:[
                            '#C62828',
                            '#FDD835',
                            '#42A5F5',
                        ],
                        hoverBackgroundColor:[
                           '#C62828',
                            '#FDD835',
                            '#42A5F5',
                        ],
                        label: '50',
                        hoverBorderWidth: 2,
                        data: [10,20,30]
                    }],

                    labels: [
                        'Red',
                        'Yellow',
                        'Blue',
                    ]
                },
            })
       },

        chargeData(){
            axios.get('api/earnings/'+this.selectedOption+'/'+this.info.id).then(data => {
                this.earnings = data.data 
            })
        }
    }
    
}
</script>

