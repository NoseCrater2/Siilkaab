<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
      <v-banner single-line>
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-cog</v-icon>
          <h3>Principal</h3>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="currencies"
            item-text="currency"
            item-value="currency_id"
            v-model="computedCurrencyID"
            dense
            filled
            label="Divisa"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="timezones"
            v-model="computedTimezone"
            dense
            filled
            label="Zona horaria"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined style="padding: 5%;">
            <span>
              <strong>Formas de pago</strong>
            </span>
            <v-checkbox v-model="computedSelectPaymentsPlace" label="Online" value="online"></v-checkbox>
            <v-checkbox v-model="computedSelectPaymentsPlace" label="Offline" value="offline"></v-checkbox>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined style="padding: 5%;">
            <span>
              <strong>Tipo de pago</strong>
            </span>
            <v-autocomplete
              class="ml-auto"
              :items="paymentTypeItems"
              v-model="computedDdwnPaymentType"
              dense
              filled
            ></v-autocomplete>
          </v-card>
        </v-col>
      </v-row>
      <!--NOTIFICACION-->
      <v-banner single-line>
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-bell</v-icon>
          <h3>Notificacion</h3>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationVoucher"
            label="Notificacion voucher reservas"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationDetails"
            label="Notificacion detalles de la reserva"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="computedNotificationCard"
            label="Notificación datos de tarjeta"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      this.currencyIdModel = this.configuration.currency_id;
      this.timezoneModel = this.configuration.timezone;
      this.notificationVoucherModel = this.configuration.notification_voucher;
      this.notificationDetailsModel = this.configuration.notification_details;
      this.notificationCardModel = this.configuration.notification_card;
      if (this.configuration.payment_type != null) {
        if (this.configuration.payment_type == "one") {
          this.ddwnPaymentTypeModel = "Una noche";
        }
        if (this.configuration.payment_type == "all") {
          this.ddwnPaymentTypeModel = "Todas las noches";
        }
      }
      if (this.configuration.payment_place != null) {
        if (this.configuration.payment_place === "both") {
          this.selectPaymentsPlaceModel.push("online");
          this.selectPaymentsPlaceModel.push("offline");
        }
        else{
          this.selectPaymentsPlaceModel.push(this.configuration.payment_place);
        }
      }
    }
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      currencies: (state) => state.HotelModule.currencies,
      timezones: (state) => state.HotelModule.timezones,
      configuration: (state) => state.HotelModule.configuration,
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