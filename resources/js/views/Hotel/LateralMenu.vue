<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <v-list dense>
        <v-list-item-group :value.sync="iditemsListOptions" mandatory color="primary">
          <v-list-item
            v-for="(item, i) in itemsListOptions"
            :key="i"
            @click="countIditemsListOptions(i)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "LateralMenu",
  data() {
    return {
      itemsListOptions: [
        { text: "Información", icon: "mdi-information" },
        { text: "Configuración", icon: "mdi-cog" },
        { text: "Contacto", icon: "mdi-email" },
        { text: "Condiciones", icon: "mdi-gavel" },
        { text: "Regimenes", icon: "mdi-silverware-fork-knife" },
        { text: "Información adicional", icon: "mdi-tag-multiple" }
      ]
    };
  },
  computed: {
    ...mapState({
      iditemsListOptions: state => state.HotelModule.iditemsListOptions
    })
  },
  methods: {
    ...mapMutations(["countIditemsListOptions"])
  }
};
</script>