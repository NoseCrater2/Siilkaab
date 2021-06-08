<template>
  <div>
    <div>
      <v-row justify="center">
        <strong>Restaurantes activos: {{ activeRestaurants }}</strong>
      </v-row>

      <v-carousel
      v-if="activeRestaurants > 0"
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
          :idCompoRestaurant="component.objArrCompo.idCompoRestaurant"
          :restauranNumber="component.restauranNumber"
          :objArrCompo="component.objArrCompo"
          :key="component.idCompo"
          :is="component.TagDRestaurant"
          @removeCompo="removeCompo"
        ></component>
      </v-carousel>

        <v-sheet color="#eeeeee" height="100%" v-if="activeRestaurants == 0">
            <div class="pa-3 text-center">
                Haga clic en agregar para configurar un nuevo restaurant
            </div>
        </v-sheet>

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
  created() {
    let count = 0;
    //La variable "filteredDeletedRestaurants" es util para poner unicamente los restaurantes que no fueron eliminados
    let filteredDeletedRestaurants = this.restaurants.filter(itemRestaurant=>{
      if(typeof(itemRestaurant.deletedRestaurant) == 'undefined'){
        return itemRestaurant;
      }
    });
    while (count < filteredDeletedRestaurants.length) {
      this.addCompo(filteredDeletedRestaurants[count]);
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
      let putId = this.countIdCompo + "" + "NEW"; //ID que se seteara al crear los horarios
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: {
          id: "NEW",
          idCompoRestaurant: putId,
          name: null,
          menu_type: null,
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
      let idCompoMap = this.arrayComponents.map((element) => element.idCompo).indexOf(idCompoParam);

      //localRestaurant se utiliza para obtener una copia del restaurante que se esta eliminando
      let localRestaurant = this.arrayComponents[idCompoMap].objArrCompo;

      this.schedules.forEach(itemSchedule => {
        if(localRestaurant.id == 'NEW'){
          if(localRestaurant.idCompoRestaurant == itemSchedule.idRestaurant){
            if(itemSchedule.restaurantSchedules.length > 0){
              itemSchedule.deletedRestaurant = 'DELETED'
              itemSchedule.restaurantSchedules.forEach(itemArrayRestSchedules=>{
                itemArrayRestSchedules.deletedSchedule = "DELETED"
              })
            }
          }
        }
        else{
          if(localRestaurant.id == itemSchedule.idRestaurant){
            if(itemSchedule.restaurantSchedules.length > 0){
              itemSchedule.deletedRestaurant = 'DELETED'
              itemSchedule.restaurantSchedules.forEach(itemArrayRestSchedules=>{
                itemArrayRestSchedules.deletedSchedule = "DELETED"
              })
            }
          }
        }
      });

      //La variable de estado "restaurants" se modificara si los ids de "localRestaurant" coinciden con
      //los de la variable de estado
      this.restaurants.forEach(itemRestaurant => {
        if(itemRestaurant.id == 'NEW'){
          if(itemRestaurant.componentID == localRestaurant.componentID){
            itemRestaurant.deletedRestaurant = "DELETED"
          }
        }
        else{
          if(itemRestaurant.id == localRestaurant.id){
            itemRestaurant.deletedRestaurant = "DELETED"
          }
        }
      });

      //Del arrayComponents quitamos el restaurante que se esta eliminando
      this.arrayComponents.splice(idCompoMap, 1);

      //Seteamos tambien en "this.arrayComponentes" el "restauranNumber"
      //Que es el que indica que numero de restaurante estamos visualizando
      let fixRestauranNumber = 0;
      this.arrayComponents = this.arrayComponents.map(element=>{
        element.restauranNumber = fixRestauranNumber++;
        return element;
      })
      this.setArrayRestaurants(this.restaurants);
    },
  },
  components: {
    DynamicRestaurant,
  },
};
</script>
