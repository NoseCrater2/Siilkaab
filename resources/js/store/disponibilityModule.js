import axios from "axios";

const disponibilityMoule = {
    state: {
        arrayItemsCalendar: [],//"arrayItemsCalendar" guardara los arreglos de objetos de calendario (arrayDatesCalendar)
        flagCalendarModified: false,//"calendarModified" funcionara como una bandera para saber si se modifico alguna rate del calendario
        flagCleanPeriodConfigTextfields: false,//"flagCleanPeriodConfigTextfields" es una bandera que determina si deben de ser limpiadoa los textields de PeriodConfig.vue
        ahotels: [],
        arooms: [],
        rates: [],
        snackbar: {
            stateSnackbar: false,
            messaggeSnackbar: "",
            colorSnackbar: ""
        },
        timeoutSnackbar: 3500,
    },
    getters: {},
    mutations: {
        //Mutacion que resetea el arreglo de fechas. Este es llamado desde Disponibility.vue
        resetArrayItemsCalendar(state) {
            state.arrayItemsCalendar = [];
        },
        //Mutacion que recarga en tiempo real las fechas (los colores) en Calendar.vue
        mutationReloadDates(state){
            let lengtArrayItems = state.arrayItemsCalendar.length - 1;
            while (lengtArrayItems >= 0) {
                state.arrayItemsCalendar[lengtArrayItems].forEach(itemArray => {
                if(itemArray.idRoom.length > 0){
                    itemArray.idRoom = [];
                }
              });
              lengtArrayItems--;
            }
        },
        //Mutacion que reinicia la variable que es usada para verificar los cambios de rates en calendario
        mutationFlagCalendarModified(state, payload){
            state.flagCalendarModified = payload;
        },
        //Mutacion que reinicia la variable que es usada para determinar si los textfields de PeriodConfig.vue deben ser limpiados
        mutationFlagCleanPeriodConfigTextfields(state, payload){
            state.flagCleanPeriodConfigTextfields = payload;
        },
        setHotels(state, payload) {
            state.ahotels = payload;
        },

        setRooms(state, payload) {
            state.arooms = payload;
        },

        setRates(state, payload) {
            state.rates = payload;
        },

        setRatesReinitTable(state, payload){
            //Array.from(payload)
            //state.rates = [...payload]
            //Esto es para clonar el arreglo y en una nueva referencia de memoria
            state.rates = JSON.parse(JSON.stringify(payload));
        },

        putEditRates(state, rates) {
            state.rates = rates;
        },
        //Metodo que cambia de estado la variable que permite mostrar un snackbar (mensaje)
        setSnackbar(state, flag){
            state.snackbar = flag;
        },
        //Metodo que cambia de estado la variable que controla el tiempo de un snackbar (mensaje)
        setTimeoutSnackbar(state, time){
            state.timeoutSnackbar = time;
        },
        // postAddRates(state, rates) {
        //     state.rates = rates;
        // },

        // putUpdateRates(state, rates) {
        //     state.rates = rates;
        // },
    },
    actions: {
        getHotelsForAdmin: async function({ commit }) {
            try {
                const response = await axios.get(`/api/adminhotels`);
                let hotels = responde.data.data;
                commit("setHotels", hotels);
            } catch (error) {}
        },

        getRoomsForAdmin: async function({ commit }, idHotel) {
            try {
                const response = await axios.get(`/api/adminrooms/` + idHotel);
                let rooms = response.data.data;
                commit("setRooms", rooms);
            } catch (error) {
                console.log(error);
            }
        },

        getRates: async function({ commit }, arrayRoomsID) {
            try {
                const response = await axios.get(`/api/rates`);
                let rates = response.data.data;
                let filteredRates = rates.filter((el)=>{
                    let cont = 0;
                    while (cont < arrayRoomsID.length) {
                        if(el.room_id == arrayRoomsID[cont]){
                            return el;
                        }
                        cont++;
                    }
                });
                console.log(filteredRates)
                commit("setRates", filteredRates);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
            }
        },
        putEditRates: async function({ commit, dispatch }, newArrayPutRates) {
            //ESTAN LAS NEWDATES QUE SERAN LAS NUEVAS (SI SON NUEVAS PERO NO TIENEN NADA, NI SIQUIERA INSERTAR)
            //ESTAN LAS QUE QUE YA ESTAN PERO NO TIENEN NADA. ESAS HAY QUE ELIMINAR
            let flagNewRates = false;
            newArrayPutRates.arrayRates.map(el=>{
                if(el.day == null){
                    delete el.day;
                }
                if(el.start == null){
                    delete el.start;
                }
                if(el.end == null){
                    delete el.end;
                }
                return el;
            });
            let newRates = [];
            let deleteOldRates = [];
            let oldRates = newArrayPutRates.arrayRates.filter((el)=>{
                if(el.id != "NEWDAYS"){
                    return el;
                }
                else if(el.id == "NEWDAYS"){
                    let isDeleteableObj = false;
                    if(typeof(el.day) != 'undefined'){
                        if(el.day == 'day'){
                            isDeleteableObj = true;
                        }
                    }
                    if(typeof(el.start) != 'undefined' && typeof(el.end) != 'undefined'){
                        if(el.start == 'start' && el.end == 'end'){
                            isDeleteableObj = true;
                        }
                    }
                    if((el.monday == 0 && el.tuesday == 0 && el.wednesday == 0 && el.thursday == 0 && el.friday == 0 && el.saturday == 0 && el.sunday == 0) && isDeleteableObj == false){
                        isDeleteableObj = true;
                    }
                    if(isDeleteableObj == false){
                        flagNewRates = true;
                        newRates.push(el);
                    }
                }
            });
            try {
                if(flagNewRates == true){
                    console.log("NEW RATES", newRates)
                    // dispatch("postAddRatesAXIOS", newRates).then(()=>{
                    //     dispatch("putUpdateRatesAXIOS", oldRates).then(()=>{
                    //         dispatch("getRates", newArrayPutRates.arrayIdRooms)
                    //     });
                    // });
                }
                else{
                    // dispatch("putUpdateRatesAXIOS", oldRates).then(()=>{
                    //     dispatch("getRates", newArrayPutRates.arrayIdRooms)
                    // });
                }
            } catch (error) {
                //commit("setErrorsRegimes", error.response.data);
                //commit("setStatusRegimes", error.response.status);
            }
        },

        postAddRatesAXIOS: async function({ commit }, newArrayPostRates) {
            try {
                let arrayRequestAddItemRate = [];
                newArrayPostRates.forEach(async itemRate => {
                    try {
                        const requestAddItemRate = await axios.post(
                            `/api/rates`,
                            itemRate
                        );
                        arrayRequestAddItemRate.push(requestAddItemRate.data.data)
                    } catch (error) {
                        commit("setErrorsRegimes", error.response.data);
                        commit("setStatusRegimes", error.response.status);
                    }
                });
                // commit("postAddRates", arrayRequestAddItemRate);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsRegimes", error.response.data);
                commit("setStatusRegimes", error.response.status);
            }
        },

        putUpdateRatesAXIOS: async function({ commit }, newArrayPutRates) {
            try {
                let arrayRequestItemRate = [];
                newArrayPutRates.forEach(async itemRate => {
                    try {
                        const requestItemRate = await axios.put(
                            `/api/rates/${itemRate.id}`,
                            itemRate
                        );
                        arrayRequestItemRate.push(requestItemRate.data.data)
                    } 
                    catch (error) {
                        //commit("setErrorsRegimes", error.response.data);
                        //commit("setStatusRegimes", error.response.status);
                    }
                });
                // commit("putUpdateRates", arrayRequestItemRate);
                // commit('setStatus',request.status);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrorsRegimes", error.response.data);
                commit("setStatusRegimes", error.response.status);
            }
        },
    }
};

export default disponibilityMoule;
