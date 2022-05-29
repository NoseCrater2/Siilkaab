<template>
  <div>
    <v-datetime-picker
      v-model="datetime"
      :text-field-props="textFieldProps"
      :date-picker-props="dateProps"
      :time-picker-props="timeProps"
      time-format="HH:mm"
    >
      <template slot="dateIcon">
        <v-icon>mdi-calendar-month</v-icon>
      </template>
      <template slot="timeIcon">
        <v-icon>mdi-clock</v-icon>
      </template>
      <template slot="actions" slot-scope="{ parent }">
        <v-btn color="primary" @click="parent.okHandler(); formatAndSendHour()">Aceptar</v-btn>
      </template>
    </v-datetime-picker>
  </div>
</template>

<script>
import Vue from "vue";
import {mapState} from 'vuex'
import DatetimePicker from "vuetify-datetime-picker";
Vue.use(DatetimePicker);

import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment); //Extendemos moment.js con los rangos
moment.locale("es"); //Cambiamos el lenguaje de moment

export default {
  name: "DateTimePicker",
  mounted() {
    // [ { "error": { "final_period": [ "Debe ser mayor " ] }, "componentID": "0158" } ]
    console.log(this.errorsRegimes)
    if (this.dates.info == "Start") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
      console.log("this.datetime", this.datetime)
      let localDatetime = this.datetime
      let currentDay = moment().format("YYYY-MM-DD")
      if(moment(localDatetime).isSameOrBefore(currentDay)){
        this.dateProps.min = localDatetime;
      }
      else{
        this.dateProps.min = currentDay;
      }
    }
    if (this.dates.info == "Final") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
      //this.textFieldProps.errorMessages = this.errorsRegimes.error.final_period;
      let localDatetime = this.datetime
      let currentDay = moment().format("YYYY-MM-DD")
      if(moment(localDatetime).isSameOrBefore(currentDay)){
        this.dateProps.min = localDatetime;
      }
      else{
        this.dateProps.min = currentDay;
      }
    }
  },
  data() {
    return {
      dato: null,
      datetime: null,
      textFieldProps: {
        prependInnerIcon: "mdi-calendar-month",
        backgroundColor: 'white',
        outlined: true,
        errorMessages: ''
      },
      dateProps: {
        headerColor: "primary",
        min: ""
      },
      timeProps: {
        format: "24hr",
        ampmInTitle: true
      }
    };
  },
  computed:{
    ...mapState({
      errorsRegimes: (state) => state.HotelModule.errorsRegimes
    }),
  },
  watch: {
	  errorsRegimes(nuevoValor, valorAnterior){
      if(this.dates.info == "Final"){
        if(this.errorsRegimes.length > 0){
          this.textFieldProps.errorMessages = this.errorsRegimes[0].error.final_period;
        }
        else{
          this.textFieldProps.errorMessages = '';
        }
      }
    }
  },
  methods: {
    formatDate(val) {
      console.log(val)
        let lastDate = new Date(val).getTime();
        let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = new Date(lastDate - tzoffset).toISOString().slice(0, -8);
        console.log(lastDate)
        console.log(tzoffset)
        const date = localISOTime.replace(/T/, " ");
        this.datetime = date;
    },
    formatAndSendHour(){
      console.log(this.datetime)
      this.formatDate(this.datetime)
      console.log(this.datetime)
      this.sendNewHour(this.datetime, this.dates.info)
    },
    sendNewHour(newHour, info) {
      this.$emit("sendNewHour", newHour, info);
    },
  },
  props: {
    dates: Object
  }
};
</script>
