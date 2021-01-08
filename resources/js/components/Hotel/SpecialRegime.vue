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
        <v-switch v-model="computedSwOnlyRoom" inset label="Solo habitacion"></v-switch>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <v-select
          :items="prioritiesModel"
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
          v-model="computedTxtBreakfastAdult"
          prepend-inner-icon="mdi-human-male"
          label="Adulto"
          outlined
          required
          :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtBreakfastChildren"
          prepend-inner-icon="mdi-human-male-boy"
          label="Niño"
          outlined
          required
          :disabled="computedSwBreakfast == 0 || computedSwBreakfast == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <v-switch v-model="computedSwHalfPension" inset label="Media pension"></v-switch>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtHalfPensionAdult"
          prepend-inner-icon="mdi-human-male"
          label="Adulto"
          outlined
          required
          :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtHalfPensionChildren"
          prepend-inner-icon="mdi-human-male-boy"
          label="Niño"
          outlined
          required
          :disabled="computedSwHalfPension == 0 || computedSwHalfPension == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <v-switch v-model="computedSwFullPension" inset label="Pension completa"></v-switch>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtFullPensionAdult"
          prepend-inner-icon="mdi-human-male"
          label="Adulto"
          outlined
          required
          :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtFullPensionChildren"
          prepend-inner-icon="mdi-human-male-boy"
          label="Niño"
          outlined
          required
          :disabled="computedSwFullPension == 0 || computedSwFullPension == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <v-switch v-model="computedSwAllIncluded" inset label="Todo incluido"></v-switch>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtAllIncludedAdult"
          prepend-inner-icon="mdi-human-male"
          label="Adulto"
          outlined
          required
          :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="12" xs="12">
        <v-text-field
          v-model="computedTxtAllIncludedChildren"
          prepend-inner-icon="mdi-human-male-boy"
          label="Niño"
          outlined
          required
          :disabled="computedSwAllIncluded == 0 || computedSwAllIncluded == false"
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
    };
  },
  computed: {
    ...mapState({
      regimes: (state) => state.HotelModule.regimes,
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
        this.txtAllIncludedChildrenModel = model;
        this.objArrCompo.all_included_children = this.txtAllIncludedChildrenModel;
        return this.txtAllIncludedChildrenModel;
      },
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