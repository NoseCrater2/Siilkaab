<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
    <div v-if="hotels === []">
      <v-app id="inspire">
        <v-data-table
          item-key="title"
          class="elevation-1"
          loading
          loading-text="Obteniendo datos..."
        ></v-data-table>
      </v-app>
    </div>

    <div v-else>
      <v-app id="inspire">
        <div class="text-center mb-7">
          <span class="text-h4 text-uppercase font-weight-bold">Hoteles</span>
        </div>
        
        <v-card outlined tile>
          <v-data-table
            v-model="selected"
            item-key="id"
            show-select
            :headers="headers"
            :items="hotels"
            :items-per-page="20"
            :single-select="singleSelect"
            multi-sort
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                  <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="12" class="mt-3">
                    <div v-show="selected==! []?false:true">
                        <v-btn small depressed rounded outlined block color="red" @click="showDeleteDialog()">
                          <!-- <span class="black--text">ELIMINAR SELECCIÓN</span> -->
                          <v-icon dark>mdi-delete-sweep</v-icon>ELIMINAR
                        </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12" class="mt-3">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar hotel"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="12" class="mt-3">
                    <div class="d-flex justify-end">
                      <v-btn small depressed rounded outlined block color="info" :to="{name: 'Hotel'}">
                        <!-- <span class="black--text">NUEVO HOTEL</span> -->
                        <v-icon left dark>mdi-plus</v-icon>NUEVO HOTEL
                      </v-btn>
                    </div>
                  </v-col>
                <v-dialog v-model="deleteDialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">¿Eliminar hotel(es)?</v-card-title>
                    <v-card-text>
                      Está a punto de eliminar uno o más registros de hotel.
                      Esta acción no se puede deshacer. ¿Continuar?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="gray darken-1" text @click="deleteDialog = false">CANCELAR</v-btn>
                      <v-btn color="red darken-1" text @click="deleteItem()">ELIMINAR</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <div class="d-flex align-center ml-2 my-n4">
                <v-switch v-model="singleSelect" label="Selección única" class="pa-3" dense inset></v-switch>
              </div>
            </template>

            <template v-slot:item.rooms="{item}">
              <div class="d-flex align-center justify-start ml-5">
                <v-badge :content="item.rooms" :value="item.rooms" color="red" overlap>
                  <v-btn icon :to="{name: 'RoomsHome', query: {id: item.id}}"><v-icon>mdi-bed</v-icon></v-btn>
                </v-badge>
              </div>
            </template>

            <!-- <template v-slot:item.rates="{item}">
              <div class="d-flex align-center justify-start ml-1">
                <v-badge :content="item.rates" :value="item.rates" color="red" overlap>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-badge>
              </div>
            </template> -->

            <template v-slot:item.discounts="{item}">
              <div class="d-flex align-center justify-start ml-5">
                <v-badge :content="item.discounts" :value="item.discounts" color="red" overlap>
                  <v-icon>mdi-label-percent</v-icon>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.extras="{item}">
              <div class="d-flex align-center justify-start ml-1">
                <v-badge :content="item.extras" :value="item.extras" color="red" overlap>
                  <v-icon>mdi-tag-plus</v-icon>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <div
                :class="windowSize"
              >
                <router-link
                  :to="{name: 'Hotel' , params: {id: item.id}}"
                  class="text-decoration-none mx-4"
                >
                  <v-icon>mdi-pencil</v-icon>
                </router-link>
                <v-switch
                  :input-value="item.enabled"
                  value
                  dense
                  inset
                  @change="changeStatus(item,$event)"
                ></v-switch>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-app>
    </div>
    <v-snackbar
      :value="snackbar.stateSnackbar"
      right
      :color="snackbar.colorSnackbar"
      rounded="pill"
      :timeout="timeoutSnackbar"
      bottom
    >
      <v-icon
        color="white"
      >
        mdi-content-save
      </v-icon>
      <span class="font-weight-bold">{{snackbar.messaggeSnackbar}}</span>
    </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import router from "../../routes";
export default {
  data() {
    return {
      deleteDialog: false,
      selected: [],
      search: "",
      singleSelect: false,
      loading: false,
      columns: 3,

      headers: [
        {
          text: "Título",
          sortable: true,
          value: "title",
        },
        { text: "Código de referencia", value: "reference_code" },
        { text: "Habitaciones", value: "rooms" },
        // { text: "Tarifas", value: "rates" },
        { text: "Descuentos", value: "discounts" },
        { text: "Extras", value: "extras" },
        { text: "ID", value: "id" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      hotelIds: {
        hotelIds: [],
      },
    };
  },
  computed: {
    ...mapState({
      hotels: (state) => state.HotelModule.allhotels,
      snackbar: (state) => state.HotelModule.snackbar,
      timeoutSnackbar: (state) => state.HotelModule.timeoutSnackbar,
      errorsInformation: (state) => state.HotelModule.errorsInformation,
    }),
    windowSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 'd-flex align-center justify-start mr-n4';
        case "sm":
          return 'd-flex align-center justify-start ml-n8';
        case "md":
          return 'd-flex align-center justify-start ml-n8';
        case "lg":
          return 'd-flex align-center justify-start ml-n8';
        case "xl":
          return 'd-flex align-center justify-start ml-n8';
      }
    },
  },

  mounted() {

  },

  methods: {
    ...mapMutations(["setSnackbar"]),
    editItem(item) {},

    deleteItem(item) {},

    showDeleteDialog() {
      this.deleteDialog = true;
    },

    deleteItem() {
      this.selected.forEach((element) => {
        this.hotelIds.hotelIds.push(element.id);
      });
      this.$store.dispatch("deleteHotels", this.hotelIds).then(() => {
        this.close();
      });
    },

    close() {
      this.hotelIds.hotelIds = [];
      this.selected = [];
      this.deleteDialog = false;
      //this.$store.commit('setErrors',this.defaultErrors)
    },

    changeStatus(item, event) {
      if (event) {
        item.enabled = 1;
      } else {
        item.enabled = 0;
      }

      this.$store.dispatch("editHotel", item);
    },
  },
};
</script>
