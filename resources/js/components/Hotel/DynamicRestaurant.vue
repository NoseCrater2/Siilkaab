<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div class="pa-3">
        <v-row :justify="$vuetify.breakpoint.smAndUp ? 'space-between': 'center'" :class="$vuetify.breakpoint.smAndUp ? 'px-4' : ''" >
            <div class="font-weight-bold"><h2>Restaurante #{{restauranNumber+1}}</h2></div>
            <div>
                <v-btn
                  small
                  class="white--text"
                  depressed
                  color="red"
                  @click="dialogAceptCancelRemoveRestaurant = true"
                >Eliminar restaurante</v-btn>
            </div>
        </v-row>
        <br />
        <v-text-field v-model="computedRestaurantName" :error-messages="computedErrorRestaurantName" outlined label="Nombre del restaurante" required></v-text-field>
        <br />
        <v-row justify-xl="start" justify-lg="start" justify-md="start" justify="center" class="ml-xl-1 ml-lg-1 ml-md-1">
          <strong>Tipo de menú</strong>
        </v-row>
        <v-row justify="space-between" justify-xl="space-around" justify-lg="space-around" class="px-md-5 px-sm-5" :class="$vuetify.breakpoint.xsOnly ? 'px-5' : ''">
            <v-checkbox :error="computedErrorMenuType != '' ? true : false" v-model="computedSelectMenuType" label="A la carta" value="a la carte"></v-checkbox>
            <v-checkbox :error="computedErrorMenuType != '' ? true : false" v-model="computedSelectMenuType" label="Buffet" value="buffet"></v-checkbox>
            <div v-if="computedErrorMenuType != ''" class="mt-n2">
                <span class="red--text text-caption">Debe seleccionarse al menos un tipo de menú</span>
            </div>
        </v-row>
        <br />
        <br />
        <v-row justify-xl="start" justify-lg="start" justify-md="start" justify="center" class="ml-xl-1 ml-lg-1 ml-md-1">
          <div class="font-weight-bold">Introduce el horario</div>
        </v-row>
        <v-row>
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
              <v-alert outlined type="info" color="blue darken-3">
                Dile a los clientes cuándo pueden usar este servicio
              </v-alert>
            </v-col>
        </v-row>
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
        <v-row justify="center">
          <v-dialog
            v-model="dialogAceptCancelRemoveRestaurant"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                ¿Eliminar restaurant?
              </v-card-title>
              <v-card-text>Al aceptar, este restaurant se eliminará.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="dialogAceptCancelRemoveRestaurant = false"
                >
                  CANCELAR
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="btnApplyRemoveRestaurant()"
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
    dialogAceptCancelRemoveRestaurant: false,
      componentID: this.idCompo + "" + this.objArrCompo.id,
      arrayComponents: [],
      countIdCompo: -1,
      id: this.idCompo,
      restaurantNameModel: null,
      selectMenuTypeModel: []
    };
  },
  computed: {
    ...mapState({
      restaurants: (state) => state.HotelModule.restaurants,
      schedules: (state) => state.HotelModule.schedules,
      errorsRestaurants: (state) => state.HotelModule.errorsRestaurants
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
    computedErrorRestaurantName: {
      get() {
        let error = '';
        this.errorsRestaurants.forEach((itemErrorRestaurant)=>{
          if(typeof(itemErrorRestaurant.error.name) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRestaurant.componentID){
              error = itemErrorRestaurant.error.name;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorMenuType: {
      get() {
        let error = '';
        this.errorsRestaurants.forEach((itemErrorRestaurant)=>{
          if(typeof(itemErrorRestaurant.error.menu_type) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorRestaurant.componentID){
              error = itemErrorRestaurant.error.menu_type;
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
    //Esta mutacion setea schedules
    ...mapMutations(["setArrayRestaurants","setArraySchedules"]),
    btnApplyRemoveRestaurant(){
        this.dialogAceptCancelRemoveRestaurant = false;
        this.removeCompo(this.id);
    },

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
