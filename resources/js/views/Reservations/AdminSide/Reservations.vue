<template>
    <v-container class="elevation-1 outlined" fluid>
        <div class="tex-center mb-3">
            <span class="text-h4 text-uppercase font-weight-bold">RESERVACIONES</span>
            <v-select 
            prepend-icon="mdi-domain"
            label="HOTEL" 
            outlined 
            :loading="loadingHotels" 
            v-model="selectedHotel" 
            @change="getReservations" 
            :items="hotels" 
            item-text="title" 
            item-value="id">
            </v-select>
        </div>
        <v-card outlined tile>
                <v-data-table
                v-model="selected"
                item-key="id"
                :headers="headers"
                :items="reservations"
                :items-per-page="20"
                multi-sort
                :search="search"
                @click:row="showDetails($event)"
                >
                <template v-slot:item.state="{item}">
                    <div v-if="item.state == 'Confirmed'">
                        <v-icon color="green">mdi-check-circle</v-icon>
                       CONFIRMADO
                    </div>
                    <div v-else-if="item.state == 'Cancelled'">
                        <v-icon color="red">mdi-close-circle</v-icon>
                       CANCELADO
                    </div>
                </template>
                </v-data-table>
            </v-card>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
           
            loadingHotels: false,
            selected: [],
            search: null,
            selectedHotel: null,
            headers: [
                {
                  text: "ID",
                  sortable: true,
                  value: "id",
                },
                { text: "Fecha", value: "created_at" },
                { text: "Cliente", value: "guest" },
                { text: "Hotel", value: "hotel" },
                { text: "Inicio", value: "from" },
                { text: "Final", value: "to" },
                { text: "Importe", value: "total_price", sortable: false },
                { text: "Estado", value: "state" },
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
        this.loadingHotels = true
        this.$store.dispatch("getHotels").then(()=>{
             this.loadingHotels = false
         });
    },

    methods: {
        getReservations(){
            this.loadingRooms = true
            this.$store.dispatch('getReservations', this.selectedHotel).then(() => {
                
                this.loadingRooms = false
            });
            
        },

        showDetails(event){
            this.$router.push({name: 'Reservation', params: {id: event.id}})
        }
       
    }

}
</script>