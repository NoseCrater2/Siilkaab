(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuetify_datetime_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify-datetime-picker */ "./node_modules/vuetify-datetime-picker/src/index.js");
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


vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuetify_datetime_picker__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "DateTimePicker",
  mounted: function mounted() {
    if (this.dates.info == "Start") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
    }

    if (this.dates.info == "Final") {
      this.datetime = this.dates.prop.toString().slice(0, -3);
    }
  },
  data: function data() {
    return {
      dato: null,
      datetime: null,
      textFieldProps: {
        prependInnerIcon: "mdi-calendar-month",
        backgroundColor: 'white',
        outlined: true
      },
      dateProps: {
        headerColor: "primary"
      },
      timeProps: {
        format: "24hr",
        ampmInTitle: true
      }
    };
  },
  methods: {
    formatDate: function formatDate(val) {
      console.log(val);
      var lastDate = new Date(val).getTime();
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds

      var localISOTime = new Date(lastDate - tzoffset).toISOString().slice(0, -8);
      console.log(lastDate);
      console.log(tzoffset);
      var date = localISOTime.replace(/T/, " ");
      this.datetime = date;
    },
    formatAndSendHour: function formatAndSendHour() {
      console.log(this.datetime);
      this.formatDate(this.datetime);
      console.log(this.datetime);
      this.sendNewHour(this.datetime, this.dates.info);
    },
    sendNewHour: function sendNewHour(newHour, info) {
      this.$emit("sendNewHour", newHour, info);
    }
  },
  props: {
    dates: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DynamicPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicPool */ "./resources/js/components/Hotel/DynamicPool.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CarrouselPool",
  created: function created() {
    var count = 0;

    while (count <= this.pools.length - 1) {
      this.addCompo(this.pools[count]);
      count++;
    }
  },
  data: function data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      activePools: 0
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    pools: function pools(state) {
      return state.HotelModule.pools;
    }
  })), {}, {
    lastCarouselElement: {
      get: function get() {
        return this.countIdCompo;
      },
      set: function set() {
        return this.countIdCompo;
      }
    }
  }),
  methods: {
    addCompoButton: function addCompoButton() {
      this.countIdCompo++;
      this.activePools++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: _DynamicPool__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    },
    addCompo: function addCompo(obj) {
      this.countIdCompo++;
      this.activePools++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDPool: _DynamicPool__WEBPACK_IMPORTED_MODULE_0__["default"],
        objArrCompo: obj
      });
    },
    removeCompo: function removeCompo(idCompoParam) {
      this.countIdCompo--;
      this.activePools--;
      var idCompoMap = this.arrayComponents.map(function (element) {
        return element.idCompo;
      }).indexOf(idCompoParam);
      this.arrayComponents.splice(idCompoMap, 1);
    }
  },
  components: {
    DynamicPool: _DynamicPool__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DynamicRestaurant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicRestaurant */ "./resources/js/components/Hotel/DynamicRestaurant.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CarrouselRestaurant",
  updated: function updated() {//console.log(this.restaurants[this.countLastElementCarrousel])
  },
  created: function created() {
    var count = 0;

    while (count <= this.restaurants.length - 1) {
      this.addCompo(this.restaurants[count]);
      count++;
    }
  },
  data: function data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      activeRestaurants: 0,
      countLastElementCarrousel: 0
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    restaurants: function restaurants(state) {
      return state.HotelModule.restaurants;
    },
    schedules: function schedules(state) {
      return state.HotelModule.schedules;
    }
  })),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapMutations"])(["setArraySchedules", "setArrayRestaurants"])), {}, {
    addCompoButton: function addCompoButton() {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activeRestaurants++; //Declaramos la variable "putId" para insertarla como ID del nuevo restaurant

      var putId = this.countIdCompo + 1;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: _DynamicRestaurant__WEBPACK_IMPORTED_MODULE_0__["default"],
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: {
          id: putId,
          //Se pone "putId" que tiene el valor de "this.countIdCompo" para identificarlo en el PUT
          name: null,
          menu_type: null,
          schedules: [],
          hotel_id: this.hotel.id
        }
      });
      this.restaurants.push(this.arrayComponents[this.arrayComponents.length - 1].objArrCompo); //Creamos un nuevo arreglo de horarios que se seteara en el state "schedules"
      //Concatenandose con el valor actual del state + el valor de la siguiente variable

      var concatNewArraySchedules = [{
        idRestaurant: putId,
        restaurantSchedules: []
      }]; //Mandamos al setter la concatenacion de arreglos (el state actual + el nuevo array)

      this.setArraySchedules([].concat(this.schedules, concatNewArraySchedules));
    },
    addCompo: function addCompo(obj) {
      //Variable del v-model carrousel la incrementamos
      this.countLastElementCarrousel = this.arrayComponents.length;
      this.countIdCompo++;
      this.activeRestaurants++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagDRestaurant: _DynamicRestaurant__WEBPACK_IMPORTED_MODULE_0__["default"],
        restauranNumber: this.countLastElementCarrousel,
        objArrCompo: obj
      });
    },
    removeCompo: function removeCompo(idCompoParam) {
      //Variable del v-model carrousel la decrementamos
      this.countLastElementCarrousel--;
      this.activeRestaurants--;
      var idCompoMap = this.arrayComponents.map(function (element) {
        return element.idCompo;
      }).indexOf(idCompoParam); //En una nueva variable llamada "mapIDRestaurant" guardamos el id del restaurant
      //Obtenido gracias al indice actual eliminado (idCompoParam) utilizado en "this.arrayComponents"
      //Para eliminar los horarios del restaurant (ubicados en el state "schedules")

      var mapIDRestaurant = this.arrayComponents[idCompoMap].objArrCompo.id; //En la variable "deleteSchedule" guardamos el solo aquellos horarios donde su ID de restaurant sea diferente
      //Del ID de restaurant que se esta eliminando

      var deleteSchedule = this.schedules.filter(function (deleteScheduleItem) {
        return deleteScheduleItem.idRestaurant !== mapIDRestaurant;
      }); //Mandamos el nuevo arreglo para setear en el state "schedules"

      this.setArraySchedules(deleteSchedule); //Del arrayComponents quitamos el restaurante que se esta eliminando

      this.arrayComponents.splice(idCompoMap, 1); //Seteamos "this.arrayComponents" en una nueva variable
      //Para unicamente sacar su propiedad "objArrCompo"

      var mapArrayComponents = this.arrayComponents.map(function (element) {
        return element.objArrCompo;
      }); //Seteamos tambien en "this.arrayComponentes" el "restauranNumber"
      //Que es el que indica que numero de restaurante estamos visualizando

      var fixRestauranNumber = 0;
      this.arrayComponents = this.arrayComponents.map(function (element) {
        element.restauranNumber = fixRestauranNumber++;
        return element;
      }); //Mandamos la array var "mapArrayComponents" que se seteara en la variable state "restaurants"

      this.setArrayRestaurants(mapArrayComponents);
    }
  }),
  components: {
    DynamicRestaurant: _DynamicRestaurant__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
  name: "DynamicPool",
  created: function created() {
    if (this.objArrCompo != null) {
      if (this.objArrCompo.name != null) {
        this.poolName = this.objArrCompo.name;
      }

      if (this.objArrCompo.type != null) {
        if (this.objArrCompo.type == "indoor") {
          this.radioPoolType = this.objArrCompo.type;
        }

        if (this.objArrCompo.type == "outdoor") {
          this.radioPoolType = this.objArrCompo.type;
        }
      }

      if (this.objArrCompo.air_conditioned != null) {
        this.swAirConditioned = this.objArrCompo.air_conditioned;
      }

      if (this.objArrCompo.panoramic_view != null) {
        this.swPanoramicView = this.objArrCompo.panoramic_view;
      }

      if (this.objArrCompo.wading_pool != null) {
        this.swWadingPool = this.objArrCompo.wading_pool;
      }

      if (this.objArrCompo.towels != null) {
        this.swTowels = this.objArrCompo.towels;
      }

      if (this.objArrCompo.bar_pool != null) {
        this.swBarPool = this.objArrCompo.bar_pool;
      }

      if (this.objArrCompo.open_at != null) {
        this.hour = this.objArrCompo.open_at.slice(0, -3);
      }
    }
  },
  data: function data() {
    return {
      id: this.idCompo,
      arrayComponents: [],
      countIdCompo: -1,
      poolName: null,
      radioPoolType: null,
      swAirConditioned: null,
      swPanoramicView: null,
      swWadingPool: null,
      swTowels: null,
      swBarPool: null,
      hour: null,
      modalHour: false
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    pools: function pools(state) {
      return state.HotelModule.pools;
    }
  })),
  methods: {
    removeCompo: function removeCompo(id) {
      this.$emit("removeCompo", id);
    }
  },
  props: {
    idCompo: Number,
    objArrCompo: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _SelectTimePicker_SelectTimePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SelectTimePicker/SelectTimePicker */ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "DynamicRestaurant",
  created: function created() {
    if (this.objArrCompo != null) {
      //Codigo para agregar componentes existentes
      var count = 0;

      while (count <= this.objArrCompo.schedules.length - 1) {
        this.addCompo(this.objArrCompo.schedules[count]);
        count++;
      }

      if (this.objArrCompo.name != null) {
        this.restaurantNameModel = this.objArrCompo.name;
      }

      if (this.objArrCompo.menu_type != null) {
        if (this.objArrCompo.menu_type == "both") {
          this.selectMenuTypeModel.push("a la carte");
          this.selectMenuTypeModel.push("buffet");
        } else {
          this.selectMenuTypeModel.push(this.objArrCompo.menu_type);
        }
      }
    } else {
      this.addCompoFromComponent();
    }
  },
  data: function data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      id: this.idCompo,
      restaurantNameModel: null,
      selectMenuTypeModel: [],
      restaurantId: 0
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    restaurants: function restaurants(state) {
      return state.HotelModule.restaurants;
    },
    schedules: function schedules(state) {
      return state.HotelModule.schedules;
    }
  })), {}, {
    computedRestaurantName: {
      get: function get() {
        return this.restaurantNameModel;
      },
      set: function set(model) {
        this.restaurantNameModel = model;
        this.objArrCompo.name = this.restaurantNameModel;
        return this.restaurantNameModel;
      }
    },
    computedSelectMenuType: {
      get: function get() {
        return this.selectMenuTypeModel;
      },
      set: function set(model) {
        this.selectMenuTypeModel = model;

        if (model.length > 1) {
          this.objArrCompo.menu_type = "both";
        } else {
          this.objArrCompo.menu_type = this.selectMenuTypeModel[0];
        }

        return this.selectMenuTypeModel;
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])(["setArrayRestaurants", "setArraySchedules"])), {}, {
    removeCompo: function removeCompo(id) {
      this.$emit("removeCompo", id);
    },
    //Metodos componente SelectTimePicker
    addCompoFromComponent: function addCompoFromComponent() {
      var _this = this;

      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: _SelectTimePicker_SelectTimePicker__WEBPACK_IMPORTED_MODULE_1__["default"],
        objArrCompo: {
          id: "NEW",
          //Se pone "NEW" para identificarlo en el posterior metodo PUT
          day: null,
          end_time: null,
          restaurant_id: this.idRestaurant,
          start_time: null
        }
      }); //Creamos una variable "indexSchedule" que guardara el indice donde se guardara el nuevo horario
      //en el state "schedules"

      var indexSchedule = 0;
      this.schedules.forEach(function (scheduleItem, index) {
        if (scheduleItem.idRestaurant === _this.idRestaurant) {
          indexSchedule = index;
        }
      }); //Creamos la variable "newArraySchedules" que guardará el nuevo horario que se creo por medio de este boton

      var newArraySchedules = this.arrayComponents[this.arrayComponents.length - 1].objArrCompo; //Y modificamos el state "schedules" insertando "newArraySchedules"

      this.schedules[indexSchedule].restaurantSchedules.push(newArraySchedules); //Creamos una variable "indexRestaurant" que guardara el indice donde se guardara el nuevo horario
      //en el state "restaurants"

      var indexRestaurant = 0;
      this.restaurants.forEach(function (restaurantItem, index) {
        if (restaurantItem.id === _this.idRestaurant) {
          indexRestaurant = index;
        }
      }); //Insertamos el nuevo horario en los horarios que se encuentran en el state "Restaurant"

      this.restaurants[indexRestaurant].schedules.push(newArraySchedules);
    },
    //Metodos componente SelectTimePicker ya existente desde BD
    addCompo: function addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSTimePicker: _SelectTimePicker_SelectTimePicker__WEBPACK_IMPORTED_MODULE_1__["default"],
        objArrCompo: obj
      });
    },
    removeCompoTime: function removeCompoTime(idCompoParam) {
      var _this2 = this;

      var idCompoMap = this.arrayComponents.map(function (element) {
        return element.idCompo;
      }).indexOf(idCompoParam); //En una nueva variable llamada "mapIDComponent" guardamos el id del componente
      //Obtenido gracias al indice actual eliminado (idCompoParam) utilizado en "this.arrayComponents"

      var mapIDComponent = this.arrayComponents[idCompoMap].idCompo; //Procedemos a eliminar del arreglo state "this.schedules"
      //el horario correspondiente y para eso hacemos una serie de pasos

      var countCurrentStateSchedule = 0; //Inicializamos un contador que llevara el indice del arreglo state en su propiedad "restaurantSchedules"

      var idScheduleDeleted = 0; //Inicializamos un contador que guardara el id del horario que se eliminará

      var idRestaurantScheduleDeleted = 0; //Inicializamos un contador que guardara el id del restaurant que tiene el horario a eliminar

      this.arrayComponents = this.arrayComponents.map(function (itemArrayComponents) {
        //Buscamos en los elementos del "this.arrayComponents" una coincidencia
        //si el idCompo de dicho elemento es igual al que llega al boton de eliminacion
        if (itemArrayComponents.idCompo === mapIDComponent) {
          //Si hay coincidencia, procedemos a hacer un filter en el state "this.schedules"
          _this2.schedules.filter(function (itemStateSchedules) {
            //Si hay una coincidencia de ids de restaurantes entre "this.arrayComponents"
            //y "this.schedules"...
            if (itemArrayComponents.objArrCompo.restaurant_id === itemStateSchedules.idRestaurant) {
              //Entonces al contador le asignamos el valor de longitud del la propiedad de horarios
              //de restaurant (que es un array) del elemento de "this.arrayComponents"
              countCurrentStateSchedule = itemStateSchedules.restaurantSchedules.length - 1;
            } //Retornamos el state "this.schedules" con la coincidencia de ids de restaurant


            return itemArrayComponents.objArrCompo.restaurant_id === itemStateSchedules.idRestaurant;
          }) //Y a este retorno le aplicamos un map
          .map(function (currentStateSchedule) {
            //Creamos un ciclo que permanezca activo mientras el contador sea mayor o igual a 0
            while (countCurrentStateSchedule >= 0) {
              //Con el contador accedemos al indice del array "restaurantSchedules"
              //Y verificamos si en este indice se encuentra una coincidencia de ids entre este indice y el id (que es el de restaurant)
              //del elemento perteneciente a "this.arrayComponents"
              if (itemArrayComponents.objArrCompo.id === currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].id) {
                //Guardamos el id del horario a eliminar, ya que lo ocuparemos para editar el state "restaurants"
                idScheduleDeleted = currentStateSchedule.restaurantSchedules[countCurrentStateSchedule].id; //Guardamos el id del restaurante que tiene el horario que se va a eliminar; esto para editar el state "restaurants"

                idRestaurantScheduleDeleted = currentStateSchedule.idRestaurant; //Si existe la coincidencia entonces del elemento del state eliminamos el restaurant

                currentStateSchedule.restaurantSchedules.splice(countCurrentStateSchedule, 1);
                break;
              }

              countCurrentStateSchedule--;
            } //Y retornamos el "nuevo" state "this.schedules"


            return currentStateSchedule;
          });
        } //Al final, "this.arrayComponents" en este punto no sufrio cambio alguno. Sin embargo
        //Lo tenemos que retornar


        return itemArrayComponents;
      });
      this.arrayComponents.splice(idCompoMap, 1); //Mandamos el nuevo arreglo

      this.setArraySchedules(this.schedules); //Para guardar "temporalmente" los horarios en el state "restaurants"
      //Hacemos lo siguiente...
      //Primero filtramos el hotel al que pertenece el horario eliminado

      var filterRestaurantSchedule = this.restaurants.filter(function (itemRestaurantFilter) {
        return itemRestaurantFilter.id === idRestaurantScheduleDeleted;
      }).map(function (itemRestaurantMap) {
        //Hacemos un map que retornara el hotel ya con los horarios nuevos
        itemRestaurantMap.schedules.splice(countCurrentStateSchedule, 1); //Y retornamos el restaurant

        return itemRestaurantMap;
      }); //Ahora creamos una variable que sera una copia state "restaurants"
      //Con la particularidad de que la seteamos para que sea la variable que cambie el estado del state

      var newArrayRestaurants = this.restaurants.map(function (itemNewRestaurant) {
        //Si los ids del hotel coinciden...
        if (itemNewRestaurant.id === idRestaurantScheduleDeleted) {
          //Entonces el nuevo objeto (el del resultado del filtro de lineas anteriore) pasa a ser el nuevo atributo
          //del item actual "itemNewRestaurant"
          itemNewRestaurant = filterRestaurantSchedule[0];
        }

        return itemNewRestaurant;
      }); //Mandamos el nuevo arreglo "newArrayRestaurants"
      //Para cambiar el estado de "this.restaurants"

      this.setArrayRestaurants(newArrayRestaurants);
    }
  }),
  components: {
    SelectTimePicker: _SelectTimePicker_SelectTimePicker__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    idCompo: Number,
    idRestaurant: Number,
    restauranNumber: Number,
    objArrCompo: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _DateTimePicker_DateTimePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DateTimePicker/DateTimePicker */ "./resources/js/components/DateTimePicker/DateTimePicker.vue");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SpecialRegime",
  mounted: function mounted() {
    if (this.objArrCompo.start_period != null && this.objArrCompo.final_period != null) {
      this.propStartDate = {
        info: "Start",
        prop: this.objArrCompo.start_period
      };
      this.propFinalDate = {
        info: "Final",
        prop: this.objArrCompo.final_period
      };
    }

    this.swOnlyRoomModel = this.objArrCompo.only_room;

    if (this.objArrCompo.priority != null) {
      if (this.objArrCompo.priority == "normal") {
        this.ddwnPriorityModel = "Normal";
      }

      if (this.objArrCompo.priority == "medium") {
        this.ddwnPriorityModel = "Media";
      }

      if (this.objArrCompo.priority == "high") {
        this.ddwnPriorityModel = "Alta";
      }
    }

    this.txtBreakfastChildrenModel = this.objArrCompo.lodging_breakfast_children;
    this.txtBreakfastAdultModel = this.objArrCompo.lodging_breakfast_adult;

    if (this.txtBreakfastAdultModel !== null || this.txtBreakfastChildrenModel !== null) {
      if (this.txtBreakfastAdultModel !== 0 || this.txtBreakfastChildrenModel !== 0) {
        this.swBreakfastModel = 1;
      }
    }

    this.txtHalfPensionChildrenModel = this.objArrCompo.half_pension_children;
    this.txtHalfPensionAdultModel = this.objArrCompo.half_pension_adult;

    if (this.txtHalfPensionAdultModel !== null || this.txtHalfPensionChildrenModel !== null) {
      if (this.txtHalfPensionAdultModel !== 0 || this.txtHalfPensionChildrenModel !== 0) {
        this.swHalfPensionModel = 1;
      }
    }

    this.txtFullPensionChildrenModel = this.objArrCompo.full_pension_children;
    this.txtFullPensionAdultModel = this.objArrCompo.full_pension_adult;

    if (this.txtFullPensionAdultModel !== null || this.txtFullPensionChildrenModel !== null) {
      if (this.txtFullPensionAdultModel !== 0 || this.txtFullPensionChildrenModel !== 0) {
        this.swFullPensionModel = 1;
      }
    }

    this.txtAllIncludedChildrenModel = this.objArrCompo.all_included_children;
    this.txtAllIncludedAdultModel = this.objArrCompo.all_included_adult;

    if (this.txtAllIncludedAdultModel !== null || this.txtAllIncludedChildrenModel !== null) {
      if (this.txtAllIncludedAdultModel !== 0 || this.txtAllIncludedChildrenModel !== 0) {
        this.swAllIncludedModel = 1;
      }
    }
  },
  data: function data() {
    return {
      //DATOS DEL FORMULARIO
      id: this.idCompo,
      noLast: false,
      countIdCompo: -1,
      prioritiesModel: ["Normal", "Media", "Alta"],
      propStartDate: null,
      propFinalDate: null,
      swOnlyRoomModel: null,
      ddwnPriorityModel: null,
      swBreakfastModel: 0,
      txtBreakfastAdultModel: null,
      txtBreakfastChildrenModel: null,
      swHalfPensionModel: 0,
      txtHalfPensionAdultModel: null,
      txtHalfPensionChildrenModel: null,
      swFullPensionModel: 0,
      txtFullPensionAdultModel: null,
      txtFullPensionChildrenModel: null,
      swAllIncludedModel: 0,
      txtAllIncludedAdultModel: null,
      txtAllIncludedChildrenModel: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    regimes: function regimes(state) {
      return state.HotelModule.regimes;
    }
  })), {}, {
    getStartDate: function getStartDate() {
      return this.propStartDate;
    },
    getFinalDate: function getFinalDate() {
      return this.propFinalDate;
    },
    //Codigo para guardar temporalmente en el state
    computedSwOnlyRoom: {
      get: function get() {
        return this.swOnlyRoomModel;
      },
      set: function set(model) {
        this.swOnlyRoomModel = model;
        this.objArrCompo.only_room = this.swOnlyRoomModel;
        return this.swOnlyRoomModel;
      }
    },
    computedDdwnPriority: {
      get: function get() {
        return this.ddwnPriorityModel;
      },
      set: function set(model) {
        this.ddwnPriorityModel = model;

        if (this.ddwnPriorityModel == "Normal") {
          this.objArrCompo.priority = "normal";
        }

        if (this.ddwnPriorityModel == "Media") {
          this.objArrCompo.priority = "medium";
        }

        if (this.ddwnPriorityModel == "Alta") {
          this.objArrCompo.priority = "high";
        }

        return this.ddwnPriorityModel;
      }
    },
    computedSwBreakfast: {
      get: function get() {
        return this.swBreakfastModel;
      },
      set: function set(model) {
        this.swBreakfastModel = model;

        if (model == 0) {
          this.txtBreakfastChildrenModel = 0;
          this.txtBreakfastAdultModel = 0;
          this.objArrCompo.lodging_breakfast_children = 0;
          this.objArrCompo.lodging_breakfast_adult = 0;
        }

        return this.swBreakfastModel;
      }
    },
    computedTxtBreakfastAdult: {
      get: function get() {
        return this.txtBreakfastAdultModel;
      },
      set: function set(model) {
        this.txtBreakfastAdultModel = model;
        this.objArrCompo.lodging_breakfast_adult = this.txtBreakfastAdultModel;
        return this.txtBreakfastAdultModel;
      }
    },
    computedTxtBreakfastChildren: {
      get: function get() {
        return this.txtBreakfastChildrenModel;
      },
      set: function set(model) {
        this.txtBreakfastChildrenModel = model;
        this.objArrCompo.lodging_breakfast_children = this.txtBreakfastChildrenModel;
        return this.txtBreakfastChildrenModel;
      }
    },
    computedSwHalfPension: {
      get: function get() {
        return this.swHalfPensionModel;
      },
      set: function set(model) {
        this.swHalfPensionModel = model;

        if (model == 0) {
          this.txtHalfPensionChildrenModel = 0;
          this.txtHalfPensionAdultModel = 0;
          this.objArrCompo.half_pension_children = 0;
          this.objArrCompo.half_pension_adult = 0;
        }

        return this.swHalfPensionModel;
      }
    },
    computedTxtHalfPensionAdult: {
      get: function get() {
        return this.txtHalfPensionAdultModel;
      },
      set: function set(model) {
        this.txtHalfPensionAdultModel = model;
        this.objArrCompo.half_pension_adult = this.txtHalfPensionAdultModel;
        return this.txtHalfPensionAdultModel;
      }
    },
    computedTxtHalfPensionChildren: {
      get: function get() {
        return this.txtHalfPensionChildrenModel;
      },
      set: function set(model) {
        this.txtHalfPensionChildrenModel = model;
        this.objArrCompo.half_pension_children = this.txtHalfPensionChildrenModel;
        return this.txtHalfPensionChildrenModel;
      }
    },
    computedSwFullPension: {
      get: function get() {
        return this.swFullPensionModel;
      },
      set: function set(model) {
        this.swFullPensionModel = model;

        if (model == 0) {
          this.txtFullPensionChildrenModel = 0;
          this.txtFullPensionAdultModel = 0;
          this.objArrCompo.full_pension_children = 0;
          this.objArrCompo.full_pension_adult = 0;
        }

        return this.swFullPensionModel;
      }
    },
    computedTxtFullPensionAdult: {
      get: function get() {
        return this.txtFullPensionAdultModel;
      },
      set: function set(model) {
        this.txtFullPensionAdultModel = model;
        this.objArrCompo.full_pension_adult = this.txtFullPensionAdultModel;
        return this.txtFullPensionAdultModel;
      }
    },
    computedTxtFullPensionChildren: {
      get: function get() {
        return this.txtFullPensionChildrenModel;
      },
      set: function set(model) {
        this.txtFullPensionChildrenModel = model;
        this.objArrCompo.full_pension_children = this.txtFullPensionChildrenModel;
        return this.txtFullPensionChildrenModel;
      }
    },
    computedSwAllIncluded: {
      get: function get() {
        return this.swAllIncludedModel;
      },
      set: function set(model) {
        this.swAllIncludedModel = model;

        if (model == 0) {
          this.txtAllIncludedChildrenModel = 0;
          this.txtAllIncludedAdultModel = 0;
          this.objArrCompo.all_included_children = 0;
          this.objArrCompo.all_included_adult = 0;
        }

        return this.swAllIncludedModel;
      }
    },
    computedTxtAllIncludedAdult: {
      get: function get() {
        return this.txtAllIncludedAdultModel;
      },
      set: function set(model) {
        this.txtAllIncludedAdultModel = model;
        this.objArrCompo.all_included_adult = this.txtAllIncludedAdultModel;
        return this.txtAllIncludedAdultModel;
      }
    },
    computedTxtAllIncludedChildren: {
      get: function get() {
        return this.txtAllIncludedChildrenModel;
      },
      set: function set(model) {
        this.txtAllIncludedChildrenModel = model;
        this.objArrCompo.all_included_children = this.txtAllIncludedChildrenModel;
        return this.txtAllIncludedChildrenModel;
      }
    }
  }),
  methods: {
    removeCompo: function removeCompo(id) {
      this.$emit("removeCompo", id);
    },
    sendNewHour: function sendNewHour(newHour, info) {
      if (info === "Start") {
        this.objArrCompo.start_period = newHour + ":00";
        this.propStartDate.prop = this.objArrCompo.start_period;
      }

      if (info === "Final") {
        this.objArrCompo.final_period = newHour + ":00";
        this.propFinalDate.prop = this.objArrCompo.final_period;
      }
    }
  },
  components: {
    DateTimePicker: _DateTimePicker_DateTimePicker__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    idCompo: Number,
    objArrCompo: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiptap-vuetify */ "./node_modules/tiptap-vuetify/dist/bundle-esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MarkdownCompo",
  created: function created() {
    //Indicamos si debe de poner el texto largo del hotel o el texto de cancelacion
    if (this.containerType === "Information") {
      this.content = this.hotel.large_text;
    }

    if (this.containerType === "Conditions") {
      this.content = this.conditions.cancelation_text;
    }
  },
  data: function data() {
    return {
      // declare extensions you want to use
      extensions: [tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["History"], [tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Heading"], {
        options: {
          levels: [1, 2, 3]
        }
      }], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Bold"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Italic"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Underline"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Strike"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["HorizontalRule"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Blockquote"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["ListItem"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["BulletList"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["OrderedList"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Table"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["TableHeader"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["TableCell"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["TableRow"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["Link"], tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["HardBreak"]],
      // starting editor's content
      content: ""
    };
  },
  components: {
    //VueMarkdown,
    TiptapVuetify: tiptap_vuetify__WEBPACK_IMPORTED_MODULE_0__["TiptapVuetify"]
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    conditions: function conditions(state) {
      return state.HotelModule.conditions;
    }
  })), {}, {
    computedContent: {
      get: function get() {
        return this.content;
      },
      set: function set(model) {
        this.content = model;

        if (this.containerType === "Information") {
          this.hotel.large_text = this.content;
        }

        if (this.containerType === "Conditions") {
          this.conditions.cancelation_text = this.content;
        }

        return this.content;
      }
    }
  }),
  props: {
    containerType: String
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "SelectTimePicker",
  created: function created() {
    if (this.objArrCompo !== null) {
      if (this.objArrCompo.day != null) {
        if (this.objArrCompo.day == "lunes") {
          this.ddwnWeekDaysModel = "Lunes";
        }

        if (this.objArrCompo.day == "martes") {
          this.ddwnWeekDaysModel = "Martes";
        }

        if (this.objArrCompo.day == "miercoles") {
          this.ddwnWeekDaysModel = "Miércoles";
        }

        if (this.objArrCompo.day == "jueves") {
          this.ddwnWeekDaysModel = "Jueves";
        }

        if (this.objArrCompo.day == "viernes") {
          this.ddwnWeekDaysModel = "Viernes";
        }

        if (this.objArrCompo.day == "sabado") {
          this.ddwnWeekDaysModel = "Sábado";
        }

        if (this.objArrCompo.day == "domingo") {
          this.ddwnWeekDaysModel = "Domingo";
        }
      }

      if (this.objArrCompo.start_time !== null) {
        this.fromHourModel = this.objArrCompo.start_time.slice(0, -3);
      }

      if (this.objArrCompo.end_time !== null) {
        this.toHourModel = this.objArrCompo.end_time.slice(0, -3);
      }
    }
  },
  data: function data() {
    return {
      idModel: this.idCompo,
      weekDaysItems: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      ddwnWeekDaysModel: null,
      fromHourModel: null,
      modalFromHourModel: false,
      toHourModel: null,
      modalToHourModel: false
    };
  },
  computed: {
    computedDdwnWeekDays: {
      get: function get() {
        return this.ddwnWeekDaysModel;
      },
      set: function set(model) {
        this.ddwnWeekDaysModel = model;

        if (this.ddwnWeekDaysModel == "Lunes") {
          this.objArrCompo.day = "lunes";
        }

        if (this.ddwnWeekDaysModel == "Martes") {
          this.objArrCompo.day = "martes";
        }

        if (this.ddwnWeekDaysModel == "Miércoles") {
          this.objArrCompo.day = "miercoles";
        }

        if (this.ddwnWeekDaysModel == "Jueves") {
          this.objArrCompo.day = "jueves";
        }

        if (this.ddwnWeekDaysModel == "Viernes") {
          this.objArrCompo.day = "viernes";
        }

        if (this.ddwnWeekDaysModel == "Sábado") {
          this.objArrCompo.day = "sabado";
        }

        if (this.ddwnWeekDaysModel == "Domingo") {
          this.objArrCompo.day = "domingo";
        }

        return this.ddwnWeekDaysModel;
      }
    },
    computedFromHour: {
      get: function get() {
        return this.fromHourModel;
      },
      set: function set(model) {
        this.fromHourModel = model;
        this.objArrCompo.start_time = this.fromHourModel + ":00";
        return this.fromHourModel;
      }
    },
    computedToHour: {
      get: function get() {
        return this.toHourModel;
      },
      set: function set(model) {
        this.toHourModel = model;
        this.objArrCompo.end_time = this.toHourModel + ":00";
        return this.toHourModel;
      }
    }
  },
  methods: {
    removeCompoTime: function removeCompoTime(id) {
      this.$emit("removeCompoTime", id);
    }
  },
  props: {
    idCompo: Number,
    objArrCompo: Object,
    dates: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Hotel_CarrouselRestaurant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Hotel/CarrouselRestaurant */ "./resources/js/components/Hotel/CarrouselRestaurant.vue");
/* harmony import */ var _components_Hotel_CarrouselPool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Hotel/CarrouselPool */ "./resources/js/components/Hotel/CarrouselPool.vue");
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
  name: "AditionalInfo",
  created: function created() {
    if (this.hotel.idAmenity !== null) {
      if (this.aditionalInfo.spa != null) {
        if (this.aditionalInfo.spa == "free") {
          this.ddwnSpaModel = "Gratis";
        }

        if (this.aditionalInfo.spa == "paid") {
          this.ddwnSpaModel = "De Pago";
        }
      }

      if (this.aditionalInfo.water_park != null) {
        if (this.aditionalInfo.water_park == "free") {
          this.ddwnAcuaticModel = "Gratis";
        }

        if (this.aditionalInfo.water_park == "paid") {
          this.ddwnAcuaticModel = "De Pago";
        }
      }

      if (this.aditionalInfo.beach != null) {
        if (this.aditionalInfo.beach == "private") {
          this.ddwnBeachModel = "Privada";
        }

        if (this.aditionalInfo.beach == "in front") {
          this.ddwnBeachModel = "En frente";
        }
      }

      if (this.aditionalInfo.romantic_dinners != null) {
        if (this.aditionalInfo.romantic_dinners == "free") {
          this.ddwnRomanticDModel = "Gratis";
        }

        if (this.aditionalInfo.romantic_dinners == "paid") {
          this.ddwnRomanticDModel = "De Pago";
        }
      }

      if (this.aditionalInfo.touristic_tour != null) {
        if (this.aditionalInfo.touristic_tour == "free") {
          this.ddwnTouristicTModel = "Gratis";
        }

        if (this.aditionalInfo.touristic_tour == "paid") {
          this.ddwnTouristicTModel = "De Pago";
        }
      }

      if (this.aditionalInfo.daily_housekipping != null) {
        if (this.aditionalInfo.daily_housekipping == "free") {
          this.ddwnDailyHModel = "Gratis";
        }

        if (this.aditionalInfo.daily_housekipping == "paid") {
          this.ddwnDailyHModel = "De Pago";
        }
      }

      this.swAirConditionedModel = this.aditionalInfo.air_conditioned;
      this.swNoSmokeRoomsModel = this.aditionalInfo.no_smoke_rooms;
      this.swAirTransferServiceModel = this.aditionalInfo.air_transfer_service;
      this.swAirCollectServiceModel = this.aditionalInfo.air_collect_service;
      this.swRecection_24hModel = this.aditionalInfo.recection_24h;
      this.swGymModel = this.aditionalInfo.gym;
      this.swRoomServiceModel = this.aditionalInfo.room_service;
      this.swTerraceModel = this.aditionalInfo.terrace;
      this.swBarModel = this.aditionalInfo.bar;
      this.swGardenModel = this.aditionalInfo.garden;
      this.swRecreationalActivitiesModel = this.aditionalInfo.recreational_activities;
      this.swGuardedParkingModel = this.aditionalInfo.guarded_parking;
      this.swStreetParkingModel = this.aditionalInfo.street_parking;
      this.swGarageParkingModel = this.aditionalInfo.garage_parking;
      this.swSpecialParkingModel = this.aditionalInfo.special_parking;
      this.swReg_inout_privateModel = this.aditionalInfo.reg_inout_private;
      this.swReg_inout_expressModel = this.aditionalInfo.reg_inout_express;
      this.swTouristicInfoModel = this.aditionalInfo.touristic_info;
      this.swParkingServiceModel = this.aditionalInfo.parking_service;
      this.swCurrencyChangeModel = this.aditionalInfo.currency_change;
      this.swOutdoorFurnitureModel = this.aditionalInfo.outdoor_furniture;
      this.swTerraceSolariumModel = this.aditionalInfo.terrace_solarium;
      this.swSharedDinnerModel = this.aditionalInfo.shared_dinner;
      this.swSharedSalonModel = this.aditionalInfo.shared_salon;
      this.swGameZoneModel = this.aditionalInfo.game_zone;
      this.swLibraryModel = this.aditionalInfo.library;
      this.swLaundryServiceModel = this.aditionalInfo.laundry_service;
      this.swIronServiceModel = this.aditionalInfo.iron_service;
      this.swMeetingRoomModel = this.aditionalInfo.meeting_room;
      this.swMeetingCenterModel = this.aditionalInfo.meeting_center;
      this.swFaxPhotocopierModel = this.aditionalInfo.fax_photocopier;
      this.swCoffeeBreakModel = this.aditionalInfo.coffee_break;
      this.swSouvenirsStoreModel = this.aditionalInfo.souvenirs_store;
      this.swInclusiveServiceModel = this.aditionalInfo.inclusive_service;
      this.swElevatorModel = this.aditionalInfo.elevator;
      this.swSmokingZoneModel = this.aditionalInfo.smoking_zone;
      this.swNoSmokingModel = this.aditionalInfo.no_smoking;
      this.swPetFriendlyModel = this.aditionalInfo.pet_friendly;
      this.swPetHouseModel = this.aditionalInfo.pet_house;
      this.swPetBasketModel = this.aditionalInfo.pet_basket;
      this.swOnlyAdultsModel = this.aditionalInfo.only_adults;
      this.swSanitizedRoomsModel = this.aditionalInfo.sanitized_rooms;
      this.swBridalSuiteModel = this.aditionalInfo.bridal_suite;
      this.swVipServiceModel = this.aditionalInfo.vip_service;
      this.swCalefactionModel = this.aditionalInfo.calefaction;
      this.swKeepBagsModel = this.aditionalInfo.keep_bags;
      this.swSecurity24hModel = this.aditionalInfo.security_24h;
      this.swSecurityAlarmModel = this.aditionalInfo.security_alarm;
      this.swSmookeDetectorsModel = this.aditionalInfo.smoke_detectors;
      this.swInSecurityCamsModel = this.aditionalInfo.in_security_cams;
      this.swOutSecurityCamsModel = this.aditionalInfo.out_security_cams;
      this.swFireExtinguishersModel = this.aditionalInfo.fire_extinguishers;
      this.swSafeDepositBoxModel = this.aditionalInfo.safe_deposit_box;
    }
  },
  data: function data() {
    return {
      spaItems: ["Gratis", "De Pago"],
      ddwnSpaModel: null,
      acuaticItems: ["Gratis", "De Pago"],
      ddwnAcuaticModel: null,
      beachItems: ["Privada", "En frente"],
      ddwnBeachModel: null,
      romanticDItems: ["Gratis", "De Pago"],
      ddwnRomanticDModel: null,
      touristicTItems: ["Gratis", "De Pago"],
      ddwnTouristicTModel: null,
      dailyHItems: ["Gratis", "De Pago"],
      ddwnDailyHModel: null,
      swAirConditionedModel: null,
      swNoSmokeRoomsModel: null,
      swAirTransferServiceModel: null,
      swAirCollectServiceModel: null,
      swRecection_24hModel: null,
      swGymModel: null,
      swRoomServiceModel: null,
      swTerraceModel: null,
      swBarModel: null,
      swGardenModel: null,
      swRecreationalActivitiesModel: null,
      swGuardedParkingModel: null,
      swStreetParkingModel: null,
      swGarageParkingModel: null,
      swSpecialParkingModel: null,
      swReg_inout_privateModel: null,
      swReg_inout_expressModel: null,
      swTouristicInfoModel: null,
      swParkingServiceModel: null,
      swCurrencyChangeModel: null,
      swOutdoorFurnitureModel: null,
      swTerraceSolariumModel: null,
      swSharedDinnerModel: null,
      swSharedSalonModel: null,
      swGameZoneModel: null,
      swLibraryModel: null,
      swLaundryServiceModel: null,
      swIronServiceModel: null,
      swMeetingRoomModel: null,
      swMeetingCenterModel: null,
      swFaxPhotocopierModel: null,
      swCoffeeBreakModel: null,
      swSouvenirsStoreModel: null,
      swInclusiveServiceModel: null,
      swElevatorModel: null,
      swSmokingZoneModel: null,
      swNoSmokingModel: null,
      swPetFriendlyModel: null,
      swPetHouseModel: null,
      swPetBasketModel: null,
      swOnlyAdultsModel: null,
      swSanitizedRoomsModel: null,
      swBridalSuiteModel: null,
      swVipServiceModel: null,
      swCalefactionModel: null,
      swKeepBagsModel: null,
      swSecurity24hModel: null,
      swSecurityAlarmModel: null,
      swSmookeDetectorsModel: null,
      swInSecurityCamsModel: null,
      swOutSecurityCamsModel: null,
      swFireExtinguishersModel: null,
      swSafeDepositBoxModel: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    aditionalInfo: function aditionalInfo(state) {
      return state.HotelModule.aditionalInfo;
    }
  })), {}, {
    computedDdwnSpa: {
      get: function get() {
        return this.ddwnSpaModel;
      },
      set: function set(model) {
        this.ddwnSpaModel = model;

        if (this.ddwnSpaModel == "Gratis") {
          this.aditionalInfo.spa = "free";
        }

        if (this.ddwnSpaModel == "De Pago") {
          this.aditionalInfo.spa = "paid";
        }

        return this.ddwnSpaModel;
      }
    },
    computedDdwnAcuatic: {
      get: function get() {
        return this.ddwnAcuaticModel;
      },
      set: function set(model) {
        this.ddwnAcuaticModel = model;

        if (this.ddwnAcuaticModel == "Gratis") {
          this.aditionalInfo.water_park = "free";
        }

        if (this.ddwnAcuaticModel == "De Pago") {
          this.aditionalInfo.water_park = "paid";
        }

        return this.ddwnAcuaticModel;
      }
    },
    computedDdwnBeach: {
      get: function get() {
        return this.ddwnBeachModel;
      },
      set: function set(model) {
        this.ddwnBeachModel = model;

        if (this.ddwnBeachModel == "Privada") {
          this.aditionalInfo.beach = "private";
        }

        if (this.ddwnBeachModel == "En frente") {
          this.aditionalInfo.beach = "in front";
        }

        return this.ddwnBeachModel;
      }
    },
    computedDdwnRomanticD: {
      get: function get() {
        return this.ddwnRomanticDModel;
      },
      set: function set(model) {
        this.ddwnRomanticDModel = model;

        if (this.ddwnRomanticDModel == "Gratis") {
          this.aditionalInfo.romantic_dinners = "free";
        }

        if (this.ddwnRomanticDModel == "De Pago") {
          this.aditionalInfo.romantic_dinners = "paid";
        }

        return this.ddwnRomanticDModel;
      }
    },
    computedDdwnTouristicT: {
      get: function get() {
        return this.ddwnTouristicTModel;
      },
      set: function set(model) {
        this.ddwnTouristicTModel = model;

        if (this.ddwnTouristicTModel == "Gratis") {
          this.aditionalInfo.touristic_tour = "free";
        }

        if (this.ddwnTouristicTModel == "De Pago") {
          this.aditionalInfo.touristic_tour = "paid";
        }

        return this.ddwnTouristicTModel;
      }
    },
    computedDdwnDailyH: {
      get: function get() {
        return this.ddwnDailyHModel;
      },
      set: function set(model) {
        this.ddwnDailyHModel = model;

        if (this.ddwnDailyHModel == "Gratis") {
          this.aditionalInfo.daily_housekipping = "free";
        }

        if (this.ddwnDailyHModel == "De Pago") {
          this.aditionalInfo.daily_housekipping = "paid";
        }

        return this.ddwnDailyHModel;
      }
    },
    computedSwAirConditioned: {
      get: function get() {
        return this.swAirConditionedModel;
      },
      set: function set(model) {
        this.swAirConditionedModel = model;
        this.aditionalInfo.air_conditioned = this.swAirConditionedModel;
        return this.swAirConditionedModel;
      }
    },
    computedSwNoSmokeRooms: {
      get: function get() {
        return this.swNoSmokeRoomsModel;
      },
      set: function set(model) {
        this.swNoSmokeRoomsModel = model;
        this.aditionalInfo.no_smoke_rooms = this.swNoSmokeRoomsModel;
        return this.swNoSmokeRoomsModel;
      }
    },
    computedSwAirTransferService: {
      get: function get() {
        return this.swAirTransferServiceModel;
      },
      set: function set(model) {
        this.swAirTransferServiceModel = model;
        this.aditionalInfo.air_transfer_service = this.swAirTransferServiceModel;
        return this.swAirTransferServiceModel;
      }
    },
    computedSwAirCollectService: {
      get: function get() {
        return this.swAirCollectServiceModel;
      },
      set: function set(model) {
        this.swAirCollectServiceModel = model;
        this.aditionalInfo.air_collect_service = this.swAirCollectServiceModel;
        return this.swAirCollectServiceModel;
      }
    },
    computedSwRecection_24h: {
      get: function get() {
        return this.swRecection_24hModel;
      },
      set: function set(model) {
        this.swRecection_24hModel = model;
        this.aditionalInfo.recection_24h = this.swRecection_24hModel;
        return this.swRecection_24hModel;
      }
    },
    computedSwGym: {
      get: function get() {
        return this.swGymModel;
      },
      set: function set(model) {
        this.swGymModel = model;
        this.aditionalInfo.gym = this.swGymModel;
        return this.swGymModel;
      }
    },
    computedSwRoomService: {
      get: function get() {
        return this.swRoomServiceModel;
      },
      set: function set(model) {
        this.swRoomServiceModel = model;
        this.aditionalInfo.room_service = this.swRoomServiceModel;
        return this.swRoomServiceModel;
      }
    },
    computedSwTerrace: {
      get: function get() {
        return this.swTerraceModel;
      },
      set: function set(model) {
        this.swTerraceModel = model;
        this.aditionalInfo.terrace = this.swTerraceModel;
        return this.swTerraceModel;
      }
    },
    computedSwBar: {
      get: function get() {
        return this.swBarModel;
      },
      set: function set(model) {
        this.swBarModel = model;
        this.aditionalInfo.bar = this.swBarModel;
        return this.swBarModel;
      }
    },
    computedSwGarden: {
      get: function get() {
        return this.swGardenModel;
      },
      set: function set(model) {
        this.swGardenModel = model;
        this.aditionalInfo.garden = this.swGardenModel;
        return this.swGardenModel;
      }
    },
    computedSwRecreationalActivities: {
      get: function get() {
        return this.swRecreationalActivitiesModel;
      },
      set: function set(model) {
        this.swRecreationalActivitiesModel = model;
        this.aditionalInfo.recreational_activities = this.swRecreationalActivitiesModel;
        return this.swRecreationalActivitiesModel;
      }
    },
    computedSwGuardedParking: {
      get: function get() {
        return this.swGuardedParkingModel;
      },
      set: function set(model) {
        this.swGuardedParkingModel = model;
        this.aditionalInfo.guarded_parking = this.swGuardedParkingModel;
        return this.swGuardedParkingModel;
      }
    },
    computedSwStreetParking: {
      get: function get() {
        return this.swStreetParkingModel;
      },
      set: function set(model) {
        this.swStreetParkingModel = model;
        this.aditionalInfo.street_parking = this.swStreetParkingModel;
        return this.swStreetParkingModel;
      }
    },
    computedSwGarageParking: {
      get: function get() {
        return this.swGarageParkingModel;
      },
      set: function set(model) {
        this.swGarageParkingModel = model;
        this.aditionalInfo.garage_parking = this.swGarageParkingModel;
        return this.swGarageParkingModel;
      }
    },
    computedSwSpecialParking: {
      get: function get() {
        return this.swSpecialParkingModel;
      },
      set: function set(model) {
        this.swSpecialParkingModel = model;
        this.aditionalInfo.special_parking = this.swSpecialParkingModel;
        return this.swSpecialParkingModel;
      }
    },
    computedSwReg_inout_private: {
      get: function get() {
        return this.swReg_inout_privateModel;
      },
      set: function set(model) {
        this.swReg_inout_privateModel = model;
        this.aditionalInfo.reg_inout_private = this.swReg_inout_privateModel;
        return this.swReg_inout_privateModel;
      }
    },
    computedSwReg_inout_express: {
      get: function get() {
        return this.swReg_inout_expressModel;
      },
      set: function set(model) {
        this.swReg_inout_expressModel = model;
        this.aditionalInfo.reg_inout_express = this.swReg_inout_expressModel;
        return this.swReg_inout_expressModel;
      }
    },
    computedSwTouristicInfo: {
      get: function get() {
        return this.swTouristicInfoModel;
      },
      set: function set(model) {
        this.swTouristicInfoModel = model;
        this.aditionalInfo.touristic_info = this.swTouristicInfoModel;
        return this.swTouristicInfoModel;
      }
    },
    computedSwParkingService: {
      get: function get() {
        return this.swParkingServiceModel;
      },
      set: function set(model) {
        this.swParkingServiceModel = model;
        this.aditionalInfo.parking_service = this.swParkingServiceModel;
        return this.swParkingServiceModel;
      }
    },
    computedSwCurrencyChange: {
      get: function get() {
        return this.swCurrencyChangeModel;
      },
      set: function set(model) {
        this.swCurrencyChangeModel = model;
        this.aditionalInfo.currency_change = this.swCurrencyChangeModel;
        return this.swCurrencyChangeModel;
      }
    },
    computedSwOutdoorFurniture: {
      get: function get() {
        return this.swOutdoorFurnitureModel;
      },
      set: function set(model) {
        this.swOutdoorFurnitureModel = model;
        this.aditionalInfo.outdoor_furniture = this.swOutdoorFurnitureModel;
        return this.swOutdoorFurnitureModel;
      }
    },
    computedSwTerraceSolarium: {
      get: function get() {
        return this.swTerraceSolariumModel;
      },
      set: function set(model) {
        this.swTerraceSolariumModel = model;
        this.aditionalInfo.terrace_solarium = this.swTerraceSolariumModel;
        return this.swTerraceSolariumModel;
      }
    },
    computedSwSharedDinner: {
      get: function get() {
        return this.swSharedDinnerModel;
      },
      set: function set(model) {
        this.swSharedDinnerModel = model;
        this.aditionalInfo.shared_dinner = this.swSharedDinnerModel;
        return this.swSharedDinnerModel;
      }
    },
    computedSwSharedSalon: {
      get: function get() {
        return this.swSharedSalonModel;
      },
      set: function set(model) {
        this.swSharedSalonModel = model;
        this.aditionalInfo.shared_salon = this.swSharedSalonModel;
        return this.swSharedSalonModel;
      }
    },
    computedSwGameZone: {
      get: function get() {
        return this.swGameZoneModel;
      },
      set: function set(model) {
        this.swGameZoneModel = model;
        this.aditionalInfo.game_zone = this.swGameZoneModel;
        return this.swGameZoneModel;
      }
    },
    computedSwLibrary: {
      get: function get() {
        return this.swLibraryModel;
      },
      set: function set(model) {
        this.swLibraryModel = model;
        this.aditionalInfo.library = this.swLibraryModel;
        return this.swLibraryModel;
      }
    },
    computedSwLaundryService: {
      get: function get() {
        return this.swLaundryServiceModel;
      },
      set: function set(model) {
        this.swLaundryServiceModel = model;
        this.aditionalInfo.laundry_service = this.swLaundryServiceModel;
        return this.swLaundryServiceModel;
      }
    },
    computedSwIronService: {
      get: function get() {
        return this.swIronServiceModel;
      },
      set: function set(model) {
        this.swIronServiceModel = model;
        this.aditionalInfo.iron_service = this.swIronServiceModel;
        return this.swIronServiceModel;
      }
    },
    computedSwMeetingRoom: {
      get: function get() {
        return this.swMeetingRoomModel;
      },
      set: function set(model) {
        this.swMeetingRoomModel = model;
        this.aditionalInfo.meeting_room = this.swMeetingRoomModel;
        return this.swMeetingRoomModel;
      }
    },
    computedSwMeetingCenter: {
      get: function get() {
        return this.swMeetingCenterModel;
      },
      set: function set(model) {
        this.swMeetingCenterModel = model;
        this.aditionalInfo.meeting_center = this.swMeetingCenterModel;
        return this.swMeetingCenterModel;
      }
    },
    computedSwFaxPhotocopier: {
      get: function get() {
        return this.swFaxPhotocopierModel;
      },
      set: function set(model) {
        this.swFaxPhotocopierModel = model;
        this.aditionalInfo.fax_photocopier = this.swFaxPhotocopierModel;
        return this.swFaxPhotocopierModel;
      }
    },
    computedSwCoffeeBreak: {
      get: function get() {
        return this.swCoffeeBreakModel;
      },
      set: function set(model) {
        this.swCoffeeBreakModel = model;
        this.aditionalInfo.coffee_break = this.swCoffeeBreakModel;
        return this.swCoffeeBreakModel;
      }
    },
    computedSwSouvenirsStore: {
      get: function get() {
        return this.swSouvenirsStoreModel;
      },
      set: function set(model) {
        this.swSouvenirsStoreModel = model;
        this.aditionalInfo.souvenirs_store = this.swSouvenirsStoreModel;
        return this.swSouvenirsStoreModel;
      }
    },
    computedSwInclusiveService: {
      get: function get() {
        return this.swInclusiveServiceModel;
      },
      set: function set(model) {
        this.swInclusiveServiceModel = model;
        this.aditionalInfo.inclusive_service = this.swInclusiveServiceModel;
        return this.swInclusiveServiceModel;
      }
    },
    computedSwElevator: {
      get: function get() {
        return this.swElevatorModel;
      },
      set: function set(model) {
        this.swElevatorModel = model;
        this.aditionalInfo.elevator = this.swElevatorModel;
        return this.swElevatorModel;
      }
    },
    computedSwNoSmoking: {
      get: function get() {
        return this.swNoSmokingModel;
      },
      set: function set(model) {
        this.swNoSmokingModel = model;
        this.aditionalInfo.no_smoking = this.swNoSmokingModel;
        return this.swNoSmokingModel;
      }
    },
    computedSwSmokingZone: {
      get: function get() {
        return this.swSmokingZoneModel;
      },
      set: function set(model) {
        this.swSmokingZoneModel = model;
        this.aditionalInfo.smoking_zone = this.swSmokingZoneModel;
        return this.swSmokingZoneModel;
      }
    },
    computedSwPetFriendly: {
      get: function get() {
        return this.swPetFriendlyModel;
      },
      set: function set(model) {
        this.swPetFriendlyModel = model;
        this.aditionalInfo.pet_friendly = this.swPetFriendlyModel;
        return this.swPetFriendlyModel;
      }
    },
    computedSwPetHouse: {
      get: function get() {
        return this.swPetHouseModel;
      },
      set: function set(model) {
        this.swPetHouseModel = model;
        this.aditionalInfo.pet_house = this.swPetHouseModel;
        return this.swPetHouseModel;
      }
    },
    computedSwPetBasket: {
      get: function get() {
        return this.swPetBasketModel;
      },
      set: function set(model) {
        this.swPetBasketModel = model;
        this.aditionalInfo.pet_basket = this.swPetBasketModel;
        return this.swPetBasketModel;
      }
    },
    computedSwOnlyAdults: {
      get: function get() {
        return this.swOnlyAdultsModel;
      },
      set: function set(model) {
        this.swOnlyAdultsModel = model;
        this.aditionalInfo.only_adults = this.swOnlyAdultsModel;
        return this.swOnlyAdultsModel;
      }
    },
    computedSwSanitizedRooms: {
      get: function get() {
        return this.swSanitizedRoomsModel;
      },
      set: function set(model) {
        this.swSanitizedRoomsModel = model;
        this.aditionalInfo.sanitized_rooms = this.swSanitizedRoomsModel;
        return this.swSanitizedRoomsModel;
      }
    },
    computedSwBridalSuite: {
      get: function get() {
        return this.swBridalSuiteModel;
      },
      set: function set(model) {
        this.swBridalSuiteModel = model;
        this.aditionalInfo.bridal_suite = this.swBridalSuiteModel;
        return this.swBridalSuiteModel;
      }
    },
    computedSwVipService: {
      get: function get() {
        return this.swVipServiceModel;
      },
      set: function set(model) {
        this.swVipServiceModel = model;
        this.aditionalInfo.vip_service = this.swVipServiceModel;
        return this.swVipServiceModel;
      }
    },
    computedSwCalefaction: {
      get: function get() {
        return this.swCalefactionModel;
      },
      set: function set(model) {
        this.swCalefactionModel = model;
        this.aditionalInfo.calefaction = this.swCalefactionModel;
        return this.swCalefactionModel;
      }
    },
    computedSwKeepBags: {
      get: function get() {
        return this.swKeepBagsModel;
      },
      set: function set(model) {
        this.swKeepBagsModel = model;
        this.aditionalInfo.keep_bags = this.swKeepBagsModel;
        return this.swKeepBagsModel;
      }
    },
    computedSwSecurity24h: {
      get: function get() {
        return this.swSecurity24hModel;
      },
      set: function set(model) {
        this.swSecurity24hModel = model;
        this.aditionalInfo.security_24h = this.swSecurity24hModel;
        return this.swSecurity24hModel;
      }
    },
    computedSwSecurityAlarm: {
      get: function get() {
        return this.swSecurityAlarmModel;
      },
      set: function set(model) {
        this.swSecurityAlarmModel = model;
        this.aditionalInfo.security_alarm = this.swSecurityAlarmModel;
        return this.swSecurityAlarmModel;
      }
    },
    computedSwSmookeDetectors: {
      get: function get() {
        return this.swSmookeDetectorsModel;
      },
      set: function set(model) {
        this.swSmookeDetectorsModel = model;
        this.aditionalInfo.smoke_detectors = this.swSmookeDetectorsModel;
        return this.swSmookeDetectorsModel;
      }
    },
    computedSwInSecurityCams: {
      get: function get() {
        return this.swInSecurityCamsModel;
      },
      set: function set(model) {
        this.swInSecurityCamsModel = model;
        this.aditionalInfo.in_security_cams = this.swInSecurityCamsModel;
        return this.swInSecurityCamsModel;
      }
    },
    computedSwOutSecurityCams: {
      get: function get() {
        return this.swOutSecurityCamsModel;
      },
      set: function set(model) {
        this.swOutSecurityCamsModel = model;
        this.aditionalInfo.out_security_cams = this.swOutSecurityCamsModel;
        return this.swOutSecurityCamsModel;
      }
    },
    computedSwFireExtinguishers: {
      get: function get() {
        return this.swFireExtinguishersModel;
      },
      set: function set(model) {
        this.swFireExtinguishersModel = model;
        this.aditionalInfo.fire_extinguishers = this.swFireExtinguishersModel;
        return this.swFireExtinguishersModel;
      }
    },
    computedSwSafeDepositBox: {
      get: function get() {
        return this.swSafeDepositBoxModel;
      },
      set: function set(model) {
        this.swSafeDepositBoxModel = model;
        this.aditionalInfo.safe_deposit_box = this.swSafeDepositBoxModel;
        return this.swSafeDepositBoxModel;
      }
    }
  }),
  components: {
    CarrouselRestaurant: _components_Hotel_CarrouselRestaurant__WEBPACK_IMPORTED_MODULE_1__["default"],
    CarrouselPool: _components_Hotel_CarrouselPool__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ButtonActionsSup",
  created: function created() {
    var _this = this;

    this.getHotels().then(function () {
      _this.idHotel = _this.$route.params.id;
      _this.listItemHotels = _this.hotels;
    });
  },
  data: function data() {
    return {
      listItemHotels: null,
      idHotel: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    setReinicializedVar: function setReinicializedVar(state) {
      return state.HotelModule.setReinicializedVar;
    },
    iditemsListOptions: function iditemsListOptions(state) {
      return state.HotelModule.iditemsListOptions;
    },
    hotels: function hotels(state) {
      return state.HotelModule.allhotels;
    },
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    chargeView: function chargeView(state) {
      return state.HotelModule.chargeView;
    },
    configuration: function configuration(state) {
      return state.HotelModule.configuration;
    },
    contacts: function contacts(state) {
      return state.HotelModule.contacts;
    },
    conditions: function conditions(state) {
      return state.HotelModule.conditions;
    },
    regimes: function regimes(state) {
      return state.HotelModule.regimes;
    },
    aditionalInfo: function aditionalInfo(state) {
      return state.HotelModule.aditionalInfo;
    },
    restaurants: function restaurants(state) {
      return state.HotelModule.restaurants;
    },
    schedules: function schedules(state) {
      return state.HotelModule.schedules;
    }
  })), {}, {
    computedTitleHotel: {
      get: function get() {
        return this.idHotel;
      },
      set: function set(idHotel) {
        this.idHotel = idHotel;
        _routes__WEBPACK_IMPORTED_MODULE_1__["default"].push({
          name: "Hotel",
          params: {
            id: this.idHotel
          }
        }); //Setea todo a nul para antes de hacer el cambio de pestaña de hotel

        this.setReinicialized();
        this.setReinicializedErrorsStatus(); //Ejecuta el metodo de carga del hotel

        this.chargeDataHotel();
        return this.idHotel;
      }
    }
  }),
  methods: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getHotels", "getHotel", "getConfiguration", "getContacts", "getConditions", "getRegimes", "getRestaurants", "getSchedules", "getPools", "getAditionalInfo", "postEditHotel", "putEditConfiguration", "postEditConfiguration", "putEditContacts", "putEditConditions", "putEditRegimes", "putEditAditionalInfo", "putEditRestaurants", "putEditSchedules"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])(["setReinicialized", "setReinicializedErrorsStatus"])), {}, {
    close: function close() {
      this.setReinicialized();
      this.setReinicializedErrorsStatus();
      _routes__WEBPACK_IMPORTED_MODULE_1__["default"].replace({
        path: '/hotels'
      });
    },
    saveChanges: function saveChanges() {
      var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "save";

      if (close == "save") {
        this.executeSaveOnAPI();
      }

      if (close == "saveAndClose") {
        this.executeSaveOnAPI();
        this.setReinicialized();
        this.setReinicializedErrorsStatus();
        _routes__WEBPACK_IMPORTED_MODULE_1__["default"].replace({
          path: '/hotels'
        });
      }
    },
    chargeDataHotel: function chargeDataHotel() {
      var _this2 = this;

      if (this.$route.params.id) {
        this.setReinicialized(); //Reinicia el objeto hotel (esto es por que no hay una recarga de pag con router-link)

        this.getHotel(this.$route.params.id).then(function () {
          _this2.hotelTitle = _this2.hotel.title;

          if (_this2.hotel.idConfiguration !== null) {
            _this2.getConfiguration(_this2.hotel.idConfiguration).then(function () {});
          }

          if (_this2.hotel.idContact !== null) {
            _this2.getContacts(_this2.hotel.idContact).then(function () {});
          }

          if (_this2.hotel.idCondition !== null) {
            _this2.getConditions(_this2.hotel.idCondition).then(function () {});
          }

          if (_this2.hotel.idRegime !== null) {
            _this2.getRegimes(_this2.hotel.idRegime).then(function () {});
          }

          if (_this2.hotel.idAmenity !== null) {
            _this2.getAditionalInfo(_this2.hotel.idAmenity).then(function () {});

            _this2.getPools(_this2.hotel.id).then(function () {});

            _this2.getRestaurants(_this2.hotel.id).then(function () {});

            _this2.getSchedules(_this2.hotel.id).then(function () {});
          }
        });
      }
    },
    //Metodo que se llama desde los metodos de los botones para guardar los datos en la bd
    executeSaveOnAPI: function executeSaveOnAPI() {
      this.postEditHotel(this.hotel); //CODIGO PARA GUARDAR CONFIGURACIONES INICIA

      if (this.configuration.timezone != null) {
        if (this.configuration.hotel_id == null) {
          //metodo post
          this.configuration.hotel_id = this.idHotel;
          console.log("BTN", this.configuration);
          this.postEditConfiguration(this.configuration);
        } else {
          //metodo put
          this.putEditConfiguration(this.configuration);
        }
      } //CODIGO PARA GUARDAR CONFIGURACIONES TERMINA
      ///DESCOMENTAR ESTE CODIGOOOOOOOOOOOOOOOOO


      this.putEditContacts(this.contacts);
      this.putEditConditions(this.conditions);
      this.putEditRegimes({
        newRegimes: this.regimes,
        currentHotelId: this.hotel.id,
        currentRegimes: this.hotel.idRegime
      });
      this.putEditAditionalInfo(this.aditionalInfo); // this.putEditRestaurants(this.restaurants).then(() => {
      //   this.putEditSchedules(this.schedules);
      // });
    }
  }),
  props: {
    title: String
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Markdown_MarkdownCompo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/Markdown/MarkdownCompo */ "./resources/js/components/Markdown/MarkdownCompo.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Condition",
  created: function created() {
    if (this.hotel.idCondition !== null) {
      this.adultsModel = this.conditions.adults;
      this.childrenAgeModel = this.conditions.children_age;
      this.adultsRegimenModel = this.conditions.adults_regimen;
      this.adultsAgeModel = this.conditions.adults_age;
      this.checkinTimeModel = this.conditions.checkin_time;
      this.checkoutTimeModel = this.conditions.checkout_time;
    }
  },
  data: function data() {
    return {
      adultsModel: null,
      childrenAgeModel: null,
      adultsRegimenModel: null,
      adultsAgeModel: null,
      modalCheckin: false,
      checkinTimeModel: null,
      modalCheckout: false,
      checkoutTimeModel: null
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo: _components_Markdown_MarkdownCompo__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    conditions: function conditions(state) {
      return state.HotelModule.conditions;
    },
    errorsConditions: function errorsConditions(state) {
      return state.HotelModule.errorsConditions;
    }
  })), {}, {
    //Codigo para guardar temporalmente en el state
    computedAdults: {
      get: function get() {
        return this.adultsModel;
      },
      set: function set(model) {
        this.adultsModel = model;
        this.conditions.adults = this.adultsModel;
        return this.adultsModel;
      }
    },
    computedChildrenAge: {
      get: function get() {
        return this.childrenAgeModel;
      },
      set: function set(model) {
        this.childrenAgeModel = model;
        this.conditions.children_age = this.childrenAgeModel;
        return this.childrenAgeModel;
      }
    },
    computedAdultsRegimen: {
      get: function get() {
        return this.adultsRegimenModel;
      },
      set: function set(model) {
        this.adultsRegimenModel = model;
        this.conditions.adults_regimen = this.adultsRegimenModel;
        return this.adultsRegimenModel;
      }
    },
    computedAdultsAge: {
      get: function get() {
        return this.adultsAgeModel;
      },
      set: function set(model) {
        this.adultsAgeModel = model;
        this.conditions.adults_age = this.adultsAgeModel;
        return this.adultsAgeModel;
      }
    },
    checkoutTimeSaveState: function checkoutTimeSaveState() {
      this.conditions.checkout_time = this.checkoutTimeModel;
      return this.checkoutTimeModel;
    },
    checkinTimeSaveState: function checkinTimeSaveState() {
      this.conditions.checkin_time = this.checkinTimeModel;
      return this.checkinTimeModel;
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Configuration",
  data: function data() {
    return {
      paymentTypeItems: ["Una noche", "Todas las noches"],
      ddwnPaymentTypeModel: null,
      selectPaymentsPlaceModel: [],
      currencyIdModel: null,
      timezoneModel: null,
      notificationVoucherModel: null,
      notificationDetailsModel: null,
      notificationCardModel: null
    };
  },
  created: function created() {
    this.getCurrencies().then(function () {});
    this.getTimezones().then(function () {});

    if (this.hotel.idConfiguration !== null) {
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
    } else {
      this.fillModel();
      console.log(this.configuration); //console.log(this.configuration)
      //this.configuration.currency_id = 0;
    }
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    currencies: function currencies(state) {
      return state.HotelModule.currencies;
    },
    timezones: function timezones(state) {
      return state.HotelModule.timezones;
    },
    configuration: function configuration(state) {
      return state.HotelModule.configuration;
    },
    errorsConfiguration: function errorsConfiguration(state) {
      return state.HotelModule.errorsConfiguration;
    }
  })), {}, {
    //Codigo para guardar temporalmente en el state
    computedCurrencyID: {
      get: function get() {
        return this.currencyIdModel;
      },
      set: function set(idCurrency) {
        this.currencyIdModel = idCurrency;
        this.configuration.currency_id = this.currencyIdModel;
        return this.currencyIdModel;
      }
    },
    computedTimezone: {
      get: function get() {
        return this.timezoneModel;
      },
      set: function set(timezone) {
        this.timezoneModel = timezone;
        this.configuration.timezone = this.timezoneModel;
        return this.timezoneModel;
      }
    },
    computedNotificationVoucher: {
      get: function get() {
        return this.notificationVoucherModel;
      },
      set: function set(model) {
        this.notificationVoucherModel = model;
        this.configuration.notification_voucher = this.notificationVoucherModel;
        return this.notificationVoucherModel;
      }
    },
    computedNotificationDetails: {
      get: function get() {
        return this.notificationDetailsModel;
      },
      set: function set(model) {
        this.notificationDetailsModel = model;
        this.configuration.notification_details = this.notificationDetailsModel;
        return this.notificationDetailsModel;
      }
    },
    computedNotificationCard: {
      get: function get() {
        return this.notificationCardModel;
      },
      set: function set(model) {
        this.notificationCardModel = model;
        this.configuration.notification_card = this.notificationCardModel;
        return this.notificationCardModel;
      }
    },
    computedDdwnPaymentType: {
      get: function get() {
        return this.ddwnPaymentTypeModel;
      },
      set: function set(model) {
        this.ddwnPaymentTypeModel = model;

        if (this.ddwnPaymentTypeModel == "Una noche") {
          this.configuration.payment_type = "one";
        }

        if (this.ddwnPaymentTypeModel == "Todas las noches") {
          this.configuration.payment_type = "all";
        }

        return this.ddwnPaymentTypeModel;
      }
    },
    computedSelectPaymentsPlace: {
      get: function get() {
        return this.selectPaymentsPlaceModel;
      },
      set: function set(model) {
        this.selectPaymentsPlaceModel = model;

        if (model.length > 1) {
          this.configuration.payment_place = "both";
        } else {
          this.configuration.payment_place = this.selectPaymentsPlaceModel[0];
        }

        return this.selectPaymentsPlaceModel;
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getCurrencies", "getTimezones"])), {}, {
    //Metodo para llenar la vista con los datos
    fillModel: function fillModel() {
      if (this.configuration.currency_id != null) {
        this.currencyIdModel = this.configuration.currency_id;
      } else {
        this.configuration.currency_id = 1;
        this.currencyIdModel = this.configuration.currency_id;
      }

      if (this.configuration.timezone != null) {
        this.timezoneModel = this.configuration.timezone;
      } else {
        this.configuration.timezone = "America/Mexico_City";
        this.timezoneModel = this.configuration.timezone;
      }

      if (this.configuration.notification_voucher != null) {
        this.notificationVoucherModel = this.configuration.notification_voucher;
      } else {
        this.configuration.notification_voucher = "";
        this.notificationVoucherModel = this.configuration.notification_voucher;
      }

      if (this.configuration.notification_details != null) {
        this.notificationDetailsModel = this.configuration.notification_details;
      } else {
        this.configuration.notification_details = "";
        this.notificationDetailsModel = this.configuration.notification_details;
      }

      if (this.configuration.notification_card != null) {
        this.notificationCardModel = this.configuration.notification_card;
      } else {
        this.configuration.notification_card = "";
        this.notificationCardModel = this.configuration.notification_card;
      }

      if (this.configuration.payment_type != null) {
        if (this.configuration.payment_type == "one") {
          this.ddwnPaymentTypeModel = "Una noche";
        }

        if (this.configuration.payment_type == "all") {
          this.ddwnPaymentTypeModel = "Todas las noches";
        }
      } else {
        this.configuration.payment_type = "one";
        this.ddwnPaymentTypeModel = "Una noche";
      }

      if (this.configuration.payment_place != null) {
        if (this.configuration.payment_place === "both") {
          this.selectPaymentsPlaceModel.push("online");
          this.selectPaymentsPlaceModel.push("offline");
        } else {
          this.selectPaymentsPlaceModel.push(this.configuration.payment_place);
        }
      } else {
        this.configuration.payment_place = "";
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
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
  name: "Contact",
  created: function created() {
    this.getCountries().then(function () {});

    if (this.hotel.idContact !== null) {
      this.urlModel = this.contacts.url;
      this.emailModel = this.contacts.email;
      this.phoneModel = this.contacts.phone;
      this.addressModel = this.contacts.address;
      this.zipCodeModel = this.contacts.zipcode;
      this.cityModel = this.contacts.city;
      this.stateModel = this.contacts.state;
      this.countryIDModel = this.contacts.country_id;
      this.legalRepModel = this.contacts.legal_rep;
      this.managerNameModel = this.contacts.manager_name;
    }
  },
  data: function data() {
    return {
      urlModel: null,
      emailModel: null,
      phoneModel: null,
      addressModel: null,
      zipCodeModel: null,
      cityModel: null,
      stateModel: null,
      countryIDModel: null,
      legalRepModel: null,
      managerNameModel: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    contacts: function contacts(state) {
      return state.HotelModule.contacts;
    },
    countries: function countries(state) {
      return state.HotelModule.countries;
    },
    errorsContacts: function errorsContacts(state) {
      return state.HotelModule.errorsContacts;
    }
  })), {}, {
    computedUrl: {
      get: function get() {
        return this.urlModel;
      },
      set: function set(model) {
        this.urlModel = model;
        this.contacts.url = this.urlModel;
        return this.urlModel;
      }
    },
    computedEmail: {
      get: function get() {
        return this.emailModel;
      },
      set: function set(model) {
        this.emailModel = model;
        this.contacts.email = this.emailModel;
        return this.emailModel;
      }
    },
    computedPhone: {
      get: function get() {
        return this.phoneModel;
      },
      set: function set(model) {
        this.phoneModel = model;
        this.contacts.phone = this.phoneModel;
        return this.phoneModel;
      }
    },
    computedAddress: {
      get: function get() {
        return this.addressModel;
      },
      set: function set(model) {
        this.addressModel = model;
        this.contacts.address = this.addressModel;
        return this.addressModel;
      }
    },
    computedZipCode: {
      get: function get() {
        return this.zipCodeModel;
      },
      set: function set(model) {
        this.zipCodeModel = model;
        this.contacts.zipcode = this.zipCodeModel;
        return this.zipCodeModel;
      }
    },
    computedCity: {
      get: function get() {
        return this.cityModel;
      },
      set: function set(model) {
        this.cityModel = model;
        this.contacts.city = this.cityModel;
        return this.cityModel;
      }
    },
    computedState: {
      get: function get() {
        return this.stateModel;
      },
      set: function set(model) {
        this.stateModel = model;
        this.contacts.state = this.stateModel;
        return this.stateModel;
      }
    },
    computedCountryID: {
      get: function get() {
        return this.countryIDModel;
      },
      set: function set(model) {
        this.countryIDModel = model;
        this.contacts.country_id = this.countryIDModel;
        return this.countryIDModel;
      }
    },
    computedLegalRep: {
      get: function get() {
        return this.legalRepModel;
      },
      set: function set(model) {
        this.legalRepModel = model;
        this.contacts.legal_rep = this.legalRepModel;
        return this.legalRepModel;
      }
    },
    computedManagerName: {
      get: function get() {
        return this.managerNameModel;
      },
      set: function set(model) {
        this.managerNameModel = model;
        this.contacts.manager_name = this.managerNameModel;
        return this.managerNameModel;
      }
    }
  }),
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getCountries"]))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _views_Hotel_ButtonActionsSup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../views/Hotel/ButtonActionsSup */ "./resources/js/views/Hotel/ButtonActionsSup.vue");
/* harmony import */ var _views_Hotel_LateralMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../views/Hotel/LateralMenu */ "./resources/js/views/Hotel/LateralMenu.vue");
/* harmony import */ var _views_Hotel_Information__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../views/Hotel/Information */ "./resources/js/views/Hotel/Information.vue");
/* harmony import */ var _views_Hotel_Configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../views/Hotel/Configuration */ "./resources/js/views/Hotel/Configuration.vue");
/* harmony import */ var _views_Hotel_Contact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../views/Hotel/Contact */ "./resources/js/views/Hotel/Contact.vue");
/* harmony import */ var _views_Hotel_Condition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../views/Hotel/Condition */ "./resources/js/views/Hotel/Condition.vue");
/* harmony import */ var _views_Hotel_Regime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../views/Hotel/Regime */ "./resources/js/views/Hotel/Regime.vue");
/* harmony import */ var _views_Hotel_AditionalInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../views/Hotel/AditionalInfo */ "./resources/js/views/Hotel/AditionalInfo.vue");
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









