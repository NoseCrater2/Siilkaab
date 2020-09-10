<template>
  <div>
    <div id="app">
      <div v-if="statusMessage">
        <v-alert type="success">{{statusMessage}}</v-alert>
      </div>
      
      <v-alert text color="info">
        <div id="paypal-button-container"></div>
      </v-alert>


    </div>
  </div>
</template>

<script>
import {mapState, mapGetters } from 'vuex';
export default {
  data () {
    return {
      data : {
        platform: 1,
        currency: this.objPayment.currency,
        value: this.objPayment.value,
        idHotel: this.objPayment.idHotel,
      },

      statusMessage: null,
    }
  },

computed:{
  // ...mapState({
  //    paypalLink: state => state.PaymentModule.paypalLink,
  //   }),

  //    ...mapGetters([
  //     'getLink',
  //    ]),
},
  methods:{
 getPayPalButtonsInstance(){
    var formulary = document.createElement('script')
      formulary.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id='+process.env.MIX_PAYPAL_CLIENT_ID+'&merchant-id=sb-rwkeu2992317@business.example.com&currency='+this.data.currency);
      document.body.appendChild(formulary)
      return formulary;
    },
     
  },

  mounted(){

    this.getPayPalButtonsInstance().onload = () => {
      
      window.paypal.Buttons({
    createOrder: (function (data, actions) {
      return axios.post("/api/payments/pay",this.data)
      .then( data => {
       return data.data.id;
      })
    
    }).bind(this),

    onApprove: (function (data, actions) {
      data.paymentPlatformID =  1;
       return axios.post("/api/payments/success",data)
      .then( data => {
      this.statusMessage = data.data.payment;
      })
    }).bind(this)
  }).render('#paypal-button-container');
    }
    
  },
   props:{
    objPayment: Object,
  },
}
</script>
