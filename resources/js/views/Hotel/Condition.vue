<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--CONDICIONES-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-gavel</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">CONDICIONES</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-switch class="ml-3" :error-messages="errorsConditions.adults" v-model="computedAdults" inset label="Solo adultos"></v-switch>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedChildrenAge"
            prepend-inner-icon="mdi-playlist-edit"
            label="Niño desde"
            outlined
            required
            v-if="computedAdults == false"
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validAges]"
            :error-messages="errorsConditions.children_age"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedAdultsRegimen"
            prepend-inner-icon="mdi-playlist-edit"
            label="Regimen adulto desde"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validAges]"
            :error-messages="errorsConditions.adults_regimen"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedAdultsAge"
            prepend-inner-icon="mdi-playlist-edit"
            label="Adulto desde"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validAges]"
            :error-messages="errorsConditions.adults_age"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-dialog
            ref="dialogChekin"
            v-model="modalCheckin"
            :return-value.sync="computedCheckinTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedCheckinTime"
                :readonly="true"
                label="Check-in"
                prepend-inner-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                outlined
                required
                :error-messages="errorsConditions.checkin_time"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modalCheckin" v-model="computedCheckinTime" format="24hr" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalCheckin = false">Cancelar</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogChekin.save(checkinTimeSaveState)"
              >Aceptar</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-dialog
            ref="dialogChekout"
            v-model="modalCheckout"
            :return-value.sync="computedCheckoutTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedCheckoutTime"
                :readonly="true"
                label="Check-out"
                prepend-inner-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                outlined
                required
                :error-messages="errorsConditions.checkout_time"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalCheckout"
              v-model="computedCheckoutTime"
              format="24hr"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalCheckout = false">Cancelar</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogChekout.save(checkoutTimeSaveState)"
              >Aceptar</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-banner single-line>
        <!--TEXTOS DE CONDICIONES-->
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-text</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">TEXTOS DE CONDICIONES</span>
          </div>
        </div>
      </v-banner>
      <div class="pa-4">
        <v-col cols="12" md="12" sm="12" xs="12">
          <!--<v-textarea outlined no-resize rows="13" row-height="30" v-model="textoLargo"></v-textarea>-->
          <!--<vue-markdown :source="textoLargo" :html="false" :toc="false" show="show"></vue-markdown>-->
          <MarkdownCompo containerType="Conditions"></MarkdownCompo>
          <div class="ml-3">
            <span class="red--text text-caption">{{typeof(errorsConditions.cancelation_text) != 'undefined' ? (errorsConditions.cancelation_text).toString() : ''}}</span>
          </div>
        </v-col>
      </div>
    </v-card>
  </div>
</template>

<script>
import MarkdownCompo from "../../components/Markdown/MarkdownCompo";
import { mapState } from "vuex";
export default {
  name: "Condition",
  data() {
    return {
      adultsModel: 0,
      childrenAgeModel: "",
      adultsRegimenModel: "",
      adultsAgeModel: "",
      modalCheckin: false,
      checkinTimeModel: "",
      modalCheckout: false,
      checkoutTimeModel: "",
      rules: {
        validAges: value => {
          const pattern = /^(1|[0-9]\d{0,3})$/
          return pattern.test(value) || 'Solo se aceptan numeros'
        },
      },
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo,
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      conditions: (state) => state.HotelModule.conditions,
      errorsConditions: (state) => state.HotelModule.errorsConditions
    }),
    //Codigo para guardar temporalmente en el state
    computedAdults: {
      get() {
        if(this.conditions.adults != null){
          if(this.adultsModel == 1 || this.adultsModel == true){
            this.childrenAgeModel = 0;
            this.conditions.children_age = this.childrenAgeModel;
          }
          return this.conditions.adults;
        }
        else{
          return this.adultsModel;
        }
      },
      set(model) {
        if(model == 1 || model == true){
          this.childrenAgeModel = 0;
          this.conditions.children_age = this.childrenAgeModel;
        }
        this.adultsModel = model;
        this.conditions.adults = this.adultsModel;
        return this.adultsModel;
      },
    },
    computedChildrenAge: {
      get() {
        return this.conditions.children_age != null ? this.conditions.children_age : this.childrenAgeModel;
      },
      set(model) {
        this.childrenAgeModel = model;
        this.conditions.children_age = this.childrenAgeModel;
        return this.childrenAgeModel;
      },
    },
    computedAdultsRegimen: {
      get() {
        return this.conditions.adults_regimen != null ? this.conditions.adults_regimen : this.adultsRegimenModel;
      },
      set(model) {
        this.adultsRegimenModel = model;
        this.conditions.adults_regimen = this.adultsRegimenModel;
        return this.adultsRegimenModel;
      },
    },
    computedAdultsAge: {
      get() {
        return this.conditions.adults_age != null ? this.conditions.adults_age : this.adultsAgeModel;
      },
      set(model) {
        this.adultsAgeModel = model;
        this.conditions.adults_age = this.adultsAgeModel;
        return this.adultsAgeModel;
      },
    },
    computedCheckinTime: {
      get(){
        return this.conditions.checkin_time != null ? this.conditions.checkin_time : this.checkinTimeModel;
      },
      set(model){
        this.checkinTimeModel = model;
        this.conditions.checkin_time = this.checkinTimeModel;
        return this.checkinTimeModel;
      }
    },
    computedCheckoutTime: {
      get(){
        return this.conditions.checkout_time != null ? this.conditions.checkout_time : this.checkoutTimeModel;
      },
      set(model){
        this.checkoutTimeModel = model;
        this.conditions.checkout_time = this.checkoutTimeModel;
        return this.checkoutTimeModel;
      }
    },
    checkoutTimeSaveState() {
      this.conditions.checkout_time = this.checkoutTimeModel;
      return this.checkoutTimeModel;
    },
    checkinTimeSaveState() {
      this.conditions.checkin_time = this.checkinTimeModel;
      return this.checkinTimeModel;
    },
  },
  methods:{
    keyhandler(event) {
      const pattern = /^(1|[0-9]\d{0,3})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        console.log(event.key)
        event.preventDefault();
      }
    }
  }
};
</script>