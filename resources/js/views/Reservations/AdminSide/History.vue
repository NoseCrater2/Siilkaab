<template>
    <div>
        <v-card class="pa-2" outlined tile>
            <div class="d-flex align-center ml-1">
                <v-row>
                    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                        <div>
                            <h1 class="font-weight-bold" :class="!$vuetify.breakpoint.mdAndUp ? 'text-center': ''">Historial de reserva</h1>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-4"></v-divider>
            <v-timeline dense>
                <v-timeline-item v-for="(h, index) in history" :key="index" color="primary" class="mb-4" large>
                    <template v-slot:icon>
                        <v-icon v-if="h.action == 'CREATED'" dark>mdi-content-save</v-icon>
                        <v-icon v-else-if="h.action == 'UPDATED'" dark>mdi-content-save-edit</v-icon>
                    </template>
                        <v-card elevation="3" :width="$vuetify.breakpoint.mdAndUp ? '85%' : '100%'">
                            <v-row align="center" justify="center">
                               <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                                   <div class="ml-3">
                                        <div>
                                            <strong>{{h.action}}</strong>
                                        </div>
                                        <div class="caption">
                                            <v-chip
                                                class="white--text mr-3"
                                                color="grey"
                                                label
                                                small
                                            >
                                             {{h.created_at}}
                                            </v-chip>
                                        </div>
                                   </div>
                               </v-col>
                                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                                    <div class="caption d-flex" :class="$vuetify.breakpoint.mdAndUp ? 'justify-end mr-3' : 'justify-center'">
                                        <v-menu
                                            :close-on-content-click="false"
                                            nudge-width="200"
                                            offset-x>
                                            <template v-slot:activator="{on, attrs}">
                                                <v-btn
                                                    elevation="0"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    small
                                                    color="primary"
                                                >
                                                    <v-icon left>mdi-help-circle</v-icon>Ver detalles
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>Usuario: {{h.user}}</v-card-title>
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr v-for="(d, index) in h.details" :key="index">
                                                                <td>{{index}}</td>
                                                                <td class="text-right">{{d}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },

    computed:{
         ...mapState({
            history: state => state.bookingsModule.history,
        }),
    },

    props: ['id']
}
</script>
