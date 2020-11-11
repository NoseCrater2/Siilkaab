import Hotels from "./views/Hotels/Hotels";
import Hotel from "./views/Hotel/Hotel";
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
    {
        path: "/calendar",
        component: require("./components/HorizontalCalendar/Calendar").default,
        name: "calendar"
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
