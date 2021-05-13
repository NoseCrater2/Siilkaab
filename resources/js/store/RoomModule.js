import axios from "axios";

const RoomModule = {
    state: {
        snackbarRoomAmenities: {
            stateSnackbar: false,
            messaggeSnackbar: "",
            colorSnackbar: ""
        },
        timeoutSnackbarRoomAmenities: 3500,
        availableRooms: [],
        currentHotelRooms: [],
        roomDetails: {
            id: null,
            name: null,
            type: "single",
            quantity: 0,
            bed_rooms: null,
            rack_rate: 0,
            large_text: null,
            short_text: null,
            smoking_policy: "no",
            pool_near: "none",
            floor_near: "ground",
            size: 0,
            size_type: "meters",
            max_adults: 0,
            max_children: 0,
            max_occpancy: 0,
            adult_extra: 0,
            child_extra: 0,
            baby_extra: 0,
            hotel_id: null,
        },
        roomAmenities: [],
        bedrooms: [],
        beds: [],
        searchErrors: [],
        additionalImages: [],

        errorsDetailsRoom: [],
        statusDetailsRoom: 0,
        errorsRoomsAmenities: [],
        statusRoomsAmenities: 0
    },
    getters: {
        getSearchErrors(state){
            return state.searchErrors
        },
        //GETTER para obtenner la cantidad total de rooms del currentHotel
        getHotelRoomsQuantity(state){
            let returned = 0;
            state.currentHotelRooms.forEach(el=>{
                returned += el.quantity;
            })
            return returned.toString();
        }
    },
    mutations: {
        //Se reinician los estados (principalmente por el problema del router-link)
        setReinicializedRoomModule(state) {
            (state.roomDetails = {
                id: null,
                name: null,
                type: "single",
                quantity: 0,
                bed_rooms: null,
                rack_rate: 0,
                large_text: null,
                short_text: null,
                smoking_policy: "no",
                pool_near: "none",
                floor_near: "ground",
                size: 0,
                size_type: "meters",
                max_adults: 0,
                max_children: 0,
                max_occpancy: 0,
                adult_extra: 0,
                child_extra: 0,
                baby_extra: 0,
                hotel_id: null,
            }),
            (state.roomAmenities = []),
            (state.bedrooms = []),
            (state.beds = [])
        },
        setReinicializedErrorsStatusRoomModule(state){
            (state.errorsDetailsRoom = []),
            (state.statusDetailsRoom = 0),
            (state.errorsRoomsAmenities = []),
            (state.statusRoomsAmenities = 0),
            (state.snackbarRoomAmenities = {
                stateSnackbar: false,
                messaggeSnackbar: "",
                colorSnackbar: ""
            }),
            (state.timeoutSnackbarRoomAmenities = 3500)
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
        setRoomAmenities(state, roomAmenities){
            state.roomAmenities = roomAmenities;
        },
        setErrorsRoomAmenities(state, errors){
            state.errorsRoomsAmenities = errors
        },
        setStatusRoomAmenities(state, status){
            state.statusRoomsAmenities = status
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

        setSnackbarRoomAmenities(state, snackbar){
            state.snackbarRoomAmenities = snackbar;
        },

        putRoomAmenities(state, roomAmenities){
            state.roomAmenities = roomAmenities;
        },
        postPutEditRooms(state, roomDetails) {
            //En caso de que se inserta una habitacion nueva, directamente se inserta la habitacion en las variables
            if(typeof(roomDetails.new) != "undefined"){
                if(roomDetails.new == "NEW"){
                    delete roomDetails.new
                    state.currentHotelRooms.push(roomDetails)
                }
            }
            state.roomDetails = roomDetails;
            state.currentHotelRooms.map(currentRoom => {
                if (currentRoom.id == roomDetails.id) {
                    Object.assign(currentRoom, roomDetails);
                }
            });
        },

        deleteAdditionalImage(state, deleteImage) {
            let  i = state.additionalImages.find((image => image.id === deleteImage.name))
            state.additionalImages.splice(state.additionalImages.indexOf(i),1) 
        },
        //Mutacion para los errores
        setErrorsDetailsRoom(state, errors){
            state.errorsDetailsRoom = errors
        },
        //Mutacion para el estatus
        setStatusDetailsRoom(state, status){
            state.statusDetailsRoom = status
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

        getRoomAmenities: async function({ commit }, idHotel) {
            try {
                const request = await axios.get("/api/room_amenities");
                let roomAmenities = request.data.data;
                let filteredAmenities = roomAmenities.filter(el=> el.hotel_id == idHotel);
                console.log(filteredAmenities, idHotel)
                commit("setRoomAmenities", filteredAmenities);
            } catch (error) {}
        },

        getBedrooms: async function({ commit }, idRoom) {
            try {
                const request = await axios.get(`/api/bedrooms`);
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
                const request = await axios.get(`/api/beds`);
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

        putRoomAmenitiesAXIOS: async function({ commit }, localArrayRoomAmenities){
            let arrayRequestUpdateRoomAmenities = [];
            let arrayErrors = []
            let status;
            
            for (const itemAmenity of localArrayRoomAmenities) {
                try {
                    const request = await axios.put(`/api/room_amenities/${itemAmenity.id}`, itemAmenity);
                    arrayRequestUpdateRoomAmenities.push(request.data.data);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data})
                }
            }
            if(arrayErrors == 0){
                commit("putRoomAmenities", arrayRequestUpdateRoomAmenities);
            }
            else{
                commit("setErrorsRoomAmenities", error.response.data);
                commit("setStatusRoomAmenities", error.response.status);
            }
        },

        postPutEditRoomsAXIOS: async function({ commit }, localDetailsRoom){
            let arrayPropertyNull = [];//Aqui se guardaran las propiedades del objeto "localDetailsRoom" que son null y se tienen que eliminar
            for (const propertyRoom in localDetailsRoom) {
                if(localDetailsRoom[propertyRoom] == null)
                arrayPropertyNull.push(propertyRoom);
            }
            arrayPropertyNull.forEach(propertyNull=>{
                delete localDetailsRoom[propertyNull];
            })
            console.log("localDetailsRoom", localDetailsRoom)
            try {
                if(localDetailsRoom.id == "NEW"){
                    const request = await axios.post("/api/rooms", localDetailsRoom);
                    let newRoom = request.data.data;
                    newRoom.new ="NEW";
                    commit("postPutEditRooms", newRoom);
                }
                else if(localDetailsRoom.id != "NEW"){
                    const request = await axios.put(
                        `/api/rooms/${localDetailsRoom.id}`,
                        localDetailsRoom
                    );
                    commit("postPutEditRooms", request.data.data);
                }
            } catch (error) {
                commit("setErrorsDetailsRoom", error.response.data);
                commit("setStatusDetailsRoom", error.response.status);
            }
        },

        postPutEditBedroomsAXIOS: async function({ commit }, localDetailsBedrooms){
            //QUE AL REFRESCAR LA PAGINA EN UNA NUEVA ROOM AGREGADA, QUE NO BORRE LOS DATOS
            // console.log("AXIOS", localDetailsBedrooms)

            // let arrayRequestAddItemRegime = [];
            // let arrayErrors = []
            // let status;
            // for (const itemRegime of newArrayPostRegimes) {
            //     try {
            //         const requestAddItemRegime = await axios.post(`/api/regimes`, itemRegime);
            //         let trasformedRequest = requestAddItemRegime.data.data;
            //         trasformedRequest.componentID = itemRegime.componentID;
            //         arrayRequestAddItemRegime.push(trasformedRequest);
            //     } catch (error) {
            //         status = error.response.status;
            //         arrayErrors.push({error: error.response.data, componentID: itemRegime.componentID})
            //     }
            // }
            // if(arrayErrors == 0){
            //     commit("postAddRegimes", arrayRequestAddItemRegime);
            // }
            // else{
            //     commit("setErrorsRegimes", arrayErrors);
            //     commit("setStatusRegimes", status);
            // }
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
