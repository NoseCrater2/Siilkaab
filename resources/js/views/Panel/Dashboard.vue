<template>
    <div class="small">
        <line-chart v-if="datacollection != null" :chart-data="datacollection"></line-chart>
        <button @click="fillData">Randomize</button>
    </div>
</template>
<script>
import LineChart from '../../plugins/LineChart'
export default {
   components: {
       LineChart
   },
   data(){
       return{
           datacollection: null
       }
   },

   mounted(){
       this.fillData()
   },

   methods: {
       getRandomInt(){
           return Math.floor(Math.random() * (50 - 5 + 1)) + 5
       },

       fillData(){
           this.datacollection = {
               labels: [17,18,19,20,21,22],
               datasets: [
                   {
                       label: 'Hotel 1',
                       backgroundColor: '#f87979',
                       data: [2,3,4,5,6,7]
                   },
                   {
                        label: 'Hotel 2',
                        backgroundColor: '#a87979',
                        data: [7,6,5,4,3,2]
                   }
               ]
           }
       },

       
   }
}
</script>

<style >
 .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
