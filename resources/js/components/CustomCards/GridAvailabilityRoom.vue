<template>
    <v-row justify="space-between">
        <v-col v-for="(r, index) in room" :key="r.id" cols="12" md="6" sm="12">
            <v-card flat  height="550" width="350" :color="index == 0?'#F0F2F5':''" style="border-bottom: 1px solid #F0F2F5" >
                <v-avatar size="350"  tile @click="openRoomDetail(r.id)">
                    <v-hover v-slot="{ hover }">
                        <v-img width="350" :src="`/img/${r.default_image}`">
                           <v-row style="background-color: rgba(10, 10, 10, 0.5);" align="center" justify="center" v-if="hover">
                                <v-icon size="50" dark>mdi-magnify</v-icon>
                           </v-row>
                        </v-img>
                    </v-hover>
                </v-avatar>
                <v-card-title class="py-1">{{r.name}}</v-card-title>
                <v-card-text class="py-1" >
                    <b v-if="r.quantity == 1" style="color: red">¡Última unidad!</b>
                    <b v-else-if="r.quantity <= 5" style="color: red">¡Solo quedan {{ r.quantity }} unidades!</b><br>
                       
                    Capacidad máxima: <br>
                    Adultos: {{ r.max_adults}}. Niños: {{ r.max_children}} <br>
                </v-card-text>

                <v-card-title class="py-1" > ${{r.rack_rate}}MXN</v-card-title>
                <v-card-actions class="py-1">
                    <v-btn  tile small>RESERVAR</v-btn>
                </v-card-actions> 
            </v-card>
           
        </v-col>
                <DialogDetailRooms @closeDialog="closeRoomDetail" :dialog="dialog" v-if="dialog"  :id="roomId"/>
    </v-row>
</template>

<script>
import DialogDetailRooms from '../DetailRooms/DialogDetailRooms'
export default {
    data(){
        return{
            dialog: false,
            icon: 'photos',
            roomId: 0,
        }
    },
    props: {
        room: Array,
    },
    components:{
        DialogDetailRooms,
    },
     methods: {
        openRoomDetail(id){
            this.roomId = id
            this.dialog = true
        },
        closeRoomDetail(){
            this.dialog = false
            this.icon = 'photos'
        }
    },

}
</script>