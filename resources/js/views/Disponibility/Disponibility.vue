<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
      <div class="d-flex justify-center mb-2">
          <span class="text-h4 text-uppercase font-weight-bold"
            >Disponibilidad y tarifas</span>
        </div>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-autocomplete
            v-model="hotelSelected"
            :items="hotels"
            item-text="title"
            item-value="hotel_id"
            outlined
            label="Seleccione Hotel"
            @change="searchRoom(hotelSelected)"
          ></v-autocomplete>

          <!-- <v-autocomplete
            v-model="roomSelected"
            :items="rooms"
            :loading="loadingRooms"
            item-text="name"
            item-value="id"
            outlined
            label="Seleccione Habitación"
          ></v-autocomplete> -->

          <div v-if="arrayRoomIDs.length > 0 && loadingRooms == false">
            <CalendarFee
              :arrEndpointRooms="rooms"
              :arrayRoomIDs="arrayRoomIDs"
              :idRoomSelected="roomSelected"
              :daySelected="daySelected"
              :idHotelSelected="hotelSelected"
              :rates="rates"
            ></CalendarFee>
          </div>
        </v-col>

        <!-- <v-col cols="12" sm="12" md="8" lg="8">
          <div v-if="arrayRoomIDs.length > 0 && loadingRooms == false">
            <CalendarFee
              :arrEndpointRooms="rooms"
              :arrayRoomIDs="arrayRoomIDs"
              :idRoomSelected="roomSelected"
              :daySelected="daySelected"
              :idHotelSelected="hotelSelected"
              :rates="rates"
            ></CalendarFee>
          </div>
        </v-col> -->
      </v-row>
      <v-form v-if="arrayRoomIDs.length > 0 && loadingRooms == false">
        <!-- <v-alert dense type="info">
              Para ver o configurar
              <strong>DISPONIBILIDAD</strong> y
              <strong>TARIFA</strong> seleccione un
              <strong>RANGO DE FECHA</strong>, los <strong>DÍAS</strong> a
              aplicar, las <strong>UNIDADES</strong> y la
              <strong>TARIFA</strong> a aplicar.
            </v-alert> -->

        <v-card class="pa-4" outlined tile>
          <span class="text-h4 overline font-weight-bold">Actualizar periodo</span>
          <v-row justify="start" class="ml-1 mt-4">
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Todos"
              value="all"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Lunes"
              value="lunes"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Martes"
              value="martes"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Miércoles"
              value="miércoles"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Jueves"
              value="jueves"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Viernes"
              value="viernes"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Sábado"
              value="sábado"
            ></v-checkbox>
            <v-checkbox
              class="mr-3"
              v-model="select"
              label="Domingo"
              value="domingo"
            ></v-checkbox>
          </v-row>
          <div v-if="(rooms.length > 0 && isFilledArrayComponents == false) ? fillArrayComponents() : ' '">
            <div v-if="(computedArrayComponents.length > 0 && isFilledArrayComponents == true)">
              <component
                v-for="(component) in computedArrayComponents"
                :idCompo="component.idCompo"
                :key="component.idCompo"
                :objArrCompo="component.objArrCompo"
                :is="component.TagPeriodConfig"
              ></component>
            </div>
          </div>
          <!-- <PeriodConfig></PeriodConfig> -->
        </v-card>
        <v-btn color="primary" large block>Aplicar</v-btn>
        <v-spacer></v-spacer>
      </v-form>
    </v-container>
  </div>
</template>


<script >
import { mapActions, mapState } from "vuex";
import CalendarFee from "../../components/CalendarFee/CalendarFee";
import PeriodConfig from "../../components/Disponibility/PeriodConfig"

export default {
  data() {
    return {
      hotelSelected: null,
      loadingRooms: false,
      roomSelected: null,
      select: [],

      arrayRoomIDs: [],
      daySelected: null,

      arrayComponents: [],
      countIdCompo: -1,
      isFilledArrayComponents: false
    };
  },

  mounted() {
    this.getHotelsForAdmin();
  },

  methods: {
    ...mapActions(["getHotelsForAdmin", "getRoomsForAdmin", "getRates"]),
    searchRoom(idHotel) {
      this.loadingRooms = true;
      this.getRoomsForAdmin(idHotel).then(() => {
        this.arrayRoomIDs = this.rooms.map((el) => {
          return el.id;
        });
        this.getRates(this.arrayRoomIDs).then(() => {
          this.loadingRooms = false;
        });
      });
    },
    fillArrayComponents(){
      let countWhile = 0;
      while (countWhile < this.rooms.length) {
        this.addCompo(this.rooms[countWhile]);
        countWhile++;
      }
      this.isFilledArrayComponents = true;
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagPeriodConfig: PeriodConfig,
        objArrCompo: obj,
      });
    },
  },

  components: {
    CalendarFee,
    PeriodConfig
  },

  computed: {
    ...mapState({
      hotels: (state) => state.disponibilityMoule.ahotels,
      rooms: (state) => state.disponibilityMoule.arooms,
      rates: (state) => state.disponibilityMoule.rates,
    }),
    computedArrayComponents() {
      return this.arrayComponents;
    },
  },
};
</script>
