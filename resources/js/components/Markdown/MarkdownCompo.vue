<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="content" :extensions="extensions" />
  </div>
</template>

<script>
//import VueMarkdown from "vue-markdown";
import Vue from "vue";
import Vuetify from "vuetify";
// import plugin
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify Object (as described in the Vuetify 2 documentation)
const vuetify = new Vuetify({
  lang: {
    current: "es"
  }
});
// use Vuetify's plugin
Vue.use(Vuetify);
// use this package's plugin
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "mdi"
});

import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";

import { mapState, mapMutations } from "vuex";

export default {
  name: "MarkdownCompo",
  created() {
    //Indicamos si debe de poner el texto largo del hotel o el texto de cancelacion
    if (this.containerType === "Information") {
      this.content = this.contentInformation;
    }
    if (this.containerType === "Conditions") {
      this.content = this.contentConditions;
    }
  },
  //En cuanto se destruya el markdown guardamos el estado de las variables usadas mientras el hotel este configurandose
  destroyed() {
    if (this.containerType === "Information") {
      //Si hay algo que actualizar ejecuta el metodo (mutacion)
      if (this.content != this.contentInformation) {
        this.setContents({ info: this.containerType, fullText: this.content });
      }
    }
    if (this.containerType === "Conditions") {
      //Si hay algo que actualizar ejecuta el metodo (mutacion)
      if (this.content != this.contentConditions) {
        this.setContents({ info: this.containerType, fullText: this.content });
      }
    }
  },
  data() {
    return {
      // declare extensions you want to use
      extensions: [
        History,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Italic,
        Underline,
        Strike,
        HorizontalRule,
        Blockquote,
        ListItem,
        BulletList,
        OrderedList,
        Table,
        TableHeader,
        TableCell,
        TableRow,
        Link,
        HardBreak
      ],
      // starting editor's content
      content: ""
    };
  },
  components: {
    //VueMarkdown,
    TiptapVuetify
  },
  computed: {
    ...mapState({
      hotel: state => state.HotelModule.hotel,
      conditions: state => state.HotelModule.conditions,
      contentInformation: state => state.HotelModule.contentInformation,
      contentConditions: state => state.HotelModule.contentConditions
    })
  },
  methods: {
    ...mapMutations(["setContents"])
  },
  props: {
    containerType: String
  }
};
</script>