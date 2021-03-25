<template>
  <div>
    <div id="app">
      <v-app id="inspire">
        <!--Usamos componente ButtonActionsSup.vue-->
        <ButtonActionsSup :title="hotelTitle"></ButtonActionsSup>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" md="3" sm="12" xs="12">
              <!--Usamos componente LateralMenu-->
              <LateralMenu></LateralMenu>
            </v-col>
            <v-col cols="12" sm="auto" md="9">
              <div class="ml-8">
                <v-text-field
                  style="text-align: right"
                  color="primary"
                  loading
                  disabled
                  label="Obteniendo información..."
                  v-if="chargeView === false"
                ></v-text-field>
              </div>
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
              // this.getPools(this.hotel.id).then(() => {});
              this.getRestaurants(this.hotel.id).then(() => {
                this.getSchedules(this.hotel.id).then(() => {});
              });
            }
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
