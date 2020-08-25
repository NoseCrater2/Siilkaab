<template>
  <div>
    <v-banner single-line>
      <v-btn small color="info" class="white--text" @click="saveChanges()">
        <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar
      </v-btn>
      <v-btn small color="grey" class="white--text">
        <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar y cerrar
      </v-btn>
      <v-btn small color="red" class="white--text">
        <v-icon left dark>mdi-close-circle</v-icon>Cerrar
      </v-btn>

      <template v-slot:actions>
        <h3>{{title}}</h3>
        <v-icon id="iconHotel">mdi-domain</v-icon>
      </template>
    </v-banner>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ButtonActionsSup",
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      configuration: (state) => state.HotelModule.configuration,
      contacts: (state) => state.HotelModule.contacts,
      conditions: (state) => state.HotelModule.conditions,
      regimes: (state) => state.HotelModule.regimes,
    }),
  },
  methods: {
    ...mapActions(["postEditHotel", "putEditConfiguration", "putEditContacts", "putEditConditions", "putEditRegimes"]),
    saveChanges() {
      this.postEditHotel(this.hotel);
      this.putEditConfiguration(this.configuration);
      this.putEditContacts(this.contacts);
      this.putEditConditions(this.conditions);
      this.putEditRegimes({newRegimes: this.regimes, currentHotelId: this.hotel.id, currentRegimes: this.hotel.idRegime});
    },
  },
  props: {
    title: String,
  },
};
</script>

<style scoped>
#iconHotel {
  margin-right: 0px;
  margin-bottom: 6px;
}
</style>