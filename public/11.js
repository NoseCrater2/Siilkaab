(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "RoomsHome",
  created: function created() {
    var _this = this;

    window.addEventListener("resize", this.handleResize);
    this.handleResize(); //AQUI TENGO QUE DEFINIR A QUE HOTEL ESTOY ACCEDIENDO

    this.getCurrentHotelRooms(1).then(function () {
      _this.currentRooms = _this.currentHotelRooms;
      _this.roomImageRoute = _this.currentRooms.map(function (itemCurrentRoom) {
        if (!itemCurrentRoom.default_image.includes("http")) {
          itemCurrentRoom.default_image = "/storage/img/" + itemCurrentRoom.default_image;
        }

        return itemCurrentRoom.default_image;
      });
    });
  },
  destroyed: function destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data: function data() {
    return {
      //12, xs
      //6, sm
      //4, md, lg
      //3, xl
      flexModel: null,
      currentRooms: null,
      roomImageRoute: null,
      mxAutomyAuto: null,
      heightCard: "380"
    };
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["getCurrentHotelRooms"])), {}, {
    handleResize: function handleResize() {
      if (window.innerWidth >= 600 && window.innerWidth <= 676) {
        this.heightCard = "456";
      } else if (window.innerWidth > 676 && window.innerWidth <= 827) {
        this.heightCard = "438";
      } else {
        this.heightCard = "380";
      }

      return this.heightCard;
    }
  }),
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    currentHotelRooms: function currentHotelRooms(state) {
      return state.RoomModule.currentHotelRooms;
    }
  })), {}, {
    //Propiedad computada que controla la responsividad de las cards de habitaciones
    flexRoomsCardsSize: function flexRoomsCardsSize() {
      //1430 - 1903
      //600 - 827
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.flexModel = 12;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;

        case "sm":
          this.flexModel = 6;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;

        case "md":
          this.flexModel = 4;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;

        case "lg":
          this.flexModel = 4;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;

        case "xl":
          this.flexModel = 3;
          this.mxAutomyAuto = "mx-auto my-4";
          return this.flexModel;
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1& ***!
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
      _c("v-app", { attrs: { id: "inspire" } }, [
        !_vm.currentRooms
          ? _c("div", [_vm._v("NO HAY HABITACIONES")])
          : _c(
              "div",
              [
                _c(
                  "v-container",
                  { staticClass: "elevation-1 outlined", attrs: { fluid: "" } },
                  [
                    _c("div", { staticClass: "text-center" }, [
                      _c(
                        "span",
                        {
                          staticClass: "text-h4 text-uppercase font-weight-bold"
                        },
                        [_vm._v("Detalles de habitación")]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-row",
                      { attrs: { dense: "" } },
                      [
                        _vm._l(_vm.currentRooms, function(room, index) {
                          return _c(
                            "v-col",
                            {
                              key: room.id,
                              attrs: { cols: _vm.flexRoomsCardsSize }
                            },
                            [
                              _c(
                                "v-card",
                                {
                                  class: _vm.mxAutomyAuto,
                                  attrs: {
                                    width: "370",
                                    outlined: "",
                                    hover: true
                                  }
                                },
                                [
                                  _c(
                                    "v-img",
                                    {
                                      staticClass: "white--text align-end",
                                      attrs: {
                                        height: "250",
                                        src: _vm.roomImageRoute[index]
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticStyle: {
                                            "background-color":
                                              "rgba(0, 0, 0, 0.6)"
                                          }
                                        },
                                        [
                                          _c(
                                            "v-card-title",
                                            { staticClass: "mb-n3" },
                                            [_vm._v(_vm._s(room.name))]
                                          ),
                                          _vm._v(" "),
                                          _c("span", { staticClass: "ml-4" }, [
                                            _vm._v(
                                              "(" + _vm._s(room.type) + ")"
                                            )
                                          ])
                                        ],
                                        1
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("v-card-text", [
                                    _c(
                                      "div",
                                      { staticClass: "ml-3" },
                                      [
                                        _c("v-row", [
                                          _c(
                                            "div",
                                            { staticClass: "grey--text mr-1" },
                                            [_vm._v("Ocupancia:")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "font-weight-bold black--text"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(room.max_adults) +
                                                  " adultos +\n                      " +
                                                  _vm._s(room.max_children) +
                                                  " niños (max.\n                      " +
                                                  _vm._s(room.max_occpancy) +
                                                  " inquilinos)"
                                              )
                                            ]
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("v-row", [
                                          _c(
                                            "div",
                                            { staticClass: "grey--text mr-1" },
                                            [
                                              _vm._v(
                                                "\n                      Habitaciones de este tipo:\n                    "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "font-weight-bold black--text"
                                            },
                                            [_vm._v(_vm._s(room.quantity))]
                                          )
                                        ])
                                      ],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("v-card-actions", [
                                    _c(
                                      "div",
                                      [
                                        _c(
                                          "v-btn",
                                          { attrs: { text: "" } },
                                          [
                                            _c(
                                              "router-link",
                                              {
                                                staticStyle: {
                                                  "text-decoration": "none",
                                                  color: "black"
                                                },
                                                attrs: {
                                                  to: {
                                                    name: "RoomDetails",
                                                    params: { id: room.id }
                                                  }
                                                }
                                              },
                                              [_vm._v("Editar")]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          { attrs: { color: "red", text: "" } },
                                          [_vm._v("Eliminar")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: { color: "blue", text: "" }
                                          },
                                          [_vm._v("Subir fotos")]
                                        )
                                      ],
                                      1
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { attrs: { cols: _vm.flexRoomsCardsSize } },
                          [
                            _c(
                              "router-link",
                              {
                                staticStyle: {
                                  "text-decoration": "none",
                                  color: "black"
                                },
                                attrs: { to: "/roomDetails" }
                              },
                              [
                                _c(
                                  "v-card",
                                  {
                                    class: _vm.mxAutomyAuto,
                                    attrs: {
                                      width: "370",
                                      height: _vm.heightCard,
                                      outlined: "",
                                      hover: true
                                    },
                                    on: {
                                      "update:height": function($event) {
                                        _vm.heightCard = $event
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "v-sheet",
                                      {
                                        staticClass:
                                          "d-flex flex-column mb-6 justify-center align-center",
                                        attrs: {
                                          color: "rgb(53,94,150)",
                                          height: _vm.heightCard
                                        },
                                        on: {
                                          "update:height": function($event) {
                                            _vm.heightCard = $event
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticClass: "text-h5 white--text"
                                          },
                                          [_vm._v("Crear nueva habitación")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-icon",
                                          {
                                            attrs: { "x-large": "", dark: "" }
                                          },
                                          [_vm._v("mdi-plus")]
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
                      2
                    )
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

/***/ "./resources/js/views/Rooms/RoomsHome.vue":
/*!************************************************!*\
  !*** ./resources/js/views/Rooms/RoomsHome.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoomsHome.vue?vue&type=template&id=06ce1cb1& */ "./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1&");
/* harmony import */ var _RoomsHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomsHome.vue?vue&type=script&lang=js& */ "./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RoomsHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Rooms/RoomsHome.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomsHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoomsHome.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomsHome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomsHome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoomsHome.vue?vue&type=template&id=06ce1cb1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Rooms/RoomsHome.vue?vue&type=template&id=06ce1cb1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoomsHome_vue_vue_type_template_id_06ce1cb1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);