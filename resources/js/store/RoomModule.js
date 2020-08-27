import axios from 'axios';

const RoomModule = {

    state:{
        availableRooms: [],
    },
    getters:{

    },
    mutations:{
        setAvailableRooms(state,avaRooms){
            state.availableRooms = avaRooms;
        },
    },
    actions:{
        //NO TOQUES ESTE MÉTODO
        getAvailabilityRooms: async function ({ commit, state },idHotel){
          
                const request =  await  axios
               // .get(`/api/rooms/1/availability?from=${this.date}&to=${this.date2}`)
                .get(`/api/rooms/${idHotel}/availability`)
                .then(response => {
                 //   console.log(response);
                commit('setAvailableRooms',response.data)
                 })
    
          },
    },
}

export default RoomModule;