/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    //Ejecuta el metodo de carga del hotel
    this.chargeDataHotel();
  },
  data: function data() {
    return {
      hotelTitle: ""
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    chargeView: function chargeView(state) {
      return state.HotelModule.chargeView;
    },
    setReinicializedVar: function setReinicializedVar(state) {
      return state.HotelModule.setReinicializedVar;
    },
    iditemsListOptions: function iditemsListOptions(state) {
      return state.HotelModule.iditemsListOptions;
    }
  })),
  methods: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getHotel", "getConfiguration", "getContacts", "getConditions", "getRegimes", "getRestaurants", "getSchedules", "getPools", "getAditionalInfo"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])(["setReinicialized"])), {}, {
    chargeDataHotel: function chargeDataHotel() {
      var _this = this;

      if (this.$route.params.id) {
        this.setReinicialized(); //Reinicia el objeto hotel (esto es por que no hay una recarga de pag con router-link)

        this.getHotel(this.$route.params.id).then(function () {
          _this.hotelTitle = _this.hotel.title;

          if (_this.hotel.idConfiguration !== null) {
            _this.getConfiguration(_this.hotel.idConfiguration).then(function () {});
          }

          if (_this.hotel.idContact !== null) {
            _this.getContacts(_this.hotel.idContact).then(function () {});
          }

          if (_this.hotel.idCondition !== null) {
            _this.getConditions(_this.hotel.idCondition).then(function () {});
          }

          if (_this.hotel.idRegime !== null) {
            _this.getRegimes(_this.hotel.idRegime).then(function () {});
          }

          if (_this.hotel.idAmenity !== null) {
            _this.getAditionalInfo(_this.hotel.idAmenity).then(function () {});

            _this.getPools(_this.hotel.id).then(function () {});

            _this.getRestaurants(_this.hotel.id).then(function () {});

            _this.getSchedules(_this.hotel.id).then(function () {});
          }
        });
      }
    }
  }),
  components: {
    ButtonActionsSup: _views_Hotel_ButtonActionsSup__WEBPACK_IMPORTED_MODULE_1__["default"],
    LateralMenu: _views_Hotel_LateralMenu__WEBPACK_IMPORTED_MODULE_2__["default"],
    Information: _views_Hotel_Information__WEBPACK_IMPORTED_MODULE_3__["default"],
    Configuration: _views_Hotel_Configuration__WEBPACK_IMPORTED_MODULE_4__["default"],
    Contact: _views_Hotel_Contact__WEBPACK_IMPORTED_MODULE_5__["default"],
    Condition: _views_Hotel_Condition__WEBPACK_IMPORTED_MODULE_6__["default"],
    Regime: _views_Hotel_Regime__WEBPACK_IMPORTED_MODULE_7__["default"],
    AditionalInfo: _views_Hotel_AditionalInfo__WEBPACK_IMPORTED_MODULE_8__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Markdown_MarkdownCompo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/Markdown/MarkdownCompo */ "./resources/js/components/Markdown/MarkdownCompo.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var compressorjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! compressorjs */ "./node_modules/compressorjs/dist/compressor.js");
/* harmony import */ var compressorjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(compressorjs__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  name: "Information",
  created: function created() {
    if (this.hotel.id !== null) {
      this.titleModel = this.hotel.title;
      this.urlModel = this.hotel.url;
      this.referenceCModel = this.hotel.reference_code;
      this.numRoomsModel = this.hotel.num_rooms;
      this.numFloorsModel = this.hotel.num_floors;
      this.shortTModel = this.hotel.short_text;

      if (this.hotel.image != null || this.hotel.image != "") {
        if (_typeof(this.hotel.image) == 'object') {
          this.currentImage = this.hotel.image.temporalURL;
        } else if (this.hotel.image.includes("jpeg") == true) {
          this.currentImage = "/storage/img/" + this.hotel.image;
        }
      } else {//console.log("noImage")
      }

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
  mounted: function mounted() {},
  data: function data() {
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
      shortTModel: null
    };
  },
  components: {
    //Usamos componente MarkdownCompo (ubicado en la carpeta componentes. Es un componente de otro compo llamado TipTap)
    MarkdownCompo: _components_Markdown_MarkdownCompo__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  methods: {
    selectImage: function selectImage(event) {
      var _this = this;

      this.currentImage = event.target.files[0];
      this.hotel.image = this.currentImage; //Declaramos una variable llamada "sizeImageQuality" que llevara el porcentaje de calidad de la imagen

      var sizeImageQuality; //Las imagenes estan en bytes
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

      if (this.hotel.image.size >= 1048576 && this.hotel.image.size < 11534336) {
        sizeImageQuality = 0.4;
      }

      if (this.hotel.image.size >= 11534336) {
        sizeImageQuality = 0.2;
      } //Se crea una instancia de Compressor.js y se le manda la imagen recien seleccionada y la calidad
      //A la cual dejara la imagen una vez terminada la compresion


      var compressImg = new compressorjs__WEBPACK_IMPORTED_MODULE_2___default.a(this.hotel.image, {
        quality: sizeImageQuality //success(result) {
        //},
        //error(err) {
        //console.log(err.message);
        //},

      }); //La variable state "this.hotel" en su propiedad "image" ahora pasa a contener la imagen comprimida
      //(Es un objeto, y realmente la imagen esta contenida de la siguiente manera
      //"this.hotel.image.result"; sin embargo, no se puede añadir desde aqui directamente la propiedad "result"
      //del compressor a la variable state)

      this.hotel.image = {
        compressImage: compressImg
      };
      var reader = new FileReader(); //Esto trae la URL temporal de la imagen actual

      reader.readAsDataURL(this.currentImage);

      reader.onload = function (e) {
        //Guarda el base64 de la imagen
        _this.urlTemporal = e.target.result;
      }; //Seteamos la variable para que quede vacia y el contenedor de imagen <v-img> no la cargue


      this.currentImage = "";
      console.log("this.hotel.image", this.hotel);
    },
    //Coloca la URL de la imágen
    srcImage: function srcImage() {
      var localSrcImage = this.urlTemporal === '' ? this.currentImage : this.urlTemporal;

      if (_typeof(this.hotel.image) == 'object') {
        if (this.urlTemporal != "") {
          this.hotel.image.temporalURL = this.urlTemporal;
        }
      }

      console.log("this.hotel.imageSrcImage", this.hotel.image);
      console.log("this.urlTemporalSrcImage", this.urlTemporal);
      console.log("this.currentImageSrcImage", this.currentImage);
      return localSrcImage;
    }
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    errorsInformation: function errorsInformation(state) {
      return state.HotelModule.errorsInformation;
    }
  })), {}, {
    computedTitle: {
      get: function get() {
        return this.titleModel;
      },
      set: function set(model) {
        this.titleModel = model;
        this.hotel.title = this.titleModel;
        return this.titleModel;
      }
    },
    computedUrl: {
      get: function get() {
        return this.urlModel;
      },
      set: function set(model) {
        this.urlModel = model;
        this.hotel.url = this.urlModel;
        return this.urlModel;
      }
    },
    computedReferenceC: {
      get: function get() {
        return this.referenceCModel;
      },
      set: function set(model) {
        this.referenceCModel = model;
        this.hotel.reference_code = this.referenceCModel;
        return this.referenceCModel;
      }
    },
    computedNumRooms: {
      get: function get() {
        return this.numRoomsModel;
      },
      set: function set(model) {
        this.numRoomsModel = model;
        this.hotel.num_rooms = this.numRoomsModel;
        return this.numRoomsModel;
      }
    },
    computedNumFloors: {
      get: function get() {
        return this.numFloorsModel;
      },
      set: function set(model) {
        this.numFloorsModel = model;
        this.hotel.num_floors = this.numFloorsModel;
        return this.numFloorsModel;
      }
    },
    computedDdwnType: {
      get: function get() {
        return this.ddwnTypeModel;
      },
      set: function set(model) {
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
      }
    },
    computedShortT: {
      get: function get() {
        return this.shortTModel;
      },
      set: function set(model) {
        this.shortTModel = model;
        this.hotel.short_text = this.shortTModel;
        return this.shortTModel;
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "LateralMenu",
  data: function data() {
    return {
      itemsListOptions: [{
        text: "Información",
        icon: "mdi-information"
      }, {
        text: "Configuración",
        icon: "mdi-cog"
      }, {
        text: "Contacto",
        icon: "mdi-email"
      }, {
        text: "Condiciones",
        icon: "mdi-gavel"
      }, {
        text: "Regimenes",
        icon: "mdi-silverware-fork-knife"
      }, {
        text: "Información adicional",
        icon: "mdi-tag-multiple"
      }]
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    iditemsListOptions: function iditemsListOptions(state) {
      return state.HotelModule.iditemsListOptions;
    }
  })),
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])(["countIditemsListOptions"]))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Hotel_SpecialRegime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/Hotel/SpecialRegime */ "./resources/js/components/Hotel/SpecialRegime.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Regime",
  created: function created() {
    var countWhile = this.regimes.length - 1;

    while (countWhile >= 1) {
      //console.log(this.regimes[countWhile])
      this.addCompo(this.regimes[countWhile]);
      countWhile--;
    }

    if (this.regimes[0] != null) {
      this.swOnlyRoomModel = this.regimes[0].only_room;

      if (this.regimes[0].priority != null) {
        if (this.regimes[0].priority == "normal") {
          this.ddwnPriorityModel = "Normal";
        }

        if (this.regimes[0].priority == "medium") {
          this.ddwnPriorityModel = "Media";
        }

        if (this.regimes[0].priority == "high") {
          this.ddwnPriorityModel = "Alta";
        }
      }

      this.txtBreakfastChildrenModel = this.regimes[0].lodging_breakfast_children;
      this.txtBreakfastAdultModel = this.regimes[0].lodging_breakfast_adult;

      if (this.txtBreakfastAdultModel != null || this.txtBreakfastChildrenModel != null) {
        if (this.txtBreakfastAdultModel != 0 || this.txtBreakfastChildrenModel != 0) {
          this.swBreakfastModel = 1;
        }
      }

      this.txtHalfPensionChildrenModel = this.regimes[0].half_pension_children;
      this.txtHalfPensionAdultModel = this.regimes[0].half_pension_adult;

      if (this.txtHalfPensionAdultModel !== null || this.txtHalfPensionChildrenModel !== null) {
        if (this.txtHalfPensionAdultModel !== 0 || this.txtHalfPensionChildrenModel !== 0) {
          this.swHalfPensionModel = 1;
        }
      }

      this.txtFullPensionChildrenModel = this.regimes[0].full_pension_children;
      this.txtFullPensionAdultModel = this.regimes[0].full_pension_adult;

      if (this.txtFullPensionAdultModel !== null || this.txtFullPensionChildrenModel !== null) {
        if (this.txtFullPensionAdultModel !== 0 || this.txtFullPensionChildrenModel !== 0) {
          this.swFullPensionModel = 1;
        }
      }

      this.txtAllIncludedChildrenModel = this.regimes[0].all_included_children;
      this.txtAllIncludedAdultModel = this.regimes[0].all_included_adult;

      if (this.txtAllIncludedAdultModel !== null || this.txtAllIncludedChildrenModel !== null) {
        if (this.txtAllIncludedAdultModel !== 0 || this.txtAllIncludedChildrenModel !== 0) {
          this.swAllIncludedModel = 1;
        }
      }
    }
  },
  data: function data() {
    return {
      arrayComponents: [],
      countIdCompo: -1,
      prioritiesModel: ["Normal", "Media", "Alta"],
      swOnlyRoomModel: null,
      ddwnPriorityModel: null,
      swBreakfastModel: 0,
      txtBreakfastAdultModel: null,
      txtBreakfastChildrenModel: null,
      swHalfPensionModel: 0,
      txtHalfPensionAdultModel: null,
      txtHalfPensionChildrenModel: null,
      swFullPensionModel: 0,
      txtFullPensionAdultModel: null,
      txtFullPensionChildrenModel: null,
      swAllIncludedModel: 0,
      txtAllIncludedAdultModel: null,
      txtAllIncludedChildrenModel: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    hotel: function hotel(state) {
      return state.HotelModule.hotel;
    },
    regimes: function regimes(state) {
      return state.HotelModule.regimes;
    },
    errorsRegimes: function errorsRegimes(state) {
      return state.HotelModule.errorsRegimes;
    }
  })), {}, {
    //Codigo para guardar temporalmente en el state
    computedSwOnlyRoom: {
      get: function get() {
        return this.swOnlyRoomModel;
      },
      set: function set(model) {
        this.swOnlyRoomModel = model;
        this.regimes[0].only_room = this.swOnlyRoomModel;
        return this.swOnlyRoomModel;
      }
    },
    computedDdwnPriority: {
      get: function get() {
        return this.ddwnPriorityModel;
      },
      set: function set(model) {
        this.ddwnPriorityModel = model;

        if (this.ddwnPriorityModel == "Normal") {
          this.regimes[0].priority = "normal";
        }

        if (this.ddwnPriorityModel == "Media") {
          this.regimes[0].priority = "medium";
        }

        if (this.ddwnPriorityModel == "Alta") {
          this.regimes[0].priority = "high";
        }

        return this.ddwnPriorityModel;
      }
    },
    computedSwBreakfast: {
      get: function get() {
        return this.swBreakfastModel;
      },
      set: function set(model) {
        this.swBreakfastModel = model;

        if (model == 0) {
          this.txtBreakfastChildrenModel = 0;
          this.txtBreakfastAdultModel = 0;
          this.regimes[0].lodging_breakfast_children = 0;
          this.regimes[0].lodging_breakfast_adult = 0;
        }

        return this.swBreakfastModel;
      }
    },
    computedTxtBreakfastAdult: {
      get: function get() {
        return this.txtBreakfastAdultModel;
      },
      set: function set(model) {
        this.txtBreakfastAdultModel = model;
        this.regimes[0].lodging_breakfast_adult = this.txtBreakfastAdultModel;
        return this.txtBreakfastAdultModel;
      }
    },
    computedTxtBreakfastChildren: {
      get: function get() {
        return this.txtBreakfastChildrenModel;
      },
      set: function set(model) {
        this.txtBreakfastChildrenModel = model;
        this.regimes[0].lodging_breakfast_children = this.txtBreakfastChildrenModel;
        return this.txtBreakfastChildrenModel;
      }
    },
    computedSwHalfPension: {
      get: function get() {
        return this.swHalfPensionModel;
      },
      set: function set(model) {
        this.swHalfPensionModel = model;

        if (model == 0) {
          this.txtHalfPensionChildrenModel = 0;
          this.txtHalfPensionAdultModel = 0;
          this.regimes[0].half_pension_children = 0;
          this.regimes[0].half_pension_adult = 0;
        }

        return this.swHalfPensionModel;
      }
    },
    computedTxtHalfPensionAdult: {
      get: function get() {
        return this.txtHalfPensionAdultModel;
      },
      set: function set(model) {
        this.txtHalfPensionAdultModel = model;
        this.regimes[0].half_pension_adult = this.txtHalfPensionAdultModel;
        return this.txtHalfPensionAdultModel;
      }
    },
    computedTxtHalfPensionChildren: {
      get: function get() {
        return this.txtHalfPensionChildrenModel;
      },
      set: function set(model) {
        this.txtHalfPensionChildrenModel = model;
        this.regimes[0].half_pension_children = this.txtHalfPensionChildrenModel;
        return this.txtHalfPensionChildrenModel;
      }
    },
    computedSwFullPension: {
      get: function get() {
        return this.swFullPensionModel;
      },
      set: function set(model) {
        this.swFullPensionModel = model;

        if (model == 0) {
          this.txtFullPensionChildrenModel = 0;
          this.txtFullPensionAdultModel = 0;
          this.regimes[0].full_pension_children = 0;
          this.regimes[0].full_pension_adult = 0;
        }

        return this.swFullPensionModel;
      }
    },
    computedTxtFullPensionAdult: {
      get: function get() {
        return this.txtFullPensionAdultModel;
      },
      set: function set(model) {
        this.txtFullPensionAdultModel = model;
        this.regimes[0].full_pension_adult = this.txtFullPensionAdultModel;
        return this.txtFullPensionAdultModel;
      }
    },
    computedTxtFullPensionChildren: {
      get: function get() {
        return this.txtFullPensionChildrenModel;
      },
      set: function set(model) {
        this.txtFullPensionChildrenModel = model;
        this.regimes[0].full_pension_children = this.txtFullPensionChildrenModel;
        return this.txtFullPensionChildrenModel;
      }
    },
    computedSwAllIncluded: {
      get: function get() {
        return this.swAllIncludedModel;
      },
      set: function set(model) {
        this.swAllIncludedModel = model;

        if (model == 0) {
          this.txtAllIncludedChildrenModel = 0;
          this.txtAllIncludedAdultModel = 0;
          this.regimes[0].all_included_children = 0;
          this.regimes[0].all_included_adult = 0;
        }

        return this.swAllIncludedModel;
      }
    },
    computedTxtAllIncludedAdult: {
      get: function get() {
        return this.txtAllIncludedAdultModel;
      },
      set: function set(model) {
        this.txtAllIncludedAdultModel = model;
        this.regimes[0].all_included_adult = this.txtAllIncludedAdultModel;
        return this.txtAllIncludedAdultModel;
      }
    },
    computedTxtAllIncludedChildren: {
      get: function get() {
        return this.txtAllIncludedChildrenModel;
      },
      set: function set(model) {
        this.txtAllIncludedChildrenModel = model;
        this.regimes[0].all_included_children = this.txtAllIncludedChildrenModel;
        return this.txtAllIncludedChildrenModel;
      }
    },
    //Propiedad computada para asignar al store los arreglos dinamicos que se crearan con btnAddCompo
    computedRegimes: {
      get: function get() {
        return this.regimes;
      },
      set: function set(model) {
        this.regimes = model;
        return this.regimes;
      }
    },
    computedArrayComponents: function computedArrayComponents() {
      return this.arrayComponents;
    }
  }),
  components: {
    SpecialRegime: _components_Hotel_SpecialRegime__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapMutations"])(["setArrayRegimes"])), {}, {
    addCompoButton: function addCompoButton() {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSRegimes: _components_Hotel_SpecialRegime__WEBPACK_IMPORTED_MODULE_0__["default"],
        objArrCompo: {
          id: "NEW",
          //Se pone "NEW" para identificarlo en el posterior metodo PUT
          priority: "normal",
          only_room: 0,
          start_period: new Date(Date.now()).toISOString().slice(0, -14) + " 00:00:00",
          final_period: new Date(Date.now()).toISOString().slice(0, -14) + " 00:00:00",
          lodging_breakfast_children: null,
          lodging_breakfast_adult: null,
          half_pension_children: null,
          half_pension_adult: null,
          full_pension_children: null,
          full_pension_adult: null,
          all_included_children: null,
          all_included_adult: null,
          hotel_id: null
        }
      });
      this.regimes.push(this.arrayComponents[this.arrayComponents.length - 1].objArrCompo);
    },
    addCompo: function addCompo(obj) {
      this.countIdCompo++;
      this.arrayComponents.push({
        idCompo: this.countIdCompo,
        TagSRegimes: _components_Hotel_SpecialRegime__WEBPACK_IMPORTED_MODULE_0__["default"],
        objArrCompo: obj
      });
    },
    removeCompo: function removeCompo(idCompoParam) {
      var tempArray = this.regimes[0]; //Mandamos el arreglo temporal que se seteara en la variable state "regimes"

      this.setArrayRegimes([tempArray]);
      var idCompoMap = this.arrayComponents.map(function (element) {
        return element.idCompo;
      }).indexOf(idCompoParam);
      this.arrayComponents.splice(idCompoMap, 1); //Mandamos el nuevo arreglo de esta manera
      //En un array anonimo concatenamos el arreglo actual regimes y
      //this.arrayComponents

      this.setArrayRegimes([].concat(this.regimes, this.arrayComponents.map(function (el) {
        return el.objArrCompo;
      })));
    }
  })
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/*Estilo para el scroll del carousel*/\n.v-sheet[data-v-81254bb6] {\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/*Estilo para el scroll del carousel*/\n.v-sheet[data-v-55a0fc06] {\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.iconsInformation[data-v-1ae75229] {\r\n  margin-bottom: 6px;\n}\n.v-expansion-panel-header[data-v-1ae75229] {\r\n  color: white;\n}\n.v-expansion-panel-content[data-v-1ae75229] {\r\n  margin-top: 2%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8& ***!
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
        "v-datetime-picker",
        {
          attrs: {
            "text-field-props": _vm.textFieldProps,
            "date-picker-props": _vm.dateProps,
            "time-picker-props": _vm.timeProps,
            "time-format": "HH:mm"
          },
          scopedSlots: _vm._u([
            {
              key: "actions",
              fn: function(ref) {
                var parent = ref.parent
                return [
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      on: {
                        click: function($event) {
                          parent.okHandler()
                          _vm.formatAndSendHour()
                        }
                      }
                    },
                    [_vm._v("Aceptar")]
                  )
                ]
              }
            }
          ]),
          model: {
            value: _vm.datetime,
            callback: function($$v) {
              _vm.datetime = $$v
            },
            expression: "datetime"
          }
        },
        [
          _c(
            "template",
            { slot: "dateIcon" },
            [_c("v-icon", [_vm._v("mdi-calendar-month")])],
            1
          ),
          _vm._v(" "),
          _c(
            "template",
            { slot: "timeIcon" },
            [_c("v-icon", [_vm._v("mdi-clock")])],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c(
      "div",
      [
        _c("v-row", { attrs: { justify: "space-around" } }, [
          _c("strong", [_vm._v("Piscinas activas: " + _vm._s(_vm.activePools))])
        ]),
        _vm._v(" "),
        _c(
          "v-carousel",
          {
            attrs: {
              light: "",
              "hide-delimiters": "",
              "show-arrows-on-hover": _vm.activePools > 1,
              "show-arrows": _vm.activePools > 1
            },
            model: {
              value: _vm.lastCarouselElement,
              callback: function($$v) {
                _vm.lastCarouselElement = $$v
              },
              expression: "lastCarouselElement"
            }
          },
          _vm._l(_vm.arrayComponents, function(component) {
            return _c(component.TagDPool, {
              key: component.idCompo,
              tag: "component",
              attrs: {
                idCompo: component.idCompo,
                objArrCompo: component.objArrCompo
              },
              on: { removeCompo: _vm.removeCompo }
            })
          }),
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "d-flex justify-end" },
          [
            _c(
              "v-btn",
              {
                staticClass: "mt-2",
                attrs: { small: "", depressed: "", color: "primary" },
                on: {
                  click: function($event) {
                    return _vm.addCompoButton()
                  }
                }
              },
              [_vm._v("Añadir piscina")]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146& ***!
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
  return _c("div", [
    _c(
      "div",
      [
        _c("v-row", { attrs: { justify: "space-around" } }, [
          _c("strong", [
            _vm._v("Restaurantes activos: " + _vm._s(_vm.activeRestaurants))
          ])
        ]),
        _vm._v(" "),
        _c(
          "v-carousel",
          {
            attrs: {
              light: "",
              "hide-delimiters": "",
              "show-arrows-on-hover": _vm.activeRestaurants > 1,
              "show-arrows": _vm.activeRestaurants > 1
            },
            model: {
              value: _vm.countLastElementCarrousel,
              callback: function($$v) {
                _vm.countLastElementCarrousel = $$v
              },
              expression: "countLastElementCarrousel"
            }
          },
          _vm._l(_vm.arrayComponents, function(component) {
            return _c(component.TagDRestaurant, {
              key: component.idCompo,
              tag: "component",
              attrs: {
                idCompo: component.idCompo,
                idRestaurant: component.objArrCompo.id,
                restauranNumber: component.restauranNumber,
                objArrCompo: component.objArrCompo
              },
              on: { removeCompo: _vm.removeCompo }
            })
          }),
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "d-flex justify-end" },
          [
            _c(
              "v-btn",
              {
                staticClass: "mt-2",
                attrs: { small: "", depressed: "", color: "primary" },
                on: {
                  click: function($event) {
                    return _vm.addCompoButton()
                  }
                }
              },
              [_vm._v("Añadir restaurante")]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true& ***!
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
    "v-carousel-item",
    [
      _c("v-sheet", { attrs: { color: "#eeeeee", height: "100%" } }, [
        _c(
          "div",
          { staticStyle: { padding: "2%" } },
          [
            _c("v-row", { staticClass: "ml-1 d-flex" }, [
              _c("span", [
                _c("h2", [
                  _c("strong", [_vm._v("Piscina #" + _vm._s(_vm.idCompo + 1))])
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "ml-auto mr-2" },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text",
                      attrs: { small: "", depressed: "", color: "red" },
                      on: {
                        click: function($event) {
                          return _vm.removeCompo(_vm.id)
                        }
                      }
                    },
                    [_vm._v("Eliminar piscina")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("v-text-field", {
              attrs: { label: "Nombre del restaurante", required: "" },
              model: {
                value: _vm.poolName,
                callback: function($$v) {
                  _vm.poolName = $$v
                },
                expression: "poolName"
              }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("span", [_c("strong", [_vm._v("Tipo de piscina")])]),
            _vm._v(" "),
            _c(
              "v-row",
              { attrs: { justify: "space-around" } },
              [
                _c(
                  "v-radio-group",
                  {
                    attrs: { row: "" },
                    model: {
                      value: _vm.radioPoolType,
                      callback: function($$v) {
                        _vm.radioPoolType = $$v
                      },
                      expression: "radioPoolType"
                    }
                  },
                  [
                    _c("v-radio", {
                      attrs: { label: "Interior", value: "indoor" }
                    }),
                    _vm._v(" "),
                    _c("v-radio", {
                      attrs: { label: "Al aire libre", value: "outdoor" }
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
            _c("span", [_c("strong", [_vm._v("Otros")])]),
            _vm._v(" "),
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  {
                    staticStyle: { "margin-bottom": "1%" },
                    attrs: { cols: "6" }
                  },
                  [
                    _c(
                      "v-card",
                      {
                        staticStyle: { padding: "5%", display: "flex" },
                        attrs: { outlined: "", color: "#e0e0e0" }
                      },
                      [
                        _c(
                          "span",
                          {
                            staticClass: "d-flex align-center",
                            staticStyle: { "margin-right": "5%" }
                          },
                          [_c("strong", [_vm._v("Aire acondicionado")])]
                        ),
                        _vm._v(" "),
                        _c("v-switch", {
                          staticClass: "ml-auto",
                          attrs: { inset: "" },
                          model: {
                            value: _vm.swAirConditioned,
                            callback: function($$v) {
                              _vm.swAirConditioned = $$v
                            },
                            expression: "swAirConditioned"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  {
                    staticStyle: { "margin-bottom": "1%" },
                    attrs: { cols: "6" }
                  },
                  [
                    _c(
                      "v-card",
                      {
                        staticStyle: { padding: "5%", display: "flex" },
                        attrs: { outlined: "", color: "#e0e0e0" }
                      },
                      [
                        _c(
                          "span",
                          {
                            staticClass: "d-flex align-center",
                            staticStyle: { "margin-right": "5%" }
                          },
                          [_c("strong", [_vm._v("Vista panorámica")])]
                        ),
                        _vm._v(" "),
                        _c("v-switch", {
                          staticClass: "ml-auto",
                          attrs: { inset: "" },
                          model: {
                            value: _vm.swPanoramicView,
                            callback: function($$v) {
                              _vm.swPanoramicView = $$v
                            },
                            expression: "swPanoramicView"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  {
                    staticStyle: { "margin-bottom": "1%" },
                    attrs: { cols: "6" }
                  },
                  [
                    _c(
                      "v-card",
                      {
                        staticStyle: { padding: "5%", display: "flex" },
                        attrs: { outlined: "", color: "#e0e0e0" }
                      },
                      [
                        _c(
                          "span",
                          {
                            staticClass: "d-flex align-center",
                            staticStyle: { "margin-right": "5%" }
                          },
                          [_c("strong", [_vm._v("Chapoteadero")])]
                        ),
                        _vm._v(" "),
                        _c("v-switch", {
                          staticClass: "ml-auto",
                          attrs: { inset: "" },
                          model: {
                            value: _vm.swWadingPool,
                            callback: function($$v) {
                              _vm.swWadingPool = $$v
                            },
                            expression: "swWadingPool"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  {
                    staticStyle: { "margin-bottom": "1%" },
                    attrs: { cols: "6" }
                  },
                  [
                    _c(
                      "v-card",
                      {
                        staticStyle: { padding: "5%", display: "flex" },
                        attrs: { outlined: "", color: "#e0e0e0" }
                      },
                      [
                        _c(
                          "span",
                          {
                            staticClass: "d-flex align-center",
                            staticStyle: { "margin-right": "5%" }
                          },
                          [_c("strong", [_vm._v("Toallas")])]
                        ),
                        _vm._v(" "),
                        _c("v-switch", {
                          staticClass: "ml-auto",
                          attrs: { inset: "" },
                          model: {
                            value: _vm.swTowels,
                            callback: function($$v) {
                              _vm.swTowels = $$v
                            },
                            expression: "swTowels"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-col",
                  {
                    staticStyle: { "margin-bottom": "1%" },
                    attrs: { cols: "6" }
                  },
                  [
                    _c(
                      "v-card",
                      {
                        staticStyle: { padding: "5%", display: "flex" },
                        attrs: { outlined: "", color: "#e0e0e0" }
                      },
                      [
                        _c(
                          "span",
                          {
                            staticClass: "d-flex align-center",
                            staticStyle: { "margin-right": "5%" }
                          },
                          [_c("strong", [_vm._v("Pool bar")])]
                        ),
                        _vm._v(" "),
                        _c("v-switch", {
                          staticClass: "ml-auto",
                          attrs: { inset: "" },
                          model: {
                            value: _vm.swBarPool,
                            callback: function($$v) {
                              _vm.swBarPool = $$v
                            },
                            expression: "swBarPool"
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
            _c("br"),
            _vm._v(" "),
            _c("v-row", { staticClass: "ml-1", attrs: { align: "center" } }, [
              _c("span", [_c("strong", [_vm._v("Horario de apertura")])])
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "v-dialog",
              {
                ref: "dialogHour",
                attrs: {
                  "return-value": _vm.hour,
                  persistent: "",
                  width: "290px"
                },
                on: {
                  "update:returnValue": function($event) {
                    _vm.hour = $event
                  },
                  "update:return-value": function($event) {
                    _vm.hour = $event
                  }
                },
                scopedSlots: _vm._u([
                  {
                    key: "activator",
                    fn: function(ref) {
                      var on = ref.on
                      var attrs = ref.attrs
                      return [
                        _c(
                          "v-autocomplete",
                          _vm._g(
                            _vm._b(
                              {
                                staticClass: "col-6",
                                staticStyle: { "margin-right": "2%" },
                                attrs: {
                                  items: [_vm.hour],
                                  readonly: "",
                                  dense: "",
                                  label: "Desde las",
                                  filled: ""
                                },
                                model: {
                                  value: _vm.hour,
                                  callback: function($$v) {
                                    _vm.hour = $$v
                                  },
                                  expression: "hour"
                                }
                              },
                              "v-autocomplete",
                              attrs,
                              false
                            ),
                            on
                          )
                        )
                      ]
                    }
                  }
                ]),
                model: {
                  value: _vm.modalHour,
                  callback: function($$v) {
                    _vm.modalHour = $$v
                  },
                  expression: "modalHour"
                }
              },
              [
                _vm._v(" "),
                _vm.modalHour
                  ? _c(
                      "v-time-picker",
                      {
                        attrs: { format: "24hr", "full-width": "" },
                        model: {
                          value: _vm.hour,
                          callback: function($$v) {
                            _vm.hour = $$v
                          },
                          expression: "hour"
                        }
                      },
                      [
                        _c("v-spacer"),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", color: "primary" },
                            on: {
                              click: function($event) {
                                _vm.modalHour = false
                              }
                            }
                          },
                          [_vm._v("Cancelar")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { text: "", color: "primary" },
                            on: {
                              click: function($event) {
                                return _vm.$refs.dialogHour.save(_vm.hour)
                              }
                            }
                          },
                          [_vm._v("Aceptar")]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    "v-carousel-item",
    [
      _c("v-sheet", { attrs: { color: "#eeeeee", height: "100%" } }, [
        _c(
          "div",
          { staticStyle: { padding: "2%" } },
          [
            _c("v-row", { staticClass: "ml-1 d-flex" }, [
              _c("span", [
                _c("h2", [
                  _c("strong", [
                    _vm._v("Restaurante #" + _vm._s(_vm.restauranNumber + 1))
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "ml-auto mr-3" },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text",
                      attrs: { small: "", depressed: "", color: "red" },
                      on: {
                        click: function($event) {
                          return _vm.removeCompo(_vm.id)
                        }
                      }
                    },
                    [_vm._v("Eliminar restaurante")]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("v-text-field", {
              attrs: { label: "Nombre del restaurante", required: "" },
              model: {
                value: _vm.computedRestaurantName,
                callback: function($$v) {
                  _vm.computedRestaurantName = $$v
                },
                expression: "computedRestaurantName"
              }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("span", [_c("strong", [_vm._v("Tipo de menú")])]),
            _vm._v(" "),
            _c(
              "v-row",
              { attrs: { justify: "space-around" } },
              [
                _c("v-checkbox", {
                  attrs: { label: "A la carta", value: "a la carte" },
                  model: {
                    value: _vm.computedSelectMenuType,
                    callback: function($$v) {
                      _vm.computedSelectMenuType = $$v
                    },
                    expression: "computedSelectMenuType"
                  }
                }),
                _vm._v(" "),
                _c("v-checkbox", {
                  attrs: { label: "Buffet", value: "buffet" },
                  model: {
                    value: _vm.computedSelectMenuType,
                    callback: function($$v) {
                      _vm.computedSelectMenuType = $$v
                    },
                    expression: "computedSelectMenuType"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "v-row",
              { staticClass: "ml-1", attrs: { align: "center" } },
              [
                _c("span", [_c("strong", [_vm._v("Introduce el horario")])]),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    staticClass: "ml-2",
                    attrs: {
                      "x-small": "",
                      depressed: "",
                      dark: "",
                      fab: "",
                      color: "primary"
                    },
                    on: {
                      click: function($event) {
                        return _vm.addCompoFromComponent()
                      }
                    }
                  },
                  [
                    _c("v-icon", { attrs: { dark: "" } }, [
                      _vm._v("mdi-pencil")
                    ])
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("span", [
              _vm._v("Dile a los clientes cuándo pueden usar este servicio")
            ]),
            _vm._v(" "),
            _vm._l(_vm.arrayComponents, function(component) {
              return _c(component.TagSTimePicker, {
                key: component.idCompo,
                tag: "component",
                attrs: {
                  idCompo: component.idCompo,
                  objArrCompo: component.objArrCompo
                },
                on: { removeCompoTime: _vm.removeCompoTime }
              })
            })
          ],
          2
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
        { staticClass: "d-flex align-center justify-center pa-6 mt-n7" },
        [
          _c(
            "v-col",
            { attrs: { cols: "12", md: "2", sm: "12", xs: "12" } },
            [
              _c(
                "v-btn",
                {
                  staticClass: "white--text mt-1",
                  attrs: { small: "", color: "red", depressed: "" },
                  on: {
                    click: function($event) {
                      return _vm.removeCompo(_vm.id)
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { left: "", dark: "" } }, [
                    _vm._v("mdi-close-circle")
                  ]),
                  _vm._v("Eliminar\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "mt-8",
              attrs: { cols: "12", md: "5", sm: "12", xs: "12" }
            },
            [
              _vm.getStartDate != null
                ? _c(
                    "div",
                    [
                      _c("DateTimePicker", {
                        attrs: { dates: _vm.getStartDate },
                        on: { sendNewHour: _vm.sendNewHour }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "mt-8",
              attrs: { cols: "12", md: "5", sm: "12", xs: "12" }
            },
            [
              _vm.getFinalDate != null
                ? _c(
                    "div",
                    [
                      _c("DateTimePicker", {
                        attrs: { dates: _vm.getFinalDate },
                        on: { sendNewHour: _vm.sendNewHour }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-switch", {
                attrs: { inset: "", label: "Solo habitacion" },
                model: {
                  value: _vm.computedSwOnlyRoom,
                  callback: function($$v) {
                    _vm.computedSwOnlyRoom = $$v
                  },
                  expression: "computedSwOnlyRoom"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-select", {
                attrs: {
                  items: _vm.prioritiesModel,
                  "prepend-inner-icon": "mdi-pen",
                  label: "Prioridad",
                  "menu-props": { bottom: true, offsetY: true },
                  outlined: ""
                },
                model: {
                  value: _vm.computedDdwnPriority,
                  callback: function($$v) {
                    _vm.computedDdwnPriority = $$v
                  },
                  expression: "computedDdwnPriority"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-switch", {
                attrs: { inset: "", label: "Alojamiento y desayuno" },
                model: {
                  value: _vm.computedSwBreakfast,
                  callback: function($$v) {
                    _vm.computedSwBreakfast = $$v
                  },
                  expression: "computedSwBreakfast"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male",
                  label: "Adulto",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwBreakfast == 0 ||
                    _vm.computedSwBreakfast == false
                },
                model: {
                  value: _vm.computedTxtBreakfastAdult,
                  callback: function($$v) {
                    _vm.computedTxtBreakfastAdult = $$v
                  },
                  expression: "computedTxtBreakfastAdult"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male-boy",
                  label: "Niño",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwBreakfast == 0 ||
                    _vm.computedSwBreakfast == false
                },
                model: {
                  value: _vm.computedTxtBreakfastChildren,
                  callback: function($$v) {
                    _vm.computedTxtBreakfastChildren = $$v
                  },
                  expression: "computedTxtBreakfastChildren"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-switch", {
                attrs: { inset: "", label: "Media pension" },
                model: {
                  value: _vm.computedSwHalfPension,
                  callback: function($$v) {
                    _vm.computedSwHalfPension = $$v
                  },
                  expression: "computedSwHalfPension"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male",
                  label: "Adulto",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwHalfPension == 0 ||
                    _vm.computedSwHalfPension == false
                },
                model: {
                  value: _vm.computedTxtHalfPensionAdult,
                  callback: function($$v) {
                    _vm.computedTxtHalfPensionAdult = $$v
                  },
                  expression: "computedTxtHalfPensionAdult"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male-boy",
                  label: "Niño",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwHalfPension == 0 ||
                    _vm.computedSwHalfPension == false
                },
                model: {
                  value: _vm.computedTxtHalfPensionChildren,
                  callback: function($$v) {
                    _vm.computedTxtHalfPensionChildren = $$v
                  },
                  expression: "computedTxtHalfPensionChildren"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-switch", {
                attrs: { inset: "", label: "Pension completa" },
                model: {
                  value: _vm.computedSwFullPension,
                  callback: function($$v) {
                    _vm.computedSwFullPension = $$v
                  },
                  expression: "computedSwFullPension"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male",
                  label: "Adulto",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwFullPension == 0 ||
                    _vm.computedSwFullPension == false
                },
                model: {
                  value: _vm.computedTxtFullPensionAdult,
                  callback: function($$v) {
                    _vm.computedTxtFullPensionAdult = $$v
                  },
                  expression: "computedTxtFullPensionAdult"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male-boy",
                  label: "Niño",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwFullPension == 0 ||
                    _vm.computedSwFullPension == false
                },
                model: {
                  value: _vm.computedTxtFullPensionChildren,
                  callback: function($$v) {
                    _vm.computedTxtFullPensionChildren = $$v
                  },
                  expression: "computedTxtFullPensionChildren"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
            [
              _c("v-switch", {
                attrs: { inset: "", label: "Todo incluido" },
                model: {
                  value: _vm.computedSwAllIncluded,
                  callback: function($$v) {
                    _vm.computedSwAllIncluded = $$v
                  },
                  expression: "computedSwAllIncluded"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male",
                  label: "Adulto",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwAllIncluded == 0 ||
                    _vm.computedSwAllIncluded == false
                },
                model: {
                  value: _vm.computedTxtAllIncludedAdult,
                  callback: function($$v) {
                    _vm.computedTxtAllIncludedAdult = $$v
                  },
                  expression: "computedTxtAllIncludedAdult"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-inner-icon": "mdi-human-male-boy",
                  label: "Niño",
                  outlined: "",
                  required: "",
                  disabled:
                    _vm.computedSwAllIncluded == 0 ||
                    _vm.computedSwAllIncluded == false
                },
                model: {
                  value: _vm.computedTxtAllIncludedChildren,
                  callback: function($$v) {
                    _vm.computedTxtAllIncludedChildren = $$v
                  },
                  expression: "computedTxtAllIncludedChildren"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
      _c("tiptap-vuetify", {
        attrs: { extensions: _vm.extensions },
        model: {
          value: _vm.computedContent,
          callback: function($$v) {
            _vm.computedContent = $$v
          },
          expression: "computedContent"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
        [
          _c(
            "v-col",
            { staticStyle: { display: "flex" }, attrs: { md: "13" } },
            [
              _c("v-autocomplete", {
                staticStyle: { "margin-right": "4%" },
                attrs: {
                  items: _vm.weekDaysItems,
                  dense: "",
                  filled: "",
                  label: "Dia"
                },
                model: {
                  value: _vm.computedDdwnWeekDays,
                  callback: function($$v) {
                    _vm.computedDdwnWeekDays = $$v
                  },
                  expression: "computedDdwnWeekDays"
                }
              }),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  ref: "dialogFromHour",
                  attrs: {
                    "return-value": _vm.computedFromHour,
                    persistent: "",
                    width: "290px"
                  },
                  on: {
                    "update:returnValue": function($event) {
                      _vm.computedFromHour = $event
                    },
                    "update:return-value": function($event) {
                      _vm.computedFromHour = $event
                    }
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        var attrs = ref.attrs
                        return [
                          _c(
                            "v-autocomplete",
                            _vm._g(
                              _vm._b(
                                {
                                  staticStyle: { "margin-right": "2%" },
                                  attrs: {
                                    items: [_vm.computedFromHour],
                                    readonly: "",
                                    dense: "",
                                    filled: "",
                                    label: "Desde"
                                  },
                                  model: {
                                    value: _vm.computedFromHour,
                                    callback: function($$v) {
                                      _vm.computedFromHour = $$v
                                    },
                                    expression: "computedFromHour"
                                  }
                                },
                                "v-autocomplete",
                                attrs,
                                false
                              ),
                              on
                            )
                          )
                        ]
                      }
                    }
                  ]),
                  model: {
                    value: _vm.modalFromHourModel,
                    callback: function($$v) {
                      _vm.modalFromHourModel = $$v
                    },
                    expression: "modalFromHourModel"
                  }
                },
                [
                  _vm._v(" "),
                  _vm.modalFromHourModel
                    ? _c(
                        "v-time-picker",
                        {
                          attrs: { format: "24hr", "full-width": "" },
                          model: {
                            value: _vm.computedFromHour,
                            callback: function($$v) {
                              _vm.computedFromHour = $$v
                            },
                            expression: "computedFromHour"
                          }
                        },
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  _vm.modalFromHourModel = false
                                }
                              }
                            },
                            [_vm._v("Cancelar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  return _vm.$refs.dialogFromHour.save(
                                    _vm.computedFromHour
                                  )
                                }
                              }
                            },
                            [_vm._v("Aceptar")]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  ref: "dialogToHour",
                  attrs: {
                    "return-value": _vm.computedToHour,
                    persistent: "",
                    width: "290px"
                  },
                  on: {
                    "update:returnValue": function($event) {
                      _vm.computedToHour = $event
                    },
                    "update:return-value": function($event) {
                      _vm.computedToHour = $event
                    }
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        var attrs = ref.attrs
                        return [
                          _c(
                            "v-autocomplete",
                            _vm._g(
                              _vm._b(
                                {
                                  staticStyle: { "margin-right": "2%" },
                                  attrs: {
                                    items: [_vm.computedToHour],
                                    readonly: "",
                                    dense: "",
                                    filled: "",
                                    label: "Hasta"
                                  },
                                  model: {
                                    value: _vm.computedToHour,
                                    callback: function($$v) {
                                      _vm.computedToHour = $$v
                                    },
                                    expression: "computedToHour"
                                  }
                                },
                                "v-autocomplete",
                                attrs,
                                false
                              ),
                              on
                            )
                          )
                        ]
                      }
                    }
                  ]),
                  model: {
                    value: _vm.modalToHourModel,
                    callback: function($$v) {
                      _vm.modalToHourModel = $$v
                    },
                    expression: "modalToHourModel"
                  }
                },
                [
                  _vm._v(" "),
                  _vm.modalToHourModel
                    ? _c(
                        "v-time-picker",
                        {
                          attrs: { format: "24hr", "full-width": "" },
                          model: {
                            value: _vm.computedToHour,
                            callback: function($$v) {
                              _vm.computedToHour = $$v
                            },
                            expression: "computedToHour"
                          }
                        },
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  _vm.modalToHourModel = false
                                }
                              }
                            },
                            [_vm._v("Cancelar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  return _vm.$refs.dialogToHour.save(
                                    _vm.computedToHour
                                  )
                                }
                              }
                            },
                            [_vm._v("Aceptar")]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "mt-3",
                  attrs: {
                    "x-small": "",
                    depressed: "",
                    fab: "",
                    dark: "",
                    color: "red"
                  },
                  on: {
                    click: function($event) {
                      return _vm.removeCompoTime(_vm.idModel)
                    }
                  }
                },
                [_c("v-icon", { attrs: { dark: "" } }, [_vm._v("mdi-delete")])],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-tag-multiple")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("INFORMACIÓN ADICIONAL")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pa-4" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", sm: "6", md: "12" } },
                [
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Servicios destacados")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Spa")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.spaItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnSpa,
                                              callback: function($$v) {
                                                _vm.computedDdwnSpa = $$v
                                              },
                                              expression: "computedDdwnSpa"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Aire acondicionado")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwAirConditioned,
                                              callback: function($$v) {
                                                _vm.computedSwAirConditioned = $$v
                                              },
                                              expression:
                                                "computedSwAirConditioned"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Habitaciones libres de humo de tabaco"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwNoSmokeRooms,
                                              callback: function($$v) {
                                                _vm.computedSwNoSmokeRooms = $$v
                                              },
                                              expression:
                                                "computedSwNoSmokeRooms"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Servicio por traslado a aeropuerto(transfer)"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwAirTransferService,
                                              callback: function($$v) {
                                                _vm.computedSwAirTransferService = $$v
                                              },
                                              expression:
                                                "computedSwAirTransferService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Servicio por traslado a hotel(collect)"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwAirCollectService,
                                              callback: function($$v) {
                                                _vm.computedSwAirCollectService = $$v
                                              },
                                              expression:
                                                "computedSwAirCollectService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Recepcion las 24 horas")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwRecection_24h,
                                              callback: function($$v) {
                                                _vm.computedSwRecection_24h = $$v
                                              },
                                              expression:
                                                "computedSwRecection_24h"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Gimnasio")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwGym,
                                              callback: function($$v) {
                                                _vm.computedSwGym = $$v
                                              },
                                              expression: "computedSwGym"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Servicio a la habitación"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwRoomService,
                                              callback: function($$v) {
                                                _vm.computedSwRoomService = $$v
                                              },
                                              expression:
                                                "computedSwRoomService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Terraza")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwTerrace,
                                              callback: function($$v) {
                                                _vm.computedSwTerrace = $$v
                                              },
                                              expression: "computedSwTerrace"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Bar")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwBar,
                                              callback: function($$v) {
                                                _vm.computedSwBar = $$v
                                              },
                                              expression: "computedSwBar"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Jardin")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwGarden,
                                              callback: function($$v) {
                                                _vm.computedSwGarden = $$v
                                              },
                                              expression: "computedSwGarden"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Parque acuatico")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.acuaticItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnAcuatic,
                                              callback: function($$v) {
                                                _vm.computedDdwnAcuatic = $$v
                                              },
                                              expression: "computedDdwnAcuatic"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Actividades")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Playa")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.beachItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnBeach,
                                              callback: function($$v) {
                                                _vm.computedDdwnBeach = $$v
                                              },
                                              expression: "computedDdwnBeach"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Actividades recreativas"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwRecreationalActivities,
                                              callback: function($$v) {
                                                _vm.computedSwRecreationalActivities = $$v
                                              },
                                              expression:
                                                "computedSwRecreationalActivities"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Cena romantica")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.romanticDItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnRomanticD,
                                              callback: function($$v) {
                                                _vm.computedDdwnRomanticD = $$v
                                              },
                                              expression:
                                                "computedDdwnRomanticD"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Tour turistico")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.touristicTItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnTouristicT,
                                              callback: function($$v) {
                                                _vm.computedDdwnTouristicT = $$v
                                              },
                                              expression:
                                                "computedDdwnTouristicT"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Transporte")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Estacionamiento vigilado"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwGuardedParking,
                                              callback: function($$v) {
                                                _vm.computedSwGuardedParking = $$v
                                              },
                                              expression:
                                                "computedSwGuardedParking"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Estacionamiento en la calle"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwStreetParking,
                                              callback: function($$v) {
                                                _vm.computedSwStreetParking = $$v
                                              },
                                              expression:
                                                "computedSwStreetParking"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Estacionamiento en un garaje"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwGarageParking,
                                              callback: function($$v) {
                                                _vm.computedSwGarageParking = $$v
                                              },
                                              expression:
                                                "computedSwGarageParking"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Estacionamiento adaptado para personas de movilidad reducida"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSpecialParking,
                                              callback: function($$v) {
                                                _vm.computedSwSpecialParking = $$v
                                              },
                                              expression:
                                                "computedSwSpecialParking"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Servicios de recepcion")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Registro privado")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwReg_inout_private,
                                              callback: function($$v) {
                                                _vm.computedSwReg_inout_private = $$v
                                              },
                                              expression:
                                                "computedSwReg_inout_private"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Registro express")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwReg_inout_express,
                                              callback: function($$v) {
                                                _vm.computedSwReg_inout_express = $$v
                                              },
                                              expression:
                                                "computedSwReg_inout_express"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Informacion turistica")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwTouristicInfo,
                                              callback: function($$v) {
                                                _vm.computedSwTouristicInfo = $$v
                                              },
                                              expression:
                                                "computedSwTouristicInfo"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Servicio de estacionamiento"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwParkingService,
                                              callback: function($$v) {
                                                _vm.computedSwParkingService = $$v
                                              },
                                              expression:
                                                "computedSwParkingService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Cambio de divisas")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwCurrencyChange,
                                              callback: function($$v) {
                                                _vm.computedSwCurrencyChange = $$v
                                              },
                                              expression:
                                                "computedSwCurrencyChange"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Zonas comunes")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Mobiliario exterior")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwOutdoorFurniture,
                                              callback: function($$v) {
                                                _vm.computedSwOutdoorFurniture = $$v
                                              },
                                              expression:
                                                "computedSwOutdoorFurniture"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Terraza/Solárium")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwTerraceSolarium,
                                              callback: function($$v) {
                                                _vm.computedSwTerraceSolarium = $$v
                                              },
                                              expression:
                                                "computedSwTerraceSolarium"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Comedor compartido")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwSharedDinner,
                                              callback: function($$v) {
                                                _vm.computedSwSharedDinner = $$v
                                              },
                                              expression:
                                                "computedSwSharedDinner"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Salon compartido")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwSharedSalon,
                                              callback: function($$v) {
                                                _vm.computedSwSharedSalon = $$v
                                              },
                                              expression:
                                                "computedSwSharedSalon"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Zona de juegos")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwGameZone,
                                              callback: function($$v) {
                                                _vm.computedSwGameZone = $$v
                                              },
                                              expression: "computedSwGameZone"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Biblioteca")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwLibrary,
                                              callback: function($$v) {
                                                _vm.computedSwLibrary = $$v
                                              },
                                              expression: "computedSwLibrary"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Servicios de limpieza")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Limpieza interna diaria"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-select", {
                                            staticClass: "ml-auto",
                                            attrs: {
                                              items: _vm.dailyHItems,
                                              dense: "",
                                              outlined: ""
                                            },
                                            model: {
                                              value: _vm.computedDdwnDailyH,
                                              callback: function($$v) {
                                                _vm.computedDdwnDailyH = $$v
                                              },
                                              expression: "computedDdwnDailyH"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Servicio de lavanderia")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwLaundryService,
                                              callback: function($$v) {
                                                _vm.computedSwLaundryService = $$v
                                              },
                                              expression:
                                                "computedSwLaundryService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Servicio de planchado")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwIronService,
                                              callback: function($$v) {
                                                _vm.computedSwIronService = $$v
                                              },
                                              expression:
                                                "computedSwIronService"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [
                              _c("strong", [
                                _vm._v("Instalaciones de negocios")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Sala de reuniones")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwMeetingRoom,
                                              callback: function($$v) {
                                                _vm.computedSwMeetingRoom = $$v
                                              },
                                              expression:
                                                "computedSwMeetingRoom"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Centro de reuniones")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwMeetingCenter,
                                              callback: function($$v) {
                                                _vm.computedSwMeetingCenter = $$v
                                              },
                                              expression:
                                                "computedSwMeetingCenter"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Fax/Fotocopiadora")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwFaxPhotocopier,
                                              callback: function($$v) {
                                                _vm.computedSwFaxPhotocopier = $$v
                                              },
                                              expression:
                                                "computedSwFaxPhotocopier"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Varios")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Descanso")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwCoffeeBreak,
                                              callback: function($$v) {
                                                _vm.computedSwCoffeeBreak = $$v
                                              },
                                              expression:
                                                "computedSwCoffeeBreak"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Tienda de recuerdos")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSouvenirsStore,
                                              callback: function($$v) {
                                                _vm.computedSwSouvenirsStore = $$v
                                              },
                                              expression:
                                                "computedSwSouvenirsStore"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Servicio para personas con capacidades reducidas"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwInclusiveService,
                                              callback: function($$v) {
                                                _vm.computedSwInclusiveService = $$v
                                              },
                                              expression:
                                                "computedSwInclusiveService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("Elevador")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwElevator,
                                              callback: function($$v) {
                                                _vm.computedSwElevator = $$v
                                              },
                                              expression: "computedSwElevator"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Area para fumar")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwSmokingZone,
                                              callback: function($$v) {
                                                _vm.computedSwSmokingZone = $$v
                                              },
                                              expression:
                                                "computedSwSmokingZone"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [_c("strong", [_vm._v("No fumar")])]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwNoSmoking,
                                              callback: function($$v) {
                                                _vm.computedSwNoSmoking = $$v
                                              },
                                              expression: "computedSwNoSmoking"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Pet friendly")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwPetFriendly,
                                              callback: function($$v) {
                                                _vm.computedSwPetFriendly = $$v
                                              },
                                              expression:
                                                "computedSwPetFriendly"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Casa para mascotas")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwPetHouse,
                                              callback: function($$v) {
                                                _vm.computedSwPetHouse = $$v
                                              },
                                              expression: "computedSwPetHouse"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Pet basket")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwPetBasket,
                                              callback: function($$v) {
                                                _vm.computedSwPetBasket = $$v
                                              },
                                              expression: "computedSwPetBasket"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Solo adultos")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwOnlyAdults,
                                              callback: function($$v) {
                                                _vm.computedSwOnlyAdults = $$v
                                              },
                                              expression: "computedSwOnlyAdults"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Habitaciones sanitizadas"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSanitizedRooms,
                                              callback: function($$v) {
                                                _vm.computedSwSanitizedRooms = $$v
                                              },
                                              expression:
                                                "computedSwSanitizedRooms"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Suite nupcial")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwBridalSuite,
                                              callback: function($$v) {
                                                _vm.computedSwBridalSuite = $$v
                                              },
                                              expression:
                                                "computedSwBridalSuite"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Servicio VIP")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwVipService,
                                              callback: function($$v) {
                                                _vm.computedSwVipService = $$v
                                              },
                                              expression: "computedSwVipService"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Calefacción")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwCalefaction,
                                              callback: function($$v) {
                                                _vm.computedSwCalefaction = $$v
                                              },
                                              expression:
                                                "computedSwCalefaction"
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
                              )
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
                  _c(
                    "v-expansion-panels",
                    { attrs: { focusable: "", accordion: "", multiple: "" } },
                    [
                      _c(
                        "v-expansion-panel",
                        [
                          _c(
                            "v-expansion-panel-header",
                            { attrs: { color: "#b2b2b2" } },
                            [_c("strong", [_vm._v("Seguridad")])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-row",
                                { attrs: { "no-gutters": "" } },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Bolsas de seguridad")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwKeepBags,
                                              callback: function($$v) {
                                                _vm.computedSwKeepBags = $$v
                                              },
                                              expression: "computedSwKeepBags"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Seguridad las 24 horas")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value: _vm.computedSwSecurity24h,
                                              callback: function($$v) {
                                                _vm.computedSwSecurity24h = $$v
                                              },
                                              expression:
                                                "computedSwSecurity24h"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Alarma de seguridad")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSecurityAlarm,
                                              callback: function($$v) {
                                                _vm.computedSwSecurityAlarm = $$v
                                              },
                                              expression:
                                                "computedSwSecurityAlarm"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Detectores de humo")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSmookeDetectors,
                                              callback: function($$v) {
                                                _vm.computedSwSmookeDetectors = $$v
                                              },
                                              expression:
                                                "computedSwSmookeDetectors"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Camaras de seguridad internas"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwInSecurityCams,
                                              callback: function($$v) {
                                                _vm.computedSwInSecurityCams = $$v
                                              },
                                              expression:
                                                "computedSwInSecurityCams"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(
                                                  "Camaras de seguridad externas"
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwOutSecurityCams,
                                              callback: function($$v) {
                                                _vm.computedSwOutSecurityCams = $$v
                                              },
                                              expression:
                                                "computedSwOutSecurityCams"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            "margin-right": "7%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Extintor de incendios")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwFireExtinguishers,
                                              callback: function($$v) {
                                                _vm.computedSwFireExtinguishers = $$v
                                              },
                                              expression:
                                                "computedSwFireExtinguishers"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    {
                                      staticStyle: { "margin-bottom": "1%" },
                                      attrs: { cols: "6" }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticStyle: {
                                            padding: "5%",
                                            display: "flex"
                                          },
                                          attrs: { outlined: "" }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "d-flex align-center",
                                              staticStyle: {
                                                "margin-right": "5%"
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v("Caja fuerte")
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("v-switch", {
                                            staticClass: "ml-auto",
                                            attrs: { inset: "" },
                                            model: {
                                              value:
                                                _vm.computedSwSafeDepositBox,
                                              callback: function($$v) {
                                                _vm.computedSwSafeDepositBox = $$v
                                              },
                                              expression:
                                                "computedSwSafeDepositBox"
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
                ],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646& ***!
  \********************************************************************************************************************************************************************************************************************/
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
        "v-banner",
        { attrs: { "single-line": "" } },
        [
          _c(
            "v-row",
            { staticClass: "d-flex align-center justify-end" },
            [
              _c(
                "v-col",
                {
                  staticClass: "d-flex justify-start",
                  attrs: { cols: "12", md: "8", sm: "8", xs: "12" }
                },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text mr-3",
                      attrs: { depressed: "", small: "", color: "info" },
                      on: {
                        click: function($event) {
                          return _vm.saveChanges()
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { left: "", dark: "" } }, [
                        _vm._v("mdi-check-underline-circle")
                      ]),
                      _vm._v("Guardar\n        ")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text mr-3",
                      attrs: { depressed: "", small: "", color: "grey" },
                      on: {
                        click: function($event) {
                          return _vm.saveChanges("saveAndClose")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { left: "", dark: "" } }, [
                        _vm._v("mdi-check-underline-circle")
                      ]),
                      _vm._v("Guardar y\n          cerrar\n        ")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "white--text mr-3",
                      attrs: { depressed: "", small: "", color: "red" },
                      on: {
                        click: function($event) {
                          return _vm.close()
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { left: "", dark: "" } }, [
                        _vm._v("mdi-close-circle")
                      ]),
                      _vm._v("Cerrar\n        ")
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "d-flex justify-end my-n8",
                  attrs: { cols: "12", md: "4", sm: "4", xs: "12" }
                },
                [
                  _c("v-autocomplete", {
                    staticClass: "mt-7",
                    attrs: {
                      items: _vm.listItemHotels,
                      "item-text": "title",
                      "item-value": "id",
                      dense: "",
                      outlined: "",
                      "prepend-inner-icon": "mdi-domain",
                      label: "Hoteles",
                      "background-color": "white"
                    },
                    model: {
                      value: _vm.computedTitleHotel,
                      callback: function($$v) {
                        _vm.computedTitleHotel = $$v
                      },
                      expression: "computedTitleHotel"
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de& ***!
  \*************************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-gavel")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("CONDICIONES")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    staticClass: "ml-3",
                    attrs: { inset: "", label: "Solo adultos" },
                    model: {
                      value: _vm.computedAdults,
                      callback: function($$v) {
                        _vm.computedAdults = $$v
                      },
                      expression: "computedAdults"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _vm.computedAdults == false
                    ? _c("v-text-field", {
                        attrs: {
                          "prepend-inner-icon": "mdi-playlist-edit",
                          label: "Niño desde",
                          outlined: "",
                          required: "",
                          "error-messages":
                            _vm.errorsConditions != null &&
                            typeof _vm.errorsConditions["children_age"] !=
                              "undefined"
                              ? _vm.errorsConditions.children_age[0]
                              : ""
                        },
                        model: {
                          value: _vm.computedChildrenAge,
                          callback: function($$v) {
                            _vm.computedChildrenAge = $$v
                          },
                          expression: "computedChildrenAge"
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-playlist-edit",
                      label: "Regimen adulto desde",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsConditions != null &&
                        typeof _vm.errorsConditions["adults_regimen"] !=
                          "undefined"
                          ? _vm.errorsConditions.adults_regimen[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedAdultsRegimen,
                      callback: function($$v) {
                        _vm.computedAdultsRegimen = $$v
                      },
                      expression: "computedAdultsRegimen"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-playlist-edit",
                      label: "Adulto desde",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsConditions != null &&
                        typeof _vm.errorsConditions["adults_age"] != "undefined"
                          ? _vm.errorsConditions.adults_age[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedAdultsAge,
                      callback: function($$v) {
                        _vm.computedAdultsAge = $$v
                      },
                      expression: "computedAdultsAge"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c(
                    "v-dialog",
                    {
                      ref: "dialogChekin",
                      attrs: {
                        "return-value": _vm.checkinTimeModel,
                        persistent: "",
                        width: "290px"
                      },
                      on: {
                        "update:returnValue": function($event) {
                          _vm.checkinTimeModel = $event
                        },
                        "update:return-value": function($event) {
                          _vm.checkinTimeModel = $event
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            var attrs = ref.attrs
                            return [
                              _c(
                                "v-text-field",
                                _vm._g(
                                  _vm._b(
                                    {
                                      attrs: {
                                        label: "Check-in",
                                        "prepend-inner-icon": "mdi-clock",
                                        outlined: "",
                                        required: "",
                                        "error-messages":
                                          _vm.errorsConditions != null &&
                                          typeof _vm.errorsConditions[
                                            "checkin_time"
                                          ] != "undefined"
                                            ? _vm.errorsConditions
                                                .checkin_time[0]
                                            : ""
                                      },
                                      model: {
                                        value: _vm.checkinTimeModel,
                                        callback: function($$v) {
                                          _vm.checkinTimeModel = $$v
                                        },
                                        expression: "checkinTimeModel"
                                      }
                                    },
                                    "v-text-field",
                                    attrs,
                                    false
                                  ),
                                  on
                                )
                              )
                            ]
                          }
                        }
                      ]),
                      model: {
                        value: _vm.modalCheckin,
                        callback: function($$v) {
                          _vm.modalCheckin = $$v
                        },
                        expression: "modalCheckin"
                      }
                    },
                    [
                      _vm._v(" "),
                      _vm.modalCheckin
                        ? _c(
                            "v-time-picker",
                            {
                              attrs: { format: "24hr", "full-width": "" },
                              model: {
                                value: _vm.checkinTimeModel,
                                callback: function($$v) {
                                  _vm.checkinTimeModel = $$v
                                },
                                expression: "checkinTimeModel"
                              }
                            },
                            [
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { text: "", color: "primary" },
                                  on: {
                                    click: function($event) {
                                      _vm.modalCheckin = false
                                    }
                                  }
                                },
                                [_vm._v("Cancelar")]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { text: "", color: "primary" },
                                  on: {
                                    click: function($event) {
                                      return _vm.$refs.dialogChekin.save(
                                        _vm.checkinTimeSaveState
                                      )
                                    }
                                  }
                                },
                                [_vm._v("Aceptar")]
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c(
                    "v-dialog",
                    {
                      ref: "dialogChekout",
                      attrs: {
                        "return-value": _vm.checkoutTimeModel,
                        persistent: "",
                        width: "290px"
                      },
                      on: {
                        "update:returnValue": function($event) {
                          _vm.checkoutTimeModel = $event
                        },
                        "update:return-value": function($event) {
                          _vm.checkoutTimeModel = $event
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            var attrs = ref.attrs
                            return [
                              _c(
                                "v-text-field",
                                _vm._g(
                                  _vm._b(
                                    {
                                      attrs: {
                                        label: "Check-out",
                                        "prepend-inner-icon": "mdi-clock",
                                        outlined: "",
                                        required: "",
                                        "error-messages":
                                          _vm.errorsConditions != null &&
                                          typeof _vm.errorsConditions[
                                            "checkout_time"
                                          ] != "undefined"
                                            ? _vm.errorsConditions
                                                .checkout_time[0]
                                            : ""
                                      },
                                      model: {
                                        value: _vm.checkoutTimeModel,
                                        callback: function($$v) {
                                          _vm.checkoutTimeModel = $$v
                                        },
                                        expression: "checkoutTimeModel"
                                      }
                                    },
                                    "v-text-field",
                                    attrs,
                                    false
                                  ),
                                  on
                                )
                              )
                            ]
                          }
                        }
                      ]),
                      model: {
                        value: _vm.modalCheckout,
                        callback: function($$v) {
                          _vm.modalCheckout = $$v
                        },
                        expression: "modalCheckout"
                      }
                    },
                    [
                      _vm._v(" "),
                      _vm.modalCheckout
                        ? _c(
                            "v-time-picker",
                            {
                              attrs: { format: "24hr", "full-width": "" },
                              model: {
                                value: _vm.checkoutTimeModel,
                                callback: function($$v) {
                                  _vm.checkoutTimeModel = $$v
                                },
                                expression: "checkoutTimeModel"
                              }
                            },
                            [
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { text: "", color: "primary" },
                                  on: {
                                    click: function($event) {
                                      _vm.modalCheckout = false
                                    }
                                  }
                                },
                                [_vm._v("Cancelar")]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { text: "", color: "primary" },
                                  on: {
                                    click: function($event) {
                                      return _vm.$refs.dialogChekout.save(
                                        _vm.checkoutTimeSaveState
                                      )
                                    }
                                  }
                                },
                                [_vm._v("Aceptar")]
                              )
                            ],
                            1
                          )
                        : _vm._e()
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
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-text")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("TEXTOS DE CONDICIONES")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pa-4" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "12", sm: "12", xs: "12" } },
                [
                  _c("MarkdownCompo", {
                    attrs: { containerType: "Conditions" }
                  })
                ],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-cog")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("PRINCIPAL")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.currencies,
                      "item-text": "currency",
                      "item-value": "currency_id",
                      outlined: "",
                      "prepend-inner-icon": "mdi-currency-usd-circle",
                      label: "Divisa"
                    },
                    model: {
                      value: _vm.computedCurrencyID,
                      callback: function($$v) {
                        _vm.computedCurrencyID = $$v
                      },
                      expression: "computedCurrencyID"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.timezones,
                      outlined: "",
                      "prepend-inner-icon": "mdi-map-clock",
                      label: "Zona horaria"
                    },
                    model: {
                      value: _vm.computedTimezone,
                      callback: function($$v) {
                        _vm.computedTimezone = $$v
                      },
                      expression: "computedTimezone"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6" } },
                [
                  _c(
                    "v-card",
                    { staticClass: "pa-5", attrs: { outlined: "" } },
                    [
                      _c("span", [_c("strong", [_vm._v("Formas de pago")])]),
                      _vm._v(" "),
                      _c("v-checkbox", {
                        attrs: { label: "Online", value: "online" },
                        model: {
                          value: _vm.computedSelectPaymentsPlace,
                          callback: function($$v) {
                            _vm.computedSelectPaymentsPlace = $$v
                          },
                          expression: "computedSelectPaymentsPlace"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-checkbox", {
                        attrs: { label: "Offline", value: "offline" },
                        model: {
                          value: _vm.computedSelectPaymentsPlace,
                          callback: function($$v) {
                            _vm.computedSelectPaymentsPlace = $$v
                          },
                          expression: "computedSelectPaymentsPlace"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6" } },
                [
                  _c(
                    "v-card",
                    {
                      staticClass: "px-auto pb-11 pa-5",
                      attrs: { outlined: "" }
                    },
                    [
                      _c("div", [_c("strong", [_vm._v("Tipo de pago")])]),
                      _vm._v(" "),
                      _c("v-select", {
                        staticClass: "ml-auto mt-5",
                        attrs: {
                          items: _vm.paymentTypeItems,
                          "prepend-inner-icon": "mdi-cash",
                          "menu-props": { bottom: true, offsetY: true },
                          outlined: ""
                        },
                        model: {
                          value: _vm.computedDdwnPaymentType,
                          callback: function($$v) {
                            _vm.computedDdwnPaymentType = $$v
                          },
                          expression: "computedDdwnPaymentType"
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
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-bell")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("NOTIFICACIÓN")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-email",
                      label: "Notificacion voucher reservas",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsConfiguration != null &&
                        typeof _vm.errorsConfiguration[
                          "notification_voucher"
                        ] != "undefined"
                          ? _vm.errorsConfiguration.notification_voucher[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedNotificationVoucher,
                      callback: function($$v) {
                        _vm.computedNotificationVoucher = $$v
                      },
                      expression: "computedNotificationVoucher"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-email",
                      label: "Notificacion detalles de la reserva",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsConfiguration != null &&
                        typeof _vm.errorsConfiguration[
                          "notification_details"
                        ] != "undefined"
                          ? _vm.errorsConfiguration.notification_details[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedNotificationDetails,
                      callback: function($$v) {
                        _vm.computedNotificationDetails = $$v
                      },
                      expression: "computedNotificationDetails"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-email",
                      label: "Notificación datos de tarjeta",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsConfiguration != null &&
                        typeof _vm.errorsConfiguration["notification_card"] !=
                          "undefined"
                          ? _vm.errorsConfiguration.notification_card[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedNotificationCard,
                      callback: function($$v) {
                        _vm.computedNotificationCard = $$v
                      },
                      expression: "computedNotificationCard"
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996& ***!
  \***********************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-email")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("DIRECCIÓN")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-web",
                      label: "URL del sitio web",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["url"] != "undefined"
                          ? _vm.errorsContacts.url[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedUrl,
                      callback: function($$v) {
                        _vm.computedUrl = $$v
                      },
                      expression: "computedUrl"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-email",
                      label: "Email",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["email"] != "undefined"
                          ? _vm.errorsContacts.email[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedEmail,
                      callback: function($$v) {
                        _vm.computedEmail = $$v
                      },
                      expression: "computedEmail"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-phone",
                      label: "Telefono",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["phone"] != "undefined"
                          ? _vm.errorsContacts.phone[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedPhone,
                      callback: function($$v) {
                        _vm.computedPhone = $$v
                      },
                      expression: "computedPhone"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-card-text",
                      label: "Direccion",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["address"] != "undefined"
                          ? _vm.errorsContacts.address[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedAddress,
                      callback: function($$v) {
                        _vm.computedAddress = $$v
                      },
                      expression: "computedAddress"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-map",
                      label: "Codigo postal",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["zipcode"] != "undefined"
                          ? _vm.errorsContacts.zipcode[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedZipCode,
                      callback: function($$v) {
                        _vm.computedZipCode = $$v
                      },
                      expression: "computedZipCode"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-map",
                      label: "Ciudad",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["city"] != "undefined"
                          ? _vm.errorsContacts.city[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedCity,
                      callback: function($$v) {
                        _vm.computedCity = $$v
                      },
                      expression: "computedCity"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-map",
                      label: "Provincia",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["state"] != "undefined"
                          ? _vm.errorsContacts.state[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedState,
                      callback: function($$v) {
                        _vm.computedState = $$v
                      },
                      expression: "computedState"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.countries,
                      "item-text": "name",
                      "item-value": "id",
                      outlined: "",
                      "prepend-inner-icon": "mdi-map",
                      label: "Pais"
                    },
                    model: {
                      value: _vm.computedCountryID,
                      callback: function($$v) {
                        _vm.computedCountryID = $$v
                      },
                      expression: "computedCountryID"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-map-marker")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("LOCALIZACIÓN")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-form-textbox",
                      label: "Representante legal",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["legal_rep"] != "undefined"
                          ? _vm.errorsContacts.legal_rep[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedLegalRep,
                      callback: function($$v) {
                        _vm.computedLegalRep = $$v
                      },
                      expression: "computedLegalRep"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-form-textbox",
                      label: "Nombre de gerente",
                      outlined: "",
                      required: "",
                      "error-messages":
                        _vm.errorsContacts != null &&
                        typeof _vm.errorsContacts["manager_name"] != "undefined"
                          ? _vm.errorsContacts.manager_name[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedManagerName,
                      callback: function($$v) {
                        _vm.computedManagerName = $$v
                      },
                      expression: "computedManagerName"
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa& ***!
  \*********************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c(
      "div",
      { attrs: { id: "app" } },
      [
        _c(
          "v-app",
          { attrs: { id: "inspire" } },
          [
            _c("ButtonActionsSup", { attrs: { title: _vm.hotelTitle } }),
            _vm._v(" "),
            _c(
              "v-container",
              [
                _c(
                  "v-row",
                  { attrs: { "no-gutters": "" } },
                  [
                    _c(
                      "v-col",
                      { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                      [_c("LateralMenu")],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "12", sm: "auto", md: "9" } },
                      [
                        _c(
                          "div",
                          { staticClass: "ml-8" },
                          [
                            _vm.chargeView === false
                              ? _c("v-text-field", {
                                  staticStyle: { "text-align": "right" },
                                  attrs: {
                                    color: "primary",
                                    loading: "",
                                    disabled: "",
                                    label: "Obteniendo información..."
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 0 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("Information")], 1)
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 1 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("Configuration")], 1)
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 2 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("Contact")], 1)
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 3 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("Condition")], 1)
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 4 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("Regime")], 1)
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.iditemsListOptions === 5 && _vm.chargeView === true
                          ? _c("div", [
                              _vm.hotel !== null
                                ? _c("div", [_c("AditionalInfo")], 1)
                                : _vm._e()
                            ])
                          : _vm._e()
                      ]
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
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2& ***!
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-information")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("PRINCIPAL")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8", sm: "8", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-notebook",
                      label: "Titulo",
                      outlined: "",
                      required: ""
                    },
                    model: {
                      value: _vm.computedTitle,
                      callback: function($$v) {
                        _vm.computedTitle = $$v
                      },
                      expression: "computedTitle"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8", sm: "8", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "error-messages":
                        _vm.errorsInformation != null &&
                        typeof _vm.errorsInformation["url"] != "undefined"
                          ? _vm.errorsInformation.url[0]
                          : "",
                      "prepend-inner-icon": "mdi-web",
                      label: "URL",
                      outlined: "",
                      required: ""
                    },
                    model: {
                      value: _vm.computedUrl,
                      callback: function($$v) {
                        _vm.computedUrl = $$v
                      },
                      expression: "computedUrl"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8", sm: "8", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-barcode",
                      label: "Codigo de referencia",
                      outlined: "",
                      required: ""
                    },
                    model: {
                      value: _vm.computedReferenceC,
                      callback: function($$v) {
                        _vm.computedReferenceC = $$v
                      },
                      expression: "computedReferenceC"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "ml-1" },
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "4", sm: "4", xs: "12" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          "error-messages":
                            _vm.errorsInformation != null &&
                            typeof _vm.errorsInformation["num_rooms"] !=
                              "undefined"
                              ? _vm.errorsInformation.num_rooms[0]
                              : "",
                          "prepend-inner-icon": "mdi-home-plus",
                          label: "Número de habitaciones",
                          outlined: "",
                          required: ""
                        },
                        model: {
                          value: _vm.computedNumRooms,
                          callback: function($$v) {
                            _vm.computedNumRooms = $$v
                          },
                          expression: "computedNumRooms"
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
                          "error-messages":
                            _vm.errorsInformation != null &&
                            typeof _vm.errorsInformation["num_floors"] !=
                              "undefined"
                              ? _vm.errorsInformation.num_floors[0]
                              : "",
                          "prepend-inner-icon": "mdi-home-plus",
                          label: "Número de pisos",
                          outlined: "",
                          required: ""
                        },
                        model: {
                          value: _vm.computedNumFloors,
                          callback: function($$v) {
                            _vm.computedNumFloors = $$v
                          },
                          expression: "computedNumFloors"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "8", sm: "8", xs: "12" } },
                [
                  _c("v-select", {
                    staticClass: "ml-auto",
                    attrs: {
                      items: _vm.typeItems,
                      "prepend-inner-icon": "mdi-domain",
                      label: "Tipo",
                      outlined: ""
                    },
                    model: {
                      value: _vm.computedDdwnType,
                      callback: function($$v) {
                        _vm.computedDdwnType = $$v
                      },
                      expression: "computedDdwnType"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-image-area")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("IMÁGENES")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pa-10" },
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-card",
                    {
                      staticClass: "mx-3",
                      attrs: {
                        "max-width": "400",
                        outlined: "",
                        color: "white"
                      }
                    },
                    [
                      _vm.currentImage === null
                        ? _c(
                            "v-icon",
                            {
                              staticStyle: {
                                height: "210px",
                                width: "300px",
                                border: "1px solid grey"
                              },
                              attrs: { size: "70" }
                            },
                            [_vm._v("mdi-image")]
                          )
                        : _c("v-img", {
                            staticClass: "grey darken-4",
                            attrs: {
                              src: _vm.srcImage(),
                              height: "210",
                              width: "300",
                              contain: ""
                            }
                          }),
                      _vm._v(" "),
                      _c("input", {
                        ref: "btnUploadImage",
                        staticStyle: { display: "none" },
                        attrs: { type: "file" },
                        on: {
                          change: function($event) {
                            return _vm.selectImage($event)
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text mt-1",
                          attrs: {
                            block: "",
                            small: "",
                            color: "grey",
                            depressed: ""
                          },
                          on: {
                            click: function($event) {
                              return _vm.$refs.btnUploadImage.click()
                            }
                          }
                        },
                        [_vm._v("Seleccionar imagen")]
                      )
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
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-text")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("TEXTOS")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pa-4" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12" } },
                [
                  _c("v-textarea", {
                    attrs: {
                      outlined: "",
                      "no-resize": "",
                      rows: "4",
                      "row-height": "30",
                      counter: 240
                    },
                    model: {
                      value: _vm.computedShortT,
                      callback: function($$v) {
                        _vm.computedShortT = $$v
                      },
                      expression: "computedShortT"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12" } },
                [
                  _c("MarkdownCompo", {
                    attrs: { containerType: "Information" }
                  })
                ],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8& ***!
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c(
            "v-list",
            { attrs: { dense: "" } },
            [
              _c(
                "v-list-item-group",
                {
                  attrs: {
                    value: _vm.iditemsListOptions,
                    mandatory: "",
                    color: "primary"
                  },
                  on: {
                    "update:value": function($event) {
                      _vm.iditemsListOptions = $event
                    }
                  }
                },
                _vm._l(_vm.itemsListOptions, function(item, i) {
                  return _c(
                    "v-list-item",
                    {
                      key: i,
                      on: {
                        click: function($event) {
                          return _vm.countIditemsListOptions(i)
                        }
                      }
                    },
                    [
                      _c(
                        "v-list-item-icon",
                        [
                          _c("v-icon", {
                            domProps: { textContent: _vm._s(item.icon) }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", {
                            domProps: { textContent: _vm._s(item.text) }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                }),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2& ***!
  \**********************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "pa-2", attrs: { outlined: "", tile: "" } },
        [
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-silverware-fork-knife")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("REGIMENES")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    attrs: { inset: "", label: "Solo habitacion" },
                    model: {
                      value: _vm.computedSwOnlyRoom,
                      callback: function($$v) {
                        _vm.computedSwOnlyRoom = $$v
                      },
                      expression: "computedSwOnlyRoom"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.prioritiesModel,
                      "prepend-inner-icon": "mdi-pen",
                      label: "Prioridad",
                      "menu-props": { bottom: true, offsetY: true },
                      outlined: ""
                    },
                    model: {
                      value: _vm.computedDdwnPriority,
                      callback: function($$v) {
                        _vm.computedDdwnPriority = $$v
                      },
                      expression: "computedDdwnPriority"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    attrs: { inset: "", label: "Alojamiento y desayuno" },
                    model: {
                      value: _vm.computedSwBreakfast,
                      callback: function($$v) {
                        _vm.computedSwBreakfast = $$v
                      },
                      expression: "computedSwBreakfast"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male",
                      label: "Adulto",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwBreakfast == 0 ||
                        _vm.computedSwBreakfast == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["lodging_breakfast_adult"] !=
                          "undefined"
                          ? _vm.errorsRegimes.lodging_breakfast_adult[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtBreakfastAdult,
                      callback: function($$v) {
                        _vm.computedTxtBreakfastAdult = $$v
                      },
                      expression: "computedTxtBreakfastAdult"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male-boy",
                      label: "Niño",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwBreakfast == 0 ||
                        _vm.computedSwBreakfast == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes[
                          "lodging_breakfast_children"
                        ] != "undefined"
                          ? _vm.errorsRegimes.lodging_breakfast_children[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtBreakfastChildren,
                      callback: function($$v) {
                        _vm.computedTxtBreakfastChildren = $$v
                      },
                      expression: "computedTxtBreakfastChildren"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    attrs: { inset: "", label: "Media pension" },
                    model: {
                      value: _vm.computedSwHalfPension,
                      callback: function($$v) {
                        _vm.computedSwHalfPension = $$v
                      },
                      expression: "computedSwHalfPension"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male",
                      label: "Adulto",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwHalfPension == 0 ||
                        _vm.computedSwHalfPension == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["half_pension_adult"] !=
                          "undefined"
                          ? _vm.errorsRegimes.half_pension_adult[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtHalfPensionAdult,
                      callback: function($$v) {
                        _vm.computedTxtHalfPensionAdult = $$v
                      },
                      expression: "computedTxtHalfPensionAdult"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male-boy",
                      label: "Niño",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwHalfPension == 0 ||
                        _vm.computedSwHalfPension == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["half_pension_children"] !=
                          "undefined"
                          ? _vm.errorsRegimes.half_pension_children[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtHalfPensionChildren,
                      callback: function($$v) {
                        _vm.computedTxtHalfPensionChildren = $$v
                      },
                      expression: "computedTxtHalfPensionChildren"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    attrs: { inset: "", label: "Pension completa" },
                    model: {
                      value: _vm.computedSwFullPension,
                      callback: function($$v) {
                        _vm.computedSwFullPension = $$v
                      },
                      expression: "computedSwFullPension"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male",
                      label: "Adulto",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwFullPension == 0 ||
                        _vm.computedSwFullPension == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["full_pension_adult"] !=
                          "undefined"
                          ? _vm.errorsRegimes.full_pension_adult[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtFullPensionAdult,
                      callback: function($$v) {
                        _vm.computedTxtFullPensionAdult = $$v
                      },
                      expression: "computedTxtFullPensionAdult"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male-boy",
                      label: "Niño",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwFullPension == 0 ||
                        _vm.computedSwFullPension == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["full_pension_children"] !=
                          "undefined"
                          ? _vm.errorsRegimes.full_pension_children[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtFullPensionChildren,
                      callback: function($$v) {
                        _vm.computedTxtFullPensionChildren = $$v
                      },
                      expression: "computedTxtFullPensionChildren"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "6", sm: "12", xs: "12" } },
                [
                  _c("v-switch", {
                    attrs: { inset: "", label: "Todo incluido" },
                    model: {
                      value: _vm.computedSwAllIncluded,
                      callback: function($$v) {
                        _vm.computedSwAllIncluded = $$v
                      },
                      expression: "computedSwAllIncluded"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male",
                      label: "Adulto",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwAllIncluded == 0 ||
                        _vm.computedSwAllIncluded == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["all_included_adult"] !=
                          "undefined"
                          ? _vm.errorsRegimes.all_included_adult[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtAllIncludedAdult,
                      callback: function($$v) {
                        _vm.computedTxtAllIncludedAdult = $$v
                      },
                      expression: "computedTxtAllIncludedAdult"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "3", sm: "12", xs: "12" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-inner-icon": "mdi-human-male-boy",
                      label: "Niño",
                      outlined: "",
                      required: "",
                      disabled:
                        _vm.computedSwAllIncluded == 0 ||
                        _vm.computedSwAllIncluded == false,
                      "error-messages":
                        _vm.errorsRegimes != null &&
                        typeof _vm.errorsRegimes["all_included_children"] !=
                          "undefined"
                          ? _vm.errorsRegimes.all_included_children[0]
                          : ""
                    },
                    model: {
                      value: _vm.computedTxtAllIncludedChildren,
                      callback: function($$v) {
                        _vm.computedTxtAllIncludedChildren = $$v
                      },
                      expression: "computedTxtAllIncludedChildren"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-banner", { attrs: { "single-line": "" } }, [
            _c(
              "div",
              { staticClass: "d-flex align-center ml-1" },
              [
                _c("v-icon", { staticClass: "mb-1", attrs: { left: "" } }, [
                  _vm._v("mdi-calendar-month")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "mt-n1" }, [
                  _c("span", { staticClass: "text-h6 font-weight-bold" }, [
                    _vm._v("PERIODOS ESPECIALES DE REGIMENES")
                  ])
                ])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("v-row", { staticClass: "pa-6 mx-1" }, [
            _c("span", [
              _vm._v(
                "\n        Puedes añadir periodos de regimenes especiales.\n        Si un regimen no esta disponible para todas las fechas de la reserva, no\n        se aplicará\n      "
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.computedArrayComponents, function(component) {
            return _c(component.TagSRegimes, {
              key: component.idCompo,
              tag: "component",
              attrs: {
                idCompo: component.idCompo,
                objArrCompo: component.objArrCompo
              },
              on: { removeCompo: _vm.removeCompo }
            })
          }),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pa-6" },
            [
              _c(
                "v-btn",
                {
                  staticClass: "white--text",
                  attrs: { small: "", color: "info", depressed: "" },
                  on: {
                    click: function($event) {
                      return _vm.addCompoButton()
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { left: "", dark: "" } }, [
                    _vm._v("mdi-plus-circle")
                  ]),
                  _vm._v("Agregar\n      ")
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

/***/ "./resources/js/components/DateTimePicker/DateTimePicker.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/DateTimePicker/DateTimePicker.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateTimePicker.vue?vue&type=template&id=550a25d8& */ "./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8&");
/* harmony import */ var _DateTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateTimePicker.vue?vue&type=script&lang=js& */ "./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DateTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DateTimePicker/DateTimePicker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DateTimePicker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DateTimePicker.vue?vue&type=template&id=550a25d8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DateTimePicker/DateTimePicker.vue?vue&type=template&id=550a25d8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DateTimePicker_vue_vue_type_template_id_550a25d8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselPool.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselPool.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CarrouselPool.vue?vue&type=template&id=5049ca88& */ "./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88&");
/* harmony import */ var _CarrouselPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CarrouselPool.vue?vue&type=script&lang=js& */ "./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CarrouselPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Hotel/CarrouselPool.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CarrouselPool.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CarrouselPool.vue?vue&type=template&id=5049ca88& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselPool.vue?vue&type=template&id=5049ca88&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselPool_vue_vue_type_template_id_5049ca88___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselRestaurant.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselRestaurant.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CarrouselRestaurant.vue?vue&type=template&id=eee8a146& */ "./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146&");
/* harmony import */ var _CarrouselRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CarrouselRestaurant.vue?vue&type=script&lang=js& */ "./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CarrouselRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Hotel/CarrouselRestaurant.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CarrouselRestaurant.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CarrouselRestaurant.vue?vue&type=template&id=eee8a146& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/CarrouselRestaurant.vue?vue&type=template&id=eee8a146&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CarrouselRestaurant_vue_vue_type_template_id_eee8a146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Hotel/DynamicPool.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicPool.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true& */ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true&");
/* harmony import */ var _DynamicPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DynamicPool.vue?vue&type=script&lang=js& */ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& */ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DynamicPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "81254bb6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Hotel/DynamicPool.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicPool.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=style&index=0&id=81254bb6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_style_index_0_id_81254bb6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicPool.vue?vue&type=template&id=81254bb6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicPool_vue_vue_type_template_id_81254bb6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Hotel/DynamicRestaurant.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicRestaurant.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true& */ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true&");
/* harmony import */ var _DynamicRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DynamicRestaurant.vue?vue&type=script&lang=js& */ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& */ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DynamicRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "55a0fc06",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Hotel/DynamicRestaurant.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicRestaurant.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=style&index=0&id=55a0fc06&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_style_index_0_id_55a0fc06_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/DynamicRestaurant.vue?vue&type=template&id=55a0fc06&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DynamicRestaurant_vue_vue_type_template_id_55a0fc06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Hotel/SpecialRegime.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/Hotel/SpecialRegime.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpecialRegime.vue?vue&type=template&id=2136a020& */ "./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020&");
/* harmony import */ var _SpecialRegime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpecialRegime.vue?vue&type=script&lang=js& */ "./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SpecialRegime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Hotel/SpecialRegime.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SpecialRegime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SpecialRegime.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SpecialRegime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SpecialRegime.vue?vue&type=template&id=2136a020& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Hotel/SpecialRegime.vue?vue&type=template&id=2136a020&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpecialRegime_vue_vue_type_template_id_2136a020___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Markdown/MarkdownCompo.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Markdown/MarkdownCompo.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkdownCompo.vue?vue&type=template&id=728cfdfc& */ "./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc&");
/* harmony import */ var _MarkdownCompo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarkdownCompo.vue?vue&type=script&lang=js& */ "./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MarkdownCompo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Markdown/MarkdownCompo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownCompo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownCompo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownCompo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownCompo.vue?vue&type=template&id=728cfdfc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Markdown/MarkdownCompo.vue?vue&type=template&id=728cfdfc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownCompo_vue_vue_type_template_id_728cfdfc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/SelectTimePicker/SelectTimePicker.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectTimePicker.vue?vue&type=template&id=cd049a58& */ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58&");
/* harmony import */ var _SelectTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectTimePicker.vue?vue&type=script&lang=js& */ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SelectTimePicker/SelectTimePicker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectTimePicker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectTimePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectTimePicker.vue?vue&type=template&id=cd049a58& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SelectTimePicker/SelectTimePicker.vue?vue&type=template&id=cd049a58&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectTimePicker_vue_vue_type_template_id_cd049a58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/AditionalInfo.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Hotel/AditionalInfo.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true& */ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true&");
/* harmony import */ var _AditionalInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AditionalInfo.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& */ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AditionalInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ae75229",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/AditionalInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AditionalInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=style&index=0&id=1ae75229&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_style_index_0_id_1ae75229_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/AditionalInfo.vue?vue&type=template&id=1ae75229&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AditionalInfo_vue_vue_type_template_id_1ae75229_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/ButtonActionsSup.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Hotel/ButtonActionsSup.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonActionsSup.vue?vue&type=template&id=c9a8a646& */ "./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646&");
/* harmony import */ var _ButtonActionsSup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ButtonActionsSup.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ButtonActionsSup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/ButtonActionsSup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonActionsSup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonActionsSup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonActionsSup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646&":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonActionsSup.vue?vue&type=template&id=c9a8a646& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/ButtonActionsSup.vue?vue&type=template&id=c9a8a646&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonActionsSup_vue_vue_type_template_id_c9a8a646___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Condition.vue":
/*!************************************************!*\
  !*** ./resources/js/views/Hotel/Condition.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Condition.vue?vue&type=template&id=7d6784de& */ "./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de&");
/* harmony import */ var _Condition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Condition.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Condition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Condition.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Condition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Condition.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Condition.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Condition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Condition.vue?vue&type=template&id=7d6784de& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Condition.vue?vue&type=template&id=7d6784de&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Condition_vue_vue_type_template_id_7d6784de___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Configuration.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Hotel/Configuration.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Configuration.vue?vue&type=template&id=0627fe28& */ "./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28&");
/* harmony import */ var _Configuration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Configuration.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Configuration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Configuration.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Configuration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Configuration.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Configuration.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Configuration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Configuration.vue?vue&type=template&id=0627fe28& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Configuration.vue?vue&type=template&id=0627fe28&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Configuration_vue_vue_type_template_id_0627fe28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Contact.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Hotel/Contact.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Contact.vue?vue&type=template&id=3b3a2996& */ "./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996&");
/* harmony import */ var _Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contact.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Contact.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Contact.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Contact.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Contact.vue?vue&type=template&id=3b3a2996& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Contact.vue?vue&type=template&id=3b3a2996&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Contact_vue_vue_type_template_id_3b3a2996___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Hotel.vue":
/*!********************************************!*\
  !*** ./resources/js/views/Hotel/Hotel.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hotel.vue?vue&type=template&id=3c96fcaa& */ "./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa&");
/* harmony import */ var _Hotel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hotel.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Hotel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Hotel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Hotel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Hotel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Hotel.vue?vue&type=template&id=3c96fcaa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Hotel.vue?vue&type=template&id=3c96fcaa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotel_vue_vue_type_template_id_3c96fcaa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Information.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Hotel/Information.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Information.vue?vue&type=template&id=122975a2& */ "./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2&");
/* harmony import */ var _Information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Information.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Information.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Information.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Information.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Information_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Information.vue?vue&type=template&id=122975a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Information.vue?vue&type=template&id=122975a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Information_vue_vue_type_template_id_122975a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/LateralMenu.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Hotel/LateralMenu.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LateralMenu.vue?vue&type=template&id=ae0e45a8& */ "./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8&");
/* harmony import */ var _LateralMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LateralMenu.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LateralMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/LateralMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LateralMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./LateralMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/LateralMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LateralMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./LateralMenu.vue?vue&type=template&id=ae0e45a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/LateralMenu.vue?vue&type=template&id=ae0e45a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LateralMenu_vue_vue_type_template_id_ae0e45a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Hotel/Regime.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/Hotel/Regime.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Regime.vue?vue&type=template&id=af80f7b2& */ "./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2&");
/* harmony import */ var _Regime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Regime.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Regime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotel/Regime.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Regime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Regime.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Regime.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Regime_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Regime.vue?vue&type=template&id=af80f7b2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotel/Regime.vue?vue&type=template&id=af80f7b2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Regime_vue_vue_type_template_id_af80f7b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);