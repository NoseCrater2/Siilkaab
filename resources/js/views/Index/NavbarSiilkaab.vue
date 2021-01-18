<template>
  <div>
    <v-app-bar
      app
      color="blue darken-3"
      dark
      flat
      :clipped-left="$vuetify.breakpoint.xlAndUp || $vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.smAndUp || $vuetify.breakpoint.xsOnly"
    >
      <v-toolbar-title class="ml-n6 pl-4" style="width: 200px">
        <div class="d-flex align-center">
          <v-img
              src="/img/logolidhber/lidhberpng.png"
              height="43"
              width="43"
              contain
          ></v-img>
          <span class="hidden-sm-and-down ml-2">Siilkaab Panel</span>
        </div>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--
        <v-btn icon large>
          <v-avatar size="32px" item>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Avatar"></v-img>
          </v-avatar>
        </v-btn>
      -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavbarSiilkaab"
};
</script>