<template>
<div>
    <v-container class="elevation-1 outlined" fluid>
        <div v-if="isLoadedPromises == false">
          <v-app id="inspire">
            <div class="text-center mb-7">
              <span class="text-h4 text-uppercase font-weight-bold">Reservas</span>
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
              <span class="text-h4 text-uppercase font-weight-bold">Reservas</span>
            </div>
            <v-card outlined tile>
                    <v-data-table
                    v-model="selected"
                    item-key="id"
                    :headers="headers"
                    :items="reservations"
                    :loading="loadingFindBar"
                    multi-sort
                    :search="search"
                    @dblclick:row="showDetails"
                    >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                      <v-row align="center" justify="center">
                        <v-col cols="12" xl="6" lg="8" md="8" sm="12" xs="12">
                            <div>
                                <v-select
                                prepend-inner-icon="mdi-domain"
                                dense
                                label="Seleccione el hotel"
                                outlined
                                single-line
                                hide-details
                                v-model="selectedHotel"
                                @change="localGetReservations"
                                :items="hotels"
                                item-text="title"
                                item-value="id">
                                </v-select>
                            </div>
                        </v-col>
                      </v-row>
                  </v-toolbar>
                </template>
                    <template v-slot:item.state="{item}">
                        <v-row align="center" justify="center">
                            <div v-if="item.state == 'Confirmed'">
                                <div>
                                    <v-icon color="green">mdi-check-circle</v-icon>
                                </div>
                                <div>
                                    CONFIRMADO
                                </div>
                            </div>
                            <div v-else-if="item.state == 'Cancelled'">
                                <div>
                                    <v-icon color="red">mdi-close-circle</v-icon>
                                </div>
                                <div>
                                    CANCELADO
                                </div>
                            </div>
                        </v-row>
                    </template>
                    </v-data-table>
                </v-card>
            </v-app>
        </div>
    </v-container>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            isLoadedPromises: false,
            loadingFindBar: false,
            selected: [],
            search: null,
            selectedHotel: null,
            headers: [
                {
                  text: "ID",
                  sortable: true,
                  value: "id",
                  align: 'center'
                },
                { text: "Fecha", value: "created_at", align: 'center'  },
                { text: "Cliente", value: "guest", align: 'center'  },
                { text: "Hotel", value: "hotel", align: 'center'  },
                { text: "Inicio", value: "from", align: 'center'  },
                { text: "Final", value: "to", align: 'center'  },
                { text: "Importe", value: "total_price", sortable: false, align: 'center'  },
                { text: "Estado", value: "state", align: 'center'  },
            ],
        }
    },

    computed:{
        ...mapState({
            reservations: state => state.bookingsModule.reservations,
            hotels: (state) => state.HotelModule.allhotels,
            configuration: state => state.HotelModule.configuration,
        }),
    },

    mounted(){
        this.chargePromises();
    },

    methods: {
        ...mapActions(["getHotels", "getReservations"]),
        async chargePromises(){
            let promiseHotels = 1;
            let promiseReservations = 1;
            promiseHotels = await this.getHotels();
            for (let index = 0; index < this.hotels.length; index++) {
                promiseReservations = await this.getReservations(this.hotels[index].id);
                if(this.reservations.length > 0){
                    this.selectedHotel = this.hotels[index].id;
                    break;
                }
            }
            await Promise.all([promiseHotels, promiseReservations]).then(values => {
                this.isLoadedPromises = true;
            }).catch(()=>{
                this.isLoadedPromises = true;
            });
        },
        localGetReservations(){
            this.loadingFindBar = true;
            this.getReservations(this.selectedHotel).then(()=>{
                this.loadingFindBar = false;
            }).catch(()=>{
                this.loadingFindBar = false;
            })
        },
        // El metodo tiene que estar construido asi para el doble click
        showDetails(event, { item }){
            this.$router.push({name: 'Reservation', params: {id: item.id}})
        }

    }

}
</script>
