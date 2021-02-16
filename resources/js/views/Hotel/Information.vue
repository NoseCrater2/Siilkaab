<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--PRINCIPAL-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-information</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">PRINCIPAL</span>
          </div>
        </div>
      </v-banner>
      <v-row class="pa-6">
        <v-col cols="12" md="8" sm="8" xs="12">
          <v-text-field v-model="computedTitle" :error-messages="errorsInformation.title" prepend-inner-icon="mdi-notebook" label="Titulo" outlined required></v-text-field>
        </v-col>

        <v-col cols="12" md="8" sm="8" xs="12">
          <v-text-field v-model="computedUrl" :error-messages="errorsInformation.url" prepend-inner-icon="mdi-web" label="URL" outlined required></v-text-field>
        </v-col>

        <v-col cols="12" md="8" sm="8" xs="12">
          <v-text-field v-model="computedReferenceC" :error-messages="errorsInformation.reference_code" prepend-inner-icon="mdi-barcode" label="Codigo de referencia" outlined required></v-text-field>
        </v-col>

        <v-row class="ml-1">
          <v-col cols="12" md="4" sm="4" xs="12">
            <v-text-field maxlength="4" @keydown="keyhandler" :rules="[rules.numbersFloorRoom]" :class="visibleNumRoomsNumFloors == false ? 'd-none' : ''" v-model.number="computedNumRooms" :error-messages="errorsInformation.num_rooms" prepend-inner-icon="mdi-home-plus" label="Número de habitaciones" outlined required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="4" xs="12">
            <v-text-field maxlength="4" @keydown="keyhandler" :rules="[rules.numbersFloorRoom]" :class="visibleNumRoomsNumFloors == false ? 'd-none' : ''" v-model.number="computedNumFloors" :error-messages="errorsInformation.num_floors" prepend-inner-icon="mdi-home-plus" label="Número de pisos" outlined required></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" md="8" sm="8" xs="12">
          <v-select
            :error-messages="errorsInformation.type"
            class="ml-auto"
            :items="typeItems"
            v-model="computedDdwnType"
            prepend-inner-icon="mdi-domain"
            label="Tipo"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <!--FOTOS-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-image-area</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">IMÁGENES</span>
          </div>
        </div>
      </v-banner>

      <div class="pa-10">
        <v-row>
          <v-card class="mx-3" max-width="400" outlined color="white">
            <v-icon size="70" style="height:210px; width:300px; border: 1px solid grey;" v-if="currentImage===null">mdi-image</v-icon>
            <v-img
              v-else
              :src="srcImage()"
              height="210"
              width="300"
              contain
              class="grey darken-4"
            ></v-img>
            <!--En este input de file (que se mantendra oculto) se activa dando clic al boton de Vue-->
            <input
              accept="image/*"
              type="file"
              ref="btnUploadImage"
              style="display:none"
              @change="selectImage($event)"
            />
            <v-btn
              block
              small
              color="grey"
              class="white--text mt-1"
              depressed
              @click="$refs.btnUploadImage.click()"
            >Seleccionar imagen</v-btn>
          </v-card>
          <div v-if="nameImageFileSpan != ''" class="ml-3">
            <span class="red--text text-caption">El archivo<span class="font-weight-black font-italic"> "{{nameImageFileSpan}}" </span>no es un tipo de archivo válido</span>
          </div>
        </v-row>
      </div>
      <br />
      <!--TEXTOS-->
      <v-banner single-line>
        <div class="d-flex align-center ml-1">
          <v-icon class="mb-1" left>mdi-text</v-icon>
          <div class="mt-n1">
            <span class="text-h6 font-weight-bold">TEXTOS</span>
          </div>
        </div>
      </v-banner>
      <div class="pa-4">
        <v-col cols="12">
          <v-textarea
            :error-messages="errorsInformation.short_text"
            outlined
            no-resize
            rows="4"
            row-height="30"
            maxlength="120"
            counter
            v-model="computedShortT"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <!--<v-textarea outlined no-resize rows="13" row-height="30" v-model="textoLargo"></v-textarea>-->
          <!--<vue-markdown :source="textoLargo" :html="false" :toc="false" show="show"></vue-markdown>-->
          <MarkdownCompo containerType="Information"></MarkdownCompo>
          <div class="ml-3">
            <span class="red--text text-caption">{{typeof(errorsInformation.large_text) != 'undefined' ? (errorsInformation.large_text).toString() : ''}}</span>
          </div>
        </v-col>
      </div>
    </v-card>
  </div>
