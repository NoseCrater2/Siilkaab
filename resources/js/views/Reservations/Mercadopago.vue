<template>
<div>
 <div id="app">
    <v-form>
      <v-container>
        
        <v-row align="center" justify="center">
          <v-col cols="2">
            <v-img id="imgCard"
            :src="cardImage"
            aspect-ratio="1.9"
            ></v-img>
          </v-col>
        </v-row>
        

        <v-row >
          <v-col cols="12" sm="5">
            <v-text-field
              dense
              outlined
              label="Card number"
              prepend-inner-icon="mdi-credit-card"
              counter="16"
              v-model="formObject.cardNumber"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
             <v-text-field
              outlined
              dense
              label="CVC"
              counter="4"
              v-model="formObject.securityCode"
            ></v-text-field>
          </v-col>

           <v-col cols="12" sm="2">
             <v-text-field
              dense
              outlined
              label="Month"
              v-model="formObject.cardExpirationMonth"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
             <v-text-field
              dense
              outlined
              label="Year"
              v-model="formObject.cardExpirationYear"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="Name"
              prepend-inner-icon="mdi-account"
              v-model="formObject.cardholderName"
            ></v-text-field>
          </v-col>

           <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="Email"
              prepend-inner-icon="mdi-email"
             v-model="formObject.email"
            ></v-text-field>
          </v-col>
        </v-row>

     <!--   <v-row>
             <v-col cols="12" sm="4">
            <v-select
            dense
            :items="items"
            label="Doc Type"
            outlined
            id="docType" 
            data-checkout="docType"
          ></v-select>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              dense
              outlined
              label="Doc Number"
            ></v-text-field>
            </v-col>
        </v-row>-->

        <v-row align="center" justify="center">
        
            <p>Your payment will be converted to MXN</p>
         
        </v-row>

        <v-row>
        <div class="my-2">
          <v-btn @click="sendPayment()">Normal</v-btn>
        </div>
        </v-row>
        
      </v-container>
    </v-form>
 
</div>
</div>

</template>


<script>

import { mapActions, mapState } from 'vuex';
export default {
  data () {
    return {
      cardImage: '',
      formObject:{
        transaction_amount: null,
        cardNumber: null,
        cardholderName: null,
        cardExpirationMonth: null,
        cardExpirationYear: null,
        securityCode: null,
        email:null,
        card_network: null,
      },
      formToSend:{
        value: null,
        currency: null,
        platform: 2,
        email: null,
        card_network: null,
        card_token: null,
      },
      key: process.env.MIX_MERCADOPAGO_KEY,
      items:[
         "C.C",
      ],
    }
  },

  methods:{
    getMercadopagoInstance(){
      var formulary = document.createElement('script')
      formulary.setAttribute('src', 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js')
      formulary.setAttribute('id', 'MercadoPago')
      document.head.appendChild(formulary)
      return formulary;  
    },

     setCardNetwork(){
      this.mercadoPago.getPaymentMethod(
         {"bin": this.formObject.cardNumber.substring(0,6)},
        (function(status, response){
         this.formObject.card_network = response[0].id 
         this.cardImage = response[0].thumbnail
        }).bind(this)
       );  
     },

     sendPayment(){
       this.setCardNetwork();
       this.mercadoPago.createToken(this.formObject,
        (function (status, response) {
         if(status != 200 && status != 201){
           console.log(response.cause[0].description)
         }else{
           this.formToSend.value = this.objPayment.value;
           this.formToSend.currency = this.objPayment.currency;
           this.formToSend.email = this.formObject.email;
           this.formToSend.card_network = this.formObject.card_network;
           this.formToSend.card_token = response.id;
            this.$store.dispatch('saveLink',this.formToSend).then(()=>{
           //Resetear variables, ocultar o mostrar controles
          }); 
         }
       }).bind(this))

       /*
       value
       currency
       payment_platform
       payment_method
       email
       card_network
       card_token
       */
     
       console.log(this.formToSend)
     },

  },

  mounted(){
    this.getMercadopagoInstance().onload = () => {
      this.mercadoPago = window.Mercadopago;
      this.mercadoPago.setPublishableKey(this.key);
    }
  },

  props:{
    objPayment: Object,
  },
}
</script>

