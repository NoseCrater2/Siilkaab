<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--DIRECCION-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-email</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">DIRECCIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedUrl"
            prepend-inner-icon="mdi-web"
            label="URL del sitio web"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['url']) != 'undefined') ? errorsContacts.url[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedEmail"
            prepend-inner-icon="mdi-email"
            label="Email"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['email']) != 'undefined') ? errorsContacts.email[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedPhone"
            prepend-inner-icon="mdi-phone"
            label="Telefono"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['phone']) != 'undefined') ? errorsContacts.phone[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedAddress"
            prepend-inner-icon="mdi-card-text"
            label="Direccion"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['address']) != 'undefined') ? errorsContacts.address[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedZipCode"
            prepend-inner-icon="mdi-map"
            label="Codigo postal"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['zipcode']) != 'undefined') ? errorsContacts.zipcode[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedCity"
            prepend-inner-icon="mdi-map"
            label="Ciudad"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['city']) != 'undefined') ? errorsContacts.city[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedState"
            prepend-inner-icon="mdi-map"
            label="Provincia"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['state']) != 'undefined') ? errorsContacts.state[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-autocomplete
            :items="countries"
            item-text="name"
            item-value="id"
            v-model="computedCountryID"
            outlined
            prepend-inner-icon="mdi-map"
            label="Pais"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <!--LOCALIZACION-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-map-marker</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">LOCALIZACIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedLegalRep"
            prepend-inner-icon="mdi-form-textbox"
            label="Representante legal"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['legal_rep']) != 'undefined') ? errorsContacts.legal_rep[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedManagerName"
            prepend-inner-icon="mdi-form-textbox"
            label="Nombre de gerente"
            outlined
            required
            :error-messages="(errorsContacts != null && typeof(errorsContacts['manager_name']) != 'undefined') ? errorsContacts.manager_name[0] : ''"
          ></v-text-field>
        </v-col>
      </v-row>
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
      errorsContacts: (state) => state.HotelModule.errorsContacts
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