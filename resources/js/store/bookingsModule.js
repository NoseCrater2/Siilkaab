import axios from 'axios';

const bookingsModule = {
    state: {
        bookings : {
            nights : 0,
            from : null,
            to : null,
            rooms: [],
        },
        reservations: [],
        reservation: null,
        notes: [],
        history: [],
        clientErrors: [],
        clientCode: 0,
        stateCode: 0,
    },

    getters: {
        totalPrice(state){
            let prices = 0
                state.bookings.rooms.map(function(room){
            let pt = parseFloat(room.rack_rate)
             return prices += pt
           })
            return prices * state.bookings.nights
            
        }
    },
    
    mutations: {
        setNewRoom(state, newRoom){
          state.bookings.rooms[newRoom.index] = newRoom.room
        },
        setGeneralInformation(state, information){
            state.bookings.from = information.from
            state.bookings.to = information.to
            state.bookings.nights = information.nights
        },

        resetRooms(state){
           state.bookings.rooms.length = 0
        },

        setReservations(state, reservations){
            state.reservations = reservations
        },

        setReservation(state, reservation){
            state.reservation = reservation
        },

        setNotes(state, notes){
            state.notes = notes
        },

        setHistory(state, history){
            state.history = history
        },

        addNote(state, note){
            state.notes.push(note)
        },
        deleteNote(state, currentNote){
            let  n = state.notes.find((note => note.id == currentNote.id))
            state.notes.splice(state.notes.indexOf(n),1)
        },

        setClientErrors(state, errors){
            state.clientErrors = errors
        },

        setClientCode(state, code){
            state.clientCode = code
        },

        setClientCode(state, code){
            state.stateCode = code
        }
    },

    actions: {
        addRoom: async function ({commit, state}, newRoom) {
         commit('setNewRoom',newRoom)
        },

        addGeneralInformation: async function ({commit, state}, information) {
            commit('setGeneralInformation',information)
        },

        resetRooms: function ({commit, state}) {
             commit('resetRooms')
        },

        getReservations: async function ({ commit}, id){
            const request =  await axios
            .get("/api/reservations/"+id);
            commit('setReservations',request.data.data)
         
        },

        getReservation: async function ({ commit}, id){
            const request =  await axios
            .get("/api/reservation/"+id);
            commit('setReservation',request.data.data)
         
        },

        getHistory: async function ({ commit}, id){
            const request =  await axios
            .get("/api/history-reservation/"+id);
            commit('setHistory',request.data.data)
         
        },

        saveReservation: async function ({ commit, state, getters}, personalData){
            let data = {
                nights : state.bookings.nights,
                from : state.bookings.from,
                to : state.bookings.to,
                guest_name : personalData.name,
                guest_last_name : personalData.last_name,
                guest_country : personalData.country,
                guest_names : JSON.stringify(personalData.guest_names),
                guest_email : personalData.email,
                guest_phone : personalData.phone,
                guest_petitions : personalData.special,
                check_in : personalData.checkin,
                payed : personalData.payed,
                total_price : getters.totalPrice,
                state : 'Confirmed',
                hotel_id : personalData.hotel,
                rooms: state.bookings.rooms,
            }


            const request =  await axios
            .post("/api/reservations/", data);
            commit('setReservation',request.data.data)
         
        },

        getNotes: async function ({ commit}, id){
            const request =  await axios
            .get("/api/notes/"+id);
            commit('setNotes',request.data.data)
         
        },

        saveNote: async function ({ commit}, data){
            const request =  await axios
            .post("/api/notes/", data);
            commit('addNote',request.data.data)
         
        },

        deleteNote: async function ({ commit}, id){
            const request =  await axios
            .delete("/api/notes/"+id);
            commit('deleteNote',request.data.data)
         
        },

        saveClientInformation: async function ({ commit}, reservation){
            try {
                const request =  await axios
                .post("/api/reservation-client/"+reservation.id, reservation);
                commit('setReservation',request.data.data)  
            } catch (error) {
                commit('setClientErrors',error.response.data)
                commit('setClientCode',error.response.status)
            }
        },

        saveState: async function ({ commit}, reservation){
            try {
                const request =  await axios
                .post("/api/reservation-state/"+reservation.id, reservation);
                commit('setReservation',request.data.data)  
            } catch (error) {
                commit('setStateCode',error.response.status)
            }
        },

    }
}

export default bookingsModule;