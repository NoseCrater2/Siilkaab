<template>
  <div>
    <div v-if="hotels === []">
      <v-app id="inspire">
        <v-data-table
          item-key="title"
          class="elevation-1"
          loading
          loading-text="Obteniendo datos..."
        ></v-data-table>
      </v-app>
    </div>

    <div v-else>
      <v-app id="inspire">
        <v-bottom-navigation  grow>
          <div v-show="selected==! []?false:true">
          <v-btn @click="showDeleteDialog()"><span color="error">ELIMINAR SELECCIÓN</span> <v-icon large color="error">mdi-delete-sweep</v-icon> </v-btn>
          </div>
          <v-divider class="mx-4"  inset vertical></v-divider>
           <v-spacer></v-spacer>

           <h1>HOTELES</h1>
            
           <v-spacer> </v-spacer>
           <v-divider class="mx-4"  inset vertical></v-divider> 
          <v-btn  @click="dialog = !dialog"> <span color="error">NUEVO HOTEL</span> <v-icon large color="primary">mdi-plus</v-icon></v-btn>
        </v-bottom-navigation>
        <v-card>
          <v-data-table
            v-model="selected"
            item-key="id"
            show-select
            :headers="headers"
            :items="hotels"
            :items-per-page="20"
            :single-select="singleSelect"
            multi-sort
            class="elevation-1"
            :search="search"
          >
            <template v-slot:top>
               <v-toolbar flat color="white">
                 <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar Hotel"
                      single-line
                      hide-details
                      align="center"
                    ></v-text-field>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="deleteDialog" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">¿Eliminar hoteles?</v-card-title>
                        <v-card-text>
                          Está a punto de eliminar uno o más registros de hotel.
                          Esta acción no se puede deshacer. ¿Continuar?
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn color="gray darken-1" text @click="deleteDialog = false">CANCELAR</v-btn>
                          <v-btn color="red darken-1" text @click="deleteItem()">ELIMINAR</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
               </v-toolbar>  
              <v-switch v-model="singleSelect" label="Selección única" class="pa-3" inset></v-switch>
            </template>
            
            <template v-slot:item.rooms="{item}" >
              <v-badge :content="item.rooms" :value="item.rooms" color="red" overlap>
              <v-icon >mdi-bed</v-icon>
             </v-badge>
            </template>

            <template v-slot:item.rates="{item}">
              <v-badge :content="item.rates" :value="item.rates" color="red" overlap>
              <v-icon >mdi-cash-multiple</v-icon>
              </v-badge>
            </template>

            <template v-slot:item.discounts="{item}">
              <v-badge :content="item.discounts" :value="item.discounts" color="red" overlap>
              <v-icon >mdi-label-percent</v-icon>
               </v-badge>
            </template>

            <template v-slot:item.extras="{item}">
              <v-badge :content="item.extras" :value="item.extras" color="red" overlap>
              <v-icon >mdi-tag-plus</v-icon>
               </v-badge>
            </template>
            
            <template v-slot:item.actions="{ item }">
              <v-row class="align-center">
                <router-link :to="{name: 'Hotel' , params: {id: item.id}}" style="text-decoration: none;">
                <v-icon  class="mr-2 mt-0 mb-0">mdi-pencil</v-icon>
              </router-link>
               <v-switch class="mt-1 mb-0" :input-value="item.enabled" value dense border="1px" @change="changeStatus(item,$event)"></v-switch>
              </v-row>
              
            </template>

            
          </v-data-table>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {

  data() {
    return {
      
      deleteDialog: false,
      selected: [],
      search: "",
      singleSelect: false,
      loading: false,
      columns: 3,
      headers: [
        {
          text: "Título",
          align: "start",
          sortable: true,
          value: "title"
        },
        { text: "Código de referencia", value: "reference_code" },
        { text: "Habitaciones", value: "rooms" },
        { text: "Tarifas", value: "rates" },
        { text: "Descuentos", value: "discounts" },
        { text: "Extras", value: "extras" },
        { text: "ID", value: "id" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      hotelIds: {
        hotelIds:[]
      },
    };
  },

  computed:{
    ...mapState({
      hotels: state => state.HotelModule.allhotels,
    }),
  },

  mounted(){
   this.$store.dispatch('getHotels')
  },

  methods: {
    editItem(item) {},

    deleteItem(item) {},

    showDeleteDialog () {
    this.deleteDialog = true  
    },
    
    deleteItem(){
        this.selected.forEach(element => {
        this.hotelIds.hotelIds.push(element.id)
    });
      this.$store.dispatch('deleteHotels',this.hotelIds).then(()=>{
      this.close();
    });
    },

    close () {
    this.hotelIds.hotelIds= []
    this.selected = []
    this.deleteDialog = false
    //this.$store.commit('setErrors',this.defaultErrors)
  },

  changeStatus(item, event){
    if(event){
       item.enabled = 1
    }else{
      item.enabled = 0
    }
 
   this.$store.dispatch('editHotel',item)
  },
    
  }
};
</script>
