<template>
  <div>
    <div>
      <v-row justify="space-around">
        <strong>Piscinas activas: {{ activePools }}</strong>
      </v-row>

      <v-carousel
        light
        hide-delimiters
        v-model="lastCarouselElement"
        :show-arrows-on-hover="activePools>1"
        :show-arrows="activePools>1"
      >
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
          :objArrCompo="component.objArrCompo"
          :key="component.idCompo"
          :is="component.TagDPool"
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
        >Añadir piscina</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarrouselPool",
};
</script>

<script>
import DynamicPool from "./DynamicPool";
import { mapState } from "vuex";
export default {
  name: "CarrouselPool",
  created() {
    let count = 0;
    while (count <= this.pools.length - 1) {
      this.addCompo(this.pools[count]);
      count++;
    }
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      activePools: 0,
    };
  },
  computed: {
    ...mapState({
      pools: (state) => state.HotelModule.pools,
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
      this.activePools++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: DynamicPool,
      });
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.activePools++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: DynamicPool,
        objArrCompo: obj,
      });
    },
    removeCompo(idCompoParam) {
      this.countIdCompo--;
      this.activePools--;
      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);
      this.arrayComponents.splice(idCompoMap, 1);
    },
  },
  components: {
    DynamicPool,
  },
};
</script>