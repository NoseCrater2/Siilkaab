<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
      <div class="text-center mb-n7">
        <span class="text-h4 text-uppercase font-weight-bold"
          >Detalles de habitación</span
        >
        <div class="overline">{{ nameRoom }}</div>
      </div>
      <br />
      <br />
      <v-card class="pa-4" outlined tile>
        <div class="mb-5">
          <span class="text-h6 black--text">Por favor, selecciona</span>
        </div>
        <v-row>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-text-field
              v-model="computedRoomName"
              prepend-inner-icon="mdi-form-textbox"
              label="Nombre de habitación"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-select
              :items="typeRoomItems"
              v-model="computedDdwnTypeRoom"
              prepend-inner-icon="mdi-bed-empty"
              label="Tipo de habitación"
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-text-field
              v-model="computedQuantity"
              prepend-inner-icon="mdi-pen"
              label="Número de habitaciones (de éste tipo)"
              hint="Out of 11 rooms at your property"
              persistent-hint
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-select
              :items="smokingPolicyItems"
              v-model="computedDdwnSmokingPolicy"
              prepend-inner-icon="mdi-smoking"
              label="Política de fumar"
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-select
              :items="poolNearItems"
              v-model="computedDdwnPoolNear"
              prepend-inner-icon="mdi-pool"
              label="Habitación cerca de alberca"
              hint="Let your guests know if you have one (or more) of these rooms near the pool. They can request
      this when booking based on your availability"
              persistent-hint
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6" xs="12">
            <v-text-field
              v-model="computedRackRate"
              prepend-inner-icon="mdi-cash-multiple"
              label="Tarifa base de habitación"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <div class="mb-8 mt-4">
          <span class="text-h6 black--text">Locación de habitación</span>
        </div>
        <v-select
          :items="floorNearItems"
          v-model="computedDdwnFloorNear"
          prepend-inner-icon="mdi-home-floor-0"
          label="Nivel de piso"
          hint="This feature will help your guests understand which floor this option is available on. If it´s available on both the ground floor and upper floor(s), guests can
      make a special request for their preferred floor based on your
      availability"
          persistent-hint
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>
        <br />
        <br />
        <v-divider></v-divider>
        <div class="mb-7 mt-4">
          <span class="text-h6 black--text">Opciones de camas y ocupancia</span>
        </div>
        <div class="mb-5">*Todos los campos son requeridos</div>
        <!--Importamos y usamos el componente "StandartArrangement"-->
        <!--Solo sera visible hasta que "getBeds" devuelva el arreglo de camas-->
        <div v-if="beds != null">
          <component
            v-for="component in computedArrayComponents"
            :idBedroom="component.idBedroom"
            :idCompo="component.idCompo"
            :key="component.idCompo"
            :objArrCompo="component.objArrCompo"
            :is="component.TagStandartArr"
          ></component>
        </div>
        <div class="mb-4 mt-7">
          <span class="text-h6 black--text">Ocupancia</span>
        </div>
        <div>
          The occupancy you set here is only for gests staying in existing beds.
          Occupancy from guests staying in cribs and extra beds shouldn´t be
          included. View your crib and extra bed settings in...
        </div>
        <v-row class="mt-4">
          <v-col cols="12" md="4" sm="4" xs="12">
            <v-text-field
              type="number"
              v-model.number="computedMaxAdults"
              prepend-inner-icon="mdi-pen"
              label="Maximo de adultos"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="4" xs="12">
            <v-text-field
              type="number"
              v-model.number="computedMaxChildren"
              prepend-inner-icon="mdi-pen"
              label="Maximo de niños"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="4" xs="12">
            <v-text-field
              type="number"
              v-model.number="computedMaxOccpancy"
              prepend-inner-icon="mdi-pen"
              label="Maxima ocupación"
              outlined
              hint="The maximum number of guests (adults and children), that can stay"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <br />
      <v-btn block color="primary">Continuar</v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import StandartArrangement from "../../components/Rooms/StandartArrangement";
