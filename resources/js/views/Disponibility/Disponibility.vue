<template>
<div>
   <div >
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
     <v-col  cols="4" sm="12" md="4"  >
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
        Calendar
    </v-col>
    </v-row>
 
</div>
</div>
</template>


<script >



import { mapActions, mapState, mapGetters } from 'vuex';


export default{
    data(){ 
    return {
     
      hotelSelected: null,
      loadingRooms: false,
      roomSelected: null,
      select: null,
    };
    },

    mounted () {
      this.$store.dispatch('getHotelsForAdmin');   
    },

 

    beforeDestroy() {
   
  },

  methods:{

    ...mapActions(['getRoomsForAdmin']),
      searchRoom(idHotel){
        this.loadingRooms = true
        this.getRoomsForAdmin(idHotel).then( () => {
        this.loadingRooms = false
        this.loadRooms();
      } 
     )
    },
    onState(state){
      // this.state = state;
      // subs.push(
      //   state.subscribe(`config.chart.items.${GSTCID('1')}`, (item) => {
      //     console.log('item 1 changed', item);
      //   })
      // );

      // subs.push(
      //   state.subscribe(`config.list.rows.${GSTCID('1')}`, (row) => {
      //     console.log('item 1 changed', row);
      //   })
      // );
    },

    onLoaded(gstc){
      // console.log('gstc loaded!', gstc);
      // window.gstc = gstc;
      // setTimeout(() => {
      //   const item1 = this.config.chart.items[GSTCID('1')];
      //   item1.label = 'label changed dynamically';
      //   item1.time.end += 2 * 24 * 60 * 60 * 1000;
      //   const row1 = this.config.list.rows[GSTCID('1')];
      //   row1.label = 'label changed dynamically';
      // }, 4000);
    },

    loadRooms(){
      this.config.list.rows = this.rooms
    }
    
  },

  beforeUnmount() {
  
  },

  components:{
   
  },

  computed: {
    ...mapState({
      hotels: state => state.disponibilityMoule.ahotels,
      rooms: state => state.disponibilityMoule.arooms,
    }),
  
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
