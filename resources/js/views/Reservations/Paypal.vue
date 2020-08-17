<template>
<div>
 <div id="app">


  
       <v-alert
        text
        color="info"
      >
      <div>Haz clic <a :href="paypalLink">aquí</a> para validar tu pago en Paypal</div>
      
       
      </v-alert>

</div>
</div>

</template>

<script>
import {mapState, mapGetters } from 'vuex';
export default {
  data () {
    return {
    
    }
  },

computed:{
  ...mapState({
     paypalLink: state => state.PaymentModule.paypalLink,
    }),

     ...mapGetters([
      'getLink',
     ]),
},
  methods:{

     
  },


  mounted(){
  
  }
}
</script>
