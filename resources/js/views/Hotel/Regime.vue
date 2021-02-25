<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--REGIMENES-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-silverware-fork-knife</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">REGIMENES</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-switch :error-messages="computedErrorOnlyRoom" v-model="computedSwOnlyRoom" inset label="Solo habitacion"></v-switch>
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
          <v-switch v-model="computedSwBreakfast" inset label="Alojamiento y desayuno"></v-switch>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtBreakfastAdult"
            prepend-inner-icon="mdi-human-male"
            label="Adulto"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
            :error-messages="computedErrorLodgingBreakfastAdult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtBreakfastChildren"
            prepend-inner-icon="mdi-human-male-boy"
            label="Niño"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
            :error-messages="computedErrorLodgingBreakfastChildren"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-switch v-model="computedSwHalfPension" inset label="Media pension"></v-switch>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtHalfPensionAdult"
            prepend-inner-icon="mdi-human-male"
            label="Adulto"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
            :error-messages="computedErrorHalfPensionAdult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtHalfPensionChildren"
            prepend-inner-icon="mdi-human-male-boy"
            label="Niño"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
            :error-messages="computedErrorHalfPensionChildren"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-switch v-model="computedSwFullPension" inset label="Pension completa"></v-switch>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtFullPensionAdult"
            prepend-inner-icon="mdi-human-male"
            label="Adulto"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
            :error-messages="computedErrorFullPensionAdult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtFullPensionChildren"
            prepend-inner-icon="mdi-human-male-boy"
            label="Niño"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
            :error-messages="computedErrorFullPensionChildren"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-switch v-model="computedSwAllIncluded" inset label="Todo incluido"></v-switch>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtAllIncludedAdult"
            prepend-inner-icon="mdi-human-male"
            label="Adulto"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
            :error-messages="computedErrorAllIncludedAdult"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-text-field
            v-model.number="computedTxtAllIncludedChildren"
            prepend-inner-icon="mdi-human-male-boy"
            label="Niño"
            outlined
            required
            maxlength="3"
            @keydown="keyhandler" :rules="[rules.validNumericInputs]"
            :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
            :error-messages="computedErrorAllIncludedChildren"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-banner single-line>
        <!--PERIODOS REGIMENES-->
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-calendar-month</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">PERIODOS ESPECIALES DE REGIMENES</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6 mx-1">
        <span>
          Puedes añadir periodos de regimenes especiales.
          Si un regimen no esta disponible para todas las fechas de la reserva, no
          se aplicará
        </span>
      </v-row>
      <!--ETIQUETA SpecialRegime.vue-->
      <component
        v-for="(component) in computedArrayComponents"
        :idCompo="component.idCompo"
        :key="component.idCompo"
        :objArrCompo="component.objArrCompo"
        :is="component.TagSRegimes"
        @removeCompo="removeCompo"
      ></component>
      <v-row class="pa-6">
        <v-btn small color="info" class="white--text" depressed @click="addCompoButton()">
          <v-icon left dark>mdi-plus-circle</v-icon>Agregar
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import SpecialRegime from "../../components/Hotel/SpecialRegime";

import { mapState, mapMutations } from "vuex";

import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment); //Extendemos moment.js con los rangos
moment.locale("es"); //Cambiamos el lenguaje de moment

