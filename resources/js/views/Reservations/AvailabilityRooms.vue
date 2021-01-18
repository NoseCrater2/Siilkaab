<template>
  
    <v-row justify="space-around" >
      <v-col cols="3">
        <v-card flat>
          <v-img class="ma-3" src="https://partourcaleta.com/images/chpanel/hotels/100001-med.jpg">

          </v-img>
          <v-card-title>{{hotel.title}}</v-card-title>
          <v-card-text>
             <v-icon>mdi-map-marker</v-icon>
             {{contact.address +', '+ contact.zipcode +' '+  contact.city +' '+ contact.state +', '+ contact.country}}
          </v-card-text>
          <v-divider></v-divider>
         
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-col cols="12">
          <v-card-actions style="background-color: #F0F2F5">
            <v-btn-toggle v-model="selectedview" mandatory borderless>
              <v-btn icon ><v-icon>mdi-view-list</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-view-grid</v-icon></v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-col>
        <v-col cols="12">

            <v-tabs color="black" left v-model="tab">
              <v-tab v-for="(room, index) in aRooms" :key="index">
                Habitación {{index + 1}}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">

           
            <v-tab-item  v-for="(room, index) in aRooms" :key="index">
              <ListAvailabilityRoom v-if="selectedview == 0" :room="room"/>
              <GridAvailabilityRoom v-if="selectedview == 1" :room="room"/>
            </v-tab-item>
             </v-tabs-items>

        </v-col>
      </v-col>
    
    </v-row>
 
           <!-- <div v-if="!aRooms">
               NO HAY HABITACIONES
           </div> -->
</template>
<script >

import { mapActions, mapState } from 'vuex';
import ListAvailabilityRoom from '../../components/CustomCards/ListAvailabilityRoom';
import GridAvailabilityRoom from '../../components/CustomCards/GridAvailabilityRoom';
export default {
     data(){
    return {
      selectedview: 0,
      tab: null,
     selection: 1,
     flex: 3,
    };
  },

  computed:{
      ...mapState({
      aRooms: state => state.RoomModule.availableRooms,
      hotel: (state) => state.HotelModule.hotel,
      contact: state => state.HotelModule.contacts,
    }),
  },



  components:{
    ListAvailabilityRoom,
    GridAvailabilityRoom,
  }

}
</script>