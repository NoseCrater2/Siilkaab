<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
        <div class="d-flex justify-center mb-2">
          <span class="text-h4 text-uppercase font-weight-bold"
            >Disponibilidad y tarifas</span>
        </div>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-autocomplete
            v-model="hotelSelected"
            :items="hotels"
            item-text="title"
            item-value="hotel_id"
            outlined
            label="Seleccione Hotel"
            @change="searchRoom(hotelSelected)"
          ></v-autocomplete>

          <div v-if="arrayRoomIDs.length > 0 && loadingRooms == false">
            <CalendarFee></CalendarFee>
            <div v-if="flagCalendarModified" class="d-flex align-center primary--text">
              <v-icon color="primary" size="25" class="mr-1">mdi-information</v-icon>
              <div class="mt-1">
                <span class="caption">Para guardar los cambios realizados, es necesario utilizar el botón <span class="overline font-weight-bold">aplicar</span></span>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-1">
                <v-btn @click="btnResetTable()" outlined rounded small color="primary">REINICIAR TABLA</v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-form v-if="arrayRoomIDs.length > 0 && loadingRooms == false">
        <v-card class="pa-4" outlined tile>
          <div class="d-flex justify-center mb-n3">
            <span class="text-h4 text-uppercase font-weight-bold">Actualizar Periodo</span>
          </div>
          <v-row class="mb-n10" align="center">
            <v-col cols="12" sm="12" md="4" lg="4">
              <span class="text-center font-weight-bold overline">Periodo</span>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8" class="d-flex mt-lg-6 mt-md-6">
              <v-slide-x-reverse-transition
                mode="out-in"
              >
                <v-icon
                class="mt-n6 mr-2 ml-1"
                  :key="`icon-${flagIsEditingRange}`"
                  :color="flagIsEditingRange ? 'success' : 'info'"
                  @click="flagIsEditingRange = !flagIsEditingRange"
                  v-text="flagIsEditingRange ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                ></v-icon>
              </v-slide-x-reverse-transition>
              <v-dialog
                ref="dialogRangePeriod"
                @input="setClicks"
                v-model="modalRangePeriod"
                :return-value.sync="computedRangePeriodTime"
                persistent
                width="42%"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedRangePeriodText"
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    required
                    :disabled="!flagIsEditingRange"
                    dense
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="computedRangePeriodTime"
                  :min="currentDate"
                  :color="setColorCalendarDialog()"
                  @change="dateRestricted"
                  header-color="primary"
                  :title-date-format="titleDateFormat"
                  @dblclick:date="fnDblClickDate"
                  @click:date="fnClickDate"
                  :range="flagRangeDate"
                  landscape
                  scrollable
                >
                <div class="mt-n3">
                  <span class="caption blue--text">* Para seleccionar una sola fecha, seleccionar cualquier fecha con un clic</span><br>
                  <span class="caption red--text">* Para seleccionar rango de fecha, doble clic a fecha de inicio y un clic a fecha final</span>
                </div>
                </v-date-picker>
                 <div class="d-flex mt-n1 py-1 justify-end white">
                    <v-btn
                      text
                      color="primary"
                      @click="modalRangePeriod = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      text
                      :disabled="fnBtnAceptar()"
                      color="primary"
                      @click="$refs.dialogRangePeriod.save(computedRangePeriodTime)"
                    >
                      Aceptar
                    </v-btn>
                 </div>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="12" md="4" lg="4" class="mb-sm-n5 mb-xs-n5">
              <span class="text-center font-weight-bold overline">Dias</span>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8">
              <v-row justify="start" class="ml-1">
                <v-checkbox
                  :disabled="flagIsEditingRange"
                  class="mr-3"
                  v-model="allCheckboxesSelected"
                  label="Todos"
                  @change="selectAllCheckboxes($event)"
                ></v-checkbox>
                <v-checkbox
                :disabled="flagIsEditingRange"
                v-for="(day, index) in arrayDays"
                :key="index"
                  class="mr-3"
                  v-model="daysIds"
                  :label="day.day"
                  :value="day.id"
                  @change="selectBtnCheckbox($event)"
                ></v-checkbox>
              </v-row>
            </v-col>
          </v-row>
          <div v-if="(rooms.length > 0 && isFilledArrayComponents == false) ? fillArrayComponents() : ' '">
            <div v-if="(computedArrayComponents.length > 0 && isFilledArrayComponents == true)">
              <component
                v-for="(component, index) in computedArrayComponents"
                :key="component.idCompo"
                :idCompo="component.idCompo"
                :indexCompo="index"
                :arrayRangePeriod="sendArrayRangePeriod"
                :arrayDaysSelected="daysIds"
                :is="component.TagPeriodConfig"
                :flagIsEditingRange="flagIsEditingRange"
              ></component>
            </div>
          </div>
        </v-card>

        <v-row justify="center">
          <v-dialog
            v-model="dialogAceptCancelSaving"
            persistent
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" large block :loading="loadingButton" :disabled="(flagCalendarModified == true && loadingButton == false) ? false : true">Aplicar</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                ¿Guardar cambios?
              </v-card-title>
              <v-card-text>Al aceptar, las tarifas configuradas seran guardadas.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="dialogAceptCancelSaving = false"
                >
                  CANCELAR
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="btnApplyCheckPriority()"
                >
                  ACEPTAR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-spacer></v-spacer>
      </v-form>
    </v-container>
    <v-snackbar
      :value="snackbar.stateSnackbar"
      right
      :color="snackbar.colorSnackbar"
      rounded="pill"
      :timeout="timeoutSnackbar"
      bottom
    >
      <v-icon
        color="white"
      >
        mdi-content-save
      </v-icon>
      <span class="font-weight-bold">{{snackbar.messaggeSnackbar}}</span>
    </v-snackbar>
  </div>
