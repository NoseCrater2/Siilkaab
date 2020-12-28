<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4">
        <span class="text-center font-weight-bold overline">{{objArrCompo.name}}</span>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="mt-6">
        <v-text-field
          outlined
          label="Unidades"
          prepend-inner-icon="mdi-pencil"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="mt-6">
        <v-text-field
          outlined
          label="Tarifa"
          prepend-inner-icon="mdi-currency-usd-circle"
          dense
          v-model="computedRate"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: 'PeriodConfig',
    data(){
      return{
        rateModel: null
      }
    },
    created(){

    },
    computed:{
      ...mapState({
        rates: (state) => state.disponibilityMoule.rates,
      }),
      computedRate: {
        get() {
          return this.rateModel;
        },
        set(model) {
          this.rateModel = model;
          this.rates.map(rateItem => {
            if(rateItem.room_id == this.idRoomCompo){
              if(this.arrayDaysSelected.length > 0){
                let countDay = 0;
                while (countDay < this.arrayDaysSelected.length) {
                  let daySelected = this.arrayDaysSelected[countDay];
                  Object.keys(rateItem).forEach(ratePropertyDay=>{
                    if(daySelected == ratePropertyDay){
                      rateItem[daySelected] = parseInt(this.rateModel);
                      if(rateItem[daySelected] == ""){
                        rateItem[daySelected] = null;
                      }
                    }
                  })
                  countDay++;
                }
              }
              return rateItem;
            }
          });
          return this.rateModel;
        },
      },
    },
    props: {
      idCompo: Number,
      objArrCompo: Object,
      idRoomCompo: Number,
      arrayRangePeriod: Array,
      arrayDaysSelected: Array
    }
}
</script>