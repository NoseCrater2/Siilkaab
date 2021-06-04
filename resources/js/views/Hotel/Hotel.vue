<template>
  <div>
    <div id="app">
      <v-app id="inspire">
        <!--Usamos componente ButtonActionsSup.vue-->
        <ButtonActionsSup :title="hotelTitle"></ButtonActionsSup>
        <v-overlay :value="!chargeView" opacity="0.7" z-index="7">
            <div>
                <div>
                    <v-progress-circular
                        class="ml-14 mb-2"
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </div>
                <div>Cargando información...</div>
            </div>
        </v-overlay>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
              <!--Usamos componente LateralMenu-->
              <LateralMenu></LateralMenu>
            </v-col>
            <v-col cols="12" xl="9" lg="9" md="9" sm="12" xs="12">
              <div v-if="iditemsListOptions === 0 && chargeView === true">
                <div v-if="hotel !== null">
                  <Information></Information>
                </div>
              </div>

              <div v-if="iditemsListOptions === 1 && chargeView === true">
                <div v-if="hotel !== null">
                  <Configuration></Configuration>
                </div>
              </div>

              <div v-if="iditemsListOptions === 2 && chargeView === true">
                <div v-if="hotel !== null">
                  <Contact></Contact>
                </div>
              </div>

              <div v-if="iditemsListOptions === 3 && chargeView === true">
                <div v-if="hotel !== null">
                  <Condition></Condition>
                </div>
              </div>

              <div v-if="iditemsListOptions === 4 && chargeView === true">
                <div v-if="hotel !== null">
                  <Regime></Regime>
                </div>
              </div>
              <div v-if="iditemsListOptions === 5 && chargeView === true">
                <div v-if="hotel !== null">
                  <AditionalInfo></AditionalInfo>
                </div>
              </div>
              <div v-if="iditemsListOptions > 5 && chargeView === true">
                <div v-if="hotel !== null">
                   <Information></Information>
                </div>
              </div>

            </v-col>
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
          </v-row>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import ButtonActionsSup from "../../views/Hotel/ButtonActionsSup";
import LateralMenu from "../../views/Hotel/LateralMenu";
import Information from "../../views/Hotel/Information";
import Configuration from "../../views/Hotel/Configuration";
import Contact from "../../views/Hotel/Contact";
import Condition from "../../views/Hotel/Condition";
import Regime from "../../views/Hotel/Regime";
import AditionalInfo from "../../views/Hotel/AditionalInfo";

export default {
  created() {
    //Ejecuta el metodo de carga del hotel
    this.chargeDataHotel();
  },
  data() {
    return {
      hotelTitle: "",
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      chargeView: (state) => state.HotelModule.chargeView,
      setReinicializedVar: (state) => state.HotelModule.setReinicializedVar,
      iditemsListOptions: (state) => state.HotelModule.iditemsListOptions,
      snackbar: (state) => state.HotelModule.snackbar,
      timeoutSnackbar: (state) => state.HotelModule.timeoutSnackbar,
      schedules: (state) => state.HotelModule.schedules
    }),
  },
  methods: {
    ...mapActions([
      "getHotel",
      "getConfiguration",
      "getContacts",
      "getConditions",
      "getRegimes",
      "getRestaurants",
      "getSchedules",
      "getPools",
      "getAditionalInfo",
    ]),
    ...mapMutations(["setReinicialized", "setChargeView", "setSnackbar"]),
    chargeDataHotel() {
        this.setReinicialized(); //Reinicia el objeto hotel (esto es por que no hay una recarga de pag con router-link)
        if(typeof(this.id)!='undefined'){
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
        else {
          //Se manda llamar la mutacion para cambiar el estado de la varibale 'chargeView"
          //Debido a que es un nuevo registro de hotel y no hay datos previos que cargar
          this.setChargeView(true);
        }
    },
  },
  components: {
    ButtonActionsSup,
    LateralMenu,
    Information,
    Configuration,
    Contact,
    Condition,
    Regime,
    AditionalInfo,
  },
  props: ['id']
};
</script>
