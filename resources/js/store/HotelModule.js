import axios from "axios";
import router from '../routes';
const HotelModule = {
    state: {
        snackbar: {
            stateSnackbar: false,
            messaggeSnackbar: "",
            colorSnackbar: ""
        },
        timeoutSnackbar: 3500,
        allhotels: [],
        hotels: [],
        setReinicializedVar: null,
        chargeView: false, //Variable que carga las vistas de componentes de submenus de hotel
        assignHotels: null,
        iditemsListOptions: parseInt(router.currentRoute.query.option) || 0 ,
        hotel: {
            id: null,
            title: null,
            url: null,
            reference_code: null,
            num_rooms: null,
            num_floors: null,
            type: null,
            short_text: null,
            large_text: null
        },
        currencies: null,
        timezones: null,
        countries: null,
        configuration: {
            notification_details: null,
            notification_voucher: null,
            notification_card: null,
            timezone: null,
            color: 'blue',
            payment_place: null,
            payment_type: null,
            currency_id: null,
            hotel_id: null,
        },
        contacts: {
            url: null,
            email: null,
            phone: null,
            longitude: 0,
            latitude: 0,
            display_name: null,
            // address: null,
            // zipcode: null,
            // city: null,
            // state: null,
            manager_name: null,
            legal_rep: null,
            // country_id: null,
            hotel_id: null,
        },
        conditions: {
            adults: null,
            children_age: null,
            adults_age: null,
            adults_regimen: null,
            checkin_time: null,
            checkout_time: null,
            cancelation_text: null,
            hotel_id: null
        },
        regimes: [
            {
                id: "firstRegister",
                priority: "normal",
                only_room: 0,
                lodging_breakfast_children: 0,
                lodging_breakfast_adult: 0,
                half_pension_children: 0,
                half_pension_adult: 0,
                full_pension_children: 0,
                full_pension_adult: 0,
                all_included_children: 0,
                all_included_adult: 0,
                hotel_id: null
            }
        ],
        restaurants: [],
        schedules: [],
        pools: null,
        aditionalInfo: {
            spa: null,
            air_conditioned: null,
            no_smoke_rooms: null,
            air_transfer_service: null,
            air_collect_service: null,
            recection_24h: null,
            gym: null,
            room_service: null,
            terrace: null,
            bar: null,
            garden: null,
            water_park: null,
            beach: null,
            recreational_activities: null,
            romantic_dinners: null,
            touristic_tour: null,
            guarded_parking: null,
            street_parking: null,
            garage_parking: null,
            special_parking: null,
            reg_inout_private: null,
            reg_inout_express: null,
            touristic_info: null,
            parking_service: null,
            currency_change: null,
            outdoor_furniture: null,
            terrace_solarium: null,
            shared_dinner: null,
            shared_salon: null,
            game_zone: null,
            library: null,
            daily_housekipping: null,
            laundry_service: null,
            iron_service: null,
            meeting_room: null,
            meeting_center: null,
            fax_photocopier: null,
            coffee_break: null,
            souvenirs_store: null,
            inclusive_service: null,
            elevator: null,
            smoking_zone: null,
            no_smoking: null,
            pet_friendly: null,
            pet_house: null,
            pet_basket: null,
            only_adults: null,
            sanitized_rooms: null,
            bridal_suite: null,
            vip_service: null,
            calefaction: null,
            keep_bags: null,
            security_24h: null,
            security_alarm: null,
            smoke_detectors: null,
            in_security_cams: null,
            out_security_cams: null,
            fire_extinguishers: null,
            safe_deposit_box: null,
            hotel_id: null,
        },

        errorsInformation: [],
        statusInformation: 0,
        errorsConfiguration: [],
        statusConfiguration: 0,
        errorsContacts: [],
        statusContacts: 0,
        errorsConditions: [],
        statusConditions: 0,
        errorsRegimes: [],
        statusRegimes: 0,
        errorsAditionalInfo: [],
        statusAditionalInfo: 0,
        errorsRestaurants: [],
        statusRestaurants: 0,
        errorsSchedules: [],
        statusSchedules: 0
    },
    getters: {
        getAssignHotels(state) {
            return state.assignHotels;
        },
        getArrayErrors(state){
            return [
                state.statusInformation,
                state.statusConfiguration,
                state.statusContacts,
                state.statusConditions,
                state.statusRegimes,
                0,
            ]
        },

    },
    mutations: {
        //Se reinician los estados (principalmente por el problema del router-link)
        setReinicialized(state) {
            (state.snackbar = {
                stateSnackbar: false,
                messaggeSnackbar: "",
                colorSnackbar: ""
            }),
            (state.timeoutSnackbar= 3500),
            (state.iditemsListOptions = parseInt(router.currentRoute.query.option)  || 0),
            (state.setReinicializedVar = null),
            (state.chargeView = false),
                (state.hotel = {
                    title: null,
                    url: null,
                    reference_code: null,
                    num_rooms: null,
                    num_floors: null,
                    type: null,
                    short_text: null,
                    large_text: null
                }),
                (state.currencies = null),
                (state.timezones = null),
                (state.countries = null),
                (state.configuration = {
                    notification_details: null,
                    notification_voucher: null,
                    notification_card: null,
                    timezone: null,
                    payment_place: null,
                    payment_type: null,
                    color: 'blue',
                    currency_id: null,
                    hotel_id: null,
                }),
                (state.contacts = {
                    url: null,
                    email: null,
                    phone: null,
                    // address: null,
                    // zipcode: null,
                    // city: null,
                    // state: null,
                    longitude: 0,
                    latitude: 0,
                    display_name: null,
                    manager_name: null,
                    legal_rep: null,
                    // country_id: null,
                    hotel_id: null,
                }),
                (state.conditions = {
                    adults: null,
                    children_age: null,
                    adults_age: null,
                    adults_regimen: null,
                    checkin_time: null,
                    checkout_time: null,
                    cancelation_text: null,
                    hotel_id: null
                }),
                (state.regimes = [
                    {
                        id: "firstRegister",
                        priority: "normal",
                        only_room: 0,
                        lodging_breakfast_children: 0,
                        lodging_breakfast_adult: 0,
                        half_pension_children: 0,
                        half_pension_adult: 0,
                        full_pension_children: 0,
                        full_pension_adult: 0,
                        all_included_children: 0,
                        all_included_adult: 0,
                        hotel_id: null
                    }
                ]),
                (state.restaurants = []),
                (state.schedules = []),
                (state.pools = null),
                (state.aditionalInfo = {
                    spa: null,
                    air_conditioned: null,
                    no_smoke_rooms: null,
                    air_transfer_service: null,
                    air_collect_service: null,
                    recection_24h: null,
                    gym: null,
                    room_service: null,
                    terrace: null,
                    bar: null,
                    garden: null,
                    water_park: null,
                    beach: null,
                    recreational_activities: null,
                    romantic_dinners: null,
                    touristic_tour: null,
                    guarded_parking: null,
                    street_parking: null,
                    garage_parking: null,
                    special_parking: null,
                    reg_inout_private: null,
                    reg_inout_express: null,
                    touristic_info: null,
                    parking_service: null,
                    currency_change: null,
                    outdoor_furniture: null,
                    terrace_solarium: null,
                    shared_dinner: null,
                    shared_salon: null,
                    game_zone: null,
                    library: null,
                    daily_housekipping: null,
                    laundry_service: null,
                    iron_service: null,
                    meeting_room: null,
                    meeting_center: null,
                    fax_photocopier: null,
                    coffee_break: null,
                    souvenirs_store: null,
                    inclusive_service: null,
                    elevator: null,
                    smoking_zone: null,
                    no_smoking: null,
                    pet_friendly: null,
                    pet_house: null,
                    pet_basket: null,
                    only_adults: null,
                    sanitized_rooms: null,
                    bridal_suite: null,
                    vip_service: null,
                    calefaction: null,
                    keep_bags: null,
                    security_24h: null,
                    security_alarm: null,
                    smoke_detectors: null,
                    in_security_cams: null,
                    out_security_cams: null,
                    fire_extinguishers: null,
                    safe_deposit_box: null,
                    hotel_id: null,
                });
        },
        setReinicializedErrorsStatus(state){
            (state.errorsInformation = []),
            (state.statusInformation = 0),
            (state.errorsConfiguration = []),
            (state.statusConfiguration = 0),
            (state.errorsContacts = []),
            (state.statusContacts = 0),
            (state.errorsConditions = []),
            (state.statusConditions = 0),
            (state.errorsRegimes = []),
            (state.statusRegimes = 0),
            (state.errorsAditionalInfo = []),
            (state.statusAditionalInfo = 0),
            (state.errorsRestaurants = []),
            (state.statusRestaurants = 0),
            (state.errorsSchedules = []),
            (state.statusSchedules = 0)
        },
        //Metodo que cambia de estado la variable que permite mostrar un snackbar (mensaje)
        setSnackbar(state, flag){
            state.snackbar = flag;
        },
        //Metodo que cambia de estado la variable que controla el tiempo de un snackbar (mensaje)
        setTimeoutSnackbar(state, time){
            state.timeoutSnackbar = time;
        },
        //Este metodo se llama para cambiar el estado de la variable 'chargeView' en caso de que
        //sea un nuevo registro de hotel
        setChargeView(state, flag){
            state.chargeView = flag;
        },
        //Metodo para mover el contador de items del MenuLateral.vue y ser usado en Hotel.vue
        countIditemsListOptions(state, index) {
            router.app.$router.push({query: {...router.app.$route.query, option: index}})
            state.iditemsListOptions = index;
        
        },
        //Mutacion para los errores
        setErrorsInformation(state,errors){
            state.errorsInformation = errors
          },
        setErrorsConfiguration(state,errors){
            state.errorsConfiguration = errors
        },
        setErrorsContacts(state,errors){
            state.errorsContacts = errors
        },
        setErrorsConditions(state,errors){
            state.errorsConditions = errors
        },
        setErrorsRegimes(state,errors){
            state.errorsRegimes = errors
        },
        setErrorsAditionalInfo(state,errors){
            state.errorsAditionalInfo = errors
        },
        setErrorsRestaurants(state,errors){
            state.errorsRestaurants = errors
        },
        setErrorsSchedules(state,errors){
            state.errorsSchedules = errors
        },
        //Mutacion para el estatus
        setStatusInformation(state, status){
            state.statusInformation = status
        },
        setStatusConfiguration(state, status){
            state.statusConfiguration = status
        },
        setStatusContacts(state, status){
            state.statusContacts = status
        },
        setStatusConditions(state, status){
            state.statusConditions = status
        },
        setStatusRegimes(state, status){
            state.statusRegimes = status
        },
        setStatusAditionalInfo(state, status){
            state.statusAditionalInfo = status
        },
        setStatusRestaurants(state, status){
            state.statusRestaurants = status
        },
        setStatusRestaurants(state, status){
            state.statusSchedules = status
        },
        //Mutacion que setea el state.regimes para asignar nuevo arreglo
        setArrayRegimes(state, payload) {
            state.regimes = payload;
        },
        //Mutacion que setea el state.restaurants para asignar nuevo arreglo
        setArrayRestaurants(state, payload) {
            state.restaurants = payload;
        },
        //Mutacion que setea el state.schedules para asignar nuevo arreglo
        setArraySchedules(state, payload) {
            state.schedules = payload;
        },
        setHotel(state, payload) {
            //Inicializa la variable "setReinicializedVar" que indica que ya hay datos de hotel
            state.setReinicializedVar = 1;
            //Inicializa la variable "chargeView" que indica que ya se puede cargar las vistas
            state.chargeView = true;
            state.hotel = payload;
        },
        setHotels(state, payload) {
            state.hotels = payload;
        },

        setAllHotels(state, payload) {
            state.allhotels = payload;
        },
        setAssignHotels(state, payload) {
            state.assignHotels = payload;
        },

        setCurrencies(state, payload) {
            state.currencies = payload;
        },
        setTimezones(state, payload) {
            state.timezones = payload;
        },
        setCountries(state, payload) {
            state.countries = payload;
        },
        setConfiguration(state, payload) {
            state.configuration = payload;
        },
        setContacts(state, payload) {
            state.contacts = payload;
        },
        setConditions(state, payload) {
            state.conditions = payload;
        },
        setRegimes(state, payload) {
            state.regimes = payload;
        },

        setRestaurants(state, payload) {
            state.restaurants = payload;
        },

        setSchedules(state, payload) {
            state.schedules = payload;
        },

        setPools(state, payload) {
            state.pools = payload;
        },
        setAditionalInfo(state, payload) {
            state.aditionalInfo = payload;
        },

        postEditHotel(state, hotel) {
            //En caso de que se inserta un hotel nuevo, directamente se inserta el hotel en las variables
            if(typeof(hotel.new)!="undefined"){
                if(hotel.new == "NEW"){
                    delete hotel.new
                    state.hotels.push(hotel)
                    state.allhotels.push(hotel)
                }
            }
            state.hotel = hotel;
            state.hotels.map(function(currentHotel) {
                if (currentHotel.id === hotel.id) {
                    Object.assign(currentHotel, hotel);
                }
            });
            state.allhotels.map(function(currentHotel) {
                if (currentHotel.id === hotel.id) {
                    Object.assign(currentHotel, hotel);
                }
            });
        },

        postAddRegimes(state, regimes) {
            regimes.forEach(itemRegime => {
                for (const stateRegime of state.regimes) {
                    if(stateRegime.componentID === itemRegime.componentID){
                        Object.assign(stateRegime, itemRegime);
                    }
                }
            });
        },

        putUpdateRegimes(state, regimes) {
            regimes.forEach(itemRegime => {
                for (const stateRegime of state.regimes) {
                    if(stateRegime.id == itemRegime.id){
                        Object.assign(stateRegime, itemRegime);
                    }
                }
            });
        },

        putEditConfiguration(state, configuration) {
            state.configuration = configuration;
        },

        putEditContacts(state, contacts) {
            state.contacts = contacts;
        },

        putEditConditions(state, conditions) {
            state.conditions = conditions;
        },

        putEditAditionalInfo(state, aditionalInfo) {
            state.aditionalInfo = aditionalInfo;
        },

        postAddRestaurants(state, restaurants){
            restaurants.forEach(itemRestaurant => {
                for (let stateRestaurant of state.restaurants) {
                    if(stateRestaurant.componentID === itemRestaurant.componentID){
                        Object.assign(stateRestaurant, itemRestaurant);
                    }
                }
            });
            //AHORA AGREGAMOS EL ID DE LOS RESTAURANTES A LA VARABLE DE ESTADO DE SCHEDULES
            for (const itemSchedule of state.schedules) {
                if(itemSchedule.idRestaurant.toString().includes("NEW")){
                  let findedRestaurant = state.restaurants.find(itemRestaurant=> itemRestaurant.componentID == itemSchedule.idRestaurant)
                  if(typeof(findedRestaurant) != "undefined"){
                    itemSchedule.idRestaurant = findedRestaurant.id;
                    if(itemSchedule.restaurantSchedules.length > 0){
                      itemSchedule.restaurantSchedules.forEach(element => {
                        element.restaurant_id = findedRestaurant.id;
                      });
                    }
                  }
                }
            }
        },

        putUpdateRestaurants(state, restaurants) {
            restaurants.forEach(itemRestaurant => {
                for (let stateRestaurant of state.restaurants) {
                    if(stateRestaurant.id == itemRestaurant.id){
                        Object.assign(stateRestaurant, itemRestaurant);
                    }
                }
            });
        },

        deleteRestaurants(state, restaurants) {
            restaurants.forEach(itemRestaurant => {
                if(itemRestaurant.id != "NEW"){
                    let indexRestaurant = state.restaurants.findIndex(stateRestaurant => stateRestaurant.id == itemRestaurant.id);
                    if(indexRestaurant > -1){
                        state.restaurants.splice(indexRestaurant, 1);
                    }
                }
                else if(itemRestaurant.id == "NEW"){
                    let indexRestaurant = state.restaurants.findIndex(stateRestaurant => stateRestaurant.componentID == itemRestaurant.componentID);
                    if(indexRestaurant > -1){
                        state.restaurants.splice(indexRestaurant, 1);
                    }
                }
            });
        },

        postAddSchedules(state, schedules){
            //PRIMERO ASIGNAMOS LOS HORARIOS AL STATE DE HORARIOS
            schedules.forEach(itemSchedule => {
                for (let stateSchedule of state.schedules) {
                    if(stateSchedule.idRestaurant == itemSchedule.restaurant_id){
                        if(stateSchedule.restaurantSchedules.length > 0){
                            stateSchedule.restaurantSchedules.forEach(itemRestaurantSchedules=>{
                                if(itemRestaurantSchedules.componentID === itemSchedule.componentID){
                                    Object.assign(itemRestaurantSchedules, itemSchedule);
                                }
                            })
                        }
                    }
                }
            });
            //LUEGO ASIGNAMOS LOS HORARIOS A LOS HOTELES
            state.restaurants.forEach(itemRestaurant => {
                for (const itemSchedule of state.schedules) {
                    if(itemRestaurant.id == itemSchedule.idRestaurant){
                        itemRestaurant.schedules = []
                        itemRestaurant.schedules.push(...itemSchedule.restaurantSchedules)
                    }
                }
            });
        },

        putUpdateSchedules(state, schedules) {
            //PRIMERO ASIGNAMOS LOS HORARIOS AL STATE DE HORARIOS
            schedules.forEach(itemSchedule => {
                for (let stateSchedule of state.schedules) {
                    if(stateSchedule.idRestaurant == itemSchedule.restaurant_id){
                        if(stateSchedule.restaurantSchedules.length > 0){
                            stateSchedule.restaurantSchedules.forEach(itemRestaurantSchedules=>{
                                if(itemRestaurantSchedules.id === itemSchedule.id){
                                    Object.assign(itemRestaurantSchedules, itemSchedule);
                                }
                            })
                        }
                    }
                }
            });
            //LUEGO ASIGNAMOS LOS HORARIOS A LOS HOTELES
            state.restaurants.forEach(itemRestaurant => {
                for (const itemSchedule of state.schedules) {
                    if(itemRestaurant.id == itemSchedule.idRestaurant){
                        itemRestaurant.schedules = []
                        itemRestaurant.schedules.push(...itemSchedule.restaurantSchedules)
                    }
                }
            });
        },

        deleteSchedules(state, schedules) {
            //PRIMERO SE VERIFICA SI FUERON ELIMINADOS RESTAURANTES Y EN BASE A ELLO ELIMINAMOS TODOS SUS HORARIOS
            let localDeleteRestaurantIndex = [];
            state.schedules.forEach((stateItemSchedule, index)=>{
                if(typeof(stateItemSchedule.deletedRestaurant) != "undefined"){
                    if(stateItemSchedule.deletedRestaurant == "DELETED"){
                        localDeleteRestaurantIndex.push(index)
                    }
                }
            })
            //VERIFICAMOS Y SI localDeleteRestaurantIndex en sus elementos son diferentes a -1 se eliminan todos los horarios de dicho Restaurant
            localDeleteRestaurantIndex.forEach(elementIndex=>{
                if(elementIndex > -1){
                    state.schedules.splice(elementIndex, 1)
                }
            })
            //LUEGO, VERIFICAMOS HORARIOS ESPECIFICOS DE RESTAURANTES
            let deletedSpecificSchedulesIndex = []
            state.schedules.forEach((stateRestaurantSchedulesItem, indexStateRestaurantSchedules)=>{
                stateRestaurantSchedulesItem.restaurantSchedules.forEach(itemSchedule=>{
                    schedules.forEach(localSchedulesItem=>{
                        if(localSchedulesItem.restaurant_id == stateRestaurantSchedulesItem.idRestaurant){
                            if(localSchedulesItem.id != "NEW"){
                                if(localSchedulesItem.id == itemSchedule.id) {
                                    deletedSpecificSchedulesIndex.push({indexStateRestaurantSchedules: indexStateRestaurantSchedules, componentID: itemSchedule.componentID})
                                }
                            }
                            else if(localSchedulesItem.id == "NEW"){
                                if(localSchedulesItem.componentID == itemSchedule.componentID) {
                                    deletedSpecificSchedulesIndex.push({indexStateRestaurantSchedules: indexStateRestaurantSchedules, componentID: itemSchedule.componentID})
                                }
                            }
                        }
                    })
                })
            })
            //PROCEDEMOS A ELIMINAR LOS HORARIOS ESPECIFICOS
            deletedSpecificSchedulesIndex.forEach(elementIndex=>{
                let findedIndex = state.schedules[elementIndex.indexStateRestaurantSchedules].restaurantSchedules.findIndex(elementFinded=> elementFinded.componentID == elementIndex.componentID)
                if(findedIndex > -1){
                    state.schedules[elementIndex.indexStateRestaurantSchedules].restaurantSchedules.splice(findedIndex, 1);
                }
            })
        },

        editHotel(state, hotel) {
            state.hotel = hotel;
            state.hotels.map(function(currentHotel) {
                if (currentHotel.id === hotel.id) {
                    Object.assign(currentHotel, hotel);
                }
            });
            state.allhotels.map(function(currentHotel) {
                if (currentHotel.id === hotel.id) {
                    Object.assign(currentHotel, hotel);
                }
            });
        },

        deleteHotel(state, deletedHotel) {
            deletedHotel.forEach(currentHotel => {
                let h = state.allhotels.find(
                    allhotel => allhotel.id === currentHotel
                );
                state.allhotels.splice(state.allhotels.indexOf(h), 1);
            });
        }
    },
    actions: {
        getHotels: async function({ commit, state }) {
            if (state.allhotels.length === 0) {
                const request = await axios.get("/api/hotels");
                const allhotels = request.data.data;
                commit("setAllHotels", allhotels);
            } else {
                return state.allhotels;
            }
        },

        getHotel: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/hotels/${id}`);
                let hotel = request.data.data;
                commit("setHotel", hotel);
            } catch (error) {
                
            }
        },

        getCurrencies: async function({ commit }) {
            try {
                const request = await axios.get("/api/currencies");
                let currencies = request.data.data;
                commit("setCurrencies", currencies);
            } catch (error) {
                
            }
        },
        getTimezones: async function({ commit }) {
            try {
                const request = await axios.get("/api/timezones");
                let timezones = request.data;
                commit("setTimezones", timezones);
            } catch (error) {

            }
        },
        getCountries: async function({ commit }) {
            try {
                const request = await axios.get("/api/countries");
                let countries = request.data.data;
                commit("setCountries", countries);
            } catch (error) {

            }
        },
        getConfiguration: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/configurations/${id}`);
                let configuration = request.data.data;
                commit("setConfiguration", configuration);
            } catch (error) {}
        },
        getContacts: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/contacts/${id}`);
                let contacts = request.data.data;
                commit("setContacts", contacts);
            } catch (error) {}
        },
        getConditions: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/conditions/${id}`);
                let conditions = request.data.data;
                conditions.checkin_time = conditions.checkin_time.slice(0, -3);
                conditions.checkout_time = conditions.checkout_time.slice(0, -3);
                commit("setConditions", conditions);
            } catch (error) {}
        },
        getRegimes: async function({ commit }, id) {
            try {
                
                const promiseRequest = await Promise.all(
                    id.map(elID => {
                        const requestRegime = axios.get(`/api/regimes/${elID}`);
                        return requestRegime;
                    })
                );
                
                //Guardamos en un arreglo el resultado de la promesa (que contiene los regimenes)
                let mapArray = promiseRequest.map((itemPromise, index)=>{
                    return itemPromise.data.data;
                })
                
                //Ordenamos el arreglo de regimenes de manera desc
                mapArray.sort(function(a,b) {return (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0);});
                
                //Creamos e inicializamos una variable donde se guardara el indice del arreglo
                //Y que servirá para cortar del arreglo el regimen que no tenga fecha
                let indexSplice = 0;

                //Seteamos en un nuevo array llamado "arrayRegimes" el contenido del array original
                //"mapArray" y en este ademas seteamos la variable "indexSplice" con el indice de la coincidencia
                //Del regime sin fecha
                let arrayRegimes = mapArray.map((itemArray, index)=>{
                    if(itemArray.start_period === null && itemArray.start_period === null){
                        indexSplice = index;
                    }
                    return itemArray;
                })
                //Creamos una variable llamada "tempRegimeCuted" que guardara el elemento cortado del array
                //Cabe señalar que el metodo Javascript "splice" tambien afecta directamente al array al que se
                //Le aplica y por lo tanto, si elimina tambien el elemento señalado. Es por eso que el elemento
                //Anterior se guardó en la variable temporal
                let tempRegimeCuted = arrayRegimes.splice(indexSplice, 1);
                //Agregamos a "arrayRegimes" el elemento cortado como primer elemento del array de la siguiente manera
                //Posicion donde se agrega, numero de elementos a eliminar en el proceso, elemento a insertar/eliminar
                arrayRegimes.splice(0, 0, tempRegimeCuted[0]);
                //Se eliminan del arreglo los objetos indefinidos
                let arrayRegimesFiltered = arrayRegimes.filter((el)=>typeof(el)!='undefined')
                commit("setRegimes", arrayRegimesFiltered);
            } catch (error) {}
        },
        getRestaurants: async function({ commit }, idHotel) {
            try {
                const request = await axios.get("/api/restaurants");
                let restaurants = request.data.data.filter(element => element.hotel_id === idHotel);
                commit("setRestaurants", restaurants);
            } catch (error) {}
        },

        getSchedules: async function({ commit }, idHotel) {
            try {
                const request = await axios.get("/api/restaurants");
                //Primero filtramos los restaurantes que coincidan con el id del hotel
                let schedules = request.data.data.filter(restaurantItem => {
                    return idHotel === restaurantItem.hotel_id;
                }
                //Despues mapeamos para dejar unicamente los horarios a ocupar
                ).map(scheduleItem=>{
                    return {idRestaurant: scheduleItem.id, restaurantSchedules: scheduleItem.schedules}
                });
                commit("setSchedules", schedules);
            } catch (error) {
                
            }
        },

        getPools: async function({ commit }, idHotel) {
            try {
                const request = await axios.get("/api/pools");
                let pools = request.data.data.filter(
                    element => element.hotel_id === idHotel
                );
                commit("setPools", pools);
            } catch (error) {}
        },
        getAditionalInfo: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/amenities/${id}`);
                let aditionalInfo = request.data.data;
                commit("setAditionalInfo", aditionalInfo);
            } catch (error) {}
        },

        getHotelsForAdmin: async function({ commit }) {
            try {
                const request = await axios.get(`/api/hotels`);
                let hotels = request.data.data;
                commit("setHotels", hotels);
            } catch (error) {}
        },

        getAssignHotels: async function({ commit }, id) {
            try {
                const request = await axios.get(`/api/hotels_users/${id}`);

                let assignHotels = request.data.data;


                commit("setAssignHotels", assignHotels);
            } catch (error) {}
        },

        setHotelsToUsers: async function({ commit }, hotels) {
            try {
                if (hotels[1].hotels !== null) {
                    const request = await axios.post(
                        "/api/hotels_users/" + hotels[0].id,
                        hotels[1]
                    );
                }
                //let assignHotels= request.data.data;

                // commit("setAssignHotels", assignHotels);
            } catch (error) {
                console.log("An error has ocurred");
            }
        },

        postEditHotel: async function({ commit }, newHotel) {
            for (const propertyHotel in newHotel) {
                if(propertyHotel == 'type'){
                    if(newHotel[propertyHotel] == 'bungalow' || newHotel[propertyHotel] == 'cabana'){
                        newHotel['num_rooms'] = 0;
                        newHotel['num_floors'] = 0;
                    }
                }
            }
            let formDataHotel = new FormData();
            for (let attrib in newHotel) {
                //Si la propiedad a agregar al FormData es la imagen
                if(attrib === "image"){
                    if(newHotel[attrib] != null){
                        //Si la imagen.result es diferente de "undefined" es por que se editó la imagen
                        //Y se modificó la propiedad donde se guardaria temporalmente el "comprimido"
                        if(typeof(newHotel[attrib].compressImage) !== 'undefined'){
                            if(typeof(newHotel[attrib]["compressImage"].result) !== 'undefined'){
                                formDataHotel.append(attrib, newHotel[attrib]["compressImage"].result);
                            }
                        }
                    }
                }
                //Sino, se sigue agregando como normalmente se agrega
                else{
                    formDataHotel.append(attrib, newHotel[attrib]);
                }
            }

            //Debido a que aqui se modifica el tipo de metodo
            //Se tiene que checar si el hotel que se guarda ya existe
            //O es uno nuevo
            if(newHotel.id == null){
                formDataHotel.append("_method", "post");
            }
            else if(newHotel.id != null){
                formDataHotel.append("_method", "put");
            }
            
            try {
                //Verifica si se esta insertando o modificando un hotel
                if(newHotel.id != null){
                    const request = await axios.post(
                        `/api/hotels/${newHotel.id}`,
                        formDataHotel
                    );
                    commit("postEditHotel", request.data.data);
                }
                else if(newHotel.id == null){
                    const request = await axios.post(
                        `/api/hotels`,
                        formDataHotel
                    );
                    let newHotel = request.data.data;
                    newHotel.new ="NEW";
                    commit("postEditHotel", newHotel);
                }
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsInformation", error.response.data);
                commit("setStatusInformation", error.response.status);
            }
        },

        postAddRegimesAXIOS: async function({ commit }, newArrayPostRegimes) {
            let arrayRequestAddItemRegime = [];
            let arrayErrors = []
            let status;
            for (const itemRegime of newArrayPostRegimes) {
                try {
                    const requestAddItemRegime = await axios.post(`/api/regimes`, itemRegime);
                    let trasformedRequest = requestAddItemRegime.data.data;
                    trasformedRequest.componentID = itemRegime.componentID;
                    arrayRequestAddItemRegime.push(trasformedRequest);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemRegime.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("postAddRegimes", arrayRequestAddItemRegime);
            }
            else{
                commit("setErrorsRegimes", arrayErrors);
                commit("setStatusRegimes", status);
            }
        },

        putUpdateRegimesAXIOS: async function({ commit }, newArrayPutRegimes) {
            let arrayRequestUpdateItemRegime = [];
            let arrayErrors = []
            let status;
            for (const itemRegime of newArrayPutRegimes) {
                try {
                    const requestUpdateItemRegime = await axios.put(
                        `/api/regimes/${itemRegime.id}`,
                        itemRegime
                    );
                    let trasformedRequest = requestUpdateItemRegime.data.data;
                    trasformedRequest.componentID = itemRegime.componentID;
                    arrayRequestUpdateItemRegime.push(trasformedRequest)
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemRegime.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("putUpdateRegimes", arrayRequestUpdateItemRegime);
            }
            else{
                commit("setErrorsRegimes", arrayErrors);
                commit("setStatusRegimes", status);
            }
        },

        deleteRegimesAXIOS: async function({ commit }, arrayIDsItemsDel) {
            arrayIDsItemsDel.forEach(async idItemRegime => {
                try {
                    const requestDeleteItemRegime = await axios.delete(`/api/regimes/${idItemRegime}`);
                } catch (error) {
                    commit("setErrorsRegimes", error.response.data);
                    commit("setStatusRegimes", error.response.status);
                }
            });
        },

        postEditConfiguration: async function({ commit }, newConfiguration) {
            try {
                const request = await axios.post(
                    `/api/configurations`,
                    newConfiguration
                );
                commit("putEditConfiguration", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsConfiguration", error.response.data);
                commit("setStatusConfiguration", error.response.status);
            }
        },


        putEditConfiguration: async function({ commit }, newConfiguration) {
            try {
                const request = await axios.put(
                    `/api/configurations/${newConfiguration.id}`,
                    newConfiguration
                );
                commit("putEditConfiguration", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsConfiguration", error.response.data);
                commit("setStatusConfiguration", error.response.status);
            }
        },

        postEditContacts: async function({ commit }, newContacts) {
            try {
                const request = await axios.post(
                    `/api/contacts`,
                    newContacts
                );
                commit("putEditContacts", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsContacts", error.response.data);
                commit("setStatusContacts", error.response.status);
            }
        },

        putEditContacts: async function({ commit }, newContacts) {
            try {
                const request = await axios.put(
                    `/api/contacts/${newContacts.id}`,
                    newContacts
                );
                commit("putEditContacts", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsContacts", error.response.data);
                commit("setStatusContacts", error.response.status);
            }
        },

        postEditConditions: async function({ commit }, newConditions) {
            try {
                const request = await axios.post(
                    `/api/conditions`,
                    newConditions
                );
                let conditions = request.data.data;
                conditions.checkin_time = conditions.checkin_time.slice(0, -3);
                conditions.checkout_time = conditions.checkout_time.slice(0, -3);
                commit("putEditConditions", conditions);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsConditions", error.response.data);
                commit("setStatusConditions", error.response.status);
            }
        },

        putEditConditions: async function({ commit }, newConditions) {
            try {
                const request = await axios.put(
                    `/api/conditions/${newConditions.id}`,
                    newConditions
                );
                let conditions = request.data.data;
                conditions.checkin_time = conditions.checkin_time.slice(0, -3);
                conditions.checkout_time = conditions.checkout_time.slice(0, -3);
                commit("putEditConditions", conditions);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsConditions", error.response.data);
                commit("setStatusConditions", error.response.status);
            }
        },

        //Metodo que llama a diferentes acciones de Regimes dependiendo
        //De lo que requiera hacer 
        putEditRegimes: async function({ commit, dispatch }, objRegimes) {
            let methodsRegime = "";
            objRegimes.newRegimes = objRegimes.newRegimes.filter((itemRegime)=>{
                if(itemRegime.id === "firstRegister" || itemRegime.id === "NEW"){
                    methodsRegime = "POST"
                }
                for (const property in itemRegime) {
                    if(itemRegime[property] == null){
                        delete itemRegime[property];
                    }
                    // if(itemRegime[property] === ""){
                    //     itemRegime[property] = 0;
                    // }
                }
                return itemRegime;
            })
            try {
                //Si "objRegimes.newRegimes" es mayor se agregaron nuevos regimenes
                if (objRegimes.newRegimes.length > objRegimes.currentRegimes.length) {
                    let flagDeleteRegimes = false;
                    let idsNewRegimes = objRegimes.newRegimes.map((itemNewRegime)=>{
                        if(itemNewRegime.id != 'NEW' && itemNewRegime.id != 'firstRegister'){
                            return itemNewRegime.id
                        }
                    });
                    idsNewRegimes = idsNewRegimes.filter((items)=> typeof(items) != 'undefined')
                    let deletedItems = [];
                    for (const itemIDRegime of objRegimes.currentRegimes) {
                        if(!idsNewRegimes.includes(itemIDRegime)){
                            deletedItems.push(itemIDRegime)
                        }
                    }
                    if(deletedItems.length > 0){
                        flagDeleteRegimes = true;
                    }
                    if(flagDeleteRegimes == true){
                        //Se llama a la accion "deleteRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("deleteRegimesAXIOS", deletedItems);
                    }
                    let newArrayPutRegimes = [];
                    let newArrayPostRegimes = objRegimes.newRegimes.filter(itemRegime=>{
                        if(itemRegime.id === "firstRegister"){
                            //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                            // delete itemRegime.id;
                            //Se agrega el id del hotel actual al que hara referencia para agregarse
                            itemRegime.hotel_id = objRegimes.currentHotelId;
                            return itemRegime;
                        }
                        else if(itemRegime.id === "NEW"){
                            //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                            // delete itemRegime.id;
                            //Se agrega el id del hotel actual al que hara referencia para agregarse
                            itemRegime.hotel_id = objRegimes.currentHotelId;
                            //El endopoint solo acepta HH:MM, por lo tanto se cambia
                            //de HH:MM:SS a HH:MM
                            if(itemRegime.start_period.length > 16){
                                itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                            }
                            if(itemRegime.final_period.length > 16){
                                itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                            }
                            return itemRegime;
                        }
                        else{
                            newArrayPutRegimes.push(itemRegime);
                        }
                    });
                    //Se llama a la accion "postAddRegimes" que se encargara
                    //De hacer la peticion AXIOS
                    await dispatch("postAddRegimesAXIOS", newArrayPostRegimes);
                    //Se formatean los regimenes con las siguientes caracteristicas...
                    newArrayPutRegimes = newArrayPutRegimes.map(itemRegime=>{
                        //Se elimina el id del hotel por que en este caso no se ocupa insertar
                        delete itemRegime.hotel_id;
                        //Si los periodos start y final no son null, se da formato a la fecha
                        //Para que sea aceptada por el endpoint (HH:MM)
                        if(typeof(itemRegime.start_period) != 'undefined' && typeof(itemRegime.final_period) != 'undefined'){
                            if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                                if(itemRegime.start_period.length > 16){
                                    itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                }
                                if(itemRegime.final_period.length > 16){
                                    itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                }
                            }
                        }
                        return itemRegime;
                    });
                    //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                    //De hacer la peticion AXIOS
                    await dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
                }
                //Si "objRegimes.newRegimes" es igual a los elementos existentes, solamente se da formato a los datos
                else if (objRegimes.newRegimes.length == objRegimes.currentRegimes.length) {
                    let flagDeleteRegimes = false;
                    let idsNewRegimes = objRegimes.newRegimes.map((itemNewRegime)=>{
                        if(itemNewRegime.id != 'NEW' && itemNewRegime.id != 'firstRegister'){
                            return itemNewRegime.id
                        }
                    });
                    idsNewRegimes = idsNewRegimes.filter((items)=> typeof(items) != 'undefined')
                    let deletedItems = [];
                    for (const itemIDRegime of objRegimes.currentRegimes) {
                        if(!idsNewRegimes.includes(itemIDRegime)){
                            deletedItems.push(itemIDRegime)
                        }
                    }
                    if(deletedItems.length > 0){
                        flagDeleteRegimes = true;
                    }
                    if(flagDeleteRegimes == true){
                        //Se llama a la accion "deleteRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("deleteRegimesAXIOS", deletedItems);
                    }
                    let newArrayPutRegimes = [];
                    if(methodsRegime == "POST"){
                        let newArrayPostRegimes = objRegimes.newRegimes.filter(itemRegime=>{
                            if(itemRegime.id === "firstRegister"){
                                //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                                // delete itemRegime.id;
                                //Se agrega el id del hotel actual al que hara referencia para agregarse
                                itemRegime.hotel_id = objRegimes.currentHotelId;
                                return itemRegime;
                            }
                            else if(itemRegime.id === "NEW"){
                                //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                                // delete itemRegime.id;
                                //Se agrega el id del hotel actual al que hara referencia para agregarse
                                itemRegime.hotel_id = objRegimes.currentHotelId;
                                //El endopoint solo acepta HH:MM, por lo tanto se cambia
                                //de HH:MM:SS a HH:MM
                                if(itemRegime.start_period.length > 16){
                                    itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                }
                                if(itemRegime.final_period.length > 16){
                                    itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                }
                                return itemRegime;
                            }
                            else{
                                newArrayPutRegimes.push(itemRegime)
                            }
                        });
                        //Se llama a la accion "postAddRegimes" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("postAddRegimesAXIOS", newArrayPostRegimes);
                        //Se formatean los regimenes con las siguientes caracteristicas...
                        newArrayPutRegimes = newArrayPutRegimes.map(itemRegime=>{
                            //Se elimina el id del hotel por que en este caso no se ocupa insertar
                            delete itemRegime.hotel_id;
                            //Si los periodos start y final no son null, se da formato a la fecha
                            //Para que sea aceptada por el endpoint (HH:MM)
                            if(typeof(itemRegime.start_period) != 'undefined' && typeof(itemRegime.final_period) != 'undefined'){
                                if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                                    if(itemRegime.start_period.length > 16){
                                        itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                    }
                                    if(itemRegime.final_period.length > 16){
                                        itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                    }
                                }
                            }
                            return itemRegime;
                        });
                        //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
                    }
                    else{
                        //Se formatean los regimenes con las siguientes caracteristicas...
                        newArrayPutRegimes = objRegimes.newRegimes.map(itemRegime=>{
                            //Se elimina el id del hotel por que en este caso no se ocupa insertar
                            delete itemRegime.hotel_id;
                            //Si los periodos start y final no son null, se da formato a la fecha
                            //Para que sea aceptada por el endpoint (HH:MM)
                            if(typeof(itemRegime.start_period) != 'undefined' && typeof(itemRegime.final_period) != 'undefined'){
                                if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                                    if(itemRegime.start_period.length > 16){
                                        itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                    }
                                    if(itemRegime.final_period.length > 16){
                                        itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                    }
                                }
                            }
                            return itemRegime;
                        });
                        //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        console.log("newArrayPutRegimes", newArrayPutRegimes)
                        await dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
                    }
                }
                else {
                    //Creamos la variable donde se guardaran los IDs de los elementos que se eliminaran
                    let arrayIDsItemsDel = [];
                    //Obtenemos la longitud del array que trae la cantidad
                    //De regimenes guardados, previamente obtenidos (los reflejados actualmente en la bd)
                    let countCurrentRegimes = objRegimes.currentRegimes.length - 1;
                    //Hacemos un map para obtener los IDs de los regimenes que se eliminaran
                    //(Los que estan guardados al momento en el Vuex State)
                    let arrayIDsDeletingCurrentRegime = objRegimes.newRegimes.map(itemRegime => itemRegime.id)
                    while(countCurrentRegimes >= 0){
                        //Si en este array de IDs no coincide con los IDs de la bd
                        //entonces las no coincidencias se guardan en la variable "arrayIDsItemsDel"
                        if(!arrayIDsDeletingCurrentRegime.includes(objRegimes.currentRegimes[countCurrentRegimes])){
                            arrayIDsItemsDel.push(objRegimes.currentRegimes[countCurrentRegimes])
                        }
                        countCurrentRegimes--;
                    }
                    //Se llama a la accion "deleteRegimesAXIOS" que se encargara
                    //De hacer la peticion AXIOS
                    await dispatch("deleteRegimesAXIOS", arrayIDsItemsDel);
                    let newArrayPutRegimes = [];
                    if(methodsRegime == "POST"){
                        let newArrayPostRegimes = objRegimes.newRegimes.filter(itemRegime=>{
                            if(itemRegime.id === "firstRegister"){
                                //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                                // delete itemRegime.id;
                                //Se agrega el id del hotel actual al que hara referencia para agregarse
                                itemRegime.hotel_id = objRegimes.currentHotelId;
                                return itemRegime;
                            }
                            else if(itemRegime.id === "NEW"){
                                //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                                // delete itemRegime.id;
                                //Se agrega el id del hotel actual al que hara referencia para agregarse
                                itemRegime.hotel_id = objRegimes.currentHotelId;
                                //El endopoint solo acepta HH:MM, por lo tanto se cambia
                                //de HH:MM:SS a HH:MM
                                if(itemRegime.start_period.length > 16){
                                    itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                }
                                if(itemRegime.final_period.length > 16){
                                    itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                }
                                return itemRegime;
                            }
                            else{
                                newArrayPutRegimes.push(itemRegime)
                            }
                        });
                        //Se llama a la accion "postAddRegimes" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("postAddRegimesAXIOS", newArrayPostRegimes);
                        //Se formatean los regimenes con las siguientes caracteristicas...
                        newArrayPutRegimes = newArrayPutRegimes.map(itemRegime=>{
                            //Se elimina el id del hotel por que en este caso no se ocupa insertar
                            delete itemRegime.hotel_id;
                            //Si los periodos start y final no son null, se da formato a la fecha
                            //Para que sea aceptada por el endpoint (HH:MM)
                            if(typeof(itemRegime.start_period) != 'undefined' && typeof(itemRegime.final_period) != 'undefined'){
                                if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                                    if(itemRegime.start_period.length > 16){
                                        itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                    }
                                    if(itemRegime.final_period.length > 16){
                                        itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                    }
                                } 
                            }
                            return itemRegime;
                        });
                        //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
                    }
                    else{
                        //Se formatean los regimenes con las siguientes caracteristicas...
                        newArrayPutRegimes = objRegimes.newRegimes.map(itemRegime=>{
                            //Se elimina el id del hotel por que en este caso no se ocupa insertar
                            delete itemRegime.hotel_id;
                            //Si los periodos start y final no son null, se da formato a la fecha
                            //Para que sea aceptada por el endpoint (HH:MM)
                            if(typeof(itemRegime.start_period) != 'undefined' && typeof(itemRegime.final_period) != 'undefined'){
                                if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                                    if(itemRegime.start_period.length > 16){
                                        itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                                    }
                                    if(itemRegime.final_period.length > 16){
                                        itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                                    }
                                }
                            }
                            return itemRegime;
                        });
                        //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                        //De hacer la peticion AXIOS
                        await dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
                    }

                }
            } catch (error) {
                commit("setErrorsRegimes", error.response.data);
                commit("setStatusRegimes", error.response.status);
            }
        },


        postEditAditionalInfo: async function({ commit }, newAditionalInfo) {
            try {
                const requestEditAditionalInfo = await axios.post(
                    `/api/amenities`,
                    newAditionalInfo
                );

                commit("putEditAditionalInfo", requestEditAditionalInfo.data.data);
            } catch (error) {
                commit("setErrorsAditionalInfo", error.response.data);
                commit("setStatusAditionalInfo", error.response.status);
            }
        },

        putEditAditionalInfo: async function({ commit }, newAditionalInfo) {
            try {
                //Eliminamos las propiedades que no es necesario agregar en la peticion AXIOS
                //Eliminamos el nombre del hotel
                delete newAditionalInfo.hotel;
                //Eliminamos el id del hotel
                delete newAditionalInfo.hotel_id;
                const requestEditAditionalInfo = await axios.put(
                    `/api/amenities/${newAditionalInfo.id}`,
                    newAditionalInfo
                );
                commit("putEditAditionalInfo", requestEditAditionalInfo.data.data);
            } catch (error) {
                commit("setErrorsAditionalInfo", error.response.data);
                commit("setStatusAditionalInfo", error.response.status);
            }
        },

        putEditRestaurants: async function({ commit, dispatch }, localArrayRestaurants) {
            try {
                let postRestaurants = [];
                let putRestaurants = [];
                let arrayDeletedRestaurants = [];
                localArrayRestaurants.forEach(itemRestaurant=>{
                    if(typeof(itemRestaurant.deletedRestaurant) != 'undefined'){
                        if(itemRestaurant.deletedRestaurant == 'DELETED'){
                            arrayDeletedRestaurants.push(itemRestaurant);
                        }
                    }
                    else if(typeof(itemRestaurant.deletedRestaurant) == 'undefined'){
                        if(itemRestaurant.id == 'NEW'){
                            postRestaurants.push(itemRestaurant);
                        }
                        else if(itemRestaurant.id != 'NEW'){
                            putRestaurants.push(itemRestaurant);
                        }
                    }
                })
                if(arrayDeletedRestaurants.length > 0){
                    await dispatch("deleteRestaurantsAXIOS", arrayDeletedRestaurants);
                }
                if(postRestaurants.length > 0){
                    await dispatch("postAddRestaurantsAXIOS", postRestaurants);
                }
                if(putRestaurants.length > 0){
                    await dispatch("putUpdateRestaurantsAXIOS", putRestaurants);
                }
            } catch (error) {
                commit("setErrorsRestaurants", error.response.data);
                commit("setStatusRestaurants", error.response.status);
            }
        },

        postAddRestaurantsAXIOS: async function({ commit }, localPostRestaurants) {
            let arrayRequestAddItemRestaurant = [];
            let arrayErrors = []
            let status;
            for (const itemRestaurant of localPostRestaurants) {
                try {
                    const requestAddItemRestaurant = await axios.post(`/api/restaurants`, itemRestaurant);
                    let trasformedRequest = requestAddItemRestaurant.data.data;
                    trasformedRequest.componentID = itemRestaurant.componentID;
                    trasformedRequest.idCompoRestaurant = itemRestaurant.idCompoRestaurant;
                    arrayRequestAddItemRestaurant.push(trasformedRequest);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemRestaurant.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("postAddRestaurants", arrayRequestAddItemRestaurant);
            }
            else{
                //commit("setErrorsRestaurants", arrayErrors);
                //commit("setStatusRestaurants", status);
            }
        },

        putUpdateRestaurantsAXIOS: async function({ commit }, localPutRestaurants) {
            let arrayRequestUpdateItemRestaurant = [];
            let arrayErrors = []
            let status;
            for (const itemRestaurant of localPutRestaurants) {
                try {
                    const requestUpdateItemRestaurant = await axios.put(
                        `/api/restaurants/${itemRestaurant.id}`,
                        itemRestaurant
                    );
                    let trasformedRequest = requestUpdateItemRestaurant.data.data;
                    trasformedRequest.componentID = itemRestaurant.componentID;
                    trasformedRequest.idCompoRestaurant = itemRestaurant.idCompoRestaurant;
                    arrayRequestUpdateItemRestaurant.push(trasformedRequest)
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemRestaurant.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("putUpdateRestaurants", arrayRequestUpdateItemRestaurant);
            }
            else{
                // commit("setErrorsRegimes", arrayErrors);
                // commit("setStatusRegimes", status);
            }
        },

        deleteRestaurantsAXIOS: async function({ commit }, localDeleteRestaurants) {
            let arrayErrors = [];
            let status;
            let doneDeletes = [];
            for (const itemRestaurant of localDeleteRestaurants) {
                try {
                    doneDeletes.push(itemRestaurant)
                    if(typeof(itemRestaurant.deletedRestaurant) != 'undefined' && itemRestaurant.id != "NEW"){
                        const requestDeleteItemRestaurant = await axios.delete(`/api/restaurants/${itemRestaurant.id}`);
                    }
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemRestaurant.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("deleteRestaurants", doneDeletes);
            }
            else{
                // commit("setErrorsRegimes", arrayErrors);
                // commit("setStatusRegimes", status);
            }
        },

        putEditSchedules: async function({ commit, dispatch }, localArraySchedules) {
            localArraySchedules.forEach(element=>{
                element.restaurantSchedules.forEach(insideElement=>{
                    if(insideElement.start_time.length >=8){
                        insideElement.start_time = insideElement.start_time.slice(0, -3);
                    }
                    if(insideElement.end_time.length >=8){
                        insideElement.end_time = insideElement.end_time.slice(0, -3);
                    }
                })
            })
            console.log("localArraySchedules", localArraySchedules)
            try {
                let postSchedules = [];
                let putSchedules = [];
                let arrayDeletedSchedules = [];
                localArraySchedules.forEach(itemSchedule=>{
                    if(typeof(itemSchedule.deletedRestaurant) != 'undefined'){
                        if(itemSchedule.deletedRestaurant == 'DELETED'){
                            if(itemSchedule.restaurantSchedules.length > 0){
                                arrayDeletedSchedules.push(...itemSchedule.restaurantSchedules);
                            }
                        }
                    }
                    else if(typeof(itemSchedule.deletedRestaurant) == 'undefined'){
                        if(itemSchedule.restaurantSchedules.length > 0){
                            for (let itemRestaurantSchedule of itemSchedule.restaurantSchedules) {
                                if(typeof(itemRestaurantSchedule.deletedSchedule) != 'undefined'){
                                    if(itemRestaurantSchedule.deletedSchedule == "DELETED"){
                                        arrayDeletedSchedules.push(itemRestaurantSchedule)
                                    }
                                }
                                else if(typeof(itemRestaurantSchedule.deletedSchedule) == 'undefined'){
                                    if(itemRestaurantSchedule.id == 'NEW'){
                                        postSchedules.push(itemRestaurantSchedule);
                                    }
                                    else if(itemRestaurantSchedule.id != 'NEW'){
                                        putSchedules.push(itemRestaurantSchedule);
                                    }
                                }
                            }
                        }
                    }
                })
                console.log("arrayDeletedSchedules", arrayDeletedSchedules)
                console.log("postSchedules", postSchedules)
                console.log("putSchedules", putSchedules)
                if(arrayDeletedSchedules.length > 0){
                    await dispatch("deleteSchedulesAXIOS", arrayDeletedSchedules);
                }
                if(postSchedules.length > 0){
                    await dispatch("postAddSchedulesAXIOS", postSchedules);
                }
                if(putSchedules.length > 0){
                    await dispatch("putUpdateSchedulesAXIOS", putSchedules);
                }
            } catch (error) {
                commit("setErrorsRestaurants", error.response.data);
                commit("setStatusRestaurants", error.response.status);
            }
        },

        postAddSchedulesAXIOS: async function({ commit }, localPostSchedules) {
            let arrayRequestAddItemSchedule = [];
            let arrayErrors = []
            let status;
            for (const itemSchedule of localPostSchedules) {
                try {
                    const requestAddItemSchedule = await axios.post(`/api/schedules`, itemSchedule);
                    let trasformedRequest = requestAddItemSchedule.data.data;
                    trasformedRequest.componentID = itemSchedule.componentID;
                    trasformedRequest.idCompoSelectTimePicker = itemSchedule.idCompoSelectTimePicker;
                    if(trasformedRequest.start_time.length >= 8){
                        trasformedRequest.start_time = trasformedRequest.start_time.slice(0, -3);
                    }
                    if(trasformedRequest.end_time.length >= 8){
                        trasformedRequest.end_time = trasformedRequest.end_time.slice(0, -3);
                    }
                    arrayRequestAddItemSchedule.push(trasformedRequest);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemSchedule.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("postAddSchedules", arrayRequestAddItemSchedule);
            }
            else{
                //commit("setErrorsRestaurants", arrayErrors);
                //commit("setStatusRestaurants", status);
            }
        },

        putUpdateSchedulesAXIOS: async function({ commit }, localPutSchedules) {
            let arrayRequestUpdateItemSchedule = [];
            let arrayErrors = []
            let status;
            console.log("localPutSchedules", localPutSchedules)
            for (const itemSchedule of localPutSchedules) {
                try {
                    const requestUpdateItemSchedule = await axios.put(
                        `/api/schedules/${itemSchedule.id}`,
                        itemSchedule
                    );
                    let trasformedRequest = requestUpdateItemSchedule.data.data;
                    trasformedRequest.componentID = itemSchedule.componentID;
                    trasformedRequest.idCompoSelectTimePicker = itemSchedule.idCompoSelectTimePicker;
                    if(trasformedRequest.start_time.length >= 8){
                        trasformedRequest.start_time = trasformedRequest.start_time.slice(0, -3);
                    }
                    if(trasformedRequest.end_time.length >= 8){
                        trasformedRequest.end_time = trasformedRequest.end_time.slice(0, -3);
                    }
                    arrayRequestUpdateItemSchedule.push(trasformedRequest)
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemSchedule.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("putUpdateSchedules", arrayRequestUpdateItemSchedule);
            }
            else{
                // commit("setErrorsRegimes", arrayErrors);
                // commit("setStatusRegimes", status);
            }
        },

        deleteSchedulesAXIOS: async function({ commit }, localDeleteSchedules) {
            let arrayErrors = [];
            let status;
            let doneDeletes = [];
            for (const itemSchedule of localDeleteSchedules) {
                try {
                    doneDeletes.push(itemSchedule)
                    if(typeof(itemSchedule.deletedSchedule) != 'undefined' && itemSchedule.id != "NEW"){
                        const requestDeleteItemSchedule = await axios.delete(`/api/schedules/${itemSchedule.id}`);
                    }
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemSchedule.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("deleteSchedules", doneDeletes);
            }
            else{
                // commit("setErrorsRegimes", arrayErrors);
                // commit("setStatusRegimes", status);
            }
        },

        editHotel: async function({ commit }, newHotel) {
            try {
                const request = await axios.put(
                    "/api/hotels/" + newHotel.id,
                    newHotel
                );
                commit("editHotel", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response);
                commit("setStatus", error.response.status);
            }
        },

        deleteHotels: async function({ commit }, ids) {
            try {
                const request = await axios.post("/api/deletehotels", ids);
                commit("deleteHotel", request.data);
                // commit('setStatus',request.status);
            } catch (error) {
                // commit('setStatus',error.response.status);
            }
        }
    }
};
export default HotelModule;
