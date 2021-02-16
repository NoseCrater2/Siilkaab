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
        rateModel: null,
        localArrayDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        ]
      }
    },
    created(){

    },
    computed:{
      ...mapState({
        rates: (state) => state.disponibilityMoule.rates,
        rooms: (state) => state.disponibilityMoule.arooms,
      }),
      computedRate: {
        get() {
          return this.rateModel;
        },
        set(model) {
          let bandera = false;
          let arrayFilteredDays = this.localArrayDays.filter((el)=>{
            if(!this.arrayDaysSelected.includes(el)){
              return el;
            }
          });
          console.log("arrayFilteredDays", arrayFilteredDays)
          this.rateModel = model;
          this.rates.map(rateItem => {
            if(rateItem.room_id == this.idRoomCompo || rateItem.id == "NEW"){
              if((rateItem.day == null && rateItem.start == null && rateItem.end == null && rateItem.rack == 0)){
                bandera = true;
                if(this.arrayDaysSelected.length > 0){
                  let countDay = 0;
                  this.localArrayDays.forEach((el)=>{
                    if(this.arrayDaysSelected.includes(el)){
                      if(model != ""){
                        rateItem[el] = parseInt(this.rateModel);
                      }
                      else{
                        rateItem[el] = 0;
                      }
                    }
                    else if(!this.arrayDaysSelected.includes(el)){
                      rateItem[el] = 0;
                    }
                  })
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
              this.localArrayDays.forEach((el)=>{
                if(this.arrayDaysSelected.includes(el)){
                  obj[el] = parseInt(this.rateModel);
                  if(model != ""){
                    obj[el] = parseInt(this.rateModel);
                  }
                  else{
                    obj[el] = 0;
                  }
                }
                else if(!this.arrayDaysSelected.includes(el)){
                  obj[el] = 0;
                }
              })
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