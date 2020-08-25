<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--REGIMENES-->
      <v-banner single-line>
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-silverware-fork-knife</v-icon>
          <h3>Regimenes</h3>
        </div>
      </v-banner>
      <v-row class="pa-6">
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
      <v-banner single-line>
        <!--PERIODOS REGIMENES-->
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-calendar-month</v-icon>
          <h3>Periodos especiales de regimenes</h3>
        </div>
      </v-banner>
      <v-row class="pa-6">
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

export default {
  name: "Regime",
  created() {
    let countWhile = 1;
    while (countWhile <= this.regimes.length - 1) {
      this.addCompo(this.regimes[countWhile]);
      countWhile++;
    }
    if (this.regimes[0] != null) {
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
      if (this.txtBreakfastChildrenModel !== null) {
        if (this.txtBreakfastChildrenModel !== "") {
          this.swBreakfastModel = 1;
        }
      }
      this.txtHalfPensionChildrenModel = this.regimes[0].half_pension_children;
      this.txtHalfPensionAdultModel = this.regimes[0].half_pension_adult;
      if (this.txtHalfPensionChildrenModel !== null) {
        if (this.txtHalfPensionChildrenModel !== "") {
          this.swHalfPensionModel = 1;
        }
      }
      this.txtFullPensionChildrenModel = this.regimes[0].full_pension_children;
      this.txtFullPensionAdultModel = this.regimes[0].full_pension_adult;
      if (this.txtFullPensionChildrenModel !== null) {
        if (this.txtFullPensionChildrenModel !== "") {
          this.swFullPensionModel = 1;
        }
      }
      this.txtAllIncludedChildrenModel = this.regimes[0].all_included_children;
      this.txtAllIncludedAdultModel = this.regimes[0].all_included_adult;
      if (this.txtAllIncludedChildrenModel !== null) {
        if (this.txtAllIncludedChildrenModel !== "") {
          this.swAllIncludedModel = 1;
        }
      }
    }
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      prioritiesModel: ["Normal", "Media", "Alta"],
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
      hotel: (state) => state.HotelModule.hotel,
      regimes: (state) => state.HotelModule.regimes,
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
        return this.swBreakfastModel;
      },
    },
    computedTxtBreakfastAdult: {
      get() {
        return this.txtBreakfastAdultModel;
      },
      set(model) {
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
        return this.swHalfPensionModel;
      },
    },
    computedTxtHalfPensionAdult: {
      get() {
        return this.txtHalfPensionAdultModel;
      },
      set(model) {
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
        return this.swFullPensionModel;
      },
    },
    computedTxtFullPensionAdult: {
      get() {
        return this.txtFullPensionAdultModel;
      },
      set(model) {
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
        return this.swAllIncludedModel;
      },
    },
    computedTxtAllIncludedAdult: {
      get() {
        return this.txtAllIncludedAdultModel;
      },
      set(model) {
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
          priority: "normal",
          only_room: 0,
          start_period:
            new Date(Date.now()).toISOString().slice(0, -14) + " 00:00:00",
          final_period:
            new Date(Date.now()).toISOString().slice(0, -14) + " 00:00:00",
          lodging_breakfast_children: null,
          lodging_breakfast_adult: null,
          half_pension_children: null,
          half_pension_adult: null,
          full_pension_children: null,
          full_pension_adult: null,
          all_included_children: null,
          all_included_adult: null,
          hotel_id: null,
        },
      });
      this.regimes.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
    },
    addCompo(obj) {
      this.countIdCompo++;
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
      this.setArrayRegimes([].concat(this.regimes, this.arrayComponents.map(el => el.objArrCompo)));
    },
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