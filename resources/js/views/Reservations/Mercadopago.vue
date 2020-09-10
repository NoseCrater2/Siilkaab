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
               :error-messages="cardErrors.card"
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
              :error-messages="cardErrors.securityCode"
              v-model="formObject.securityCode"
            ></v-text-field>
          </v-col>

           <v-col cols="12" sm="2">
             <v-text-field
              dense
              outlined
              label="Month"
              :error-messages="cardErrors.month"
              v-model="formObject.cardExpirationMonth"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2">
             <v-text-field
              dense
              outlined
              :error-messages="cardErrors.year"
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
              :error-messages="cardErrors.name"
              prepend-inner-icon="mdi-account"
              v-model="formObject.cardholderName"
            ></v-text-field>
          </v-col>

           <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              
              :error-messages="errors?errors.email:null"
              label="Email"
              prepend-inner-icon="mdi-email"
             v-model="formObject.email"
            ></v-text-field>
          </v-col>
        </v-row>


        <v-row align="center" justify="center">
        
            <p>Your payment will be converted to MXN</p>

             <v-btn :loading="loading" block color="primary" @click="sendPayment()">PAGAR</v-btn>
         
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
      cardErrors:{
        month:null,
        year:null,
        name:null,
        securityCode:null,
        card: null,
      },
      loading : false,
      errors : null,
      cardImage: '',
      formObject:{
        transaction_amount: 0,
        cardNumber: '',
        cardholderName: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        securityCode: '',
        email:'',
        card_network: '',
      },
      formToSend:{
        value: null,
        currency: null,
        platform: 2,
        email: null,
        card_network: null,
        card_token: null,
        idHotel: null,
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
        this.loading = true;
       this.mercadoPago.createToken(this.formObject,
        (function (status, response) {
         if(status != 200 && status != 201){
           this.loading = false;
           this.orderErrors(response.cause)
         }else{
          this.setCardNetwork();
          this.cleanErrors();
           this.formToSend.value = this.objPayment.value;
           this.formToSend.currency = this.objPayment.currency;
           this.formToSend.email = this.formObject.email;
           this.formToSend.card_network = this.formObject.card_network;
           this.formToSend.card_token = response.id;
           this.formToSend.idHotel = 1;
         
          const request = axios.post("/api/payments/pay",this.formToSend)
          .then(res =>{
            this.loading = false;
             console.log(res);
            })
          .catch(err => {
            
            this.errors = err.response.data;
            this.loading = false;
          });
       

         }
       }).bind(this))
      
     },

     orderErrors(errors){
       errors.forEach(error => {
         switch (error.code) {
           case "325":
             this.cardErrors.month = "Parámetro inválido"
             break;
             case "326":
             this.cardErrors.year = "Parámetro inválido"
             break;
             case "221":
             this.cardErrors.name = "El nombre no puede quedar vacío"
             break;
             case "E302":
             this.cardErrors.securityCode = "Parámetro inválido"
             break;
             case "208":
             this.cardErrors.month = "No puede quedar vacío"
             break;
             case "E301":
             this.cardErrors.card = "Parámetro inválido"
             break;
           default:
             break;
         }
       });
     },

     cleanErrors(){
       this.cardErrors.forEach(error => {
         error = null;
       });
     }

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

