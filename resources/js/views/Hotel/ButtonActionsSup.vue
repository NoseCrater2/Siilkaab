<template>
  <div>
    <v-banner single-line>
      <v-row class="d-flex align-center justify-end">
        <v-col cols="12" md="8" sm="8" xs="12" class="d-flex justify-start">
          <v-btn depressed small color="info" class="white--text mr-3" @click="saveChanges()">
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar
          </v-btn>
          <v-btn depressed small color="grey" class="white--text mr-3">
            <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar y cerrar
          </v-btn>
          <v-btn depressed small color="red" class="white--text mr-3">
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
      "putEditContacts",
      "putEditConditions",
      "putEditRegimes",
      "putEditAditionalInfo",
      "putEditRestaurants",
      "putEditSchedules",
    ]),
    ...mapMutations(["setReinicialized"]),
    saveChanges() {
      this.postEditHotel(this.hotel);
      this.putEditConfiguration(this.configuration);
      this.putEditContacts(this.contacts);
      this.putEditConditions(this.conditions);
      this.putEditRegimes({
        newRegimes: this.regimes,
        currentHotelId: this.hotel.id,
        currentRegimes: this.hotel.idRegime,
      });
      this.putEditAditionalInfo(this.aditionalInfo);
      this.putEditRestaurants(this.restaurants).then(() => {
        this.putEditSchedules(this.schedules);
      });
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
  },
  props: {
    title: String,
  },
};
</script>