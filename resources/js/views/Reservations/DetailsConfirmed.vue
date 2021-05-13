<template>
    <div>
        <v-card flat>
            <v-card-title style="font-weight: bolder" class="display-2">Tu reserva - {{reservation.id}}</v-card-title>
            <v-list-item style="font-weight: bolder">
                <v-list-item-title  >Número de reserva:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{reservation.id}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Estado:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    <v-icon right  color="green">mdi-brightness-1</v-icon>
                    {{reservation.state}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Fecha de reserva:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{reservation.created_at}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider class="mx-4"></v-divider>
            <v-list-item>
                <v-list-item-title>Estancia:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{reservation.count_rooms}}  habitación para {{reservation.nights}} noche(s)
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Estrada:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                  {{reservation.from}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Salida:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                   {{reservation.to}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item style="font-weight: bolder">
                <v-list-item-title  >Cliente:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                  {{reservation.guest_name+' '+reservation.guest_last_name}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Email:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                   {{reservation.guest_email}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Teléfono:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                  {{reservation.guest_phone}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>País:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{reservation.guest_country}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-divider class="mx-4"></v-divider>
            <v-list-item>
                <v-list-item-title>Hora de entrada:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{reservation.check_in}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Peticiones especiales:</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
                "{{reservation.guest_petitions}}"
            </v-card-text>
        </v-card>
        <v-card flat v-for="(room, index) in reservation.rooms" style="background-color: #dbdbdb;" :key="index">
            <v-card-title class="pb-0">{{room.name}}</v-card-title>
            <v-card-text  class="font-italic pt-0">{{room.type}}</v-card-text>
            <v-divider class="mx-4"></v-divider>
            <div class="d-flex">
                <v-avatar
                  class="ma-3"
                  size="80"
                  tile
                >
                  <v-img :src="`/img/${room.image}`"></v-img>
                </v-avatar>
                <div class="my-4">
                    <span class="font-italic">
                        {{ room.short_text }}
                    </span>
                </div>
            </div>
            <v-divider class="mx-4"></v-divider>
            <v-list-item class="font-italic">
                <v-list-item-title>Ocupación:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    1 adulto
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="font-italic">
                <v-list-item-title>Régimen:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    Sólo habitación
                </v-list-item-subtitle>
            </v-list-item>
             <v-list-item class="font-italic">
                <v-list-item-title>Nombre del huésped:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{ rooms.guest_name.name }}
                </v-list-item-subtitle>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
            <v-list-item >
                <v-list-item-title>Importe de la estancia:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                     {{ room.price * reservation.nights }}
                </v-list-item-subtitle>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
            
        </v-card>
        <v-list-item  >
            <v-list-item-title style="font-size: 1.2em">Importe total de la habitación:</v-list-item-title>
            <v-list-item-subtitle style="font-size: 1.2em" class="text-right">
                {{reservation.total_price}}
            </v-list-item-subtitle>
        </v-list-item>
         
        <v-card
        flat
        >
       <v-card-title>Es bueno saber</v-card-title>
       <v-card-text v-html="conditions.cancelation_text"></v-card-text>
        </v-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            
        }
    },

    computed:{
        ...mapState({
         conditions: state => state.HotelModule.conditions,
         reservation: state => state.bookingsModule.reservation,
    }),
    }


}
</script>

<style scoped>

</style>