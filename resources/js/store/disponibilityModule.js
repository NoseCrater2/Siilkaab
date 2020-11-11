import axios from 'axios';

const disponibilityMoule = {

    state: {
        ahotels: [],
        arooms: [],
    },
    getters: {},
    mutations: {
        setHotels(state, payload) {
            state.ahotels = payload;
        },

        setRooms(state, payload) {
            state.arooms = payload;
        },
    },
    actions: {
        getHotelsForAdmin: async function({ commit }) {
            try {
                const response = await axios.get(`/api/adminhotels/`);
                let hotels = responde.data.data;
                commit("setHotels", hotels);
            } catch (error) {

            }
        },

        getHotelsForAdmin: async function({ commit }) {
            try {
                const response = await axios.get(`/api/adminhotels/`);
                let hotels = responde.data.data;
                commit("setHotels", hotels);
            } catch (error) {

            }
        },

        getRoomsForAdmin: async function({ commit }, idHotel) {
            try {
                const response = await axios.get(`/api/adminrooms/`+idHotel);
                let rooms = response.data.data;
                commit("setRooms", rooms);
            } catch (error) {
                console.log(error)
            }
        },
    },

};

export default disponibilityMoule;