<template>
    <v-dialog v-model="dialog" width="700" max-width="800" persistent >
        <v-card >
            <v-card-title>
                {{hotel.title}}
                <v-spacer></v-spacer>
                <v-btn icon  @click="closeHotelDetail">
                   <v-icon>mdi-close-thick</v-icon>
                  </v-btn>
            </v-card-title>
            <v-card-text>
               <SliderHotelPhotos v-if="icon == 'photos'"/>
               <CardHotelInfo v-if="icon == 'info'" />
            </v-card-text>
            <v-card-actions >
                <v-btn-toggle tile group v-model="icon" color="blue" mandatory>
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

                </v-btn-toggle>
                <v-spacer></v-spacer>
                <v-btn class="mr-3" outlined  @click="closeHotelDetail" tile>Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState } from 'vuex';
import SliderHotelPhotos from './SliderHotelPhotos';
import CardHotelInfo from './CardHotelInfo'
export default {
    data(){
        return{
            icon: 'photos',
        }
    },
    computed: {
        ...mapState({
            hotel: state => state.HotelModule.hotel,
        }),
    },

    props: {
        dialog: {
            type: Boolean,
            required: true,
        }
    },

    methods:{
        closeHotelDetail(){
            this.$emit('closeDialog')
        }
    },

    components:{
        SliderHotelPhotos,
        CardHotelInfo,
    }
}

</script>