<template>
<div>
   <div id="app">
  <v-app id="inspire">
    <v-card>
    <v-row justify="center" align="center">
      
       <Calendar
      is-expanded
        :min-date='new Date()'
        is-inline
       >
       
       <div
          slot="day-content"
          
          slot-scope="{day, dayTitle}" margin="bold">
          <div class="text-xs text-gray-300 font-semibold text-center">
            {{ dayTitle}}
          </div>
          <div class="text-xs text-gray-300 font-semibold text-center">
            {{day.day}}
          </div>
         <v-row justify="center" align="center">
           <input  type="text" class="white--text orange text-center" value="$2000">
           <v-divider class="mx-1" inset></v-divider>
            <input  type="text" class="white--text orange text-center" value="18">
         </v-row>
           
         
            
         
          
       </div>
       </Calendar>
        
     
      
    </v-row>
    </v-card>
  </v-app>
</div>
</div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default{
    data(){
    return {
    selectedDate: null,
    
    };
    },

    mounted () {
   
  },

  methods: {
    
  },

  components:{
   Calendar,
  DatePicker
  },
  computed: {
    
  },
}

</script>


