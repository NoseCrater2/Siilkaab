<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4">
        <span class="text-center font-weight-bold overline">{{objArrCompo.name}}</span>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="mt-6">
        <v-text-field
          outlined
          label="Disponibilidad"
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
          let bandera = false;
          this.rateModel = model;
          this.rates.map(rateItem => {
            if(rateItem.room_id == this.idRoomCompo || rateItem.id == "NEW"){
              if((rateItem.day == null && rateItem.start == null && rateItem.end == null && rateItem.rack == 0)){
                bandera = true;
                if(this.arrayDaysSelected.length > 0){
                  let countDay = 0;
                  while (countDay < this.arrayDaysSelected.length) {
                    let daySelected = this.arrayDaysSelected[countDay];
                    Object.keys(rateItem).forEach(ratePropertyDay=>{
                      if(daySelected == ratePropertyDay){
                        if(model != ""){
                          rateItem[daySelected] = parseInt(this.rateModel);
                        }
                        else{
                          rateItem[daySelected] = 0;
                        }
                      }
                    })
                    countDay++;
                  }
                }
              }
              return rateItem;
            }
          });
          if(bandera == false){
            if(this.arrayDaysSelected.length > 0){
              let countDay = 0;
              let obj = {
                id: "NEWDAYS",
                type: "room",
                bed_rooms: 0,
                rack: 0,
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0,
                saturday: 0,
                sunday: 0,
                room_id: this.idRoomCompo
              }
              while (countDay < this.arrayDaysSelected.length) {
                let daySelected = this.arrayDaysSelected[countDay];
                Object.keys(obj).forEach(ratePropertyDay=>{
                  if(daySelected == ratePropertyDay){
                    obj[daySelected] = parseInt(this.rateModel);
                      if(model != ""){
                        obj[daySelected] = parseInt(this.rateModel);
                      }
                      else{
                        obj[daySelected] = 0;
                      }
                  }
                })
                countDay++;
              }
              this.rates.push(obj)
            }
          }
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