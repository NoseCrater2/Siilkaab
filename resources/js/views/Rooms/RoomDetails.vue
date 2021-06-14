<template>
  <div>
    <v-container class="elevation-1 outlined" fluid>
      <div class="text-center mb-n7">
        <span class="text-h4 text-uppercase font-weight-bold"
          >Detalles de habitación</span
        >
        <div class="overline">{{ nameRoom }}</div>
      </div>
      <br />
      <v-card class="pa-4" outlined tile>
        <div class="mb-5">
          <span class="text-h6 black--text">Por favor, selecciona</span>
        </div>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.name"
              v-model="computedRoomName"
              prepend-inner-icon="mdi-form-textbox"
              label="Nombre de habitación"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-select
              :error-messages="errorsDetailsRoom.type"
              :items="typeRoomItems"
              v-model="computedDdwnTypeRoom"
              prepend-inner-icon="mdi-bed-empty"
              label="Tipo de habitación"
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.quantity"
              maxlength="2"
              @keydown="keyhandler"
              :rules="[rules.entireNumbers]"
              v-model.number="computedQuantity"
              prepend-inner-icon="mdi-pen"
              label="Número de habitaciones (de éste tipo)"
              :hint="`${'Alrededor de ' + getHotelRoomsQuantity + ' habitaciones en el hotel/propiedad'}`"
              persistent-hint
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-select
              :error-messages="errorsDetailsRoom.smoking_policy"
              :items="smokingPolicyItems"
              v-model="computedDdwnSmokingPolicy"
              prepend-inner-icon="mdi-smoking"
              label="Política de fumar"
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-select
              :error-messages="errorsDetailsRoom.pool_near"
              :items="poolNearItems"
              v-model="computedDdwnPoolNear"
              prepend-inner-icon="mdi-pool"
              label="Habitación cerca de alberca"
              hint="Informa a los huespedes si hay una (o mas) de estas habitaciones cerca de la piscina. Ellos podran solicitarla de acuerdo a la disponibilidad"
              persistent-hint
              outlined
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.rack_rate"
              @keydown="keyhandlerRate"
              :rules="[rules.validRackRate]"
              v-model="computedRackRate"
              prepend-inner-icon="mdi-cash-multiple"
              label="Tarifa base de habitación"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="mb-n4 d-flex justify-xl-start ml-xl-n2 justify-lg-start ml-lg-n2 justify-md-start ml-md-n2 justify-sm-start ml-sm-n2 justify-center">
            <span class="subtitle-1 black--text">Texto corto</span>
        </v-col>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
          <v-textarea
            :error-messages="errorsDetailsRoom.short_text"
            outlined
            no-resize
            rows="4"
            row-height="30"
            maxlength="120"
            counter
            v-model="computedShortT"
          ></v-textarea>
        </v-col>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="mb-n4 d-flex justify-xl-start ml-xl-n2 justify-lg-start ml-lg-n2 justify-md-start ml-md-n2 justify-sm-start ml-sm-n2 justify-center">
            <span class="subtitle-1 black--text">Texto largo</span>
        </v-col>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
          <MarkdownCompo containerType="RoomDetails"></MarkdownCompo>
        </v-col>
        <br />
        <v-divider></v-divider>
        <div class="mb-8 mt-4">
          <span class="text-h6 black--text">Locación de habitación</span>
        </div>
        <v-select
          :error-messages="errorsDetailsRoom.floor_near"
          class="mb-8"
          :items="floorNearItems"
          v-model="computedDdwnFloorNear"
          prepend-inner-icon="mdi-home-floor-0"
          label="Nivel de piso"
          hint="Esta caracteristica ayudara a los huespedes a entender cual opcion de piso esta disponible. Si estan disponibles tanto el primer piso como pisos superiores, los huespedes pueden hacer un pedido especial basado en la disponibilidad de pisos"
          persistent-hint
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>
        <v-card class="pa-5 mb-7" outlined tile>
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="d-flex justify-xl-start ml-xl-n2 justify-lg-start ml-lg-n2 justify-md-start ml-md-n2 justify-sm-start ml-sm-n2 justify-center">
            <span class="subtitle-1 black--text">Superficie</span>
          </v-col>
          <v-row>
            <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12" class="d-flex justify-xl-start justify-lg-start justify-md-start justify-sm-start justify-center">
              <v-radio-group
                :error-messages="errorsDetailsRoom.size_type"
                v-model="computedSizeType"
                mandatory
                :row="true"
              >
                <v-radio
                  label="Metros"
                  value="meters"
                ></v-radio>
                <v-radio
                  label="Pies"
                  value="feets"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
              <v-text-field
                  :error-messages="errorsDetailsRoom.size"
                  @keydown="keyhandlerRate"
                  :rules="[rules.validSize]"
                  v-model="computedSize"
                  prepend-inner-icon="mdi-pencil-ruler"
                  label="Tamaño"
                  outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-divider></v-divider>
        <div class="mb-7 mt-4">
          <span class="text-h6 black--text">Opciones de camas y ocupancia</span>
        </div>
        <!--Importamos y usamos el componente "StandartArrangement"-->
        <!--Solo sera visible hasta que "getBeds" devuelva el arreglo de camas-->
        <div>
          <component
            v-for="(component, index) in computedArrayComponents"
            :indexBedroom="index"
            :idBedroom="component.idBedroom"
            :idCompo="component.idCompo"
            :key="component.idCompo"
            :objArrCompo="component.objArrCompo"
            :is="component.TagStandartArr"
            @removeCompoBedrooms="removeCompoBedrooms"
          ></component>
        </div>
        <div class="mb-3">
          <v-card color="#f5f5f5" class="pa-5" outlined>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                <span>¿Necesitas agregar más bedrooms para está habitación?</span><br>
                <span class="caption">Por ejemplo, puede tener una habitación doble con 2 camas gemelas (twin) o 1 cama (queen)</span>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12" class="d-flex align-center justify-xl-end justify-lg-end justify-md-end justify-sm-end justify-center">
                <v-btn @click="addCompoButton()" outlined>
                  Agregar bedroom
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div class="mb-4 mt-7">
          <span class="text-h6 black--text">Ocupancia</span>
        </div>
        <div>
          La capacidad asignada solamente refleja la capacidad de huespedes por defecto preasignada a cada habitacion.
          Los huespedes alojados en camas extras y pedidos especiales no deben ser incluidos..
        </div>
        <v-row class="mt-4">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.max_adults"
              maxlength="2"
              @keydown="keyhandler"
              :rules="[rules.entireNumbers]"
              v-model.number="computedMaxAdults"
              prepend-inner-icon="mdi-pen"
              label="Maximo de adultos"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.max_children"
              maxlength="2"
              @keydown="keyhandler"
              :rules="[rules.entireNumbers]"
              v-model.number="computedMaxChildren"
              prepend-inner-icon="mdi-pen"
              label="Maximo de niños"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.max_occpancy"
              maxlength="2"
              @keydown="keyhandler"
              :rules="[rules.entireNumbers]"
              v-model.number="computedMaxOccpancy"
              prepend-inner-icon="mdi-pen"
              label="Maxima ocupación"
              outlined
              hint="El maximo de huespedes (niños y adultos) que esta permitido alojar"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.adult_extra"
              @keydown="keyhandlerRate"
              :rules="[rules.validAdultExtra]"
              v-model.number="computedAdultExtra"
              prepend-inner-icon="mdi-currency-usd"
              label="Cargo extra adultos"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.child_extra"
              @keydown="keyhandlerRate"
              :rules="[rules.validChildExtra]"
              v-model.number="computedChildExtra"
              prepend-inner-icon="mdi-currency-usd"
              label="Cargo extra niños"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              :error-messages="errorsDetailsRoom.baby_extra"
              @keydown="keyhandlerRate"
              :rules="[rules.validBabyExtra]"
              v-model.number="computedBabyExtra"
              prepend-inner-icon="mdi-currency-usd"
              label="Cargo extra bebes"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-btn block color="primary" @click="btnUploadAXIOSRoomChangues()">Continuar</v-btn>
    </v-container>
  </div>
