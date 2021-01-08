(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Rooms_StandartArrangementBeds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Rooms/StandartArrangementBeds */ "./resources/js/components/Rooms/StandartArrangementBeds.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//twin,full,queen,king,triple,quad


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StandartArrangement",
  mounted: function mounted() {
    var _this = this;

    var countWhile = 0;
    this.indexArrayBedroomBeds = this.beds.findIndex(function (element, index) {
      if (element[0].idBedroom == _this.idBedroomModel) {
        return element;
      }
    });

    while (countWhile <= this.beds[this.indexArrayBedroomBeds].length - 1) {
      this.addCompo(this.beds[this.indexArrayBedroomBeds][countWhile]);
      countWhile++;
    }
  },
  data: function data() {
    return {
      indexArrayBedroomBeds: null,
      idBedroomModel: this.idBedroom,
      arrayComponents: [],
      countIdCompo: -1
    };
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])(["setArrayBeds"])), {}, {
    addCompoButton: function addCompoButton() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArrBeds: _components_Rooms_StandartArrangementBeds__WEBPACK_IMPORTED_MODULE_1__["default"],
        objArrCompo: {
          idBedroom: this.idBedroomModel,
          obj: {
            id: "NEW",
            //Se pone "NEW" para identificarlo en el posterior metodo PUT
            type: null,
            quantity: 0,
            bedroom_id: null
          }
        }
      });

      if (typeof this.beds[this.indexArrayBedroomBeds] == "undefined") {
        this.beds[this.indexArrayBedroomBeds] = new Array();
        console.log("undefined", this.beds);
      }

      this.beds[this.indexArrayBedroomBeds].push(this.arrayComponents[this.arrayComponents.length - 1].objArrCompo);
    },
    addCompo: function addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArrBeds: _components_Rooms_StandartArrangementBeds__WEBPACK_IMPORTED_MODULE_1__["default"],
        objArrCompo: obj
      });
    },
    removeCompoBeds: function removeCompoBeds(idCompoParam) {
      var indexTempArray = []; //Arreglo donde se guardan los indices de los componentes que no son editados

      var countWhile = this.beds.length - 1; //Contador que sera usado en el while interno del for que recorre el arreglo de beds

      var indexEditable = 0; //Variable que guarda el indice del arreglo que se esta editando

      for (var i = 0; i < this.beds.length; i++) {
        //Ciclo while que verifica si en el actual arreglo existen o no
        //Arreglos con length = 0
        while (countWhile >= 0) {
          if (typeof this.beds[countWhile][0] == "undefined") {
            var arr = this.beds;
            arr.splice(countWhile, 1);
            this.setArrayBeds(arr);
          }

          countWhile--;
        } //Si el idBedroom del actual arreglo no coincide con la variable global de idBedroom
        //Entonces


        if (this.beds[i][0].idBedroom != this.idBedroomModel) {
          //Se guarda el indice del arreglo general que no se esta editando
          indexTempArray.push(i);
        } else {
          //Si no, se guarda en la variable el indice del elemento que se esta editando
          indexEditable = i;
        }
      }

      var countIndexTempArray = 0;
      var tempArrayNoEditables = []; //Arreglo que guardara los elementos que no fueron editados

      while (countIndexTempArray <= indexTempArray.length - 1) {
        tempArrayNoEditables.push(this.beds[indexTempArray[countIndexTempArray]]);
        countIndexTempArray++;
      }

      var idCompoMap = this.arrayComponents.map(function (element) {
        return element.idCompo;
      }).indexOf(idCompoParam); //Del arrayComponents quitamos la bed que se esta eliminando

      this.arrayComponents.splice(idCompoMap, 1); //Seteamos "this.arrayComponents" en una nueva variable
      //Para unicamente sacar su propiedad "objArrCompo"

      var mapArrayComponents = this.arrayComponents.map(function (element) {
        return element.objArrCompo;
      }); //Inicializamos la variable "setArrayBeds" con los elementos temporales que no fueron editados ("tempArrayNoEditables")

      var setArrayBeds = tempArrayNoEditables; //Y a este arreglo le agregamos el arreglo mapeado

      setArrayBeds.splice(indexEditable, 0, mapArrayComponents); //Mandamos el array "setArrayBeds" que se seteara en la variable state "beds"

      this.setArrayBeds(setArrayBeds);
      var countFinalWhile = this.beds.length - 1;

      while (countFinalWhile >= 0) {
        if (typeof this.beds[countFinalWhile][0] == "undefined") {
          var _arr = this.beds;

          _arr.splice(countFinalWhile, 1);

          this.setArrayBeds(_arr);
        }

        countFinalWhile--;
      }

      console.log(this.beds);
    }
  }),
  components: {
    StandartArrangementBeds: _components_Rooms_StandartArrangementBeds__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    beds: function beds(state) {
      return state.RoomModule.beds;
    }
  })), {}, {
    computedArrayComponents: function computedArrayComponents() {
      return this.arrayComponents;
    }
  }),
  props: {
    idBedroom: Number,
    idCompo: Number,
    objArrCompo: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StandartArrangementBeds",
  mounted: function mounted() {
    if (this.objArrCompo["obj"].type != null) {
      if (this.objArrCompo["obj"].type == "twin") {
        this.ddwnRoomTypeModel = "Twin";
      }

      if (this.objArrCompo["obj"].type == "full") {
        this.ddwnRoomTypeModel = "Full";
      }

      if (this.objArrCompo["obj"].type == "queen") {
        this.ddwnRoomTypeModel = "Queen";
      }

      if (this.objArrCompo["obj"].type == "king") {
        this.ddwnRoomTypeModel = "King";
      }

      if (this.objArrCompo["obj"].type == "triple") {
        this.ddwnRoomTypeModel = "Triple";
      }

      if (this.objArrCompo["obj"].type == "quad") {
        this.ddwnRoomTypeModel = "Quad";
      }
    }

    this.bedQuantityModel = this.objArrCompo["obj"].quantity;
  },
  data: function data() {
    return {
      id: this.idCompo,
      roomTypeItems: ["Twin", "Full", "Queen", "King", "Triple", "Quad"],
      ddwnRoomTypeModel: null,
      bedQuantityModel: null
    };
  },
  methods: {
    removeCompoBeds: function removeCompoBeds(id) {
      this.$emit("removeCompoBeds", id);
    }
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    beds: function beds(state) {
      return state.RoomModule.beds;
    }
  })), {}, {
    computedDdwnRoomType: {
      get: function get() {
        return this.ddwnRoomTypeModel;
      },
      set: function set(model) {
        this.ddwnRoomTypeModel = model;

        if (this.ddwnRoomTypeModel == "Twin") {
          this.objArrCompo["obj"].type = "twin";
        }

        if (this.ddwnRoomTypeModel == "Full") {
          this.objArrCompo["obj"].type = "full";
        }

        if (this.ddwnRoomTypeModel == "Queen") {
          this.objArrCompo["obj"].type = "queen";
        }

        if (this.ddwnRoomTypeModel == "King") {
          this.objArrCompo["obj"].type = "King";
        }

        if (this.ddwnRoomTypeModel == "Triple") {
          this.objArrCompo["obj"].type = "triple";
        }

        if (this.ddwnRoomTypeModel == "Quad") {
          this.objArrCompo["obj"].type = "quad";
        }

        return this.ddwnRoomTypeModel;
      }
    },
    computedBedQuantity: {
      get: function get() {
        return this.bedQuantityModel;
      },
      set: function set(model) {
        this.bedQuantityModel = model;
        this.objArrCompo["obj"].quantity = this.bedQuantityModel;
        return this.bedQuantityModel;
      }
    }
  }),
  props: {
    idCompo: Number,
    objArrCompo: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Rooms_StandartArrangement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Rooms/StandartArrangement */ "./resources/js/components/Rooms/StandartArrangement.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  //this.$route.params.id
  //single,double,twin,twin-double,triple,quad,family,suite,studio,apartment,bed-in-room,bungalow,challet,villa,vacation-home,trailer,tent'
  name: "RoomDetails",
  created: function created() {
    var _this = this;

    this.getRoomDetails(this.idRoom).then(function () {
      _this.nameRoom = _this.roomDetails.name;
      _this.roomNameModel = _this.roomDetails.name;

      if (_this.roomDetails.type != null) {
        if (_this.roomDetails.type == "single") {
          _this.ddwnTypeRoomModel = "Sencilla";
        }

        if (_this.roomDetails.type == "double") {
          _this.ddwnTypeRoomModel = "Doble";
        }

        if (_this.roomDetails.type == "twin") {
          _this.ddwnTypeRoomModel = "Gemela";
        }

        if (_this.roomDetails.type == "twin-double") {
          _this.ddwnTypeRoomModel = "Gemela doble";
        }

        if (_this.roomDetails.type == "triple") {
          _this.ddwnTypeRoomModel = "Triple";
        }

        if (_this.roomDetails.type == "quad") {
          _this.ddwnTypeRoomModel = "Quad";
        }

        if (_this.roomDetails.type == "family") {
          _this.ddwnTypeRoomModel = "Familiar";
        }

        if (_this.roomDetails.type == "suite") {
          _this.ddwnTypeRoomModel = "Suite";
        }

        if (_this.roomDetails.type == "studio") {
          _this.ddwnTypeRoomModel = "Studio";
        }

        if (_this.roomDetails.type == "apartment") {
          _this.ddwnTypeRoomModel = "Apartamento";
        }

        if (_this.roomDetails.type == "bed-in-room") {
          _this.ddwnTypeRoomModel = "Cama en la habitación";
        }

        if (_this.roomDetails.type == "bungalow") {
          _this.ddwnTypeRoomModel = "Bungalow";
        }

        if (_this.roomDetails.type == "challet") {
          _this.ddwnTypeRoomModel = "Challet";
        }

        if (_this.roomDetails.type == "villa") {
          _this.ddwnTypeRoomModel = "Villa";
        }

        if (_this.roomDetails.type == "vacation-home") {
          _this.ddwnTypeRoomModel = "Casa para vacacionar";
        }

        if (_this.roomDetails.type == "trailer") {
          _this.ddwnTypeRoomModel = "Trailer";
        }

        if (_this.roomDetails.type == "tent") {
          _this.ddwnTypeRoomModel = "Tienda";
        }
      }

      _this.quantityModel = _this.roomDetails.quantity;

      if (_this.roomDetails.smoking_policy != null) {
        if (_this.roomDetails.smoking_policy == "yes") {
          _this.ddwnSmokingPolicyModel = "Si";
        }

        if (_this.roomDetails.smoking_policy == "no") {
          _this.ddwnSmokingPolicyModel = "No";
        }

        if (_this.roomDetails.smoking_policy == "both") {
          _this.ddwnSmokingPolicyModel = "Ambas";
        }
      }

      if (_this.roomDetails.pool_near != null) {
        if (_this.roomDetails.pool_near == "all") {
          _this.ddwnPoolNearModel = "Todos";
        }

        if (_this.roomDetails.pool_near == "some") {
          _this.ddwnPoolNearModel = "Algunos";
        }

        if (_this.roomDetails.pool_near == "none") {
          _this.ddwnPoolNearModel = "Ninguno";
        }
      }

      _this.rackRateModel = _this.roomDetails.rack_rate;

      if (_this.roomDetails.floor_near != null) {
        if (_this.roomDetails.floor_near == "both") {
          _this.ddwnFloorNearModel = "Ambos";
        }

        if (_this.roomDetails.floor_near == "ground") {
          _this.ddwnFloorNearModel = "Suelo";
        }

        if (_this.roomDetails.floor_near == "upper") {
          _this.ddwnFloorNearModel = "Superior";
        }
      }

      _this.maxAdultsModel = _this.roomDetails.max_adults;
      _this.maxChildrenModel = _this.roomDetails.max_children;
      _this.maxOccpancyModel = _this.roomDetails.max_occpancy; //Llamamos al metodo "getBedrooms" para llenar las habitaciones

      _this.getBedrooms(_this.idRoom).then(function () {
        var arrayBedroomsFilter = _this.bedrooms.map(function (itemBedroom) {
          if (itemBedroom.room_id == _this.idRoom) {
            return itemBedroom.id;
          }
        });

        _this.idBedroom = arrayBedroomsFilter;
        var countWhile = 0;

        while (countWhile <= _this.bedrooms.length - 1) {
          _this.addCompo(_this.bedrooms[countWhile]);

          countWhile++;
        }

        _this.getBeds(_this.idBedroom).then(function () {});
      });
    });
  },
  data: function data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      idRoom: this.$route.params.id,
      idBedroom: null,
      nameRoom: null,
      roomNameModel: null,
      typeRoomItems: ["Sencilla", "Doble", "Gemela", "Gemela doble", "Triple", "Quad", "Familiar", "Suite", "Studio", "Apartamento", "Cama en la habitación", "Bungalow", "Challet", "Villa", "Casa para vacacionar", "Trailer", "Tienda"],
      ddwnTypeRoomModel: null,
      quantityModel: null,
      smokingPolicyItems: ["Si", "No", "Ambas"],
      ddwnSmokingPolicyModel: null,
      poolNearItems: ["Todos", "Algunos", "Ninguno"],
      ddwnPoolNearModel: null,
      rackRateModel: null,
      floorNearItems: ["Ambos", "Suelo", "Superior"],
      ddwnFloorNearModel: null,
      maxAdultsModel: null,
      maxChildrenModel: null,
      maxOccpancyModel: null,
      items: ["Suite", "Luxury"],
      selected: []
    };
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getRoomDetails", "getBedrooms", "getBeds"])), {}, {
    addCompo: function addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagStandartArr: _components_Rooms_StandartArrangement__WEBPACK_IMPORTED_MODULE_1__["default"],
        objArrCompo: obj,
        idBedroom: obj.id
      });
    }
  }),
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    roomDetails: function roomDetails(state) {
      return state.RoomModule.roomDetails;
    },
    bedrooms: function bedrooms(state) {
      return state.RoomModule.bedrooms;
    },
    beds: function beds(state) {
      return state.RoomModule.beds;
    }
  })), {}, {
    computedRoomName: {
      get: function get() {
        return this.roomNameModel;
      },
      set: function set(model) {
        this.roomNameModel = model;
        this.roomDetails.name = this.roomNameModel;
        return this.roomNameModel;
      }
    },
    computedDdwnTypeRoom: {
      get: function get() {
        return this.ddwnTypeRoomModel;
      },
      set: function set(model) {
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
      }
    },
    computedQuantity: {
      get: function get() {
        return this.quantityModel;
      },
      set: function set(model) {
        this.quantityModel = model;
        this.roomDetails.quantity = this.quantityModel;
        return this.quantityModel;
      }
    },
    computedDdwnSmokingPolicy: {
      get: function get() {
        return this.ddwnSmokingPolicyModel;
      },
      set: function set(model) {
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
      }
    },
    computedDdwnPoolNear: {
      get: function get() {
        return this.ddwnPoolNearModel;
      },
      set: function set(model) {
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
      }
    },
    computedRackRate: {
      get: function get() {
        return this.rackRateModel;
      },
      set: function set(model) {
        this.rackRateModel = model;
        this.roomDetails.rack_rate = this.rackRateModel;
        return this.rackRateModel;
      }
    },
    computedDdwnFloorNear: {
      get: function get() {
        return this.ddwnFloorNearModel;
      },
      set: function set(model) {
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
      }
    },
    computedMaxAdults: {
      get: function get() {
        return this.maxAdultsModel;
      },
      set: function set(model) {
        this.maxAdultsModel = model;
        this.roomDetails.max_adults = this.maxAdultsModel;
        return this.maxAdultsModel;
      }
    },
    computedMaxChildren: {
      get: function get() {
        return this.maxChildrenModel;
      },
      set: function set(model) {
        this.maxChildrenModel = model;
        this.roomDetails.max_children = this.maxChildrenModel;
        return this.maxChildrenModel;
      }
    },
    computedMaxOccpancy: {
      get: function get() {
        return this.maxOccpancyModel;
      },
      set: function set(model) {
        this.maxOccpancyModel = model;
        this.roomDetails.max_occpancy = this.maxOccpancyModel;
        return this.maxOccpancyModel;
      }
    },
    computedArrayComponents: function computedArrayComponents() {
      return this.arrayComponents;
    }
  }),
  components: {
    StandartArrangement: _components_Rooms_StandartArrangement__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "mb-3" },
    [
      _c(
        "v-card",
        { staticClass: "pa-5", attrs: { color: "#f5f5f5", outlined: "" } },
        [
          _c(
            "div",
            { staticClass: "font-weight-bold primary--text mb-3 mt-2" },
            [_vm._v("\n      Arreglo Estandar\n    ")]
          ),
          _vm._v(" "),
          _c("div", [
            _vm._v("¿Qué tipo de camas estan disponibles en esta habitación?")
          ]),
          _vm._v(" "),
          _vm._l(_vm.computedArrayComponents, function(component) {
            return _c(component.TagStandartArrBeds, {
              key: component.idCompo,
              tag: "component",
              attrs: {
                idCompo: component.idCompo,
                objArrCompo: component.objArrCompo
              },
              on: { removeCompoBeds: _vm.removeCompoBeds }
            })
          }),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "ml-n3 mt-5",
              attrs: { cols: "12", md: "12", sm: "12", xs: "12" }
            },
            [
              _c(
                "v-btn",
                {
                  attrs: { elevation: "0", dark: "" },
                  on: {
                    click: function($event) {
                      return _vm.addCompoButton()
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("mdi-plus-circle")
                  ]),
                  _vm._v("Agregar otra cama\n      ")
                ],
                1
              )
            ],
            1
          )
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6& ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-row",
        { staticClass: "mb-n5", attrs: { align: "center", justify: "start" } },
        [
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
            [
              _c("v-select", {
                attrs: {
                  items: _vm.roomTypeItems,
                  "prepend-inner-icon": "mdi-bed-empty",
                  outlined: "",
                  dense: "",
                  "menu-props": { bottom: true, offsetY: true }
                },
                model: {
                  value: _vm.computedDdwnRoomType,
                  callback: function($$v) {
                    _vm.computedDdwnRoomType = $$v
                  },
                  expression: "computedDdwnRoomType"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "d-flex justify-center align-center mt-n7",
              attrs: { cols: "12", md: "1", sm: "1", xs: "12" }
            },
            [_c("div", [_vm._v("x")])]
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "4", sm: "4", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: { label: "Cantidad de camas", dense: "", outlined: "" },
                model: {
                  value: _vm.computedBedQuantity,
                  callback: function($$v) {
                    _vm.computedBedQuantity = $$v
                  },
                  expression: "computedBedQuantity"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "d-flex justify-center align-center mt-n7",
              attrs: { cols: "12", md: "1", sm: "1", xs: "12" }
            },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    color: "error",
                    fab: "",
                    small: "",
                    dark: "",
                    depressed: ""
                  },
                  on: {
                    click: function($event) {
                      return _vm.removeCompoBeds(_vm.id)
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-delete")])],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-container",
        { staticClass: "elevation-1 outlined", attrs: { fluid: "" } },
        [
          _c("div", { staticClass: "text-center mb-n7" }, [
            _c(
              "span",
              { staticClass: "text-h4 text-uppercase font-weight-bold" },
              [_vm._v("Detalles de habitación")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "overline" }, [
              _vm._v(_vm._s(_vm.nameRoom))
            ])
          ]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c(
            "v-card",
            { staticClass: "pa-4", attrs: { outlined: "", tile: "" } },
            [
              _c("div", { staticClass: "mb-5" }, [
                _c("span", { staticClass: "text-h6 black--text" }, [
                  _vm._v("Por favor, selecciona")
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          "prepend-inner-icon": "mdi-form-textbox",
                          label: "Nombre de habitación",
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedRoomName,
                          callback: function($$v) {
                            _vm.computedRoomName = $$v
                          },
                          expression: "computedRoomName"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-select", {
                        attrs: {
                          items: _vm.typeRoomItems,
                          "prepend-inner-icon": "mdi-bed-empty",
                          label: "Tipo de habitación",
                          outlined: "",
                          "menu-props": { bottom: true, offsetY: true }
                        },
                        model: {
                          value: _vm.computedDdwnTypeRoom,
                          callback: function($$v) {
                            _vm.computedDdwnTypeRoom = $$v
                          },
                          expression: "computedDdwnTypeRoom"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          "prepend-inner-icon": "mdi-pen",
                          label: "Número de habitaciones (de éste tipo)",
                          hint: "Out of 11 rooms at your property",
                          "persistent-hint": "",
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedQuantity,
                          callback: function($$v) {
                            _vm.computedQuantity = $$v
                          },
                          expression: "computedQuantity"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-select", {
                        attrs: {
                          items: _vm.smokingPolicyItems,
                          "prepend-inner-icon": "mdi-smoking",
                          label: "Política de fumar",
                          outlined: "",
                          "menu-props": { bottom: true, offsetY: true }
                        },
                        model: {
                          value: _vm.computedDdwnSmokingPolicy,
                          callback: function($$v) {
                            _vm.computedDdwnSmokingPolicy = $$v
                          },
                          expression: "computedDdwnSmokingPolicy"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-select", {
                        attrs: {
                          items: _vm.poolNearItems,
                          "prepend-inner-icon": "mdi-pool",
                          label: "Habitación cerca de alberca",
                          hint:
                            "Let your guests know if you have one (or more) of these rooms near the pool. They can request\n    this when booking based on your availability",
                          "persistent-hint": "",
                          outlined: "",
                          "menu-props": { bottom: true, offsetY: true }
                        },
                        model: {
                          value: _vm.computedDdwnPoolNear,
                          callback: function($$v) {
                            _vm.computedDdwnPoolNear = $$v
                          },
                          expression: "computedDdwnPoolNear"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6", sm: "6", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          "prepend-inner-icon": "mdi-cash-multiple",
                          label: "Tarifa base de habitación",
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedRackRate,
                          callback: function($$v) {
                            _vm.computedRackRate = $$v
                          },
                          expression: "computedRackRate"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c("div", { staticClass: "mb-8 mt-4" }, [
                _c("span", { staticClass: "text-h6 black--text" }, [
                  _vm._v("Locación de habitación")
                ])
              ]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  items: _vm.floorNearItems,
                  "prepend-inner-icon": "mdi-home-floor-0",
                  label: "Nivel de piso",
                  hint:
                    "This feature will help your guests understand which floor this option is available on. If it´s available on both the ground floor and upper floor(s), guests can\n    make a special request for their preferred floor based on your\n    availability",
                  "persistent-hint": "",
                  outlined: "",
                  "menu-props": { bottom: true, offsetY: true }
                },
                model: {
                  value: _vm.computedDdwnFloorNear,
                  callback: function($$v) {
                    _vm.computedDdwnFloorNear = $$v
                  },
                  expression: "computedDdwnFloorNear"
                }
              }),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c("div", { staticClass: "mb-7 mt-4" }, [
                _c("span", { staticClass: "text-h6 black--text" }, [
                  _vm._v("Opciones de camas y ocupancia")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mb-5" }, [
                _vm._v("*Todos los campos son requeridos")
              ]),
              _vm._v(" "),
              _vm.beds != null
                ? _c(
                    "div",
                    _vm._l(_vm.computedArrayComponents, function(component) {
                      return _c(component.TagStandartArr, {
                        key: component.idCompo,
                        tag: "component",
                        attrs: {
                          idBedroom: component.idBedroom,
                          idCompo: component.idCompo,
                          objArrCompo: component.objArrCompo
                        }
                      })
                    }),
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "mb-4 mt-7" }, [
                _c("span", { staticClass: "text-h6 black--text" }, [
                  _vm._v("Ocupancia")
                ])
              ]),
              _vm._v(" "),
              _c("div", [
                _vm._v(
                  "\n        The occupancy you set here is only for gests staying in existing beds.\n        Occupancy from guests staying in cribs and extra beds shouldn´t be\n        included. View your crib and extra bed settings in...\n      "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "mt-4" },
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "4", sm: "4", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "number",
                          "prepend-inner-icon": "mdi-pen",
                          label: "Maximo de adultos",
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedMaxAdults,
                          callback: function($$v) {
                            _vm.computedMaxAdults = _vm._n($$v)
                          },
                          expression: "computedMaxAdults"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "4", sm: "4", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "number",
                          "prepend-inner-icon": "mdi-pen",
                          label: "Maximo de niños",
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedMaxChildren,
                          callback: function($$v) {
                            _vm.computedMaxChildren = _vm._n($$v)
                          },
                          expression: "computedMaxChildren"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "4", sm: "4", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "number",
                          "prepend-inner-icon": "mdi-pen",
                          label: "Maxima ocupación",
                          outlined: "",
                          hint:
                            "The maximum number of guests (adults and children), that can stay",
                          "persistent-hint": ""
                        },
                        model: {
                          value: _vm.computedMaxOccpancy,
                          callback: function($$v) {
                            _vm.computedMaxOccpancy = _vm._n($$v)
                          },
                          expression: "computedMaxOccpancy"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("v-btn", { attrs: { block: "", color: "primary" } }, [
            _vm._v("Continuar")
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangement.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangement.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StandartArrangement.vue?vue&type=template&id=0d03a96b& */ "./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b&");
/* harmony import */ var _StandartArrangement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandartArrangement.vue?vue&type=script&lang=js& */ "./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StandartArrangement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Rooms/StandartArrangement.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./StandartArrangement.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./StandartArrangement.vue?vue&type=template&id=0d03a96b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangement.vue?vue&type=template&id=0d03a96b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangement_vue_vue_type_template_id_0d03a96b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangementBeds.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangementBeds.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6& */ "./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6&");
/* harmony import */ var _StandartArrangementBeds_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandartArrangementBeds.vue?vue&type=script&lang=js& */ "./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StandartArrangementBeds_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Rooms/StandartArrangementBeds.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangementBeds_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./StandartArrangementBeds.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangementBeds_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Rooms/StandartArrangementBeds.vue?vue&type=template&id=b5dbb1c6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandartArrangementBeds_vue_vue_type_template_id_b5dbb1c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Rooms/RoomDetails.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Rooms/RoomDetails.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoomDetails.vue?vue&type=template&id=25f1e921& */ "./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921&");
/* harmony import */ var _RoomDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomDetails.vue?vue&type=script&lang=js& */ "./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RoomDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Rooms/RoomDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoomDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoomDetails.vue?vue&type=template&id=25f1e921& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomDetails.vue?vue&type=template&id=25f1e921&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomDetails_vue_vue_type_template_id_25f1e921___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);