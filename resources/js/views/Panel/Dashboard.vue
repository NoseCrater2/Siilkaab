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
               labels: [this.getRandomInt(), this.getRandomInt()],
               datasets: [
                   {
                       label: 'Data One',
                       backgroundColor: '#f87979',
                       data: [this.getRandomInt(), this.getRandomInt()]
                   },
                   {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
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
