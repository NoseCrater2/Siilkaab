<template>
<div>
   <div id="app">
  
    <v-row >
      <v-col cols="4" md="4" sm="0">

      </v-col>
      <v-col cols="4" sm="12" md="4" >
        <v-autocomplete
              v-model="hotelSelected"
              :items="hotels"
              item-text="title"
              item-value="hotel_id"
              outlined
              dense
              label="Seleccione Hotel"
              @change="searchRoom(hotelSelected)"
            ></v-autocomplete>
      </v-col>
      <v-col cols="4" sm="12" md="4" >
        

            <v-autocomplete
              v-model="roomSelected"
              :items="rooms"
              :loading="loadingRooms"
              item-text="name"
              item-value="id"
              outlined
              dense
              label="Seleccione Habitación"  
        ></v-autocomplete>
      </v-col>
    </v-row>

   <v-row >
     <v-col  cols="4" sm="12" md="4" class="pb-4" >
      <v-form>
         <v-alert dense type="info">
        Para ver o configurar
         <strong>Disponibilidad</strong> y <strong>Tarifa</strong> seleccione un <strong>Rango de fecha</strong>,
          los <strong>Días</strong> a aplicar, las <strong>Unidades</strong> y la <strong>Tarifa</strong>  a aplicar.
        </v-alert>
        <v-col class="my-3">
          
        </v-col>
             
         <v-combobox
            v-model="select"
            :items="items"
            label="Días"
            multiple
            outlined
            dense
          ></v-combobox>
        
            <v-text-field
            outlined
              solo
              label="Unidades"
              prepend-inner-icon="mdi-bed-empty"
            ></v-text-field>
          
          
             <v-text-field
             outlined
              solo
              label="Tarifa"
               prepend-inner-icon="mdi-currency-usd-circle"
             
            ></v-text-field>
          
           <v-spacer></v-spacer>
          <v-btn color="primary" large block>Aplicar</v-btn>
           <v-spacer></v-spacer>
      
        

      </v-form>
    </v-col>
    <v-col cols="8" sm="12" md="8">
  
    </v-col>
    </v-row>
 
</div>
</div>
</template>

<script>



import { mapActions, mapState, mapGetters } from 'vuex';

let subs = []


export default{
    data(){ 
    return {
      myChartStart: "2020-03-01 00:00",
      myChartEnd: "2020-03-5 00:00",
      rows: [
        {
          label: "Room #1",
          bars: [
            {
             myStart: "2020-03-01 12:10",
            myEnd: "2020-03-01 16:35"
            }
          ]
        },
        {
          label: "Room #1",
          bars: [
             {
              myStart: "2020-03-02 01:00",
              myEnd: "2020-03-02 12:00"
            },
            {
              myStart: "2020-03-02 13:00",
              myEnd: "2020-03-02 22:00"
            }
          ]
        }
        
      ],  
      loadingRooms: false,
      roomSelected: null,
      hotelSelected: null,
      range: {
        start: new Date(),
        end : new Date(),
      },
      select: null,
      items:[
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Sábado',
        'Domingo',
      ],

     
    };
    },

    mounted () {
      this.$store.dispatch('getHotelsForAdmin');
       this.getDays(2020, 9);
       console.log(this.fechas)
     
    },

 

    beforeDestroy() {
    subs.forEach(unsub => unsub());
  },

  methods:{
    ...mapActions(['getRoomsForAdmin']),
    searchRoom(idHotel){
     this.loadingRooms = true
     
     this.getRoomsForAdmin(idHotel).then( () => {
        this.loadingRooms = false
     }
      
     )
    },

    // getDays(year, month){
    //   var diasMes = new Date(year, month, 0).getDate()
    //   var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    //   for (var dia = 1; dia <= diasMes; dia++) {
    //       // Ojo, hay que restarle 1 para obtener el mes correcto
    //       var indice = new Date(year, month - 1, dia).getDay();
    //       var f = new this.fechas()
    //       this.f.year = year
    //       this.f.month = month
    //       this.f.dayNumber = dia
    //       this.f.year = diasSemana[indice]
         
    //   }
    // }
    


  },

  components:{
 
  },

  computed: {
    ...mapState({
      hotels: state => state.disponibilityMoule.ahotels,
      rooms: state => state.disponibilityMoule.arooms,
    }),

    ...mapGetters([

     ]),

  
  },
}

</script>

