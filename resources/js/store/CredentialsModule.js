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

        saveCredential(state,newCredential){
            state.credentials.push(newCredential);
        },

        editCredentials(state,editedCredential){
            state.credentials.map(function(currentCredential){
                if(currentCredential.id === editedCredential.id){
                    Object.assign(currentCredential,editedCredential);
                }
            });
        },

        deleteCredentials(state, deletedCredential) {
            deletedCredential.forEach(currentCredential => {
                let  u = state.credentials.find((credential => credential.id === currentCredential))
                state.credentials.splice(state.credentials.indexOf(u),1)
            });
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

          setCredencials: async function({commit,state}, objCredential){
              try {
                const request =  await axios
                .post("/api/credentials",objCredential);
                const credentials = request.data.data
                commit('saveCredential',credentials)
                commit('setStatus',request.status);
              } catch (error) {
                commit('setErrors',error.response)
              }
           
          },

          editCredentials: async function ({ commit},objCredential){
            try {
              const request = await axios
              .put("/api/credentials/"+objCredential.id,objCredential)
              commit('editCredentials',request.data.data);
             commit('setStatus',request.status);
            } catch (error) {
              commit('setErrors',error.response)
             // commit('setStatus',error.response.status);
            }
        },
    },
}

export default CredentialsModule