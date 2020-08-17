<template>
  <div>
    <div>
      <v-row justify="space-around">
        <strong>Restaurantes activos: {{ activeRestaurants }}</strong>
      </v-row>

      <v-carousel
        light
        hide-delimiters
        v-model="lastCarouselElement"
        :show-arrows-on-hover="activeRestaurants>1"
        :show-arrows="activeRestaurants>1"
      >
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
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
import { mapState } from "vuex";
export default {
  name: "CarrouselRestaurant",
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
    };
  },
  computed: {
    ...mapState({
      restaurants: (state) => state.HotelModule.restaurants,
    }),
    lastCarouselElement: {
      get() {
        return this.countIdCompo;
      },
      set() {
        return this.countIdCompo;
      },
    },
  },
  methods: {
    addCompoButton() {
      this.countIdCompo++;
      this.activeRestaurants++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
      });
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.activeRestaurants++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: DynamicRestaurant,
        objArrCompo: obj,
      });
    },
    removeCompo(idCompoParam) {
      this.countIdCompo--;
      this.activeRestaurants--;
      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);
      this.arrayComponents.splice(idCompoMap, 1);
    },
  },
  components: {
    DynamicRestaurant,
  },
};
</script>

