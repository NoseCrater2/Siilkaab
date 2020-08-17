<template>
  <div id="app">
    <v-app id="inspire">
      <!--Usamos el componente NavbarSiilkaab.vue-->
      <NavbarSiilkaab></NavbarSiilkaab>
      <v-main>
        <v-container align="start" justify="center">
          <!--Aqui se vera con router-view la informacion de hoteles, usuarios, etc-->
          <router-view></router-view>
        </v-container>
      </v-main>
      <!--Usamos el componente NavigationDashboard.vue-->
      <NavigationDashboard></NavigationDashboard>
    </v-app>
  </div>
</template>


<script>
//Importamos los componentes
import NavbarSiilkaab from "./NavbarSiilkaab";
import NavigationDashboard from "./NavigationDashboard";

export default {
  data() {
    return {
      lastStorage: this.$store.state.lastStorage,
      dialog: false
    };
  },
  props: {
    source: String
  },
  //Usamos los componentes
  components: {
    NavbarSiilkaab,
    NavigationDashboard
  }
};
</script>


