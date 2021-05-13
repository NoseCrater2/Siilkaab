<template>
    <div>
      <v-card   flat>
          <v-tabs   dark background-color="primary" left v-model="tab">
              <v-tab  v-for="(room, index) in aRooms" :key="index">
                  Habitación {{index}}
              </v-tab>
          </v-tabs>
          <v-tabs-items  v-model="tab">
              <v-tab-item eager v-for="(room, index) in aRooms" :key="index">
                 <GridAvailabilityRoom v-if="$vuetify.breakpoint.smAndDown" :key="index" :index="parseInt(index)" :room="room"/>
                <ListAvailabilityRoom  v-else :key="index" :index="parseInt(index)" :room="room"/>
              </v-tab-item>
          </v-tabs-items>
      </v-card>
      <v-card
        flat
        >
       <v-card-title>Es bueno saber</v-card-title>
       <v-card-text v-html="conditions.cancelation_text"></v-card-text>
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