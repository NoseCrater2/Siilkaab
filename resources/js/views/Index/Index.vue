<template>
  <div id="app">
    <v-app id="inspire">
      <!--Usamos el componente NavbarSiilkaab.vue-->
      <NavbarSiilkaab></NavbarSiilkaab>
      <v-main>

          <!--Aqui se vera con router-view la informacion de hoteles, usuarios, etc-->
          <router-view></router-view>

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


