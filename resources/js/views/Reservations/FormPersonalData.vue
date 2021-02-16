<template>
     <v-card  flat>
            <v-form lazy-validation ref="form">
              <v-card-title>Datos personales</v-card-title>
              <v-divider></v-divider>
              <v-text-field
              outlined
              label="Nombre"
              ></v-text-field>
              <v-text-field
              outlined
              label="Apellidos"
              ></v-text-field>
              <v-text-field
              outlined
              label="País"
              ></v-text-field>
              <v-text-field
              outlined
              label="Email"
              ></v-text-field>
              <v-text-field
              outlined
              label="Teléfono"
              ></v-text-field>
              <v-card-title>Tu estancia</v-card-title>
              <v-divider></v-divider>
              <v-select label="Hora de entrada"></v-select>
              <v-textarea label="peticiones especiales"></v-textarea>
              <v-card-title>Confirmación</v-card-title>
              <v-divider></v-divider>
            </v-form>
          </v-card>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>