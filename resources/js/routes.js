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
        path: "/paypal",
        component: require("./views/Reservations/Paypal").default,
        name: "paypal"
    },
    {
        path: "/payments",
        component: require("./views/Reservations/Payments").default,
        name: "payments"
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
