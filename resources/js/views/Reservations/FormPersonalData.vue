<template>
     <v-card flat>
              <v-row>
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="mt-n4">
              <v-card-text>
               <v-form  ref="form" v-model="valid" @input="validForm">
                <hr class="hr-text mb-3 font-weight-bold" data-content="Datos Personales">
            <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-text-field
              dense
              v-model="form.name"
              outlined
              label="Nombre"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-text-field
              dense
              v-model="form.last_name"
              outlined
              label="Apellidos"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-text-field
              dense
              v-model="form.email"
              outlined
              label="Email"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-text-field
              dense
              v-model="form.phone"
              outlined
              label="Teléfono"
              :rules="[(v) => !!v || 'Requerido']"
              ></v-text-field>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
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
                </v-col>
            </v-row>
             <hr class="hr-text mb-3 font-weight-bold" data-content="Tu Estancia">
             <v-row>
                 <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" v-for="(room, index) in bookings.rooms" :key="index">
              <v-text-field
              dense
              :label="`Habitación ${index+1}: Nombre del huéspued`"
              placeholder="Nombre, Apellidos"
              outlined
              v-model="form.guest_names[index]"
              :rules="[(v) => !!v || 'Requerido']"
              >
              </v-text-field>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-select
              v-model="form.checkin"
              outlined
              dense
              :items="[conditions.checkin_time]"
              label="Hora de entrada"
              :rules="[(v) => !!v || 'Requerido']">
              </v-select>
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
              <v-textarea
                outlined
                no-resize
                rows="4"
                row-height="30"
                maxlength="191"
                counter
                v-model="form.special"
                label="Peticiones especiales"></v-textarea>
                </v-col>
              </v-row>
               </v-form>
               </v-card-text>
                </v-col>
                    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                    <v-alert class="mt-n12 mb-6 mx-3" type="info" outlined>
                        <span class="black--text">Al confirmar la reserva aceptas los términos y condicones generales del sitio web, así como  las condiciones particuares de la reserva.</span>
                        <v-chip small label color="info" text-color="white" @click="dialogTermsAndConditions = true">
                          <v-icon small left>
                            mdi-shield-account
                          </v-icon>
                          Ver condiciones
                        </v-chip>
                    </v-alert>
                    <hr class="hr-text mb-3 font-weight-bold" data-content="Confirmación" v-if="showPaymet">
                    </v-col>
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" v-if="showPaymet" class="mt-n12">
              <v-list>
                <div class="mb-1">Elija tipo de pago</div>
                <v-list-item-group mandatory v-model="selectedPayment">
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
              <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" order="1" order-xl="2" order-lg="2">
                        <div :class="!$vuetify.breakpoint.lgAndUp ? 'd-flex flex-column justify-center align-center' : ''">
                            <div class="font-weight-light grey--text mb-2" :style="$vuetify.breakpoint.lgAndUp ? 'font-size: 20px' : 'font-size: 25px'">
                              Reservar {{bookings.rooms.length}} habitación(es) por:
                            </div>
                            <div v-if="currencyFormat != null" class="font-weight-bold blue--text" :style="$vuetify.breakpoint.lgAndUp ? 'font-size: 40px' : 'font-size: 35px'">
                              {{currencyFormat.format(subTotal)}} {{configuration.currency_code}}
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" order="2" order-xl="1" order-lg="1">
                        <!-- BOTONES DE PAYPAL -->
                        <div id="paypal-button-container" :class="!$vuetify.breakpoint.lgAndUp ? 'd-flex justify-center align-center' : ''"></div>
                    </v-col>
                  </v-row>
              </v-col>
                </v-col>
              </v-row>
              <v-overlay style="z-index: 4" :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-overlay>


            <v-dialog
                v-model="dialogTermsAndConditions"
                persistent
                :width="$vuetify.breakpoint.xl ? '1000px' : '900px' "
              >
                <v-card tile>
                  <v-card-title>
                    <span class="text-h5">Terminos y condiciones</span>
                  </v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
                    Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
                    Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
                    Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
                    Cras pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor pretium vulputate massa. Consequat ipsum luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi donec, massa et libero sit risus neque tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse nibh.
                    Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci aliquam nulla justo egestas venenatis, elementum duis vel porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi tellus aliquam reprehenderit, curabitur cras at quis massa porttitor mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris, varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
                    Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam, eleifend quis integer curabitur sit scelerisque ac, mauris consequat luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer, dignissim id pede sodales quis, felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac dignissim metus nonummy hendrerit wisi, etiam ut.
                    Semper praesent integer fusce, tortor suspendisse, augue ligula orci ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu mollis ante congue elementum, inceptos eget optio quam pellentesque quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus parturient nullam, leo orci ligula ultrices. At tincidunt enim, suspendisse est sit sem ac. Amet tellus molestie est purus magna augue, non etiam et in wisi id. Non commodo, metus lorem facilisi lobortis ac velit, montes neque sed risus consectetuer fringilla dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam cursus adipiscing, integer torquent non, fringilla per maecenas. Libero ipsum sed tellus purus et. Duis molestie placerat erat donec ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci lacus, libero consectetuer mauris magna feugiat neque dapibus, donec pretium et. Aptent dui, aliquam et et amet nostra ligula.
                    Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam elementum interdum. Elementum vitae tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit, ultricies metus volutpat.
                    Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac vivamus. Nam libero orci, pulvinar nulla, enim pellentesque consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec, dictum cursus ullamcorper viverra. Ultricies quis orci lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse turpis.
                    +
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      text
                      @click="dialogTermsAndConditions = false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>

          </v-card>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    data(){
        return {
        dialogTermsAndConditions: false,
          showPaymet: false,
          valid: false,
          selectedPayment: null,
          currencyFormat : null,
          overlay: false,
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
        validForm(isAllFormFulled){
            if(typeof(this.$refs.form) != 'undefined'){
                this.$refs.form.resetValidation();
                console.log(isAllFormFulled)
                if(isAllFormFulled){
                    if(this.$refs.form.validate()){
                        this.showPaymet = true;
                        this.checkOut();
                        return;
                    }
                    this.showPaymet = false;
                }
                else{
                    this.showPaymet = false;
                }
            }
        },
      checkOut(){
          let paymentData = {
              platform: 1,
              currency: this.configuration.currency_code,
              value: this.subTotal,
              idHotel: this.hotel.id,
            }

          this.getPayPalButtonsInstance().onload = () => {
            window.paypal.Buttons({
              createOrder: (function (data, actions) {
                if(this.$refs.form.validate()){
                  return axios.post("/api/payments/pay",paymentData)
                            .then( data => {
                              return data.data.id;
                            })
                }

                            }).bind(this),
              onApprove: (function (data, actions) {
                 this.overlay = true
                data.paymentPlatformID =  1;
                return axios.post("/api/payments/success",data)
                            .then( data => {
                              this.form.payed = this.subTotal
                              this.form.hotel = this.hotel.id
                              //LLAMAR EL ENDPOINT DE CREAR RESERVA

                              this.$store.dispatch('saveReservation', this.form).then(()=>{
                                 this.$router.push({name: 'Confirmation'})
                                 this.overlay = false
                              })

                            })
                            }).bind(this)
                            }).render('#paypal-button-container');

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
          return this.$store.getters.oneNightPrice
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
