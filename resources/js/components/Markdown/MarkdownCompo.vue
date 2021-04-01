<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="computedContent" :extensions="extensions" />
  </div>
</template>

<script>

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
  History,
} from "tiptap-vuetify";

import { mapState, mapMutations } from "vuex";

export default {
  name: "MarkdownCompo",
  data() {
    return {
      // declare extensions you want to use
      extensions: [
        History,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
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
        HardBreak,
      ],
      // starting editor's content
      content: "",
    };
  },
  components: {
    //VueMarkdown,
    TiptapVuetify,
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      conditions: (state) => state.HotelModule.conditions,
    }),
    computedContent: {
      get() {
        //Indicamos si debe de poner el texto largo del hotel o el texto de cancelacion
        if (this.containerType === "Information") {
          if(this.hotel.large_text != null){
            this.content = this.hotel.large_text;
          }
          else{
            this.hotel.large_text = "";
            this.content = this.hotel.large_text;
          }
        }
        if (this.containerType === "Conditions") {
          if(this.conditions.cancelation_text != null){
            this.content = this.conditions.cancelation_text;
          }
          else{
            this.conditions.cancelation_text = "";
            this.content = this.conditions.cancelation_text;
          }
        }
        return this.content;
      },
      set(model) {
        this.content = model;
        if (this.containerType === "Information") {
          this.hotel.large_text = this.content;
        }
        if (this.containerType === "Conditions") {
          this.conditions.cancelation_text = this.content;
        }
        return this.content;
      },
    },
  },
  props: {
    containerType: String,
  },
};
</script>