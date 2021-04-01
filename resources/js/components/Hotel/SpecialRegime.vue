<template>
  <div>
    <v-row class="d-flex align-center justify-center pa-6 mt-n7">
      <v-col cols="12" md="2" sm="12" xs="12">
        <v-btn small color="red" class="white--text mt-1" depressed @click="removeCompo(id)">
          <v-icon left dark>mdi-close-circle</v-icon>Eliminar
        </v-btn>
      </v-col>
      <!--MENU DESDE-->
      <v-col cols="12" md="5" sm="12" xs="12" class="mt-8">
        <div v-if="getStartDate!=null">
          <DateTimePicker :dates="getStartDate" @sendNewHour="sendNewHour"></DateTimePicker>
        </div>
      </v-col>

      <!--MENU HASTA-->
      <v-col cols="12" md="5" sm="12" xs="12" class="mt-8">
        <div v-if="getFinalDate!=null">
          <DateTimePicker :dates="getFinalDate" @sendNewHour="sendNewHour"></DateTimePicker>
        </div>
      </v-col>

      <v-col cols="12" md="6" sm="12" xs="12">
          <v-tooltip top nudge-bottom="8" nudge-left="36">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-switch :error-messages="computedErrorOnlyRoom" v-model="computedSwOnlyRoom" inset label="Solo habitacion"></v-switch>
              </div>
            </template>
            <span class="caption">Sólo dormir. Sin regímenes</span>
          </v-tooltip>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <v-select
          :items="prioritiesModel"
          :error-messages="computedErrorPriority"
          v-model="computedDdwnPriority"
          prepend-inner-icon="mdi-pen"
          label="Prioridad"
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
          <v-tooltip top nudge-bottom="8" nudge-left="12">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-switch v-model="computedSwBreakfast" inset label="Alojamiento y desayuno"></v-switch>
              </div>
            </template>
            <span class="caption">Alojamiento con desayuno incluido</span>
          </v-tooltip>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtBreakfastAdult"
          prepend-inner-icon="mdi-currency-usd"
          label="Adulto"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
          :error-messages="computedErrorLodgingBreakfastAdult"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtBreakfastChildren"
          prepend-inner-icon="mdi-currency-usd"
          label="Niño"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
          :error-messages="computedErrorLodgingBreakfastChildren"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
          <v-tooltip top nudge-bottom="8" nudge-right="18">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-switch v-model="computedSwHalfPension" inset label="Media pension"></v-switch>
              </div>
            </template>
            <span class="caption">Media pensión con desayuno y cena incluidos</span>
          </v-tooltip>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtHalfPensionAdult"
          prepend-inner-icon="mdi-currency-usd"
          label="Adulto"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
          :error-messages="computedErrorHalfPensionAdult"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtHalfPensionChildren"
          prepend-inner-icon="mdi-currency-usd"
          label="Niño"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
          :error-messages="computedErrorHalfPensionChildren"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
          <v-tooltip top nudge-bottom="8" nudge-left="6">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-switch v-model="computedSwFullPension" inset label="Pension completa"></v-switch>
              </div>
            </template>
            <span class="caption">Pensión completa con comida y cena</span>
          </v-tooltip>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtFullPensionAdult"
          prepend-inner-icon="mdi-currency-usd"
          label="Adulto"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
          :error-messages="computedErrorFullPensionAdult"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtFullPensionChildren"
          prepend-inner-icon="mdi-currency-usd"
          label="Niño"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
          :error-messages="computedErrorFullPensionChildren"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
          <v-tooltip top nudge-bottom="8" nudge-left="76">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-switch v-model="computedSwAllIncluded" inset label="Todo incluido"></v-switch>
              </div>
            </template>
            <span class="caption">Todo incluido</span>
          </v-tooltip>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model.number="computedTxtAllIncludedAdult"
          prepend-inner-icon="mdi-currency-usd"
          label="Adulto"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
          :error-messages="computedErrorAllIncludedAdult"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtAllIncludedChildren"
          prepend-inner-icon="mdi-currency-usd"
          label="Niño"
          outlined
          required
          maxlength="15"
          :rules="[rules.validNumericInputs]"
          :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
          :error-messages="computedErrorAllIncludedChildren"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DateTimePicker from "../DateTimePicker/DateTimePicker";

