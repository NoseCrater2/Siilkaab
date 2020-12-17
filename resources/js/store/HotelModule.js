import axios from "axios";
const HotelModule = {
    state: {
        allhotels: [],
        hotels: [],
        setReinicializedVar: null,
        chargeView: false, //Variable que carga las vistas de componentes de submenus de hotel
        assignHotels: null,
        iditemsListOptions: 0,
        hotel: null,
        currencies: null,
        timezones: null,
        countries: null,
        configuration: null,
        contacts: null,
        conditions: null,
        regimes: null,
        restaurants: null,
        schedules: null,
        pools: null,
        aditionalInfo: null,

        errorsInformation: null,
        statusInformation: null,
        errorsConfiguration: null,
        statusConfiguration: null,
        errorsContacts: null,
        statusContacts: null,
        errorsConditions: null,
        statusConditions: null
    },
    getters: {
        getAssignHotels(state) {
            return state.assignHotels;
        }
    },
    mutations: {
        //Se reinician los estados (principalmente por el problema del router-link)
        setReinicialized(state) {
            (state.iditemsListOptions = 0),
            (state.setReinicializedVar = null),
            (state.chargeView = false),
                (state.hotel = null),
                (state.currencies = null),
                (state.timezones = null),
                (state.countries = null),
                (state.configuration = null),
                (state.contacts = null),
                (state.conditions = null),
                (state.regimes = null),
                (state.restaurants = null),
                (state.schedules = null),
                (state.pools = null),
                (state.aditionalInfo = null);
        },
        setReinicializedErrorsStatus(state){
            (state.errorsInformation = null),
            (state.statusInformation = null),
            (state.errorsConfiguration = null),
            (state.statusConfiguration = null),
            (state.errorsContacts = null),
            (state.statusContacts = null),
            (state.errorsConditions = null),
            (state.statusConditions = null)
        },
        //Metodo para mover el contador de items del MenuLateral.vue y ser usado en Hotel.vue
        countIditemsListOptions(state, index) {
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
            state.hotels.map(function(currentHotel) {
                if (currentHotel.id === hotel.id) {
                    Object.assign(currentHotel, hotel);
                }
            });
        },

        postAddRegimes(state, regimes) {
            state.regimes = regimes;
        },

        putUpdateRegimes(state, regimes) {
            state.regimes = regimes;
        },

        deleteRegimes(state, regimes) {
            state.regimes = regimes;
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

        editHotel(state, hotel) {
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
                //
            }
        },

        getCurrencies: async function({ commit }) {
            try {
                const request = await axios.get("/api/currencies");
                let currencies = request.data.data;
                commit("setCurrencies", currencies);
            } catch (error) {
                //
            }
        },
        getTimezones: async function({ commit }) {
            try {
                const request = await axios.get("/api/timezones");
                let timezones = request.data;
                commit("setTimezones", timezones);
            } catch (error) {
                //
            }
        },
        getCountries: async function({ commit }) {
            try {
                const request = await axios.get("/api/countries");
                let countries = request.data.data;
                commit("setCountries", countries);
            } catch (error) {
                //
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
                mapArray.sort(function(a,b) {return (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0);} );

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
                
                commit("setRegimes", arrayRegimes);
            } catch (error) {}
        },
        getRestaurants: async function({ commit }, idHotel) {
            try {
                const request = await axios.get("/api/restaurants");
                let restaurants = request.data.data.filter(
                    element => element.hotel_id === idHotel
                );
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
                const request = await axios.get(`/api/adminhotels/`);
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
            let formDataHotel = new FormData();

            for (let attrib in newHotel) {
                //Si la propiedad a agregar al FormData es la imagen
                if(attrib === "image"){
                    //Si la imagen.result es diferente de "undefined" es por que se editó la imagen
                    //Y se modificó la propiedad donde se guardaria temporalmente el "comprimido"
                    if(typeof(newHotel[attrib].result) !== "undefined"){
                        formDataHotel.append(attrib, newHotel[attrib].result);
                    }
                }
                //Sino, se sigue agregando como normalmente se agrega
                else{
                    formDataHotel.append(attrib, newHotel[attrib]);
                }
            }

            formDataHotel.append("_method", "put");

            try {
                const request = await axios.post(
                    `/api/hotels/${newHotel.id}`,
                    formDataHotel
                );
                commit("postEditHotel", request.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                console.log(error.response.data)
                console.log(error.response.status)
                commit("setErrorsInformation", error.response.data);
                commit("setStatusInformation", error.response.status);
            }
        },

        postAddRegimesAXIOS: async function({ commit }, newArrayPostRegimes) {
            try {
                let arrayRequestAddItemRegime = [];
                newArrayPostRegimes.forEach(async itemRegime => {
                    const requestAddItemRegime = await axios.post(
                        `/api/regimes/`,
                        itemRegime
                    );
                    arrayRequestAddItemRegime.push(requestAddItemRegime.data.data)
                });
                commit("postAddRegimes", arrayRequestAddItemRegime);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
            }
        },

        putUpdateRegimesAXIOS: async function({ commit }, newArrayPutRegimes) {
            try {
                let arrayRequestUpdateItemRegime = [];
                newArrayPutRegimes.forEach(async itemRegime => {
                    const requestUpdateItemRegime = await axios.put(
                    `/api/regimes/${itemRegime.id}`,
                    itemRegime
                    );
                    arrayRequestUpdateItemRegime.push(requestUpdateItemRegime.data.data)
                });
                commit("putUpdateRegimes", arrayRequestUpdateItemRegime);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
            }
        },

        deleteRegimesAXIOS: async function({ commit }, arrayIDsItemsDel) {
            try {
                let arrayRequestDeleteItemRegime = [];
                arrayIDsItemsDel.forEach(async idItemRegime => {
                    const requestDeleteItemRegime = await axios.delete(`/api/regimes/${idItemRegime}`);
                    arrayRequestDeleteItemRegime.push(requestDeleteItemRegime.data.data)
                });
                commit("deleteRegimes", arrayRequestDeleteItemRegime);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
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
                console.log(error.response.data)
                console.log(error.response.status)
                commit("setErrorsConfiguration", error.response.data);
                commit("setStatusConfiguration", error.response.status);
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

        putEditConditions: async function({ commit }, newConditions) {
            console.log("newConditions", newConditions)
            try {
                const request = await axios.put(
                    `/api/conditions/${newConditions.id}`,
                    newConditions
                );
                let conditions = request.data.data;
                console.log("conditions", conditions)
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
            try {
                //Si "objRegimes.newRegimes" es mayor se agregaron nuevos regimenes
                if (objRegimes.newRegimes.length > objRegimes.currentRegimes.length) {
                    let newArrayPostRegimes = objRegimes.newRegimes.filter(itemRegime=>{
                        if(itemRegime.id === "NEW"){
                            //Se elimina el id "NEW", ya que se añadira un nuevo elemento
                            delete itemRegime.id;
                            //Se agrega el id del hotel actual al que hara referencia para agregarse
                            itemRegime.hotel_id = objRegimes.currentHotelId;
                            //El endopoint solo acepta HH:MM, por lo tanto se cambia
                            //de HH:MM:SS a HH:MM
                            itemRegime.start_period = itemRegime.start_period.slice(0,-3);
                            itemRegime.final_period = itemRegime.final_period.slice(0,-3);
                            return itemRegime;
                        }
                    });
                    //Se llama a la accion "postAddRegimes" que se encargara
                    //De hacer la peticion AXIOS
                    dispatch("postAddRegimesAXIOS", newArrayPostRegimes);
                }
                //Si "objRegimes.newRegimes" es igual a los elementos existentes, solamente se da formato a los datos
                else if (objRegimes.newRegimes.length == objRegimes.currentRegimes.length) {
                    //Se formatean los regimenes con las siguientes caracteristicas...
                    let newArrayPutRegimes = objRegimes.newRegimes.map(itemRegime=>{
                        //Se elimina el id del hotel por que en este caso no se ocupa insertar
                        delete itemRegime.hotel_id;
                        //Si los periodos start y final no son null, se da formato a la fecha
                        //Para que sea aceptada por el endpoint (HH:MM)
                        if(itemRegime.start_period !== null && itemRegime.final_period !== null){
                            itemRegime.start_period = itemRegime.start_period.slice(0,-3)
                            itemRegime.final_period = itemRegime.final_period.slice(0,-3)
                        }
                        else{
                            //Si son null, se eliminan las propiedades del itemRegime
                            //Para que no cause error al momento de "PUT"
                            delete itemRegime.start_period;
                            delete itemRegime.final_period;
                        } 
                        return itemRegime;
                    });
                    //Se llama a la accion "putUpdateRegimesAXIOS" que se encargara
                    //De hacer la peticion AXIOS
                    dispatch("putUpdateRegimesAXIOS", newArrayPutRegimes);
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
                    dispatch("deleteRegimesAXIOS", arrayIDsItemsDel);
                }
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
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
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
            }
        },

        putEditRestaurants: async function({ commit }, newRestaurants) {
            //console.log(newRestaurants)
            try {
                //Eliminamos las propiedades que no es necesario agregar en la peticion AXIOS
                //Eliminamos el nombre del hotel
                //delete newAditionalInfo.hotel;
                //Eliminamos el id del hotel
                //delete newAditionalInfo.hotel_id;
                //const requestEditAditionalInfo = await axios.put(
                //    `/api/amenities/${newAditionalInfo.id}`,
                //    newAditionalInfo
                //);
                //commit("putEditAditionalInfo", requestEditAditionalInfo.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
            }
        },

        putEditSchedules: async function({ commit }, newSchedules) {
            //console.log(newSchedules)
            try {
                //Eliminamos las propiedades que no es necesario agregar en la peticion AXIOS
                //Eliminamos el nombre del hotel
                //delete newAditionalInfo.hotel;
                //Eliminamos el id del hotel
                //delete newAditionalInfo.hotel_id;
                //const requestEditAditionalInfo = await axios.put(
                //    `/api/amenities/${newAditionalInfo.id}`,
                //    newAditionalInfo
                //);
                //commit("putEditAditionalInfo", requestEditAditionalInfo.data.data);
                // commit('setStatus',request.status);
            } catch (error) {
                commit("setErrors", error.response.data);
                commit("setStatus", error.response.status);
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
                const request = await axios.post("/api/deletehotels/", ids);
                commit("deleteHotel", request.data);
                // commit('setStatus',request.status);
            } catch (error) {
                // commit('setStatus',error.response.status);
            }
        }
    }
};
export default HotelModule;
