<template>
  <v-app>
    <v-row justify="center">
    <v-form ref="form" style="width: 100%"  v-model="valid" lazy-validation >
    <v-card color="black" flat>
      <v-card-text>
        <v-row class="mx-2 mb-xl-n5 mb-lg-n5 mb-md-n5">
          <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-menu
            dark
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            max-width="290px"
            offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                :rules="[v => !!v || 'Requerido']"
                dark
                v-model="date"
                label="DESDE"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
                :messages="getSearchErrors.from"
                >
                </v-text-field>
              </template>
              <v-date-picker v-model="date" :min="new Date().toISOString().substr(0, 10)"  @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-menu
            dark
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            max-width="290px"
            offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                :rules="[v => !!v || 'Requerido']"
                dark
                v-model="date2"
                label="HASTA"
                prepend-inner-icon="mdi-calendar"
                readonly
                 outlined
                v-bind="attrs"
                v-on="on"
                :messages="getSearchErrors.to">
                </v-text-field>
              </template>
              <v-date-picker v-model="date2" :min="new Date().toISOString().substr(0, 10)" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-menu
            ref="menu3"
            v-model="menu3"
            :close-on-content-click="false"
            transition="scale-transition"
            nudge-bottom="-31"
            max-width="600"
            :bottom="$vuetify.breakpoint.mdAndUp"
            :top="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
            offset-y
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                :rules="[v => !!v || 'Requerido']"
                dark
                v-model="searchTerms"
                :label="total"
                prepend-inner-icon="mdi-account-multiple"
                readonly
                 outlined
                v-bind="attrs"
                v-on="on"
                >
                </v-text-field>
            </template>
            <v-card class="pa-4">
              <v-row  >
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" >
                  <v-select outlined label="Habitaciones" @change="changeCoutRooms" dense :items="maxRooms" v-model="selectedRooms">
                  </v-select>
                </v-col>
              </v-row>
              <v-row v-for="r in searchRooms" :key="r">
               <v-col cols="12" class="py-0 my-0">
                 <span>Habitación {{r}}</span>
               </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0 my-0 mb-sm-2 mb-2">
                  <v-select :items="maxAdults" v-model="form[r-1].adults" label="Adultos" hide-details outlined  dense >
                  </v-select>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0 my-0">
                  <v-select :items="maxChildren" hide-details v-model="form[r-1].children"  outlined  label="Niños" dense  >
                  </v-select>
                </v-col>

                <v-row v-if="parseInt(form[r-1].children) > 0" class="mx-2 my-0">
                  <v-col cols="12" class="py-0 my-1 ml-n2"> Edad de los niños</v-col>
                  <v-col cols="2" xl="2" lg="2" md="2" sm="2" xs="2" v-for="c in parseInt(form[r-1].children)" :key="c" class="py-0 my-1 mx-1 px-0">
                      <v-select  :items="maxChildrenAge" v-model="form[r-1].ages[c-1]" hide-details outlined  type="number" dense  >
                      </v-select>
                  </v-col>
                </v-row>
                <v-col cols="12">
                   <v-divider></v-divider>
                </v-col>

              </v-row>
              <v-card-actions>
                <v-btn class="ml-n2"  @click="menu3 = false" outlined>CERRAR</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
            </v-menu>
          </v-col>

          <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-btn
            dark
            x-large
            block
            :loading="loading"
            :disabled="((!isLoadedPromises && !showResults) || loading) ? true : false"
            class="white--text"
             color="primary"
             @click="search()">
            <v-icon left dark>mdi-magnify</v-icon>
             BUSCAR
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    </v-form>
  </v-row>
    <v-row justify="center" class="px-0 mx-0" v-if="showResults" >
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
            <v-breadcrumbs-item
                :active-class="$route.name == item.to.name ? 'v-breadcrumbs__item--disabled black--text' : 'v-breadcrumbs__item--disabled'"
                :disabled="item.disabled"
                :to="item.to"
            >
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
        </template>

        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-row v-if="showResults">
        <v-alert
            :value="$route.name === 'PersonalData' ? true : false"
            width="100%"
            dense
            text
            class="text-center mx-5 mb-n3"
            color="success"
        >
            Estás a un paso de completar tu reserva.
        </v-alert>
      <v-container fluid style="width: 100%">
        <v-row no-gutters>
        <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12" order="1" order-xl="1" order-lg="1">
        <v-card flat style="position: sticky; top:0;">
          <v-avatar tile size="97%" @click="openHotelDialog" :class="$vuetify.breakpoint.lgAndUp ? 'mx-2' : 'mx-4'" v-if="$vuetify.breakpoint.lgAndUp">
            <v-hover v-slot="{ hover }">
                  <v-img width="auto" height="auto" :src="`/img/${hotel.image}`">
                     <v-row style="background-color: rgba(10, 10, 10, 0.5);" align="center" justify="center" v-if="hover">
                          <v-icon size="50" dark>mdi-magnify</v-icon>
                     </v-row>
                  </v-img>
            </v-hover>
          </v-avatar>
                <h2 class="text-center mt-2">{{hotel.title}}</h2>
                <v-alert
                    icon="mdi-map-marker"
                    colored-border
                    type="info"
                    elevation="0"
                    style="font-size: 13px"
                  >
                    {{hotel.title}}
                </v-alert>
          <v-divider class="mx-2"></v-divider>
          <div class="d-flex justify-space-between">
            <v-col cols="5">
                <div class="font-weight-bold" style="font-size: 13px">
                    Estancia:
                </div>
            </v-col>
            <v-col cols="7">
                <div class="d-flex justify-end text-right" style="font-size: 13px">
                    {{ bookings.rooms.length }} Habitación(es) para {{ bookings.nights }} noche(s)
                </div>
            </v-col>
          </div>
            <div class="d-flex justify-space-between">
                <v-col cols="5">
                    <div class="font-weight-bold" style="font-size: 13px">
                        Entrada:
                    </div>
                </v-col>
                <v-col cols="7">
                    <div class="d-flex justify-end text-right" style="font-size: 13px">
                        {{ $moment(bookings.from).format("Do dddd MMM gggg") }}
                    </div>
                </v-col>
            </div>
            <div class="d-flex justify-space-between">
                <v-col cols="5">
                    <div class="font-weight-bold" style="font-size: 13px">
                        Salida:
                    </div>
                </v-col>
                <v-col cols="7">
                    <div class="d-flex justify-end text-right" style="font-size: 13px">
                        {{ $moment(bookings.to).format("Do dddd MMM gggg")}}
                    </div>
                </v-col>
            </div>
            <v-divider class="mx-2"></v-divider>
            <div v-if="$vuetify.breakpoint.lgAndUp">
                <div v-for="(room, index) in bookings.rooms" :key="index">
                    <div class="d-flex justify-space-between align-center mb-n3">
                    <v-col cols="7">
                        <div class="font-weight-bold">
                            {{room.name}}
                        </div>
                    </v-col>
                    <v-col cols="5">
                        <div class="d-flex justify-end text-right">
                            {{configuration.currency_symbol}}{{roomPrice(room.rates[0])}} {{configuration.currency_code}}
                        </div>
                    </v-col>
                    </div>
                    <div class="d-flex justify-space-between align-center mb-n5">
                        <v-col cols="5">
                            <div class="font-weight-bold" style="font-size: 13px">
                                Ocupacion:
                            </div>
                        </v-col>
                        <v-col cols="7">
                            <div class="d-flex justify-end text-right" style="font-size: 13px">
                                {{ $moment(bookings.from).format("Do dddd MMM gggg") }}
                            </div>
                        </v-col>
                    </div>
                    <div class="d-flex justify-space-between align-center mb-n5">
                        <v-col cols="5">
                            <div class="font-weight-bold" style="font-size: 13px">
                                Régimen:
                            </div>
                        </v-col>
                        <v-col cols="7">
                            <div class="d-flex justify-end text-right" style="font-size: 13px">
                                {{ $moment(bookings.from).format("Do dddd MMM gggg") }}
                            </div>
                        </v-col>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                        <v-col cols="5">
                            <div class="font-weight-bold" style="font-size: 13px">
                                Condiciones de la tarifa:
                            </div>
                        </v-col>
                        <v-col cols="7" class="">
                            <div class="text-right" style="font-size: 13px">
                                {{ $moment(bookings.from).format("Do dddd MMM gggg") }}
                            </div>
                        </v-col>
                    </div>
                    <v-divider class="mx-2"></v-divider>
                </div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="$vuetify.breakpoint.lgAndUp">
            <v-col cols="5">
                <div class="font-weight-bold">
                    Total reserva:
                </div>
            </v-col>
            <v-col cols="7">
                <div class="d-flex justify-end text-right">
                    {{configuration.currency_symbol}}{{$store.getters.totalPrice}} {{configuration.currency_code}}
                </div>
            </v-col>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="$route.name == 'selectRoom'" color="primary" block depressed tile :to="{name:'PersonalData'}" >Reservar</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>

        <v-col cols="12" xl="9" lg="9" md="12" sm="12" xs="12" order="2" order-xl="2" order-lg="2">
            <router-view :key="$route.path"></router-view>
        </v-col>
        </v-row>
        <v-divider v-if="$vuetify.breakpoint.lgAndUp" class="mx-2 mb-2"></v-divider>
        <v-row class="mx-2">
          <iframe
          width="100%"
          height="50%"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="`https://maps.google.com/maps?q=${contact.latitude},${contact.longitude}&hl=es&z=14&amp;output=embed`"
          >
          </iframe>
        </v-row>
      </v-container>
    </v-row>
     <DialogDetailHotel @closeDialog="closeHotelDetail" :dialog="dialog" v-if="dialog" />
  </v-app>
