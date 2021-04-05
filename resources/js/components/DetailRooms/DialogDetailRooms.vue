<template>
    <v-dialog v-model="dialog" width="700" max-width="800" persistent >
            
                <v-card v-if="room">
                    <v-card-title>
                        {{room.name}}
                        <v-spacer></v-spacer>
                        <v-btn icon  @click="closeRoomDetail">
                           <v-icon>mdi-close-thick</v-icon>
                          </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <SliderRoomPhotos :id="id" v-if="icon == 'photos'"/>

                        <CardRoomInfo  v-else-if="icon == 'info'" />

                        <CalendarRoomDisponibility v-else-if="icon == 'disponibility'" />
                       
                    </v-card-text>
                    <v-card-actions >
                        <v-btn-toggle tile group v-model="icon" color="blue" mandatory >
                            <v-btn small value="photos" class="ml-3">
                                
                                <v-icon left>
                                  mdi-image-multiple
                                </v-icon>
                                <span class="hidden-sm-and-down">Fotos</span>
                            </v-btn>
                            <v-btn small value="info">
                               
                                <v-icon left>
                                  mdi-file-document-outline
                                </v-icon>
                                 <span class="hidden-sm-and-down">Info</span>
                            </v-btn>
                            <v-btn small value="disponibility">
                               
                                <v-icon left>
                                  mdi-calendar-month
                                </v-icon>
                                 <span class="hidden-sm-and-down">Disponibilidad</span>
                            </v-btn>
                        </v-btn-toggle>
                        <v-spacer></v-spacer>
                        <v-btn class="mr-3" depressed  @click="closeRoomDetail" tile>Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>
</template>

<script>
import {mapState } from 'vuex';
import SliderRoomPhotos from './SliderRoomPhotos'
import CardRoomInfo from './CardRoomInfo'
import CalendarRoomDisponibility from './CalendarRoomDisponibility'
export default {
    data(){
        return {
            icon: 'photos',
        }
    },

    created(){
        this.$store.dispatch('getRoomDetails', this.id)
    },

    computed:{
        ...mapState({
            room: (state) => state.RoomModule.roomDetails,
        }),
    },

    components: {
        SliderRoomPhotos,
        CardRoomInfo,
        CalendarRoomDisponibility,
    },

    methods:{
        closeRoomDetail(){
            this.$emit('closeDialog')
        }
    },

     props: {
        id:{
            type: Number,
            required: true,
        },
        dialog: {
            type: Boolean,
            required: true,
        }
    },
}
</script>