export default {
  name: "Regime",
  created() {
    let countWhile = this.regimes.length - 1;
    while (countWhile >= 1) {
      this.addCompo(this.regimes[countWhile]);
      countWhile--;
    }
    if (this.regimes[0] != null) {
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    }
    else{
      this.fillModel();
    }
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      prioritiesModel: ["Normal", "Media", "Alta"],
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
      hotel: (state) => state.HotelModule.hotel,
      regimes: (state) => state.HotelModule.regimes,
      errorsRegimes: (state) => state.HotelModule.errorsRegimes
    }),
    //Codigo para guardar temporalmente en el state
    computedSwOnlyRoom: {
      get() {
        return this.swOnlyRoomModel;
      },
      set(model) {
        this.swOnlyRoomModel = model;
        this.regimes[0].only_room = this.swOnlyRoomModel;
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
          this.regimes[0].priority = "normal";
        }
        if (this.ddwnPriorityModel == "Media") {
          this.regimes[0].priority = "medium";
        }
        if (this.ddwnPriorityModel == "Alta") {
          this.regimes[0].priority = "high";
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
          this.regimes[0].lodging_breakfast_children = 0;
          this.regimes[0].lodging_breakfast_adult = 0;
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
        this.regimes[0].lodging_breakfast_adult = this.txtBreakfastAdultModel;
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
        this.regimes[0].lodging_breakfast_children = this.txtBreakfastChildrenModel;
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
          this.regimes[0].half_pension_children = 0;
          this.regimes[0].half_pension_adult = 0;
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
        this.regimes[0].half_pension_adult = this.txtHalfPensionAdultModel;
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
        this.regimes[0].half_pension_children = this.txtHalfPensionChildrenModel;
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
          this.regimes[0].full_pension_children = 0;
          this.regimes[0].full_pension_adult = 0;
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
        this.regimes[0].full_pension_adult = this.txtFullPensionAdultModel;
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
        this.regimes[0].full_pension_children = this.txtFullPensionChildrenModel;
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
          this.regimes[0].all_included_children = 0;
          this.regimes[0].all_included_adult = 0;
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
        this.regimes[0].all_included_adult = this.txtAllIncludedAdultModel;
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
        this.regimes[0].all_included_children = this.txtAllIncludedChildrenModel;
        return this.txtAllIncludedChildrenModel;
      },
    },
    //Propiedad computada para asignar al store los arreglos dinamicos que se crearan con btnAddCompo
    computedRegimes: {
      get() {
        return this.regimes;
      },
      set(model) {
        this.regimes = model;
        return this.regimes;
      },
    },
    computedArrayComponents() {
      return this.arrayComponents;
    },
    //CODIGO DE PROPIEDADES COMPUTADAS PARA ERRORES
    computedErrorOnlyRoom: {
      get() {
        let error = '';
        this.errorsRegimes.forEach((itemErrorRegime)=>{
          if(typeof(itemErrorRegime) != 'undefined'){
            if(this.regimes[0].id == itemErrorRegime.idRegimes || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegimes || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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
            if(this.regimes[0].id == itemErrorRegime.idRegime || this.regimes[0].id == 'firstRegister'){
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

  components: {
    SpecialRegime,
  },
  methods: {
    //Esta mutacion setea regimes
    ...mapMutations(["setArrayRegimes"]),
    addCompoButton() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSRegimes: SpecialRegime,
        objArrCompo: {
          id: "NEW", //Se pone "NEW" para identificarlo en el posterior metodo PUT
          idCompo: this.countIdCompo,
          priority: "normal",
          only_room: 0,
          start_period: moment().format("YYYY-MM-DD") + " 00:00:00",
          final_period: moment().format("YYYY-MM-DD") + " 00:00:00", //new Date(Date.now()).toISOString().slice(0, -14) + " 00:00:00"
          lodging_breakfast_children: 0,
          lodging_breakfast_adult: 0,
          half_pension_children: 0,
          half_pension_adult: 0,
          full_pension_children: 0,
          full_pension_adult: 0,
          all_included_children: 0,
          all_included_adult: 0,
          hotel_id: 0,
        },
      });
      this.regimes.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
    },
    addCompo(obj) {
      this.countIdCompo++;
      obj.idCompo = this.countIdCompo;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSRegimes: SpecialRegime,
        objArrCompo: obj,
      });
    },
    removeCompo(idCompoParam) {
      let tempArray = this.regimes[0];
      //Mandamos el arreglo temporal que se seteara en la variable state "regimes"
      this.setArrayRegimes([tempArray]);

      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);

      this.arrayComponents.splice(idCompoMap, 1);

      //Mandamos el nuevo arreglo de esta manera
      //En un array anonimo concatenamos el arreglo actual regimes y
      //this.arrayComponents
      this.setArrayRegimes(
        [].concat(
          this.regimes,
          this.arrayComponents.map((el) => el.objArrCompo)
        )
      );
    },
    //Metodo para llenar la vista con los datos
    fillModel(){
      //Con el if principal verifica si hay al menos un regimen o si es un nuevo registro
      if(typeof(this.regimes[0]) != 'undefined'){
        this.swOnlyRoomModel = this.regimes[0].only_room;
        if (this.regimes[0].priority != null) {
          if (this.regimes[0].priority == "normal") {
            this.ddwnPriorityModel = "Normal";
          }
          if (this.regimes[0].priority == "medium") {
            this.ddwnPriorityModel = "Media";
          }
          if (this.regimes[0].priority == "high") {
            this.ddwnPriorityModel = "Alta";
          }
        }
        this.txtBreakfastChildrenModel = this.regimes[0].lodging_breakfast_children;
        this.txtBreakfastAdultModel = this.regimes[0].lodging_breakfast_adult;
        if (this.txtBreakfastAdultModel != null || this.txtBreakfastChildrenModel != null) {
          if (this.txtBreakfastAdultModel != 0 || this.txtBreakfastChildrenModel != 0) {
            this.swBreakfastModel = 1;
          }
        }
        this.txtHalfPensionChildrenModel = this.regimes[0].half_pension_children;
        this.txtHalfPensionAdultModel = this.regimes[0].half_pension_adult;
        if (this.txtHalfPensionAdultModel != null || this.txtHalfPensionChildrenModel != null) {
          if (this.txtHalfPensionAdultModel !=0 || this.txtHalfPensionChildrenModel != 0) {
            this.swHalfPensionModel = 1;
          }
        }
        this.txtFullPensionChildrenModel = this.regimes[0].full_pension_children;
        this.txtFullPensionAdultModel = this.regimes[0].full_pension_adult;
        if (this.txtFullPensionAdultModel != null || this.txtFullPensionChildrenModel != null) {
          if (this.txtFullPensionAdultModel != 0 || this.txtFullPensionChildrenModel != 0) {
            this.swFullPensionModel = 1;
          }
        }
        this.txtAllIncludedChildrenModel = this.regimes[0].all_included_children;
        this.txtAllIncludedAdultModel = this.regimes[0].all_included_adult;
        if (this.txtAllIncludedAdultModel !=null || this.txtAllIncludedChildrenModel != null) {
          if (this.txtAllIncludedAdultModel !=0 || this.txtAllIncludedChildrenModel != 0) {
            this.swAllIncludedModel = 1;
          }
        }
      }
      else{
        let obj = {
          id: "firstRegister",
          priority: "normal",
          only_room: 0,
          lodging_breakfast_children: 0,
          lodging_breakfast_adult: 0,
          half_pension_children: 0,
          half_pension_adult: 0,
          full_pension_children: 0,
          full_pension_adult: 0,
          all_included_children: 0,
          all_included_adult: 0,
          hotel_id: null
        }
        this.regimes.push(obj);
        this.ddwnPriorityModel = "Normal";
        this.swOnlyRoomModel = this.regimes[0].only_room;
        this.swBreakfastModel = 0;
        this.swHalfPensionModel = 0;
        this.swFullPensionModel = 0;
        this.swAllIncludedModel = 0;
        this.txtBreakfastChildrenModel = this.regimes[0].lodging_breakfast_children;
        this.txtBreakfastAdultModel = this.regimes[0].lodging_breakfast_adult;
        this.txtHalfPensionChildrenModel = this.regimes[0].half_pension_children;
        this.txtHalfPensionAdultModel = this.regimes[0].half_pension_adult;
        this.txtFullPensionChildrenModel = this.regimes[0].full_pension_children;
        this.txtFullPensionAdultModel = this.regimes[0].full_pension_adult;
        this.txtAllIncludedChildrenModel = this.regimes[0].all_included_children;
        this.txtAllIncludedAdultModel = this.regimes[0].all_included_adult;
      }
    },
    keyhandler(event) {
      const pattern = /^(1|[0-9]\d{0,3})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        console.log(event.key)
        event.preventDefault();
      }
    }
  },
};
</script>