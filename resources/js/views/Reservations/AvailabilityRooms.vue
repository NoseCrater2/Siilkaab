<template>
    <div>
        <v-app id="inspire">
           <div v-if="!aRooms">
               NO HAY HABITACIONES
           </div>
           <div v-else>
               <v-container fluid>
                   <v-row dense>
                       <v-col
                        v-for="room in aRooms"
                        :key="room.id"
                        :cols="flex"
                       >
                    <v-card
                   
                    class="mx-auto my-12"
                    max-width="500"
                    >
                        <v-img
                        height="250"
                        :src="`${room.default_image}`"
                        ></v-img>

                        <v-card-title>{{room.name}}</v-card-title>
                        <v-card-text>
                            <v-row
                              align="center"
                              class="mx-0"
                            >
                                 <v-rating
                                   :value="4.5"
                                   color="amber"
                                   dense
                                   half-increments
                                   readonly
                                   size="14"
                                 ></v-rating>
  
                                <div class="grey--text ml-4">4.5 (413)</div>
                            </v-row>
  
                            <div class="my-4 subtitle-1">
                              $ {{room.rack_rate}}
                            </div>
  
                            <div>{{room.short_text}}</div>
                        </v-card-text>
  
                        <v-divider class="mx-4"></v-divider>
  
                        <v-card-title>Tonight's availability</v-card-title>
  
                        <v-card-text>
                          <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                          >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                          </v-chip-group>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn
                            color="deep-purple lighten-2"
                            text
                          >
                            Reserve
                          </v-btn>
                        </v-card-actions>
                     </v-card>
                 </v-col>
                 </v-row>
                </v-container>
           </div>
        </v-app>
    </div>
</template>
<script >

import { mapActions, mapState } from 'vuex';
export default {
     data(){
    return {
     selection: 1,
     flex: 3,
    };
  },

  computed:{
      ...mapState({
      aRooms: state => state.RoomModule.availableRooms,
    }),
  },

  mounted(){
      if(this.aRooms===null){
          console.log('No hay habitaciones')
      }
  },

}
</script>