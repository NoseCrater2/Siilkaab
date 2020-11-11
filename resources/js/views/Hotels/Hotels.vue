<template>
  <div>
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
        <v-bottom-navigation grow>
          <div v-show="selected==! []?false:true">
            <div class="d-flex align-center mt-1">
              <v-btn @click="showDeleteDialog()">
                <span class="black--text">ELIMINAR SELECCIÓN</span>
                <v-icon size="32" color="error">mdi-delete-sweep</v-icon>
              </v-btn>
              <v-divider inset vertical></v-divider>
            </div>
          </div>

          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <span class="text-h4 font-weight-bold">HOTELES</span>
          </div>
          <v-spacer></v-spacer>
          <v-divider inset vertical></v-divider>
          <div class="d-flex align-center mt-n1">
            <v-btn @click="dialog = !dialog">
              <span class="black--text">NUEVO HOTEL</span>
              <v-icon size="32" color="primary">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-bottom-navigation>
        <v-card>
          <v-data-table
            v-model="selected"
            item-key="id"
            show-select
            :headers="headers"
            :items="hotels"
            :items-per-page="20"
            :single-select="singleSelect"
            multi-sort
            class="elevation-1"
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar hotel"
                  single-line
                  hide-details
                  outlined
                  dense
                ></v-text-field>
                <v-spacer></v-spacer>

                <v-dialog v-model="deleteDialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">¿Eliminar hoteles?</v-card-title>
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
                <v-switch v-model="singleSelect" label="Selección única" class="pa-3" inset></v-switch>
              </div>
            </template>

            <template v-slot:item.rooms="{item}">
              <div class="d-flex align-center justify-start ml-5">
                <v-badge :content="item.rooms" :value="item.rooms" color="red" overlap>
                  <v-icon>mdi-bed</v-icon>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.rates="{item}">
              <div class="d-flex align-center justify-start ml-1">
                <v-badge :content="item.rates" :value="item.rates" color="red" overlap>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-badge>
              </div>
            </template>

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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
          align: "start",
          sortable: true,
          value: "title",
        },
        { text: "Código de referencia", align: "center", value: "reference_code" },
        { text: "Habitaciones", value: "rooms" },
        { text: "Tarifas", value: "rates" },
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
    this.$store.dispatch("getHotels");
  },

  methods: {
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
