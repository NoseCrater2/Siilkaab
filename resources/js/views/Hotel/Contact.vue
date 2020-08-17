<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--DIRECCION-->
      <div v-if="hotel!==null">
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-email</v-icon>
            <h3>Direccion</h3>
          </div>
        </v-banner>
        <v-row class="pa-6">
          <v-col cols="12" md="6">
            <v-text-field v-model="computedUrl" label="URL del sitio web" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="computedEmail" label="Email" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="computedPhone" label="Telefono" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="computedAddress" label="Direccion" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="computedZipCode" label="Codigo postal" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="computedCity" label="Ciudad" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="computedState" label="Provincia" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              :items="countries"
              item-text="name"
              item-value="id"
              v-model="computedCountryID"
              dense
              filled
              label="Pais"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!--LOCALIZACION-->
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-map-marker</v-icon>
            <h3>Localizacion</h3>
          </div>
        </v-banner>
        <v-row class="pa-6">
          <v-col cols="12" md="6">
            <v-text-field v-model="computedLegalRep" label="Representante legal" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="computedManagerName" label="Nombre de gerente" required></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Contact",
  created() {
    this.getCountries().then(() => {});
    if (this.hotel.idContact !== null) {
      this.urlModel = this.contacts.url;
      this.emailModel = this.contacts.email;
      this.phoneModel = this.contacts.phone;
      this.addressModel = this.contacts.address;
      this.zipCodeModel = this.contacts.zipcode;
      this.cityModel = this.contacts.city;
      this.stateModel = this.contacts.state;
      this.countryIDModel = this.contacts.country_id;
      this.legalRepModel = this.contacts.legal_rep;
      this.managerNameModel = this.contacts.manager_name;
    }
  },
  data() {
    return {
      urlModel: null,
      emailModel: null,
      phoneModel: null,
      addressModel: null,
      zipCodeModel: null,
      cityModel: null,
      stateModel: null,
      countryIDModel: null,
      legalRepModel: null,
      managerNameModel: null,
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      contacts: (state) => state.HotelModule.contacts,
      countries: (state) => state.HotelModule.countries,
    }),
    computedUrl: {
      get() {
        return this.urlModel;
      },
      set(model) {
        this.urlModel = model;
        this.contacts.url = this.urlModel;
        return this.urlModel;
      },
    },
    computedEmail: {
      get() {
        return this.emailModel;
      },
      set(model) {
        this.emailModel = model;
        this.contacts.email = this.emailModel;
        return this.emailModel;
      },
    },
    computedPhone: {
      get() {
        return this.phoneModel;
      },
      set(model) {
        this.phoneModel = model;
        this.contacts.phone = this.phoneModel;
        return this.phoneModel;
      },
    },
    computedAddress: {
      get() {
        return this.addressModel;
      },
      set(model) {
        this.addressModel = model;
        this.contacts.address = this.addressModel;
        return this.addressModel;
      },
    },
    computedZipCode: {
      get() {
        return this.zipCodeModel;
      },
      set(model) {
        this.zipCodeModel = model;
        this.contacts.zipcode = this.zipCodeModel;
        return this.zipCodeModel;
      },
    },
    computedCity: {
      get() {
        return this.cityModel;
      },
      set(model) {
        this.cityModel = model;
        this.contacts.city = this.cityModel;
        return this.cityModel;
      },
    },
    computedState: {
      get() {
        return this.stateModel;
      },
      set(model) {
        this.stateModel = model;
        this.contacts.state = this.stateModel;
        return this.stateModel;
      },
    },
    computedCountryID: {
      get() {
        return this.countryIDModel;
      },
      set(model) {
        this.countryIDModel = model;
        this.contacts.country_id = this.countryIDModel;
        return this.countryIDModel;
      },
    },
    computedLegalRep: {
      get() {
        return this.legalRepModel;
      },
      set(model) {
        this.legalRepModel = model;
        this.contacts.legal_rep = this.legalRepModel;
        return this.legalRepModel;
      },
    },
    computedManagerName: {
      get() {
        return this.managerNameModel;
      },
      set(model) {
        this.managerNameModel = model;
        this.contacts.manager_name = this.managerNameModel;
        return this.managerNameModel;
      },
    },
  },
  methods: {
    ...mapActions(["getCountries"]),
  },
};
</script>

<style scoped>
.iconsInformation {
  margin-bottom: 6px;
}
.flexed {
  display: flex;
}
</style>