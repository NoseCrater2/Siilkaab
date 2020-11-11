<template>
  <div>
    <v-row align="center" justify="start" class="mb-n5">
      <v-col cols="12" md="6" sm="6" xs="12">
        <v-select
          :items="roomTypeItems"
          v-model="computedDdwnRoomType"
          prepend-inner-icon="mdi-bed-empty"
          outlined
          dense
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>
      </v-col>
      <v-col
        class="d-flex justify-center align-center mt-n7"
        cols="12"
        md="1"
        sm="1"
        xs="12"
      >
        <div>x</div>
      </v-col>
      <v-col cols="12" md="4" sm="4" xs="12">
        <v-text-field
          v-model="computedBedQuantity"
          label="Cantidad de camas"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col
        class="d-flex justify-center align-center mt-n7"
        cols="12"
        md="1"
        sm="1"
        xs="12"
      >
        <v-btn color="error" fab small dark depressed @click="removeCompoBeds(id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "StandartArrangementBeds",
  mounted() {
    if (this.objArrCompo["obj"].type != null) {
      if (this.objArrCompo["obj"].type == "twin") {
        this.ddwnRoomTypeModel = "Twin";
      }
      if (this.objArrCompo["obj"].type == "full") {
        this.ddwnRoomTypeModel = "Full";
      }
      if (this.objArrCompo["obj"].type == "queen") {
        this.ddwnRoomTypeModel = "Queen";
      }
      if (this.objArrCompo["obj"].type == "king") {
        this.ddwnRoomTypeModel = "King";
      }
      if (this.objArrCompo["obj"].type == "triple") {
        this.ddwnRoomTypeModel = "Triple";
      }
      if (this.objArrCompo["obj"].type == "quad") {
        this.ddwnRoomTypeModel = "Quad";
      }
    }
    this.bedQuantityModel = this.objArrCompo["obj"].quantity;
  },
  data() {
    return {
      id: this.idCompo,
      roomTypeItems: ["Twin", "Full", "Queen", "King", "Triple", "Quad"],
      ddwnRoomTypeModel: null,
      bedQuantityModel: null,
    };
  },
  methods: {
    removeCompoBeds(id) {
      this.$emit("removeCompoBeds", id);
    },
  },
  computed: {
    ...mapState({
      beds: (state) => state.RoomModule.beds,
    }),
    computedDdwnRoomType: {
      get() {
        return this.ddwnRoomTypeModel;
      },
      set(model) {
        this.ddwnRoomTypeModel = model;
        if (this.ddwnRoomTypeModel == "Twin") {
          this.objArrCompo["obj"].type = "twin";
        }
        if (this.ddwnRoomTypeModel == "Full") {
          this.objArrCompo["obj"].type = "full";
        }
        if (this.ddwnRoomTypeModel == "Queen") {
          this.objArrCompo["obj"].type = "queen";
        }
        if (this.ddwnRoomTypeModel == "King") {
          this.objArrCompo["obj"].type = "King";
        }
        if (this.ddwnRoomTypeModel == "Triple") {
          this.objArrCompo["obj"].type = "triple";
        }
        if (this.ddwnRoomTypeModel == "Quad") {
          this.objArrCompo["obj"].type = "quad";
        }
        return this.ddwnRoomTypeModel;
      },
    },
    computedBedQuantity: {
      get() {
        return this.bedQuantityModel;
      },
      set(model) {
        this.bedQuantityModel = model;
        this.objArrCompo["obj"].quantity = this.bedQuantityModel;
        return this.bedQuantityModel;
      },
    },
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>