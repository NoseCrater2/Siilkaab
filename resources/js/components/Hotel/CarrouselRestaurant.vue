<template>
  <div>
    <div>
      <v-row justify="space-around">
        <strong>Restaurantes activos: {{ activeRestaurants }}</strong>
      </v-row>

      <v-carousel
        light
        hide-delimiters
        v-model="countLastElementCarrousel"
        :show-arrows-on-hover="activeRestaurants>1"
        :show-arrows="activeRestaurants>1"
      >
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
          :idRestaurant="component.objArrCompo.id"
          :restauranNumber="component.restauranNumber"
          :objArrCompo="component.objArrCompo"
          :key="component.idCompo"
          :is="component.TagDRestaurant"
          @removeCompo="removeCompo"
        ></component>
      </v-carousel>

      <div class="d-flex justify-end">
        <v-btn
          class="mt-2"
          small
          depressed
          color="primary"
          @click="addCompoButton()"
        >Añadir restaurante</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicRestaurant from "./DynamicRestaurant";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CarrouselRestaurant",
  updated(){
    //console.log(this.restaurants[this.countLastElementCarrousel])
    
  },
  created() {
    let count = 0;
    while (count <= this.restaurants.length - 1) {
      this.addCompo(this.restaurants[count]);
      count++;
    }
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      activeRestaurants: 0,
      countLastElementCarrousel: 0
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      restaurants: (state) => state.HotelModule.restaurants,
      schedules: (state) => state.HotelModule.schedules,
    }),
  },
  methods: {
    //Esta mutacion setea restaurants
    ...mapMutations(["setArraySchedules", "setArrayRestaurants"]),
    addCompoButton() {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activeRestaurants++;
      //Declaramos la variable "putId" para insertarla como ID del nuevo restaurant
      let putId = (this.countIdCompo + 1)
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: {
          id: putId, //Se pone "putId" que tiene el valor de "this.countIdCompo" para identificarlo en el PUT
          name: null,
          menu_type: null,
          schedules: [],
          hotel_id: this.hotel.id
        }
      });
      this.restaurants.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
      //Creamos un nuevo arreglo de horarios que se seteara en el state "schedules"
      //Concatenandose con el valor actual del state + el valor de la siguiente variable
      let concatNewArraySchedules = [{idRestaurant: putId, restaurantSchedules: []}]
      //Mandamos al setter la concatenacion de arreglos (el state actual + el nuevo array)
      this.setArraySchedules([].concat(this.schedules, concatNewArraySchedules))
      
    },
    addCompo(obj) {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activeRestaurants++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: obj,
      });
    },
    removeCompo(idCompoParam) {
      //Variable del v-model carrousel la decrementamos
      this.countLastElementCarrousel--;
      this.activeRestaurants--;
      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);

      //En una nueva variable llamada "mapIDRestaurant" guardamos el id del restaurant
      //Obtenido gracias al indice actual eliminado (idCompoParam) utilizado en "this.arrayComponents"
      //Para eliminar los horarios del restaurant (ubicados en el state "schedules")
      let mapIDRestaurant = this.arrayComponents[idCompoMap].objArrCompo.id;

      //En la variable "deleteSchedule" guardamos el solo aquellos horarios donde su ID de restaurant sea diferente
      //Del ID de restaurant que se esta eliminando
      let deleteSchedule = this.schedules.filter(deleteScheduleItem=> deleteScheduleItem.idRestaurant !== mapIDRestaurant)

      //Mandamos el nuevo arreglo para setear en el state "schedules"
      this.setArraySchedules(deleteSchedule);
    
      //Del arrayComponents quitamos el restaurante que se esta eliminando
      this.arrayComponents.splice(idCompoMap, 1);

      //Seteamos "this.arrayComponents" en una nueva variable
      //Para unicamente sacar su propiedad "objArrCompo"
      let mapArrayComponents = this.arrayComponents.map(element =>{
        return element.objArrCompo;
      })
      

      //Seteamos tambien en "this.arrayComponentes" el "restauranNumber"
      //Que es el que indica que numero de restaurante estamos visualizando
      let fixRestauranNumber = 0;
      this.arrayComponents = this.arrayComponents.map(element=>{
        element.restauranNumber = fixRestauranNumber++;
        return element;
      })
      //Mandamos la array var "mapArrayComponents" que se seteara en la variable state "restaurants"
      this.setArrayRestaurants(mapArrayComponents);
      
    },
  },
  components: {
    DynamicRestaurant,
  },
};
</script>