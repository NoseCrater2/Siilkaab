<template>
  <div>
    <div>
      <v-row justify="space-around">
        <strong>Piscinas activas: {{ activePools }}</strong>
      </v-row>

      <v-carousel
        light
        hide-delimiters
        v-model="countLastElementCarrousel"
        :show-arrows-on-hover="activePools>1"
        :show-arrows="activePools>1"
      >
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
          :idPool="component.objArrCompo.id"
          :idCompoPool="component.objArrCompo.idCompoPool"
          :poolNumber="component.poolNumber"
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "CarrouselPool",
  created() {
    let count = 0;
    //La variable "filteredDeletedPools" es util para poner unicamente los restaurantes que no fueron eliminados
    let filteredDeletedPools = this.pools.filter(itemPool=>{
      if(typeof(itemPool.deletedPool) == 'undefined'){
        return itemPool;
      }
    });
    while (count < filteredDeletedPools.length) {
      this.addCompo(filteredDeletedPools[count]);
      count++;
    }

  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      activePools: 0,
      countLastElementCarrousel: 0
    };
  },
  computed: {
    ...mapState({
        hotel: (state) => state.HotelModule.hotel,
        pools: (state) => state.HotelModule.pools,
    }),
  },
  methods: {
      ...mapMutations(['setArrayPools']),
    addCompoButton() {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activePools++;
      let putId = this.countIdCompo + "" + "NEW"; //ID que se seteara al crear los horarios
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: DynamicPool,
        poolNumber: this.countLastElementCarrousel,
        objArrCompo: {
            id: "NEW",
            idCompoPool: putId,
            name: null,
            type: null,
            air_conditioned: 0,
            panoramic_view: 0,
            wading_pool: 0,
            towels: 0,
            bar_pool: 0,
            open_at: null,
            close_at: null,
            hotel_id: this.hotel.id
        }
      });
      this.pools.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
    },

    addCompo(obj) {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activePools++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: DynamicPool,
        poolNumber: this.countLastElementCarrousel,
        objArrCompo: obj,
      });
    },

    removeCompo(idCompoParam) {
      //Variable del v-model carrousel la decrementamos
      this.countLastElementCarrousel--;
      this.activePools--;
      let idCompoMap = this.arrayComponents.map((element) => element.idCompo).indexOf(idCompoParam);

      //localPool se utiliza para obtener una copia del restaurante que se esta eliminando
      let localPool = this.arrayComponents[idCompoMap].objArrCompo;

      //La variable de estado "pools" se modificara si los ids de "localPool" coinciden con
      //los de la variable de estado
      this.pools.forEach(itemPool => {
        if(itemPool.id == 'NEW'){
          if(itemPool.componentID == localPool.componentID){
            itemPool.deletedPool = "DELETED"
          }
        }
        else{
          if(itemPool.id == localPool.id){
            itemPool.deletedPool = "DELETED"
          }
        }
      });

      //Del arrayComponents quitamos la piscina que se esta eliminando
      this.arrayComponents.splice(idCompoMap, 1);

      //Seteamos tambien en "this.arrayComponentes" el "poolNumber"
      //Que es el que indica que numero de restaurante estamos visualizando
      let fixPoolNumber = 0;
      this.arrayComponents = this.arrayComponents.map(element=>{
        element.poolNumber = fixPoolNumber++;
        return element;
      })
      this.setArrayPools(this.pools);
    }
  },
  components: {
    DynamicPool,
  },
};
</script>
