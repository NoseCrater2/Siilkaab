<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div style="padding: 2%">
        <v-row class="ml-1 d-flex">
          <span>
            <h2>
              <strong>Piscina #{{idCompo+1}}</strong>
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
        <v-text-field v-model="poolName" label="Nombre de la piscina" required></v-text-field>
        <br />
        <span>
          <strong>Tipo de piscina</strong>
        </span>
        <v-row class="mb-n3" justify="space-around">
          <v-radio-group v-model="radioPoolType" row>
            <v-radio label="Interior" value="indoor"></v-radio>
            <v-radio label="Al aire libre" value="outdoor"></v-radio>
          </v-radio-group>
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
              <v-switch class="ml-auto" v-model="swAirConditioned" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Vista panorámica</strong>
              </span>
              <v-switch class="ml-auto" v-model="swPanoramicView" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Chapoteadero</strong>
              </span>
              <v-switch class="ml-auto" v-model="swWadingPool" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Toallas</strong>
              </span>
              <v-switch class="ml-auto" v-model="swTowels" inset></v-switch>
            </v-card>
          </v-col>
          <v-col cols="6" style="margin-bottom: 1%">
            <v-card outlined style="padding: 5%; display: flex" color="#e0e0e0">
              <span class="d-flex align-center" style="margin-right: 5%">
                <strong>Pool bar</strong>
              </span>
              <v-switch class="ml-auto" v-model="swBarPool" inset></v-switch>
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
              :return-value.sync="hourOpen"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                  :items="[hourOpen]"
                  v-model="hourOpen"
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
              <v-time-picker v-if="modalHourOpen" v-model="hourOpen" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHourOpen = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHourOpen.save(hourOpen)">Aceptar</v-btn>
              </v-time-picker>
            </v-dialog>
            <v-dialog
              ref="dialogHourClose"
              v-model="modalHourClose"
              :return-value.sync="hourClose"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                  :items="[hourClose]"
                  v-model="hourClose"
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
              <v-time-picker v-if="modalHourClose" v-model="hourClose" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHourClose = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHourClose.save(hourClose)">Aceptar</v-btn>
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
      if (this.objArrCompo.name != null) {
        this.poolName = this.objArrCompo.name;
      }

      if (this.objArrCompo.type != null) {
        if (this.objArrCompo.type == "indoor") {
          this.radioPoolType = this.objArrCompo.type;
        }
        if (this.objArrCompo.type == "outdoor") {
          this.radioPoolType = this.objArrCompo.type;
        }
      }

      if (this.objArrCompo.air_conditioned != null) {
        this.swAirConditioned = this.objArrCompo.air_conditioned;
      }

      if (this.objArrCompo.panoramic_view != null) {
        this.swPanoramicView = this.objArrCompo.panoramic_view;
      }

      if (this.objArrCompo.wading_pool != null) {
        this.swWadingPool = this.objArrCompo.wading_pool;
      }
      if (this.objArrCompo.towels != null) {
        this.swTowels = this.objArrCompo.towels;
      }
      if (this.objArrCompo.bar_pool != null) {
        this.swBarPool = this.objArrCompo.bar_pool;
      }
      if (this.objArrCompo.open_at != null) {
        this.hourOpen = this.objArrCompo.open_at.slice(0, -3);
      }
      if (this.objArrCompo.close_at != null) {
        this.hourClose = this.objArrCompo.close_at.slice(0, -3);
      }
    }
  },
  data() {
    return {
      id: this.idCompo,
      arrayComponents: [],
      countIdCompo: -1,
      poolName: null,
      radioPoolType: null,
      swAirConditioned: null,
      swPanoramicView: null,
      swWadingPool: null,
      swTowels: null,
      swBarPool: null,
      hourOpen: null,
      modalHourOpen: false,
      hourClose: null,
      modalHourClose: false,
    };
  },
  computed: {
    ...mapState({
      pools: (state) => state.HotelModule.pools,
    }),
  },
  methods: {
    removeCompo(id) {
      this.$emit("removeCompo", id);
    },
  },
  props: {
    idCompo: Number,
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