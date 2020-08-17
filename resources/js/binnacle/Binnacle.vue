<template>
    <div>
        <div id="app">
  <v-app id="inspire">
      <div v-if="binnacles">

     
    <v-timeline :reverse=true :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item
      v-for="(binnacle, i) in binnacles"
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
              <div v-if="binnacle.action==='CREATED'">
                <v-expansion-panel-header  :class="`${colors.create}`">
                  <v-responsive class="text-uppercase dense" >
                    {{binnacle.action }} over table  <strong>{{binnacle.model }}</strong>
                  </v-responsive>
                </v-expansion-panel-header>
              </div>
              <div v-if="binnacle.action==='UPDATED'">
                <v-expansion-panel-header  :class="`${colors.update}`">
                  <v-responsive class="text-uppercase dense" >
                    {{binnacle.action }} over table  <strong>{{binnacle.model }}</strong>
                  </v-responsive>
                </v-expansion-panel-header>
              </div>
              <div v-if="binnacle.action==='DELETED'">
                <v-expansion-panel-header  :class="`${colors.delete}`">
                  <v-responsive class="text-uppercase dense" >
                    {{binnacle.action }} over table  <strong>{{binnacle.model }}</strong>
                  </v-responsive>
                </v-expansion-panel-header>
              </div>


            <v-expansion-panel-content>
              <div v-for="(details,d) in binnacle.details" :key="d">
                <strong>{{d}}</strong>: {{details}} <br>
              </div>
            </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
        
        </v-card>
      </v-timeline-item>
    </v-timeline>
     </div>
  </v-app>
</div>
    </div>
</template>

<script>

export default {
    
     data () {
        return{
            binnacles:null,
            loading: false,
            colors:{
              create: 'blue lighten-2',
              update: 'green lighten-2',
              delete: 'red lighten-2',
              forcedelete: 'black lighten-2',
            }
   
        }
  },
    computed:{
       
    },
    mounted(){
        this.loading = true;
    if (this.$route.params.id) {
      this.getHotel(this.$route.params.id);
    }
    },

    methods:{

    getHotel(id) {
      axios.get(`/api/binnacles/${id}`).then(response => {
        this.binnacles = response.data.data;
        this.loading = false;
      });
    }
    }
}
</script>

<style scoped>
.v-expansion-panel-header{
  color:#fff;
}
</style>