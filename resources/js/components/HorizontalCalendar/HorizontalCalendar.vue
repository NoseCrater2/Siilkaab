<template>
    <div>
        <div>
            <v-row justify="space-around">
                <v-card>
                    <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :disable-pagination="true"
                    :disable-sort="true"
                    class="elevation-1"
                    :hide-default-footer="true"
                    ></v-data-table>
                </v-card>
            </v-row>
      </div>
    </div>
</template>

<script>
export default {
    data(){ 
    return {
        days: [],
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() +1,
        currentDay: new Date().getDate(),
        availableMonths: ["Enero","Febreo","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        availableDays: ['Dom','Lun','Mar','Mier','Jue','Vier','Sáb'],
        headers: [
        {
         
          align: 'center',
          sortable: false,
          value: 'name',
        },
       
      ],
      desserts: [
        {
          name: 'Room con nombre largo',
        },
        {
          name: 'Room con nombre un poco mas largo',
        },
        
      ],
    };
    },

    mounted(){
      this.daysToShow(this.currentYear, this.currentMonth)
    },
    methods:{
        daysToShow(year, month){
            var diasMes = this.daysInMonth(month, year);
            for (var dia = this.currentDay; dia <= diasMes; dia++) {
                var indice = new Date(year, month - 1, dia).getDay();
               
              let d = {
                    dayNumber:  dia,
                    day: this.availableDays[indice],
                    text : dia+" "+this.availableDays[indice],
                }
            this.headers.push(d)
            }  

            
        }, 
        
        daysInMonth(month, year){
            return new Date(year, month,0).getDate();
        }
    }
}
</script>