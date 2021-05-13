<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div class="pa-3">
        <v-row class="ml-1 d-flex">
          <span>
            <h2>
              <strong>Restaurante #{{restauranNumber+1}}</strong>
            </h2>
          </span>
          <div class="ml-auto mr-3">
            <v-btn
              small
              class="white--text"
              depressed
              color="red"
              @click="removeCompo(id)"
            >Eliminar restaurante</v-btn>
          </div>
        </v-row>
        <br />
        <v-text-field v-model="computedRestaurantName" label="Nombre del restaurante" required></v-text-field>
        <br />
        <span>
          <strong>Tipo de menú</strong>
        </span>
        <v-row justify="space-around">
          <v-checkbox v-model="computedSelectMenuType" label="A la carta" value="a la carte"></v-checkbox>
          <v-checkbox v-model="computedSelectMenuType" label="Buffet" value="buffet"></v-checkbox>
        </v-row>
        <br />
        <br />
        <v-row class="ml-1" align="center">
          <span>
            <strong>Introduce el horario</strong>
          </span>
        </v-row>
        <br />
        <span>Dile a los clientes cuándo pueden usar este servicio</span>
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
          :objArrCompo="component.objArrCompo"
          :key="component.idCompo"
          :is="component.TagSTimePicker"
          @removeCompoTime="removeCompoTime"
        ></component>
        <div class="d-flex justify-end">        
          <v-btn
            x-small
            depressed
            dark
            color="primary"
            @click="addCompoFromComponent()"
          >
            <v-icon left size="14" dark>mdi-plus</v-icon>
            Agregar horario
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SelectTimePicker from "../SelectTimePicker/SelectTimePicker";

