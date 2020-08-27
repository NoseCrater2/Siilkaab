import axios from 'axios';

const CredentialsModule = {

    state:{
        credentials: [],
    },
    getters:{

    },
    mutations:{
        setCredentials(state,apiCredentials){
            state.credentials = apiCredentials;
        },
    },
    actions:{

        getCredentials: async function ({ commit, state }){
            if(state.credentials.length === 0){
                const request =  await axios
                .get("/api/credentials");
                const credentials = request.data.data
                commit('setCredentials',credentials)
            }else{
                
                return state.binnacles
            } 
    
          },
    },
}

export default CredentialsModule;