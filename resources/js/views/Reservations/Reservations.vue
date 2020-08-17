<template>
    <div>
        <div id="app">
            <v-app id="inspire">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="3">
                                <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                 max-width="290px"
                                offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="date"
                                    label="DESDE"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                     outlined
                                    v-bind="attrs"
                                    v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                max-width="290px"
                                offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="date2"
                                    label="HASTA"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                     outlined
                                    v-bind="attrs"
                                    v-on="on">
                                    </v-text-field>
                                </template>
                                    <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-menu
                                ref="menu3"
                                v-model="menu3"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="searchTerms"
                                    label="OCUPACIÓN"
                                    prepend-inner-icon="mdi-account-multiple"
                                    readonly
                                     outlined
                                    v-bind="attrs"
                                    v-on="on">
                                    </v-text-field>
                                </template>
                                <!--Aquí va el menú--> 
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="3" >
                                <v-btn
                                x-large
                                block
                                :loading="loading"
                                :disabled="loading"
                                class="white--text"
                                 color="primary"
                                 @click="search()">
                                <v-icon left dark>mdi-magnify</v-icon>
                                 BUSCAR
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-app>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    menu3: false,
    searchTerms: null,
    loader: null,
    loading: false,
    status: null,
    errors: null,
    }
  },

  methods:{
    search(){
     this.loading = true;
     this.errors = null;

     axios
     .get(`/api/rooms/1/availability?from=${this.date}&to=${this.date2}`)
     .then(response => {
       this.status = response.status;
      })
     .catch(error =>{
       if(422=== error.response.status){
         this.errors = error.response.data.errors; 
       }

       this.status = error.response.status;
     }).then(() => {this.loading = false});
    },

    errorFor(field){
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
    }

  },

  computed:{
    hasErrors(){
      return 422 === this.status && this.errors !== null;
    },

    hasAvailavility(){
      return 200 === this.status;
    },

    noAvailiability(){
      return 404 === this.status;
    }
  },
  mounted(){
  
  },

  props:{
   
  },

  watch:{
      loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  }
}
</script>

<style>

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>