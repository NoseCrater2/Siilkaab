import axios from 'axios';

const BinnacleModule = {

    state:{
        binnacles: [],
    },
    getters:{

    },
    mutations:{
        setBinnacles(state,apiBinnacles){
            state.binnacles = apiBinnacles;
        },
    },
    actions:{
        getBinnacles: async function ({ commit, state }){
            if(state.binnacles.length === 0){
                const request =  await axios
                .get("/api/binnacles");
                const binnacles = request.data.data
                commit('setBinnacles',binnacles)
            }else{
                
                return state.binnacles
            } 
    
          },
    },
}

export default BinnacleModule;