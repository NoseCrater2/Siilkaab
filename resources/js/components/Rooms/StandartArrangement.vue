<template>
  <div class="mb-3">
    <v-card color="#f5f5f5" class="pa-5" outlined>
      <div class="font-weight-bold primary--text mb-3 mt-2">
        Arreglo Estandar
      </div>
      <div>¿Qué tipo de camas estan disponibles en esta habitación?</div>
      <component
        v-for="component in computedArrayComponents"
        :idCompo="component.idCompo"
        :key="component.idCompo"
        :objArrCompo="component.objArrCompo"
        :is="component.TagStandartArrBeds"
        @removeCompoBeds="removeCompoBeds"
      ></component>
      <v-col cols="12" md="12" sm="12" xs="12" class="ml-n3 mt-5">
        <v-btn elevation="0" dark @click="addCompoButton()">
          <v-icon left>mdi-plus-circle</v-icon>Agregar otra cama
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script>
//twin,full,queen,king,triple,quad
import { mapState, mapActions, mapMutations } from "vuex";
import StandartArrangementBeds from "../../components/Rooms/StandartArrangementBeds";
export default {
  name: "StandartArrangement",
  mounted() {
    let countWhile = 0;
    this.indexArrayBedroomBeds = this.beds.findIndex((element, index) => {
      if (element[0].idBedroom == this.idBedroomModel) {
        return element;
      }
    });
    while (countWhile <= this.beds[this.indexArrayBedroomBeds].length - 1) {
      this.addCompo(this.beds[this.indexArrayBedroomBeds][countWhile]);
      countWhile++;
    }
  },
  data() {
    return {
      indexArrayBedroomBeds: null,
      idBedroomModel: this.idBedroom,
      arrayComponents: [],
      countIdCompo: -1,
    };
  },
  methods: {
    //Esta mutacion setea beds
    ...mapMutations(["setArrayBeds"]),
    addCompoButton() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArrBeds: StandartArrangementBeds,
        objArrCompo: {
          idBedroom: this.idBedroomModel,
          obj: {
            id: "NEW", //Se pone "NEW" para identificarlo en el posterior metodo PUT
            type: null,
            quantity: 0,
            bedroom_id: null,
          },
        },
      });
      if (typeof this.beds[this.indexArrayBedroomBeds] == "undefined") {
        this.beds[this.indexArrayBedroomBeds] = new Array();
        console.log("undefined", this.beds);
      }
      this.beds[this.indexArrayBedroomBeds].push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
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
      let indexTempArray = []; //Arreglo donde se guardan los indices de los componentes que no son editados
      let countWhile = this.beds.length - 1; //Contador que sera usado en el while interno del for que recorre el arreglo de beds
      let indexEditable = 0; //Variable que guarda el indice del arreglo que se esta editando
      for (let i = 0; i < this.beds.length; i++) {
        //Ciclo while que verifica si en el actual arreglo existen o no
        //Arreglos con length = 0
        while (countWhile >= 0) {
          if (typeof this.beds[countWhile][0] == "undefined") {
            let arr = this.beds;
            arr.splice(countWhile, 1);
            this.setArrayBeds(arr);
          }
          countWhile--;
        }
        //Si el idBedroom del actual arreglo no coincide con la variable global de idBedroom
        //Entonces
        if (this.beds[i][0].idBedroom != this.idBedroomModel) {
          //Se guarda el indice del arreglo general que no se esta editando
          indexTempArray.push(i);
        } else {
          //Si no, se guarda en la variable el indice del elemento que se esta editando
          indexEditable = i;
        }
      }
      let countIndexTempArray = 0;
      let tempArrayNoEditables = []; //Arreglo que guardara los elementos que no fueron editados
      while (countIndexTempArray <= indexTempArray.length - 1) {
        tempArrayNoEditables.push(
          this.beds[indexTempArray[countIndexTempArray]]
        );
        countIndexTempArray++;
      }
      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);

      //Del arrayComponents quitamos la bed que se esta eliminando
      this.arrayComponents.splice(idCompoMap, 1);

      //Seteamos "this.arrayComponents" en una nueva variable
      //Para unicamente sacar su propiedad "objArrCompo"
      let mapArrayComponents = this.arrayComponents.map((element) => {
        return element.objArrCompo;
      });

      //Inicializamos la variable "setArrayBeds" con los elementos temporales que no fueron editados ("tempArrayNoEditables")
      let setArrayBeds = tempArrayNoEditables;
      //Y a este arreglo le agregamos el arreglo mapeado
      setArrayBeds.splice(indexEditable, 0, mapArrayComponents);
      //Mandamos el array "setArrayBeds" que se seteara en la variable state "beds"
      this.setArrayBeds(setArrayBeds);

      let countFinalWhile = this.beds.length - 1;
      while (countFinalWhile >= 0) {
        if (typeof this.beds[countFinalWhile][0] == "undefined") {
          let arr = this.beds;
          arr.splice(countFinalWhile, 1);
          this.setArrayBeds(arr);
        }
        countFinalWhile--;
      }

      console.log(this.beds);
    },
  },
  components: {
    StandartArrangementBeds,
  },
  computed: {
    ...mapState({
      beds: (state) => state.RoomModule.beds,
    }),
    computedArrayComponents() {
      return this.arrayComponents;
    },
  },
  props: {
    idBedroom: Number,
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>