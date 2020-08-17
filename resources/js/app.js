require("./bootstrap");

import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify/lib";
import router from "./routes";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Index from "./views/Index/Index";
import Payments from "./views/Reservations/Payments";
import Reservations from "./views/Reservations/Reservations";
import storeDefinition from "./store/store";
import LoadScript from 'vue-plugin-load-script';




window.Vue = require("vue");

Vue.use(VueRouter);
Vue.use(Vuetify, {
    iconfont: "mdi"
});
Vue.use(LoadScript);


// Translation provided by Vuetify (typescript)
import es from "../../node_modules/vuetify/src/locale/es.ts";

Vue.use(Vuex);


import "vuetify/dist/vuetify.css";

import Vue from "vue";

const store = new Vuex.Store(storeDefinition);



const app = new Vue({
    el: "#app",
   
    vuetify: new Vuetify({
        lang: {
            locales: { es },
            current: "es"
        }
    }),
   
    props: {
        source: String
    },
    router,
    store,
    components: {
        index: Index,
        payments: Payments,
        reservations: Reservations
    },
    data: () => ({
        drawer: null
    })
});
