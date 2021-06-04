<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div style="padding: 2%">
        <v-row class="ml-1 d-flex">
          <span>
            <h2>
              <strong>Piscina #{{poolNumber+1}}</strong>
            </h2>
          </span>
          <div class="ml-auto mr-2">
            <v-btn
              small
              class="white--text"
              depressed
              color="red"
              @click="removeCompo(id)"
            >Eliminar piscina</v-btn>
          </div>
        </v-row>
        <br />
        <v-text-field v-model="computedPoolName" :error-messages="computedErrorPoolName" outlined label="Nombre de la piscina" required></v-text-field>
        <br />
        <span>
          <strong>Tipo de piscina</strong>
        </span>
        <v-row class="mb-n3" justify="space-around">
          <v-radio-group :error="computedErrorRadioPoolType != '' ? true : false" v-model="computedRadioPoolType" row>
            <v-radio label="Interior" value="indoor"></v-radio>
            <v-radio label="Al aire libre" value="outdoor"></v-radio>
          </v-radio-group>
          <div v-if="computedErrorRadioPoolType != ''" class="mt-n2">
                <span class="red--text text-caption">Debe seleccionarse un tipo de piscina</span>
            </div>
        </v-row>
        <br />
        <span>
          <strong>Otros</strong>
        </span>
        <v-row>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Aire acondicionado</strong>
              </span>
              <v-switch class="ml-auto" v-model="computedSwAirConditioned" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Vista panorámica</strong>
              </span>
              <v-switch class="ml-auto" v-model="computedSwPanoramicView" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Chapoteadero</strong>
              </span>
              <v-switch class="ml-auto" v-model="computedSwWadingPool" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Toallas</strong>
              </span>
              <v-switch class="ml-auto" v-model="computedSwTowels" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Pool bar</strong>
              </span>
              <v-switch class="ml-auto" v-model="computedSwBarPool" inset></v-switch>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <br />
        <v-row class="ml-1 mt-n6" align="center">
          <span>
            <strong>Horario de apertura</strong>
          </span>
        </v-row>
        <br />
        <v-row class="mt-n6">
          <v-col md="12" class="d-flex">
            <v-dialog
              ref="dialogHourOpen"
              v-model="modalHourOpen"
              :return-value.sync="computedHourOpen"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                :error-messages="computedErrorHourOpen"
                  :items="[computedHourOpen]"
                  v-model="computedHourOpen"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  dense
                  label="Desde las"
                  filled
                  style="margin-right: 2%"
                  class="col-6"
                ></v-autocomplete>
              </template>
              <v-time-picker v-if="modalHourOpen" v-model="computedHourOpen" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHourOpen = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHourOpen.save(computedHourOpen)">Aceptar</v-btn>
              </v-time-picker>
            </v-dialog>
            <v-dialog
              ref="dialogHourClose"
              v-model="modalHourClose"
              :return-value.sync="computedHourClose"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                :error-messages="computedErrorHourClose"
                  :items="[computedHourClose]"
                  v-model="computedHourClose"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  dense
                  label="Hasta las"
                  filled
                  style="margin-right: 2%"
                  class="col-6"
                ></v-autocomplete>
              </template>
              <v-time-picker v-if="modalHourClose" v-model="computedHourClose" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHourClose = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHourClose.save(computedHourClose)">Aceptar</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DynamicPool",
  created() {
    if (this.objArrCompo != null) {
        //componentID es utilizado como key unica para el proceso de muestra de errores
      this.objArrCompo.componentID = this.componentID;

      if (this.objArrCompo.name != null) {
        this.poolNameModel = this.objArrCompo.name;
      }

      if (this.objArrCompo.type != null) {
        if (this.objArrCompo.type == "indoor") {
          this.radioPoolTypeModel = this.objArrCompo.type;
        }
        if (this.objArrCompo.type == "outdoor") {
          this.radioPoolTypeModel = this.objArrCompo.type;
        }
      }

      if (this.objArrCompo.air_conditioned != null) {
        this.swAirConditionedModel = this.objArrCompo.air_conditioned;
      }

      if (this.objArrCompo.panoramic_view != null) {
        this.swPanoramicViewModel = this.objArrCompo.panoramic_view;
      }

      if (this.objArrCompo.wading_pool != null) {
        this.swWadingPoolModel = this.objArrCompo.wading_pool;
      }
      if (this.objArrCompo.towels != null) {
        this.swTowelsModel = this.objArrCompo.towels;
      }
      if (this.objArrCompo.bar_pool != null) {
        this.swBarPoolModel = this.objArrCompo.bar_pool;
      }
      if (this.objArrCompo.open_at != null) {
        this.hourOpenModel = this.objArrCompo.open_at.slice(0, -3);
      }
      if (this.objArrCompo.close_at != null) {
        this.hourCloseModel = this.objArrCompo.close_at.slice(0, -3);
      }
    }
  },
  data() {
    return {
        componentID: this.idCompo + "" + this.objArrCompo.id,
        id: this.idCompo,
        arrayComponents: [],
        countIdCompo: -1,
        poolNameModel: null,
        radioPoolTypeModel: null,
        swAirConditionedModel: 0,
        swPanoramicViewModel: 0,
        swWadingPoolModel: 0,
        swTowelsModel: 0,
        swBarPoolModel: 0,
        hourOpenModel: null,
        modalHourOpen: false,
        hourCloseModel: null,
        modalHourClose: false,
    };
  },
  computed: {
    ...mapState({
      pools: (state) => state.HotelModule.pools,
      errorsPools: (state) => state.HotelModule.errorsPools
    }),
    computedPoolName: {
      get() {
        return this.poolNameModel;
      },
      set(model) {
        this.poolNameModel = model;
        this.objArrCompo.name = this.poolNameModel;
        return this.poolNameModel;
      },
    },
    computedRadioPoolType: {
      get() {
        return this.radioPoolTypeModel;
      },
      set(model) {
        this.radioPoolTypeModel = model;
        this.objArrCompo.type = this.radioPoolTypeModel;
        return this.radioPoolTypeModel;
      },
    },
    computedSwAirConditioned: {
      get() {
        return this.swAirConditionedModel;
      },
      set(model) {
        this.swAirConditionedModel = model;
        this.objArrCompo.air_conditioned = this.swAirConditionedModel;
        return this.swAirConditionedModel;
      },
    },
    computedSwPanoramicView: {
      get() {
        return this.swPanoramicViewModel;
      },
      set(model) {
        this.swPanoramicViewModel = model;
        this.objArrCompo.panoramic_view = this.swPanoramicViewModel;
        return this.swPanoramicViewModel;
      },
    },
    computedSwWadingPool: {
      get() {
        return this.swWadingPoolModel;
      },
      set(model) {
        this.swWadingPoolModel = model;
        this.objArrCompo.wading_pool = this.swWadingPoolModel;
        return this.swWadingPoolModel;
      },
    },
    computedSwTowels: {
      get() {
        return this.swTowelsModel;
      },
      set(model) {
        this.swTowelsModel = model;
        this.objArrCompo.towels = this.swTowelsModel;
        return this.swTowelsModel;
      },
    },
    computedSwBarPool: {
      get() {
        return this.swBarPoolModel;
      },
      set(model) {
        this.swBarPoolModel = model;
        this.objArrCompo.bar_pool = this.swBarPoolModel;
        return this.swBarPoolModel;
      },
    },
    computedHourOpen: {
      get() {
        return this.hourOpenModel;
      },
      set(model) {
        this.hourOpenModel = model;
        this.objArrCompo.open_at = this.hourOpenModel;
        return this.hourOpenModel;
      },
    },
    computedHourClose: {
      get() {
        return this.hourCloseModel;
      },
      set(model) {
        this.hourCloseModel = model;
        this.objArrCompo.close_at = this.hourCloseModel;
        return this.hourCloseModel;
      },
    },
    computedErrorPoolName: {
      get() {
        let error = '';
        this.errorsPools.forEach((itemErrorPool)=>{
          if(typeof(itemErrorPool.error.name) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorPool.componentID){
              error = itemErrorPool.error.name;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorRadioPoolType: {
      get() {
        let error = '';
        this.errorsPools.forEach((itemErrorPool)=>{
          if(typeof(itemErrorPool.error.type) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorPool.componentID){
              error = itemErrorPool.error.type;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorHourOpen: {
      get() {
        let error = '';
        this.errorsPools.forEach((itemErrorPool)=>{
          if(typeof(itemErrorPool.error.open_at) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorPool.componentID){
              error = itemErrorPool.error.open_at;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorHourClose: {
      get() {
        let error = '';
        this.errorsPools.forEach((itemErrorPool)=>{
          if(typeof(itemErrorPool.error.close_at) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorPool.componentID){
              error = itemErrorPool.error.close_at;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    }
  },
  methods: {
    removeCompo(id) {
      this.$emit("removeCompo", id);
    },
  },
  props: {
    idCompo: Number,
    idPool: {
      type: [ Number, String ]
    },
    idCompoPool: String,
    poolNumber: Number,
    objArrCompo: Object,
  },
};
</script>

<style scoped>
/*Estilo para el scroll del carousel*/
.v-sheet {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
