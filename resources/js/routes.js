import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./views/Index/Index"),
        children: [
            {
                path: "",
                component: () => import("./views/Panel/Dashboard"),
                name: "Home",
            },
            {
                path: "/hotels",
                component: () => import("./views/Hotels/Hotels"),
                name: "Hotels",
            },
            {
                path: "/hotel/:id?",
                props: true,
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
            },{
                path: "/images",
                component: () => import("./views/Images/ImagesRooms"),
                name: "Images"
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
                path: "/disponibility",
                component: ()=> import("./views/Disponibility/Disponibility"),
                name: "disponibility"
            },
            {
                path: "/calendar",
                component: ()=> import("./components/HorizontalCalendar/Calendar"),
                name: "calendar"
            },
            {
                path: "/payment-options",
                component: () => import("./views/payments/Payments"),
                name: "payment-options"
            },
        ],
    },
    {
        path: "/bookings/:id",
        name: "Bookings",
        props: true,
        component: () => import("./views/Reservations/Reservations"),
        children: [
            {
                path: 'select-room',
                name: 'selectRoom',
                props: true,
                component:  () => import("./views/Reservations/AvailabilityRooms"),
            },
            {
                path: 'personal-data',
                name: 'PersonalData',
                props: true,
                component:  () => import("./views/Reservations/FormPersonalData"),
            },
            {
                path: 'confirmation',
                name: 'Confirmation',
                props: true,
                component:  () => import("./views/Reservations/DetailsConfirmed"),
            }
        ],
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
    

   
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
