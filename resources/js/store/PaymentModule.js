import axios from 'axios';
const PaymentModule = {
    state :{
        paypalLink: null,
    },
    getters:{

        getLink(state){
            return state.paypalLink;
          },
    },
    mutations: {
      setLink(state,link){
        state.paypalLink = link;
      },

 
  
    },
    actions: {
        

      saveLink: async function ({commit},payment){
        try {
          const request = axios.post("/api/payments/pay",payment).then(res =>{
               commit('setLink',res.data);
          })
        } catch (error) {
          console.log(error)
        }
      },

  
      getCurrencies: async function({ commit }){
        const request =  await axios
            .get("/api/currencies")
        const currencies = request.data.data;
        commit('setCurrencies',currencies)
      },

  
  
    },
}

export default PaymentModule