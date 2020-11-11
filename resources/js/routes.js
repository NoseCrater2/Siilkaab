import Hotels from "./views/Hotels/Hotels";
import Hotel from "./views/Hotel/Hotel";
import RoomsHome from "./views/Rooms/RoomsHome"
import RoomDetails from './views/Rooms/RoomDetails';
import Users from "./users/Users";
import Binnacles from "./binnacle/Binnacles";
import Binnacle from "./binnacle/Binnacle";
import Dashboard from "./views/Panel/Dashboard";


import VueRouter from "vue-router";

const routes = [
    {
        path: "/",
        component: Dashboard,
        name: "home"
    },
    {
        path: "/hotels",
        component: Hotels,
        name: "Hotels"
    },
    {
        path: "/hotel/:id",
        component: Hotel,
        name: "Hotel"
    },
    {
        path: "/rooms-home",
        component: RoomsHome,
        name: "RoomsHome"
    },
    {
        path: "/roomDetails/:id",
        component: RoomDetails,
        name: "RoomDetails"
    },
    {
        path: "/users/",
        component: Users,
        name: "users"
    },
    {
        path: "/binnacles/",
        component: Binnacles,
        name: "binnacles"
    },
    {
        path: "/binnacle/:id",
        component: Binnacle,
        name: "binnacle"
    },
    {
        path: "/panel/",
        component: Dashboard,
        name: "panel"
    },
    {
        path: "/payments",
        component: require("./views/Reservations/Payments").default,
        name: "payments"
    },
    {
        path: "/payment-options",
        component: require("./views/payments/Payments").default,
        name: "payment-options"
    },

    {
        path: "/disponibility",
        component: require("./views/Disponibility/Disponibility").default,
        name: "disponibility"
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
