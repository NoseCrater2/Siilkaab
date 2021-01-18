<template>
  <div>
    <v-app id="inspire">
      <div>
        <v-container class="elevation-1 outlined" fluid>
          <div class="text-center mb-4">
            <span class="text-h4 text-uppercase font-weight-bold"
              >Detalles de habitación</span
            >
          </div>
          <v-col cols="12" sm="12" md="12" lg="12" class="mb-n7">
            <v-autocomplete
              v-model="hotelSelected"
              :items="hotels"
              item-text="title"
              item-value="hotel_id"
              outlined
              label="Seleccione Hotel"
              @change="searchRoom(hotelSelected)"
            ></v-autocomplete>
          </v-col>

          <div v-if="flagActiveRooms == true">
            <v-row dense>
              <v-col
                v-for="(room, index) in currentRooms"
                :key="room.id"
                :cols="flexRoomsCardsSize"
              >
                <v-card :class="mxAutomyAuto" width="370" outlined :hover="true">
                  <v-img
                    height="250"
                    class="white--text align-end"
                    :src="roomImageRoute[index]"
                  >
                    <div style="background-color: rgba(0, 0, 0, 0.6)">
                      <v-card-title class="mb-n3">{{ room.name }}</v-card-title>
                      <span class="ml-4">({{ room.type }})</span>
                    </div>
                  </v-img>

                  <v-card-text>
                    <div class="ml-3">
                      <v-row>
                        <div class="grey--text mr-1">Ocupancia:</div>
                        <span class="font-weight-bold black--text"
                          >{{ room.max_adults }} adultos +
                          {{ room.max_children }} niños (max.
                          {{ room.max_occpancy }} inquilinos)</span
                        >
                      </v-row>

                      <v-row>
                        <div class="grey--text mr-1">
                          Habitaciones de este tipo:
                        </div>
                        <span class="font-weight-bold black--text">{{
                          room.quantity
                        }}</span>
                      </v-row>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <div>
                      <v-btn text>
                        <router-link
                          :to="{ name: 'RoomDetails', params: { id: room.id } }"
                          style="text-decoration: none; color: black"
                          >Editar</router-link
                        >
                      </v-btn>
                      <v-btn color="red" text>Eliminar</v-btn>
                      <v-btn color="blue" text>Subir fotos</v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col :cols="flexRoomsCardsSize" >
                <router-link
                  to="/roomDetails"
                  style="text-decoration: none; color: black"
                >
                  <v-card
                    :class="mxAutomyAuto"
                    width="370"
                    :height.sync="heightCard"
                    outlined
                    :hover="true"
                  >
                    <v-sheet
                      color="rgb(53,94,150)"
                      class="d-flex flex-column mb-6 justify-center align-center"
                      :height.sync="heightCard"
                    >
                      <span class="text-h5 white--text"
                        >Crear nueva habitación</span
                      >
                      <v-icon x-large dark>mdi-plus</v-icon>
                    </v-sheet>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "RoomsHome",
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.getHotelsForAdmin();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      //12, xs
      //6, sm
      //4, md, lg
      //3, xl
      flexModel: null,
      currentRooms: null,
      roomImageRoute: null,
      mxAutomyAuto: null,
      heightCard: "380",

      hotelSelected: null,
      loadingRooms: false,
      flagActiveRooms: false
    };
  },

  methods: {
    ...mapActions(["getHotelsForAdmin", "getCurrentHotelRooms"]),
    searchRoom(idHotel) {
      this.loadingRooms = true;
      this.flagActiveRooms = false;
      //AQUI TENGO QUE DEFINIR A QUE HOTEL ESTOY ACCEDIENDO
      this.getCurrentHotelRooms(idHotel).then(() => {
        this.currentRooms = this.currentHotelRooms;
        this.roomImageRoute = this.currentRooms.map((itemCurrentRoom) => {
          if (!itemCurrentRoom.default_image.includes("http")) {
            itemCurrentRoom.default_image =
              "/storage/img/" + itemCurrentRoom.default_image;
          }
          this.loadingRooms = false;
          this.flagActiveRooms = true;
          return itemCurrentRoom.default_image;
        });
      });
    },
    handleResize() {
      if (window.innerWidth >= 600 && window.innerWidth <= 676) {
        this.heightCard = "456";
      } else if (window.innerWidth > 676 && window.innerWidth <= 827) {
        this.heightCard = "438";
      } else {
        this.heightCard = "380";
      }
      return this.heightCard;
    },
  },

  computed: {
    ...mapState({
      hotels: (state) => state.disponibilityMoule.ahotels,
      currentHotelRooms: (state) => state.RoomModule.currentHotelRooms,
    }),
    //Propiedad computada que controla la responsividad de las cards de habitaciones
    flexRoomsCardsSize() {
      //1430 - 1903
      //600 - 827
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.flexModel = 12;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
        case "sm":
          this.flexModel = 6;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
        case "md":
          this.flexModel = 4;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
        case "lg":
          this.flexModel = 4;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
        case "xl":
          this.flexModel = 3;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
      }
    },
  },
};
</script>