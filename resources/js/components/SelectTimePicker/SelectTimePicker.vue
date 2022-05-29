<template>
  <div>
    <v-row>
          <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12">
                <v-select
                outlined
                :error-messages="computedErrorDay"
                  :items="weekDaysItems"
                  item-text="name"
                  item-value="key"
                  multiple
                  v-model="computedDdwnWeekDays"
                  filled
                  label="Dia"
                >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="clickSelectAllDays"
                  >
                    <v-list-item-action>
                      <v-icon :color="ddwnWeekDaysModel.length > 0 ? 'indigo darken-4' : ''">
                        {{ iconSelectAllDays }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Todos los dias
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
                </v-select>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6">
            <v-dialog
              ref="dialogFromHour"
              v-model="modalFromHourModel"
              :return-value.sync="computedFromHour"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                outlined
                :error-messages="computedErrorStartTime"
                  :items="[computedFromHour]"
                  v-model="computedFromHour"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  filled
                  label="Desde"
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
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6">
            <v-dialog
              ref="dialogToHour"
              v-model="modalToHourModel"
              :return-value.sync="computedToHour"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-autocomplete
                outlined
                :error-messages="computedErrorEndTime"
                  :items="[computedToHour]"
                  v-model="computedToHour"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  filled
                  label="Hasta"
                ></v-autocomplete>
              </template>
              <v-time-picker v-if="modalToHourModel" v-model="computedToHour" format="24hr" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalToHourModel = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogToHour.save(computedToHour)">Aceptar</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" xl="1" lg="1" md="1" sm="12" xs="12" class="d-flex justify-center">
            <v-btn
            :class="$vuetify.breakpoint.mdAndUp ? 'mt-3' : 'mt-n9 mb-3'"
              x-small
              :block="$vuetify.breakpoint.mdAndUp ? false : true"
              depressed
              :fab="$vuetify.breakpoint.mdAndUp ? true : false"
              dark
              color="red"
              @click="dialogAceptCancelRemoveHour = true"
            >
              <v-icon dark v-if="$vuetify.breakpoint.mdAndUp">mdi-delete</v-icon>{{$vuetify.breakpoint.mdAndUp ? '' : 'Eliminar horario'}}
            </v-btn>
          </v-col>
    </v-row>
    <v-divider class="mt-n4" v-if="!$vuetify.breakpoint.mdAndUp"></v-divider>
        <v-row justify="center">
          <v-dialog
            v-model="dialogAceptCancelRemoveHour"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                ¿Eliminar horario?
              </v-card-title>
              <v-card-text>Al aceptar, este horario se eliminará.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="dialogAceptCancelRemoveHour = false"
                >
                  CANCELAR
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="btnApplyRemoveHour()"
                >
                  ACEPTAR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "SelectTimePicker",
  created() {
    if (this.objArrCompo !== null) {
      //componentID es utilizado como key unica para el proceso de muestra de errores
      this.objArrCompo.componentID = this.componentID;
      if (this.objArrCompo.day != null) {
        this.objArrCompo.day.forEach(day=>{
          this.ddwnWeekDaysModel.push(day)
        })
        console.log(this.objArrCompo.day)
      }
      if (this.objArrCompo.start_time != null) {
        if(this.objArrCompo.start_time.length >=8){
          this.objArrCompo.start_time = this.objArrCompo.start_time.slice(0, -3);
        }
        this.fromHourModel = this.objArrCompo.start_time;
      }
      if (this.objArrCompo.end_time != null) {
        if(this.objArrCompo.end_time.length >=8){
          this.objArrCompo.end_time = this.objArrCompo.end_time.slice(0, -3);
        }
        this.toHourModel = this.objArrCompo.end_time;
      }
    }
  },
  data() {
    return {
    dialogAceptCancelRemoveHour: false,
      componentID: this.idCompo + "" + this.objArrCompo.id,
      idModel: this.idCompo,
      weekDaysItems: [
        {name: "Domingo", key: "domingo"},
        {name: "Lunes", key: "lunes"},
        {name: "Martes", key: "martes"},
        {name: "Miércoles", key: "miercoles"},
        {name: "Jueves", key: "jueves"},
        {name: "Viernes", key: "viernes"},
        {name: "Sábado", key: "sabado"},
      ],
      ddwnWeekDaysModel: [],
      fromHourModel: null,
      modalFromHourModel: false,
      toHourModel: null,
      modalToHourModel: false,
    };
  },
  computed: {
    ...mapState({
      errorsSchedules: (state) => state.HotelModule.errorsSchedules
    }),
    computedErrorDay: {
      get() {
        let error = '';
        this.errorsSchedules.forEach((itemErrorSchedule)=>{
          if(typeof(itemErrorSchedule.error.day) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorSchedule.componentID){
              error = itemErrorSchedule.error.day;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorStartTime: {
      get() {
        let error = '';
        this.errorsSchedules.forEach((itemErrorSchedule)=>{
          if(typeof(itemErrorSchedule.error.start_time) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorSchedule.componentID){
              error = itemErrorSchedule.error.start_time;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedErrorEndTime: {
      get() {
        let error = '';
        this.errorsSchedules.forEach((itemErrorSchedule)=>{
          if(typeof(itemErrorSchedule.error.end_time) != 'undefined'){
            if(this.objArrCompo.componentID == itemErrorSchedule.componentID){
              error = itemErrorSchedule.error.end_time;
            }
          }
          else{
            return '';
          }
        })
        return error;
      }
    },
    computedDdwnWeekDays: {
      get() {
        return this.ddwnWeekDaysModel;
      },
      set(model) {
        this.ddwnWeekDaysModel = model;
        this.objArrCompo.day = this.ddwnWeekDaysModel;
        return this.ddwnWeekDaysModel;
      },
    },
    computedFromHour: {
      get() {
        return this.fromHourModel;
      },
      set(model) {
        this.fromHourModel = model;
        this.objArrCompo.start_time = this.fromHourModel;
        return this.fromHourModel;
      },
    },
    computedToHour: {
      get() {
        return this.toHourModel;
      },
      set(model) {
        this.toHourModel = model;
        this.objArrCompo.end_time = this.toHourModel;
        return this.toHourModel;
      },
    },
    selectedAllDays() {
      return this.ddwnWeekDaysModel.length === this.weekDaysItems.length
    },
    selectedSomeDays() {
      return this.ddwnWeekDaysModel.length > 0 && !this.selectedAllDays
    },
    iconSelectAllDays() {
      if (this.selectedAllDays) return 'mdi-close-box'
      if (this.selectedSomeDays) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
    btnApplyRemoveHour(){
        this.dialogAceptCancelRemoveHour = false;
        this.removeCompoTime(this.idModel);
    },

    removeCompoTime(id) {
      this.$emit("removeCompoTime", id);
    },
    clickSelectAllDays() {
      this.$nextTick(() => {
        if (this.selectedAllDays) {
          this.ddwnWeekDaysModel = []
          this.objArrCompo.day = this.ddwnWeekDaysModel;
          console.log("TODOS", this.objArrCompo.day)
        } else {
          this.ddwnWeekDaysModel = []
          this.weekDaysItems.forEach(day => {
            this.ddwnWeekDaysModel.push(day.key)
          });
          this.objArrCompo.day = this.ddwnWeekDaysModel;
          console.log("TODOS", this.objArrCompo.day)
        }
      })
    },
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
    dates: Object,
  },
};
</script>