export default {
  //this.$route.params.id
  //single,double,twin,twin-double,triple,quad,family,suite,studio,apartment,bed-in-room,bungalow,challet,villa,vacation-home,trailer,tent'
  name: "RoomDetails",
  created() {
    this.getRoomDetails(this.idRoom).then(() => {
      this.nameRoom = this.roomDetails.name;
      this.roomNameModel = this.roomDetails.name;
      if (this.roomDetails.type != null) {
        if (this.roomDetails.type == "single") {
          this.ddwnTypeRoomModel = "Sencilla";
        }
        if (this.roomDetails.type == "double") {
          this.ddwnTypeRoomModel = "Doble";
        }
        if (this.roomDetails.type == "twin") {
          this.ddwnTypeRoomModel = "Gemela";
        }
        if (this.roomDetails.type == "twin-double") {
          this.ddwnTypeRoomModel = "Gemela doble";
        }
        if (this.roomDetails.type == "triple") {
          this.ddwnTypeRoomModel = "Triple";
        }
        if (this.roomDetails.type == "quad") {
          this.ddwnTypeRoomModel = "Quad";
        }
        if (this.roomDetails.type == "family") {
          this.ddwnTypeRoomModel = "Familiar";
        }
        if (this.roomDetails.type == "suite") {
          this.ddwnTypeRoomModel = "Suite";
        }
        if (this.roomDetails.type == "studio") {
          this.ddwnTypeRoomModel = "Studio";
        }
        if (this.roomDetails.type == "apartment") {
          this.ddwnTypeRoomModel = "Apartamento";
        }
        if (this.roomDetails.type == "bed-in-room") {
          this.ddwnTypeRoomModel = "Cama en la habitación";
        }
        if (this.roomDetails.type == "bungalow") {
          this.ddwnTypeRoomModel = "Bungalow";
        }
        if (this.roomDetails.type == "challet") {
          this.ddwnTypeRoomModel = "Challet";
        }
        if (this.roomDetails.type == "villa") {
          this.ddwnTypeRoomModel = "Villa";
        }
        if (this.roomDetails.type == "vacation-home") {
          this.ddwnTypeRoomModel = "Casa para vacacionar";
        }
        if (this.roomDetails.type == "trailer") {
          this.ddwnTypeRoomModel = "Trailer";
        }
        if (this.roomDetails.type == "tent") {
          this.ddwnTypeRoomModel = "Tienda";
        }
      }

      this.quantityModel = this.roomDetails.quantity;

      if (this.roomDetails.smoking_policy != null) {
        if (this.roomDetails.smoking_policy == "yes") {
          this.ddwnSmokingPolicyModel = "Si";
        }
        if (this.roomDetails.smoking_policy == "no") {
          this.ddwnSmokingPolicyModel = "No";
        }
        if (this.roomDetails.smoking_policy == "both") {
          this.ddwnSmokingPolicyModel = "Ambas";
        }
      }
      if (this.roomDetails.pool_near != null) {
        if (this.roomDetails.pool_near == "all") {
          this.ddwnPoolNearModel = "Todos";
        }
        if (this.roomDetails.pool_near == "some") {
          this.ddwnPoolNearModel = "Algunos";
        }
        if (this.roomDetails.pool_near == "none") {
          this.ddwnPoolNearModel = "Ninguno";
        }
      }

      this.rackRateModel = this.roomDetails.rack_rate;

      if (this.roomDetails.floor_near != null) {
        if (this.roomDetails.floor_near == "both") {
          this.ddwnFloorNearModel = "Ambos";
        }
        if (this.roomDetails.floor_near == "ground") {
          this.ddwnFloorNearModel = "Suelo";
        }
        if (this.roomDetails.floor_near == "upper") {
          this.ddwnFloorNearModel = "Superior";
        }
      }

      this.maxAdultsModel = this.roomDetails.max_adults;
      this.maxChildrenModel = this.roomDetails.max_children;
      this.maxOccpancyModel = this.roomDetails.max_occpancy;

      //Llamamos al metodo "getBedrooms" para llenar las habitaciones
      this.getBedrooms(this.idRoom).then(() => {
        let arrayBedroomsFilter = this.bedrooms.map((itemBedroom) => {
          if (itemBedroom.room_id == this.idRoom) {
            return itemBedroom.id;
          }
        });
        this.idBedroom = arrayBedroomsFilter;
        let countWhile = 0;
        while (countWhile <= this.bedrooms.length - 1) {
          this.addCompo(this.bedrooms[countWhile]);
          countWhile++;
        }
        this.getBeds(this.idBedroom).then(()=>{})
      });
    });
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      idRoom: this.$route.params.id,
      idBedroom: null,
      nameRoom: null,
      roomNameModel: null,
      typeRoomItems: [
        "Sencilla",
        "Doble",
        "Gemela",
        "Gemela doble",
        "Triple",
        "Quad",
        "Familiar",
        "Suite",
        "Studio",
        "Apartamento",
        "Cama en la habitación",
        "Bungalow",
        "Challet",
        "Villa",
        "Casa para vacacionar",
        "Trailer",
        "Tienda",
      ],
      ddwnTypeRoomModel: null,
      quantityModel: null,
      smokingPolicyItems: ["Si", "No", "Ambas"],
      ddwnSmokingPolicyModel: null,
      poolNearItems: ["Todos", "Algunos", "Ninguno"],
      ddwnPoolNearModel: null,
      rackRateModel: null,
      floorNearItems: ["Ambos", "Suelo", "Superior"],
      ddwnFloorNearModel: null,
      maxAdultsModel: null,
      maxChildrenModel: null,
      maxOccpancyModel: null,
      items: ["Suite", "Luxury"],
      selected: [],
    };
  },
  methods: {
    ...mapActions(["getRoomDetails", "getBedrooms", "getBeds"]),
    addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArr: StandartArrangement,
        objArrCompo: obj,
        idBedroom: obj.id
      });
    },
  },
  computed: {
    ...mapState({
      roomDetails: (state) => state.RoomModule.roomDetails,
      bedrooms: (state) => state.RoomModule.bedrooms,
      beds: (state) => state.RoomModule.beds,
    }),
    computedRoomName: {
      get() {
        return this.roomNameModel;
      },
      set(model) {
        this.roomNameModel = model;
        this.roomDetails.name = this.roomNameModel;
        return this.roomNameModel;
      },
    },
    computedDdwnTypeRoom: {
      get() {
        return this.ddwnTypeRoomModel;
      },
      set(model) {
        this.ddwnTypeRoomModel = model;
        if (this.ddwnTypeRoomModel == "Sencilla") {
          this.roomDetails.type = "single";
        }
        if (this.ddwnTypeRoomModel == "Doble") {
          this.roomDetails.type = "double";
        }
        if (this.ddwnTypeRoomModel == "Gemela") {
          this.roomDetails.type = "twin";
        }
        if (this.ddwnTypeRoomModel == "Gemela doble") {
          this.roomDetails.type = "twin-double";
        }
        if (this.ddwnTypeRoomModel == "Triple") {
          this.roomDetails.type = "triple";
        }
        if (this.ddwnTypeRoomModel == "Quad") {
          this.roomDetails.type = "quad";
        }
        if (this.ddwnTypeRoomModel == "Familiar") {
          this.roomDetails.type = "family";
        }
        if (this.ddwnTypeRoomModel == "Suite") {
          this.roomDetails.type = "suite";
        }
        if (this.ddwnTypeRoomModel == "Studio") {
          this.roomDetails.type = "studio";
        }
        if (this.ddwnTypeRoomModel == "Apartamento") {
          this.roomDetails.type = "apartment";
        }
        if (this.ddwnTypeRoomModel == "Cama en la habitación") {
          this.roomDetails.type = "bed-in-room";
        }
        if (this.ddwnTypeRoomModel == "Bungalow") {
          this.roomDetails.type = "bungalow";
        }
        if (this.ddwnTypeRoomModel == "Challet") {
          this.roomDetails.type = "challet";
        }
        if (this.ddwnTypeRoomModel == "Villa") {
          this.roomDetails.type = "villa";
        }
        if (this.ddwnTypeRoomModel == "Casa para vacacionar") {
          this.roomDetails.type = "vacation-home";
        }
        if (this.ddwnTypeRoomModel == "Trailer") {
          this.roomDetails.type = "trailer";
        }
        if (this.ddwnTypeRoomModel == "Tienda") {
          this.roomDetails.type = "tent";
        }
        return this.ddwnTypeRoomModel;
      },
    },
    computedQuantity: {
      get() {
        return this.quantityModel;
      },
      set(model) {
        this.quantityModel = model;
        this.roomDetails.quantity = this.quantityModel;
        return this.quantityModel;
      },
    },
    computedDdwnSmokingPolicy: {
      get() {
        return this.ddwnSmokingPolicyModel;
      },
      set(model) {
        this.ddwnSmokingPolicyModel = model;
        if (this.ddwnSmokingPolicyModel == "Si") {
          this.roomDetails.smoking_policy = "yes";
        }
        if (this.ddwnSmokingPolicyModel == "No") {
          this.roomDetails.smoking_policy = "no";
        }
        if (this.ddwnSmokingPolicyModel == "Ambas") {
          this.roomDetails.smoking_policy = "both";
        }
        return this.ddwnSmokingPolicyModel;
      },
    },
    computedDdwnPoolNear: {
      get() {
        return this.ddwnPoolNearModel;
      },
      set(model) {
        this.ddwnPoolNearModel = model;
        if (this.ddwnPoolNearModel == "Todos") {
          this.roomDetails.pool_near = "all";
        }
        if (this.ddwnPoolNearModel == "Algunos") {
          this.roomDetails.pool_near = "some";
        }
        if (this.ddwnPoolNearModel == "Ninguno") {
          this.roomDetails.pool_near = "none";
        }
        return this.ddwnPoolNearModel;
      },
    },
    computedRackRate: {
      get() {
        return this.rackRateModel;
      },
      set(model) {
        this.rackRateModel = model;
        this.roomDetails.rack_rate = this.rackRateModel;
        return this.rackRateModel;
      },
    },
    computedDdwnFloorNear: {
      get() {
        return this.ddwnFloorNearModel;
      },
      set(model) {
        this.ddwnFloorNearModel = model;
        if (this.ddwnFloorNearModel == "Ambos") {
          this.roomDetails.floor_near = "both";
        }
        if (this.ddwnFloorNearModel == "Suelo") {
          this.roomDetails.floor_near = "ground";
        }
        if (this.ddwnFloorNearModel == "Superior") {
          this.roomDetails.floor_near = "upper";
        }
        return this.ddwnFloorNearModel;
      },
    },
    computedMaxAdults: {
      get() {
        return this.maxAdultsModel;
      },
      set(model) {
        this.maxAdultsModel = model;
        this.roomDetails.max_adults = this.maxAdultsModel;
        return this.maxAdultsModel;
      },
    },
    computedMaxChildren: {
      get() {
        return this.maxChildrenModel;
      },
      set(model) {
        this.maxChildrenModel = model;
        this.roomDetails.max_children = this.maxChildrenModel;
        return this.maxChildrenModel;
      },
    },
    computedMaxOccpancy: {
      get() {
        return this.maxOccpancyModel;
      },
      set(model) {
        this.maxOccpancyModel = model;
        this.roomDetails.max_occpancy = this.maxOccpancyModel;
        return this.maxOccpancyModel;
      },
    },
    computedArrayComponents() {
      return this.arrayComponents;
    },
  },
  components: {
    StandartArrangement,
  },
};
</script>