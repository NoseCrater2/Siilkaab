<template>
  <div>
    <v-app-bar
      app
      color="blue darken-3"
      dark
      flat
      :clipped-left="$vuetify.breakpoint.xlAndUp || $vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.smAndUp || $vuetify.breakpoint.xsOnly"
    >
      <v-toolbar-title class="ml-0 pl-4" style="width: 200px">
        <span class="hidden-sm-and-down">Siilkaab Panel</span>
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