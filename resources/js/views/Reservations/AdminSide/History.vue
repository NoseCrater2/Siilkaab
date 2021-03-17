<template>
   <v-timeline align-top dense>
       <v-timeline-item v-for="(h, index) in history" :key="index" color="primary">
            
            <template v-slot:icon >
                <v-icon v-if="h.action == 'CREATED'" dark>mdi-content-save</v-icon>
                <v-icon v-else-if="h.action == 'UPDATED'" dark>mdi-content-save-edit</v-icon>
            </template>
            <template v-slot:opposite>
                <span>Tus eu perfecto</span>
            </template>
           <v-row >
               <v-col cols="2">
                   <strong> {{h.created_at}} </strong>
               </v-col>
               <v-col>
                   <strong>{{h.action}}</strong>
                   <div class="caption">
                     <v-menu 
                     :close-on-content-click="false"
                     nudge-width="200"
                     offset-x>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                            color="blue"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            >
                            Ver detalles
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>Por: {{h.user}}</v-card-title>
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr v-for="(d, index) in h.details" :key="index">
                                            <td>{{index}}</td>
                                            <td>{{d}}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <!-- <v-card-text>
                                <v-list dense>
                                    <v-list-item dense >
                                        <v-list-item-title>{{index}}</v-list-item-title>
                                        <v-list-item-subtitle>{{d}}</v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>
                            </v-card-text> -->
                        </v-card>
                     </v-menu>
                   </div>
               </v-col>
               <!-- <v-col cols="4">
                    <span>{{h.user}}</span>
               </v-col> -->
           </v-row>
       </v-timeline-item>
   </v-timeline>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },

    mounted(){
        this.$store.dispatch('getHistory',this.id)
    },

    computed:{
         ...mapState({
            history: state => state.bookingsModule.history,
        }),
    },

    props: ['id']
}
</script>