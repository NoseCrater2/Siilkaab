<template>
    <div>
        <v-container class="elevation-1 outlined" fluid>
            <div v-if="isLoadedPromises == false">
               <v-app id="inspire">
                    <div class="text-center mb-7">
                      <span class="text-h4 text-uppercase font-weight-bold">Historial de Usuarios</span>
                    </div>
                   <v-data-table
                    item-key="title"
                    class="elevation-1"
                    loading
                    loading-text="Obteniendo datos..."
                    ></v-data-table>
              </v-app>
            </div>

            <div v-else>
                <v-app id="inspire">
                    <div class="text-center mb-7">
                      <span class="text-h4 text-uppercase font-weight-bold">Historial de Usuarios</span>
                    </div>
                    <v-card outlined tile>
                        <v-data-table
                            v-model="selected"
                            item-key="Fecha"
                            show-select
                            :headers="headers"
                            :items="binnacles"
                            :single-select="singleSelect"
                            multi-sort
                            :search="search">

                            <template v-slot:top>
                                <v-toolbar flat color="white" :style="!$vuetify.breakpoint.mdAndUp ? 'height: 146px !important' : ''">
                                  <v-row align="center" justify="center">
                                    <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" order="2" order-md="1" order-lg="1" order-xl="1">
                                      <div v-show="selected==! []?false:true">
                                          <v-btn small depressed rounded outlined block color="red">
                                            <!-- <span class="black--text">ELIMINAR SELECCIÓN</span> -->
                                            <v-icon dark>mdi-delete-sweep</v-icon>ELIMINAR
                                          </v-btn>
                                      </div>
                                    </v-col>
                                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" order="1" order-md="2" order-lg="2" order-xl="2">
                                      <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar usuario"
                                        single-line
                                        hide-details
                                        outlined
                                        dense
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" order="3" order-md="3" order-lg="3" order-xl="3">
                                        <!-- <v-btn small depressed rounded outlined block color="info" :to="{name: 'Hotel'}">
                                          <v-icon left dark>mdi-plus</v-icon>NUEVO HOTEL
                                        </v-btn> -->
                                    </v-col>
                                  </v-row>
                                </v-toolbar>
                                <div class="d-flex align-center ml-2 my-n4">
                                  <v-switch v-model="singleSelect" label="Selección única" class="pa-3" dense inset></v-switch>
                                </div>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-row align="center" justify="center">
                                  <div>
                                    <v-btn
                                      icon
                                      :to="{name: 'binnacle' , params: {id: item.id}}"
                                      class="text-decoration-none mx-4">
                                      <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-app>
            </div>
        </v-container>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
export default {

    data(){
        return {
            isLoadedPromises: false,
            search:'',
            singleSelect: false,
            selected: [],
            loading: false,
            columns: 3,
            headers: [
                {
                  text: 'Última acción',
                  sortable: true,
                  value: 'created_at',
                  align: 'center'
                },
                { text: 'Usuario', value: 'user', align: 'center' },
                { text: 'Acción', value: 'action', align: 'center' },
                { text: 'Modelo', value: 'model', align: 'center' },
                { text: 'Dirección IP', value: 'ip', align: 'center' },
                { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
            ],
        };
    },
    computed:{
        ...mapState({
            binnacles: state => state.BinnacleModule.binnacles,
        }),
    },

    mounted(){
        this.chargePromises();
    },

    methods:{
        ...mapActions(['getBinnacles']),
        async chargePromises(){
            let promiseBinnacles = 1;
            promiseBinnacles = this.getBinnacles();
            await Promise.all([promiseBinnacles]).then(values => {
                this.isLoadedPromises = true;
            }).catch(()=>{
                this.isLoadedPromises = true;
            });
        },
        deleteItem (item) {

        },
    }
}
</script>

<style scoped>
/* No borres este estilo aunque lo marque mal el visual. Asi es */
@media only screen and (max-width: 959px) {
    >>>.v-toolbar__content{
      height: 146px !important;
    }
}
</style>
