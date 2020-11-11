import axios from "axios";

const RoomModule = {
    state: {
        availableRooms: [],
        currentHotelRooms: null,
        roomDetails: null,
        bedrooms: null,
        beds: null
    },
    getters: {},
    mutations: {
        //Mutacion que setea el state.beds para asignar nuevo arreglo
        setArrayBeds(state, payload) {
            state.beds = payload;
        },
        setAvailableRooms(state, avaRooms) {
            state.availableRooms = avaRooms;
        },
        setCurrentHotelRooms(state, currentHotelRooms) {
            state.currentHotelRooms = currentHotelRooms;
        },
        setRoomDetails(state, roomDetails) {
            state.roomDetails = roomDetails;
        },
        setBedrooms(state, bedrooms) {
            state.bedrooms = bedrooms;
        },
        setBeds(state, beds) {
            state.beds = beds;
        }
    },
    actions: {
        //NO TOQUES ESTE MÉTODO
        getAvailabilityRooms: async function({ commit, state }, idHotel) {
            const request = await axios
                // .get(`/api/rooms/1/availability?from=${this.date}&to=${this.date2}`)
                .get(`/api/rooms/${idHotel}/availability`)
                .then(response => {
                    //   console.log(response);
                    commit("setAvailableRooms", response.data);
                });
        },
        getCurrentHotelRooms: async function({ commit }, idHotel) {
            try {
                const request = await axios.get(
                    `/api/currentHotelRooms/${idHotel}`
                );
                let currentHotelRooms = request.data.data;
                commit("setCurrentHotelRooms", currentHotelRooms);
            } catch (error) {}
        },
        getRoomDetails: async function({ commit }, idRoom) {
            try {
                const request = await axios.get(`/api/rooms/${idRoom}`);
                let roomDetails = request.data.data;
                commit("setRoomDetails", roomDetails);
            } catch (error) {}
        },
        getBedrooms: async function({ commit }, idRoom) {
            try {
                const request = await axios.get(`/api/bedrooms/`);
                let bedrooms = request.data.data.filter(
                    element => element.room_id == idRoom
                );
                commit("setBedrooms", bedrooms);
            } catch (error) {}
        },

        getBeds: async function({ commit }, arrayIdBedroom) {
            if(typeof(arrayIdBedroom) == 'number'){
                arrayIdBedroom = [arrayIdBedroom];
            }
            try {
                const request = await axios.get(`/api/beds/`);
                let beds = request.data.data;
                let reformatedArrBeds = [];
                for (let i = 0; i < arrayIdBedroom.length; i++) {
                    let tempArray = [];
                    for (let j = 0; j < beds.length; j++) {
                        if (arrayIdBedroom[i] == beds[j].bedroom_id) {
                            tempArray.push({
                                idBedroom: beds[j].bedroom_id,
                                obj: beds[j]
                            });
                        }
                    }
                    reformatedArrBeds.push(tempArray);
                }
                commit("setBeds", reformatedArrBeds);
            } catch (error) {}
        }
    }
};

export default RoomModule;
