require('./bootstrap');
import Vue from 'vue';
import store from "./store/store";
import router from "./routes";
import vuetify from './plugins/vuetify'
import moment from 'moment';
import VueMoment from 'vue-moment'

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// import { extendMoment } from "moment-range"; //Importamos el plugin de rangos

//Estas importaciones son de TipTap para usar componente MarkdwonCompo
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

import Vuex from "vuex";
import App from "./views/App";

require('moment/locale/es-mx')
moment.locale('es-mx')

window.Vue = require("vue");

Vue.use(VueMoment, {moment})
Vue.use(Vuex)
Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify, // same as "vuetify: vuetify"
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: 'mdi'
  });

moment.locale('es');


Vue.prototype.moment = moment


// window.axios.interceptors.response.use(
//     response => {
//       return response
//     }, 
//     error => {
//       if(401 === error.response.status){
//         store.dispatch("logout")
//       }
//       return Promise.reject(error)
//     }
// )

const app = new Vue({
    el: "#app",
    router,
    store,
    vuetify,
    components: {
        App,
    },

    async beforeCreate(){
        this.$store.dispatch("loadStoredState");
        this.$store.dispatch("loadUser");
    },
    
});
