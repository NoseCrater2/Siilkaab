<template>
    <div>
        <table>
            <thead>
                <th>Habitaciones</th>
                <th v-for="n in 10" :key="n">{{ n}}</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    data(){ 
    return {
        helper: new Date(),
        days: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo',],
        months: ['Enero','Febreo','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        month:{nameMonth:null, numberMonth:null, days:[]},

    };
    },

    mounted(){
    this.monthDetails(2020,9);
    console.log(this.month)
    },

    modules:{
        // helper,
    },

    methods:{
        currentYear(){
           return this.helper.getFullYear();
        },
        currentMonth(){
            return {number:this.helper.getMonth()+1, name: this.months[this.helper.getMonth()]};
        },
        currentDay(){
            return {number:this.helper.getDate(), name: this.days[this.helper.getDay()-1]};
        },
        monthDetails(year, month){
            
            this.month.nameMonth = this.months[month];
            this.month.numberMonth = month+1;
            
           let size = new Date(year, month+1, 0).getDate();
            for (let index = 1; index <= size; index++) { 
               this.month.days.push({name:this.days[new Date(year, month, index-1).getDay()] , number: index});
            }
        },
    }
}
</script>