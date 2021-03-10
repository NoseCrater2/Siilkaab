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
            <v-col cols="12" sm="12" md="8" lg="8" class="mt-lg-6 mt-md-6">
              <v-dialog
                ref="dialogRangePeriod"
                v-model="modalRangePeriod"
                :return-value.sync="rangePeriodTimeModel"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedRangePeriodText"
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    required
                    dense
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="rangePeriodTimeModel"
                  range
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modalRangePeriod = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogRangePeriod.save(rangePeriodTimeSaveState)"
                  >
                    Aceptar
                  </v-btn>
                </v-date-picker>
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
                  class="mr-3"
                  v-model="allCheckboxesSelected"
                  label="Todos"
                  @change="selectAllCheckboxes($event)"
                ></v-checkbox>
                <v-checkbox
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
                :arrayRangePeriod="rangePeriodTimeModel"
                :arrayDaysSelected="daysIds"
                :is="component.TagPeriodConfig"

              ></component>
            </div>
          </div>
        </v-card>
        <v-btn color="primary" large block @click="btnApplyCheckPriority()" :loading="loadingButton" :disabled="loadingButton">Aplicar</v-btn>
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

export default {
  data() {
    return {
      hotelSelected: null,
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
      rangePeriodTimeModel: [],
      loadingButton: false,

      copyArrayRates: [],

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
        this.addCompo(this.rooms[countWhile]);
        countWhile++;
      }
      this.isFilledArrayComponents = true;
    },
    addCompo(obj) {
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
      this.allCheckboxesSelected = false;
      this.mutationFlagCleanPeriodConfigTextfields(true);
      this.daysIds = [];
      this.setRatesReinitTable(this.copyArrayRates); //Reseteamos los rates de la tabla
      this.mutationReloadDates();
      this.mutationFlagCalendarModified(false);
    },
    btnApplyCheckPriority(){
      // this.loadingButton = true;
      // this.setSnackbar({stateSnackbar: false, messaggeSnackbar: "", colorSnackbar: ""});
      // this.setTimeoutSnackbar(3500);
      // this.putEditRates({arrayRates: this.rates, arrayIdRooms: this.arrayRoomIDs}).then(()=>{
      //   this.setSnackbar({stateSnackbar: true, messaggeSnackbar: "El registro se guardó con exito", colorSnackbar: "green darken-1"});
      //   this.loadingButton = false;
      // });
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
    rangePeriodTimeSaveState() {
      return this.rangePeriodTimeModel;
    },
    computedRangePeriodText(){
      return this.rangePeriodTimeModel.join(' - ')
    }
  },
};
</script>
