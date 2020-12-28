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
                const response = await axios.get(`/api/rates/`);
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
        putEditRates: async function({ commit }, newArrayPutRates) {
            console.log("newArrayPutRates", newArrayPutRates)
            newArrayPutRates.map(el=>{
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
            })
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
                console.log(arrayRequestItemRate)
                commit("putEditRates", arrayRequestItemRate);
                // commit('setStatus',request.status);
            } catch (error) {
                //commit("setErrorsRegimes", error.response.data);
                //commit("setStatusRegimes", error.response.status);
            }
        },
    }
};

export default disponibilityMoule;
