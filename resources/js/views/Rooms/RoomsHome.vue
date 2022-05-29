<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
      <div class="text-center mb-7">
        <span class="text-h4 text-uppercase font-weight-bold">HABITACIONES</span>
      </div>

      <v-card class="pa-4" outlined tile>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="mb-n7">
          <v-autocomplete
            v-model="hotelSelected"
            :items="hotels"
            :loading="loadingFindBar"
            item-text="title"
            item-value="id"
            outlined
            label="Seleccione el hotel"
            @change="searchRoom(hotelSelected)"
          ></v-autocomplete>
        </v-col>

        <div v-if="isLoadedPromises == true">
          <v-tabs
            v-model="tabModel"
            background-color="transparent"
            color="basil"
            grow
            :vertical="$vuetify.breakpoint.xs"
          >
            <v-tab> DETALLES DE HABITACION </v-tab>
            <v-tab> CONFIGURACION DE AMENIDADES </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabModel">
            <v-tab-item>
              <v-row
                class="d-flex justify-xl-space-between justify-lg-space-between justify-md-space-between justify-sm-space-around justify-center"
              >
                <v-col
                  v-for="room in currentHotelRooms"
                  :key="room.id"
                  cols="auto"
                >
                  <v-card
                    class="d-flex flex-column mx-auto my-4"
                    max-width="317.11"
                    height="553.11"
                    outlined
                    :hover="true"
                  >
                    <v-img
                      width="317.11"
                      class="white--text align-end"
                      :src="`/img/${room.default_image}`"
                    >
                      <template v-slot:placeholder>
                        <v-img width="317" src="/img/unavailable.jpg">

                        </v-img>
                        <!-- <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey"
                          ></v-progress-circular>
                        </v-row> -->
                      </template>
                      <div style="background-color: rgba(0, 0, 0, 0.6)">
                        <div class="d-flex align-center mx-4">
                          <p class="overline">{{ room.name }}</p>
                        </div>
                        <div class="d-flex align-center mx-4">
                          <span class="caption mb-1">({{ room.type }})</span>
                        </div>
                      </div>
                    </v-img>

                    <v-card-text>
                      <div style="height: 114px">
                        <p class="grey--text">
                          Ocupancia:
                          <span class="font-weight-bold black--text"
                            >{{ room.max_adults }} adultos +
                            {{ room.max_children }} niños (max.
                            {{ room.max_occpancy }} inquilinos)</span
                          >
                        </p>
                        <span class="grey--text"
                          >Habitaciones de este tipo:
                          <span class="font-weight-bold black--text">{{
                            room.quantity
                          }}</span></span
                        >
                      </div>
                    </v-card-text>

                    <v-card-actions class="d-flex justify-space-between">
                      <v-btn text @click="routerPushExistingRoom(room.id)">
                        Editar
                      </v-btn>
                      <v-btn color="red" @click="showDeleteDialog(room.id)" text>Eliminar</v-btn>
                      <v-btn
                        color="blue darken-3"
                        text
                        @click="openPhotosDialog(room.id)"
                        >Subir fotos</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="auto">
                  <v-card
                    @click="routerPushNewRoom()"
                    class="mx-auto my-4 d-flex align-center justify-center"
                    width="317.11"
                    height="553.11"
                    outlined
                    color="rgb(53,94,150)"
                    :hover="true"
                  >
                    <div>
                      <div class="d-flex justify-center">
                        <span class="text-h5 white--text text-center"
                          >Crear nueva habitación</span
                        >
                      </div>
                      <div class="d-flex justify-center">
                        <v-icon x-large dark>mdi-plus</v-icon>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <RoomAmenities :changeRoomAmenitiesColors="changeRoomAmenitiesColors" @modifyTabModelFromRoomAmenities="modifyTabModelFromRoomAmenities"></RoomAmenities>
            </v-tab-item>
          </v-tabs-items>
            <v-dialog v-model="deleteDialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">¿Eliminar habitación?</v-card-title>
                <v-card-text>
                  Está a punto de eliminar la habitación.
                  Esta acción no se puede deshacer. ¿Continuar?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="gray darken-1" text @click="closeDeleteDialog()">CANCELAR</v-btn>
                  <v-btn color="red darken-1" text @click="deleteItem()">ELIMINAR</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </div>

        <DialogAdditionalImages
          :dialog="photosDialog"
          @close="photosDialog = false"
          v-if="photosDialog"
          :id="selectedId"
        />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import DialogAdditionalImages from "../../components/Rooms/DialogAdditionalImages";