export default {
  name: "DynamicRestaurant",
  created() {
    if (this.objArrCompo != null) {
      //componentID es utilizado como key unica para el proceso de muestra de errores
      this.objArrCompo.componentID = this.componentID;
      //Codigo para agregar componentes existentes
      let findedSchedulesIndex = -1;
      if(this.objArrCompo.id == "NEW"){
        findedSchedulesIndex = this.schedules.findIndex(itemSchedule=>itemSchedule.idRestaurant == this.objArrCompo.componentID)
      }
      else if(this.objArrCompo.id != "NEW"){
        findedSchedulesIndex = this.schedules.findIndex(itemSchedule=>itemSchedule.idRestaurant == this.objArrCompo.id)
      }
      if(findedSchedulesIndex > -1){
        let count = 0;
        while (count <= this.schedules[findedSchedulesIndex].restaurantSchedules.length - 1) {
          this.addCompo(this.schedules[findedSchedulesIndex].restaurantSchedules[count]);
          count++;
        }
      }

      if (this.objArrCompo.name != null) {
        this.restaurantNameModel = this.objArrCompo.name;
      }

      if (this.objArrCompo.menu_type != null) {
        if (this.objArrCompo.menu_type == "both") {
          this.selectMenuTypeModel.push("a la carte");
          this.selectMenuTypeModel.push("buffet");
        } else {
          this.selectMenuTypeModel.push(this.objArrCompo.menu_type);
        }
      }
    } else {
      this.addCompoFromComponent();
    }
  },
  data() {
    return {
      componentID: this.idCompo + "" + this.objArrCompo.id,
      arrayComponents: [],
      countIdCompo: -1,
      id: this.idCompo,
      restaurantNameModel: null,
      selectMenuTypeModel: [],
      restaurantId: 0,
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      restaurants: (state) => state.HotelModule.restaurants,
      schedules: (state) => state.HotelModule.schedules,
    }),
    computedRestaurantName: {
      get() {
        return this.restaurantNameModel;
      },
      set(model) {
        this.restaurantNameModel = model;
        this.objArrCompo.name = this.restaurantNameModel;
        return this.restaurantNameModel;
      },
    },
    computedSelectMenuType: {
      get() {
        return this.selectMenuTypeModel;
      },
      set(model) {
        this.selectMenuTypeModel = model;
        if (model.length > 1) {
          this.objArrCompo.menu_type = "both";
        } else {
          this.objArrCompo.menu_type = this.selectMenuTypeModel[0];
        }
        return this.selectMenuTypeModel;
      },
    },
  },
  methods: {
    //Esta mutacion setea schedules
    ...mapMutations(["setArrayRestaurants","setArraySchedules"]),

    removeCompo(id) {
      this.$emit("removeCompo", id);
    },

    //Metodos componente SelectTimePicker
    addCompoFromComponent() {
      this.countIdCompo++;
      let putId = this.countIdCompo + "" + "NEW"; //ID que se seteara al crear los horarios
      let objNewTime = {} //Variable que guardara las propiedades del objeto del nuevo Timepicker
      if(typeof(this.idRestaurant) == 'string'){
        objNewTime = {
          id: "NEW", //Se pone "NEW" para identificarlo en el posterior metodo PUT
          idCompoSelectTimePicker: putId,
          day: null,
          end_time: null,
          restaurant_id: this.idCompoRestaurant,
          start_time: null,
        }
      }
      else{
        objNewTime = {
          id: "NEW", //Se pone "NEW" para identificarlo en el posterior metodo PUT
          idCompoSelectTimePicker: putId,
          day: null,
          end_time: null,
          restaurant_id: this.idRestaurant,
          start_time: null,
        }
      }
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: SelectTimePicker,
        objArrCompo: objNewTime,
      });

      //Creamos una variable "indexSchedule" que guardara el indice donde se guardara el nuevo horario
      //en el state "schedules"
      let indexSchedule;
      this.schedules.forEach((scheduleItem, index) => {
        if(this.idRestaurant == "NEW"){
          if(scheduleItem.idRestaurant == this.idCompoRestaurant){
            indexSchedule = index;
          }
        }
        else{
          if(scheduleItem.idRestaurant == this.idRestaurant){
            indexSchedule = index;
          }
        }
      });
      
      //Creamos la variable "newArraySchedules" que guardará el nuevo horario que se creo por medio de este boton
      let newArraySchedules = this.arrayComponents[this.arrayComponents.length-1].objArrCompo;
      //Y modificamos el state "schedules" insertando "newArraySchedules"
      this.schedules[indexSchedule].restaurantSchedules.push(newArraySchedules);

      console.log("SCHEDULE", this.schedules)
    },
    //Metodos componente SelectTimePicker ya existente desde BD
    addCompo(obj) {
      obj.restaurant_id = this.objArrCompo.id;
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: SelectTimePicker,
        objArrCompo: obj,
      });
    },

    removeCompoTime(idCompoParam) {
      let idCompoMap = this.arrayComponents.map((element) => element.idCompo).indexOf(idCompoParam);
      //En una nueva variable llamada "mapIDComponent" guardamos el id del componente
      //Obtenido gracias al indice actual eliminado (idCompoParam) utilizado en "this.arrayComponents"
      let mapIDComponent = this.arrayComponents[idCompoMap].idCompo;
      //Procedemos a eliminar del arreglo state "this.schedules"
      //el horario correspondiente y para eso hacemos una serie de pasos
      let countCurrentStateSchedule = 0; //Inicializamos un contador que llevara el indice del arreglo state en su propiedad "restaurantSchedules"
      let idRestaurantScheduleDeleted = 0; //Inicializamos un contador que guardara el id del restaurant que tiene el horario a eliminar
      this.arrayComponents = this.arrayComponents.map((itemArrayComponents) => {
        //Buscamos en los elementos del "this.arrayComponents" una coincidencia
        //si el idCompo de dicho elemento es igual al que llega al boton de eliminacion
        if (itemArrayComponents.idCompo === mapIDComponent) {
          //Si hay coincidencia, procedemos a hacer un filter en el state "this.schedules"
          this.schedules.filter((itemStateSchedules) => {
              //Si hay una coincidencia de ids de restaurantes entre "this.arrayComponents"
              //y "this.schedules"...
              console.log("itemArrayComponents.objArrCompo.restaurant_id", itemArrayComponents.objArrCompo, "itemStateSchedules.idRestaurant", itemStateSchedules.idRestaurant)
              if (itemArrayComponents.objArrCompo.restaurant_id == itemStateSchedules.idRestaurant) {
                //Entonces al contador le asignamos el valor de longitud del la propiedad de horarios
                //de restaurant (que es un array) del elemento de "this.arrayComponents"
                countCurrentStateSchedule = itemStateSchedules.restaurantSchedules.length - 1;
              }
              //Retornamos el state "this.schedules" con la coincidencia de ids de restaurant
              return itemArrayComponents.objArrCompo.restaurant_id == itemStateSchedules.idRestaurant;
          }).map((currentStateSchedule) => { //Y a este retorno le aplicamos un map
              //Creamos un ciclo que permanezca activo mientras el contador sea mayor o igual a 0
              while (countCurrentStateSchedule >= 0) {
                              
                if(itemArrayComponents.objArrCompo.id == 'NEW'){
                  //Con el contador accedemos al indice del array "restaurantSchedules"
                  //Y verificamos si en este indice se encuentra una coincidencia de ids entre este indice y el id (que es el de restaurant)
                  //del elemento perteneciente a "this.arrayComponents"
                  if (itemArrayComponents.objArrCompo.idCompoSelectTimePicker == currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].idCompoSelectTimePicker) {
                    //Guardamos el id del restaurante que tiene el horario que se va a eliminar; esto para editar el state "restaurants"
                    idRestaurantScheduleDeleted = currentStateSchedule.idRestaurant
                    //Si existe la coincidencia entonces del elemento del state modificamos el restaurant
                    currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].deletedSchedule = 'DELETED';
                    break;
                  }
                }
                else{
                  //Con el contador accedemos al indice del array "restaurantSchedules"
                  //Y verificamos si en este indice se encuentra una coincidencia de ids entre este indice y el id (que es el de restaurant)
                  //del elemento perteneciente a "this.arrayComponents"
                  if (itemArrayComponents.objArrCompo.id == currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].id) {
                    //Guardamos el id del restaurante que tiene el horario que se va a eliminar; esto para editar el state "restaurants"
                    idRestaurantScheduleDeleted = currentStateSchedule.idRestaurant
                    //Si existe la coincidencia entonces del elemento del state modificamos el restaurant
                    currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].deletedSchedule = 'DELETED';
                    break;
                  }
                }
                countCurrentStateSchedule--;
              }
              //Y retornamos el "nuevo" state "this.schedules"
              return currentStateSchedule;
            });
        }
        //Al final, "this.arrayComponents" en este punto no sufrio cambio alguno. Sin embargo
        //Lo tenemos que retornar
        return itemArrayComponents;
      });
      //Eliminamos del arreglo del componentes el horario
      this.arrayComponents.splice(idCompoMap, 1);
    },
  },
  components: {
    SelectTimePicker,
  },
  props: {
    idCompo: Number,
    idRestaurant: {
      type: [ Number, String ]
    },
    idCompoRestaurant: String,
    restauranNumber: Number,
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