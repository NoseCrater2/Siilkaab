<template>
    <div>
        <v-container class="elevation-1 outlined" fluid>
            <div v-if="credentials === []">
                <v-app id="inspire">
                    <div class="text-center mb-7">
                      <span class="text-h4 text-uppercase font-weight-bold">Credenciales de Pago</span>
                    </div>
                    <v-data-table
                    item-key="title"
                    class="elevation-1"
                    loading
                    loading-text="Obteniendo datos...">
                    </v-data-table>
                </v-app>
            </div>
            <div v-else>
                <v-app id="inspire" >
                    <div class="text-center mb-7">
                      <span class="text-h4 text-uppercase font-weight-bold">Credenciales de Pago</span>
                    </div>
                    <v-card outlined tile>
                      <v-data-table
                        v-model="selected"
                        item-key="id"
                        show-select
                        :headers="headers"
                        :items="credentials"
                        :single-select="singleSelect"
                        multi-sort
                        :search="search"
                        >
                            <template v-slot:top>
                                <v-toolbar flat color="white" :style="!$vuetify.breakpoint.mdAndUp ? 'height: 146px !important' : ''">
                                    <v-row align="center" justify="center">
                                      <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="2" order-md="1" order-lg="1" order-xl="1">
                                        <div v-show="selected==! []?false:true">
                                            <v-btn small depressed rounded outlined block color="red">
                                              <v-icon dark>mdi-delete-sweep</v-icon>ELIMINAR
                                            </v-btn>
                                        </div>
                                      </v-col>
                                      <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" order="1" order-md="2" order-lg="2" order-xl="2">
                                        <v-text-field
                                          v-model="search"
                                          append-icon="mdi-magnify"
                                          label="Buscar registro"
                                          single-line
                                          hide-details
                                          outlined
                                          dense
                                        ></v-text-field>
                                      </v-col>
                                        <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="3" order-md="3" order-lg="3" order-xl="3">
                                            <v-btn small depressed rounded outlined block color="info" @click="dialog = !dialog">
                                              <v-icon left dark>mdi-plus</v-icon>NUEVA CREDENCIAL
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-toolbar>
                                <div class="d-flex align-center ml-2 my-n4">
                                    <v-switch v-model="singleSelect" label="Selección única" class="pa-3" dense inset></v-switch>
                                </div>

                                <v-dialog v-model="dialog" persistent max-width="600px">

                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-form v-model="valid">
                                        <v-container>
                                          <v-row>

                                             <v-col cols="12">
                                            <div v-if="hotels !== []">
                                                <v-autocomplete
                                                  v-model="editedItem.hotels"
                                                  :hint="!isEditing ? 'Click en el icono para editar' : 'Clic en el icono para guardar'"
                                                  :items="hotels"
                                                  :readonly="!isEditing"
                                                  item-text="title"
                                                  item-value="id"
                                                  :label="`Hoteles — ${isEditing ? 'Editable' : 'Solo vista'}`"
                                                  multiple
                                                  :error-messages="getErrors.data.hotels"
                                                  chips
                                                  small-chips
                                                  persistent-hint
                                                  prepend-icon="mdi-city"
                                                  >
                                                  <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition
                                                      mode="out-in">
                                                      <v-icon
                                                        :key="`icon-${isEditing}`"
                                                        :color="isEditing ? 'success' : 'info'"
                                                        @click="isEditing = !isEditing"
                                                        v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                                                      ></v-icon>
                                                    </v-slide-x-reverse-transition>
                                                  </template>
                                                </v-autocomplete>
                                              </div>
                                            </v-col>

                                            <v-tabs
                                            v-model="tab"
                                            background-color="primary"
                                            centered
                                            dark
                                            icons-and-text
                                            >
                                              <v-tabs-slider></v-tabs-slider>

                                              <v-tab>
                                                Paypal
                                                <!-- <v-img
                                                src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                                                >
                                                </v-img> -->
                                              </v-tab>

                                              <v-tab>
                                                MercadoPago
                                                <!-- <v-img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMq6RgxTk3ZM1HcXVxwVBBn-mHrgWE6IRFoZTVnY0pkM2R4UbqKtRGgS_3WBV_kyHlgWea6agkGdVN0lyx2OgV--HdNpVxj6YWTA&usqp=CAU&ec=45695924"
                                                >
                                                </v-img> -->
                                              </v-tab>

                                              <v-tabs-items v-model="tab">
                                                <v-tab-item>
                                                  <v-col cols="12">
                                              <v-text-field
                                              label="Paypal*"
                                              v-model="editedItem.paypal"
                                              required :error-messages="getErrors.data.paypal"
                                              placeholder="ab-cdefg1234567@businness.example.com"
                                              ></v-text-field>
                                            </v-col>
                                                </v-tab-item>

                                                <v-tab-item>
                                                   <div v-if="editedItem.mercadopago_client_id">
                                             <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">


                                               <h3 class="headline">MercadoPago</h3>
                                                   <div>
                                                     La autorización del vendedor para que Siilkaab pueda solicitar pagos a su nombre dura hasta:
                                                     <h2>{{ editedItem.expiration_at}}</h2>
                                                     Puede actualizar las credenciales en cualquier momento antes de la fecha de expiración.
                                                   </div>

                                                   <v-divider
                                                     class="my-4 info"
                                                     style="opacity: 0.22"
                                                   ></v-divider>

                                                   <v-row
                                                     align="center"
                                                     no-gutters
                                                   >
                                                     <v-col class="grow">

                                                  Si la autorización caduca, los clientes no podrán pagar por MercadoPago y se tiene que volver a sincronizar la cuenta.
                                                       </v-col>

                                                     <v-col class="shrink">
                                                       <v-btn
                                                          :loading="loading"
                                                          :disabled="loading"
                                                          outlined
                                                          class="ma-2 teal--text"
                                                          @click="updateCredentials(editedItem.id)"
                                                        >
                                                          ACTULIZAR
                                                          <v-icon right dark>mdi-reload</v-icon>
                                                        </v-btn>
                                                     </v-col>
                                                   </v-row>


                                              </v-alert>
                                           </div>

                                           <div v-else>
                                              <v-btn
                                                :disabled="ableToRedirect"
                                                rounded
                                                block
                                                color="primary"
                                                @click="getAuthorization(editedItem.id)">
                                              SINCRONIZAR CUENTA DE MERCADOPAGO
                                              </v-btn>
                                           </div>
                                                </v-tab-item>
                                              </v-tabs-items>

                                            </v-tabs>








                                          </v-row>
                                        </v-container>
                                      </v-form>

                                      </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                          <v-btn color="blue darken-1"
                                                 text
                                                 @click="save"
                                                 >Guardar
                                          </v-btn>
                                        </v-card-actions>
                                  </v-card>

                                </v-dialog>

                                <v-dialog v-model="deleteDialog" persistent max-width="290">
                                  <v-card>
                                    <v-card-title class="headline">¿Eliminar usuarios?</v-card-title>
                                    <v-card-text>
                                      Está a punto de eliminar uno o más registros de usuario.
                                      Esta acción no se puede deshacer. ¿Continuar?
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                      <v-btn color="gray darken-1" text @click="deleteDialog = false">CANCELAR</v-btn>
                                      <v-btn color="red darken-1" text @click="deleteItem()">ELIMINAR</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-row align="center" justify="center">
                                  <div>
                                    <v-btn
                                      icon
                                      @click="editItem(item)"
                                      class="text-decoration-none mx-4">
                                      <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                            </template>

                        </v-data-table>
                    </v-card>
                </v-app>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';
