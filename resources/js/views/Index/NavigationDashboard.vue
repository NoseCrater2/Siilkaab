<template>
  <div>
    <v-navigation-drawer
      app
      permanent
      color="#2b3b4a"
      dark
      width="301"
      height="100%"
      :mini-variant.sync="navigationDrawerSize"
      :clipped="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smAndUp"
    >
      <v-list dense nav class="py-0" style="padding-left: 0px">
        <div v-for="(item, index) of itemsElementList" :key="item.title">
          <!-- <v-list-item
            v-if="index===0"
            two-line
            :class="'px-0' && navigationDrawerSize && paddingAvatar"
          >
            <v-list-item-avatar color="red">
              <span class="white--text headline">GS</span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>GUILLERMO SAMANO</v-list-item-title>
              <v-list-item-subtitle>Superusuario</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item v-if="index < 3" :style="item.borderStyle" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group :value="$vuetify.breakpoint.mdAndUp ? fnIsActive(item.children): false" v-if="index >= 3" @click.stop="expandNavigationDrawer(index-2)">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon :style="item.borderStyle">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <div v-for="subItems of item.children" :key="subItems.id">
              <v-list-item
               v-if="subItems.availableFor.includes(user.type)"
                link
                :to="subItems.route"
                :style="subItems.borderStyle"
              >
                <v-list-item-icon>
                  <v-icon :style="subItems.borderStyleSub">{{ subItems.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ subItems.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "NavigationDashboard",
  data() {
    return {
      modelIsActiveTab: false,
      route: "",
      paddingAvatar: "", //Clase que se añade al avatar del navigation si este esta en la config mini
      arrayClickStatus: [false, false, false], //Array que contendra los estados del clic de cada menu desplegable del nav drawer
      flagClickStatusCOMPUTED: false, //Bandera que unificara el resultado de 'arrayClickStatus' para comprobarse en la Computed
      itemsElementList: [
        {
          icon: "mdi-poll",
          text: "Panel",
          borderStyle: "padding-left: 13px",
          route: "/panel"
        },
        {
          icon: "mdi-bell",
          text: "Reservas",
          borderStyle: "padding-left: 13px",
          route: '/reservations'
        },
        {
          icon: "mdi-clipboard-list",
          text: "Disponibilidad y Tarifas",
          borderStyle: "padding-left: 13px",
          route: '/disponibility'
        },
        {
          icon: "mdi-office-building",
          text: "Gestionar Alojamientos",
          borderStyle: "border-left: 5px solid #cba818",
          children: [
            {
              icon: "mdi-domain",
              text: "Hoteles",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:
                "border-left: 2px solid #cba818; padding-left: 3px",
              route: "/hotels",
              availableFor: ['administrator','super','manager'],
            },
            {
              icon: "mdi-bed",
              text: "Habitaciones",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:
                "border-left: 2px solid #cba818; padding-left: 3px",
              route: "/rooms-home",
              availableFor: ['administrator','super','manager'],
            },
            // {
            //   icon: "mdi-cash-multiple",
            //   text: "Tarifas",
            //   borderStyle: "padding-left: 37px; text-decoration: none;",
            //   borderStyleSub:
            //     "border-left: 2px solid #cba818; padding-left: 3px"
            // },
            {
              icon: "mdi-label-percent",
              text: "Descuentos",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:
                "border-left: 2px solid #cba818; padding-left: 3px",
              availableFor: ['administrator','super','manager'],
            },
            {
              icon: "mdi-tag-plus",
              text: "Extras",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:"border-left: 2px solid #cba818; padding-left: 3px",
              availableFor: ['administrator','super','manager'],
            },
            // {
            //   icon: "mdi-image-multiple",
            //   text: "Fotos",
            //    route: "/images",
            //   borderStyle: "padding-left: 37px; text-decoration: none;",
            //   borderStyleSub:
            //     "border-left: 2px solid #cba818; padding-left: 3px"
            // }
          ]
        },
        {
          icon: "mdi-cogs",
          text: "Sistema",
          borderStyle: "border-left: 5px solid #7a429b",
          children: [
            {
              icon: "mdi-account-group",
              text: "Usuarios",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:
                "border-left: 2px solid #7a429b; padding-left: 3px",
              route: "/users",
              availableFor: ['administrator','super'],
            },
            {
              icon: "mdi-history",
              text: "Historial de Usuarios",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub:
                "border-left: 2px solid #7a429b; padding-left: 3px",
              route: "/binnacles",
               availableFor: ['administrator','super'],
            },
            {
              icon: "mdi-account-cash",
              text: "Ajustes de Pago",
              route:"/payment-options",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub: "border-left: 2px solid #7a429b; padding-left: 3px",
              availableFor: ['administrator','super'],
            },

            {
              icon: "mdi-api",
              text: "Ajustes de API",
              borderStyle: "padding-left: 37px; text-decoration: none;",
              borderStyleSub: "border-left: 2px solid #7a429b; padding-left: 3px",
              availableFor: ['administrator','super'],
            }
          ]
        }
      ]
    };
  },
  methods: {
    fnIsActive(arrayChildren){
      let returned = false;
      arrayChildren.forEach(itemArrayChildren=>{
        if(typeof(itemArrayChildren.route) != 'undefined'){
          if(itemArrayChildren.route == this.$route.path){
            returned = true;
          }
        }
      })
      return returned;
    },
    //Metodo llamado por el boton del item deslplegable del navigation drawer para expandirlo en pantallas sm/xs
    expandNavigationDrawer() {
      //Se utiliza arguments por convencion de Js que indica cuando un metodo no fue creado para recibir explicitamente parametros
      for(let i = 0; i<this.arrayClickStatus.length; i++){
        if(i === arguments[0]){
          //Si coincide, cambia el valor a su contrario y los demas items los vuelve falsos
          this.arrayClickStatus[i] = !this.arrayClickStatus[i];
        }
        else{
          this.arrayClickStatus[i] = false;
        }
      }
      if(this.arrayClickStatus[0] == true || this.arrayClickStatus[1] == true || this.arrayClickStatus[2] == true){
        this.flagClickStatusCOMPUTED = true;
      }
      if(this.arrayClickStatus[0] == false && this.arrayClickStatus[1] == false && this.arrayClickStatus[2] == false){
        this.flagClickStatusCOMPUTED = false;
      }
    }
  },
    computed: {

       ...mapState({
        isLoggedIn: (state) => state.isLoggedIn,
        user: (state) => state.user,
      }),
    //Propiedad computada que controla la variante mini del navigation drawer dependiendo su pantalla size (breakpoint)
    navigationDrawerSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.paddingAvatar = " padding-left: 7px"
          if(this.flagClickStatusCOMPUTED == true){
            return false;
          }
          return true;
        case "sm":
          this.paddingAvatar = " padding-left: 7px"
          if(this.flagClickStatusCOMPUTED == true){
            return false;
          }
          return true;
        case "md":
          return false;
        case "lg":
          return false;
        case "xl":
          return false;
      }
    },

  },

    // mounted(){
    //   console.log('loggedIn'+this.isLoggedIn)
    // }
};
</script>
