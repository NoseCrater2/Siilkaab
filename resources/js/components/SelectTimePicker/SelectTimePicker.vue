<template>
  <div>
    <v-row>
      <v-col md="13" style="display: flex">
        <v-autocomplete
          :items="weekDays"
          v-model="ddwnDayModelCompo"
          dense
          filled
          label="Dia"
          style="margin-right: 4%"
        ></v-autocomplete>
        <v-dialog
          ref="dialogFromHour"
          v-model="modalFromHourCompo"
          :return-value.sync="fromHourCompo"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-autocomplete
              :items="[fromHourCompo]"
              v-model="fromHourCompo"
              v-bind="attrs"
              v-on="on"
              readonly
              dense
              filled
              label="Desde"
              style="margin-right: 2%"
            ></v-autocomplete>
          </template>
          <v-time-picker v-if="modalFromHourCompo" v-model="fromHourCompo" format="24hr" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalFromHourCompo = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="$refs.dialogFromHour.save(fromHourCompo)">Aceptar</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="dialogToHour"
          v-model="modalToHourCompo"
          :return-value.sync="toHourCompo"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-autocomplete
              :items="[toHourCompo]"
              v-model="toHourCompo"
              v-bind="attrs"
              v-on="on"
              readonly
              dense
              filled
              label="Hasta"
              style="margin-right: 2%"
            ></v-autocomplete>
          </template>
          <v-time-picker v-if="modalToHourCompo" v-model="toHourCompo" format="24hr" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalToHourCompo = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="$refs.dialogToHour.save(toHourCompo)">Aceptar</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-btn class="mt-3" x-small depressed fab dark color="red" @click="removeCompoTime(id)">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SelectTimePicker",
  data() {
    return {
      id: this.idCompo,
      weekDays: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      ddwnDayModelCompo:
        this.dates.ddwnDayModel !== null ? this.dates.ddwnDayModel : null,
      fromHourCompo: this.dates.fromHour !== null ? this.dates.fromHour : null,
      modalFromHourCompo:
        this.dates.modalFromHour === false ? this.dates.modalFromHour : false,
      toHourCompo: this.dates.toHour !== null ? this.dates.toHour : null,
      modalToHourCompo:
        this.dates.modalToHour === false ? this.dates.modalToHour : false,
    };
  },
  methods: {
    removeCompoTime(id) {
      this.$emit("removeCompoTime", id);
    },
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
    dates: Object,
  },
};
</script>