import axios from "axios";

const disponibilityMoule = {
    state: {
        ahotels: [],
        arooms: [],
        rates: []
    },
    getters: {},
    mutations: {
        setHotels(state, payload) {
            state.ahotels = payload;
        },

        setRooms(state, payload) {
            state.arooms = payload;
        },

        setRates(state, payload) {
            state.rates = payload;
        },

        putEditRates(state, rates) {
            state.rates = rates;
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
                const response = await axios.get(`/api/adminhotels/`);
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
            let oldRates = newArrayPutRates.arrayRates.filter((el)=>{
                if(el.id != "NEWDAYS"){
                    return el;
                }
                else if(el.id == "NEWDAYS"){
                    flagNewRates = true;
                    delete el.id;
                    newRates.push(el);
                }
            });
            try {
                if(flagNewRates == true){
                    dispatch("postAddRatesAXIOS", newRates).then(()=>{
                        dispatch("putUpdateRatesAXIOS", oldRates).then(()=>{
                            dispatch("getRates", newArrayPutRates.arrayIdRooms)
                        });
                    });
                }
                else{
                    dispatch("putUpdateRatesAXIOS", oldRates).then(()=>{
                        dispatch("getRates", newArrayPutRates.arrayIdRooms)
                    });
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