export default {
  name: "SpecialRegime",
  mounted() {
    //componentID es utilizado como key unica para el proceso de muestra de errores
    this.objArrCompo.componentID = this.componentID;
    if (this.objArrCompo.start_period != null && this.objArrCompo.final_period != null) {
      this.propStartDate = {
        info: "Start",
        prop: this.objArrCompo.start_period,
      };
      this.propFinalDate = {
        info: "Final",
        prop: this.objArrCompo.final_period,
      };
    }
    this.swOnlyRoomModel = this.objArrCompo.only_room;
    if (this.objArrCompo.priority != null) {
      if (this.objArrCompo.priority == "normal") {
        this.ddwnPriorityModel = "Normal";
      }
      if (this.objArrCompo.priority == "medium") {
        this.ddwnPriorityModel = "Media";
      }
      if (this.objArrCompo.priority == "high") {
        this.ddwnPriorityModel = "Alta";
      }
    }
    this.txtBreakfastChildrenModel = this.objArrCompo.lodging_breakfast_children;
    this.txtBreakfastAdultModel = this.objArrCompo.lodging_breakfast_adult;
    if (this.txtBreakfastAdultModel !==null || this.txtBreakfastChildrenModel !== null) {
      if (this.txtBreakfastAdultModel !== 0 || this.txtBreakfastChildrenModel !== 0) {
        this.swBreakfastModel = 1;
      }
    }
    this.txtHalfPensionChildrenModel = this.objArrCompo.half_pension_children;
    this.txtHalfPensionAdultModel = this.objArrCompo.half_pension_adult;
    if (this.txtHalfPensionAdultModel !==null || this.txtHalfPensionChildrenModel !== null) {
      if (this.txtHalfPensionAdultModel !== 0 || this.txtHalfPensionChildrenModel !== 0) {
        this.swHalfPensionModel = 1;
      }
    }
    this.txtFullPensionChildrenModel = this.objArrCompo.full_pension_children;
    this.txtFullPensionAdultModel = this.objArrCompo.full_pension_adult;
    if (this.txtFullPensionAdultModel !==null || this.txtFullPensionChildrenModel !== null) {
      if (this.txtFullPensionAdultModel !==0 || this.txtFullPensionChildrenModel !== 0) {
        this.swFullPensionModel = 1;
      }
    }
    this.txtAllIncludedChildrenModel = this.objArrCompo.all_included_children;
    this.txtAllIncludedAdultModel = this.objArrCompo.all_included_adult;
    if (this.txtAllIncludedAdultModel !==null || this.txtAllIncludedChildrenModel !== null) {
      if (this.txtAllIncludedAdultModel !==0 || this.txtAllIncludedChildrenModel !== 0) {
        this.swAllIncludedModel = 1;
      }
    }
  },
  data() {
    return {
      //DATOS DEL FORMULARIO
      componentID: this.idCompo + "" + this.objArrCompo.id,
      id: this.idCompo,
      noLast: false,
      countIdCompo: -1,
      prioritiesModel: ["Normal", "Media", "Alta"],
      propStartDate: null,
      propFinalDate: null,
      swOnlyRoomModel: null,
      ddwnPriorityModel: null,
      swBreakfastModel: 0,
      txtBreakfastAdultModel: null,
      txtBreakfastChildrenModel: null,
      swHalfPensionModel: 0,
      txtHalfPensionAdultModel: null,
      txtHalfPensionChildrenModel: null,
      swFullPensionModel: 0,
      txtFullPensionAdultModel: null,
      txtFullPensionChildrenModel: null,
      swAllIncludedModel: 0,
      txtAllIncludedAdultModel: null,
      txtAllIncludedChildrenModel: null,
      rules: {
        validNumericInputs: value => {
          const pattern = /^(1|[0-9]\d{0,3})$/
          return pattern.test(value) || 'Solo se aceptan numeros'
        },
      },
    };
  },
  computed: {
    ...mapState({
      regimes: (state) => state.HotelModule.regimes,
      errorsRegimes: (state) => state.HotelModule.errorsRegimes
    }),
    getStartDate() {
      return this.propStartDate;
    },
    getFinalDate() {
      return this.propFinalDate;
    },
    //Codigo para guardar temporalmente en el state
    computedSwOnlyRoom: {
      get() {
        return this.swOnlyRoomModel;
      },
      set(model) {
        this.swOnlyRoomModel = model;
        this.objArrCompo.only_room = this.swOnlyRoomModel;
        return this.swOnlyRoomModel;
      },
    },
    computedDdwnPriority: {
      get() {
        return this.ddwnPriorityModel;
      },
      set(model) {
        this.ddwnPriorityModel = model;
        if (this.ddwnPriorityModel == "Normal") {
          this.objArrCompo.priority = "normal";
        }
        if (this.ddwnPriorityModel == "Media") {
          this.objArrCompo.priority = "medium";
        }
        if (this.ddwnPriorityModel == "Alta") {
          this.objArrCompo.priority = "high";
        }
        return this.ddwnPriorityModel;
      },
    },
    computedSwBreakfast: {
      get() {
        return this.swBreakfastModel;
      },
      set(model) {
        this.swBreakfastModel = model;
        if(model == 0){
          this.txtBreakfastChildrenModel = 0;
          this.txtBreakfastAdultModel = 0;
          this.objArrCompo.lodging_breakfast_children = 0;
          this.objArrCompo.lodging_breakfast_adult = 0;
        }
        return this.swBreakfastModel;
      },
    },
    computedTxtBreakfastAdult: {
      get() {
        return this.txtBreakfastAdultModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtBreakfastAdultModel = model;
        this.objArrCompo.lodging_breakfast_adult = this.txtBreakfastAdultModel;
        return this.txtBreakfastAdultModel;
      },
    },
    computedTxtBreakfastChildren: {
      get() {
        return this.txtBreakfastChildrenModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtBreakfastChildrenModel = model;
        this.objArrCompo.lodging_breakfast_children = this.txtBreakfastChildrenModel;
        return this.txtBreakfastChildrenModel;
      },
    },
    computedSwHalfPension: {
      get() {
        return this.swHalfPensionModel;
      },
      set(model) {
        this.swHalfPensionModel = model;
        if(model == 0){
          this.txtHalfPensionChildrenModel = 0;
          this.txtHalfPensionAdultModel = 0;
          this.objArrCompo.half_pension_children = 0;
          this.objArrCompo.half_pension_adult = 0;
        }
        return this.swHalfPensionModel;
      },
    },
    computedTxtHalfPensionAdult: {
      get() {
        return this.txtHalfPensionAdultModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtHalfPensionAdultModel = model;
        this.objArrCompo.half_pension_adult = this.txtHalfPensionAdultModel;
        return this.txtHalfPensionAdultModel;
      },
    },
    computedTxtHalfPensionChildren: {
      get() {
        return this.txtHalfPensionChildrenModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtHalfPensionChildrenModel = model;
        this.objArrCompo.half_pension_children = this.txtHalfPensionChildrenModel;
        return this.txtHalfPensionChildrenModel;
      },
    },
    computedSwFullPension: {
      get() {
        return this.swFullPensionModel;
      },
      set(model) {
        this.swFullPensionModel = model;
        if(model == 0){
          this.txtFullPensionChildrenModel = 0;
          this.txtFullPensionAdultModel = 0;
          this.objArrCompo.full_pension_children = 0;
          this.objArrCompo.full_pension_adult = 0;
        }
        return this.swFullPensionModel;
      },
    },
    computedTxtFullPensionAdult: {
      get() {
        return this.txtFullPensionAdultModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtFullPensionAdultModel = model;
        this.objArrCompo.full_pension_adult = this.txtFullPensionAdultModel;
        return this.txtFullPensionAdultModel;
      },
    },
    computedTxtFullPensionChildren: {
      get() {
        return this.txtFullPensionChildrenModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtFullPensionChildrenModel = model;
        this.objArrCompo.full_pension_children = this.txtFullPensionChildrenModel;
        return this.txtFullPensionChildrenModel;
      },
    },
    computedSwAllIncluded: {
      get() {
        return this.swAllIncludedModel;
      },
      set(model) {
        this.swAllIncludedModel = model;
        if(model == 0){
          this.txtAllIncludedChildrenModel = 0;
          this.txtAllIncludedAdultModel = 0;
          this.objArrCompo.all_included_children = 0;
          this.objArrCompo.all_included_adult = 0;
        }
        return this.swAllIncludedModel;
      },
    },
    computedTxtAllIncludedAdult: {
      get() {
        return this.txtAllIncludedAdultModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtAllIncludedAdultModel = model;
        this.objArrCompo.all_included_adult = this.txtAllIncludedAdultModel;
        return this.txtAllIncludedAdultModel;
      },
    },
    computedTxtAllIncludedChildren: {
      get() {
        return this.txtAllIncludedChildrenModel;
      },
      set(model) {
        if(model != ""){
          model = parseInt(model)
        }
        this.txtAllIncludedChildrenModel = model;
        this.objArrCompo.all_included_children = this.txtAllIncludedChildrenModel;
        return this.txtAllIncludedChildrenModel;
      },
    },
    //CODIGO DE PROPIEDADES COMPUTADAS PARA ERRORES
    computedErrorOnlyRoom: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.only_room;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorPriority: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.priority;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorLodgingBreakfastAdult: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.lodging_breakfast_adult;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorLodgingBreakfastChildren: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.lodging_breakfast_children;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorHalfPensionAdult: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.half_pension_adult;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorHalfPensionChildren: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.half_pension_children;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorFullPensionAdult:{
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.full_pension_adult;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorFullPensionChildren:{
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.full_pension_children;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorAllIncludedAdult: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.all_included_adult;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorAllIncludedChildren: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRegime.componentID){
              error = itemErrorRegime.error.all_included_children;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
  },
  methods: {
    removeCompo(id) {
      this.$emit("removeCompo", id);
    },
    sendNewHour(newHour, info) {
      if (info === "Start") {
        this.objArrCompo.start_period = newHour + ":00";
        this.propStartDate.prop = this.objArrCompo.start_period;
      }
      if (info === "Final") {
        this.objArrCompo.final_period = newHour + ":00";
        this.propFinalDate.prop = this.objArrCompo.final_period;
      }
    },
  },
  components: {
    DateTimePicker,
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>