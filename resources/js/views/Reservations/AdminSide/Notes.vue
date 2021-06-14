<template>
    <div>
        <v-card class="pa-2" outlined tile>
            <div class="d-flex align-center ml-1">
                <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                        <div>
                            <h1 class="font-weight-bold" :class="!$vuetify.breakpoint.mdAndUp ? 'text-center': ''">Notas</h1>
                        </div>
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                        <v-btn depressed color="primary" block tile @click="addNote" :loading="btnLoading" :disabled="btnLoading">Agregar nota</v-btn>
                    </v-col>
                </v-row>
            </div>
            <v-divider class="mb-4"></v-divider>
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <v-form ref="noteForm">
                    <v-textarea
                        outlined
                        no-resize
                        rows="4"
                        row-height="30"
                        maxlength="191"
                        counter
                        :rules="[(v) => !!v || 'Requerido']"
                        v-model="note"
                    >
                    </v-textarea>
                </v-form>
            </v-col>
            <v-divider v-if="notes.length > 0"></v-divider>
            <v-item-group v-model="selected">
                <v-row>
                    <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="(note, index) in notes" :key="index">
                        <v-alert text color="info" border="left">
                            <div style="font-size: 1.30em; ">{{note.content}}</div>
                            <v-divider class="my-1 info" style="opacity: 0.22"></v-divider>
                            <v-row align="center" no-gutters>
                                <v-col class="grow">
                                    <div style="font-size: 0.69em; ">{{note.user}} - {{note.created_at}}</div>
                                </v-col>
                                <v-col class="shrink pl-1">
                                    <v-btn x-small color="danger" :loading="delButtonLoading" :disabled="delButtonLoading" @click="btnApplyRemoveNote(note.id)" icon outlined>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>
                    </v-col>
                </v-row>
            </v-item-group>
            <v-row justify="center">
              <v-dialog
                v-model="dialogAceptCancelRemoveNote"
                persistent
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline">
                    ¿Eliminar nota?
                  </v-card-title>
                  <v-card-text>Al aceptar, esta nota se eliminará.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      text
                      @click="btnCancelRemoveNote()"
                    >
                      CANCELAR
                    </v-btn>
                    <v-btn
                      color="blue"
                      text
                      @click="deleteNote(idDeleteNote)"
                    >
                      ACEPTAR
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            idDeleteNote: '',
            dialogAceptCancelRemoveNote: false,
            delButtonLoading: false,
            btnLoading:false,
            selected: null,
            note: null,
        }
    },

    computed:{
         ...mapState({
            notes: state => state.bookingsModule.notes,
        }),
    },

    methods:{
        addNote(){

            if(this.$refs.noteForm.validate()){
                this.btnLoading = true
               this.$store.dispatch('saveNote',{content: this.note, reservation_id: this.id, user_id: 1})
               .then(()=>{
                   this.btnLoading = false
                   this.$refs.noteForm.reset()
               })
            }
        },

        btnApplyRemoveNote(id){
            this.idDeleteNote = id;
            this.dialogAceptCancelRemoveNote = true;
        },

        btnCancelRemoveNote(){
            this.idDeleteNote = '';
            this.dialogAceptCancelRemoveNote = false;
        },

        deleteNote(id){
            this.delButtonLoading = true
            this.$store.dispatch('deleteNote',id).then(()=>{
                this.delButtonLoading = false
                this.dialogAceptCancelRemoveNote = false;
            }).catch(()=>{
                this.dialogAceptCancelRemoveNote = false;
            })
        }
    },

    props: ['id']
}
</script>
