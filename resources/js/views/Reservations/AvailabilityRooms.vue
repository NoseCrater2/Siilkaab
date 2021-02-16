<template>
      <v-card   flat>
          <v-card-actions style="background-color: #F0F2F5">
              <v-btn-toggle v-model="selectedview" mandatory borderless>
                  <v-btn icon ><v-icon>mdi-view-list</v-icon></v-btn>
                  <v-btn icon><v-icon>mdi-view-grid</v-icon></v-btn>
              </v-btn-toggle>
              <v-spacer></v-spacer>
          </v-card-actions>
          <v-tabs  dark background-color="primary" left v-model="tab">
              <v-tab  v-for="(room, index) in aRooms" :key="index">
                  Habitación {{parseInt(index) + 1}}
              </v-tab>
          </v-tabs>
          <v-tabs-items  v-model="tab">
              <v-tab-item eager v-for="(room, index) in aRooms" :key="index">
                <ListAvailabilityRoom v-if="room" :key="parseInt(index)" :index="parseInt(index)" :room="room"/>
          <!-- <GridAvailabilityRoom v-if="selectedview == 1" :room="room"/> -->
              </v-tab-item>
          </v-tabs-items>
      </v-card>
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
    }),
  },

  components:{
    ListAvailabilityRoom,
    GridAvailabilityRoom,
  }

}
</script>