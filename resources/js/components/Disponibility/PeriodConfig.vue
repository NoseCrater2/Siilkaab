<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4">
        <span class="text-center font-weight-bold overline">{{objArrCompo.name}}</span>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="mt-6">
        <v-text-field
          outlined
          label="Unidades"
          prepend-inner-icon="mdi-pencil"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="mt-6">
        <v-text-field
          outlined
          label="Tarifa"
          prepend-inner-icon="mdi-currency-usd-circle"
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    name: 'PeriodConfig',
    props: {
      idCompo: Number,
      objArrCompo: Object,
    },
}
</script>