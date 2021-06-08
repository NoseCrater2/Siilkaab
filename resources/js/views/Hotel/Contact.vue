<template>
<div>
  <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
     <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-email</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">DIRECCIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
    <v-layout wrap>
      <v-flex>
        <v-card outlined>
           <v-list-item v-if="!location.position">
              <v-list-item-avatar v-if="errorsContacts.display_name"  size="60">
              <v-icon dark large class="red white--text">mdi-map-marker-alert</v-icon>
            </v-list-item-avatar>
            <v-list-item-avatar v-else  size="60">
              <v-icon dark large class="primary white--text">mdi-map-marker</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="title">No se ha seleccionado una ubicación</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-avatar size="60">
              <v-icon large class="success white--text">mdi-map-marker-check</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title text-wrap">{{location.address}}</v-list-item-title>
              <v-list-item-subtitle >
                Latitud: {{location.position.lat}}
              </v-list-item-subtitle>
              <v-list-item-subtitle >
                Longitud: {{location.position.lng}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <div class="d-flex justify-center">
              <div>
                Puedes elegir una localización mediante:
              </div>
            </div>
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
            <div class="d-flex justify-center">
                <div>
                    <div><v-icon>mdi-circle-small</v-icon>Doble clic en el área elegida</div>
                    <div><v-icon>mdi-circle-small</v-icon>Arrastrando el marcador</div>
                    <div><v-icon>mdi-circle-small</v-icon>Usando el botón de busqueda</div>
                </div>
            </div>
        </v-col>

      <v-flex xl12 lg12 md12 sm12 xs12 style="z-index:0">
        <v-sheet>
          <div style="width: 100%; height:500px">
            <Map v-model="location" @input="printInfo(location)" :key="key" />
          </div>
        </v-sheet>
      </v-flex>
    </v-layout>
      </v-row>
    <br>
    <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-map-marker</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">LOCALIZACIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" xl="4" lg="6" md="12" sm="12" xs="12">
          <v-text-field
            v-model="computedLegalRep"
            prepend-inner-icon="mdi-form-textbox"
            label="Representante legal"
            outlined
            required
            maxlength="30"
            :error-messages="errorsContacts.legal_rep"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xl="4" lg="6" md="12" sm="12" xs="12">
          <v-text-field
            v-model="computedManagerName"
            prepend-inner-icon="mdi-form-textbox"
            label="Nombre de gerente"
            outlined
            required
            maxlength="30"
            :error-messages="errorsContacts.manager_name"
          ></v-text-field>
        </v-col>
         <v-col cols="12" xl="4" lg="6" md="12" sm="12" xs="12">
          <v-text-field
            v-model="computedEmail"
            prepend-inner-icon="mdi-email"
            label="Email"
            outlined
            required
            :rules="[rules.validEmail]"
            :error-messages="errorsContacts.email"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xl="3" lg="6" md="12" sm="12" xs="12">
          <v-text-field
            v-model="computedPhone"
            prepend-inner-icon="mdi-phone"
            label="Telefono"
            outlined
            required
            maxlength="10"
            @keydown="keyhandlerPhone"
            :rules="[rules.validPhone]"
            :error-messages="errorsContacts.phone"
          ></v-text-field>
        </v-col>
         <v-col cols="12" xl="9" lg="6" md="12" sm="12" xs="12">
          <v-text-field
            v-model="computedUrl"
            prepend-inner-icon="mdi-web"
            label="URL del sitio web"
            outlined
            required
            :error-messages="errorsContacts.url"
          ></v-text-field>
        </v-col>
      </v-row>
  </v-card>
</div>
</template>

<script>
import { mapState } from "vuex";
import Map from './Map';
export default {

  name: "Contact",
  components:{
    Map,
  },
  mounted() {
    // this.getCountries().then(() => {});
    // if (this.contacts.display_name != null) {
    //   this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    //   console.log(this.contacts)
    //   // console.log('entró al mounted')
    // }

  },
  data() {
    return {
      query: null,
        key: 1,
        location: {},

      urlModel: null,
      emailModel:null,
      phoneModel: null,
      addressModel: null,
      zipCodeModel: null,
      cityModel: null,
      stateModel: null,
      countryIDModel: null,
      legalRepModel: null,
      managerNameModel: null,
      rules: {
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Dirección de email inválida'
        },
        validPhone: value => {
          const pattern = /^([0-9]\d{0,10})$/
          return pattern.test(value) || 'Solo se aceptan numeros'
        },
        // validZip: value => {
        //   const pattern = /^([0-9]\d{0,6})$/
        //   return pattern.test(value) || 'Solo se aceptan numeros'
        // },
      },
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      contacts: (state) => state.HotelModule.contacts,
      // countries: (state) => state.HotelModule.countries,
      errorsContacts: (state) => state.HotelModule.errorsContacts
    }),
    computedUrl: {
      get() {
        return this.contacts.url != null ? this.contacts.url : this.urlModel;
      },
      set(model) {
        this.urlModel = model;
        this.contacts.url = this.urlModel;
        return this.urlModel;
      },
    },
    computedEmail: {
      get() {
        return this.contacts.email != null ? this.contacts.email : this.emailModel;
      },
      set(model) {
        this.emailModel = model;
        this.contacts.email = this.emailModel;
        return this.emailModel;
      },
    },
    computedPhone: {
      get() {
        return this.contacts.phone != null ? this.contacts.phone: this.phoneModel;
      },
      set(model) {
        this.phoneModel = model;
        this.contacts.phone = this.phoneModel;
        return this.phoneModel;
      },
    },


    // computedAddress: {
    //   get() {
    //     return this.addressModel;
    //   },
    //   set(model) {
    //     this.addressModel = model;
    //     this.contacts.address = this.addressModel;
    //     return this.addressModel;
    //   },
    // },
    // computedZipCode: {
    //   get() {
    //     return this.zipCodeModel;
    //   },
    //   set(model) {
    //     this.zipCodeModel = model;
    //     this.contacts.zipcode = this.zipCodeModel;
    //     return this.zipCodeModel;
    //   },
    // },
    // computedCity: {
    //   get() {
    //     return this.cityModel;
    //   },
    //   set(model) {
    //     this.cityModel = model;
    //     this.contacts.city = this.cityModel;
    //     return this.cityModel;
    //   },
    // },
    // computedState: {
    //   get() {
    //     return this.stateModel;
    //   },
    //   set(model) {
    //     this.stateModel = model;
    //     this.contacts.state = this.stateModel;
    //     return this.stateModel;
    //   },
    // },
    // computedCountryID: {
    //   get() {
    //     return this.countryIDModel;
    //   },
    //   set(model) {
    //     this.countryIDModel = model;
    //     this.contacts.country_id = this.countryIDModel;
    //     return this.countryIDModel;
    //   },
    // },
    computedLegalRep: {
      get() {
        return this.contacts.legal_rep != null? this.contacts.legal_rep : this.legalRepModel;
      },
      set(model) {
        this.legalRepModel = model;
        this.contacts.legal_rep = this.legalRepModel;
        return this.legalRepModel;
      },
    },
    computedManagerName: {
      get() {
        return this.contacts.manager_name != null ? this.contacts.manager_name: this.managerNameModel;
      },
      set(model) {
        this.managerNameModel = model;
        this.contacts.manager_name = this.managerNameModel;
        return this.managerNameModel;
      },
    },
  },
  methods: {

    printInfo(location){
      this.contacts.display_name = location.address
      this.contacts.latitude = location.position.lat
      this.contacts.longitude = location.position.lng
    },

    // ...mapActions(["getCountries"]),
    //Metodo para llenar la vista con los datos
    fillModel(){
      if(this.contacts.url != null){
          this.urlModel = this.contacts.url;
      }
      else{
          this.contacts.url = "";
          this.urlModel = this.contacts.url;
      }
      if(this.contacts.email != null){
          this.emailModel = this.contacts.email;
      }
      else{
          this.contacts.email = "";
          this.emailModel = this.contacts.email;
      }
      if(this.contacts.phone != null){
          this.phoneModel = this.contacts.phone;
      }
      else{
          this.contacts.phone = "";
          this.phoneModel = this.contacts.phone;
      }
      // if(this.contacts.address != null){
      //     this.addressModel = this.contacts.address;
      // }
      // else{
      //     this.contacts.address = "";
      //     this.addressModel = this.contacts.address;
      // }
      // if(this.contacts.zipcode != null){
      //     this.zipCodeModel = this.contacts.zipcode;
      // }
      // else{
      //     this.contacts.zipcode = "";
      //     this.zipCodeModel = this.contacts.zipcode;
      // }
      // if(this.contacts.city != null){
      //     this.cityModel = this.contacts.city;
      // }
      // else{
      //     this.contacts.city = "";
      //     this.cityModel = this.contacts.city;
      // }
      // if(this.contacts.state != null){
      //     this.stateModel = this.contacts.state;
      // }
      // else{
      //     this.contacts.state = "";
      //     this.stateModel = this.contacts.state;
      // }
      // if(this.contacts.country_id != null){
      //     this.countryIDModel = this.contacts.country_id;
      // }
      // else{
      //     this.contacts.country_id = 146;
      //     this.countryIDModel = this.contacts.country_id;
      // }
      if(this.contacts.legal_rep != null){
          this.legalRepModel = this.contacts.legal_rep;
      }
      else{
          this.contacts.legal_rep = "";
          this.legalRepModel = this.contacts.legal_rep;
      }
      if(this.contacts.manager_name != null){
          this.managerNameModel = this.contacts.manager_name;
      }
      else{
          this.contacts.manager_name = "";
          this.managerNameModel = this.contacts.manager_name;
      }
    },
    keyhandlerPhone(event) {
      const pattern = /^([0-9]\d{0,10})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        event.preventDefault();
      }
    },
    keyhandlerZip(event) {
      const pattern = /^([0-9]\d{0,6})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        event.preventDefault();
      }
    },


  },
};
</script>