import RoomAmenities from "./RoomAmenities";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "RoomsHome",
  data() {
    return {
        localModelRoomId: -1,
        deleteDialog: false,
        isLoadedPromises: false,
        loadingFindBar: false,
        changeRoomAmenitiesColors: null,
      tabModel: null,
      routerFullQueryId: this.$router.currentRoute.query,
      photosDialog: false,
      roomImageRoute: null,
      selectedId: 0,
      hotelSelected: parseInt(this.$route.query.id) || null,
    };
  },

  mounted() {
    this.chargePromises();
  },

  methods: {
    showDeleteDialog(roomID) {
        this.localModelRoomId = roomID;
        console.log(this.localModelRoomId)
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
        this.localModelRoomId = -1;
      this.deleteDialog = false;
    },
    deleteItem() {
      this.$store.dispatch("deleteRoomAXIOS", this.localModelRoomId).then(() => {
        this.closeDeleteDialog();
      }).catch(()=>{
          this.closeDeleteDialog();
      });
    },
    async chargePromises(){
        let promiseHotels = 1;
        let promiseRooms = 1;
        let promiseAmenities = 1;
        this.loadingFindBar = true;
        promiseHotels = await this.getHotelsForAdmin();
        for (let index = 0; index < this.hotels.length; index++) {
            this.setReinicializedErrorsStatusRoomModule();
            if(this.hotelSelected != null){
                promiseRooms = await this.getCurrentHotelRooms(this.hotelSelected);
                promiseAmenities = await this.getRoomAmenities(this.hotelSelected);
                break;
            }
            else if(this.hotelSelected == null){
                promiseRooms = await this.getCurrentHotelRooms(this.hotels[index].id);
                promiseAmenities = await this.getRoomAmenities(this.hotels[index].id);
                if(this.currentHotelRooms.length > 0){
                    this.hotelSelected = this.hotels[index].id;
                    this.$router.push({ name: "RoomsHome", query: { id: this.hotelSelected } });
                    break;
                }
            }
        }
        await Promise.all([promiseHotels, promiseRooms, promiseAmenities]).then(values => {
            this.isLoadedPromises = true;
            this.loadingFindBar = false;
            this.changeRoomAmenitiesColors = this.hotelSelected;
        }).catch(()=>{
            this.isLoadedPromises = true;
            this.loadingFindBar = false;
            this.changeRoomAmenitiesColors = this.hotelSelected;
        });
    },
    modifyTabModelFromRoomAmenities(){
      this.tabModel = 0;
    },
    routerPushNewRoom() {
      let localHotelSelected = parseInt(this.hotelSelected);
      this.$router.push({
        name: "RoomDetails",
        params: { idHotel: localHotelSelected },
      });
    },
    routerPushExistingRoom(localIdRoom) {
      let localHotelSelected = parseInt(this.hotelSelected);
      localIdRoom = parseInt(localIdRoom);
      this.$router.push({
        name: "RoomDetails",
        params: { idRoom: localIdRoom, idHotel: localHotelSelected },
      });
    },
    closeDialog() {
      this.photosDialog = false;
    },
    openPhotosDialog(id) {
      this.photosDialog = true;
      this.selectedId = id;
    },

    ...mapActions(["getHotelsForAdmin", "getCurrentHotelRooms", "getRoomAmenities"]),
    ...mapMutations(["setReinicializedErrorsStatusRoomModule"]),
    async searchRoom(idHotel) {
        let promiseRooms = 1;
        let promiseAmenities = 1;
        this.loadingFindBar = true;
        //REINICIAMOS LOS ERRORES
        this.setReinicializedErrorsStatusRoomModule();
        //ACCEDIENDO A DETALLES DE HABITACION
        promiseRooms = await this.getCurrentHotelRooms(idHotel);
        //ACCEDIENDO A AMENIDADES DE HABITACIONES
        promiseAmenities = await this.getRoomAmenities(idHotel);
        if (typeof this.routerFullQueryId.id != "undefined") {
            if (this.routerFullQueryId.id != idHotel) {
              this.routerFullQueryId = idHotel;
              this.$router.push({ name: "RoomsHome", query: { id: idHotel } });
            }
        }
        else {
            this.routerFullQueryId = idHotel;
            this.$router.push({ name: "RoomsHome", query: { id: idHotel } });
        }
        await Promise.all([promiseRooms, promiseAmenities]).then(values => {
            this.loadingFindBar = false;
            this.changeRoomAmenitiesColors = this.hotelSelected;
        }).catch(()=>{
            this.loadingFindBar = false;
            this.changeRoomAmenitiesColors = this.hotelSelected;
        });
    },
  },

  computed: {
    ...mapState({
      hotels: (state) => state.disponibilityMoule.ahotels,
      currentHotelRooms: (state) => state.RoomModule.currentHotelRooms,
      roomDetails: (state) => state.RoomModule.roomDetails,
      roomAmenities: (state) => state.RoomModule.roomAmenities,
    }),
  },

  components: {
    DialogAdditionalImages,
    RoomAmenities,
  },
};
</script>
