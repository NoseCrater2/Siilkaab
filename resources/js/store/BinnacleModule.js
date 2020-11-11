import axios from 'axios';

const BinnacleModule = {

    state:{
        binnacles: [],
        details: [],
    },
    getters:{

    },
    mutations:{
        setBinnacles(state,apiBinnacles){
            state.binnacles = apiBinnacles;
        },

        setDetails(state,details){
            state.details = details;
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


        getBinnacleDetails: async function({ commit }, id) {
            try {
                const response = await axios.get(`/api/binnacles/`+id);
                let details = response.data.data;
                commit("setDetails", details);
            } catch (error) {
                console.log(error)
            }
        },
    },
}

export default BinnacleModule;