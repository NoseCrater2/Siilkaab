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
        }
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
        }
    }
};

export default disponibilityMoule;
