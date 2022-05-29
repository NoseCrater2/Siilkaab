<template>
    <div>
      <v-card flat class="mx-2" color="grey lighten-3">
          <v-tabs dark background-color="primary" left v-model="tab">
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab  v-for="(room, index) in aRooms" :key="index">
                  Habitación {{index}}
              </v-tab>
          </v-tabs>
          <v-tabs-items  v-model="tab">
              <v-tab-item eager v-for="(room, index) in aRooms" :key="index">
                <ListAvailabilityRoom v-if="$vuetify.breakpoint.lgAndUp" :key="index" :index="parseInt(index)" :room="room"/>
                <GridAvailabilityRoom v-else :key="index" :index="parseInt(index)" :room="room"/>
              </v-tab-item>
          </v-tabs-items>
      </v-card>
      <v-divider class="mx-2"></v-divider>
      <v-card class="mx-2 mt-4" flat>
        <div class="mb-2">Consideraciones: </div>
        <div v-html="conditions.cancelation_text"></div>
      </v-card>
    </div>
</template>
<script >

import { mapState} from 'vuex';
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
        conditions: state => state.HotelModule.conditions,
    }),
  },

  components:{
    ListAvailabilityRoom,
    GridAvailabilityRoom,
  }

}
</script>