</template>

<script>
import MarkdownCompo from "../../components/Markdown/MarkdownCompo"
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import StandartArrangement from "../../components/Rooms/StandartArrangement";
export default {
  //this.$route.params.id
  //single,double,twin,twin-double,triple,quad,family,suite,studio,apartment,bed-in-room,bungalow,challet,villa,vacation-home,trailer,tent'
  name: "RoomDetails",
  created() {
    //Ejecuta el metodo de carga de la habitacion
    this.chargeDataRoom();
  },
  data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      arrayIdBedroom: [],
      nameRoom: "",
      roomNameModel: "",
      typeRoomItems: [
        "Sencilla",
        "Doble",
        "Gemela",
        "Gemela doble",
        "Triple",
        "Quad",
        "Familiar",
        "Suite",
        "Studio",
        "Apartamento",
        "Cama en la habitación",
        "Bungalow",
        "Challet",
        "Villa",
        "Casa para vacacionar",
        "Trailer",
        "Tienda",
      ],
      ddwnTypeRoomModel: "Sencilla",
      quantityModel: 0,
      smokingPolicyItems: ["Si", "No", "Ambas"],
      ddwnSmokingPolicyModel: "No",
      poolNearItems: ["Todos", "Algunos", "Ninguno"],
      ddwnPoolNearModel: "Ninguno",
      rackRateModel: 0,
      floorNearItems: ["Ambos", "Suelo", "Superior"],
      ddwnFloorNearModel: "Suelo",
      maxAdultsModel: 0,
      maxChildrenModel: 0,
      maxOccpancyModel: 0,
      adultExtraModel: 0,
      childExtraModel: 0,
      babyExtraModel: 0,
      sizeModel: 0,
      sizeTypeModel: "meters",
      shortTextModel: "",
      rules: {
        entireNumbers: value => {
          const pattern = /^(1|[0-9]\d{0,1})$/
          return pattern.test(value) || 'Solo se aceptan numeros'
        },
        validRackRate: value => {
          const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
          let returned = true;
          if(this.rackRateModel > 0){
            if(pattern.test(value) == false){
              returned = 'Solo valores monetarios';
            }
          }
          return returned;
        },
        validSize: value => {
          const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
          let returned = true;
          if(this.sizeModel > 0){
            if(pattern.test(value) == false){
              returned = 'Solo valores monetarios';
            }
          }
          return returned;
        },
        validAdultExtra: value => {
          const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
          let returned = true;
          if(this.adultExtraModel > 0){
            if(pattern.test(value) == false){
              returned = 'Solo valores monetarios';
            }
          }
          return returned;
        },
        validChildExtra: value => {
          const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
          let returned = true;
          if(this.childExtraModel > 0){
            if(pattern.test(value) == false){
              returned = 'Solo valores monetarios';
            }
          }
          return returned;
        },
        validBabyExtra: value => {
          const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
          let returned = true;
          if(this.babyExtraModel > 0){
            if(pattern.test(value) == false){
              returned = 'Solo valores monetarios';
            }
          }
          return returned;
        }
      },
    };
  },
  methods: {
    ...mapActions(["getRoomDetails", "getBedrooms", "getBeds", "postPutEditRoomsAXIOS", "postPutEditBedroomsAXIOS"]),
    ...mapMutations(["setReinicializedRoomModule", "setReinicializedErrorsStatusRoomModule", "setErrorsDetailsRoom", "setStatusDetailsRoom"]),
    keyhandler(event) {
      const pattern = /^(1|[0-9]\d{0,1})$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab'){
        event.preventDefault();
      }
    },
    keyhandlerRate(event) {
      const pattern = /^\s*?(\d+(\.\d{1,2})?|\.\d+)\s*$/
      if (!pattern.test(event.key) && event.key != 'Backspace' && event.key != 'Tab' && event.key != '.'){
        event.preventDefault();
      }
    },
    removeCompoBedrooms(idCompoParam){
      let deletedBedroomIndex = -1;
      let deleteBedsIndex = -1;
      let localIdBedroom;
      this.arrayComponents.forEach((elementArray, indexArray)=>{
        if(elementArray.idCompo == idCompoParam){
          localIdBedroom = elementArray.idBedroom;
          deletedBedroomIndex = indexArray;
          elementArray.objArrCompo.deleted = "DELETED";
        }
      })
      this.beds.forEach((elementArrayBed, indexElementArrayBed)=>{
        if(Array.isArray(elementArrayBed) == true){
          if(elementArrayBed[0].idBedroom == localIdBedroom){
            let indexWhile = 0;
            while(indexWhile < elementArrayBed.length){
              elementArrayBed[indexWhile].deleted = "DELETED";
              indexWhile++;
            }
          }
        }
        else if(Array.isArray(elementArrayBed) == false){
          if(elementArrayBed.idBedroom == localIdBedroom){
            deleteBedsIndex = indexElementArrayBed;
          }
        }
      })
      if(deleteBedsIndex > -1){
        this.beds[deleteBedsIndex] = new Array();
        this.beds[deleteBedsIndex].push({
          deleted: "DELETED",
          idBedroom: localIdBedroom
        })
      }
      if(deletedBedroomIndex > -1){
        this.arrayComponents.splice(deletedBedroomIndex, 1);
      }
    },
    chargeDataRoom(){
      this.setReinicializedRoomModule(); //Reinicia el objeto room (esto es por que no hay una recarga de pag con router-link)
      this.setReinicializedErrorsStatusRoomModule();
      if(typeof(this.idRoom)!='undefined'){
        this.getRoomDetails(this.$route.params.idRoom).then(() => {
          this.nameRoom = this.roomDetails.name;
          //Llamamos al metodo "getBedrooms" para llenar las habitaciones
          this.getBedrooms(parseInt(this.idRoom)).then(() => {
            let arrayBedroomsFilter = this.bedrooms.map((itemBedroom) => {
              if (itemBedroom.room_id == parseInt(this.idRoom)) {
                return itemBedroom.id;
              }
            });
            this.arrayIdBedroom = arrayBedroomsFilter;
            this.getBeds(this.arrayIdBedroom).then(()=>{
              let countWhile = 0;
              if(this.bedrooms.length > 0){
                while (countWhile <= this.bedrooms.length - 1) {
                  this.addCompo(this.bedrooms[countWhile]);
                  countWhile++;
                }
              }
              else if(this.bedrooms.length == 0){
                this.addCompoButton();
              }
            })
          });
        });
      }
      else if(typeof(this.idRoom)=='undefined'){
        this.roomDetails.id = "NEW"
        this.roomDetails.hotel_id = parseInt(this.idHotel)
        this.addCompoButton();
      }
    },
    addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArr: StandartArrangement,
        objArrCompo: obj,
        idBedroom: obj.id
      });
    },
    addCompoButton() {
      this.countIdCompo++;
      let obj = {
          id: "NEW"+this.countIdCompo, //Se pone "NEW" para identificarlo en el posterior metodo PUT
          idCompo: this.countIdCompo,
          private_bathroom: 0,
          room_id: typeof(this.idRoom)!='undefined' ? parseInt(this.idRoom) : "NEW"
      }
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArr: StandartArrangement,
        objArrCompo: obj,
        idBedroom: obj.id
      });
      this.bedrooms.push(
        this.arrayComponents[this.arrayComponents.length - 1].objArrCompo
      );
      this.beds.push({idBedroom: "NEW"+this.countIdCompo});
    },
    btnUploadAXIOSRoomChangues(){
      //Seteamos las variables de error
      this.setErrorsDetailsRoom([])
      this.setStatusDetailsRoom(0)
      //Ejecutamos la accion que gaurdara las habitaciones
      this.postPutEditRoomsAXIOS(this.roomDetails).then(()=>{
        //Verificamos si hay algun error
        if(Object.entries(this.errorsDetailsRoom).length === 0){
          this.nameRoom = this.roomDetails.name;
          this.bedrooms.forEach(bedroomElement =>{
            if(bedroomElement.room_id == "NEW"){
              bedroomElement.room_id = this.roomDetails.id;
            }
            console.log("this.roomDetailsFFFF", this.roomDetails)
          })
        }
        this.postPutEditBedroomsAXIOS(this.bedrooms);
        console.log("this.beds", this.beds)
      });
    }
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      roomDetails: (state) => state.RoomModule.roomDetails,
      bedrooms: (state) => state.RoomModule.bedrooms,
      beds: (state) => state.RoomModule.beds,
      errorsDetailsRoom: (state) => state.RoomModule.errorsDetailsRoom
    }),
    ...mapGetters(["getHotelRoomsQuantity"]),
    computedRoomName: {
      get() {
        return this.roomDetails.name != null ? this.roomDetails.name : this.roomNameModel;
      },
      set(model) {
        this.roomNameModel = model;
        this.roomDetails.name = this.roomNameModel;
        return this.roomNameModel;
      },
    },
    computedDdwnTypeRoom: {
      get() {
        if (this.roomDetails.type != null) {
          if (this.roomDetails.type == "single") {
            this.ddwnTypeRoomModel = "Sencilla";
          }
          if (this.roomDetails.type == "double") {
            this.ddwnTypeRoomModel = "Doble";
          }
          if (this.roomDetails.type == "twin") {
            this.ddwnTypeRoomModel = "Gemela";
          }
          if (this.roomDetails.type == "twin-double") {
            this.ddwnTypeRoomModel = "Gemela doble";
          }
          if (this.roomDetails.type == "triple") {
            this.ddwnTypeRoomModel = "Triple";
          }
          if (this.roomDetails.type == "quad") {
            this.ddwnTypeRoomModel = "Quad";
          }
          if (this.roomDetails.type == "family") {
            this.ddwnTypeRoomModel = "Familiar";
          }
          if (this.roomDetails.type == "suite") {
            this.ddwnTypeRoomModel = "Suite";
          }
          if (this.roomDetails.type == "studio") {
            this.ddwnTypeRoomModel = "Studio";
          }
          if (this.roomDetails.type == "apartment") {
            this.ddwnTypeRoomModel = "Apartamento";
          }
          if (this.roomDetails.type == "bed-in-room") {
            this.ddwnTypeRoomModel = "Cama en la habitación";
          }
          if (this.roomDetails.type == "bungalow") {
            this.ddwnTypeRoomModel = "Bungalow";
          }
          if (this.roomDetails.type == "challet") {
            this.ddwnTypeRoomModel = "Challet";
          }
          if (this.roomDetails.type == "villa") {
            this.ddwnTypeRoomModel = "Villa";
          }
          if (this.roomDetails.type == "vacation-home") {
            this.ddwnTypeRoomModel = "Casa para vacacionar";
          }
          if (this.roomDetails.type == "trailer") {
            this.ddwnTypeRoomModel = "Trailer";
          }
          if (this.roomDetails.type == "tent") {
            this.ddwnTypeRoomModel = "Tienda";
          }
        }
        return this.ddwnTypeRoomModel;
      },
      set(model) {
        this.ddwnTypeRoomModel = model;
        if (this.ddwnTypeRoomModel == "Sencilla") {
          this.roomDetails.type = "single";
        }
        if (this.ddwnTypeRoomModel == "Doble") {
          this.roomDetails.type = "double";
        }
        if (this.ddwnTypeRoomModel == "Gemela") {
          this.roomDetails.type = "twin";
        }
        if (this.ddwnTypeRoomModel == "Gemela doble") {
          this.roomDetails.type = "twin-double";
        }
        if (this.ddwnTypeRoomModel == "Triple") {
          this.roomDetails.type = "triple";
        }
        if (this.ddwnTypeRoomModel == "Quad") {
          this.roomDetails.type = "quad";
        }
        if (this.ddwnTypeRoomModel == "Familiar") {
          this.roomDetails.type = "family";
        }
        if (this.ddwnTypeRoomModel == "Suite") {
          this.roomDetails.type = "suite";
        }
        if (this.ddwnTypeRoomModel == "Studio") {
          this.roomDetails.type = "studio";
        }
        if (this.ddwnTypeRoomModel == "Apartamento") {
          this.roomDetails.type = "apartment";
        }
        if (this.ddwnTypeRoomModel == "Cama en la habitación") {
          this.roomDetails.type = "bed-in-room";
        }
        if (this.ddwnTypeRoomModel == "Bungalow") {
          this.roomDetails.type = "bungalow";
        }
        if (this.ddwnTypeRoomModel == "Challet") {
          this.roomDetails.type = "challet";
        }
        if (this.ddwnTypeRoomModel == "Villa") {
          this.roomDetails.type = "villa";
        }
        if (this.ddwnTypeRoomModel == "Casa para vacacionar") {
          this.roomDetails.type = "vacation-home";
        }
        if (this.ddwnTypeRoomModel == "Trailer") {
          this.roomDetails.type = "trailer";
        }
        if (this.ddwnTypeRoomModel == "Tienda") {
          this.roomDetails.type = "tent";
        }
        return this.ddwnTypeRoomModel;
      },
    },
    computedQuantity: {
      get() {
        return this.roomDetails.quantity != null ? this.roomDetails.quantity : this.quantityModel;
      },
      set(model) {
        if(model == ""){
          model = 0
        }
        this.quantityModel = parseInt(model);
        this.roomDetails.quantity = this.quantityModel;
        return this.quantityModel;
      },
    },
    computedDdwnSmokingPolicy: {
      get() {
        if (this.roomDetails.smoking_policy != null) {
          if (this.roomDetails.smoking_policy == "yes") {
            this.ddwnSmokingPolicyModel = "Si";
          }
          if (this.roomDetails.smoking_policy == "no") {
            this.ddwnSmokingPolicyModel = "No";
          }
          if (this.roomDetails.smoking_policy == "both") {
            this.ddwnSmokingPolicyModel = "Ambas";
          }
        }
        return this.ddwnSmokingPolicyModel;
      },
      set(model) {
        this.ddwnSmokingPolicyModel = model;
        if (this.ddwnSmokingPolicyModel == "Si") {
          this.roomDetails.smoking_policy = "yes";
        }
        if (this.ddwnSmokingPolicyModel == "No") {
          this.roomDetails.smoking_policy = "no";
        }
        if (this.ddwnSmokingPolicyModel == "Ambas") {
          this.roomDetails.smoking_policy = "both";
        }
        return this.ddwnSmokingPolicyModel;
      },
    },
    computedDdwnPoolNear: {
      get() {
        if (this.roomDetails.pool_near != null) {
          if (this.roomDetails.pool_near == "all") {
            this.ddwnPoolNearModel = "Todos";
          }
          if (this.roomDetails.pool_near == "some") {
            this.ddwnPoolNearModel = "Algunos";
          }
          if (this.roomDetails.pool_near == "none") {
            this.ddwnPoolNearModel = "Ninguno";
          }
        }
        return this.ddwnPoolNearModel;
      },
      set(model) {
        this.ddwnPoolNearModel = model;
        if (this.ddwnPoolNearModel == "Todos") {
          this.roomDetails.pool_near = "all";
        }
        if (this.ddwnPoolNearModel == "Algunos") {
          this.roomDetails.pool_near = "some";
        }
        if (this.ddwnPoolNearModel == "Ninguno") {
          this.roomDetails.pool_near = "none";
        }
        return this.ddwnPoolNearModel;
      },
    },
    computedRackRate: {
      get() {
        return this.roomDetails.rack_rate != null ? this.roomDetails.rack_rate : this.rackRateModel;
      },
      set(model) {
        if(model == "" || model == "."){
          model = 0;
        }
        this.rackRateModel = parseFloat(model);
        this.roomDetails.rack_rate = this.rackRateModel;
        return this.rackRateModel;
      },
    },
    computedDdwnFloorNear: {
      get() {
        if (this.roomDetails.floor_near != null) {
          if (this.roomDetails.floor_near == "both") {
            this.ddwnFloorNearModel = "Ambos";
          }
          if (this.roomDetails.floor_near == "ground") {
            this.ddwnFloorNearModel = "Suelo";
          }
          if (this.roomDetails.floor_near == "upper") {
            this.ddwnFloorNearModel = "Superior";
          }
        }
        return this.ddwnFloorNearModel;
      },
      set(model) {
        this.ddwnFloorNearModel = model;
        if (this.ddwnFloorNearModel == "Ambos") {
          this.roomDetails.floor_near = "both";
        }
        if (this.ddwnFloorNearModel == "Suelo") {
          this.roomDetails.floor_near = "ground";
        }
        if (this.ddwnFloorNearModel == "Superior") {
          this.roomDetails.floor_near = "upper";
        }
        return this.ddwnFloorNearModel;
      },
    },
    computedShortT:{
      get() {
        return this.roomDetails.short_text != null ? this.roomDetails.short_text : this.shortTextModel;
      },
      set(model) {
        this.shortTextModel = model;
        this.roomDetails.short_text = this.shortTextModel;
        return this.shortTextModel;
      },
    },
    computedSize: {
      get() {
        return this.roomDetails.size != null ? this.roomDetails.size : this.sizeModel;
      },
      set(model) {
        if(model == "" || model == "."){
          model = 0;
        }
        this.sizeModel = parseFloat(model);
        this.roomDetails.size = this.sizeModel;
        return this.sizeModel;
      },
    },
    computedSizeType: {
      get() {
        return this.roomDetails.size_type != null ? this.roomDetails.size_type != null : this.sizeTypeModel;
      },
      set(model) {
        this.sizeTypeModel = model;
        this.roomDetails.size_type = this.sizeTypeModel;
        return this.sizeTypeModel;
      },
    },
    computedMaxAdults: {
      get() {
        return this.roomDetails.max_adults != null ? this.roomDetails.max_adults : this.maxAdultsModel;
      },
      set(model) {
        if(model == ""){
          model = 0
        }
        this.maxAdultsModel = parseInt(model);
        this.roomDetails.max_adults = this.maxAdultsModel;
        return this.maxAdultsModel;
      },
    },
    computedMaxChildren: {
      get() {
        return this.roomDetails.max_children != null ? this.roomDetails.max_children : this.maxChildrenModel;
      },
      set(model) {
        if(model == ""){
          model = 0
        }
        this.maxChildrenModel = parseInt(model);
        this.roomDetails.max_children = this.maxChildrenModel;
        return this.maxChildrenModel;
      },
    },
    computedMaxOccpancy: {
      get() {
        return this.roomDetails.max_occpancy != null ? this.roomDetails.max_occpancy : this.maxOccpancyModel;
      },
      set(model) {
        if(model == ""){
          model = 0
        }
        this.maxOccpancyModel = parseInt(model);
        this.roomDetails.max_occpancy = this.maxOccpancyModel;
        return this.maxOccpancyModel;
      },
    },
    computedAdultExtra: {
      get() {
        return this.roomDetails.adult_extra != null ? this.roomDetails.adult_extra : this.adultExtraModel;
      },
      set(model) {
        if(model == "" || model == "."){
          model = 0
        }
        this.adultExtraModel = parseFloat(model);
        this.roomDetails.adult_extra = this.adultExtraModel;
        return this.adultExtraModel;
      },
    },
    computedChildExtra: {
      get() {
        return this.roomDetails.child_extra != null ? this.roomDetails.child_extra : this.childExtraModel;
      },
      set(model) {
        if(model == "" || model == "."){
          model = 0
        }
        this.childExtraModel = parseFloat(model);
        this.roomDetails.child_extra = this.childExtraModel;
        return this.childExtraModel;
      },
    },
    computedBabyExtra: {
      get() {
        return this.roomDetails.baby_extra != null ? this.roomDetails.baby_extra : this.babyExtraModel;
      },
      set(model) {
        if(model == "" || model == "."){
          model = 0
        }
        this.babyExtraModel = parseFloat(model);
        this.roomDetails.baby_extra = this.babyExtraModel;
        return this.babyExtraModel;
      },
    },
    computedArrayComponents() {
      return this.arrayComponents;
    },
  },
  components: {
    StandartArrangement,
    MarkdownCompo
  },
  props: {
    idRoom: {
      type: [Number, String]
    },
    idHotel: {
      type: [Number, String]
    }
  }
};
</script>
