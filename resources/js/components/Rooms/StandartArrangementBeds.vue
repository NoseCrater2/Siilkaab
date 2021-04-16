<template>
  <div>
    <v-row align="center" class="mb-xl-n5 mb-lg-n5 mb-md-n5 mb-sm-n5 mb-2">
      <v-col cols="10" xl="6" lg="6" md="6" sm="6" xs="10">
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
        class="d-flex justify-center align-center mt-xl-n7 mt-lg-n7 mt-md-n7 mt-sm-n7 mt-n14"
        cols="10"
        xl="1"
        lg="1"
        md="1"
        sm="1"
        xs="10"
      >
        <div>x</div>
      </v-col>
      <v-col cols="10" xl="4" lg="4" md="4" sm="4" xs="10" class="mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 mt-n7">
        <v-text-field
          @keydown="keyhandler"
          :rules="[rules.quantityBeds]"
          maxlength="3"
          v-model.number="computedBedQuantity"
          label="Cantidad de camas"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col
        class="d-flex justify-center align-center mt-xl-n7 mt-lg-n7 mt-md-n7 mt-sm-n7 mt-n14"
        cols="2"
        xl="1"
        lg="1"
        md="1"
        sm="1"
        xs="2"
      >
        <v-btn
          v-if="indexBed > 0"
          color="error"
          fab
          small
          dark
          depressed
          @click="removeCompoBeds(id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StandartArrangementBeds",
  data() {
    return {
      id: this.idCompo,
      roomTypeItems: ["Twin", "Full", "Queen", "King", "Triple", "Quad"],
      ddwnRoomTypeModel: "Twin",
      bedQuantityModel: 0,
      rules: {
        quantityBeds: value => {
          const pattern = /^(1|[0-9]\d{0,3})$/
          return pattern.test(value) || 'Solo se aceptan numeros (mayores a 0)'
        },
      },
    };
  },
  methods: {
    removeCompoBeds(id) {
      this.$emit("removeCompoBeds", id);
    },
    keyhandler(event) {
      const pattern = /^(1|[0-9]\d{0,3})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        event.preventDefault();
      }
    }
  },
  computed: {
    ...mapState({
      beds: (state) => state.RoomModule.beds,
    }),
    computedDdwnRoomType: {
      get() {
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
        return this.objArrCompo["obj"].quantity;
      },
      set(model) {
        if(model == ""){
          model = "1";
        }
        this.bedQuantityModel = parseInt(model);
        this.objArrCompo["obj"].quantity = this.bedQuantityModel;
        return this.bedQuantityModel;
      },
    },
  },
  props: {
    indexBed: Number,
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>