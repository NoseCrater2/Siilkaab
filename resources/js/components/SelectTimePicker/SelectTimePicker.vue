<template>
  <div>
    <v-row>
      <v-col md="13" class="d-flex">
        <v-select
          :items="weekDaysItems"
          v-model="computedDdwnWeekDays"
          dense
          filled
          label="Dia"
          class="mr-4"
        ></v-select>
        <v-dialog
          ref="dialogFromHour"
          v-model="modalFromHourModel"
          :return-value.sync="computedFromHour"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-autocomplete
              :items="[computedFromHour]"
              v-model="computedFromHour"
              v-bind="attrs"
              v-on="on"
              readonly
              dense
              filled
              label="Desde"
              class="mr-2"
            ></v-autocomplete>
          </template>
          <v-time-picker
            v-if="modalFromHourModel"
            v-model="computedFromHour"
            format="24hr"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalFromHourModel = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="$refs.dialogFromHour.save(computedFromHour)">Aceptar</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="dialogToHour"
          v-model="modalToHourModel"
          :return-value.sync="computedToHour"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-autocomplete
              :items="[computedToHour]"
              v-model="computedToHour"
              v-bind="attrs"
              v-on="on"
              readonly
              dense
              filled
              label="Hasta"
              class="mr-2"
            ></v-autocomplete>
          </template>
          <v-time-picker v-if="modalToHourModel" v-model="computedToHour" format="24hr" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalToHourModel = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="$refs.dialogToHour.save(computedToHour)">Aceptar</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-btn
          class="mt-3"
          x-small
          depressed
          fab
          dark
          color="red"
          @click="removeCompoTime(idModel)"
        >
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SelectTimePicker",
  created() {
    if (this.objArrCompo !== null) {
      if (this.objArrCompo.day != null) {
        if (this.objArrCompo.day == "lunes") {
          this.ddwnWeekDaysModel = "Lunes";
        }
        if (this.objArrCompo.day == "martes") {
          this.ddwnWeekDaysModel = "Martes";
        }
        if (this.objArrCompo.day == "miercoles") {
          this.ddwnWeekDaysModel = "Miércoles";
        }
        if (this.objArrCompo.day == "jueves") {
          this.ddwnWeekDaysModel = "Jueves";
        }
        if (this.objArrCompo.day == "viernes") {
          this.ddwnWeekDaysModel = "Viernes";
        }
        if (this.objArrCompo.day == "sabado") {
          this.ddwnWeekDaysModel = "Sábado";
        }
        if (this.objArrCompo.day == "domingo") {
          this.ddwnWeekDaysModel = "Domingo";
        }
      }
      if (this.objArrCompo.start_time != null) {
        this.fromHourModel = this.objArrCompo.start_time.slice(0, -3);
      }
      if (this.objArrCompo.end_time != null) {
        this.toHourModel = this.objArrCompo.end_time.slice(0, -3);
      }
    }
  },
  data() {
    return {
      idModel: this.idCompo,
      weekDaysItems: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      ddwnWeekDaysModel: null,
      fromHourModel: null,
      modalFromHourModel: false,
      toHourModel: null,
      modalToHourModel: false,
    };
  },
  computed: {
    computedDdwnWeekDays: {
      get() {
        return this.ddwnWeekDaysModel;
      },
      set(model) {
        this.ddwnWeekDaysModel = model;
        if (this.ddwnWeekDaysModel == "Lunes") {
          this.objArrCompo.day = "lunes";
        }
        if (this.ddwnWeekDaysModel == "Martes") {
          this.objArrCompo.day = "martes";
        }
        if (this.ddwnWeekDaysModel == "Miércoles") {
          this.objArrCompo.day = "miercoles";
        }
        if (this.ddwnWeekDaysModel == "Jueves") {
          this.objArrCompo.day = "jueves";
        }
        if (this.ddwnWeekDaysModel == "Viernes") {
          this.objArrCompo.day = "viernes";
        }
        if (this.ddwnWeekDaysModel == "Sábado") {
          this.objArrCompo.day = "sabado";
        }
        if (this.ddwnWeekDaysModel == "Domingo") {
          this.objArrCompo.day = "domingo";
        }
        return this.ddwnWeekDaysModel;
      },
    },
    computedFromHour: {
      get() {
        return this.fromHourModel;
      },
      set(model) {
        this.fromHourModel = model;
        this.objArrCompo.start_time = this.fromHourModel + ":00";
        return this.fromHourModel;
      },
    },
    computedToHour: {
      get() {
        return this.toHourModel;
      },
      set(model) {
        this.toHourModel = model;
        this.objArrCompo.end_time = this.toHourModel + ":00";
        return this.toHourModel;
      },
    },
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