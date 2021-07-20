<template>
    <div>
        <v-card class="pa-2" outlined tile>
            <div class="d-flex align-center ml-1">
                <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                        <div>
                            <h1 class="font-weight-bold" :class="!$vuetify.breakpoint.mdAndUp ? 'text-center': ''">Reserva - {{reservation.id}}</h1>
                        </div>
                    </v-col>
                    <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6">
                        <v-btn depressed color="primary" block tile><v-icon left>mdi-printer</v-icon>Imprimir</v-btn>
                    </v-col>
                    <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6">
                        <v-btn depressed color="primary" block tile @click="openSendEmailDialog"><v-icon left>mdi-send</v-icon>Enviar</v-btn>
                    </v-col>
                </v-row>
            </div>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
                    <v-btn outlined block tile @click="openStateDialog"><v-icon left>mdi-cogs</v-icon>Cambiar estado</v-btn>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
                    <v-btn outlined block tile @click="openClientDialog"><v-icon left>mdi-account</v-icon>Detalles del cliente</v-btn>
                </v-col>
            </v-row>


            <v-row>
                <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12">
                    <v-card flat>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-img min-width="auto" :max-width="$vuetify.breakpoint.mdAndUp ? '528' : ''" min-height="auto" :max-height="$vuetify.breakpoint.mdAndUp ? '396' : ''" :src="`/img/${reservation.hotel_image}`"></v-img>
                            <h2 :class="!$vuetify.breakpoint.mdAndUp ? 'text-center' : ''" class="mt-3 mb-n5">{{reservation.hotel_name}}</h2>
                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" :class="!$vuetify.breakpoint.mdAndUp ? 'text-center' : ''">
                            <div class="font-italic my-3" style="font-size: 0.85em; ">
                                <v-icon>mdi-map-marker</v-icon>
                                {{reservation.hotel_address}}
                            </div>

                            <div class="font-italic my-3" style="font-size: 0.85em; ">
                                <v-icon>mdi-email</v-icon>
                                {{reservation.hotel_email}}
                            </div>

                            <div class="font-italic my-3" style="font-size: 0.85em; ">
                                <v-icon>mdi-phone</v-icon>
                                {{reservation.hotel_phone}}
                            </div>

                            <div class="font-italic my-3" style="font-size: 0.85em; ">
                                <v-icon>mdi-earth</v-icon>
                                {{reservation.hotel_url}}
                            </div>
                        </v-col>

                        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                            <v-card class="pa-2" outlined>
                                <v-row justify="space-between">
                                    <v-col cols="6" xl="7" lg="7" md="7" sm="6" xs="6">
                                        <div>Importe total: </div>
                                    </v-col>
                                    <v-col cols="6" xl="5" lg="5" md="5" sm="6" xs="6" class="d-flex justify-end text-right">
                                        <div>{{reservation.total_price}}</div>
                                    </v-col>

                                </v-row>
                                <v-row justify="space-between" class="my-n4">
                                    <v-col cols="6" xl="7" lg="7" md="7" sm="6" xs="6">
                                        <div>Prepago: </div>
                                    </v-col>
                                    <v-col cols="6" xl="5" lg="5" md="5" sm="6" xs="6" class="d-flex justify-end text-right">
                                        <div>{{reservation.payed}}</div>
                                    </v-col>

                                </v-row>
                                <v-row justify="space-between">
                                    <v-col cols="6" xl="7" lg="7" md="7" sm="6" xs="6">
                                        <div>Pago en el hotel: </div>
                                    </v-col>
                                    <v-col cols="6" xl="5" lg="5" md="5" sm="6" xs="6" class="d-flex justify-end text-right">
                                        <div>{{reservation.total_price-reservation.payed}}</div>
                                    </v-col>

                                </v-row>
                            </v-card>
                        </v-col>
                    </v-card>
                </v-col>
                <v-col cols="12" xl="7" lg="7" md="7" sm="12" xs="12">
                    <v-card class="pa-2" flat>
                        <v-row justify="space-between">
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                                <div class="font-weight-bold">Número de reserva: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right">
                                <div class="font-weight-bold">{{reservation.id}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div>Estado: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end aling-center text-right my-n2">
                                <v-icon left color="green">mdi-brightness-1</v-icon>
                                <div class="ml-n1">{{reservation.state}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                                <div>Fecha de reserva: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right">
                                <div>{{reservation.created_at}}</div>
                            </v-col>
                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="d-flex justify-end text-right">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="mb-n2">
                                <div>Estancia: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right mb-n2">
                                <div>{{reservation.count_rooms}} habitación para {{reservation.nights}} noche(s)</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div>Entrada: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right my-n2">
                                <div>{{reservation.from}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div>Salida: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right my-n2">
                                <div>{{reservation.to}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div class="font-weight-bold">Cliente: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right my-n2">
                                <div class="font-weight-bold">{{reservation.guest_name+' '+reservation.guest_last_name}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div>Email: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right my-n2">
                                <div>{{reservation.guest_email}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="my-n2">
                                <div>Teléfono: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right my-n2">
                                <div>{{reservation.guest_phone}}</div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="mt-n2">
                                <div>País: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right mt-n2">
                                <div>{{reservation.guest_country}}</div>
                            </v-col>
                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="d-flex justify-end text-right">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                                <div>Hora de entrada: </div>
                            </v-col>
                            <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right">
                                <div>{{reservation.check_in}}</div>
                            </v-col>
                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="my-n2">
                                <div>Peticiones especiales: </div>
                            </v-col>
                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                                <div class="font-italic" style="font-size: 0.85em; ">"{{reservation.guest_petitions}}"</div>
                            </v-col>
                        </v-row>
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
                              <v-img :src="`/img/${room.image}`">
                                <template v-slot:placeholder>
                                    <v-img src="/img/unavailable.jpg">
                                    </v-img>
                                </template>
                              </v-img>
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
                               Adultos:  {{room.adults}}
                               <div class="inline" v-if="room.children > 0">
                                   Niños:  {{room.children}}
                               </div>
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
                                {{ room.guest_name.name }}
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
                    <v-row class="mx-1" align="center">
                        <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                            <h3>Importe total de la habitación: </h3>
                        </v-col>
                        <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6" class="d-flex justify-end text-right">
                            <h3>{{reservation.total_price}}</h3>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>



        <v-dialog v-model="clientDialog" max-width="600" persistent>
            <v-card tile>
                <v-card-title class="mx-2 mb-3">
                    Detalles del cliente
                    <v-spacer></v-spacer>
                    <v-btn :disabled="isLoadingFormDetails" icon @click="closeClientDialog"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                <v-form ref="clientForm" >
                    <v-text-field :error-messages="clientErrors.guest_name" label="Nombre" dense class="mx-2" outlined v-model="form.guest_name"></v-text-field>
                    <v-text-field :error-messages="clientErrors.last_name" label="Apellidos" dense class="mx-2" outlined v-model="form.guest_last_name"></v-text-field>
                    <v-text-field :error-messages="clientErrors.guest_name" label="Email" dense class="mx-2" outlined v-model="form.guest_email"></v-text-field>
                    <v-text-field :error-messages="clientErrors.guest_phone" label="Teléfono" dense class="mx-2" outlined v-model="form.guest_phone"></v-text-field>
                    <v-autocomplete :error-messages="clientErrors.guest_country" :items="countries" item-text="name" item-value="name" label="País" dense class="mx-2" outlined v-model="form.guest_country"></v-autocomplete>

                    <v-dialog
                        ref="dialogCheckin"
                        v-model="modalFormCheckin"
                        :return-value.sync="form.check_in"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.check_in"
                            :readonly="true"
                            label="Hora de entrada"
                            prepend-inner-icon="mdi-clock"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            required
                            :error-messages="clientErrors.check_in"
                            dense
                            class="mx-2"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modalFormCheckin"
                          v-model="form.check_in"
                          format="24hr"
                          full-width
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalFormCheckin = false">Cancelar</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogCheckin.save(form.check_in)"
                          >Aceptar</v-btn>
                        </v-time-picker>
                    </v-dialog>

                    <v-text-field :error-messages="clientErrors.guest_names" :label="`Huesped de la habitación #`+(index+1)" dense class="mx-2"
                    v-for="(names, index) in form.guest_names"
                    :key="index"

                    v-model="form.guest_names[index].name"
                    outlined>
                    </v-text-field>
                    <v-textarea :error-messages="clientErrors.guest_petitions" label="Peticiones especiales" class="mx-2" outlined
                    no-resize
                    rows="4"
                    row-height="30"
                    maxlength="191"
                    counter
                    v-model="form.guest_petitions"></v-textarea>
                </v-form>
                </v-card-text>
                <v-card-actions class="mx-6 mt-n3">
                    <v-btn tile depressed outlined :disabled="isLoadingFormDetails" @click="closeClientDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn tile depressed color="primary" class="white--text" :disabled="isLoadingFormDetails" :loading="isLoadingFormDetails" @click="saveClientInformation"><v-icon left>mdi-content-save</v-icon> Aplicar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent max-width="600" v-model="stateDialog">
            <v-card>
                <v-card-title class="mb-3">
                    Cambiar estado
                    <v-spacer></v-spacer>
                    <v-btn icon :disabled="isLoadingStateDialog" @click="closeStateDialog"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-select v-model="state" dense outlined style="width: 50%" label="Estado" :items="states" item-value="value" item-text="text">
                    </v-select>
                    <v-checkbox
                    v-model="checkEmail"
                    hide-details
                    label="Enviar email de notificación"

                    ></v-checkbox>
                    <v-textarea
                    class="mt-3"
                    outlined
                    no-resize
                    rows="4"
                    row-height="30"
                    maxlength="191"
                    counter
                    v-model="note"
                    messages="Comentario o nota opcional (para uso interno)"></v-textarea>
                </v-card-text>
                <v-card-actions class="mx-4 mt-n3">
                    <v-btn tile depressed outlined :disabled="isLoadingStateDialog" @click="closeStateDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn tile depressed color="primary" class="white--text" @click="saveState" :disabled="(isLoadingStateDialog || state == null) ? true : false" :loading="isLoadingStateDialog"><v-icon left>mdi-content-save</v-icon>Cambiar estado</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
                <v-dialog persistent max-width="600" v-model="sendEmailDialog">
            <v-card>
                <v-card-title class="mb-3">
                    Enviar
                    <v-spacer></v-spacer>
                    <v-btn icon :disabled="isSendingEmailBtn" @click="closeSendEmailDialog"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-combobox
                        prepend-inner-icon="mdi-email"
                        v-model="modelEmails"
                        chips
                        multiple
                        outlined
                        solo
                        hint="Introduce direcciones email separadas por coma, punto y coma, enter, o tab"
                        persistent-hint
                        flat
                        required
                        append-icon=""
                        :delimiters="[',', ';']"
                      >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip
                            :color="colorChipEmails(item)"
                            :dark="colorChipEmails(item) == 'red' ? true : false"
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            close-icon="mdi-close"
                            @click="select"
                            @click:close="removeEmails(item)"
                          >
                            <span>{{ item }}</span>
                          </v-chip>
                        </template>
                    </v-combobox>
                </v-card-text>
                <v-card-actions class="mx-4 mt-n3">
                    <v-btn tile depressed :disabled="isSendingEmailBtn" outlined @click="closeSendEmailDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn tile depressed color="primary" class="white--text" @click="sendEmails" :loading="isSendingEmailBtn" :disabled="(isSendingEmailBtn || modelEmails.length == 0 || !isValidEmail) ? true : false"><v-icon left>mdi-content-save</v-icon>Enviar</v-btn>
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
import axios from 'axios'
export default {
    data(){
        return{
            modelEmails: [],
            isSendingEmailBtn: false,
            sendEmailDialog: false,
            clientDialog: false,
            stateDialog: false,
            isLoadingStateDialog: false,
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
            modalFormCheckin: false,
            isLoadingFormDetails: false,
            states: [
                {text:'Confirmado', value:'Confirmed', disabled: false},
                {text:'Pendiente', value:'Pending', disabled: false},
                {text:'Cancelado', value:'Cancelled', disabled: false},
                {text:'Abortado', value:'Aborted', disabled: false}

            ]
        }
    },

    computed:{
         ...mapState({
            reservation: state => state.bookingsModule.reservation,
            countries: state => state.HotelModule.countries,
            clientErrors: state => state.bookingsModule.clientErrors,
            clientCode: state => state.bookingsModule.clientCode,
            stateCode: state => state.bookingsModule.stateCode,
        }),
        isValidEmail: {
            get(){
                let notValid = 0;
                this.modelEmails.forEach((email)=>{
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if(pattern.test(email) == false){
                        notValid++;
                    }
                })
                if(notValid == 0){
                    console.log("TRUE", this.modelEmails)
                    return true;
                }
                else{
                    console.log("False", this.modelEmails)
                    return false;
                }
            }
        },
    },

    methods:{
        openClientDialog(){
            this.createClientForm()
            this.clientDialog = true
        },

        saveClientInformation(){
            this.isLoadingFormDetails = true;
            this.$store.dispatch('saveClientInformation', this.form).then(()=>{
                if(this.clientCode != 422){
                    this.isLoadingFormDetails = false;
                    this.closeClientDialog();
                }
                else{
                    this.isLoadingFormDetails = false;
                }
            }).catch(()=>{
                this.isLoadingFormDetails = false;
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
            this.form.guest_names = this.reservation.rooms.map(room =>room.guest_name);
            this.form.guest_petitions = this.reservation.guest_petitions;
        },

        closeClientDialog(){
            this.clientDialog = false
        },

        openStateDialog(){
            this.stateDialog = true
            this.states.forEach((item)=>{
                if(this.reservation.state == item.value){
                    item.disabled = true;
                }
                else{
                    item.disabled = false;
                }
            })
        },

        closeStateDialog(){
            this.state = null;
            this.note = null;
            this.stateDialog = false
        },

        colorChipEmails(item){
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          //SI HAY UN ERROR EN LA VALIDACION, SE PONE DE ROJO
          if(pattern.test(item) == false){
            return 'red'
          }
          return '';
        },
        sendEmails(){
            this.isSendingEmailBtn = true;
            let objEmails = {
                emails: this.modelEmails
            }
            axios.post(`/api/sendbookings/${this.reservation.id}`, objEmails).then((response)=>{
                this.isSendingEmailBtn = false;
                this.closeSendEmailDialog();
            }).catch((error)=>{
                this.isSendingEmailBtn = false;
            });
        },
        removeEmails(item) {
          this.modelEmails.splice(this.modelEmails.indexOf(item), 1)
          this.modelEmails = [...this.modelEmails]
        },
        openSendEmailDialog(){
            this.sendEmailDialog = true;
        },
        closeSendEmailDialog(){
            this.modelEmails = [];
            this.sendEmailDialog = false;
        },
        saveState(){
            this.isLoadingStateDialog = true;
            console.log(this.reservation)
            this.$store.dispatch('saveState', {id: this.reservation.id, state: this.state, send_email: this.checkEmail}).then(()=>{
                if(this.stateCode != 422){
                    if(this.note != null){
                        this.$store.dispatch('saveNote', {content: this.note, reservation_id: this.reservation.id, user_id: 1}).then(()=>{
                            this.isLoadingStateDialog = false;
                            this.closeStateDialog();
                        }).catch(()=>{
                            this.isLoadingStateDialog = false;
                        })
                    }
                    else{
                        this.isLoadingStateDialog = false;
                        this.closeStateDialog();
                    }
                }
            }).catch(()=>{
                this.isLoadingStateDialog = false;
            })
        }
    },

}
</script>