</template>

<script>
import MarkdownCompo from "../../components/Markdown/MarkdownCompo";
import { mapState } from "vuex";
import Compressor from "compressorjs";

export default {
  name: "Information",
  created() {
    if (this.hotel.id !== null) {
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    }
    else{
      this.fillModel();
    }
  },
  mounted() {
    
  },
  data() {
    return {
      visibleNumRoomsNumFloors: false,
      currentImage: null,
      urlTemporal: "",
      typeItems: ["Bungalow", "Cabaña", "Edificio"],
      ddwnTypeModel: null,
      titleModel: null,
      urlModel: null,
      referenceCModel: null,
      numRoomsModel: '',
      numFloorsModel: '',
      shortTModel: null,

      nameImageFileSpan: "",
      rules: {
        numbersFloorRoom: value => {
          const pattern = /^(1|[0-9]\d{0,3})$/
          return pattern.test(value) || 'Solo se aceptan numeros (mayores a 0)'
        },
      },
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo,
  },
  methods: {
    selectImage(event) {
      if(event.target.files[0].type.includes("image/")){
        this.nameImageFileSpan = "";
        this.currentImage = event.target.files[0];
        console.log("this.currentImage", this.currentImage)
        this.hotel.image = this.currentImage;

        //Declaramos una variable llamada "sizeImageQuality" que llevara el porcentaje de calidad de la imagen
        let sizeImageQuality;
        //Las imagenes estan en bytes
        //Menor a 512,000bytes q = 0.8
        //Menor a 1,048,576bytes q = 0.6
        //Menor a 5,242,880bytes q = 0.4
        //Menor a 11,534,336bytes q = 0.2

        //Se asigna un valor de quality a la variable "sizeImageQuality" de acuerdo a su tamaño (en bytes)
        if (this.hotel.image.size < 512000) {
          sizeImageQuality = 0.8;
        }
        if (this.hotel.image.size >= 512000 && this.hotel.image.size < 1048576) {
          sizeImageQuality = 0.6;
        }
        if (
          this.hotel.image.size >= 1048576 &&
          this.hotel.image.size < 11534336
        ) {
          sizeImageQuality = 0.4;
        }
        if (this.hotel.image.size >= 11534336) {
          sizeImageQuality = 0.2;
        }

        //Se crea una instancia de Compressor.js y se le manda la imagen recien seleccionada y la calidad
        //A la cual dejara la imagen una vez terminada la compresion
        let compressImg = new Compressor(this.hotel.image, {
          quality: sizeImageQuality,
          //success(result) {
          //},
          //error(err) {
          //console.log(err.message);
          //},
        });

        //La variable state "this.hotel" en su propiedad "image" ahora pasa a contener la imagen comprimida
        //(Es un objeto, y realmente la imagen esta contenida de la siguiente manera
        //"this.hotel.image.result"; sin embargo, no se puede añadir desde aqui directamente la propiedad "result"
        //del compressor a la variable state)
        this.hotel.image = {compressImage: compressImg};

        const reader = new FileReader();
        //Esto trae la URL temporal de la imagen actual
        reader.readAsDataURL(this.currentImage);
        reader.onload = (e) => {
          //Guarda el base64 de la imagen
          this.urlTemporal = e.target.result;
        };
        //Seteamos la variable para que quede vacia y el contenedor de imagen <v-img> no la cargue
        this.currentImage = "";
      }
      else{
        this.nameImageFileSpan = event.target.files[0].name;
      }
    },
    //Coloca la URL de la imágen
    srcImage(){
      let localSrcImage = (this.urlTemporal === '') ? (this.currentImage) : this.urlTemporal;
      if(typeof(this.hotel.image) == 'object'){
        if(this.urlTemporal != ""){
          this.hotel.image.temporalURL =  this.urlTemporal;
        }
      }
      console.log("this.hotel.imageSrcImage", this.hotel.image)
      console.log("this.urlTemporalSrcImage", this.urlTemporal)
      console.log("this.currentImageSrcImage", this.currentImage)
      return localSrcImage;
    },
    //Metodo para llenar la vista con los datos
    fillModel(){
      if(this.hotel.title != null){
        this.titleModel = this.hotel.title;
      }
      else{
        this.hotel.title = "";
        this.titleModel = this.hotel.title;
      }
      if(this.hotel.url != null){
        this.urlModel = this.hotel.url;
      }
      else{
        this.hotel.url = "";
        this.urlModel = this.hotel.url;
      }
      if(this.hotel.reference_code != null){
        this.referenceCModel = this.hotel.reference_code;
      }
      else{
        this.hotel.reference_code = "";
        this.referenceCModel = this.hotel.reference_code;
      }
      if(this.hotel.num_rooms != null){
        this.numRoomsModel = this.hotel.num_rooms;
      }
      else{
        this.hotel.num_rooms = '';
        this.numRoomsModel = this.hotel.num_rooms;
      }
      if(this.hotel.num_floors != null){
        this.numFloorsModel = this.hotel.num_floors;
      }
      else{
        this.hotel.num_floors = '';
        this.numFloorsModel = this.hotel.num_floors;
      }
      if(this.hotel.short_text != null){
        this.shortTModel = this.hotel.short_text;
      }
      else{
        this.hotel.short_text = "";
        this.shortTModel = this.hotel.short_text;
      }
      if(this.hotel.image != null || this.hotel.image != ""){
        if(this.hotel.image != null && typeof(this.hotel.image) == 'object'){
          this.currentImage = this.hotel.image.temporalURL
        }
        else if(this.hotel.image != null && typeof(this.hotel.image) != 'undefined'){
          if(this.hotel.image.includes("jpeg") == true || this.hotel.image.includes("jpg") == true || this.hotel.image.includes("png") == true){
            this.currentImage = "/img/" + this.hotel.image;
          }
        }
      }
      else{
        //console.log("noImage")
      }
      if (this.hotel.type != null) {
        if (this.hotel.type == "bungalow") {
          this.visibleNumRoomsNumFloors = false;
          this.numRoomsModel = ''
          this.numFloorsModel = ''
          this.ddwnTypeModel = "Bungalow";
        }
        if (this.hotel.type == "cabana") {
          this.visibleNumRoomsNumFloors = false;
          this.numRoomsModel = ''
          this.numFloorsModel = ''
          this.ddwnTypeModel = "Cabaña";
        }
        if (this.hotel.type == "build") {
          this.visibleNumRoomsNumFloors = true;
          this.ddwnTypeModel = "Edificio";
        }
      }
      else{
        this.hotel.type = "build";
        this.visibleNumRoomsNumFloors = true;
        this.ddwnTypeModel = "Edificio";
      }
    },
    keyhandler(event) {
      const pattern = /^(1|[0-9]\d{0,3})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        console.log(event.key)
        event.preventDefault();
      }
    }
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      errorsInformation: (state) => state.HotelModule.errorsInformation
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
          this.numRoomsModel = '';
          this.hotel.num_rooms = '';
          this.numFloorsModel = '';
          this.hotel.num_floors = '';
          this.visibleNumRoomsNumFloors = false;
        }
        if (this.ddwnTypeModel == "Cabaña") {
          this.hotel.type = "cabana";
          this.numRoomsModel = '';
          this.hotel.num_rooms = '';
          this.numFloorsModel = '';
          this.hotel.num_floors = '';
          this.visibleNumRoomsNumFloors = false;
        }
        if (this.ddwnTypeModel == "Edificio") {
          this.numRoomsModel = '';
          this.hotel.num_rooms = '';
          this.numFloorsModel = '';
          this.hotel.num_floors = '';
          this.visibleNumRoomsNumFloors = true;
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