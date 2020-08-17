<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
      <div v-if="hotel!==null">
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-information</v-icon>
            <h3>Principal</h3>
          </div>
        </v-banner>
        <v-row class="pa-6">
          <v-col cols="12" md="8">
            <v-text-field v-model="computedTitle" label="Titulo" required></v-text-field>
          </v-col>

          <v-col cols="12" md="8">
            <v-text-field v-model="computedUrl" label="URL" required></v-text-field>
          </v-col>

          <v-col cols="12" md="8">
            <v-text-field v-model="computedReferenceC" label="Codigo de referencia" required></v-text-field>
          </v-col>
        </v-row>
        <!--FOTOS-->
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-image-area</v-icon>
            <h3>Fotos</h3>
          </div>
        </v-banner>

        <div class="pa-10">
          <v-row>
            <v-card class="mx-3" max-width="400" outlined color="#eee">
              <v-icon size="70" style="height:210px; width:300px">mdi-image</v-icon>
            </v-card>
          </v-row>
          <br />
          <v-btn small color="grey" class="white--text">Seleccionar imagen</v-btn>
        </div>
        <br />
        <!--TEXTOS-->
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-text</v-icon>
            <h3>Textos</h3>
          </div>
        </v-banner>

        <div class="pa-4">
          <v-col cols="12" sm="6" md="12">
            <v-textarea
              outlined
              label="Texto corto"
              no-resize
              rows="4"
              row-height="30"
              :counter="240"
              v-model="computedShortT"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" md="12">
            <!--<v-textarea outlined no-resize rows="13" row-height="30" v-model="textoLargo"></v-textarea>-->
            <!--<vue-markdown :source="textoLargo" :html="false" :toc="false" show="show"></vue-markdown>-->
            <MarkdownCompo containerType="Information"></MarkdownCompo>
          </v-col>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import MarkdownCompo from "../../components/Markdown/MarkdownCompo";
import { mapState } from "vuex";
export default {
  name: "Information",
  created() {
    if (this.hotel.id !== null) {
      this.titleModel = this.hotel.Title;
      this.urlModel = this.hotel.Url;
      this.referenceCModel = this.hotel.ReferenceCode;
      this.shortTModel = this.hotel.ShortText;
    }
  },
  data() {
    return {
      titleModel: null,
      urlModel: null,
      referenceCModel: null,
      shortTModel: null,
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo,
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
    }),
    computedTitle: {
      get() {
        return this.titleModel;
      },
      set(model) {
        this.titleModel = model;
        this.hotel.Title = this.titleModel;
        return this.titleModel;
      },
    },

    computedUrl: {
      get() {
        return this.urlModel;
      },
      set(model) {
        this.urlModel = model;
        this.hotel.Url = this.urlModel;
        return this.urlModel;
      },
    },

    computedReferenceC: {
      get() {
        return this.referenceCModel;
      },
      set(model) {
        this.referenceCModel = model;
        this.hotel.ReferenceCode = this.referenceCModel;
        return this.referenceCModel;
      },
    },

    computedShortT: {
      get() {
        return this.shortTModel;
      },
      set(model) {
        this.shortTModel = model;
        this.hotel.ShortText = this.shortTModel;
        return this.shortTModel;
      },
    },
  }
};
</script>

<style scoped>
.iconsInformation {
  margin-bottom: 6px;
}
.flexed {
  display: flex;
}
</style>