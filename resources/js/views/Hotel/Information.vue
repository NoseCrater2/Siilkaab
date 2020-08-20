<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
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

        <v-row class="ml-1">
          <v-col md="4">
            <v-text-field v-model="computedNumRooms" label="Número de habitaciones" required></v-text-field>
          </v-col>

          <v-col md="4">
            <v-text-field v-model="computedNumFloors" label="Número de pisos" required></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="8">
          <v-autocomplete
            class="ml-auto"
            :items="typeItems"
            v-model="computedDdwnType"
            dense
            label="Tipo"
            filled
          ></v-autocomplete>
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
            <v-icon size="70" style="height:210px; width:300px" v-if="currentImage===null">mdi-image</v-icon>
            <v-img v-else :src="(urlTemporal==='') ?  ('/storage/img/'+ currentImage) : urlTemporal" height="210" width="300" contain class="grey darken-4"></v-img>
          </v-card>
        </v-row>
        <br />
        <!--En este input de file (que se mantendra oculto) se activa dando clic al boton de Vue-->
        <input type="file" ref="btnUploadImage" style="display:none" @change="selectImage($event)" />
        <v-btn
          small
          color="grey"
          class="white--text"
          @click="$refs.btnUploadImage.click()"
        >Seleccionar imagen</v-btn>
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
      this.titleModel = this.hotel.title;
      this.urlModel = this.hotel.url;
      this.referenceCModel = this.hotel.reference_code;
      this.numRoomsModel = this.hotel.num_rooms;
      this.numFloorsModel = this.hotel.num_floors;
      this.shortTModel = this.hotel.short_text;
      this.currentImage = this.hotel.image;
      if (this.hotel.type != null) {
        if (this.hotel.type == "bungalow") {
          this.ddwnTypeModel = "Bungalow";
        }
        if (this.hotel.type == "cabana") {
          this.ddwnTypeModel = "Cabaña";
        }
        if (this.hotel.type == "build") {
          this.ddwnTypeModel = "Edificio";
        }
      }
    }
  },
  mounted() {},
  data() {
    return {
      currentImage: null,
      urlTemporal: "",
      typeItems: ["Bungalow", "Cabaña", "Edificio"],
      ddwnTypeModel: null,
      titleModel: null,
      urlModel: null,
      referenceCModel: null,
      numRoomsModel: null,
      numFloorsModel: null,
      shortTModel: null,
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo,
  },
  methods: {
    selectImage(event) {
      this.currentImage = event.target.files[0];
      this.hotel.image = this.currentImage;

      const reader = new FileReader();
      //Esto trae la URL temporal de la imagen actual
      reader.readAsDataURL(this.currentImage);
      reader.onload = (e) => {
        this.urlTemporal = e.target.result;
      };
    },
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
        this.hotel.title = this.titleModel;
        return this.titleModel;
      },
    },

    computedUrl: {
      get() {
        return this.urlModel;
      },
      set(model) {
        this.urlModel = model;
        this.hotel.url = this.urlModel;
        return this.urlModel;
      },
    },

    computedReferenceC: {
      get() {
        return this.referenceCModel;
      },
      set(model) {
        this.referenceCModel = model;
        this.hotel.reference_code = this.referenceCModel;
        return this.referenceCModel;
      },
    },

    computedNumRooms: {
      get() {
        return this.numRoomsModel;
      },
      set(model) {
        this.numRoomsModel = model;
        this.hotel.num_rooms = this.numRoomsModel;
        return this.numRoomsModel;
      },
    },

    computedNumFloors: {
      get() {
        return this.numFloorsModel;
      },
      set(model) {
        this.numFloorsModel = model;
        this.hotel.num_floors = this.numFloorsModel;
        return this.numFloorsModel;
      },
    },

    computedDdwnType: {
      get() {
        return this.ddwnTypeModel;
      },
      set(model) {
        this.ddwnTypeModel = model;
        if (this.ddwnTypeModel == "Bungalow") {
          this.hotel.type = "bungalow";
        }
        if (this.ddwnTypeModel == "Cabaña") {
          this.hotel.type = "cabana";
        }
        if (this.ddwnTypeModel == "Edificio") {
          this.hotel.type = "build";
        }
        return this.ddwnTypeModel;
      },
    },

    computedShortT: {
      get() {
        return this.shortTModel;
      },
      set(model) {
        this.shortTModel = model;
        this.hotel.short_text = this.shortTModel;
        return this.shortTModel;
      },
    },
  },
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