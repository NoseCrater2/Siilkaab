<template>
  <div class="mb-3">
    <v-card color="#f5f5f5" class="pa-5" outlined>
      <v-row>
        <v-col cols="8" xl="8" lg="8" md="8" sm="8" xs="8">
          <div class="font-weight-bold primary--text mb-3 mt-2">
            Bedroom {{idCompo+1}}
          </div>
        </v-col>
        <v-col cols="4" xl="4" lg="6" md="4" sm="4" xs="4" class="d-flex align-center justify-end">
          <v-btn v-if="indexBedroom > 0" small elevation="0" dark color="red" @click="removeCompoBedrooms(id)">
            <v-icon left>mdi-close-circle</v-icon>Eliminar bedroom
          </v-btn>
        </v-col>
      </v-row>
      <div>¿Qué tipo de camas estan disponibles en esta habitación?</div>
      <component
        v-for="(component, index) in computedArrayComponents"
        :indexBed="index"
        :idCompo="component.idCompo"
        :key="component.idCompo"
        :objArrCompo="component.objArrCompo"
        :is="component.TagStandartArrBeds"
        @removeCompoBeds="removeCompoBeds"
      ></component>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="ml-xl-n3 ml-lg-n3 ml-md-n3 ml-sm-n3 d-flex justify-xl-start justify-lg-start justify-md-start justify-sm-start justify-center">
        <v-btn elevation="0" dark @click="addCompoButton()">
          <v-icon left>mdi-plus-circle</v-icon>Agregar cama
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script>
//twin,full,queen,king,triple,quad
import { mapState, mapMutations } from "vuex";
import StandartArrangementBeds from "../../components/Rooms/StandartArrangementBeds";
export default {
  name: "StandartArrangement",
  mounted() {
    this.beds.forEach((element, index) => {
      if(Array.isArray(element) == true){
        if (element[0].idBedroom == this.idBedroomModel) {
          this.indexArrayBedroomBeds.push(index)
        }
      }
      else if(Array.isArray(element) == false){
        if (element.idBedroom == this.idBedroomModel) {
          this.indexArrayBedroomBeds.push(index)
        }
      }
    });
    this.indexArrayBedroomBeds.forEach(elementIndex=>{
      let countWhile = 0;
      while (countWhile <= this.beds[elementIndex].length - 1) {
        this.addCompo(this.beds[elementIndex][countWhile]);
        countWhile++;
      }
    })
  },
  data() {
    return {
      id: this.idCompo,
      indexArrayBedroomBeds: [],
      idBedroomModel: this.idBedroom,
      arrayComponents: [],
      countIdCompo: -1,
    };
  },
  methods: {
    removeCompoBedrooms(id) {
      this.$emit("removeCompoBedrooms", id);
    },
    addCompoButton() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArrBeds: StandartArrangementBeds,
        objArrCompo: {
          new: "NEW",
          idBedroom: this.idBedroomModel,
          obj: {
            id: "NEW", //Se pone "NEW" para identificarlo en el posterior metodo PUT
            type: "twin",
            quantity: 1,
          },
        },
      });
      this.indexArrayBedroomBeds.forEach(elementIndex=>{
        if(Array.isArray(this.beds[elementIndex]) == true){
          this.beds[elementIndex].push(
            this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
          );
        }
        else if(Array.isArray(this.beds[elementIndex]) == false){
          this.beds[elementIndex] = new Array();
          this.beds[elementIndex].push(
            this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
          );
        }
      })
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArrBeds: StandartArrangementBeds,
        objArrCompo: obj,
      });
    },
    removeCompoBeds(idCompoParam) {
      let deletedBedIndex = -1;
      this.arrayComponents.forEach((elementArray, indexArray)=>{
        if(elementArray.idCompo == idCompoParam){
          deletedBedIndex = indexArray;
          elementArray.objArrCompo.deleted = "DELETED";
        }
      })
      if(deletedBedIndex > -1){
        this.arrayComponents.splice(deletedBedIndex, 1);
      }
    },
  },
  components: {
    StandartArrangementBeds,
  },
  computed: {
    ...mapState({
      bedrooms: (state) => state.RoomModule.bedrooms,
      beds: (state) => state.RoomModule.beds,
    }),
    computedArrayComponents() {
      return this.arrayComponents;
    },
  },
  props: {
    indexBedroom: Number,
    idBedroom: {
      type: [ Number, String ]
    },
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>