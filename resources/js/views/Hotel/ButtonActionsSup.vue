<template>
  <div>
    <v-banner single-line>
      <v-row class="d-flex align-center justify-end">
        <v-col cols="12" md="8" sm="8" xs="12" class="d-flex justify-start">
          <v-btn
            depressed
            small
            color="info"
            class="white--text mr-3"
            @click="saveChanges()"
          >
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar
          </v-btn>
          <v-btn depressed small color="grey" class="white--text mr-3" @click="saveChanges('saveAndClose')">
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar y
            cerrar
          </v-btn>
          <v-btn depressed small color="red" class="white--text mr-3" @click="close()">
            <v-icon left dark>mdi-close-circle</v-icon>Cerrar
          </v-btn>
        </v-col>

        <v-col cols="12" md="4" sm="4" xs="12" class="d-flex justify-end my-n8">
          <v-autocomplete
            :items="listItemHotels"
            item-text="title"
            item-value="id"
            v-model="computedTitleHotel"
            dense
            outlined
            prepend-inner-icon="mdi-domain"
            label="Hoteles"
            class="mt-7"
            background-color="white"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-banner>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import router from "../../routes";

export default {
  name: "ButtonActionsSup",
  created() {
    this.getHotels().then(() => {
      this.idHotel = this.$route.params.id;
      this.listItemHotels = this.hotels;
    });
  },
  data() {
    return {
      listItemHotels: null,
      idHotel: null,
    };
  },
  computed: {
    ...mapState({
      setReinicializedVar: (state) => state.HotelModule.setReinicializedVar,
      iditemsListOptions: (state) => state.HotelModule.iditemsListOptions,
      hotels: (state) => state.HotelModule.allhotels,
      hotel: (state) => state.HotelModule.hotel,
      chargeView: (state) => state.HotelModule.chargeView,
      configuration: (state) => state.HotelModule.configuration,
      contacts: (state) => state.HotelModule.contacts,
      conditions: (state) => state.HotelModule.conditions,
      regimes: (state) => state.HotelModule.regimes,
      aditionalInfo: (state) => state.HotelModule.aditionalInfo,
      restaurants: (state) => state.HotelModule.restaurants,
      schedules: (state) => state.HotelModule.schedules,
      snackbar: (state) => state.HotelModule.snackbar,
    }),
    computedTitleHotel: {
      get() {
        return this.idHotel;
      },
      set(idHotel) {
        this.idHotel = idHotel;
        router.push({ name: "Hotel", params: { id: this.idHotel } });
        //Setea todo a nul para antes de hacer el cambio de pestaña de hotel
        this.setReinicialized();
        this.setReinicializedErrorsStatus();
        //Ejecuta el metodo de carga del hotel
        this.chargeDataHotel();
        return this.idHotel;
      },
    },
  },
  methods: {
    ...mapActions([
      "getHotels",
      "getHotel",
      "getConfiguration",
      "getContacts",
      "getConditions",
      "getRegimes",
      "getRestaurants",
      "getSchedules",
      "getPools",
      "getAditionalInfo",
      "postEditHotel",
      "putEditConfiguration",
      "postEditConfiguration",
      "putEditContacts",
      "postEditContacts",
      "putEditConditions",
      "postEditConditions",
      "putEditRegimes",
      "putEditAditionalInfo",
      "postEditAditionalInfo",
      "putEditRestaurants",
      "putEditSchedules",
    ]),
    ...mapMutations(["setReinicialized", "setReinicializedErrorsStatus", "setSnackbar"]),
    close(){
      this.setReinicialized();
      this.setReinicializedErrorsStatus();
      router.replace({ path: '/hotels' });
    },
    saveChanges(close = "save") {
      if(close == "save"){
        this.executeSaveOnAPI();
      }
      if(close == "saveAndClose"){
        this.executeSaveOnAPI();
        this.setReinicialized();
        this.setReinicializedErrorsStatus();
        router.replace({ path: '/hotels' });
      }
    },
    chargeDataHotel() {
      if (this.$route.params.id) {
        this.setReinicialized(); //Reinicia el objeto hotel (esto es por que no hay una recarga de pag con router-link)
        this.getHotel(this.$route.params.id).then(() => {
          this.hotelTitle = this.hotel.title;
          if (this.hotel.idConfiguration !== null) {
            this.getConfiguration(this.hotel.idConfiguration).then(() => {});
          }
          if (this.hotel.idContact !== null) {
            this.getContacts(this.hotel.idContact).then(() => {});
          }
          if (this.hotel.idCondition !== null) {
            this.getConditions(this.hotel.idCondition).then(() => {});
          }
          if (this.hotel.idRegime !== null) {
            this.getRegimes(this.hotel.idRegime).then(() => {});
          }
          if (this.hotel.idAmenity !== null) {
            this.getAditionalInfo(this.hotel.idAmenity).then(() => {});
            this.getPools(this.hotel.id).then(() => {});
            this.getRestaurants(this.hotel.id).then(() => {});
            this.getSchedules(this.hotel.id).then(() => {});
          }
        });
      }
    },
    //Metodo que se llama desde los metodos de los botones para guardar los datos en la bd
    executeSaveOnAPI(){
        //DESCOMENTAR ESTE CODIGOOOOOOOOOOOOOOOOO
        //CODIGO PARA GUARDAR INFORMACION DEL HOTEL INICIA
        //La edicion de info de hotel es la unica que se maneja de las dos formas con POST
        if(this.hotel.title != null){
            //metodo post
            if(this.hotel.id == null){
              this.postEditHotel(this.hotel).then(()=>{
                console.log("this.hotel.id", this.hotel);
                //Se ejecuta el metodo que llama a los demas metodos de API que dependen del resultado de hotel.id
                this.executeSaveOnAPIAfterHotel(this.hotel.id).then(()=>{
                  this.$router.replace({ name: "Hotel", params: { id: this.hotel.id } });
                  this.setSnackbar(true);
                }); 
              });
            }
            else if(this.hotel.id != null){
              this.postEditHotel(this.hotel);
              //Se ejecuta el metodo que llama a los demas metodos de API que dependen del resultado de hotel.id
              this.executeSaveOnAPIAfterHotel(this.idHotel).then(()=>{
                this.setSnackbar(true);
              }); 
            }
        }
        //CODIGO PARA GUARDAR INFORMACION DEL HOTEL TERMINA
    },
    //Debido a que debe de existir un hotel para guardar la demas informacion
    //Este metodo se ejecutara despues de la llamada then del metodo 'this.postEditHotel'
    //Este metodo cotiene los demas metodos que se ejecutaran y que dependen del hotel
    //Ademas es un metodo asincrono ya que se deben de ejecutar ciertas acciones cuando finalizan todas las peticiones
    executeSaveOnAPIAfterHotel: async function(idHotel){
        //CODIGO PARA GUARDAR CONFIGURACIONES INICIA
        if(this.configuration.timezone != null){
          if(this.configuration.hotel_id == null){
            //metodo post
            this.configuration.hotel_id = idHotel;
            console.log("BTN", this.configuration);
            this.postEditConfiguration(this.configuration);
          }
          else{
            //metodo put
            this.putEditConfiguration(this.configuration);
          }
        }
        //CODIGO PARA GUARDAR CONFIGURACIONES TERMINA
        //CODIGO PARA GUARDAR CONTACTOS INICIA
        if(this.contacts.address != null){
          if(this.contacts.hotel_id == null){
            //metodo post
            this.contacts.hotel_id = idHotel;
            console.log("BTN", this.contacts);
            this.postEditContacts(this.contacts);
          }
          else{
            //metodo put
            this.putEditContacts(this.contacts);
          }
        }
        //CODIGO PARA GUARDAR CONTACTOS TERMINA
        //CODIGO PARA GUARDAR CONDICIONES INICIA
        if(this.conditions.adults != null){
          if(this.conditions.hotel_id == null){
            //metodo post
            this.conditions.hotel_id = idHotel;
            console.log("BTN", this.conditions);
            this.postEditConditions(this.conditions);
          }
          else{
            //metodo put
            this.putEditConditions(this.conditions);
          }
        }
        //CODIGO PARA GUARDAR CONDICIONES TERMINA
        //CODIGO PARA GUARDAR REGIMENES INICIA
        console.log("this.hotel.idRegime", this.regimes)
        if(typeof(this.regimes[0]) !='undefined'){
          this.putEditRegimes({
            newRegimes: this.regimes,
            currentHotelId: idHotel,
            currentRegimes: this.hotel.idRegime,
          });
        }
        //CODIGO PARA GUARDAR REGIMENES TERMINA
        //CODIGO PARA GUARDAR INFORMACION ADICIONAL INICIA
        if(this.aditionalInfo.spa != null){
          if(this.aditionalInfo.hotel_id == null){
            //metodo post
            this.aditionalInfo.hotel_id = idHotel;
            console.log("BTN", this.aditionalInfo);
            this.postEditAditionalInfo(this.aditionalInfo);
          }
          else{
            //metodo put
            this.putEditAditionalInfo(this.aditionalInfo);
          }
        }
        //CODIGO PARA GUARDAR INFORMACION ADICIONAL TERMINA
        // this.putEditRestaurants(this.restaurants).then(() => {
        //   this.putEditSchedules(this.schedules);
        // });
    },
  },
  props: {
    title: String,
  },
};
</script>