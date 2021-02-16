import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import UsersModule from './UsersModule';
import BinnacleModule from './BinnacleModule';
import HotelModule from './HotelModule';
import PaymentModule from './PaymentModule';
import RoomModule from './RoomModule';
import CredentialsModule from './CredentialsModule';
import  disponibilityMoule from './disponibilityModule';
import bookingsModule from './bookingsModule';

const store = new Vuex.Store({

  modules:{
    UsersModule,
    BinnacleModule,
    HotelModule,
    PaymentModule,
    RoomModule,
    CredentialsModule,
    disponibilityMoule,
    bookingsModule,
  },
 
})

export default store;

/*import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/api/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            //console.log(response)
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
      })

    },
    destroyToken(context) {
      
      if (context.getters.loggedIn){
        
        return new Promise((resolve, reject) => {
          axios.post('/api/logout', '', {
              headers: { Authorization: "Bearer " + context.state.token }
            })
            .then(response => {
              //console.log(response)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
  
              resolve(response)
            })
            .catch(error => {
              //console.log(error)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')

              reject(error)
            })
        })

      }
    }
  }
})

export default store*/