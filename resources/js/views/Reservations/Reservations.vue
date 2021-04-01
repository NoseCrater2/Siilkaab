<template>
  <v-app >
    <v-row justify="center"  >
    <v-form ref="form" style="width: 1366px"  v-model="valid" lazy-validation >
    <v-card color="black"  >
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="3" >
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

          <v-col cols="12" sm="3" >
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

          <v-col cols="12" sm="3">
            <v-menu
            ref="menu3"
            width="350"
            v-model="menu3"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-height="350"
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
            <v-card max-width="500" class="pa-4" >
              <v-row  >
                <v-col cols="12" class="py-0 my-0" >
                  <v-select outlined label="Habitaciones" @change="changeCoutRooms" dense :items="maxRooms" v-model="selectedRooms">
                  </v-select>
                </v-col>
              </v-row>
              <v-row v-for="r in searchRooms" :key="r">
               <v-col cols="12" class="py-0 my-0">
                 <span>Habitación {{r}}</span>
               </v-col>
                <v-col cols="6" class="py-0 my-0">
                   
                  <v-select :items="maxAdults" v-model="form[r-1].adults" label="Adultos" hide-details outlined  dense >
                  </v-select>
                </v-col>
                <v-col cols="6" class="py-0 my-0">
                  <v-select :items="maxChildren" hide-details v-model="form[r-1].children"  outlined  label="Niños" dense  >
                  </v-select>
                </v-col>
               
                <v-row v-if="parseInt(form[r-1].children) > 0" class="mx-2 my-0">
                  
                  <v-col cols="12" class="py-0 my-1 ml-n2"> Edad de los niños</v-col>
                  <v-col cols="2" v-for="c in parseInt(form[r-1].children)" :key="c" class="py-0 my-1 mx-1 px-0">
                      <v-select  :items="maxChildrenAge" v-model="form[r-1].ages[c]" hide-details outlined  type="number" dense  >
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

          <v-col cols="12" sm="3" >
            <v-btn
            dark
            x-large
            block
            :loading="loading"
            :disabled="loading"
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
    <v-row justify="center" class="px-0 mx-0" v-if="bookings.rooms.length > 0" >
      <v-breadcrumbs  :items="items">
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-row class="mx-0 px-0">
      <v-container fluid style="max-width: 1366px; max-height: 200px">
        <v-alert
        v-if="$route.name === 'PersonalData'"
        dense
        text
        class="text-center"
        color="success"
      >
        Estás a un paso de completar tu reserva.
      </v-alert>
      </v-container>
    </v-row>
    <v-row  class="mx-0 px-0">
      <v-container fluid style="max-width: 1366px">
        <v-row >
         
        <v-col  cols="12" md="3" sm="12" order-sm="2"  order-md="1">
        <v-card flat style="position: sticky; top:0; z-index: 7; padding-top: 15px" >
          <v-img class="ma-3" :src="`/img/${hotel.image}`">

          </v-img>
          <v-card-title>{{hotel.title}}</v-card-title>
          <v-card-text>
             <v-icon>mdi-map-marker</v-icon>
             {{contact.display_name}}
          </v-card-text>
          <v-divider></v-divider>
          
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>Estancia</v-list-item-icon>
                <v-list-item-subtitle class="text-right"> {{ bookings.rooms.length }} Habitación(es) para {{ bookings.nights }} noche(s)</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>Entrada</v-list-item-icon>
                <v-list-item-subtitle class="text-right"> {{ $moment(bookings.from).format("Do dddd MMM gggg") }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>Salida</v-list-item-icon>
                <v-list-item-subtitle class="text-right">{{ $moment(bookings.to).format("Do dddd MMM gggg")}}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item  v-for="(room, index) in bookings.rooms" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{room.name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text >
                    {{configuration.currency_symbol + room.rack_rate +' '+ configuration.currency_code}}
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
            <v-list dense>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-title>Total Reserva</v-list-item-title>
                 
                </v-list-item-content>
                <v-list-item-action>
                   {{configuration.currency_symbol + $store.getters.totalPrice+' '+ configuration.currency_code}}
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" depressed :to="{name:'PersonalData'}" >Reservar</v-btn>
            </v-card-actions>
            
         
        </v-card>
      </v-col>
       <v-col   cols="12" md="9" sm="12" order-sm="1" order-md="2" >
        <router-view :key="$route.path"></router-view>
      </v-col>
        </v-row>
        <v-row>
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
  </v-app>
</template>


<script >
import {mapGetters, mapState } from 'vuex';
// import Moment from "moment"; //Importamos moment.js
// import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
// const moment = extendMoment(Moment);
export default {
  data () {
    return {
      items: [
        {
          text: 'Selecciona habitación',

          to: {name: 'selectRoom'}
        },
        {
          text: 'Datos personales',

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
      showRooms : false,
      maxRooms: [
        '1 Habitación',
        '2 Habitaciones',
        '3 Habitaciones',
        '4 Habitaciones',
        '5 Habitaciones',
      ]
    }
  },

  methods:{
   

    changeCoutRooms(){
      this.form = []
       for (let index = 0; index < parseInt(this.selectedRooms); index++) {
        this.form.push({adults: 0, children:0, ages:[]}) 
      }
    },

    search(){
      if(this.$refs.form.validate()){
        this.showRooms = false
        // this.loading = true;
        this.$store.dispatch('resetRooms').then(()=>{
           this.errors = null;
        let terms = {id: 0, from: null, to: null, rooms: []}
        terms.id = this.id
        terms.from = this.date
        terms.to = this.date2
        terms.rooms = this.form
        this.$store.dispatch('getAvailabilityRooms',terms).then(()=>{
          this.showRooms = true;
          terms.nights = this.$moment(this.date2).diff(this.$moment(this.date),'days')
          this.$store.dispatch('addGeneralInformation',terms)
          if(this.$route.name !== 'selectRoom'){
            this.$router.push({name: 'selectRoom'})
          }
        })
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

  computed:{
     ...mapState({
        hotel: (state) => state.HotelModule.hotel,
        availablerooms: (state) => state.RoomModule.availableRooms,
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
        for (let index = 0; index < this.hotel.max_children + 1; index++) {
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


  mounted(){

    this.$store.dispatch('getHotel', this.id).then(() => {
        this.$store.dispatch('getCountries')
        this.$store.dispatch('getContacts', this.hotel.idContact)
        this.$store.dispatch('getConfiguration', this.hotel.idConfiguration)
        this.$store.dispatch('getConditions', this.hotel.idCondition)
    })
  
    
  },

  props:['id'],

}
</script>

<style scoped>

</style>