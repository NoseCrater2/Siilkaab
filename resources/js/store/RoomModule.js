import axios from "axios";

const RoomModule = {
    state: {
        availableRooms: [],
        currentHotelRooms: null,
        roomDetails: null,
        bedrooms: null,
        beds: null,
        searchErrors: [],
        additionalImages: [],
    },
    getters: {
        getSearchErrors(state){
            return state.searchErrors
        },
    },
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
        },
       
        setSearchErrors(state, errors) {
            state.searchErrors = errors;
        },

        setAdditionalImages(state, additionalImages) {
            state.additionalImages = additionalImages;
        },

        deleteAdditionalImage(state, deleteImage) {
            let  i = state.additionalImages.find((image => image.id === deleteImage.name))
            state.additionalImages.splice(state.additionalImages.indexOf(i),1) 
        },

    },
    actions: {
        //NO TOQUES ESTE MÉTODO
        getAvailabilityRooms: async function({ commit, state }, terms) {
            try {
                const request = await axios
                 .post(`/api/rooms/${terms.id}/availability?from=${terms.from}&to=${terms.to}`, {rooms: terms.rooms});
                    commit("setAvailableRooms", request.data);
              
            } catch (error) {
                commit("setSearchErrors", error.response.data)
            }
           
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
            if (typeof arrayIdBedroom == "number") {
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
        },

        getAdditionalImages: async function({ commit }, roomId){
            try {
                const request = await axios.get('/api/images/'+roomId);
                let images = request.data.data;
                commit("setAdditionalImages", images);
            } catch (error) {}  
        },

        deleteImage: async function({ commit }, roomId){
            try {
                const request = await axios.delete('/api/images/'+roomId);
                let image = request.data;
                console.log(image)
                commit("deleteAdditionalImage", image);
            } catch (error) {}  
        },
    }
};

export default RoomModule;
