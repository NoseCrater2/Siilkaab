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
        <v-btn color="primary" @click="parent.okHandler">Aceptar</v-btn>
      </template>
    </v-datetime-picker>
  </div>
</template>

<script>
import Vue from "vue";
import DatetimePicker from "vuetify-datetime-picker";
Vue.use(DatetimePicker);

export default {
  name: "DateTimePicker",
  mounted() {
    if (this.dates.info == "Start") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
    }
    if (this.dates.info == "Final") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
    }
  },
  updated() {
      this.formatDate(this.datetime)
  },
  data() {
    return {
      dato: null,
      datetime: null,
      textFieldProps: {
        prependIcon: "mdi-calendar-month"
      },
      dateProps: {
        headerColor: "primary"
      },
      timeProps: {
        format: "24hr",
        ampmInTitle: true
      }
    };
  },
  methods: {
    formatDate(val) {
        let lastDate = new Date(val).getTime();
        let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = new Date(lastDate - tzoffset).toISOString().slice(0, -8);
        const date = localISOTime.replace(/T/, " ");
        this.datetime = date;
    }
  },
  props: {
    dates: Object
  }
};
</script>