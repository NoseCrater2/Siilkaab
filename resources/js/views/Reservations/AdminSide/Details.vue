<template>
    <v-expansion-panels flat v-model="panel" multiple>
        <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0" >
              <div class="d-inline">
                  <v-icon>mdi-calendar-month</v-icon>
                  RESERVA
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-chart-pie</v-icon>
                  IMPORTES
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-check-bold</v-icon>
                  CONFIRMACIÓN
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-account</v-icon>
                  CLIENTE
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
            </v-expansion-panel-content>
        </v-expansion-panel>

         <v-expansion-panel class="my-4">
            <v-expansion-panel-header color="#E0E0E0">
                <div class="d-inline">
                  <v-icon>mdi-bed</v-icon>
                  HABITACIÓN
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti fugit laboriosam impedit consectetur excepturi nulla, atque quo iste, a obcaecati nisi architecto vero sit nobis ipsam sunt rem quis doloribus.
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    data(){
        return{
            panel: 0,
        }
    }
}
</script>