<template>
  <div>
    <v-banner single-line>
      <v-btn small color="info" class="white--text">
        <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar
      </v-btn>
      <v-btn small color="grey" class="white--text">
        <v-icon left dark>mdi-check-underline-circle</v-icon>Guardar y cerrar
      </v-btn>
      <v-btn small color="red" class="white--text">
        <v-icon left dark>mdi-close-circle</v-icon>Cerrar
      </v-btn>

      <template v-slot:actions>
        <v-icon id="iconHotel" left>mdi-domain</v-icon>
        <h3>{{title}}</h3>
      </template>
    </v-banner>
  </div>
</template>

<script>
export default {
  name: "ButtonActionsSup",
  props: {
    title: String
  }
};
</script>

<style scoped>
#iconHotel {
  margin-right: 0px;
  margin-bottom: 6px;
}
</style>