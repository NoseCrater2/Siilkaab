<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4">
        <div class="mt-n5">
          <span class="text-center font-weight-bold overline">{{rooms[indexCompo].name}}</span>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-text-field
          outlined
          autocomplete="off"
          label="Unidades"
          prepend-inner-icon="mdi-pencil"
          dense
          maxlength="3"
          v-model="computedUnity"
          @keydown="keyhandlerUnity" 
          :rules="[rules.validUnity]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-text-field
          outlined
          autocomplete="off"
          label="Tarifa"
          prepend-inner-icon="mdi-currency-usd-circle"
          dense
          v-model="computedRate"
          @keydown="keyhandlerRate" 
          :rules="[rules.validRate]"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    name: 'PeriodConfig',
    data(){
      return{
        rateModel: null,
        unityModel: null,
        localArrayDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        ],
        rules: {
          validUnity: value => {
            const pattern = /^([0-9]\d{0,3})$/
            let returned = true;
            if(typeof(this.unityModel) != 'object'){
              if(this.unityModel.length > 0){
                if(pattern.test(value) == false){
                  returned = 'Solo se aceptan numeros';
                }
              }
            }
            return returned;
          },
          validRate: value => {
            const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/
            let returned = true;
            if(typeof(this.rateModel) != 'object'){
              if(this.rateModel.length > 0){
                if(pattern.test(value) == false){
                  returned = 'Solo valores monetarios';
                }
              }
            }
            return returned;
          },
        },
      }
    },
    methods: {
      ...mapMutations(["mutationReloadDates", "mutationFlagCalendarModified", "mutationFlagCleanPeriodConfigTextfields"]),
      keyhandlerUnity(event) {
        const pattern = /^([0-9]\d{0,3})$/
        if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
          event.preventDefault();
        }
      },
      keyhandlerRate(event) {
        const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/
        if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab' && event.key != '.'){
          event.preventDefault();
        }
      },
      changeRate(model, modelRoomID, activatedBy="s"){
        if(this.rooms[this.indexCompo].id == modelRoomID){
          //Este delete elimina el color de las celdas de la habitacion (las resetea debido a que el calendario se actualiza en tiempo real insertando los colores)
          delete this.rooms[this.indexCompo].cellColor;
          let flagIsThereARate = false;
          let arrayFilteredDays = this.localArrayDays.filter((el)=>{
            if(!this.arrayDaysSelected.includes(el)){
              return el;
            }
          });
          this.rateModel = model;
          this.rates.map(rateItem => {
            if(rateItem.room_id == this.rooms[this.indexCompo].id || rateItem.id == "NEW"){
              if((rateItem.day == null && rateItem.start == null && rateItem.end == null && rateItem.rack == 0)){
                flagIsThereARate = true;
                if(this.arrayDaysSelected.length > 0){
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
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
                else{
                  if(activatedBy=="watch"){
                    //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                    this.mutationFlagCalendarModified(true);
                    let allDays = [
                                    "monday",
                                    "tuesday",
                                    "wednesday",
                                    "thursday",
                                    "friday",
                                    "saturday",
                                    "sunday"
                                  ]
                    allDays.forEach((el)=>{
                      if(rateItem[el] != 0){
                        rateItem[el] = 0;
                      }
                    })
                  }
                }
              }
              return rateItem;
            }
          });
          if(flagIsThereARate == false){
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
                room_id: this.rooms[this.indexCompo].id
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
              //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
              this.mutationFlagCalendarModified(true);
              this.rates.push(obj)
            }
          }
          //Esta mutacion permite recargar las fechas para que se acoplen con los colores que son (reinicia los colores en conujunto con los metodos de CalendarFee.vue)
          this.mutationReloadDates();
        }
      }
    },
    computed:{
      ...mapState({
        rates: (state) => state.disponibilityMoule.rates,
        rooms: (state) => state.disponibilityMoule.arooms,
        arrayItemsCalendar: (state) => state.disponibilityMoule.arrayItemsCalendar,
        flagCalendarModified: (state) => state.disponibilityMoule.flagCalendarModified,
        flagCleanPeriodConfigTextfields: (state) => state.disponibilityMoule.flagCleanPeriodConfigTextfields
      }),
      computedUnity: {
        get(){
          return this.unityModel;
        },
        set(model){
          // let flagIsThereARate = false;
          // let arrayFilteredDays = this.localArrayDays.filter((el)=>{
          //   if(!this.arrayDaysSelected.includes(el)){
          //     return el;
          //   }
          // });
          // console.log("arrayFilteredDays", arrayFilteredDays)
          // this.rateModel = model;
          // console.log(this.rates)
          // this.rates.map(rateItem => {
          //   if(rateItem.room_id == this.rooms[this.indexCompo].id || rateItem.id == "NEW"){
          //     if((rateItem.day == null && rateItem.start == null && rateItem.end == null && rateItem.rack == 0)){
          //       flagIsThereARate = true;
          //       if(this.arrayDaysSelected.length > 0){
          //         this.localArrayDays.forEach((el)=>{
          //           if(this.arrayDaysSelected.includes(el)){
          //             if(model != ""){
          //               rateItem[el] = parseInt(this.rateModel);
          //             }
          //             else{
          //               rateItem[el] = 0;
          //             }
          //           }
          //           else if(!this.arrayDaysSelected.includes(el)){
          //             rateItem[el] = 0;
          //           }
          //         })
          //       }
          //       else{
          //         let allDays = [
          //                         "monday",
          //                         "tuesday",
          //                         "wednesday",
          //                         "thursday",
          //                         "friday",
          //                         "saturday",
          //                         "sunday"
          //                       ]
          //         allDays.forEach((el)=>{
          //           if(rateItem[el] != 0){
          //             rateItem[el] = 0;
          //           }
          //         })
          //       }
          //     }
          //     return rateItem;
          //   }
          // });
          // if(flagIsThereARate == false){
          //   if(this.arrayDaysSelected.length > 0){
          //     let countDay = 0;
          //     let obj = {
          //       id: "NEWDAYS",
          //       type: "room",
          //       bed_rooms: 0,
          //       rack: 0,
          //       monday: 0,
          //       tuesday: 0,
          //       wednesday: 0,
          //       thursday: 0,
          //       friday: 0,
          //       saturday: 0,
          //       sunday: 0,
          //       room_id: this.rooms[this.indexCompo].id
          //     }
          //     this.localArrayDays.forEach((el)=>{
          //       if(this.arrayDaysSelected.includes(el)){
          //         obj[el] = parseInt(this.rateModel);
          //         if(model != ""){
          //           obj[el] = parseInt(this.rateModel);
          //         }
          //         else{
          //           obj[el] = 0;
          //         }
          //       }
          //       else if(!this.arrayDaysSelected.includes(el)){
          //         obj[el] = 0;
          //       }
          //     })
          //     this.rates.push(obj)
          //   }
          // }
          // //Esta mutacion permite recargar las fechas para que se acoplen con los colores que son (reinicia los colores en conujunto con los metodos de CalendarFee.vue)
          // this.mutationReloadDates();
          this.unityModel = model;
          return this.unityModel;
        }
      },
      computedRate: {
        get() {
          return this.rateModel;
        },
        set(model) {
          //Ejecuta el metodo para cambiar la tarifa
          this.changeRate(model, this.rooms[this.indexCompo].id);
          return this.rateModel;
        },
      },
    },
    watch: {
	    arrayDaysSelected(nuevoValor, valorAnterior){
        if(this.rateModel != null){
          if(this.rateModel > 0){
            if(this.flagCleanPeriodConfigTextfields == true){
              this.rateModel = "";
              if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
              }
              return; //Esto para salir inmediatamente de este metodo sin ejecutar lo demas
            }
            this.changeRate(this.rateModel, this.rooms[this.indexCompo].id, "watch");
          }
          else{
            if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
            }
          }
        }
      }
    },
    props: {
      idCompo: Number,
      indexCompo: Number,
      arrayRangePeriod: Array,
      arrayDaysSelected: Array
    }
}
</script>