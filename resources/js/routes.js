import store from './store/store';
import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./views/Index/Index"),
        meta:{
            requiresAuth: true,
        },
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
                path: "/roomDetails/:idHotel?/:idRoom?",
                props: true,
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
            {
                path: "/panel",
                component: () => import("./views/Panel/Dashboard"),
                name: "Panel"
            },
            {
                path: "/reservations",
                component: () => import("./views/Reservations/AdminSide/Reservations"),
                name: "Reservations"
            },
            {
                path: "reservation-details/:id",
                component: () => import("./views/Reservations/AdminSide/Reservation"),
                props: true,
                children:[
                    {
                        path: "voucher",
                        component: () => import("./views/Reservations/AdminSide/Voucher"),
                        name: "Reservation",
                        props: true,

                    },
                    {
                        path: "details",
                        component: () => import("./views/Reservations/AdminSide/Details"),
                        name: "Details",
                        props: true,

                    },
                    {
                        path: "notes",
                        component: () => import("./views/Reservations/AdminSide/Notes"),
                        name: "Notes",
                        props: true,

                    },
                    {
                        path: "history",
                        component: () => import("./views/Reservations/AdminSide/History"),
                        name: "History",
                        props: true,

                    },
                ],
              
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
    
    // {
    //     path: "/payments",
    //     component: () => import("./views/Reservations/Payments"),
    //     name: "payments"
    // },
    {
        path: "/auth/login",
        component: () => import("./views/Login"),
        name: "Login"
    },
    

   
];

const router = new VueRouter({
    routes,
    mode: "history"
});


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(store.state.isLoggedIn == 'false' || store.state.isLoggedIn == false){
            next({
                name: 'Login',
                query: {redirect: to.fullPath
                }
            })
        }else{
            next()
        }
    }else{
        next();
    }
})

export default router;
