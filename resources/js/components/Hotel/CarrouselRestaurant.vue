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
      
    }),
  },
  methods: {
    //Esta mutacion setea restaurants
    ...mapMutations(["setArrayRestaurants"]),
    addCompoButton() {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activeRestaurants++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: {
          id: "NEW", //Se pone "NEW" para identificarlo en el posterior método PUT
          name: null,
          menu_type: null,
          schedules: [],
          hotel_id: this.hotel.id
        }
      });
      this.restaurants.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
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

