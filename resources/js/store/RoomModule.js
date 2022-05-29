import axios from "axios";

const RoomModule = {
    state: {
        progressbarNavbarStateRoomAndAmenity: 0,
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
        statusRoomsAmenities: 0,
        errorsBedrooms: [],
        statusBedrooms: 0,
        errorsBeds: [],
        statusBeds: 0
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
            (state.progressbarNavbarStateRoomAndAmenity = 0),
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
            (state.timeoutSnackbarRoomAmenities = 3500),
            (state.errorsBedrooms = []),
            (state.statusBedrooms = 0),
            (state.errorsBeds = []),
            (state.statusBeds = 0)
        },
        //Metodo que cambia de estado la variable que permite mostrar progreso en barra de navegacion
        setProgressbarNavbarStateRoomAndAmenity(state, flag){
            state.progressbarNavbarStateRoomAndAmenity = flag;
        },
        setAvailableRooms(state, avaRooms) {
            state.availableRooms = avaRooms;
        },
        setCurrentHotelRooms(state, currentHotelRooms) {
            state.currentHotelRooms = currentHotelRooms;
        },
        deleteRoom(state, deletedRoomId) {
            let r = state.currentHotelRooms.find(currentRoom => currentRoom.id === deletedRoomId);
            state.currentHotelRooms.splice(state.currentHotelRooms.indexOf(r), 1);
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
        postAddBedrooms(state, bedrooms){
            bedrooms.forEach(itemBedroom => {
                for (let stateBedroom of state.bedrooms) {
                    if(stateBedroom.componentID === itemBedroom.componentID){
                        Object.assign(stateBedroom, itemBedroom);
                    }
                }
            });
            //AHORA AGREGAMOS EL ID DE LOS BEDROOMS A LA VARIABLE DE ESTADO DE BEDS
            for (const itemBed of state.beds) {
                for (let index = 0; index < itemBed.length; index++) {
                    if(itemBed[index].idBedroom.toString().includes("NEW")){
                        let findedBedroom = state.bedrooms.find(itemBedroom=> itemBedroom.componentID == itemBed[index].idBedroom)
                        if(typeof(findedBedroom) != "undefined"){
                          itemBed[index].idBedroom = findedBedroom.id;
                          if(typeof(itemBed[index].obj) != 'undefined'){
                            if(Object.keys(itemBed[index].obj).length > 0){
                                itemBed[index].obj.bedroom_id = findedBedroom.id;
                            }
                          }
                        }
                    }
                }
            }
        },
        putUpdateBedrooms(state, bedrooms) {
            bedrooms.forEach(itemBedroom => {
                for (let stateBedroom of state.bedrooms) {
                    if(stateBedroom.id == itemBedroom.id){
                        Object.assign(stateBedroom, itemBedroom);
                    }
                }
            });
            //AHORA AGREGAMOS EL ID DE LOS BEDROOMS A LA VARIABLE DE ESTADO DE BEDS
            for (const itemBed of state.beds) {
                for (let index = 0; index < itemBed.length; index++) {
                    if(itemBed[index].idBedroom != "NEW"){
                        let findedBedroom = state.bedrooms.find(itemBedroom=> itemBedroom.id == itemBed[index].idBedroom)
                        if(typeof(findedBedroom) != "undefined"){
                          if(typeof(itemBed[index].obj) != 'undefined'){
                            if(Object.keys(itemBed[index].obj).length > 0){
                                itemBed[index].obj.bedroom_id = findedBedroom.id;
                            }
                          }
                        }
                    }
                }
            }
        },
        deleteBedrooms(state, bedrooms) {
            bedrooms.forEach(itemBedroom => {
                if(!itemBedroom['id'].toString().includes("NEW")){
                    let indexBedroom = state.bedrooms.findIndex(stateBedroom => stateBedroom.id == itemBedroom.id);
                    if(indexBedroom > -1){
                        state.bedrooms.splice(indexBedroom, 1);
                    }
                }
                else if(itemBedroom['id'].toString().includes("NEW")){
                    let indexBedroom = state.bedrooms.findIndex(stateBedroom => stateBedroom.componentID == itemBedroom.componentID);
                    if(indexBedroom > -1){
                        state.bedrooms.splice(indexBedroom, 1);
                    }
                }
            });
        },
        setBeds(state, beds) {
            state.beds = beds;
        },

        postAddBeds(state, beds){
            // let positionStateBeds = [];
            //ASIGNAMOS LAS BEDS AL STATE BEDS
            beds.forEach(itemBed => {
                state.beds.forEach((outStateBedElement, outIndexStateBedElement)=>{
                    state.beds[outIndexStateBedElement].forEach((inStateBedElement, inIndexStateBedElement)=>{
                        if(inStateBedElement.idBedroom == itemBed.bedroom_id){
                            if(typeof(inStateBedElement.obj) != 'undefined'){
                                if(Object.keys(inStateBedElement.obj).length > 0){
                                    if(inStateBedElement.componentID === itemBed.componentID){
                                        // positionStateBeds.push({outside: outIndexStateBedElement, inside: inIndexStateBedElement});
                                        let newItemBed = JSON.parse(JSON.stringify(itemBed));
                                        delete inStateBedElement.new;
                                        Object.assign(inStateBedElement.obj, newItemBed);
                                    }
                                }
                            }
                        }
                    })
                })
            });
            // if(positionStateBeds.length > 0){
            //     positionStateBeds.forEach(elementPositionBed=>{
            //         if(elementPositionBed.outside > -1 && elementPositionBed.inside > -1){
            //             console.log(elementPositionBed)
            //             //delete stateBed[elementPositionBed.outside][elementPositionBed.inside].new
            //         }
            //     })
            // }
        },

        putUpdateBeds(state, beds) {
            //ASIGNAMOS LAS BEDS AL STATE DE BEDS
            beds.forEach(itemBed => {
                state.beds.forEach((outStateBedElement, outIndexStateBedElement)=>{
                    state.beds[outIndexStateBedElement].forEach((inStateBedElement, inIndexStateBedElement)=>{
                        if(inStateBedElement.idBedroom == itemBed.bedroom_id){
                            if(typeof(inStateBedElement.obj) != 'undefined'){
                                if(Object.keys(inStateBedElement.obj).length > 0){
                                    if(inStateBedElement.id === itemBed.id){
                                        let updateItemBed = JSON.parse(JSON.stringify(itemBed));
                                        Object.assign(inStateBedElement.obj, updateItemBed);
                                    }
                                }
                            }
                        }
                    })
                })
            });
        },

        deleteBeds(state, beds) {
            //PRIMERO SE VERIFICA SI FUERON ELIMINADOS BEDROOMS Y EN BASE A ELLO ELIMINAMOS TODAS SUS BEDS
            let localDeleteBedroomIndex = [];
            state.beds.forEach((stateItemBed, index)=>{
                for (let indexFor = 0; indexFor < stateItemBed.length; indexFor++) {
                    if((typeof(stateItemBed[indexFor].deletedBedroom) != "undefined") || (typeof(stateItemBed[indexFor].deleted) != "undefined")){
                        if((stateItemBed[indexFor].deletedBedroom == "DELETED") || (stateItemBed[indexFor].deleted == "DELETED")){
                            localDeleteBedroomIndex.push({x: index, y: indexFor})
                        }
                    }
                }
            })
            //VERIFICAMOS Y SI localDeleteBedroomIndex en sus elementos son diferentes a -1 se eliminan todas las beds de dicho bedroom
            localDeleteBedroomIndex.forEach(elementIndex=>{
                if(elementIndex.x > -1 && elementIndex.y > - 1){
                    state.beds[elementIndex.x].splice(elementIndex.y, 1);
                }
            })

            //LUEGO, VERIFICAMOS BEDS ESPECIFICAS DE RESTAURANTES
            // let deletedSpecificBedsIndex = []
            // state.beds.forEach((stateBedroomBedsItem, indexStateBedroomBeds)=>{
            //     for (let index = 0; index < stateBedroomBedsItem.length; index++) {
            //         beds.forEach(localBedsItem=>{
            //             if(localBedsItem.obj.bedroom_id == stateBedroomBedsItem[index].idBedroom){
            //                 if(localBedsItem.obj.id != "NEW"){
            //                     if(localBedsItem.obj.id == stateBedroomBedsItem[index].obj.id) {
            //                         let newBed = JSON.parse(JSON.stringify(localBedsItem))
            //                         newBed.obj = {}
            //                         delete newBed.deleted;
            //                         deletedSpecificBedsIndex.push({indexStateBedroomBeds: {x: indexStateBedroomBeds, y: index}, componentID: stateBedroomBedsItem[index].componentID, newBed: newBed})
            //                     }
            //                 }
            //                 else if(localBedsItem.obj.id == "NEW"){
            //                     if(localBedsItem.componentID == stateBedroomBedsItem[index].componentID) {
            //                         let newBed = JSON.parse(JSON.stringify(localBedsItem))
            //                         newBed.obj = {}
            //                         delete newBed.deleted;
            //                         deletedSpecificBedsIndex.push({indexStateBedroomBeds: {x: indexStateBedroomBeds, y: index}, componentID: stateBedroomBedsItem[index].componentID, newBed: newBed})
            //                     }
            //                 }
            //             }
            //         })
            //     }
            // })

            //PROCEDEMOS A ELIMINAR LAS BEDS ESPECIFICAS
            // deletedSpecificBedsIndex.forEach(elementIndex=>{
            //     let findedIndex = state.beds[elementIndex.indexStateBedroomBeds.x].findIndex(elementFinded=> elementFinded.componentID == elementIndex.componentID)
            //     if(findedIndex > -1){
            //         state.beds[elementIndex.indexStateBedroomBeds.x][findedIndex] = JSON.parse(JSON.stringify(elementIndex.newBed))
            //     }
            // })
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
        setErrorsBedrooms(state, errors){
            state.errorsBedrooms = errors
        },
        setErrorsBeds(state, errors){
            state.errorsBeds = errors
        },
        //Mutacion para el estatus
        setStatusDetailsRoom(state, status){
            state.statusDetailsRoom = status
        },
        setStatusBedrooms(state, status){
            state.statusBedrooms = status
        },
        setStatusBeds(state, status){
            state.statusBeds = status
        }
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
                const request = await axios.get(`/api/hotel_rooms_amenities/${idHotel}`);
                let roomAmenities = request.data.data;
                commit("setRoomAmenities", roomAmenities);
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

        putEditBedrooms: async function({ commit, dispatch }, localDetailsBedrooms){
            //QUE AL REFRESCAR LA PAGINA EN UNA NUEVA ROOM AGREGADA, QUE NO BORRE LOS DATOS
            try {
                let postBedrooms = [];
                let putBedrooms = [];
                let arrayDeletedBedrooms = [];
                localDetailsBedrooms.forEach(itemBedroom=>{
                    if(typeof(itemBedroom.deletedBedroom) != 'undefined'){
                        if(itemBedroom.deletedBedroom == 'DELETED'){
                            arrayDeletedBedrooms.push(itemBedroom);
                        }
                    }
                    else if(typeof(itemBedroom.deletedBedroom) == 'undefined'){
                        if(itemBedroom['id'].toString().includes("NEW")){
                            postBedrooms.push(itemBedroom);
                        }
                        else if(!itemBedroom['id'].toString().includes("NEW")){
                            putBedrooms.push(itemBedroom);
                        }
                    }
                })
                if(arrayDeletedBedrooms.length > 0){
                    await dispatch("deleteBedroomsAXIOS", arrayDeletedBedrooms);
                }
                if(postBedrooms.length > 0){
                    await dispatch("postAddBedroomsAXIOS", postBedrooms);
                }
                if(putBedrooms.length > 0){
                    await dispatch("putUpdateBedroomsAXIOS", putBedrooms);
                }
            } catch (error) {
                commit("setErrorsBedrooms", error.response.data);
                commit("setStatusBedrooms", error.response.status);
            }
        },

        postAddBedroomsAXIOS: async function({ commit }, localPostBedrooms) {
            let arrayRequestAddItemBedroom = [];
            let arrayErrors = []
            let status;
            for (const itemBedroom of localPostBedrooms) {
                try {
                    let localItemBedroom = {}
                    for (const property in itemBedroom) {
                        if (itemBedroom[property] != null) {
                            localItemBedroom[property] = itemBedroom[property];
                        }
                    }
                    const requestAddItemBedroom = await axios.post(`/api/bedrooms`, localItemBedroom);
                    let trasformedRequest = requestAddItemBedroom.data.data;
                    trasformedRequest.componentID = localItemBedroom.componentID;
                    // trasformedRequest.idCompoBedroom = itemBedroom.idCompoBedroom;
                    arrayRequestAddItemBedroom.push(trasformedRequest);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: localItemBedroom.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("postAddBedrooms", arrayRequestAddItemBedroom);
            }
            else{
                commit("setErrorsBedrooms", arrayErrors);
                commit("setStatusBedrooms", status);
            }
        },

        putUpdateBedroomsAXIOS: async function({ commit }, localPutBedrooms) {
            let arrayRequestUpdateBedroom = [];
            let arrayErrors = []
            let status;
            for (const itemBedroom of localPutBedrooms) {
                try {
                    let localItemBedroom = {}
                    for (const property in itemBedroom) {
                        if (itemBedroom[property] != null) {
                            localItemBedroom[property] = itemBedroom[property];
                        }
                    }
                    const requestUpdateItemBedroom = await axios.put(
                        `/api/bedrooms/${localItemBedroom.id}`,
                        localItemBedroom
                    );
                    let trasformedRequest = requestUpdateItemBedroom.data.data;
                    trasformedRequest.componentID = localItemBedroom.componentID;
                    // trasformedRequest.idCompoBedroom = itemBedroom.idCompoBedroom;
                    arrayRequestUpdateBedroom.push(trasformedRequest)
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: localItemBedroom.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("putUpdateBedrooms", arrayRequestUpdateBedroom);
            }
            else{
                commit("setErrorsBedrooms", arrayErrors);
                commit("setStatusBedrooms", status);
            }
        },


        deleteBedroomsAXIOS: async function({ commit }, localDeleteBedrooms) {
            let arrayErrors = [];
            let status;
            let doneDeletes = [];
            for (const itemBedroom of localDeleteBedrooms) {
                try {
                    doneDeletes.push(itemBedroom)
                    if(typeof(itemBedroom.deletedBedroom) != 'undefined' && !itemBedroom['id'].toString().includes("NEW")){
                        const requestDeleteItemBedroom = await axios.delete(`/api/bedrooms/${itemBedroom.id}`);
                    }
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemBedroom.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("deleteBedrooms", doneDeletes);
            }
            else{
                commit("setErrorsBedrooms", arrayErrors);
                commit("setStatusBedrooms", status);
            }
        },

        putEditBeds: async function({ commit, dispatch }, localArrayBeds) {
            try {
                let postBeds = [];
                let putBeds = [];
                let arrayDeletedBeds = [];
                localArrayBeds.forEach(itemBed=>{
                    for (let index = 0; index < itemBed.length; index++) {
                        if(typeof(itemBed[index].deletedBedroom) != 'undefined'){
                            if(itemBed[index].deletedBedroom == 'DELETED'){
                                if(typeof(itemBed[index].obj) != 'undefined'){
                                    if(Object.keys(itemBed[index].obj).length > 0){
                                        arrayDeletedBeds.push(itemBed[index]);
                                    }
                                }
                            }
                        }
                        else if(typeof(itemBed[index].deletedBedroom) == 'undefined'){
                            if(typeof(itemBed[index].deleted) != 'undefined'){
                                if(itemBed[index].deleted == 'DELETED'){
                                    if(typeof(itemBed[index].obj) != 'undefined'){
                                        if(Object.keys(itemBed[index].obj).length > 0){
                                            arrayDeletedBeds.push(itemBed[index]);
                                        }
                                    }
                                }
                            }
                            else if(typeof(itemBed[index].deleted) == 'undefined'){
                                if(typeof(itemBed[index].obj) != 'undefined'){
                                    if(Object.keys(itemBed[index].obj).length > 0){
                                        if(itemBed[index].obj.id == 'NEW'){
                                            postBeds.push(itemBed[index]);
                                        }
                                        else if(itemBed[index].obj.id != 'NEW'){
                                            putBeds.push(itemBed[index]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                if(arrayDeletedBeds.length > 0){
                    await dispatch("deleteBedsAXIOS", arrayDeletedBeds);
                }
                if(postBeds.length > 0){
                    await dispatch("postAddBedsAXIOS", postBeds);
                }
                if(putBeds.length > 0){
                    await dispatch("putUpdateBedsAXIOS", putBeds);
                }
            } catch (error) {
                commit("setErrorsBeds", error.response.data);
                commit("setStatusBeds", error.response.status);
            }
        },

        postAddBedsAXIOS: async function({ commit }, localPostBeds) {
            let arrayRequestAddItemBed = [];
            let arrayErrors = []
            let status;
            for (const itemBed of localPostBeds) {
                try {
                    const requestAddItemBed = await axios.post(`/api/beds`, itemBed.obj);
                    let trasformedRequest = requestAddItemBed.data.data;
                    trasformedRequest.componentID = itemBed.componentID;
                    trasformedRequest.idCompoStandartArrangementBeds = itemBed.idCompoStandartArrangementBeds;
                    arrayRequestAddItemBed.push(trasformedRequest);
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemBed.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("postAddBeds", arrayRequestAddItemBed);
            }
            else{
                commit("setErrorsBeds", error.response.data);
                commit("setStatusBeds", error.response.status);
            }
        },

        putUpdateBedsAXIOS: async function({ commit }, localPutBeds) {
            let arrayRequestUpdateItemBed = [];
            let arrayErrors = []
            let status;
            for (const itemBed of localPutBeds) {
                try {
                    const requestUpdateItemBed = await axios.put(
                        `/api/beds/${itemBed.obj.id}`,
                        itemBed.obj
                    );
                    let trasformedRequest = requestUpdateItemBed.data.data;
                    trasformedRequest.componentID = itemBed.componentID;
                    trasformedRequest.idCompoStandartArrangementBeds = itemBed.idCompoStandartArrangementBeds;
                    arrayRequestUpdateItemBed.push(trasformedRequest)
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemBed.componentID})
                }
            }
            if(arrayErrors == 0){
                commit("putUpdateBeds", arrayRequestUpdateItemBed);
            }
            else{
                commit("setErrorsBeds", error.response.data);
                commit("setStatusBeds", error.response.status);
            }
        },

        deleteBedsAXIOS: async function({ commit }, localDeleteBeds) {
            let arrayErrors = [];
            let status;
            let doneDeletes = [];
            for (const itemBed of localDeleteBeds) {
                try {
                    doneDeletes.push(itemBed)
                    if((typeof(itemBed.deletedBedroom) != 'undefined' || typeof(itemBed.deleted) != 'undefined') && itemBed['obj'].id != 'NEW'){
                        const requestDeleteItemBed = await axios.delete(`/api/beds/${itemBed['obj'].id}`);
                    }
                } catch (error) {
                    status = error.response.status;
                    arrayErrors.push({error: error.response.data, componentID: itemBed.componentID})
                }
            }
            if(arrayErrors == 0){
                console.log("DONEDELETES", doneDeletes)
                commit("deleteBeds", doneDeletes);
            }
            else{
                commit("setErrorsBeds", error.response.data);
                commit("setStatusBeds", error.response.status);
            }
        },
        deleteRoomAXIOS: async function({ commit }, roomId){
            try {
                const request = await axios.delete(`/api/rooms/${roomId}`);
                commit("deleteRoom", roomId);
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
