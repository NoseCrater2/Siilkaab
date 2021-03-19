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
          @keyup="validateQuantity"
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

import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment); //Extendemos moment.js con los rangos
moment.locale("es"); //Cambiamos el lenguaje de moment

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
                if(parseInt(this.unityModel) > this.rooms[this.indexCompo].quantity){
                  returned = 'No puede introducir una cantidad que exceda el numero de habitaciones existentes';
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
      validateQuantity(event){
        if(parseInt(this.unityModel) > parseInt(this.rooms[this.indexCompo].quantity)){
          let subs = parseInt(this.unityModel) - parseInt(this.rooms[this.indexCompo].quantity)
          let quantity = parseInt(this.unityModel) - subs
          this.unityModel = quantity.toString();
        }
      },
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
      changeRate(modelRate, modelUnity, modelRoomID, activatedBy="default"){
        if(this.rooms[this.indexCompo].id == modelRoomID){
          //Este delete elimina el color de las celdas de la habitacion (las resetea debido a que el calendario se actualiza en tiempo real insertando los colores)
          delete this.rooms[this.indexCompo].cellColor;
          let flagIsThereARateHigh = false; //Variable que controla si hay una tarifa de prioridad mas alta
          let flagIsThereARateMedium = false; //Variable que controla si hay una tarifa de prioridad mediana
          let flagIsThereARateLow = false; //Variable que controla si hay una tarifa de prioridad mas baja
          let arrayFilteredDays = this.localArrayDays.filter((el)=>{
            if(!this.arrayDaysSelected.includes(el)){
              return el;
            }
          });
          this.rateModel = modelRate;
          this.unityModel = modelUnity;
          this.rates.map(rateItem => {
            if(rateItem.room_id == this.rooms[this.indexCompo].id){
              //CONDICIONES DE TARIFAS PRIORIDADES ALTA Y MEDIA INICIA
              if(this.flagIsEditingRange == true){
                if(rateItem.monday == 0 && rateItem.tuesday == 0 && rateItem.wednesday == 0 && rateItem.thursday == 0 && rateItem.friday == 0 && rateItem.saturday == 0 && rateItem.sunday == 0){
                  if((rateItem.day != null || (rateItem.start != null && rateItem.end != null))){
                    //CONDICIONES DE TARIFAS PRIORIDADES ALTA INICIA
                    if(typeof(this.arrayRangePeriod) == 'string'){
                      if(rateItem.day != null || rateItem.day == "day"){
                        flagIsThereARateHigh = true;
                        //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                        this.mutationFlagCalendarModified(true);
                        if(typeof(modelUnity) != 'object'){
                          if(modelUnity != ""){
                            rateItem.day = this.arrayRangePeriod
                            rateItem.bed_rooms = parseInt(this.unityModel)
                          }
                          else if(modelUnity == ""){
                            rateItem.day = "day"
                            rateItem.bed_rooms = 0
                          }
                        }
                        else if(typeof(modelUnity) == 'object'){
                          rateItem.day = "day"
                          rateItem.bed_rooms = 0;
                        }

                        if(typeof(modelRate) != 'object'){
                          if(modelRate != ""){
                            rateItem.day = this.arrayRangePeriod
                            rateItem.rack = parseFloat(this.rateModel);
                          }
                          else if(modelRate == ""){
                            if(modelUnity == ""){
                              rateItem.day = "day"
                            }
                            rateItem.rack = 0;
                          }
                        }
                        else if(typeof(modelRate) == 'object'){
                          rateItem.day = "day"
                          rateItem.rack = 0;
                        }
                      }
                    }
                    //CONDICIONES DE TARIFAS PRIORIDADES ALTA TERMINA
                    //CONDICIONES DE TARIFAS PRIORIDADES MEDIA INICIA
                    else if(typeof(this.arrayRangePeriod) == 'object'){
                      if((rateItem.start != null || rateItem.start == "start") && (rateItem.end != null || rateItem.end == "end")){
                        flagIsThereARateMedium = true;
                        //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                        this.mutationFlagCalendarModified(true);
                        if(typeof(modelUnity) != 'object'){
                          if(modelUnity != ""){
                            rateItem.start = this.arrayRangePeriod[0]
                            rateItem.end = this.arrayRangePeriod[1]
                            rateItem.bed_rooms = parseInt(this.unityModel)
                          }
                          else if(modelUnity == ""){
                            rateItem.start = "start"
                            rateItem.end = "end"
                            rateItem.bed_rooms = 0
                          }
                        }
                        else if(typeof(modelUnity) == 'object'){
                          rateItem.start = "start"
                          rateItem.end = "end"
                          rateItem.bed_rooms = 0;
                        }

                        if(typeof(modelRate) != 'object'){
                          if(modelRate != ""){
                            rateItem.start = this.arrayRangePeriod[0]
                            rateItem.end = this.arrayRangePeriod[1]
                            rateItem.rack = parseFloat(this.rateModel);
                          }
                          else if(modelRate == ""){
                            if(modelUnity == ""){
                              rateItem.start = "start"
                              rateItem.end = "end"
                            }
                            rateItem.rack = 0;
                          }
                        }
                        else if(typeof(modelRate) == 'object'){
                          rateItem.start = "start"
                          rateItem.end = "end"
                          rateItem.rack = 0;
                        }
                      }
                    }
                    //CONDICIONES DE TARIFAS PRIORIDADES MEDIA TERMINA
                  }
                }
              }
              //CONDICIONES DE TARIFAS PRIORIDADES ALTA Y MEDIA TERMINA
              //CONDICIONES DE TARIFAS PRIORIDAD MAS BAJA INICIA
              else if(this.flagIsEditingRange == false){
                if((rateItem.day == null && rateItem.start == null && rateItem.end == null && rateItem.rack == 0)){
                  flagIsThereARateLow = true;
                  if(this.arrayDaysSelected.length > 0){
                    //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                    this.mutationFlagCalendarModified(true);
                    this.localArrayDays.forEach((el)=>{
                      if(this.arrayDaysSelected.includes(el)){
                        if(typeof(modelUnity) != 'object'){
                          if(modelUnity != ""){
                            rateItem.bed_rooms = parseInt(this.unityModel)
                          }
                          else if(modelUnity == ""){
                            rateItem.bed_rooms = 0
                          }
                        }
                        else if(typeof(modelUnity) == 'object'){
                          rateItem.bed_rooms = 0;
                        }

                        if(typeof(modelRate) != 'object'){
                          if(modelRate != ""){
                            rateItem[el] = parseFloat(this.rateModel);
                          }
                          else if(modelRate == ""){
                            rateItem[el] = 0;
                          }
                        }
                        else if(typeof(modelRate) == 'object'){
                          rateItem[el] = parseFloat(this.rateModel);
                        }
                      }
                      else if(!this.arrayDaysSelected.includes(el)){
                        rateItem[el] = 0;
                      }
                    })
                  }
                  else{
                    if(activatedBy=="watchP3"){
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
              }
              //CONDICIONES DE TARIFAS PRIORIDAD MAS BAJA TERMINA
              return rateItem;
            }
          });
          //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MAS ALTA INICIA
          if(this.flagIsEditingRange == true){
            if(flagIsThereARateHigh == false){
              if(typeof(this.arrayRangePeriod) == 'string'){
                if(this.unityModel != "" && this.unityModel != null){
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: parseInt(this.unityModel),
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0,
                    day: this.arrayRangePeriod,
                    rack: 0,
                    room_id: this.rooms[this.indexCompo].id
                  }
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
                  if(typeof(this.rateModel) != 'object'){
                    if(this.rateModel != ""){
                      obj.rack = parseFloat(this.rateModel);
                    }
                  }
                  this.rates.push(obj)
                }
                else if(this.rateModel != "" && this.rateModel != null){
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: 0,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0,
                    day: this.arrayRangePeriod,
                    rack: parseFloat(this.rateModel),
                    room_id: this.rooms[this.indexCompo].id
                  }
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
                  this.rates.push(obj)
                }
              }
            }
            //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MAS ALTA TERMINA
            //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MEDIA INICIA
            if(flagIsThereARateMedium == false){
              if(typeof(this.arrayRangePeriod) == 'object'){
                if(this.unityModel != "" && this.unityModel != null){
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: parseInt(this.unityModel),
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0,
                    start: this.arrayRangePeriod[0],
                    end: this.arrayRangePeriod[1],
                    rack: 0,
                    room_id: this.rooms[this.indexCompo].id
                  }
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
                  if(typeof(this.rateModel) != 'object'){
                    if(this.rateModel != ""){
                      obj.rack = parseFloat(this.rateModel);
                    }
                  }
                  this.rates.push(obj)
                }
                else if(this.rateModel != "" && this.rateModel != null){
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: 0,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0,
                    start: this.arrayRangePeriod[0],
                    end: this.arrayRangePeriod[1],
                    rack: parseFloat(this.rateModel),
                    room_id: this.rooms[this.indexCompo].id
                  }
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
                  this.rates.push(obj)
                }
              }
            }
          }
          //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MEDIA TERMINA
          //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MAS BAJA INICIA
          else if(this.flagIsEditingRange == false){
            if(flagIsThereARateLow == false){
              if(this.arrayDaysSelected.length > 0){
                if((this.unityModel != "" && this.unityModel != null) && (this.rateModel != "" && this.rateModel != null)){
                  let countDay = 0;
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: parseInt(this.unityModel),
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
                      obj[el] = parseFloat(this.rateModel);
                      if(modelRate != ""){
                        obj[el] = parseFloat(this.rateModel);
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
                else if(this.unityModel != "" && this.unityModel != null){
                  let countDay = 0;
                  let obj = {
                    id: "NEWDAYS",
                    type: "room",
                    bed_rooms: parseInt(this.unityModel),
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
                  //Se setea la variable vuex a true para indicar que ya se hizo un cambio en las rates
                  this.mutationFlagCalendarModified(true);
                  this.rates.push(obj)
                }
                else if(this.rateModel != "" && this.rateModel != null){
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
                      obj[el] = parseFloat(this.rateModel);
                      if(modelRate != ""){
                        obj[el] = parseFloat(this.rateModel);
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
            }
          }
          //CONDICIONES DE TARIFAS NUEVAS PRIORIDAD MAS BAJA TERMINA
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
          //Ejecuta el metodo para cambiar la tarifa
          let modelUnity = model;
          if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
            let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
            let quantity = parseInt(modelUnity) - subs
            modelUnity = quantity.toString();
          }
          this.changeRate(this.rateModel, modelUnity, this.rooms[this.indexCompo].id);
          return this.unityModel;
        }
      },
      computedRate: {
        get() {
          return this.rateModel;
        },
        set(model) {
          //Ejecuta el metodo para cambiar la tarifa
          let modelUnity = this.unityModel;
          if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
            let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
            let quantity = parseInt(modelUnity) - subs
            modelUnity = quantity.toString();
          }
          this.changeRate(model, modelUnity, this.rooms[this.indexCompo].id);
          return this.rateModel;
        },
      },
    },
    watch: {
	    arrayDaysSelected(nuevoValor, valorAnterior){
        if(this.rateModel != null || this.unityModel != null){
          if(this.rateModel > 0 || this.unityModel > 0){
            if(this.flagCleanPeriodConfigTextfields == true){
              this.rateModel = "";
              this.unityModel = "";
              if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
              }
              return; //Esto para salir inmediatamente de este metodo sin ejecutar lo demas
            }
            let modelUnity = this.unityModel;
            if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
              let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
              let quantity = parseInt(modelUnity) - subs
              modelUnity = quantity.toString();
            }
            this.changeRate(this.rateModel, modelUnity, this.rooms[this.indexCompo].id, "watchP3");
          }
          else{
            let modelUnity = this.unityModel;
            if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
              let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
              let quantity = parseInt(modelUnity) - subs
              modelUnity = quantity.toString();
            }
            this.changeRate(this.rateModel, modelUnity, this.rooms[this.indexCompo].id, "watchP3");
            if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
            }
          }
        }
        else if(this.rateModel == null || this.unityModel == null){
          if(this.rooms.length -1 == this.indexCompo){
            this.mutationFlagCleanPeriodConfigTextfields(false);
          }
        }
      },
      arrayRangePeriod(nuevoValor, valorAnterior){
        if(this.rateModel != null || this.unityModel != null){
          if(this.rateModel > 0 || this.unityModel > 0){
            if(this.flagCleanPeriodConfigTextfields == true){
              this.rateModel = "";
              this.rateModel = ""
              if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
              }
              return; //Esto para salir inmediatamente de este metodo sin ejecutar lo demas
            }
            let modelUnity = this.unityModel;
            if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
              let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
              let quantity = parseInt(modelUnity) - subs
              modelUnity = quantity.toString();
            }
            this.changeRate(this.rateModel, modelUnity, this.rooms[this.indexCompo].id);
          }
          else{
            let modelUnity = this.unityModel;
            if(parseInt(modelUnity) > parseInt(this.rooms[this.indexCompo].quantity)){
              let subs = parseInt(modelUnity) - parseInt(this.rooms[this.indexCompo].quantity)
              let quantity = parseInt(modelUnity) - subs
              modelUnity = quantity.toString();
            }
            this.changeRate(this.rateModel, modelUnity, this.rooms[this.indexCompo].id);
            if(this.rooms.length -1 == this.indexCompo){
                this.mutationFlagCleanPeriodConfigTextfields(false);
            }
          }
        }
        else if(this.rateModel == null || this.unityModel == null){
          if(this.rooms.length -1 == this.indexCompo){
            this.mutationFlagCleanPeriodConfigTextfields(false);
          }
        }
      }
    },
    props: {
      idCompo: Number,
      indexCompo: Number,
      arrayRangePeriod: {
        type: [ String, Array ]
      },
      arrayDaysSelected: Array,
      flagIsEditingRange: Boolean
    }
}
</script>