<template>
    <div>
        <v-tabs icons-and-text show-arrows :value.sync="iditemsListOptions" background-color="white" color="primary" grow>
            <v-tabs-slider :color="isThereAErrorMethod(iditemsListOptions) ? 'red' : 'primary'"></v-tabs-slider>
            <v-tab v-for="(item, i) in itemsListOptions" :key="i" @change="changeTab(i)" :class="getArrayErrors[i] == 422 ? 'v-tab v-tab--active' : ''" :style="getArrayErrors[i] == 422 ? 'color: #F44336;' : ''">
                <v-badge :content="setNumberErrors(i)" :value="getArrayErrors[i] == 422 ? true : false" color="red">
                    {{ item.text }}
                    <v-icon>{{ item.icon }}</v-icon>
                </v-badge>
            </v-tab>
        </v-tabs>
    </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
export default {
    name: "LateralMenuMobile",
    data() {
        return {
            isThereAError: false,
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
    methods:{
        ...mapMutations(["countIditemsListOptions"]),
        isThereAErrorMethod(index){
            if(this.getArrayErrors.indexOf(422, index) != -1){
                return true
            }
            return false
        },
        changeTab(i){
            this.countIditemsListOptions(i);
        },
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
    computed:{
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
};
</script>
