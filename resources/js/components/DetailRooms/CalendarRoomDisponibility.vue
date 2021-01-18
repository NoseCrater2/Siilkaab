<template>

            <v-row justify="space-between">
                <v-col cols="12">
                <v-toolbar flat>
                    <v-btn 
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                    >MES ACTUAL</v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>
                          mdi-chevron-right
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                         {{ $refs.calendar.title }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-calendar ref="calendar" v-model="focus" :now="today" :value="today" color="primary">

                </v-calendar>
                </v-col>
                <v-col cols="12" class="mt-11">
                    <div class="text-right">
                        <span class="mx-2" style="color: green">
                            <v-icon color="green" left>mdi-checkbox-blank</v-icon>
                            Disponible
                        </span>
                        <span class="mx-2" style="color: orange" outlined>
                            <v-icon color="orange" left>mdi-checkbox-blank</v-icon>
                            Baja disponibilidad
                        </span>
                        <span  class="mx-2" style="color: red" outlined>
                            <v-icon color="red" left>mdi-checkbox-blank</v-icon>
                            Agotado
                        </span>
                        <span class="mx-2" style="color: gey" outlined>
                            <v-icon color="grey" left>mdi-checkbox-blank</v-icon>
                            No disponible
                        </span>
                    </div>
                </v-col>
            </v-row>

</template>

<script>
import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment);
export default {
    data(){
        return{
            focus: 'month',
            today: moment().format('YYYY-MM-DD')
        }

    },

    mounted(){
        this.$refs.calendar.checkChange()
    },

    methods:{
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },

        setToday () {
            this.focus = ''
        },
    }
}
</script>