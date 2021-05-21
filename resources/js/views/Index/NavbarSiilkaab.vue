<template>
  <div>
    <v-app-bar
      app
      height="64px"
      color="blue darken-3"
      dark
      flat
      :clipped-left="$vuetify.breakpoint.smAndUp || $vuetify.breakpoint.xsOnly"
    >
      <v-toolbar-title class="ml-n6 pl-4">
        <div class="d-flex align-center">
          <v-img
              src="/img/logolidhber/lidhberpng.png"
              height="43"
              width="43"
              contain
          ></v-img>
          <span class="hidden-sm-and-down ml-3">Siilkaab Panel</span>
        </div>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
           max-width="400"
            bottom
            offset-y
            offset-x
            transition="slide-y-transition">
           <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="ma-1" rounded depressed dark v-bind="attrs" v-on="on">
                <v-avatar color="primary">
                  <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>
              </v-btn>
           </template>

           <v-list >
            <v-list-item >
              
         
            <v-list-item-content>
              <v-list-item-title class="title">{{user.name+' '+user.last_name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.type}}</v-list-item-subtitle>
              <!-- <v-list-item-subtitle></v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
            <v-divider></v-divider>
           
          </v-list> 

          <v-list nav dense>
            <v-list-item-group color="primary">
              <!-- <v-list-item >
                <v-list-item-icon>
                  <v-icon >mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Perfil</v-list-item-title>
                </v-list-item-content>    
              </v-list-item> -->
              

            <v-list-item @click="logOut()">
              <v-list-item-icon>
                <v-icon >mdi-logout</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content>
                <v-list-item-title>Salir</v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
           </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  
  computed:{
    ...mapState({
        isLoggedIn: (state) => state.isLoggedIn,
        user: (state) => state.user,
      }),
  },
  name: "NavbarSiilkaab",

  methods:{
    async logOut(){
      try {
        axios.post("/logout");
        this.$store.dispatch('logout').then(() => {
          this.$router.push({name: 'Login'})
        })
      } catch (error) {
        this.$store.dispatch('logout')
      }
    }
  }
};
</script>