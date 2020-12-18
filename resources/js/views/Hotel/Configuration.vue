<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-cog</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">PRINCIPAL</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="currencies"
            item-text="currency"
            item-value="currency_id"
            v-model="computedCurrencyID"
            outlined
            prepend-inner-icon="mdi-currency-usd-circle"
            label="Divisa"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="timezones"
            v-model="computedTimezone"
            outlined
            prepend-inner-icon="mdi-map-clock"
            label="Zona horaria"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined class="pa-5">
            <span>
              <strong>Formas de pago</strong>
            </span>
            <v-checkbox v-model="computedSelectPaymentsPlace" label="Online" value="online"></v-checkbox>
            <v-checkbox v-model="computedSelectPaymentsPlace" label="Offline" value="offline"></v-checkbox>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined class="px-auto pb-11 pa-5">
            <div>
              <strong>Tipo de pago</strong>
            </div>
            <v-select
              class="ml-auto mt-5"
              :items="paymentTypeItems"
              v-model="computedDdwnPaymentType"
              prepend-inner-icon="mdi-cash"
              :menu-props="{ bottom: true, offsetY: true }"
              outlined
            ></v-select>
          </v-card>
        </v-col>
      </v-row>
      <!--NOTIFICACION-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-bell</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">NOTIFICACIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationVoucher"
            prepend-inner-icon="mdi-email"
            label="Notificacion voucher reservas"
            outlined
            required
            :error-messages="(errorsConfiguration != null && typeof(errorsConfiguration['notification_voucher'])!='undefined') ? errorsConfiguration.notification_voucher[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationDetails"
            prepend-inner-icon="mdi-email"
            label="Notificacion detalles de la reserva"
            outlined
            required
            :error-messages="(errorsConfiguration != null && typeof(errorsConfiguration['notification_details'])!='undefined') ? errorsConfiguration.notification_details[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationCard"
            prepend-inner-icon="mdi-email"
            label="Notificación datos de tarjeta"
            outlined
            required
            :error-messages="(errorsConfiguration != null && typeof(errorsConfiguration['notification_card'])!='undefined') ? errorsConfiguration.notification_card[0] : ''"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../../routes";
export default {
  name: "Configuration",
  data() {
    return {
      paymentTypeItems: ["Una noche", "Todas las noches"],
      ddwnPaymentTypeModel: null,
      selectPaymentsPlaceModel: [],
      currencyIdModel: null,
      timezoneModel: null,
      notificationVoucherModel: null,
      notificationDetailsModel: null,
      notificationCardModel: null,
    };
  },
  created() {
    this.getCurrencies().then(() => {});
    this.getTimezones().then(() => {});
    if (this.hotel.idConfiguration !== null) {
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    }
    else{
      this.fillModel();
      console.log(this.configuration);
      //console.log(this.configuration)
      //this.configuration.currency_id = 0;
    }
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      currencies: (state) => state.HotelModule.currencies,
      timezones: (state) => state.HotelModule.timezones,
      configuration: (state) => state.HotelModule.configuration,
      errorsConfiguration: (state) => state.HotelModule.errorsConfiguration
    }),
    //Codigo para guardar temporalmente en el state
    computedCurrencyID: {
      get() {
        return this.currencyIdModel;
      },
      set(idCurrency) {
        this.currencyIdModel = idCurrency;
        this.configuration.currency_id = this.currencyIdModel;
        return this.currencyIdModel;
      },
    },
    computedTimezone: {
      get() {
        return this.timezoneModel;
      },
      set(timezone) {
        this.timezoneModel = timezone;
        this.configuration.timezone = this.timezoneModel;
        return this.timezoneModel;
      },
    },
    computedNotificationVoucher: {
      get() {
        return this.notificationVoucherModel;
      },
      set(model) {
        this.notificationVoucherModel = model;
        this.configuration.notification_voucher = this.notificationVoucherModel;
        return this.notificationVoucherModel;
      },
    },
    computedNotificationDetails: {
      get() {
        return this.notificationDetailsModel;
      },
      set(model) {
        this.notificationDetailsModel = model;
        this.configuration.notification_details = this.notificationDetailsModel;
        return this.notificationDetailsModel;
      },
    },
    computedNotificationCard: {
      get() {
        return this.notificationCardModel;
      },
      set(model) {
        this.notificationCardModel = model;
        this.configuration.notification_card = this.notificationCardModel;
        return this.notificationCardModel;
      },
    },
    computedDdwnPaymentType: {
      get() {
        return this.ddwnPaymentTypeModel;
      },
      set(model) {
        this.ddwnPaymentTypeModel = model;
        if (this.ddwnPaymentTypeModel == "Una noche") {
          this.configuration.payment_type = "one";
        }
        if (this.ddwnPaymentTypeModel == "Todas las noches") {
          this.configuration.payment_type = "all";
        }
        return this.ddwnPaymentTypeModel;
      },
    },
    computedSelectPaymentsPlace: {
      get() {
        return this.selectPaymentsPlaceModel;
      },
      set(model) {
        this.selectPaymentsPlaceModel = model;
        if (model.length > 1) {
          this.configuration.payment_place = "both";
        } else {
          this.configuration.payment_place = this.selectPaymentsPlaceModel[0];
        }
        return this.selectPaymentsPlaceModel;
      },
    },
  },
  methods: {
    ...mapActions(["getCurrencies", "getTimezones"]),
    //Metodo para llenar la vista con los datos
    fillModel(){
      if(this.configuration.currency_id != null){
        this.currencyIdModel = this.configuration.currency_id;
      }
      else{
        this.configuration.currency_id = 1;
        this.currencyIdModel = this.configuration.currency_id;
      }
      if(this.configuration.timezone != null){
        this.timezoneModel = this.configuration.timezone;
      }
      else{
        this.configuration.timezone = "America/Mexico_City";
        this.timezoneModel = this.configuration.timezone;
      }
      if(this.configuration.notification_voucher != null){
        this.notificationVoucherModel = this.configuration.notification_voucher;
      }
      else{
        this.configuration.notification_voucher = "";
        this.notificationVoucherModel = this.configuration.notification_voucher;
      }
      if(this.configuration.notification_details != null){
        this.notificationDetailsModel = this.configuration.notification_details;
      }
      else{
        this.configuration.notification_details = "";
        this.notificationDetailsModel = this.configuration.notification_details;
      }
      if(this.configuration.notification_card != null){
        this.notificationCardModel = this.configuration.notification_card;
      }
      else{
        this.configuration.notification_card = "";
        this.notificationCardModel = this.configuration.notification_card
      }
      if (this.configuration.payment_type != null) {
        if (this.configuration.payment_type == "one") {
          this.ddwnPaymentTypeModel = "Una noche";
        }
        if (this.configuration.payment_type == "all") {
          this.ddwnPaymentTypeModel = "Todas las noches";
        }
      }
      else{
        this.configuration.payment_type = "one";
        this.ddwnPaymentTypeModel = "Una noche";
      }
      if (this.configuration.payment_place != null) {
        if (this.configuration.payment_place === "both") {
          this.selectPaymentsPlaceModel.push("online");
          this.selectPaymentsPlaceModel.push("offline");
        } 
        else {
          this.selectPaymentsPlaceModel.push(this.configuration.payment_place);
        }
      }
      else{
        this.configuration.payment_place = "";
      }
    }
  },
};
</script>