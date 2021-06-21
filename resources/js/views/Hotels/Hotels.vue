<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
    <div v-if="isLoadedPromises == false">
      <v-app id="inspire">
        <div class="text-center mb-7">
          <span class="text-h4 text-uppercase font-weight-bold">Hoteles</span>
        </div>
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
            :single-select="singleSelect"
            multi-sort
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat color="white" :style="!$vuetify.breakpoint.mdAndUp ? 'height: 146px !important' : ''">
                  <v-row align="center" justify="center">
                    <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="2" order-md="1" order-lg="1" order-xl="1">
                      <div v-show="selected==! []?false:true">
                          <v-btn small depressed rounded outlined block color="red" @click="showDeleteDialog()">
                            <!-- <span class="black--text">ELIMINAR SELECCIÓN</span> -->
                            <v-icon dark>mdi-delete-sweep</v-icon>ELIMINAR
                          </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" order="1" order-md="2" order-lg="2" order-xl="2">
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
                    <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="3" order-md="3" order-lg="3" order-xl="3">
                        <v-btn small depressed rounded outlined block color="info" :to="{name: 'Hotel'}">
                          <!-- <span class="black--text">NUEVO HOTEL</span> -->
                          <v-icon left dark>mdi-plus</v-icon>NUEVO HOTEL
                        </v-btn>
                    </v-col>
                  </v-row>
              </v-toolbar>
              <div class="d-flex align-center ml-2 my-n4">
                <v-switch v-model="singleSelect" label="Selección única" class="pa-3" dense inset></v-switch>
              </div>
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
            </template>

            <template v-slot:item.rooms="{item}">
              <div>
                <v-badge :content="item.rooms" :value="item.rooms" color="red" overlap offset-x="15" offset-y="18">
                  <v-btn icon :to="{name: 'RoomsHome', query: {id: item.id}}"><v-icon>mdi-bed</v-icon></v-btn>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.discounts="{item}">
              <div>
                <v-badge :content="item.discounts" :value="item.discounts" color="red" overlap>
                  <v-icon>mdi-label-percent</v-icon>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.extras="{item}">
              <div>
                <v-badge :content="item.extras" :value="item.extras" color="red" overlap>
                  <v-icon>mdi-tag-plus</v-icon>
                </v-badge>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-row align="center" justify="center">
                <div>
                  <v-btn
                    icon
                    :disabled="isLoadingActionSwitchChangeState"
                    :to="{name: 'Hotel' , params: {id: item.id}}"
                    class="text-decoration-none mx-4">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div>
                  <v-switch
                      :input-value="item.enabled"
                      :loading="isLoadingActionSwitchChangeState"
                      :disabled="isLoadingActionSwitchChangeState"
                      value
                      dense
                      inset
                      @change="changeStatus(item,$event)"
                  ></v-switch>
                </div>
              </v-row>
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
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
        isLoadedPromises: false,
        isLoadingActionSwitchChangeState: false,
      deleteDialog: false,
      selected: [],
      search: "",
      singleSelect: false,
      loading: false,
      columns: 3,

      headers: [
        { text: "ID", value: "id" , align: 'center' },
        { text: "Código de referencia", value: "reference_code", align: 'center' },
        {
          text: "Hotel",
          sortable: true,
          value: "title",
          align: 'center'
        },
        { text: "Habitaciones", value: "rooms", align: 'center' },
        { text: "Descuentos", value: "discounts", align: 'center' },
        { text: "Extras", value: "extras", align: 'center' },
        { text: "Acciones", value: "actions", sortable: false, align: 'center' },
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
    })
  },

  mounted(){
      this.chargePromises();
  },

  methods: {
    ...mapActions(["getHotels"]),
    ...mapMutations(["setSnackbar"]),
    async chargePromises(){
        let promiseHotels = 1;
        promiseHotels = this.getHotels();
        await Promise.all([promiseHotels]).then(values => {
            this.isLoadedPromises = true;
        }).catch(()=>{
            this.isLoadedPromises = true;
        });
    },

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
    },

    changeStatus(item, event) {
        this.isLoadingActionSwitchChangeState = true;
      if (event) {
        item.enabled = 1;
      } else {
        item.enabled = 0;
      }
      console.log(item)
      this.$store.dispatch("editHotel", item).then(()=>{
          this.isLoadingActionSwitchChangeState = false;
      }).catch(()=>{
          this.isLoadingActionSwitchChangeState = false;
      });
    },
  },
};
</script>

<style scoped>
/* No borres este estilo aunque lo marque mal el visual. Asi es */
@media only screen and (max-width: 959px) {
    >>>.v-toolbar__content{
      height: 146px !important;
    }
}
</style>
