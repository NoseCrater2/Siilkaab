<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
      <div class="text-center mb-7">
        <span class="text-h4 text-uppercase font-weight-bold"
          >Detalles de habitación</span
        >
      </div>
      <v-card class="pa-4" outlined tile>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="mb-n7">
          <v-autocomplete
            v-model="hotelSelected"
            :items="hotels"
            item-text="title"
            item-value="hotel_id"
            outlined
            label="Seleccione el hotel"
            @change="searchRoom(hotelSelected)"
          ></v-autocomplete>
        </v-col>

        <div v-if="flagActiveRooms == true">
          <v-row class="d-flex justify-xl-space-between justify-lg-space-between justify-md-space-between justify-sm-space-around justify-center">
            <v-col
              v-for="(room) in currentHotelRooms"
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
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  <div style="background-color: rgba(0,0,0,0.6)">
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
                    <span class="grey--text">Habitaciones de este tipo: <span class="font-weight-bold black--text">{{room.quantity}}</span></span>
                  </div>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between">
                    <v-btn text @click="routerPushExistingRoom(room.id)">
                      Editar
                    </v-btn>
                    <v-btn color="red" text>Eliminar</v-btn>
                    <v-btn color="blue darken-3" text @click="openPhotosDialog(room.id)"
                      >Subir fotos</v-btn
                    >
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col
              cols="auto"
            >
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
import { mapActions, mapState } from "vuex";
export default {
  name: "RoomsHome",
  created() {
    this.getHotelsForAdmin();
  },
  data() {
    return {
      routerFullQueryId: this.$router.currentRoute.query,
      photosDialog: false,
      currentRooms: null,
      roomImageRoute: null,
      selectedId: 0,
      hotelSelected: parseInt(this.$route.query.id) || null,
      loadingRooms: false,
      flagActiveRooms: false,
    };
  },

  methods: {
    routerPushNewRoom(){
      let localHotelSelected = parseInt(this.hotelSelected);
      this.$router.push({name: 'RoomDetails', params: { idHotel: localHotelSelected }})
    },
    routerPushExistingRoom(localIdRoom){
      let localHotelSelected = parseInt(this.hotelSelected);
      localIdRoom = parseInt(localIdRoom);
      this.$router.push({name: 'RoomDetails', params: { idRoom: localIdRoom, idHotel: localHotelSelected }})
    },
    closeDialog() {
      this.photosDialog = false;
    },
    openPhotosDialog(id) {
      this.photosDialog = true;
      this.selectedId = id;
    },

    ...mapActions(["getHotelsForAdmin", "getCurrentHotelRooms"]),
    searchRoom(idHotel) {
      if(typeof(this.routerFullQueryId.id) != "undefined"){
        if(this.routerFullQueryId.id != idHotel){
          this.routerFullQueryId = idHotel;
          this.$router.push({name: 'RoomsHome', query: {id: idHotel}})
        }
      }
      else{
        this.routerFullQueryId = idHotel;
        this.$router.push({name: 'RoomsHome', query: {id: idHotel}})
      }
      this.loadingRooms = true;
      this.flagActiveRooms = false;
      //AQUI TENGO QUE DEFINIR A QUE HOTEL ESTOY ACCEDIENDO
      this.getCurrentHotelRooms(idHotel).then(() => {
        this.flagActiveRooms = true;
        this.loadingRooms = false;
      });
    },
  },

  mounted() {
    if (this.hotelSelected != null) {
      this.searchRoom(this.hotelSelected);
    }
  },

  computed: {
    ...mapState({
      hotels: (state) => state.disponibilityMoule.ahotels,
      currentHotelRooms: (state) => state.RoomModule.currentHotelRooms,
      roomDetails: (state) => state.RoomModule.roomDetails,
    }),
  },

  components: {
    DialogAdditionalImages,
  },
};
</script>