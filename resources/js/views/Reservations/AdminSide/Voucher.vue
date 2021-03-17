<template>
    <div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed dark color="primary" tile><v-icon left>mdi-printer</v-icon>Imprimir</v-btn>
            <v-btn depressed dark color="primary" tile><v-icon left>mdi-send</v-icon>Enviar</v-btn>
        </v-card-actions>
         <v-card-title style="font-weight: bolder" class="display-2">Reserva - {{reservation.id}}</v-card-title>
         <v-divider></v-divider>
        <v-card-actions>
            <v-btn outlined tile @click="openStateDialog"><v-icon left>mdi-cogs</v-icon>Cambiar estado</v-btn>
            <v-btn outlined tile @click="openClientDialog"><v-icon left>mdi-account</v-icon>Detalles del cliente</v-btn>
             <v-spacer></v-spacer>
        </v-card-actions>

        <v-row>
            <v-col cols="5">
                <v-img class="ma-4" max-width="470" max-height="300" :src="`/img/${reservation.hotel_image}`"></v-img>
                <v-card flat>
                    <v-card-title>{{reservation.hotel_name}}</v-card-title>
                    <v-card-text>
                        <v-list-item dense class="font-italic">
                            <v-list-item-icon>
                                <v-icon>mdi-map-marker</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{reservation.hotel_address}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense class="font-italic">
                            <v-list-item-icon>
                                <v-icon>mdi-email</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{reservation.hotel_email}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense class="font-italic">
                            <v-list-item-icon>
                                <v-icon>mdi-phone</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{reservation.hotel_phone}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense class="font-italic">
                            <v-list-item-icon>
                                <v-icon>mdi-earth</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{reservation.hotel_url}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>IMPORTE TOTAL</v-list-item-title>
                            <v-list-item-title>{{reservation.total_price}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Prepgago</v-list-item-title>
                            <v-list-item-title>{{reservation.payed}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Pago en el hotel</v-list-item-title>
                            <v-list-item-title>{{reservation.total_price-reservation.payed}}</v-list-item-title>
                        </v-list-item>
                    </v-card>
                </v-card>
            </v-col>
            <v-col cols="7">
                 <v-card flat>
           
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
                    {{reservation.rooms.lenght}}  habitación para {{reservation.nights}} noche(s)
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
                    {{ reservation.guest_names[index] }}
                </v-list-item-subtitle>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
            <v-list-item >
                <v-list-item-title>Importe de la estancia:</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                    {{ room.rack_rate }}
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
            </v-col>
        </v-row>
        <v-dialog v-model="clientDialog" max-width="600" persistent>
            <v-card>
                <v-card-title>
                    Detalles del cliente
                    <v-spacer></v-spacer>
                    <v-btn class="mb-3 ml-3" icon @click="closeClientDialog"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                <v-form ref="clientForm" >
                    <v-text-field :error-messages="clientErrors.guest_name" label="Nombre" dense class="mx-2" outlined v-model="form.guest_name"></v-text-field>
                    <v-text-field :error-messages="clientErrors.last_name" label="Apellidos" dense class="mx-2" outlined v-model="form.guest_last_name"></v-text-field>
                    <v-text-field :error-messages="clientErrors.guest_name" label="Email" dense class="mx-2" outlined v-model="form.guest_email"></v-text-field>
                    <v-text-field :error-messages="clientErrors.guest_phone" label="Teléfono" dense class="mx-2" outlined v-model="form.guest_phone"></v-text-field>
                    <v-autocomplete :error-messages="clientErrors.guest_country" :items="countries" item-text="name" item-value="name" label="País" dense class="mx-2" outlined v-model="form.guest_country"></v-autocomplete>
                    <v-text-field :error-messages="clientErrors.check_in" label="Hora de entrada" dense class="mx-2" outlined v-model="form.check_in"></v-text-field>
                    <v-text-field :error-messages="clientErrors.guest_names" :label="`Habitación del huesped #`+(index+1)" dense class="mx-2" 
                    v-for="(names, index) in form.guest_names"
                    :key="index"
                    v-model="form.guest_names[index]"
                    outlined>
                    </v-text-field>
                    <v-textarea :error-messages="clientErrors.guest_petitions" label="Peticiones especiales" class="mx-2"  outlined v-model="form.guest_petitions"></v-textarea>
                </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn tile depressed outlined @click="closeClientDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn tile depressed color="primary" class="white--text" @click="saveClientInformation"><v-icon left>mdi-content-save</v-icon> Aplicar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent max-width="600" v-model="stateDialog">
            <v-card>
                <v-card-title>
                    Cambiar estado
                    <v-spacer></v-spacer>
                    <v-btn class="mb-3 ml-3" icon @click="closeStateDialog"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-select v-model="state" dense outlined style="width: 50%" label="Estado" :items="states" item-value="value" item-text="text"></v-select>
                    <v-checkbox
                    v-model="checkEmail"
                    hide-details
                    label="Enviar email de notificación"
                   
                    ></v-checkbox>
                    <v-textarea outlined height="100" v-model="note"  messages="Comentario o nota opcional (para uso interno)"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-btn tile depressed outlined @click="closeStateDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn tile depressed color="primary" class="white--text" @click="saveState"><v-icon left>mdi-content-save</v-icon>Cambiar estado</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-card
        flat
        >
       <v-card-title>Es bueno saber</v-card-title>
       <v-card-text v-html="conditions.cancelation_text"></v-card-text>
        </v-card> -->
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            clientDialog: false,
            stateDialog: false,
            checkEmail: false,
            note: null,
            state: null,
            form: {
                id: 0,
                guest_name: null,
                guest_last_name: null,
                guest_email: null,
                guest_phone: null,
                guest_country: null,
                check_in: null,
                guest_names: [],
                guest_petitions: null,
            },
            states: [
                {text:'Confirmado', value:'Confirmed'},
                {text:'Pendiente', value:'Pending'},
                {text:'Cancelado', value:'Cancelled'},
                {text:'Abortado', value:'Aborted'}
                
            ]
        }
    },
    mounted(){
        this.$store.dispatch('getCountries')  
        this.createClientForm();   
    },

    computed:{
         ...mapState({
            reservation: state => state.bookingsModule.reservation,
            countries: state => state.HotelModule.countries,
            clientErrors: state => state.bookingsModule.clientErrors,
            clientCode: state => state.bookingsModule.clientCode,
            stateCode: state => state.bookingsModule.stateCode,
        }),
    },

    methods:{
        openClientDialog(){
            this.createClientForm()
            this.clientDialog = true
        },

        saveClientInformation(){
            this.$store.dispatch('saveClientInformation', this.form).then(()=>{
                if(this.clientCode != 422){
                    this.clientDialog = false
                }
            })
        },

        createClientForm(){
            this.form.id = this.reservation.id;
            this.form.guest_name = this.reservation.guest_name;
            this.form.guest_last_name = this.reservation.guest_last_name;
            this.form.guest_email = this.reservation.guest_email;
            this.form.guest_phone = this.reservation.guest_phone;
            this.form.guest_country = this.reservation.guest_country;
            this.form.check_in = this.reservation.check_in.substr(0,5);
            this.form.guest_names = this.reservation.guest_names;
            this.form.guest_petitions = this.reservation.guest_petitions;
        },

        closeClientDialog(){  
            this.clientDialog = false
        },

        openStateDialog(){
            this.stateDialog = true
        },

        closeStateDialog(){
            this.stateDialog = false
        },

        saveState(){
            this.$store.dispatch('saveState', {id: this.reservation.id, state: this.state, send_email: this.checkEmail}).then(()=>{  
                if(this.stateCode != 422 && this.note != null){
                  this.$store.dispatch('saveNote', {content: this.note, reservation_id: this.reservation.id, user_id: 1})
                    this.stateDialog = false
                }
            })
        }
    },

}
</script>