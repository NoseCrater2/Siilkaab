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
            :error-messages="errorsConfiguration.currency_id"
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
            :error-messages="errorsConfiguration.timezone"
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
            <v-checkbox :error-messages="errorsConfiguration.payment_place" v-model="computedSelectPaymentsPlace" label="Online" value="online"></v-checkbox>
            <v-checkbox :error-messages="errorsConfiguration.payment_place" v-model="computedSelectPaymentsPlace" label="Offline" value="offline"></v-checkbox>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined class="px-auto pb-11 pa-5">
            <div>
              <strong>Tipo de pago</strong>
            </div>
            <v-select
              :error-messages="errorsConfiguration.payment_type"
              class="ml-auto mt-5"
              :items="paymentTypeItems"
              v-model="configuration.payment_type"
              multiple
              @change="printChanges"
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
        <v-col cols="12" lg="12" md="12" sm="12" xl="12">
          <v-combobox
            prepend-inner-icon="mdi-email"
            v-model="computedNotificationVoucher"
            chips
            label="Notificación voucher reservas"
            multiple
            outlined
            solo
            flat
            required
            :error-messages="(Object.keys(errorsConfiguration).length > 0 && Object.keys(errorsConfiguration).toString().includes('notification_voucher'))? 'Email(s) inválidos' : ''"
            append-icon=""
            :delimiters="[',', ';']"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                :color="colorChipNotificationVoucher(item)"
                :dark="colorChipNotificationVoucher(item) == 'red' ? true : false"
                v-bind="attrs"
                :input-value="selected"
                close
                close-icon="mdi-close"
                @click="select"
                @click:close="removeNotificationVoucher(item)"
              >
                <span>{{ item }}</span>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>

        <v-col cols="12" lg="12" md="12" sm="12" xl="12">
          <v-combobox
            prepend-inner-icon="mdi-email"
            v-model="computedNotificationDetails"
            chips
            label="Notificación detalles de la reserva"
            multiple
            outlined
            solo
            flat
            required
            :error-messages="(Object.keys(errorsConfiguration).length > 0 && Object.keys(errorsConfiguration).toString().includes('notification_details'))? 'Email(s) inválidos' : ''"
            append-icon=""
            :delimiters="[',', ';']"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                :color="colorChipNotificationDetails(item)"
                :dark="colorChipNotificationDetails(item) == 'red' ? true : false"
                v-bind="attrs"
                :input-value="selected"
                close
                close-icon="mdi-close"
                @click="select"
                @click:close="removeNotificationDetails(item)"
              >
                <span>{{ item }}</span>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>

        <v-col cols="12" lg="12" md="12" sm="12" xl="12">
          <v-combobox
            prepend-inner-icon="mdi-email"
            v-model="computedNotificationCard"
            chips
            label="Notificación datos de tarjeta"
            multiple
            outlined
            solo
            flat
            required
            :error-messages="(Object.keys(errorsConfiguration).length > 0 && Object.keys(errorsConfiguration).toString().includes('notification_card'))? 'Email(s) inválidos' : ''"
            append-icon=""
            :delimiters="[',', ';']"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                :color="colorChipNotificationCard(item)"
                :dark="colorChipNotificationCard(item) == 'red' ? true : false"
                v-bind="attrs"
                :input-value="selected"
                close
                close-icon="mdi-close"
                @click="select"
                @click:close="removeNotificationCard(item)"
              >
                <span>{{ item }}</span>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-pa</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">PERSONALIZACIÓN</span>
          </div>
        </div>
      </v-banner>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-alert outlined type="info" >
            Seleccione un color primario para personalizar su hotel o para diferenciarlo cuando tiene más de uno,
            si no elige un color se asignará el azul (Blue) por default.
          </v-alert>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-autocomplete
          chips
          v-model="configuration.color"
          :items="colors"
          label="Selecciona color"
          item-text="name"
          item-value="color">
            <template v-slot:selection="data">
              <v-chip
              outlined
              :input-value="data.select">
                <v-avatar left :color="data.item.color">
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>

            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <v-avatar :color="data.item.color">
                </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
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
      colors:[
        {name: 'Red', color: 'red'},
        {name: 'Pink', color: 'pink'},
        {name: 'Purple', color: 'purple'},
        {name: 'Indigo', color: 'indigo'},
        {name: 'Blue', color: 'blue'},
        {name: 'Cyan', color: 'cyan'},
        {name: 'Teal', color: 'teal'},
        {name: 'Lime', color: 'lime'},
        {name: 'Yellow', color: 'yellow'},
        {name: 'Amber', color: 'amber'},
        {name: 'Orange', color: 'orange'},
        {name: 'Brown', color: 'brown'},
        {name: 'Grey', color: 'grey'},

      ],
      selectedColor: 'blue',
      paymentTypeItems: ['Una noche', 'Mitad de reserva', 'Reserva completa'],
      ddwnPaymentTypeModel: null,
      selectPaymentsPlaceModel: [],
      currencyIdModel: 1,
      timezoneModel: "America/Mexico_City",
      notificationVoucherModel: [],
      notificationDetailsModel: [],
      notificationCardModel: [],
      rules: {
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Dirección de email inválida'
        },
      },
    };
  },
  created() {
    this.getCurrencies().then(() => {});
    this.getTimezones().then(() => {});
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
        return this.configuration.currency_id != null ? this.configuration.currency_id : this.currencyIdModel;
      },
      set(idCurrency) {
        this.currencyIdModel = idCurrency;
        this.configuration.currency_id = this.currencyIdModel;
        return this.currencyIdModel;
      },
    },
    computedTimezone: {
      get() {
        return this.configuration.timezone != null ? this.configuration.timezone : this.timezoneModel;
      },
      set(timezone) {
        this.timezoneModel = timezone;
        this.configuration.timezone = this.timezoneModel;
        return this.timezoneModel;
      },
    },
    computedNotificationVoucher: {
      get() {
        this.notificationVoucherModel = this.configuration.notification_voucher;
        return this.configuration.notification_voucher != null ? this.configuration.notification_voucher : this.notificationVoucherModel;
      },
      set(model) {
        this.notificationVoucherModel = model;
        this.configuration.notification_voucher = this.notificationVoucherModel;
        return this.notificationVoucherModel;
      },
    },
    computedNotificationDetails: {
      get() {
        this.notificationDetailsModel = this.configuration.notification_details
        return this.configuration.notification_details != null ? this.configuration.notification_details : this.notificationDetailsModel;
      },
      set(model) {
        this.notificationDetailsModel = model;
        this.configuration.notification_details = this.notificationDetailsModel;
        return this.notificationDetailsModel;
      },
    },
    computedNotificationCard: {
      get() {
        this.notificationCardModel = this.configuration.notification_card;
        return this.configuration.notification_card != null ? this.configuration.notification_card : this.notificationCardModel;
      },
      set(model) {
        this.notificationCardModel = model;
        this.configuration.notification_card = this.notificationCardModel;
        return this.notificationCardModel;
      },
    },
   
    computedSelectPaymentsPlace: {
      get() {
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
    printChanges(){
      console.log(this.ddwnPaymentTypeModel)
    },
    ...mapActions(["getCurrencies", "getTimezones"]),
    colorChipNotificationVoucher(item){
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //SI HAY UN ERROR EN LA VALIDACION, SE PONE DE ROJO
      if(pattern.test(item) == false){
        return 'red'
      }
      return '';
    },
    removeNotificationVoucher(item) {
      this.notificationVoucherModel.splice(this.notificationVoucherModel.indexOf(item), 1)
      this.notificationVoucherModel = [...this.notificationVoucherModel]
      this.configuration.notification_voucher = this.notificationVoucherModel;
    },
    colorChipNotificationDetails(item){
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //SI HAY UN ERROR EN LA VALIDACION, SE PONE DE ROJO
      if(pattern.test(item) == false){
        return 'red'
      }
      return '';
    },
    removeNotificationDetails(item) {
      this.notificationDetailsModel.splice(this.notificationDetailsModel.indexOf(item), 1)
      this.notificationDetailsModel = [...this.notificationDetailsModel]
      this.configuration.notification_details = this.notificationDetailsModel;
    },
    colorChipNotificationCard(item){
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //SI HAY UN ERROR EN LA VALIDACION, SE PONE DE ROJO
      if(pattern.test(item) == false){
        return 'red'
      }
      return '';
    },
    removeNotificationCard(item) {
      this.notificationCardModel.splice(this.notificationCardModel.indexOf(item), 1)
      this.notificationCardModel = [...this.notificationCardModel]
      this.configuration.notification_card = this.notificationCardModel;
    },
  },
};
</script>