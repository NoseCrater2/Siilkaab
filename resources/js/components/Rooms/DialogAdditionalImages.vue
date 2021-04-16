<template>
    <v-row>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar flat dark color="blue darken-3">
                    <v-btn icon dark @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-uppercase">Galería de imágenes - {{ $store.state.RoomModule.currentHotelRooms.find( room => room.id == id).name }}</v-toolbar-title>
                    <v-progress-linear absolute bottom color="blue-grey lighten-5" :active="progress > 0 ? true : false" v-model="progress"></v-progress-linear>
                </v-toolbar>
                <v-card-title>Imágenes cargadas</v-card-title>
                <v-card-text>
                    <v-item-group>
                        <v-row>
                             <v-col cols="2"  v-for="(image, index) in additionalImages" :key="index">
                                 <v-item v-slot="{active, toggle}" :value="index">
                                     <v-hover v-slot="{ hover }" :value="active">
                                         <v-card  width="150" :flat="hover?false:true">
                                             <v-img :src="`/img/${image.name}`" width="150" height="150"  class="text-right" @click="toggle" >
                                                 <v-btn v-if="hover" @click="deleteSavedImage(image.id)" icon dark><v-icon size="27">mdi-close-circle</v-icon></v-btn>
                                             </v-img>
                                         </v-card>
                                     </v-hover>
                                 </v-item>
                             </v-col>
                        </v-row>
                   </v-item-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-title>Carga de imágenes</v-card-title>
                <v-card-actions>
                    <v-file-input
                    v-model="files"
                    counter
                    @change="images"
                    multiple
                    placeholder="Haga clic o arrastre la(s) imágen(es) dentro de este campo"
                    accept="image/png, image/jpeg, image/jpg, image/bmp"
                    prepend-icon=""
                    prepend-inner-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                    >
                        <template v-slot:selection="{ index, text }">
                            <v-chip
                            v-if="index < 2"
                            color="blue accent-4"
                            dark
                            label
                            small
                            >
                            {{ text }}
                            </v-chip>
                                <span
                                v-else-if="index === 2"
                                class="overline grey--text text--darken-3 mx-2"
                                >
                                  +{{ files.length - 2 }} Imagen(es)
                                </span>
                        </template>
                    </v-file-input>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loadingUploadImages" @click="uploadImages()"  outlined color="blue"><v-icon left>mdi-cloud-upload</v-icon>SUBIR</v-btn>
                </v-card-actions>
                <v-card-text>
                    <v-item-group>
                        <v-row>
                            <v-col cols="2"  v-for="(img, index) in imgs" :key="index">
                                <v-item v-slot="{active, toggle}" :value="index">
                                    <v-hover v-slot="{ hover }" :value="active">
                                        <v-card  class="mx-auto"  :flat="hover?false:true">
                                            <v-img :src="img" width="150" height="150"  class="text-right" @click="toggle" >
                                                <v-btn v-if="hover" @click="deleteImage(index)"  icon dark><v-icon size="40">mdi-close-circle</v-icon></v-btn>
                                            </v-img>
                                        </v-card>
                                    </v-hover>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-item-group>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from 'axios';
export default {
    data(){
        return{
            progress: 0,
            selectedImage: 0,
            imgs: [],
            loadingUploadImages: false,
            files: [],  
        }
    },

    computed:{
        ...mapState({
            additionalImages: (state) => state.RoomModule.additionalImages,
        }),
    },

    props: {
        id:{
            type: Number,
            required: true,
        },
        dialog: {
            type: Boolean,
            required: true,
        }
    },

    methods:{
        closeDialog(){
            this.$emit('close');
        },

        uploadImages(){
            let formData = new FormData()
            this.files.forEach(file => {
                formData.append('image[]',file)
            });
     
            this.loadingUploadImages = true
            axios.post( '/api/UploadImages/'+this.id,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function (progressEvent) {
                        this.progress = parseInt( Math.round((progressEvent.loaded / progressEvent.total) * 100) )
                    }.bind(this),
                }
            ).then(response =>{
                this.loadingUploadImages = false
                this.files = []
                this.imgs = []
                this.progress = 0
                this.$store.dispatch('getAdditionalImages', this.id)       
            })
            .catch( errors => {
                this.loadingUploadImages = false
                this.progress = 0
            });
        },

        deleteImage(index){
            this.imgs.splice(index,1)
            this.files.splice(index,1)
        },

        deleteSavedImage(id){
            this.$store.dispatch('deleteImage', id)
        },

        images(){
            this.imgs = [];
            if(this.files.length > 0){
                this.files.forEach(file => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = (e) => {
                        this.imgs.push(e.target.result)
                    }
                });
            }
        },
    },

    mounted(){
        this.$store.dispatch('getAdditionalImages', this.id)
    }

}
</script>