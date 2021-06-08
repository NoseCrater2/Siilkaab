<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div class="pa-3">
        <v-row :justify="$vuetify.breakpoint.smAndUp ? 'space-between': 'center'" :class="$vuetify.breakpoint.smAndUp ? 'px-4' : ''">
          <div><h2 class="font-weight-bold">Piscina #{{poolNumber+1}}</h2></div>
          <div>
            <v-btn
              small
              class="white--text"
              depressed
              color="red"
              @click="dialogAceptCancelRemovePool = true"
            >Eliminar piscina</v-btn>
          </div>
        </v-row>
        <br />
        <v-text-field v-model="computedPoolName" :error-messages="computedErrorPoolName" outlined label="Nombre de la piscina" required></v-text-field>
        <br />
        <v-row justify-xl="start" justify-lg="start" justify-md="start" justify="center" class="ml-xl-1 ml-lg-1 ml-xl-1 ml-md-1">
          <strong>Tipo de piscina</strong>
        </v-row>
        <v-row :justify="$vuetify.breakpoint.mdAndUp ? 'start' : 'center'" :class="$vuetify.breakpoint.mdAndUp ? 'ml-1' : ''">
          <v-radio-group :error="computedErrorRadioPoolType != '' ? true : false" v-model="computedRadioPoolType">
            <v-radio label="Interior" value="indoor"></v-radio>
            <v-radio label="Al aire libre" value="outdoor"></v-radio>
          </v-radio-group>
          <div v-if="computedErrorRadioPoolType != ''" class="mt-n2">
                <span class="red--text text-caption">Debe seleccionarse un tipo de piscina</span>
            </div>
        </v-row>
        <br />
        <v-row justify-xl="start" justify-lg="start" justify-md="start" justify="center" class="ml-xl-1 ml-lg-1 ml-md-1">
          <div class="font-weight-bold">Otros</div>
        </v-row>
        <v-row>
          <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
            <v-card outlined class="d-flex align-center justify-space-between px-3 py-5" color="#e0e0e0">
              <span class="mr-2">
                <strong>Aire acondicionado</strong>
              </span>
              <v-switch v-model="computedSwAirConditioned" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
            <v-card outlined class="d-flex align-center justify-space-between px-3 py-5" color="#e0e0e0">
              <span class="mr-2">
                <strong>Vista panorámica</strong>
              </span>
              <v-switch v-model="computedSwPanoramicView" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
            <v-card outlined class="d-flex align-center justify-space-between px-3 py-5" color="#e0e0e0">
              <span class="mr-2">
                <strong>Chapoteadero</strong>
              </span>
              <v-switch v-model="computedSwWadingPool" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
            <v-card outlined class="d-flex align-center justify-space-between px-3 py-5" color="#e0e0e0">
              <span class="mr-2">
                <strong>Toallas</strong>
              </span>
              <v-switch v-model="computedSwTowels" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
            <v-card outlined class="d-flex align-center justify-space-between px-3 py-5" color="#e0e0e0">
              <span class="mr-2">
                <strong>Pool bar</strong>
              </span>
              <v-switch v-model="computedSwBarPool" inset></v-switch>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <br />
        <v-row justify-xl="start" justify-lg="start" justify-md="start" justify="center" class="ml-xl-1 ml-lg-1 ml-md-1">
          <div class="font-weight-bold">Horario de apertura</div>
        </v-row>
        <br />
        <v-row class="mt-n6">
          <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
            <v-dialog
              ref="dialogHourOpen"
              v-model="modalHourOpen"
              :return-value.sync="computedHourOpen"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                outlined
                :error-messages="computedErrorHourOpen"
                  :items="[computedHourOpen]"
                  v-model="computedHourOpen"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  label="Desde las"
                  filled
                ></v-autocomplete>
              </template>
              <v-time-picker v-if="modalHourOpen" v-model="computedHourOpen" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHourOpen = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHourOpen.save(computedHourOpen)">Aceptar</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
            <v-dialog
              ref="dialogHourClose"
              v-model="modalHourClose"
              :return-value.sync="computedHourClose"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                outlined
                :error-messages="computedErrorHourClose"
                  :items="[computedHourClose]"
                  v-model="computedHourClose"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  label="Hasta las"
                  filled
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
        <v-row justify="center">
          <v-dialog
            v-model="dialogAceptCancelRemovePool"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                ¿Eliminar piscina?
              </v-card-title>
              <v-card-text>Al aceptar, esta piscina se eliminará.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="dialogAceptCancelRemovePool = false"
                >
                  CANCELAR
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="btnApplyRemovePool()"
                >
                  ACEPTAR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
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
        dialogAceptCancelRemovePool: false,
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
    btnApplyRemovePool(){
        this.dialogAceptCancelRemovePool = false;
        this.removeCompo(this.id);
    },
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
