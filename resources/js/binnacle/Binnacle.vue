<template>
    <div>
        <div id="app">
            <v-app id="inspire">
                <v-overlay :value="!chargeView" opacity="0.7" z-index="8">
                    <div>
                        <div>
                            <v-progress-circular
                                class="ml-14 mb-2"
                                indeterminate
                                size="64"
                            ></v-progress-circular>
                        </div>
                        <div>Cargando información...</div>
                    </div>
                </v-overlay>
                <v-card class="pa-2" outlined tile>
                    <div class="d-flex align-center ml-1">
                        <v-row>
                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="mt-n4">
                                <div>
                                    <h1 class="font-weight-bold text-center">Historial</h1>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <v-divider v-if="chargeView"></v-divider>
                    <div v-if="chargeView">
                        <v-timeline
                            :reverse="true"
                            :dense="$vuetify.breakpoint.smAndDown"
                        >
                            <v-timeline-item
                                v-for="(binnacle, i) in details"
                                :key="i"
                                color="orange"
                                small
                            >
                                <template v-slot:opposite>
                                    <span
                                        :class="`headline font-weight-bold `"
                                        v-text="binnacle.created_at"
                                    ></span>
                                </template>

                                <v-card>
                                    <v-expansion-panels focusable>
                                        <v-expansion-panel>
                                            <div
                                                v-if="
                                                    binnacle.action ===
                                                        'CREATED'
                                                "
                                            >
                                                <v-expansion-panel-header
                                                    :class="`${colors.create}`"
                                                >
                                                    <v-responsive
                                                        class="text-uppercase dense"
                                                    >
                                                        {{
                                                            binnacle.action
                                                        }}
                                                        over table
                                                        <strong>{{
                                                            binnacle.model
                                                        }}</strong>
                                                    </v-responsive>
                                                </v-expansion-panel-header>
                                            </div>
                                            <div
                                                v-if="
                                                    binnacle.action ===
                                                        'UPDATED'
                                                "
                                            >
                                                <v-expansion-panel-header
                                                    :class="`${colors.update}`"
                                                >
                                                    <v-responsive
                                                        class="text-uppercase dense"
                                                    >
                                                        {{
                                                            binnacle.action
                                                        }}
                                                        over table
                                                        <strong>{{
                                                            binnacle.model
                                                        }}</strong>
                                                    </v-responsive>
                                                </v-expansion-panel-header>
                                            </div>
                                            <div
                                                v-if="
                                                    binnacle.action ===
                                                        'DELETED'
                                                "
                                            >
                                                <v-expansion-panel-header
                                                    :class="`${colors.delete}`"
                                                >
                                                    <v-responsive
                                                        class="text-uppercase dense"
                                                    >
                                                        {{
                                                            binnacle.action
                                                        }}
                                                        over table
                                                        <strong>{{
                                                            binnacle.model
                                                        }}</strong>
                                                    </v-responsive>
                                                </v-expansion-panel-header>
                                            </div>

                                            <v-expansion-panel-content>
                                                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                                                    <v-simple-table dense>
                                                        <template v-slot:default>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(details,
                                                                    d) in binnacle.details"
                                                                    :key="d"
                                                                >
                                                                    <td class="font-weight-bold">{{ d }}</td>
                                                                    <td class="text-right">{{details}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </div>
                </v-card>
            </v-app>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            chargeView: false,
            colors: {
                create: "blue lighten-2",
                update: "green lighten-2",
                delete: "red lighten-2",
                forcedelete: "black lighten-2"
            }
        };
    },
    computed: {
        ...mapState({
            details: state => state.BinnacleModule.details
        })
    },
    mounted() {
        if (this.$route.params.id) {
            this.getPromiseBinnacle(this.$route.params.id);
        }
    },

    methods: {
        ...mapActions(["getBinnacleDetails"]),
        async getPromiseBinnacle(id){
            let promiseBinnacle = 1;
            promiseBinnacle = this.getBinnacleDetails(id);
            await Promise.all([promiseBinnacle]).then(values => {
                this.chargeView = true;
            }).then(()=>{
                this.chargeView = true;
            });
        }
    }
};
</script>

<style scoped>
.v-expansion-panel-header {
    color: #fff;
}
</style>
