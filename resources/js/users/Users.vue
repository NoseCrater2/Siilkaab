<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
    <div v-if="isLoadedPromises == false">
      <v-app id="inspire">
        <div class="text-center mb-7">
          <span class="text-h4 text-uppercase font-weight-bold">Usuarios</span>
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
          <span class="text-h4 text-uppercase font-weight-bold">Usuarios</span>
        </div>

        <v-card outlined tile>
          <v-data-table
            v-model="selected"
            item-key="id"
            show-select
            :headers="headers"
            :items="users"
            :single-select="singleSelect"
            multi-sort
            :search="search"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white" :style="!$vuetify.breakpoint.mdAndUp ? 'height: 146px !important' : ''">
                        <v-row align="center" justify="center">
                            <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="2" order-md="1" order-lg="1" order-xl="1">
                              <div v-show="selected==! []?false:true">
                                  <v-btn small depressed rounded outlined block color="red" @click="showDeleteDialog()">
                                    <!-- <span class="black--text">ELIMINAR SELECCIÓN</span> -->
                                    <v-icon dark>mdi-delete-sweep</v-icon>ELIMINAR
                                  </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" order="1" order-md="2" order-lg="2" order-xl="2">
                              <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Buscar usuario"
                                single-line
                                hide-details
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="6" order="3" order-md="3" order-lg="3" order-xl="3">
                                <v-btn small depressed rounded outlined block color="info" @click="dialog = !dialog">
                                  <!-- <span class="black--text">NUEVO HOTEL</span> -->
                                  <v-icon left dark>mdi-plus</v-icon>NUEVO USUARIO
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-toolbar>
                    <div class="d-flex align-center ml-2 my-n4">
                        <v-switch v-model="singleSelect" label="Selección única" class="pa-3" dense inset></v-switch>
                    </div>
                    <v-dialog v-model="dialog" persistent max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-form v-model="valid">
                            <v-container>
                              <v-row>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    label="Nombre(s)*"
                                    v-model="editedItem.name"
                                    required
                                    :error-messages="getErrors.data.name"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field label="Apellido(s)" v-model="editedItem.last_name" :error-messages="getErrors.data.last_name"  ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                  <v-text-field label="Email*" v-model="editedItem.email" required :error-messages="getErrors.data.email"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    :items="user.type == 'super'?superTypes:administratorTypes"
                                    label="Tipo*"
                                    :error-messages="getErrors.data.type"
                                    v-model="editedItem.type"
                                    required
                                  ></v-select>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                  :items="['Español', 'English']"
                                  label="Lenguaje*"
                                  v-model="editedItem.language"
                                  :error-messages="getErrors.data.language"
                                  required
                                  ></v-select>
                                </v-col>

                                <v-col cols="12">
                                  <div v-if="timezones !== []">
                                    <v-autocomplete
                                      :items="timezones"
                                      label="Zona horaria*"
                                      :error-messages="getErrors.data.timezone"
                                      v-model="editedItem.timezone"
                                      required
                                    ></v-autocomplete>
                                  </div>
                                  <div v-else>
                                    <v-autocomplete
                                      :items="[]"
                                      label="Zona horaria*"
                                      v-model="editedItem.timezone"
                                      :error-messages="getErrors.data.type.timezone"
                                      required
                                    ></v-autocomplete>
                                  </div>
                                </v-col>

                                <v-col cols="12">

                                    <v-autocomplete
                                    v-if="hotels"
                                      v-model="editedItem.hotels"
                                      :hint="!isEditing ? 'Click en el icono para editar' : 'Clic en el icono para guardar'"
                                      :items="hotels"
                                      :readonly="!isEditing"
                                      item-text="title"
                                      item-value="id"
                                      :label="`Hoteles — ${isEditing ? 'Editable' : 'Solo vista'}`"
                                      multiple
                                      chips
                                      small-chips
                                      persistent-hint
                                      return-object
                                      :error-messages="getErrors.data.hotels"
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

                                </v-col>
                                <v-col cols="12" v-if="user.type == 'super' && editedItem.type != 'super'">
                                  <v-alert dense type="info" style="font-size: 12px;">
                                    Usuarios Administradores pueden o no tener un usuario Administrador a su cargo,
                                    usuarios Managers deben tener un usuario Administrador a su cargo.
                                  </v-alert>
                                  <v-autocomplete
                                  v-model="editedItem.parent_id"
                                  :items="users"
                                  item-text="all_name"
                                  item-value="id"
                                  chips
                                  small-chips
                                  persistent-hint
                                  :error-messages="getErrors.data.parent"
                                  prepend-icon="mdi-account"
                                  >
                                  </v-autocomplete>
                                </v-col>
                                <v-col cols="12" v-if="user.type == 'administrator'">
                                  <v-alert dense type="info" style="font-size: 12px;">
                                   Podrá administrar todos los usuarios que usted cree o que se le asignen posteriormente
                                  </v-alert>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>

                          </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
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
import {mapState ,mapGetters, mapActions } from 'vuex';
export default {
  data(){
    return {
        isLoadedPromises: false,
      editedIndex: -1,
      dialog: false,
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
      administratorTypes: ['administrator', 'manager'],
      superTypes: ['super','administrator', 'manager'],
      actualHotels: [
        {id:null},
        {hotels:null}
      ],

      editedItem:{
        name:null,
        last_name:null,
        email: null,
        type:null,
        language:null,
        timezone:null,
        currency:null,
        currency_id:'',
      },

      defaultItem:{
        name:'',
        last_name:'',
        email: '',
        type:'',
        language:'',
        timezone:'',
        currency:'',
        currency_id:'',
      },

      defaultErrors : {
        data:[{
          currency_id:[],
          email:[],
          language:[],
          name:[],
          timezone:[],
          type:[],
          }]
      },

      headers: [
        { text: 'ID', value: 'id', align: 'center' },
        { text: 'Tipo', value: 'type', align: 'center' },
        { text: 'Nombre', sortable: true, value: 'all_name', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
      ],
    };
  },

  computed:{
    formTitle(){
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },

    ...mapState({
      user: state => state.user,
      users: state => state.UsersModule.users,
      hotels: state => state.HotelModule.hotels,
      // assignHotels:state => state.HotelModule.assignHotels,
      timezones: state => state.UsersModule.timezones,
    }),

    ...mapGetters([
      'getErrors',
      'getStatus',
      // 'getAssignHotels',
      'getUserId',
     ]),

  },

  mounted(){
      this.chargePromises();
  },

  methods:{
    ...mapActions(['getUsers', 'getTimeZones', 'getCurrencies', 'getHotelsForAdmin']),
    async chargePromises(){
        let promiseUsers = 1;
        let promiseTimeZones = 1;
        let promiseCurrencies = 1;
        let promiseHotelsAdmin = 1;
        promiseUsers = this.getUsers();
        promiseTimeZones = this.getTimeZones();
        promiseCurrencies = this.getCurrencies();
        promiseHotelsAdmin = this.getHotelsForAdmin();
        await Promise.all([promiseUsers, promiseTimeZones, promiseCurrencies, promiseHotelsAdmin]).then(values => {
            this.isLoadedPromises = true;
        }).catch(()=>{
            this.isLoadedPromises = true;
        });
    },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({},item)
    //   this.$store.dispatch('getAssignHotels',item.id).then(()=>{
      this.dialog = true
    //   // this.selectedHotels = this.$store.getters.getAssignHotels
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
    if(this.user.type == 'administrator'){
      this.editedItem.parent_id = this.user.id

    }
    if (this.editedIndex > -1) {
      try {
        this.$store.dispatch('editUser',this.editedItem).then(()=>{
          if(this.getStatus=== 200){
            this.close()
         }
        })
        } catch (error) {

        }

    } else {
      try {
        this.$store.dispatch('saveUser',this.editedItem).then(()=>{
          if(this.getStatus=== 200){
            this.close()
          }
          })
        } catch (error) {
        }
      }
    },
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
