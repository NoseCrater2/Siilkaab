<template>
    <div>
        <div v-for="(itemArrayModelBtn, index) in arrayModelBtn" :key="index">
        <v-row class="mt-1">
            <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12" class="d-flex justify-xl-start justify-lg-start justify-md-start justify-center">
                <span class="font-weight-bold body-1">{{itemArrayModelBtn.label}}</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" xl="9" lg="9" md="9" sm="12" xs="12" class="mt-n1 d-flex flex-column align-center justify-center">
                <v-btn-toggle
                    mandatory
                    v-model="itemArrayModelBtn.btnGroupModel"
                    dark
                >
                  <v-btn small value="all" :active-class="colorBtnToggle">
                    <span>Todas</span>
                  </v-btn>
                  <v-btn small value="some" :active-class="colorBtnToggle">
                    <span>Algunas habitaciones</span>
                  </v-btn>
                  <v-btn small value="none" :active-class="colorBtnToggle">
                    <span>Ninguna</span>
                  </v-btn>
                </v-btn-toggle>

                <div v-if="itemArrayModelBtn.btnGroupModel=='some'" class="mt-3 d-flex flex-column align-center">
                    <span v-if="(roomAmenities.length > 0)" class="font-weight-bold body-2">Selecciona en que habitación aplica esta amenidad</span>
                    <span v-else class="font-weight-bold body-2 red--text">No existen habitaciones con amenidades vigentes para este hotel</span>
                    <v-row>
                        <v-col cols="12" xl="3" lg="4" md="4" sm="12" xs="12" v-for="(itemRoomAmenities) in roomAmenities" :key="itemRoomAmenities.id" class="d-flex flex-column align-xl-start align-lg-start align-md-start align-center">
                            <v-checkbox
                                class="text-subtitle-1"
                                v-model="itemRoomAmenities[itemArrayModelBtn.value]"
                                :label="itemRoomAmenities.room_name"
                                hide-details
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        </div>
        <div class="mt-2">
            <v-row justify="space-between">
                <v-col cols="12" xl="3" lg="4" md="4" sm="12" xs="12">
                    <v-btn block dark color="red" @click="btnCancel()">Cancelar</v-btn>
                </v-col>
                <v-col cols="12" xl="3" lg="4" md="4" sm="12" xs="12">
                    <v-btn block color="primary" @click="btnUploadAXIOSRoomAmenities()" :loading="isLoadingBtnAcept" :disabled="(roomAmenities.length > 0 && isLoadingBtnAcept == false) ? false : true">Aceptar</v-btn>
                </v-col>
            </v-row>
        </div>
            <v-snackbar
              :value="snackbarRoomAmenities.stateSnackbar"
              right
              :color="snackbarRoomAmenities.colorSnackbar"
              rounded="pill"
              :timeout="timeoutSnackbarRoomAmenities"
              bottom
            >
              <v-icon
                color="white"
              >
                mdi-content-save
              </v-icon>
              <span class="font-weight-bold">{{snackbarRoomAmenities.messaggeSnackbar}}</span>
            </v-snackbar>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    name: "RoomAmenities",
    mounted(){
        this.localSetAmenitiesColors();
    },
    data() {
        return {
            isLoadingBtnAcept: false,
            colorBtnToggle: '',
            arrayModelBtn: [
                { btnGroupModel: 'none', label: 'Aire acondicionado', value: 'air_conditioning'},
                { btnGroupModel: 'none', label: 'Balcon', value: 'balcony'},
                { btnGroupModel: 'none', label: 'Bañera', value: 'bathrub'},
                { btnGroupModel: 'none', label: 'Vista', value: 'view'},
                { btnGroupModel: 'none', label: 'Pantalla plana', value: 'flat_screen'},
                { btnGroupModel: 'none', label: 'Piscina privada', value: 'private_pool'},
                { btnGroupModel: 'none', label: 'Terraza', value: 'terrace'},
                { btnGroupModel: 'none', label: 'Cafetería', value: 'coffe_shop'},
                { btnGroupModel: 'none', label: 'Tina de hidromasaje', value: 'spa_tub'},
                { btnGroupModel: 'none', label: 'Cuna', value: 'childrens_cribs'},
                { btnGroupModel: 'none', label: 'Tendedero', value: 'clother_rack'},
                { btnGroupModel: 'none', label: 'Tendedero de secado', value: 'drying_rack_clothing'},
                { btnGroupModel: 'none', label: 'Cama plegable', value: 'fold_up_bed'},
                { btnGroupModel: 'none', label: 'Sofa cama', value: 'sofa_bed'},
                { btnGroupModel: 'none', label: 'Bote de basura', value: 'trash_cans'},
                { btnGroupModel: 'none', label: 'Piscina templada', value: 'heated_pool'},
                { btnGroupModel: 'none', label: 'Piscina infinita', value: 'infinity_pool'},
                { btnGroupModel: 'none', label: 'Piscina de inmersión', value: 'plunge_pool'},
                { btnGroupModel: 'none', label: 'Cubierta de piscina', value: 'pool_cover'},
                { btnGroupModel: 'none', label: 'Trampolin de piscina', value: 'pool_towers'},
                { btnGroupModel: 'none', label: 'Piscina con vista', value: 'pool_with_view'},
                { btnGroupModel: 'none', label: 'Piscina poco profunda', value: 'shallow_end'},
                { btnGroupModel: 'none', label: 'Piscina de agua salada', value: 'saltwater_pool'},
                { btnGroupModel: 'none', label: 'Armario', value: 'wardrobe_closet'},
                { btnGroupModel: 'none', label: 'Ventilador', value: 'fan'},
                { btnGroupModel: 'none', label: 'Chimenea', value: 'fireplace'},
                { btnGroupModel: 'none', label: 'Calefacción', value: 'heating'},
                { btnGroupModel: 'none', label: 'Habitaciones interconectadas', value: 'interconnecting_rooms'},
                { btnGroupModel: 'none', label: 'Area de planchado', value: 'iron_facilities'},
                { btnGroupModel: 'none', label: 'Mosquitera', value: 'mosquito_net'},
                { btnGroupModel: 'none', label: 'Entrada privada', value: 'private_entrance'},
                { btnGroupModel: 'none', label: 'Seguro', value: 'safe'},
                { btnGroupModel: 'none', label: 'Sofa', value: 'sofa'},
                { btnGroupModel: 'none', label: 'Sala de estar', value: 'sitting_area'},
                { btnGroupModel: 'none', label: 'Mantas eléctricas', value: 'electric_blankets'},
                { btnGroupModel: 'none', label: 'Pijamas', value: 'pajamas'},
                { btnGroupModel: 'none', label: 'Enchufe cerca de cama', value: 'socket_near_bed'},
                { btnGroupModel: 'none', label: 'Baño privado', value: 'private_bath'},
                { btnGroupModel: 'none', label: 'Baño compartido', value: 'shared_bath'},
                { btnGroupModel: 'none', label: 'Bañera con regadera', value: 'bathhub_shower'},
                { btnGroupModel: 'none', label: 'Bata de baño', value: 'bathrobe'},
                { btnGroupModel: 'none', label: 'Aseos gratis', value: 'free_toileters'},
                { btnGroupModel: 'none', label: 'Secadora de pelo', value: 'hairdryer'},
                { btnGroupModel: 'none', label: 'Sauna', value: 'sauna'},
                { btnGroupModel: 'none', label: 'Regadera', value: 'shower'},
                { btnGroupModel: 'none', label: 'Zapatillas', value: 'slippers'},
                { btnGroupModel: 'none', label: 'Baño adicional', value: 'additional_bathroom'},
                { btnGroupModel: 'none', label: 'Cepillo de dientes', value: 'toothbrush'},
                { btnGroupModel: 'none', label: 'Shampoo', value: 'shampoo'},
                { btnGroupModel: 'none', label: 'Acondicionador', value: 'conditioner'},
                { btnGroupModel: 'none', label: 'Jabon corporal', value: 'body_soap'},
                { btnGroupModel: 'none', label: 'Canales (por cable)', value: 'channel_cable'},
                { btnGroupModel: 'none', label: 'Canales (pago por evento)', value: 'paypervierw_channles'},
                { btnGroupModel: 'none', label: 'Caja fuerte para laptop', value: 'laptop_safe'},
                { btnGroupModel: 'none', label: 'Canales (por satelite)', value: 'satellite_channels'},
                { btnGroupModel: 'none', label: 'Telefono', value: 'telephone'},
                { btnGroupModel: 'none', label: 'Televisión', value: 'tv'},
                { btnGroupModel: 'none', label: 'Video', value: 'video'},
                { btnGroupModel: 'none', label: 'Acceso por tarjeta', value: 'key_card_access'},
                { btnGroupModel: 'none', label: 'Alarma', value: 'alarm_clock'},
                { btnGroupModel: 'none', label: 'Acceso por llave', value: 'key_access'},
                { btnGroupModel: 'none', label: 'Servicio de despertador', value: 'wakeup_service'},
                { btnGroupModel: 'none', label: 'Ropa de cama', value: 'linens'},
                { btnGroupModel: 'none', label: 'Toallas', value: 'towels'},
                { btnGroupModel: 'none', label: 'Vista a la ciudad', value: 'city_view'},
                { btnGroupModel: 'none', label: 'Vista al jardin', value: 'garden_view'},
                { btnGroupModel: 'none', label: 'Vista al lago', value: 'lake_view'},
                { btnGroupModel: 'none', label: 'Vista panoramica', value: 'landmark_view'},
                { btnGroupModel: 'none', label: 'Vista al mar', value: 'ocean_view'},
                { btnGroupModel: 'none', label: 'Detector de monoxido', value: 'carbon_monixide_detector'},
                { btnGroupModel: 'none', label: 'Fuentes de monoxido', value: 'carbon_monoxide_sources'},
                { btnGroupModel: 'none', label: 'Alarma de humo', value: 'smoke_alarm'},
                { btnGroupModel: 'none', label: 'Extinguidor', value: 'fire_extinguisher'},
                { btnGroupModel: 'none', label: 'Purificador de aire', value: 'air_purifiers'}
            ]
        }
    },
    methods: {
        //this.roomAmenities.reduce((a, b) => a["air_conditioning"] + b["air_conditioning"]) == 2 ? 'all' : this.roomAmenities.reduce((a, b) => a["air_conditioning"] + b["air_conditioningf"]) == 1 ? 'some' : 'none'
        ...mapActions(["putRoomAmenitiesAXIOS"]),
        ...mapMutations(["setSnackbarRoomAmenities", "setReinicializedErrorsStatusRoomModule", "setProgressbarNavbarStateRoomAndAmenity"]),
        localSetAmenitiesColors(){
            if(this.roomAmenities.length > 0){
                this.colorBtnToggle = 'blue darken-3';
            }
            else{
                this.colorBtnToggle = 'red';
            }
            console.log("MOUNTED", this.colorBtnToggle)
            this.arrayModelBtn.forEach((item, index)=>{
                this.getValueBtnModel(index);
            })
        },
        modifyTabModelFromRoomAmenities(){
            this.$emit("modifyTabModelFromRoomAmenities");
        },
        btnCancel(){
            this.modifyTabModelFromRoomAmenities();
        },
        btnUploadAXIOSRoomAmenities(){
            let progress = 0;
            this.isLoadingBtnAcept = true;
            this.setReinicializedErrorsStatusRoomModule();
            this.setSnackbarRoomAmenities({stateSnackbar: false, messaggeSnackbar: "", colorSnackbar: ""});
            this.arrayModelBtn.forEach((itemArrayModelBtn, index)=>{
                if(itemArrayModelBtn.btnGroupModel == 'none'){
                    this.roomAmenities.forEach(itemRoomAmenity=>{
                        itemRoomAmenity[this.arrayModelBtn[index].value] = 0;
                    })
                }
                else if(itemArrayModelBtn.btnGroupModel == 'all'){
                    this.roomAmenities.forEach(itemRoomAmenity=>{
                        itemRoomAmenity[this.arrayModelBtn[index].value] = 1;
                    })
                }
            })
            progress++
            this.setProgressbarNavbarStateRoomAndAmenity((progress * 100) / 1);
            this.putRoomAmenitiesAXIOS(this.roomAmenities).then(()=>{
                let returnedErrorObj = this.verifyErrorsPutRoomAmenities();
                this.setSnackbarRoomAmenities({stateSnackbar: true, messaggeSnackbar: returnedErrorObj.messagge, colorSnackbar: returnedErrorObj.color});
                this.isLoadingBtnAcept = false;
                this.setProgressbarNavbarStateRoomAndAmenity(0);
            }).catch(()=>{
                this.setProgressbarNavbarStateRoomAndAmenity(0);
            })
        },
        getValueBtnModel(index){
            if(this.roomAmenities.length > 0){
                let roomAmenitiesFiltered = this.roomAmenities.map(item=>{
                    let returned = {};
                    for (const prop in item) {
                        if (prop != 'room_id' && prop != 'room_name' && prop != 'hotel_id') {
                            returned[prop] = parseInt(item[prop])
                        }
                    }
                    return returned;
                })
                let prop = this.arrayModelBtn[index].value;
                let additionAmenityProp = 0;
                roomAmenitiesFiltered.forEach(itemAmenity=>{
                    if(prop != 'id'){
                        if(itemAmenity[prop] == 1){
                            additionAmenityProp+=1;
                        }
                    }
                })
                console.log("roomAmenitiesFiltered", roomAmenitiesFiltered);
                console.log("reducedValue", additionAmenityProp)
                if(additionAmenityProp == this.roomAmenities.length){
                    this.arrayModelBtn[index].btnGroupModel = 'all'
                }
                else if(additionAmenityProp < this.roomAmenities.length && additionAmenityProp > 0){
                    this.arrayModelBtn[index].btnGroupModel = 'some'
                }
                else{
                    this.arrayModelBtn[index].btnGroupModel = 'none'
                }
            }
            else if(this.roomAmenities.length == 0){
                this.arrayModelBtn[index].btnGroupModel = 'none';
            }
        },
        verifyErrorsPutRoomAmenities(){
          let obj = {};
          if(this.statusRoomsAmenities == 422){
            obj.messagge = "Ocurrió un error al guardar";
            obj.color = "red darken-1";
          }
          else{
            obj.messagge = "Las amenidades se guardaron con éxito";
            obj.color = "green darken-1";
          }
          return obj;
        },
    },
    watch:{
        changeRoomAmenitiesColors(newValue, oldValue){
            this.localSetAmenitiesColors();
        }
    },
    computed:{
        ...mapState({
        currentHotelRooms: (state) => state.RoomModule.currentHotelRooms,
          roomAmenities: (state) => state.RoomModule.roomAmenities,
          snackbarRoomAmenities: (state) => state.RoomModule.snackbarRoomAmenities,
          timeoutSnackbarRoomAmenities: (state) => state.RoomModule.timeoutSnackbarRoomAmenities,
          statusRoomsAmenities: (state) => state.RoomModule.statusRoomsAmenities
        }),
    },
    props:['changeRoomAmenitiesColors']
}
</script>
