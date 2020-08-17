<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--CONDICIONES-->
      <v-banner single-line>
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-gavel</v-icon>
          <h3>Condiciones</h3>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="6">
          <v-switch v-model="computedAdults" inset label="Solo adultos"></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="computedChildrenAge" label="Niño desde" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="computedAdultsRegimen" label="Regimen adulto desde" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="computedAdultsAge" label="Adulto desde" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
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
                prepend-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                required
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
        <v-col cols="12" md="6">
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
                prepend-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                required
              ></v-text-field>
            </template>
            <v-time-picker v-if="modalCheckout" v-model="checkoutTimeModel" format="24hr" full-width>
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
        <div class="flexed">
          <v-icon class="iconsInformation" left>mdi-text</v-icon>
          <h3>Textos de condiciones</h3>
        </div>
      </v-banner>
      <div class="pa-4">
        <v-col cols="12" sm="6" md="12">
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
      this.adultsModel = this.conditions.adults;
      this.childrenAgeModel = this.conditions.children_age;
      this.adultsRegimenModel = this.conditions.adults_regimen;
      this.adultsAgeModel = this.conditions.adults_age;
      this.checkinTimeModel = (this.conditions.checkin_time.length === 5) ? this.conditions.checkin_time : this.conditions.checkin_time.slice(0, -3);
      this.checkoutTimeModel = (this.conditions.checkout_time.length === 5) ? this.conditions.checkout_time : this.conditions.checkout_time.slice(0, -3);
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
        this.conditions.children_age= this.childrenAgeModel;
        return this.childrenAgeModel;
      },
    },
    computedAdultsRegimen: {
      get() {
        return this.adultsRegimenModel;
      },
      set(model) {
        this.adultsRegimenModel = model;
        this.conditions.adults_regimen= this.adultsRegimenModel;
        return this.adultsRegimenModel;
      },
    },
    computedAdultsAge: {
      get() {
        return this.adultsAgeModel;
      },
      set(model) {
        this.adultsAgeModel = model;
        this.conditions.adults_age= this.adultsAgeModel;
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