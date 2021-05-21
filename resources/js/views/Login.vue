<template>
  <v-app>
      <v-row justify="center" align="center" class="back">
        <v-col cols="12"  >
          <v-card width="300" height="214" color="#cce0ec"  tile class="ma-auto">
            <v-form ref="login-form" style="padding: 30px 25px;">
              <v-text-field :error-messages="loginErrors.email" flat solo dense v-model="credentials.email" placeholder="Email"> </v-text-field>
              <v-text-field
              :error-messages="loginErrors.password"
              v-model="credentials.password"
              :append-icon="show ? icon : ''"
              :rules="[rules.required]"
              :type="show3 ? 'text' : 'password'"
              flat
              solo
              dense
              placeholder="Contraseña"
              class="input-group--focused"
              @click:append="show3 = !show3"
             
            ></v-text-field>
              <v-btn :loading="loading" color="#0088cc" class="white--text" style="text-transform: none;" block  @click="login()">Acceder</v-btn>
            </v-form>
          </v-card>
          <div style="text-align: center; font-size: 13px;" class="mt-4">
            <router-link  style="text-decoration: none; color: white" to="#">¿Has olvidado la contraseña?</router-link>
          </div>
        </v-col>
      </v-row>
   </v-app>
</template>

<script>
import axios from 'axios'
import {logIn} from '../utils/auth';
export default {
  data() {
    return {
     loading: false,
      show3: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        emailMatch: () => (`The email and password you entered don't match`),
      },
      loginErrors: [],
      credentials: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      this.loading = true
      try {
         await axios.get('/sanctum/csrf-cookie');
        await axios.post('/login',{
          email : this.credentials.email,
          password : this.credentials.password
        })
        logIn()
        this.$store.dispatch("loadUser").then(() => {
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath)
          this.loading = false
        })
          
      } catch (error) {
        this.loading = false
        this.loginErrors = error.response.data.errors
      }
    }
  },

  computed: {
    show(){
     return this.credentials.password? true: false;
    },
    icon(){
     return this.show3 ? 'mdi-eye': 'mdi-eye-off';
    }
  }
};
</script>
<style>

.back{
  background: #034983;
  background: -webkit-linear-gradient(top right, #034983, #0185c8);
  background: -moz-linear-gradient(top right, #034983, #0185c8);
  background: linear-gradient(to bottom left, #034983, #0185c8);
}

</style>