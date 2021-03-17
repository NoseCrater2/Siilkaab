<template>
     <v-card flat>
           
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <!-- <v-card-title>Datos personales</v-card-title>
              <v-divider ></v-divider> -->
              <hr class="hr-text" data-content="Datos Personales">
              <v-card-text>
               <v-form lazy-validation ref="form" >
              <v-text-field
              dense
              v-model="form.name"
              outlined
              label="Nombre"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
              <v-text-field
              dense
              v-model="form.last_name"
              outlined
              label="Apellidos"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
              <v-autocomplete
              dense
              :items="countries"
              item-text="name"
              item-value="name"
              v-model="form.country"
              outlined
              label="País"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-autocomplete>
              <v-text-field
              dense
              v-model="form.email"
              outlined
              label="Email"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
              <v-text-field
              dense
              v-model="form.phone"
              outlined
              label="Teléfono"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
             <hr class="hr-text mb-3" data-content="Tu estancia">
              <v-text-field v-for="(room, index) in bookings.rooms" :key="index" 
              dense
              :label="`Habitación ${index+1}: Nombre del huéspued`"
              placeholder="Nombre, Apellidos"
              outlined
              v-model="form.guest_names[index]"
              :rules="[(v) => !!v || 'Requerido']"
              >
              </v-text-field>
              <v-select
              v-model="form.checkin"
              outlined
              dense 
              @change="checkOut" 
              :items="[conditions.checkin_time]" 
              label="Hora de entrada" 
              :rules="[(v) => !!v || 'Requerido']">
              </v-select>
              <v-textarea height="100" v-model="form.special" outlined label="Peticiones especiales"></v-textarea>
               </v-form>
               </v-card-text>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  
              <hr class="hr-text" data-content="Confirmación">

              <v-subheader>Elija tipo de pago</v-subheader>
              <v-list>
                <v-list-item-group mandatory  v-model="selectedPayment">
                  <template v-for="(item, i) in configuration.payment_type">
                    <v-divider
                      v-if="!item"
                      :key="`divider-${i}`"
                    ></v-divider>

                    <v-list-item
                      v-else
                      :key="`item-${i}`"
                      :value="item"
                      active-class="primary--text text--accent-4"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            color="primary accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
              

              <v-alert class="ma-4" border="top" colored-border type="info" elevation="2" v-if="currencyFormat != null" >
                Completa el formulario <strong>Datos personales</strong> para desbloquear un método de pago.
                Al procesar la reserva aceptas los términos y condicones generales del sitio web, así como  las condiciones particuares de la reserva.
                <router-link style="color: primary" to="#">Ver condiciones</router-link>
              </v-alert>
              <div class="text-center">
                <div class="font-weight-light grey--text title mb-2 d-inline">
                Reservar 2 habitaciones por 
              </div>
              <h3 v-if="currencyFormat != null" class="display-1 font-weight-light blue--text mb-2 d-inline">
                {{currencyFormat.format(subTotal)}}
              </h3>
              </div>
              
                 
              <div class="ma-4" id="paypal-button-container"></div>
                </v-col>
              </v-row>
              
           
          </v-card>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    data(){
        return {
          selectedPayment: null,
          currencyFormat : null,
          form:{
            name: null,
            last_name: null,
            country: 'México',
            guest_names: [],
            email: null,
            phone: null,
            checkin: null,
            special: null,
            payed: 0,
            hotel: 0,
        }
      }
    },
    mounted(){
      this.currencyFormat = new Intl.NumberFormat('es-MX', {style: 'currency', currency: this.configuration.currency_code});
    },

    methods:{
      checkOut(){
        if(this.$refs.form.validate()){
          let paymentData = {
              platform: 1,
              currency: this.configuration.currency_code,
              value: this.subTotal,
              idHotel: this.hotel.id,
            }

          this.getPayPalButtonsInstance().onload = () => {
            window.paypal.Buttons({
              createOrder: (function (data, actions) {
                return axios.post("/api/payments/pay",paymentData)
                            .then( data => {
                              return data.data.id;
                            })
                            }).bind(this),
              onApprove: (function (data, actions) {
                data.paymentPlatformID =  1;
                return axios.post("/api/payments/success",data)
                            .then( data => {
                              this.form.payed = this.subTotal
                              this.form.hotel = this.hotel.id
                              //LLAMAR EL ENDPOINT DE CREAR RESERVA
                              this.$store.dispatch('saveReservation', this.form).then(()=>{
                                 this.$router.push({name: 'Confirmation'})
                              })
                             
                            })
                            }).bind(this)
                            }).render('#paypal-button-container');
          } 
        }
      },

      getPayPalButtonsInstance(){
        let formulary = document.createElement('script')
        formulary.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AUjYTvR0qUTUCXXIJGQexrO-xkC9a1f6n_OCukiIZMKTQVTm2HKB1pM4Lv5e4pAYgdca830wrbBiMTTM&currency='+this.configuration.currency_code);
        document.body.appendChild(formulary)
        return formulary;
      },

      
    },

  computed:{
    ...mapState({
        conditions: state => state.HotelModule.conditions,
        configuration: state => state.HotelModule.configuration,
        bookings: state => state.bookingsModule.bookings,
        countries: state => state.HotelModule.countries,
        hotel: (state) => state.HotelModule.hotel,
    }),

    subTotal(){
        if(this.selectedPayment == 'Una noche'){
          return this.$store.getters.totalPrice / this.bookings.nights
        }else if(this.selectedPayment == 'Mitad de reserva'){
          return this.$store.getters.totalPrice / 2
        }else {
          return this.$store.getters.totalPrice
        }
    }

  }
}
</script>
<style scoped>
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
}
.hr-text:before {
    content: '';
    background: linear-gradient(to right, transparent, black, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
}
.hr-text:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 .5em;
    line-height: 1.5em;
    font-size: 1.3em;
    margin-top: -5px;
    background-color: #fcfcfa;
  
}
</style>