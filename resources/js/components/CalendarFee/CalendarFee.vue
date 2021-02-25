<template>
  <div class="about">
    <!--Instalé moment.js-->
    <div class="d-flex justify-end mb-3">
      <v-btn @click="pagination('prev')" class="mr-4 primary">Atras</v-btn>
      <v-btn @click="pagination('next')" class="primary">Siguiente</v-btn>
    </div>
    <div>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
        <tr class="text-uppercase">
          <th class="headcol empty-col">
            <div class="ml-3">
              <v-row class="d-flex align-center my-n2">
                <span class="mr-4">Dia en específico</span><v-sheet color="blue lighten-2" height="11" width="11" class="ml-1"></v-sheet>
              </v-row>
              <v-row class="d-flex align-center my-n2">
                <span class="mr-6">Rango de fecha</span><v-sheet color="red darken-1" height="11" width="11" class="ml-1"></v-sheet>
              </v-row>
              <v-row class="d-flex align-center my-n2">
                <span>Dia(s) de la semana </span><v-sheet color="deep-purple lighten-3" height="11" width="11" class="ml-1"></v-sheet>
              </v-row>
            </div>
          </th>
          <th
            v-for="(objDate, index) in arrayItemsCalendar[
              generalIndexArrayItemsCalendar
            ]"
            :key="index"
            :class="objDate.nameDay == daySelected ? 'dateCol text-center' : 'dateCol text-center'"
          >
          <span>{{objDate.nameDay.substring(0,3)}}</span><br>
          <span>{{objDate.numberDay}}</span><br>
          <span>{{objDate.month}}</span><br>
          <span>{{objDate.year}}</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(objRoom, indexRoom) in arrEndpointRooms" :key="indexRoom">
          <td class="headcol"><span class="font-weight-bold">{{objRoom.name}}</span><br></td>
          <td v-for="(objDate, index) in arrayItemsCalendar[generalIndexArrayItemsCalendar]" :key="index" :class="setCellColor(objRoom, objDate)">
            <!-- <div v-if="typeof(rates[indexRoom])!='undefined'">
                      <input v-model="rates[indexRoom].rack" placeholder="$ Precio"/><br />
                  </div> -->
            <!-- <v-icon x-small class="ml-n3 mr-n1">mdi-pencil</v-icon> -->
            <input v-model="objRoom.bed_rooms" class="centerContent"/>
            <div>
               <v-icon x-small class="ml-n4 mr-4" >mdi-currency-usd</v-icon>
              <!-- Debe de haber de menos un rate para que sea disponible quantity en endpoints rooms-->
              <!-- <v-icon x-small class="ml-n3 mr-n1">mdi-currency-usd</v-icon> -->
              <input :value="priority(objDate, objRoom, indexRoom, index)" class="centerContent"/><br />
            </div>
          </td>
        </tr>
        </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
//Instalar moment.js con npm e importar
//npm install moment
//Instalar plugin de rangos moment; "moment-range"
//npm install --save moment-range

import { mapState, mapActions } from "vuex";

import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment); //Extendemos moment.js con los rangos
moment.locale("es"); //Cambiamos el lenguaje de moment