import { mapMutations, mapGetters, mapModules} from 'vuex';
export default {
  data(){
    return {
     app_id: process.env.MIX_MERCADOPAGO_APP_ID,
      editedIndex: -1,
      dialog: false,
      tab: null,
      loading: false,
      loader: null,
      isDisabled: false,
      mercadopagoPage: false,
      deleteDialog: false,
      valid:false,
      search:'',
      singleSelect: false,
      selected: [],
      loading: false,
      loader: null,
      isEditing: false,
      selectedHotels:null,
      showDeleteButton: false,
      userIds: {
        userIds:[]
      },

      actualHotels: [
        {id:null},
        {hotels:null}
      ],

      editedItem:{
        paypal:null,
        mercadopago_client_id:null,
        expiration_at: null,
        hotels: null,
      },

      defaultItem:{
        paypal:'',
        mercadopago_client_id:'',
        expiration_at: '',
        hotels: [],
      },

      defaultErrors : {
        data:[{
          paypal:[],
          mercadopago_client_id:[],
          expiration_at:[],
          }]
      },

      headers: [
        { text: 'ID',sortable: true,value: 'id', align: 'center' },
        { text: 'PayPal', value: 'paypal', align: 'center' },
        { text: 'MercadoPago', value: 'mercadopago_client_id', align: 'center' },
        { text: 'Expiración', value: 'expiration_at', align: 'center' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
      ],
    };
  },


  computed:{
    formTitle(){
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
    },

    ableToRedirect(){
      return this.editedIndex === -1 ? true : false
    },

    ...mapState({
      credentials: state => state.CredentialsModule.credentials,
      hotels: state => state.HotelModule.hotels,
      assignHotels:state => state.HotelModule.assignHotels,

    }),

     ...mapGetters([
       'getErrors',
       'getStatus',
    //   'getAssignHotels',
    //   'getUserId',
      ]),

  },

  mounted(){
    this.$store.dispatch('getHotelsForAdmin')
    this.$store.dispatch('getCredentials');
    if(this.$route.query.code){
     // console.log(this.$route.query)
      axios.post('api/payments/getCode/',{paymentPlatformID:2,code:this.$route.query.code, id:this.$route.query.state}).then(res => {
        window.location.href = process.env.MIX_MERCADOPAGO_REDIRECT_URI;
      //Mostrar response en la vista
      });
    }
  },

  methods:{
    editItem (item) {
      this.editedIndex = this.credentials.indexOf(item)
      this.editedItem = Object.assign({},item)
      this.dialog = true
    //   this.$store.dispatch('getAssignHotels',item.id).then(()=>{
    //
    //   this.selectedHotels = this.$store.getters.getAssignHotels
    // })
  },

  showDeleteDialog () {
    this.deleteDialog = true
  },

  deleteItem(){

  this.selected.forEach(element => {
    this.userIds.userIds.push(element.id)
  });

   this.$store.dispatch('deleteUser',this.userIds).then(()=>{
      this.close();
    });

  },

  close () {
     this.userIds.userIds= []
    this.selectedHotels = null
    this.selected = []
    this.isEditing = false
    this.actualHotels[0].id = null
    this.actualHotels[1].hotels = null
    this.dialog = false
    this.deleteDialog = false
    this.$nextTick(() => {
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
      })
    this.$store.commit('setErrors',this.defaultErrors)
  },

  save () {
    if (this.editedIndex > -1) {
      try {

         this.$store.dispatch('editCredentials',this.editedItem).then(()=>{
           if(this.getStatus=== 200){
            this.close()
          }
         })
        } catch (error) {

        }

    } else {
      try {

         this.$store.dispatch('setCredencials',this.editedItem).then(()=>{
           if(this.getStatus=== 200){
             this.close();
           }
           })
        } catch (error) {
        }
      }
    },

    getAuthorization(idRegister){
      window.location.href= 'https://auth.mercadopago.com.mx/authorization?client_id='+process.env.MIX_MERCADOPAGO_APP_ID+'&response_type=code&platform_id=mp&state='+idRegister+'&redirect_uri='+process.env.MIX_MERCADOPAGO_REDIRECT_URI;
    },

    updateCredentials(idRegistro){
      this.loading = true
      axios.post('api/payments/updateCode/',{paymentPlatformID:2,id:idRegistro}).then(res => {
      //Mostrar response en la vista
      this.loading = false;
      });
    }
  }

}
</script>

<style scoped>
/* No borres este estilo aunque lo marque mal el visual. Asi es */
@media only screen and (max-width: 959px) {
    >>>.v-toolbar__content{
      height: 146px !important;
    }
}
</style>