</template>


<script >
import {mapGetters, mapState, mapActions } from 'vuex';
import DialogDetailHotel from '../../components/DetailRooms/DialogDetailHotel'
export default {
  data () {
    return {
        isLoadedPromises: false,
      dialog: false,
      items: [
        {
          text: 'Selecciona habitación',
          disabled: false,
          to: {name: 'selectRoom'}
        },
        {
          text: 'Datos personales',
          disabled: true,
          to: {name: 'PersonalData'}
        },
        {
          text: 'Reserva confirmada',
          disabled: true,
          to: {name: 'Confirmation'}
        }
      ],

      valid: true,
      maxChildrenSelected: 0,
      selectedChildren: 0,
      selectedRooms: 0,
      form:[],
      date: this.$moment().format('YYYY-MM-DD'),
      date2: this.$moment().date( this.$moment().date() + 1).format('YYYY-MM-DD'),
      menu: false,
      menu2: false,
      menu3: false,
      searchTerms: null,
      loader: null,
      loading: false,
      status: null,
      errors: null,
      showResults : false,
      maxRooms: [
        '1 Habitación',
        '2 Habitaciones',
        '3 Habitaciones',
        '4 Habitaciones',
        '5 Habitaciones',
      ]
    }
  },
  mounted(){
      this.chargePromises();
  },
  methods:{
      ...mapActions(["getHotel", "getCountries", "getContacts", "getConfiguration", "getConditions", "chargeLocalStorage", "addRoom"]),
        async chargePromises(){
            let promiseHotel = 1;
            let promiseCountries = 1;
            let promiseContacts = 1;
            let promiseConfiguration = 1;
            let promiseConditions = 1;

            promiseHotel = await this.getHotel(this.id);
            promiseCountries = await this.getCountries(this.id);
            promiseContacts = await this.getContacts(this.hotel.idContact);
            promiseConfiguration = await this.getConfiguration(this.hotel.idConfiguration);
            promiseConditions = await this.getConditions(this.hotel.idCondition);

            await Promise.all([promiseHotel, promiseCountries, promiseContacts, promiseConfiguration, promiseConditions]).then(values => {
                this.isLoadedPromises = true;
            }).catch(()=>{
                this.isLoadedPromises = true;
            });
            //Cargamos localStorage
            await this.chargeLocalStorage();
            let itemLocalStorage = JSON.parse(localStorage.getItem('reservationStorage'));
            if(Object.keys(itemLocalStorage.information).length){
                this.id = itemLocalStorage.information.id
                this.date = itemLocalStorage.information.from
                this.date2 = itemLocalStorage.information.to
                this.form = itemLocalStorage.information.rooms
                this.selectedRooms = parseInt(itemLocalStorage.information.rooms.length);
                if(itemLocalStorage.booking.rooms.length > 0){
                    this.localGetAvailabilityRooms(itemLocalStorage.information);
                }
            }
        },
    changeCoutRooms(){
      this.form = []
       for (let index = 0; index < parseInt(this.selectedRooms); index++) {
        this.form.push({adults: 0, children:0, ages:[]})
      }
    },

    roomPrice(rates){
      let price =  0
      rates.forEach(r => {
          price = price + parseFloat(r.price)
      });

      return price
    },

    openHotelDialog(){
      this.dialog = true
    },

    closeHotelDetail(){
      this.dialog = false
    },

    localGetAvailabilityRooms(terms, formMethodFind = false){
        this.$store.dispatch('getAvailabilityRooms',terms).then(()=>{
            if(formMethodFind){
                for (const prop in this.availableRooms) {
                    //AÑADIMOS AL LOCALSTORAGE LAS HABITACIONES
                    this.addRoom({index: parseInt(prop - 1), room: this.availableRooms[prop][0], selectedCard: 0})
                    console.log("PROPROR", this.availableRooms[prop][0])
                }
            }
          this.showResults = true;
          this.loading = false;
          terms.nights = this.$moment(this.date2).diff(this.$moment(this.date),'days')
          this.$store.dispatch('addGeneralInformation',terms).then(()=>{
            if(this.$route.name !== 'selectRoom' && this.$route.name !== 'PersonalData'){
              this.$router.push({name: 'selectRoom'})
            }
          })
        })
    },

    search(){
        this.loading = true;
      if(this.$refs.form.validate()){
        this.$store.dispatch('resetRooms').then(()=>{
           this.errors = null;
        let terms = {id: 0, from: null, to: null, rooms: []}
        terms.id = this.id
        terms.from = this.date
        terms.to = this.date2
        terms.rooms = this.form
        console.log(terms.rooms)
        this.localGetAvailabilityRooms(terms, true);
        })

      }
    },

    errorFor(field){
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
    },

    printSelected(){
     parseInt(this.selectedRooms)
    }
  },

  components:{
    DialogDetailHotel,
  },

  computed:{
     ...mapState({
        availableRooms: state => state.RoomModule.availableRooms,
        bookings: state => state.bookingsModule.bookings,
        hotel: (state) => state.HotelModule.hotel,
        contact: state => state.HotelModule.contacts,
        configuration: state => state.HotelModule.configuration,
    }),

   ...mapGetters(["getSearchErrors"]),

    total(){
      if(this.totalAdults && this.totalChildren){
        this.searchTerms = this.totalAdults + ' Adultos + '+ this.totalChildren + ' Niños'
        return this.totalAdults + ' Adultos + '+ this.totalChildren + ' Niños'

      }else if(this.totalAdults ){
        this.searchTerms = this.totalAdults + ' Adultos'
        return this.totalAdults + ' Adultos'
      }else{
        return 'OCUPACION'
      }
    },

    totalAdults(){
      let total = 0
      if(this.form){
        this.form.map(function( room ){
          total+=parseInt(room.adults)
        })
      }
      return total;
    },

    totalChildren(){
      let total = 0
      if(this.form){
        this.form.map(function( room ){
          total+=parseInt(room.children)
        })
      }
      return total;
    },

    maxChildrenAge(){
      let ca = []
      if(this.hotel.max_adults){
        for (let index = 0; index < this.hotel.children_age + 1; index++) {
          ca.push(index)
        }
      }
      return ca;
    },

    maxAdults(){
      let a = []
      if(this.hotel.max_adults){
        for (let index = 1; index < this.hotel.max_adults + 1; index++) {
          a.push(index+' Adultos')
        }
      }
      return a;
    },

    maxChildren(){
      let c = []
      if(this.hotel.max_adults){
        for (let index = 1; index < this.hotel.max_children + 1; index++) {
          c.push(index+' Niños')
        }
      }
      return c;
    },
    searchRooms(){
      let se = parseInt(this.selectedRooms)
      return  se
    },

    hasErrors(){
      return 422 === this.status && this.errors !== null;
    },

    hasAvailavility(){
      return 200 === this.status;
    },

    noAvailiability(){
      return 404 === this.status;
    }
  },

  props:['id'],

}
</script>

<style scoped>

</style>
