<template>
  <div style="z-index: 7; background-color: white; position: sticky; top: 64px">
    <v-banner :sticky="true" single-line>
      <v-row class="d-flex align-center justify-end">
        <v-col cols="12" md="8" sm="8" xs="12" class="d-flex justify-start">
          <v-btn
            :loading="isLoadingSavingChangesSave"
            :disabled="(isLoadingSavingChangesSave || isLoadingSavingChangesSaveAndClose) == true ? true : false"
            depressed
            small
            color="info"
            class="white--text mr-3"
            @click="loader = 'isLoadingSavingChangesSave'; saveChanges();"
          >
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar
            <template v-slot:loader>
              <v-icon left size="22" class="custom-loader" light>mdi-cached</v-icon>Guardar
            </template>
          </v-btn>
          <v-btn
            :loading="isLoadingSavingChangesSaveAndClose"
            :disabled="(isLoadingSavingChangesSaveAndClose || isLoadingSavingChangesSave) == true ? true : false"
            depressed
            small
            color="grey"
            class="white--text mr-3"
            @click="loader = 'isLoadingSavingChangesSaveAndClose'; saveChanges('saveAndClose')"
          >
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar y cerrar
            <template v-slot:loader>
              <v-icon left size="22" class="custom-loader" light>mdi-cached</v-icon>Guardar y cerrar
            </template>
          </v-btn>
          <v-btn :disabled="(isLoadingSavingChangesSave || isLoadingSavingChangesSaveAndClose) == true ? true : false" depressed small color="red" class="white--text mr-3" @click="close()">
            <v-icon left dark>mdi-close-circle</v-icon>Cerrar
          </v-btn>
        </v-col>

        <v-col cols="12" md="4" sm="4" xs="12" class="d-flex justify-end my-n8">
          <v-autocomplete
            :items.sync="hotels"
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
    this.idHotel = parseInt(this.$route.params.id);
    this.listItemHotels = this.hotels;
  },
  data() {
    return {
      listItemHotels: null,
      idHotel: null,

      isLoadingSavingChangesSave: false,
      isLoadingSavingChangesSaveAndClose: false,
      loader: null,
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
      pools: (state) => state.HotelModule.pools,
      snackbar: (state) => state.HotelModule.snackbar,

      statusInformation: (state) => state.HotelModule.statusInformation,
      statusConfiguration: (state) => state.HotelModule.statusConfiguration,
      statusContacts: (state) => state.HotelModule.statusContacts,
      statusConditions: (state) => state.HotelModule.statusConditions,
      statusRegimes: (state) => state.HotelModule.statusRegimes,
      statusAditionalInfo: (state) => state.HotelModule.statusAditionalInfo,
      statusRestaurants: (state) => state.HotelModule.statusRestaurants,
      statusSchedules: (state) => state.HotelModule.statusSchedules,
      statusPools: (state) => state.HotelModule.statusPools
    }),
    computedTitleHotel: {
      get() {
        return this.idHotel;
      },
      set(idHotel) {
        this.idHotel = parseInt(idHotel);
        router.replace({ name: "Hotel", params: { id: this.idHotel } });
        //Setea todo a null para antes de hacer el cambio de pestaña de hotel
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
      "putEditPools"
    ]),
    ...mapMutations(["setReinicialized", "setReinicializedErrorsStatus", "setSnackbar", "setTimeoutSnackbar", "setChargeView", "setProgressbarNavbarStateHotel"]),
    close(){
      this.setReinicialized();
      this.setReinicializedErrorsStatus();
      router.replace({ path: '/hotels' });
    },
    saveChanges(close = "save") {
      this.setReinicializedErrorsStatus();
      this.setSnackbar({stateSnackbar: false, messaggeSnackbar: "", colorSnackbar: ""});
      this.setTimeoutSnackbar(3500);
      if(close == "save"){
        this.isLoadingSavingChangesSave = true;
        this.executeSaveOnAPI("save");
      }
      else if(close == "saveAndClose"){
        this.isLoadingSavingChangesSaveAndClose = true;
        this.executeSaveOnAPI("saveAndClose");
      }
    },
    chargeDataHotel() {
      if (this.$route.params.id) {
        this.setReinicialized(); //Reinicia el objeto hotel (esto es por que no hay una recarga de pag con router-link)
        this.getHotel(this.$route.params.id).then(async() => {
            this.hotelTitle = this.hotel.title;
            let promiseConfiguration = 1;
            let promiseContact = 1;
            let promiseCondition = 1;
            let promiseRegime = 1;
            let promiseAditionalInfo = 1;
            let promiseRestaurants = 1;
            let promiseSchedules = 1;
            let promisePools = 1;
            if (this.hotel.idConfiguration !== null) {
                promiseConfiguration = this.getConfiguration(this.hotel.idConfiguration);
            }
            if (this.hotel.idContact !== null) {
                promiseContact = this.getContacts(this.hotel.idContact);
            }
            if (this.hotel.idCondition !== null) {
                promiseCondition = this.getConditions(this.hotel.idCondition);
            }
            if (this.hotel.idRegime !== null) {
                promiseRegime = this.getRegimes(this.hotel.idRegime);
            }
            if (this.hotel.idAmenity !== null) {
                promiseAditionalInfo = this.getAditionalInfo(this.hotel.idAmenity);
                promiseRestaurants = this.getRestaurants(this.hotel.id);
                promiseSchedules = this.getSchedules(this.hotel.id);
                promisePools = this.getPools(this.hotel.id);
            }
            await Promise.all([promiseConfiguration, promiseContact, promiseCondition, promiseRegime, promiseAditionalInfo, promiseRestaurants, promiseSchedules, promisePools]).then(values => {
                this.setChargeView(true);
            });
        });
      }
    },
    //Metodo que se llama desde los metodos de los botones para guardar los datos en la bd
    executeSaveOnAPI(close = "save"){
        //DESCOMENTAR ESTE CODIGOOOOOOOOOOOOOOOOO
        //CODIGO PARA GUARDAR INFORMACION DEL HOTEL INICIA
        //La edicion de info de hotel es la unica que se maneja de las dos formas con POST
            //metodo post
            if(this.hotel.id == null){
              this.postEditHotel(this.hotel).then(()=>{
                  if(typeof(this.hotel.id) != 'undefined'){
                    router.replace({ name: "Hotel", params: { id: parseInt(this.hotel.id) } });
                  }
                this.idHotel = parseInt(this.hotel.id);
                //Se ejecuta el metodo que llama a los demas metodos de API que dependen del resultado de hotel.id
                this.executeSaveOnAPIAfterHotel(this.hotel.id).then(()=>{
                  // this.$router.replace({ name: "Hotel", params: { id: this.hotel.id } });
                  //Se llama al metodo que detecta los errores
                  let returnedErrorObj = this.verifyErrorsEndpoints();
                  this.loader = null;
                  this.isLoadingSavingChangesSave = false;
                  this.isLoadingSavingChangesSaveAndClose = false;

                    // Se setea la variable de estado del hotel que controla la progreess bar del navbar siilkaab
                    this.setProgressbarNavbarStateHotel(0);
                  this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                  if(close == "saveAndClose"){
                    this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                    if(returnedErrorObj.color == "green darken-1"){
                      this.setReinicialized();
                      this.setReinicializedErrorsStatus();
                      this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                      router.replace({ path: '/hotels' });
                    }
                  }
                });
              });
            }
            else if(this.hotel.id != null){
              this.postEditHotel(this.hotel).then(()=>{
                //Se ejecuta el método que llama a los demas metodos de API que dependen del resultado de hotel.id
                this.executeSaveOnAPIAfterHotel(this.idHotel).then(()=>{
                    //Se llama al metodo que detecta los errores
                  let returnedErrorObj = this.verifyErrorsEndpoints();
                  this.loader = null;
                  this.isLoadingSavingChangesSave = false;
                  this.isLoadingSavingChangesSaveAndClose = false;

                    // Se setea la variable de estado del hotel que controla la progreess bar del navbar siilkaab
                    this.setProgressbarNavbarStateHotel(0);

                  this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                  if(close == "saveAndClose"){
                    this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                    if(returnedErrorObj.color == "green darken-1"){
                      this.setReinicialized();
                      this.setReinicializedErrorsStatus();
                      this.setSnackbar({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                      router.replace({ path: '/hotels' });
                    }
                  }
                });
              });
            }
        //CODIGO PARA GUARDAR INFORMACION DEL HOTEL TERMINA
    },
    //Debido a que debe de existir un hotel para guardar la demas informacion
    //Este metodo se ejecutara despues de la llamada then del metodo 'this.postEditHotel'
    //Este metodo cotiene los demas metodos que se ejecutaran y que dependen del hotel
    //Ademas es un metodo asincrono ya que se deben de ejecutar ciertas acciones cuando finalizan todas las peticiones
    executeSaveOnAPIAfterHotel: async function(idHotel){
        let progress = 0;
        //CODIGO PARA GUARDAR CONFIGURACIONES INICIA
        if(this.configuration.timezone != null){
          if(this.hotel.idConfiguration == null){
            //metodo post
            this.configuration.hotel_id = idHotel;
            await this.postEditConfiguration(this.configuration).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }
          else if(this.hotel.idConfiguration != null){
            //metodo put
            await this.putEditConfiguration(this.configuration).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }
        }
        //CODIGO PARA GUARDAR CONFIGURACIONES TERMINA
        //CODIGO PARA GUARDAR CONTACTOS INICIA

          if(this.hotel.idContact == null){
            //metodo post
            console.log("IDHOTEL", idHotel, this.$route.params.id)
            this.contacts.hotel_id = idHotel;
            await this.postEditContacts(this.contacts).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }
          else if(this.hotel.idContact != null){
            //metodo put
            await this.putEditContacts(this.contacts).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }

        //CODIGO PARA GUARDAR CONTACTOS TERMINA
        //CODIGO PARA GUARDAR CONDICIONES INICIA
        if(this.conditions.adults != null){
          if(this.hotel.idCondition == null){
            //metodo post
            this.conditions.hotel_id = idHotel;
            await this.postEditConditions(this.conditions).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }
          else if(this.hotel.idCondition != null){
            //metodo put
            await this.putEditConditions(this.conditions).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
          }
        }
        //CODIGO PARA GUARDAR CONDICIONES TERMINA
        //CODIGO PARA GUARDAR REGIMENES INICIA
        if(typeof(this.regimes[0]) !='undefined'){
          await this.putEditRegimes({
            newRegimes: this.regimes,
            currentHotelId: idHotel,
            currentRegimes: this.hotel.idRegime,
          }).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
        }
        //CODIGO PARA GUARDAR REGIMENES TERMINA
        //CODIGO PARA GUARDAR INFORMACION ADICIONAL INICIA
        if(this.aditionalInfo.hotel_id == null){
          //metodo post
          this.aditionalInfo.hotel_id = idHotel;
          await this.postEditAditionalInfo(this.aditionalInfo).then(()=>{
              progress++
              this.setProgressbarNavbarStateHotel((progress * 100) / 8)
          }).catch(()=>{
              progress++
              this.setProgressbarNavbarStateHotel((progress * 100) / 8)
          });
        }
        else if(this.aditionalInfo.hotel_id != null){
          //metodo put
          await this.putEditAditionalInfo(this.aditionalInfo).then(()=>{
              progress++
              this.setProgressbarNavbarStateHotel((progress * 100) / 8)
          }).catch(()=>{
              progress++
              this.setProgressbarNavbarStateHotel((progress * 100) / 8)
          });
        }
        //CODIGO PARA GUARDAR INFORMACION ADICIONAL TERMINA
        //CODIGO PARA GUARDAR RESTAURANTES Y HORARIOS INICIA
        await this.putEditRestaurants(this.restaurants).then(async ()=>{
            progress++
            this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            await this.putEditSchedules(this.schedules).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
        }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
        //CODIGO PARA GUARDAR RESTAURANTES Y HORARIOS TERMINA
        //CODIGO PARA GUARDAR PISCINAS INICIA
        await this.putEditPools(this.pools).then(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            }).catch(()=>{
                progress++
                this.setProgressbarNavbarStateHotel((progress * 100) / 8)
            });
        //CODIGO PARA GUARDAR PISCINAS TERMINA
    },
    //Metodo que verifica si existen errores al momento de guardar en los endpoints
    verifyErrorsEndpoints(){
      let obj = {};
      if(this.statusInformation == 422 || this.statusConfiguration == 422 || this.statusContacts == 422 || this.statusConditions == 422 || this.statusRegimes == 422 || this.statusAditionalInfo == 422 || this.statusRestaurants == 422 || this.statusSchedules == 422 || this.statusPools == 422){
        obj.messagge = "Ocurrió un error al guardar. Verifique e intente de nuevo";
        obj.color = "red darken-1";
      }
      else{
        obj.messagge = "La información se guardó con exito";
        obj.color = "green darken-1";
      }
      return obj;
    }
  },
  props: {
    title: String,
  },
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