export default {
  name: "CalendarFee",
  data() {
    return {
      //Variable que sera el año global del componente calendario
      generalYear: moment().year(),
      //Variable que sera el mes actual global del componente calendario
      generalCurrentMonth: moment().month(),
      //Variable que sera el dia(n) actual global del componente calendario
      generalCurrentDay: moment().date(),
      //Variable que guardara los arreglos de objetos de calendario (arrayDatesCalendar)
      arrayItemsCalendar: [],
      //Variable que sera utilizada para cambiar entre posiciones del arreglo "arrayItemsCalendar" utilizado en la tabla de fechas
      generalIndexArrayItemsCalendar: 0,
      //Variable utilizada para llevar la longitud del arreglo "arrayItemsCalendar"
      lengthArrayItemsCalendar: 0,
    };
  },
  created() {
    //tarifas{idHabitacion, tipoTarifa(habitacion, persona), start(fechaRango), end(fechaRango), day(fechaUnSoloDia), precio, cantidadHabitaciones}

    //tarifas un solo dia (dd mm yyyy) priority 1
    //tarifas rango fecha (fechas especificas) priority 2
    //tarifas dias de la semana(solo importa dia) double('monday')->default(0.0); priority 3

    // $table->date('start')->nullable();
    //     $table->date('end')->nullable();
    //     $table->date('day')->nullable();

    //obj = numeroDia, nombreDia, mes, año, cantidad habitaciones, precio

    // Lo que debería pasar si una habitación no tiene tarifas,
    // es que en todos los campos debería mostrarse su tarifa rack
    // y su cantidad de habitaciones disponibles

    this.loadDates(); //Se llama al metodo "loadDates" que cargara los datos de fechas para crear la tabla de fechas
  },
  methods: {
    //Metodo que llevara la paginacion de la tabla mediante los botones "atras" y "adelante"
    pagination(actionPag) {
      if (actionPag == "next") {
        //Este if es utilizado para que no haya choque de contadores. Los contadores permiten el correcto
        //funcionamiento de los botones "atras" y "adelante"
        if (
          this.generalIndexArrayItemsCalendar == this.lengthArrayItemsCalendar
        ) {
          this.loadDates(); //Se llama al metodo "loadDates" que cargara los datos de fechas para crear la tabla de fechas
          this.lengthArrayItemsCalendar++; //Se incrementa el contador del longitud de la variable general "this.lengthArrayItemsCalendar"
          this.generalIndexArrayItemsCalendar++; //Se incrementa el contador del indice del arreglo general "this.arrayItemsCalendar"
        } else {
          //Si el if dio falso al momento de checar los indices de contadores
          //entonces el indice del "arrayItemsCalendar" se aumenta
          this.generalIndexArrayItemsCalendar++;
        }
      }
      if (actionPag == "prev") {
        //Este if es utilizado para descender en los indices del arreglo
        //"arrayItemsCalendar"; ademas esta variable/indice no se deja que llegue a valores negativos
        if (this.generalIndexArrayItemsCalendar > 0) {
          this.generalIndexArrayItemsCalendar--;
        }
      }
    },
    //Metodo que lleva la logica para crear y cargar los datos de fechas en la tabla de fechas
    loadDates() {
      let arrayDatesCalendar = []; //Variable que sera el arreglo de objetos de fecha, utilizado para insertarse en el arreglo general "this.arrayItemsCalendar"
      // console.log("TODAY", this.generalCurrentDay)
      let today = this.generalCurrentDay; //Variable que guarda el dia actual (sera el dia que aparezca en la primera columna de la tabla)
      let daysNextMonth = 30 - (31 - today); //Variable que guarda la cantidad de dias del siguiente mes que seran mostrados en la tabla
      let totalDaysCalendar = daysNextMonth + 31; //Variable que lleva el total de dias que se mostraran en la tabla (por defecto "30")
      //El ciclo siempre imprimira 30 dias, sin embargo cada iteracion del ciclo comienza desde el dia actual
      //Ejemplo: i = today = 6; i < totalDaysCalendar = 36; es decir, este ciclo se imprimira desde
      //6 hasta 36 (36 - 6 = 30)
      for (let i = today; i < totalDaysCalendar; i++) {
        //Variable que guarda la fecha actual de la actual iteracion
        let currentDate = moment()
          .year(this.generalYear)
          .month(this.generalCurrentMonth)
          .date(i)
          .format("dddd, DD MMM YYYY");
        //Variable que guarda la fecha actual de la actual iteracion en formato "YYYY-M-DD"
        let dateYYYYMMDD = moment()
          .year(this.generalYear)
          .month(this.generalCurrentMonth)
          .date(i)
          .format("YYYY-MM-DD");

        //Cortamos la fecha actual mediante una expresion regular, para separarla por "nombreDia, numeroDia, mes, año"
        let splitCurrentDate = currentDate.split(/[ ,]+/);
        //Construimos un objeto con el arreglo "splitCurrentDate" y este sera el objeto de fechas que se introducira en el arreglo "arrayDatesCalendar"

        let nameDayEnglish = "";

        switch (splitCurrentDate[0]) {
          case "lunes":
            nameDayEnglish = "monday";
            break;
          case "martes":
            nameDayEnglish = "tuesday";
            break;
          case "miércoles":
            nameDayEnglish = "wednesday";
            break;
          case "jueves":
            nameDayEnglish = "thursday";
            break;
          case "viernes":
            nameDayEnglish = "friday";
            break;
          case "sábado":
            nameDayEnglish = "saturday";
            break;
          case "domingo":
            nameDayEnglish = "sunday";
            break;
        }

        let objDate = {
          nameDay: splitCurrentDate[0],
          nameDayEnglish: nameDayEnglish,
          numberDay: parseInt(splitCurrentDate[1]),
          month: splitCurrentDate[2],
          year: parseInt(splitCurrentDate[3]),
          dateYYYYMMDD: dateYYYYMMDD,
          price: null,
          numberRooms: null,
          idRoom: []
        };
        arrayDatesCalendar.push(objDate); //Se introduce el objeto recien creado en el arreglo
      }
      this.arrayItemsCalendar.push(arrayDatesCalendar); //Se introduce el arreglo de fechas al arreglo general de fechas
      this.generalYear = arrayDatesCalendar[29].year; //Se guarda el año en base al ultimo elemento existente del arreglo local de fechas ("arrayDatesCalendar")
      this.generalCurrentDay = arrayDatesCalendar[29].numberDay + 1; //Se guarda el numero de dia en base al ultimo elemento existente del arreglo local de fechas ("arrayDatesCalendar")
      //Este switch es utilizado para guardar el numero de mes en la variable general "this.generalCurrentMonth" en base al String de fecha existente
      //como propiedad de objeto del arreglo local de fechas ("arrayDatesCalendar")
      switch (arrayDatesCalendar[29].month) {
        case "ene.":
          this.generalCurrentMonth = 0;
          break;
        case "feb.":
          this.generalCurrentMonth = 1;
          break;
        case "mar.":
          this.generalCurrentMonth = 2;
          break;
        case "abr.":
          this.generalCurrentMonth = 3;
          break;
        case "may.":
          this.generalCurrentMonth = 4;
          break;
        case "jun.":
          this.generalCurrentMonth = 5;
          break;
        case "jul.":
          this.generalCurrentMonth = 6;
          break;
        case "ago.":
          this.generalCurrentMonth = 7;
          break;
        case "sep.":
          this.generalCurrentMonth = 8;
          break;
        case "oct.":
          this.generalCurrentMonth = 9;
          break;
        case "nov.":
          this.generalCurrentMonth = 10;
          break;
        case "dic.":
          this.generalCurrentMonth = 11;
          break;
      }
      // console.log(this.arrayItemsCalendar);

      

      const start = new Date(2012, 0, 15);
      const end = new Date(2012, 4, 23);
      const range = moment.range(start, end);
      // console.log(range);
    },

    priority(objDate, objRoom, indexRoom, indexTDColumnsDate) {

      let globalCheckPriorityHigh = false;
      let globalCheckPriorityMedium = false;
      let globalCheckPriorityLow = false;
      let foundDayAndRange
      let indexRates = -1;
      let isThereARate = false;

      let rack = this.rates.map((itemRate, index) => {
        let countWhile = 0;
        foundDayAndRange= '';

        
        if ((itemRate.room_id == objRoom.id)) {
            while (countWhile < this.rates.length) {
                if(this.rates[countWhile].room_id == objRoom.id){
                    if(this.rates[countWhile].day != null){
                        foundDayAndRange+='day'
                    }
                    if(this.rates[countWhile].start != null && this.rates[countWhile].end != null){
                        foundDayAndRange+='AndRange'
                    }
                }
                countWhile++;
            }
            if(itemRate.day != null){
                if (itemRate.day === objDate.dateYYYYMMDD) {
                    indexRates = index;
                    isThereARate = true;
                    globalCheckPriorityHigh = true;
                    return itemRate.rack;
                }
            }
            else if (moment(objDate.dateYYYYMMDD).isBetween(itemRate.start,itemRate.end,null,"[]") == true && (globalCheckPriorityHigh == false)) {
                //Originalmente solo era "foundDayAndRange == 'AndRangeday'"; cambio no mostraba rango ultimo cuarto
                if(foundDayAndRange == 'AndRangeday' || foundDayAndRange == 'dayAndRange'){
                    indexRates = index;
                    isThereARate = true;
                    globalCheckPriorityMedium = true;
                    //pintar el color
                    return itemRate.rack;
                } 
                else{
                    return objRoom.rack_rate;
                }
            } 
            else if (itemRate[objDate.nameDayEnglish] > 0 && (globalCheckPriorityHigh == false && globalCheckPriorityMedium == false)) {
                indexRates = index;
                isThereARate = true;
                globalCheckPriorityLow = true;
                return itemRate[objDate.nameDayEnglish];
          }
        }
      });
      if (isThereARate == true) {
        let localIndex = 0;
        let findedID;
        let findedColor;
        //console.log(objRoom)
        //console.log(flagDay, flagRange, flagWeekday)
        if(globalCheckPriorityHigh == true){
          findedID = objDate.idRoom.filter((item)=>item.idRoom == objRoom.id);
          if(findedID.length == 0){
            objDate.idRoom.push({idRoom: objRoom.id, priorityColor: 1})
          }
          if(typeof(objRoom.cellColor) =='undefined'){
            objRoom.cellColor = [];
          }
          findedColor = objRoom.cellColor.filter((item)=>{
            if(item == 'blue lighten-2' || item == 'red darken-1' || item == 'deep-purple lighten-3' || item == 'white'){
              return item;
            }
          });
          if(findedColor.length <= 3 && !findedColor.includes('blue lighten-2')){
            objRoom.cellColor.push({color: 'blue lighten-2', priority: 1});
          }
        }
        if(globalCheckPriorityMedium == true){
          findedID = objDate.idRoom.filter((item)=>item.idRoom == objRoom.id);
          if(findedID.length == 0){
            objDate.idRoom.push({idRoom: objRoom.id, priorityColor: 2})
          }
          if(typeof(objRoom.cellColor)=='undefined'){
            objRoom.cellColor = [];
          }
          findedColor = objRoom.cellColor.filter((item)=>{
            if(item == 'blue lighten-2' || item == 'red darken-1' || item == 'deep-purple lighten-3' || item == 'white'){
              return item;
            }
          });
          if(findedColor.length <= 3 && !findedColor.includes('red darken-1')){
            objRoom.cellColor.push({color: 'red darken-1', priority: 2});
          }
        }
        if(globalCheckPriorityLow == true){
          findedID = objDate.idRoom.filter((item)=>item.idRoom == objRoom.id);
          if(findedID.length == 0){
            objDate.idRoom.push({idRoom: objRoom.id, priorityColor: 3})
          }
          if(typeof(objRoom.cellColor)=='undefined'){
            objRoom.cellColor = [];
          }

          findedColor = objRoom.cellColor.filter((item)=>{
            if(item == 'blue lighten-2' || item == 'red darken-1' || item == 'deep-purple lighten-3' || item == 'white'){
              return item;
            }
          });
          if(findedColor.length <= 3 && !findedColor.includes('deep-purple lighten-3')){
            objRoom.cellColor.push({color: 'deep-purple lighten-3', priority: 3});
          }
        }
        //console.log(objRoom.cellColor)
        return rack[indexRates];
      }
      else {
        // if(objDate.idRoom.length > 1){
        //   console.log("SHI")
        //   objDate.idRoom = []
          
        // }

        return objRoom.rack_rate;
      }
    },
    //Metodo que es llamado por la tabla para asignar un color de celda
    setCellColor(objRoom, objDate){
      let setCellColorClass = '';
      let index = 0;
      let lengthRooms = this.arrEndpointRooms.length;
      while (index < lengthRooms) {
        if(typeof(objDate.idRoom[index])!='undefined'){
          if(objRoom.id == objDate.idRoom[index].idRoom){
            let indexInter = 0;
            if(typeof(objRoom.cellColor) != 'undefined'){
              while (indexInter < objRoom.cellColor.length) {
                  if(objRoom.cellColor[indexInter].priority == objDate.idRoom[index].priorityColor){
                    setCellColorClass = objRoom.cellColor[indexInter].color;
                  }
                indexInter++;
              }
            }
          }
        }
        index++;
      }
      return setCellColorClass;
    },
  },
  props: {
    arrEndpointRooms: Array,
    arrayRoomIDs: Array,
    idRoomSelected: Number,
    daySelected: String,
    idHotelSelected: Number,
    rates: Array,
  },
};
</script>

<style scoped>

table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
}

td,
th {
  /* margin: 0; */
  /* border: 1px solid black; */
  white-space: nowrap;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.dateCol {
  background-color: #dadada;
}

.centerContent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 4.5em;
  margin-left: -1.4em;
  margin-right: -1.07em;
}

.headcol {
  position: sticky;
  left: 0;
  background-color: white;
  border-right: 1px solid  #dadada;
  /* padding-left: 0.85em;
  padding-right: 0.85em; */
  white-space: pre;
  text-align: left;
}

.empty-col {
  border: none;
  background-color: white;
}
</style>
