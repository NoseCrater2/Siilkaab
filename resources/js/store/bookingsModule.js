import axios from 'axios';

const bookingsModule = {
    state: {
        bookings : {
            nights : 0,
            from : null,
            to : null,
            rooms: [],
        },
    },

    getters: {
        totalPrice(state){
            let prices = 0
            state.bookings.rooms.map(function(room){
                let pt = parseFloat(room.rack_rate)
             return prices += pt
           })
            return prices
            
        }
    },
    
    mutations: {
        setNewRoom(state, newRoom){
          state.bookings.rooms[newRoo] = newRoom.room  
        },
        setGeneralInformation(state, information){
            state.bookings.from = information.from
            state.bookings.to = information.to
            state.bookings.nights = information.nights
        },

        resetRooms(state){
            state.bookings.rooms.length = 0
        },
    },

    actions: {
        addRoom: async function ({commit, state}, newRoom) {
         commit('setNewRoom',newRoom)
        },

        addGeneralInformation: async function ({commit, state}, information) {
            commit('setGeneralInformation',information)
        },

        resetRooms: async function ({commit, state}) {
            commit('resetRooms')
        },
    }
}

export default bookingsModule;