import Vue from 'vue';
import store from "./store/store";
import router from "./routes";
import vuetify from './plugins/vuetify'

//Estas importaciones son de TipTap para usar componente MarkdwonCompo
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

import Vuex from "vuex";
import App from "./views/App";
// import Payments from "./views/Reservations/Payments";
// import Calendar from "./components/HorizontalCalendar/Calendar";


window.Vue = require("vue");

Vue.use(Vuex)
Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify, // same as "vuetify: vuetify"
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: 'mdi'
  });


const app = new Vue({
    el: "#app",
    router,
    store,
    vuetify,
    components: {
        App,
        // payments: Payments,
        // calendar: Calendar,
    },
    
});
