import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./views/Panel/Dashboard"),
        name: "home"
    },
    {
        path: "/hotels",
        component: () => import("./views/Hotels/Hotels"),
        name: "Hotels",
    },
    {
        path: "/hotel/:id",
        component: () => import("./views/Hotel/Hotel"),
        name: "Hotel"
    },
    {
        path: "/rooms-home",
        component: () => import("./views/Rooms/RoomsHome"),
        name: "RoomsHome"
    },
    {
        path: "/roomDetails/:id",
        component: () => import("./views/Rooms/RoomDetails"),
        name: "RoomDetails"
    },
    {
        path: "/users/",
        component: () => import("./users/Users"),
        name: "users"
    },
    {
        path: "/binnacles/",
        component: () => import("./binnacle/Binnacles"),
        name: "binnacles"
    },
    {
        path: "/binnacle/:id",
        component: () => import("./binnacle/Binnacle"),
        name: "binnacle"
    },
    {
        path: "/panel/",
        component: () => import("./views/Panel/Dashboard"),
        name: "panel"
    },
    {
        path: "/payments",
        component: () => import("./views/Reservations/Payments"),
        name: "payments"
    },
    {
        path: "/payment-options",
        component: () => import("./views/payments/Payments"),
        name: "payment-options"
    },

    {
        path: "/disponibility",
        component: ()=> import("./views/Disponibility/Disponibility"),
        name: "disponibility"
    },
    {
        path: "/calendar",
        component: ()=> import("./components/HorizontalCalendar/Calendar"),
        name: "calendar"
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
