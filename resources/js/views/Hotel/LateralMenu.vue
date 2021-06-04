<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <v-list dense>
        <v-list-item-group
          :value.sync="iditemsListOptions"
          color="primary"
          mandatory
        >
          <v-list-item
            :class="getArrayErrors[i] == 422 ? 'v-item--active v-list-item--active' : ''"
            v-for="(item, i) in itemsListOptions"
            :key="i"
            @click="countIditemsListOptions(i)"
            :color="getArrayErrors[i] == 422 ? 'red' : 'primary'"
          >
            <v-list-item-icon>
              <v-badge :content="setNumberErrors(i)" :value="getArrayErrors[i] == 422 ? true : false" bordered offset-x="7" offset-y="15" left color="red" overlap>
                <v-icon v-text="item.icon"></v-icon>
              </v-badge>
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
import { mapState, mapMutations, mapGetters } from "vuex";
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
        { text: "Información adicional", icon: "mdi-tag-multiple" },
      ],
    };
  },

  computed: {
    ...mapGetters(["getArrayErrors"]),
    ...mapState({
      iditemsListOptions: (state) => state.HotelModule.iditemsListOptions,
      errorsInformation: (state) => state.HotelModule.errorsInformation,
      errorsConfiguration: (state) => state.HotelModule.errorsConfiguration,
      errorsContacts: (state) => state.HotelModule.errorsContacts,
      errorsConditions: (state) => state.HotelModule.errorsConditions,
      errorsRegimes: (state) => state.HotelModule.errorsRegimes,
      errorsAditionalInfo: (state) => state.HotelModule.errorsAditionalInfo,
      errorsRestaurants: (state) => state.HotelModule.errorsRestaurants,
      errorsSchedules: (state) => state.HotelModule.errorsSchedules,
      errorsPools: (state) => state.HotelModule.errorsPools,
    }),
  },
  methods: {

    ...mapMutations(["countIditemsListOptions"]),
    setNumberErrors(index) {
      if (index == 0 && this.errorsInformation) {
        return Object.keys(this.errorsInformation).length;
      }
      if (index == 1 && this.errorsConfiguration) {
        let countErrors;
        if(typeof(this.errorsConfiguration.payment_place) != 'undefined'){
          countErrors = Object.keys(this.errorsConfiguration).length + 1;
        }
        else{
          countErrors = Object.keys(this.errorsConfiguration).length;
        }
        return countErrors;
      }
      if (index == 2 && this.errorsContacts) {
        return Object.keys(this.errorsContacts).length;
      }
      if (index == 3 && this.errorsConditions) {
        return Object.keys(this.errorsConditions).length;
      }
      if (index == 4 && this.errorsRegimes) {
        let countErrors = 0;
        for (const itemError of this.errorsRegimes) {
          countErrors += Object.keys(itemError.error).length;
        }
        return countErrors;
      }
      if (index == 5 && (this.errorsAditionalInfo || this.errorsRestaurants || this.errorsSchedules || this.errorsPools)) {
        let countErrors = 0;
        for (const itemError of this.errorsAditionalInfo) {
          countErrors += Object.keys(itemError.error).length;
        }
        for (const itemError of this.errorsRestaurants) {
          countErrors += Object.keys(itemError.error).length;
        }
        for (const itemError of this.errorsSchedules) {
          countErrors += Object.keys(itemError.error).length;
        }
        for (const itemError of this.errorsPools) {
          countErrors += Object.keys(itemError.error).length;
        }
        return countErrors;
      }
    },
  },
};
</script>