</template>


<script >
import { mapActions, mapMutations, mapState } from "vuex";
import CalendarFee from "../../components/CalendarFee/CalendarFee";
import PeriodConfig from "../../components/Disponibility/PeriodConfig"

import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment); //Extendemos moment.js con los rangos
moment.locale("es"); //Cambiamos el lenguaje de moment

export default {
  data() {
    return {
      hotelSelected: null,
      dialogAceptCancelSaving: false,
      loadingRooms: false,
      arrayDays: [ 
            { "id": "monday", "day": "Lunes" }, 
            { "id": "tuesday", "day": "Martes" }, 
            { "id": "wednesday", "day": "Miércoles" }, 
            { "id": "thursday", "day": "Jueves" }, 
            { "id": "friday", "day": "Viernes" },
            { "id": "saturday", "day": "Sábado" },
            { "id": "sunday", "day": "Domingo" }
      ],
      allCheckboxesSelected: false,
      daysIds: [],

      arrayRoomIDs: [],

      arrayComponents: [],
      countIdCompo: -1,
      isFilledArrayComponents: false,

      modalRangePeriod: false,
      rangePeriodTimeModel: "",
      sendArrayRangePeriod: "",
      flagIsEditingRange: false,
      loadingButton: false,


      copyArrayRates: [],
      flagRangeDate: false,
      countClicks: 0,

      currentDate: moment().format("YYYY-MM-DD")//Esta variable se encarga de fijar la seleccion del calendario desde el dia actual
    };
  },

  mounted() {
    this.getHotelsForAdmin();
  },

  methods: {
    ...mapActions(["getHotelsForAdmin", "getRoomsForAdmin", "getRates", "putEditRates"]),
    ...mapMutations(["resetArrayItemsCalendar", "setSnackbar", "setTimeoutSnackbar", "mutationFlagCalendarModified", "setRatesReinitTable", "mutationReloadDates", "mutationFlagCleanPeriodConfigTextfields"]),
    searchRoom(idHotel) {
      //"resetArrayItemsCalendar" es una mutacion que permite reiniciar el arreglo de dates, usado en Calendar.vue
      this.resetArrayItemsCalendar();
      this.mutationFlagCalendarModified(false); //Se setea la variable vuex que es la flag de rates en calendario
      this.mutationFlagCleanPeriodConfigTextfields(false); //Se setea la variable vuex que es la flag que controla la limpieza de textfields en PeriodConfig.vue
      this.loadingRooms = true;
      this.isFilledArrayComponents = false;
      this.getRoomsForAdmin(idHotel).then(() => {
        this.arrayRoomIDs = this.rooms.map((el) => {
          return el.id;
        });
        this.getRates(this.arrayRoomIDs).then(() => {
          //Se hace una copia ruda con JSON, debido a que se mezclaban referencias en memoria
          this.copyArrayRates = JSON.parse(JSON.stringify(this.rates));
          this.loadingRooms = false;
        });
      });
    },
    fillArrayComponents(){
      this.arrayComponents = [];
      let countWhile = 0;
      while (countWhile < this.rooms.length) {
        this.addCompo();
        countWhile++;
      }
      this.isFilledArrayComponents = true;
    },
    addCompo() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagPeriodConfig: PeriodConfig,
      });
    },
    selectAllCheckboxes(event) {
      this.daysIds = [];
      if (this.allCheckboxesSelected) {
        for (let day in this.arrayDays) {
          this.daysIds.push(this.arrayDays[day].id.toString());
        }
      }
    },
    selectBtnCheckbox(event) {
      if(event.length == 7){
        this.allCheckboxesSelected = true;
      }
      else{
        this.allCheckboxesSelected = false;
      }
    },
    btnResetTable(){
      this.dialogAceptCancelSaving = false
      this.allCheckboxesSelected = false;
      this.mutationFlagCleanPeriodConfigTextfields(true);
      this.daysIds = [];
      this.rangePeriodTimeModel = "";
      this.sendArrayRangePeriod = this.rangePeriodTimeModel;
      this.countClicks = 0;
      this.modalRangePeriod = false;
      this.flagRangeDate = false;
      this.flagIsEditingRange = false;
      this.setRatesReinitTable(this.copyArrayRates); //Reseteamos los rates de la tabla
      this.mutationReloadDates();
      this.mutationFlagCalendarModified(false);
    },
    setColorCalendarDialog(){
      if(this.flagRangeDate == true){
        return "red darken-1"
      }
      else if(this.flagRangeDate == false){
        return "blue lighten-2"
      }
      
    },
    titleDateFormat(){
      if(typeof(this.rangePeriodTimeModel) == 'object'){
        if(this.rangePeriodTimeModel.length == 0){
          return "-"
        }
        else{
          if(this.rangePeriodTimeModel.length >= 2){
            let day1 = moment(this.rangePeriodTimeModel[0]);
            let day2 = moment(this.rangePeriodTimeModel[1]);
            return `Desde el ${day1.format("ddd DD MMMM")}<br>hasta el ${day2.format("ddd DD MMMM")}`
          }
          else{
            let day = moment(this.rangePeriodTimeModel[0]);
            return day.format("ddd DD MMMM");
          }
        }
      }
      else if(typeof(this.rangePeriodTimeModel) == 'string'){
        if(this.rangePeriodTimeModel.length == ""){
          return "-"
        }
        else{
          let day = moment(this.rangePeriodTimeModel);
          return day.format("ddd DD MMMM");
        }
      }

    },
    fnDblClickDate(){
      if(typeof(this.rangePeriodTimeModel) == 'string'){
        this.countClicks = 0;
        this.flagRangeDate = true;
        this.rangePeriodTimeModel = new Array(this.rangePeriodTimeModel)
      }
    },
    fnClickDate(){
      if(typeof(this.rangePeriodTimeModel) == 'object'){
        if(this.countClicks == 1){
          this.countClicks = 0;
          this.flagRangeDate = false;
          this.rangePeriodTimeModel = this.rangePeriodTimeModel[0];
        }
        else{
          if(this.rangePeriodTimeModel.length == 2){
            this.countClicks++;
          }
        }
      }
    },
    //@change="dateRestricted" si se deja sin los parentesis, el metodo recibe el vmodel de "this.rangePeriodTimeModel"
    //Este metodo valida que si se introducen rangos, la segunda fecha sea mayor a la primera fecha
    dateRestricted(dateDatePicker){
      if(dateDatePicker.length == 2){
        if(moment(dateDatePicker[1]).isSameOrBefore(moment(dateDatePicker[0]))){
          this.rangePeriodTimeModel.pop(); //pop elimina el ultimo elemento del arreglo
        }
      }
    },
    // //Metodo que setea el "this.countClicks" al momento que se abre el cuadro de dialogo
    setClicks(event){
      if(event == true){
        if(typeof(this.rangePeriodTimeModel) == 'object'){
          if(this.rangePeriodTimeModel.length == 2){
            this.countClicks = 1;
          }
        }
      }
      else if(event == false){
        if(this.rangePeriodTimeModel != "" || this.rangePeriodTimeModel.length > 0){
          this.sendArrayRangePeriod = this.rangePeriodTimeModel;
        }
      }
    },
    //Funcion que activa o desactiva el boton "Aceptar" del cuadro de dialogo del calendario
    fnBtnAceptar(){
      if(typeof(this.rangePeriodTimeModel) == 'object'){
        if(this.rangePeriodTimeModel.length == 2){
          return false;
        }
        else{
          return true;
        }
      }
      else if(typeof(this.rangePeriodTimeModel) == 'string'){
        return false;
      }
    },
    btnApplyCheckPriority(){
      this.dialogAceptCancelSaving = false
      this.loadingButton = true;
      this.setSnackbar({stateSnackbar: false, messaggeSnackbar: "", colorSnackbar: ""});
      this.setTimeoutSnackbar(3500);
      this.putEditRates({arrayRates: this.rates, arrayIdRooms: this.arrayRoomIDs}).then(()=>{
        this.setSnackbar({stateSnackbar: true, messaggeSnackbar: "El registro se guardó con exito", colorSnackbar: "green darken-1"});
        this.loadingButton = false;
        //this.copyArrayRates MODIFICAAAAAAAAAAAAARRRR
        this.btnResetTable();
      });
      console.log(this.rates)
    }
  },

  components: {
    CalendarFee,
    PeriodConfig
  },

  computed: {
    ...mapState({
      hotels: (state) => state.disponibilityMoule.ahotels,
      rooms: (state) => state.disponibilityMoule.arooms,
      rates: (state) => state.disponibilityMoule.rates,
      snackbar: (state) => state.disponibilityMoule.snackbar,
      timeoutSnackbar: (state) => state.disponibilityMoule.timeoutSnackbar,
      flagCalendarModified: (state) => state.disponibilityMoule.flagCalendarModified,
    }),
    computedArrayComponents() {
      return this.arrayComponents;
    },
    computedRangePeriodText(){
      if(typeof(this.rangePeriodTimeModel) == 'object'){
        this.flagRangeDate = true
        return this.rangePeriodTimeModel.join(' - ')
      }
      else if(typeof(this.rangePeriodTimeModel) == 'string'){
        this.flagRangeDate = false
        return this.rangePeriodTimeModel
      }
    },
    computedRangePeriodTime:{
      get(){
        if(this.flagRangeDate == false){
          return this.rangePeriodTimeModel.toString()
        }
        else if(this.flagRangeDate == true){
          return this.rangePeriodTimeModel
        }
      },
      set(model){
        this.rangePeriodTimeModel = model;
        return this.rangePeriodTimeModel;
      }
    }
  },
};
</script>
