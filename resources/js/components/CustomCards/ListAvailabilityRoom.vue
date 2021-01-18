<template>
    <div>
        <v-hover v-for="(r, index) in room" :key="r.id"  v-slot="{ hover }" >
            <v-card flat  height="200" :outlined="hover?true:false" :color="index == 0?'#F0F2F5':''" @click="openRoomDetail">
                <div class="d-flex flex-no-wrap justify-left">
                    <v-avatar class="ma-2" size="150" tile>
                        <v-hover v-slot="{ hover }">
                            <v-img height="200" src="https://partourcaleta.com/images/chpanel/rooms/100001-screen.jpg">
                               <v-row style="background-color: rgba(10, 10, 10, 0.5);" align="center" justify="center" v-if="hover">
                                    <v-icon size="50" dark>mdi-magnify</v-icon>
                               </v-row>
                            </v-img>
                        </v-hover>
                    </v-avatar>
                <div>
                    <v-card-title style="color: #1976D2" > {{ r.name }} </v-card-title>
                    <v-card-text >
                        <b v-if="r.quantity == 1" style="color: red">¡Última unidad!</b>
                        <b v-else-if="r.quantity <= 5" style="color: red">¡Solo quedan {{ r.quantity }} unidades!</b><br>
                       
                        Capacidad máxima: <br>
                        Adultos: {{ r.max_adults}}. Niños: {{ r.max_children}} <br>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn small depressed tile outlined><v-icon left>mdi-magnify-plus</v-icon>Ampliar información</v-btn>
                    </v-card-actions>
                </div>
                <div>
                    <v-card-title> SELECCION DE TARIFA Y REGIMEN</v-card-title>
                </div>
                <div >
                    <v-card-title > ${{r.rack_rate}}MXN</v-card-title>
                    <v-btn tile small>RESERVAR</v-btn>
                </div>
                </div>
            </v-card>
        </v-hover>
        <v-dialog v-model="dialog" width="700" max-width="800" >
            
                <v-card>
                    <v-card-title>
                        Villa sencilla
                        <v-spacer></v-spacer>
                        <v-btn icon  @click="closeRoomDetail">
                           <v-icon>mdi-close-thick</v-icon>
                          </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <SliderRoomPhotos v-if="icon == 'photos'"/>

                        <CardRoomInfo  v-else-if="icon == 'info'" />

                        <CalendarRoomDisponibility v-else-if="icon == 'disponibility'" />
                       
                    </v-card-text>
                    <v-card-actions >
                        <v-btn-toggle tile group v-model="icon" color="blue" >
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
                        <v-btn class="mr-3"  @click="closeRoomDetail" tile>Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
         
        </v-dialog>
    </div>
</template>

<script>
import SliderRoomPhotos from '../DetailRooms/SliderRoomPhotos'
import CardRoomInfo from '../DetailRooms/CardRoomInfo'
import CalendarRoomDisponibility from '../DetailRooms/CalendarRoomDisponibility'
export default {
    data(){
        return{
            dialog: false,
            icon: 'photos'
        }
    },
    props: {
        room: Array,
    },

    methods: {
        openRoomDetail(){
            this.dialog = true
        },
        closeRoomDetail(){
            this.dialog = false
            this.icon = 'photos'
        }
    },

    components: {
        SliderRoomPhotos,
        CardRoomInfo,
        CalendarRoomDisponibility,
    },
}
</script>