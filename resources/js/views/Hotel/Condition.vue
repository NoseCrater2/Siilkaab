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
          <v-switch class="ml-3" v-model="computedAdults" inset label="Solo adultos"></v-switch>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedChildrenAge"
            prepend-inner-icon="mdi-playlist-edit"
            label="Niño desde"
            outlined
            required
            v-if="computedAdults == false"
            :error-messages="(errorsConditions != null && typeof(errorsConditions['children_age']) != 'undefined') ? errorsConditions.children_age[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedAdultsRegimen"
            prepend-inner-icon="mdi-playlist-edit"
            label="Regimen adulto desde"
            outlined
            required
            :error-messages="(errorsConditions != null && typeof(errorsConditions['adults_regimen']) != 'undefined') ? errorsConditions.adults_regimen[0] : ''"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12" xs="12">
          <v-text-field
            v-model="computedAdultsAge"
            prepend-inner-icon="mdi-playlist-edit"
            label="Adulto desde"
            outlined
            required
            :error-messages="(errorsConditions != null && typeof(errorsConditions['adults_age']) != 'undefined') ? errorsConditions.adults_age[0] : ''"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-dialog
            ref="dialogChekin"
            v-model="modalCheckin"
            :return-value.sync="checkinTimeModel"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="checkinTimeModel"
                label="Check-in"
                prepend-inner-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                outlined
                required
                :error-messages="(errorsConditions != null && typeof(errorsConditions['checkin_time']) != 'undefined') ? errorsConditions.checkin_time[0] : ''"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modalCheckin" v-model="checkinTimeModel" format="24hr" full-width>
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
            :return-value.sync="checkoutTimeModel"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="checkoutTimeModel"
                label="Check-out"
                prepend-inner-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                outlined
                required
                :error-messages="(errorsConditions != null && typeof(errorsConditions['checkout_time']) != 'undefined') ? errorsConditions.checkout_time[0] : ''"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalCheckout"
              v-model="checkoutTimeModel"
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
  created() {
    if (this.hotel.idCondition !== null) {
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    }
    else{
      this.fillModel();
      console.log(this.conditions)
    }
  },
  data() {
    return {
      adultsModel: null,
      childrenAgeModel: null,
      adultsRegimenModel: null,
      adultsAgeModel: null,
      modalCheckin: false,
      checkinTimeModel: null,
      modalCheckout: false,
      checkoutTimeModel: null,
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
        return this.adultsModel;
      },
      set(model) {
        this.adultsModel = model;
        this.conditions.adults = this.adultsModel;
        return this.adultsModel;
      },
    },
    computedChildrenAge: {
      get() {
        return this.childrenAgeModel;
      },
      set(model) {
        this.childrenAgeModel = model;
        this.conditions.children_age = this.childrenAgeModel;
        return this.childrenAgeModel;
      },
    },
    computedAdultsRegimen: {
      get() {
        return this.adultsRegimenModel;
      },
      set(model) {
        this.adultsRegimenModel = model;
        this.conditions.adults_regimen = this.adultsRegimenModel;
        return this.adultsRegimenModel;
      },
    },
    computedAdultsAge: {
      get() {
        return this.adultsAgeModel;
      },
      set(model) {
        this.adultsAgeModel = model;
        this.conditions.adults_age = this.adultsAgeModel;
        return this.adultsAgeModel;
      },
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
    fillModel(){
    if(this.conditions.adults != null){
        this.adultsModel = this.conditions.adults;
    }
    else{
        this.conditions.adults = 0;
        this.adultsModel = this.conditions.adults;
    }
    if(this.conditions.children_age != null){
        this.childrenAgeModel = this.conditions.children_age;
    }
    else{
        this.conditions.children_age = "";
        this.childrenAgeModel = this.conditions.children_age;
    }
    if(this.conditions.adults_regimen != null){
        this.adultsRegimenModel = this.conditions.adults_regimen;
    }
    else{
        this.conditions.adults_regimen = "";
        this.adultsRegimenModel = this.conditions.adults_regimen;
    } 
    if(this.conditions.adults_age != null){
        this.adultsAgeModel = this.conditions.adults_age;
    }
    else{
        this.conditions.adults_age = "";
        this.adultsAgeModel = this.conditions.adults_age;
    } 
    if(this.conditions.checkin_time != null){
        this.checkinTimeModel = this.conditions.checkin_time;
    }
    else{
        this.conditions.checkin_time = "";
        this.checkinTimeModel = this.conditions.checkin_time;
    }    
    if(this.conditions.checkout_time != null){
        this.checkoutTimeModel = this.conditions.checkout_time;
    }
    else{
        this.conditions.checkout_time = "";
        this.checkoutTimeModel = this.conditions.checkout_time;
    }
    if(this.conditions.cancelation_text == null){
        this.conditions.cancelation_text = "";
    }
    }
  }
};
</script>