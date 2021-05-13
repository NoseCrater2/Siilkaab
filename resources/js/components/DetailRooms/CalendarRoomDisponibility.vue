<template>
    <v-row justify="space-between">{{events}}
        <v-col cols="12">
            <v-toolbar flat>
                <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                    >MES ACTUAL</v-btn
                >
                <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
            </v-toolbar>
            <v-calendar
                ref="calendar"
                v-model="currentMonth"
                type="month"
                :events="events"
                :event-overlap-threshold="30"
                event-overlap-mode="stack"
                :event-color="getEventColor"
                :event-more="false"
                @change="getEvents"
                color="primary"
            >
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
                <span class="mx-2" style="color: red" outlined>
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
import { mapState } from "vuex";
import Moment from "moment"; //Importamos moment.js
import { extendMoment } from "moment-range"; //Importamos el plugin de rangos
const moment = extendMoment(Moment);
export default {
    data() {
        return {
            colors: ["green", "orange", "red"],
            events: [],
            currentMonth: "month",
            today: moment().format("YYYY-MM-DD")
        };
    },
    computed: {
        ...mapState({
            ratesByRoom: state => state.disponibilityMoule.ratesByRoom
        })
    },
    methods: {
        getEvents({ start, end }) {
            let localEvents = [];
            let copyRatesByRoom = this.ratesByRoom;
            this.ratesByRoom.forEach(itemRate => {
                let colorEvent = '';
                if (itemRate.day != null) {
                    if(itemRate.bed_rooms >= 5){
                        colorEvent = 'green'
                    }
                    else if(itemRate.bed_rooms < 5 && itemRate.bed_rooms > 0){
                        colorEvent = 'orange'
                    }
                    else if(itemRate.bed_rooms <= 0){
                        colorEvent = 'red'
                    }
                    localEvents.push({
                        name: `$${itemRate.rack}`,
                        start: itemRate.day,
                        end: itemRate.day,
                        color: colorEvent,
                        category: 'first'
                    });
                } 
                else if (itemRate.start != null && itemRate.end != null) {
                    if(itemRate.bed_rooms >= 5){
                        colorEvent = 'green'
                    }
                    else if(itemRate.bed_rooms < 5 && itemRate.bed_rooms > 0){
                        colorEvent = 'orange'
                    }
                    else if(itemRate.bed_rooms <= 0){
                        colorEvent = 'red'
                    }
                    let arrayDays = [];
                    copyRatesByRoom.forEach(copyItemRate=>{
                        if(copyItemRate.day != null){
                            arrayDays.push(copyItemRate.day)
                        }
                    })
                    let sortedArrayDays = arrayDays.sort((a, b) => moment(a).diff(moment(b)))
                    sortedArrayDays.forEach(itemDay=>{
                        let putOnLocalEvent = true;
                        localEvents.forEach(itemEvent=>{
                            if(itemEvent.category == 'first' && itemEvent.start == itemDay){
                                putOnLocalEvent = false
                            }
                        })
                        if(putOnLocalEvent){
                            localEvents.push({
                                name: `$${itemRate.rack}`,
                                start: itemRate.start,
                                end: itemRate.start,
                                color: colorEvent,
                                category: 'second'
                            });
                        }
                    })
                    // localEvents.forEach(itemEvent=>{
                        // if(itemEvent.category == 'first' && (itemEvent.category == 'second' && (moment(itemEvent.start).isBetween(itemRate.start,itemRate.end,null,"[]") == false))){
                            // putOnLocalEvent = false
                        // }
                    // })
                } 
                else if (
                itemRate.monday > 0 ||
                itemRate.tuesday > 0 ||
                itemRate.wednesday > 0 ||
                itemRate.thursday > 0 ||
                itemRate.friday > 0 ||
                itemRate.saturday > 0 ||
                itemRate.sunday > 0) {
                    if(itemRate.bed_rooms >= 5){
                        colorEvent = 'green'
                    }
                    else if(itemRate.bed_rooms < 5 && itemRate.bed_rooms > 0){
                        colorEvent = 'orange'
                    }
                    else if(itemRate.bed_rooms <= 0){
                        colorEvent = 'red'
                    }

                    let startDate = moment(start.date);
                    let endDate = moment(end.date);
                    let day = [];
                    for (const item in itemRate) {
                        if(item == 'sunday' || item == 'monday' || item == 'tuesday' || item == 'wednesday' || item == 'thursday' || item == 'friday' || item == 'saturday'){
                            if(itemRate[item] > 0){
                                let localLocale = moment();
                                localLocale.locale('en')
                                day.push({day: localLocale.day(item).day(), rate: itemRate[item]});
                            }
                        }
                    }

                    day.forEach(itemDay=>{
                        let currentStartDate = startDate.clone();
                        let nextWeek = 7;
                        if(currentStartDate.day() != itemDay.day){
                            if(currentStartDate.day() < itemDay.day){
                                nextWeek = (itemDay.day - currentStartDate.day()) + currentStartDate.day();
                                currentStartDate.day(nextWeek)
                            }
                            else if(currentStartDate.day() > itemDay.day){
                                nextWeek = 7;
                                currentStartDate.day(itemDay.day + nextWeek)
                            }
                        }
                        while (currentStartDate.isSameOrBefore(endDate)) {
                            let putOnLocalEvent = true;
                            localEvents.forEach(itemEvent=>{
                                if((itemEvent.category == 'first' && itemEvent.start == currentStartDate.clone().format('YYYY-MM-DD')) || (itemEvent.category == 'second' && (moment(itemEvent.start).isBetween(itemRate.start,itemRate.end,null,"[]") == false))){
                                    putOnLocalEvent = false
                                }
                            })
                            if(putOnLocalEvent){
                                localEvents.push({
                                    name: `$${itemDay.rate}`,
                                    start: currentStartDate.clone().format('YYYY-MM-DD'),
                                    end: currentStartDate.clone().format('YYYY-MM-DD'),
                                    color: colorEvent,
                                    category: 'third'
                                });
                            }
                            nextWeek = 7;
                            currentStartDate.day(itemDay.day + nextWeek)
                        }
                    })
                }
            });
            this.events = localEvents;
        },
        getEventColor(event) {
            return event.color
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },

        setToday() {
            this.currentMonth = "";
        }
    }
};
</script>
