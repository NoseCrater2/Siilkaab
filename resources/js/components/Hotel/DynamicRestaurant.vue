<template>
  <v-carousel-item>
    <v-sheet color="#eeeeee" height="100%">
      <div style="padding: 2%">
        <v-row class="ml-1 d-flex">
          <span>
            <h2>
              <strong>Restaurante #{{idCompo+1}}</strong>
            </h2>
          </span>
          <div class="ml-auto mr-3">
            <v-btn
              small
              class="white--text"
              depressed
              color="red"
              @click="removeCompo(id)"
            >Eliminar restaurante</v-btn>
          </div>
        </v-row>
        <br />
        <v-text-field v-model="restaurantName" label="Nombre del restaurante" required></v-text-field>
        <br />
        <span>
          <strong>Tipo de menú</strong>
        </span>
        <v-row justify="space-around">
          <v-checkbox v-model="arrayChk" value="a la carte" label="A la carta"></v-checkbox>
          <v-checkbox v-model="arrayChk" value="buffet" label="Buffet"></v-checkbox>
        </v-row>
        <br />
        <br />
        <v-row class="ml-1" align="center">
          <span>
            <strong>Introduce el horario</strong>
          </span>
          <v-btn
            class="ml-2"
            x-small
            depressed
            dark
            fab
            color="primary"
            @click="addCompoFromComponent()"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </v-row>
        <br />
        <span>Dile a los clientes cuándo pueden usar este servicio</span>
        <component
          v-for="(component) in arrayComponents"
          :idCompo="component.idCompo"
          :dates="objDates"
          :objArrCompo="component.objArrCompo"
          :key="component.idCompo"
          :is="component.TagSTimePicker"
          @removeCompoTime="removeCompoTime"
        ></component>
      </div>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import { mapState } from "vuex";
import SelectTimePicker from "../SelectTimePicker/SelectTimePicker";

export default {
  name: "DynamicRestaurant",
  created() {
    if (this.objArrCompo != null) {
      //Codigo para agregar componentes existentes
      let count = 0;
      while (count <= this.objArrCompo.schedules.length - 1) {
        this.addCompo(this.objArrCompo.schedules[count]);
        count++;
      }

      if (this.objArrCompo.name != null) {
        this.restaurantName = this.objArrCompo.name;
      }

      if (this.objArrCompo.menu_type != null) {
        if (this.objArrCompo.menu_type == "both") {
          this.arrayChk.push("a la carte");
          this.arrayChk.push("buffet");
        }
      }

      if (this.objArrCompo.schedules[0] != null) {
        if (this.objArrCompo.schedules[0].day != null) {
          if (this.objArrCompo.schedules[0].day == "domingo") {
            this.objDates.ddwnDayModel = "Domingo";
          }
          if (this.objArrCompo.schedules[0].day == "lunes") {
            this.objDates.ddwnDayModel = "Lunes";
          }
          if (this.objArrCompo.schedules[0].day == "martes") {
            this.objDates.ddwnDayModel = "Martes";
          }
          if (this.objArrCompo.schedules[0].day == "miercoles") {
            this.objDates.ddwnDayModel = "Miércoles";
          }
          if (this.objArrCompo.schedules[0].day == "jueves") {
            this.objDates.ddwnDayModel = "Jueves";
          }
          if (this.objArrCompo.schedules[0].day == "viernes") {
            this.objDates.ddwnDayModel = "Viernes";
          }
          if (this.objArrCompo.schedules[0].day == "sabado") {
            this.objDates.ddwnDayModel = "Sábado";
          }
        }
        this.objDates.fromHour = this.objArrCompo.schedules[0].start_time.slice(
          0,
          -3
        );
        this.objDates.modalFromHour = true;
        this.objDates.toHour = this.objArrCompo.schedules[0].end_time.slice(
          0,
          -3
        );
        this.objDates.modalToHour = false;
      }
    } else {
      this.addCompoFromComponent();
    }
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      id: this.idCompo,
      objDates: {}, //Objeto que se llena con la info de time para mandarlo al componente SelectTimePicker
      restaurantName: null,
      arrayChk: [],
    };
  },
  computed: {
    ...mapState({
      restaurants: (state) => state.HotelModule.restaurants,
    }),
  },
  methods: {
    removeCompo(id) {
      this.$emit("removeCompo", id);
    },

    //Metodos componente SelectTimePicker
    addCompoFromComponent() {
      this.objDates = {};
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: SelectTimePicker,
      });
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: SelectTimePicker,
        objArrCompo: obj,
      });
    },
    removeCompoTime(idCompoParam) {
      this.countIdCompo--;
      let idCompoMap = this.arrayComponents
        .map((element) => element.idCompo)
        .indexOf(idCompoParam);
      this.arrayComponents.splice(idCompoMap, 1);
    },
  },
  components: {
    SelectTimePicker,
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
  },
};
</script>

<style scoped>
/*Estilo para el scroll del carousel*/
.v-sheet {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>