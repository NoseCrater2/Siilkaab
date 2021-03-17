<template>
    <v-card flat>
        <v-card-title>
            <v-icon>mdi-file-outline</v-icon>
            Notas
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="noteForm">
        <v-textarea
        class="mt-4" 
        outlined
        :rules="[(v) => !!v || 'Requerido']"
        v-model="note" 
        style="width: 50%;" 
        height="100">
        </v-textarea>
        </v-form>
        <v-card-actions>
            <v-btn @click="addNote" :loading="btnLoading" depressed color="primary">Agregar nota</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        <v-item-group v-model="selected">
            <v-col cols="12" v-for="(note, index) in notes" :key="index">
                <v-alert text color="info" border="left">
                    <div>{{note.content}}</div>
                    <v-divider class="my-1 info" style="opacity: 0.22"></v-divider>
                    <v-row align="center" no-gutters>
                        <v-col class="grow">
                            {{note.user}}-
                            {{note.created_at}}
                        </v-col>
                        <v-col class="shrink">
                            <v-btn color="danger" :loading="delButtonLoading" @click="deleteNote(note.id)" icon outlined>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-col>
        </v-item-group>
    </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            delButtonLoading: false,
            btnLoading:false,
            selected: null,
            note: null,
        }
    },

    mounted(){

        this.$store.dispatch('getNotes',this.id)
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

        deleteNote(id){
            this.delButtonLoading = true
            this.$store.dispatch('deleteNote',id).then(()=>{
                this.delButtonLoading = false
            })
        }
    },

    props: ['id']
}
</script>