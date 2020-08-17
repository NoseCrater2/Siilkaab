<template>
  <div>
    <v-row class="pa-6 mt-n2">
      <v-row align="center">
        <v-col cols="1" md="3">
          <v-btn small color="red" class="white--text mt-1" depressed @click="removeCompo(id)">
            <v-icon left dark>mdi-close-circle</v-icon>Eliminar
          </v-btn>
        </v-col>
        <!--MENU DESDE-->
        <v-col cols="12" md="4">
          <DateTimePicker :dates="getStartDate"></DateTimePicker>
        </v-col>

        <!--MENU HASTA-->
        <v-col cols="12" md="4">
          <DateTimePicker :dates="getFinalDate"></DateTimePicker>
        </v-col>
      </v-row>
      <v-col cols="12" md="5">
        <v-switch v-model="computedSwOnlyRoom" inset label="Solo habitacion"></v-switch>
      </v-col>
      <v-col cols="2" md="6">
        <v-autocomplete
          :items="prioritiesModel"
          v-model="computedDdwnPriority"
          dense
          filled
          label="Prioridad"
        ></v-autocomplete>
      </v-col>
      <v-row align="center">
        <v-col cols="12" md="5">
          <v-switch v-model="computedSwBreakfast" inset label="Alojamiento y desayuno"></v-switch>
        </v-col>
        <v-col cols="2" md="3">
          <v-text-field v-model="computedTxtBreakfastAdult" label="Adulto" required></v-text-field>
        </v-col>
        <v-col cols="2" md="3">
          <v-text-field v-model="computedTxtBreakfastChildren" label="Niño" required></v-text-field>
        </v-col>
      </v-row>

      <v-col cols="12" md="5">
        <v-switch v-model="computedSwHalfPension" inset label="Media pension"></v-switch>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtHalfPensionAdult" label="Adulto" required></v-text-field>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtHalfPensionChildren" label="Niño" required></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <v-switch v-model="computedSwFullPension" inset label="Pension completa"></v-switch>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtFullPensionAdult" label="Adulto" required></v-text-field>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtFullPensionChildren" label="Niño" required></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <v-switch v-model="computedSwAllIncluded" inset label="Todo incluido"></v-switch>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtAllIncludedAdult" label="Adulto" required></v-text-field>
      </v-col>
      <v-col cols="2" md="3">
        <v-text-field v-model="computedTxtAllIncludedChildren" label="Niño" required></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DateTimePicker from "../DateTimePicker/DateTimePicker";

export default {
  name: "SpecialRegime",
  created() {
    if (
      this.objArrCompo.start_period != null &&
      this.objArrCompo.final_period != null
    ) {
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
    if (this.txtBreakfastChildrenModel !== null) {
      if (this.txtBreakfastChildrenModel !== "") {
        this.swBreakfastModel = 1;
      }
    }
    this.txtHalfPensionChildrenModel = this.objArrCompo.half_pension_children;
    this.txtHalfPensionAdultModel = this.objArrCompo.half_pension_adult;
    if (this.txtHalfPensionChildrenModel !== null) {
      if (this.txtHalfPensionChildrenModel !== "") {
        this.swHalfPensionModel = 1;
      }
    }
    this.txtFullPensionChildrenModel = this.objArrCompo.full_pension_children;
    this.txtFullPensionAdultModel = this.objArrCompo.full_pension_adult;
    if (this.txtFullPensionChildrenModel !== null) {
      if (this.txtFullPensionChildrenModel !== "") {
        this.swFullPensionModel = 1;
      }
    }
    this.txtAllIncludedChildrenModel = this.objArrCompo.all_included_children;
    this.txtAllIncludedAdultModel = this.objArrCompo.all_included_adult;
    if (this.txtAllIncludedChildrenModel !== null) {
      if (this.txtAllIncludedChildrenModel !== "") {
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
      swBreakfastModel: null,
      txtBreakfastAdultModel: null,
      txtBreakfastChildrenModel: null,
      swHalfPensionModel: null,
      txtHalfPensionAdultModel: null,
      txtHalfPensionChildrenModel: null,
      swFullPensionModel: null,
      txtFullPensionAdultModel: null,
      txtFullPensionChildrenModel: null,
      swAllIncludedModel: null,
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