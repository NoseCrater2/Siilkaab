(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
var _methods;

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


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      deleteDialog: false,
      selected: [],
      search: "",
      singleSelect: false,
      loading: false,
      columns: 3,
      headers: [{
        text: "Título",
        align: "start",
        sortable: true,
        value: "title"
      }, {
        text: "Código de referencia",
        align: "center",
        value: "reference_code"
      }, {
        text: "Habitaciones",
        value: "rooms"
      }, {
        text: "Tarifas",
        value: "rates"
      }, {
        text: "Descuentos",
        value: "discounts"
      }, {
        text: "Extras",
        value: "extras"
      }, {
        text: "ID",
        value: "id"
      }, {
        text: "Acciones",
        value: "actions",
        sortable: false
      }],
      hotelIds: {
        hotelIds: []
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    hotels: function hotels(state) {
      return state.HotelModule.allhotels;
    }
  })), {}, {
    windowSize: function windowSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 'd-flex align-center justify-start mr-n4';

        case "sm":
          return 'd-flex align-center justify-start ml-n8';

        case "md":
          return 'd-flex align-center justify-start ml-n8';

        case "lg":
          return 'd-flex align-center justify-start ml-n8';

        case "xl":
          return 'd-flex align-center justify-start ml-n8';
      }
    }
  }),
  mounted: function mounted() {
    this.$store.dispatch("getHotels");
  },
  methods: (_methods = {
    editItem: function editItem(item) {},
    deleteItem: function deleteItem(item) {},
    showDeleteDialog: function showDeleteDialog() {
      this.deleteDialog = true;
    },
    newHotel: function newHotel() {
      _routes__WEBPACK_IMPORTED_MODULE_1__["default"].push({
        name: 'Hotel',
        params: {
          id: 'new'
        }
      });
    }
  }, _defineProperty(_methods, "deleteItem", function deleteItem() {
    var _this = this;

    this.selected.forEach(function (element) {
      _this.hotelIds.hotelIds.push(element.id);
    });
    this.$store.dispatch("deleteHotels", this.hotelIds).then(function () {
      _this.close();
    });
  }), _defineProperty(_methods, "close", function close() {
    this.hotelIds.hotelIds = [];
    this.selected = [];
    this.deleteDialog = false; //this.$store.commit('setErrors',this.defaultErrors)
  }), _defineProperty(_methods, "changeStatus", function changeStatus(item, event) {
    if (event) {
      item.enabled = 1;
    } else {
      item.enabled = 0;
    }

    this.$store.dispatch("editHotel", item);
  }), _methods)
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0& ***!
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
  return _c("div", [
    _vm.hotels === []
      ? _c(
          "div",
          [
            _c(
              "v-app",
              { attrs: { id: "inspire" } },
              [
                _c("v-data-table", {
                  staticClass: "elevation-1",
                  attrs: {
                    "item-key": "title",
                    loading: "",
                    "loading-text": "Obteniendo datos..."
                  }
                })
              ],
              1
            )
          ],
          1
        )
      : _c(
          "div",
          [
            _c(
              "v-app",
              { attrs: { id: "inspire" } },
              [
                _c(
                  "v-bottom-navigation",
                  { attrs: { grow: "" } },
                  [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.selected == ![] ? false : true,
                            expression: "selected==! []?false:true"
                          }
                        ]
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "d-flex align-center mt-1" },
                          [
                            _c(
                              "v-btn",
                              {
                                on: {
                                  click: function($event) {
                                    return _vm.showDeleteDialog()
                                  }
                                }
                              },
                              [
                                _c("span", { staticClass: "black--text" }, [
                                  _vm._v("ELIMINAR SELECCIÓN")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-icon",
                                  { attrs: { size: "32", color: "error" } },
                                  [_vm._v("mdi-delete-sweep")]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("v-divider", {
                              attrs: { inset: "", vertical: "" }
                            })
                          ],
                          1
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex align-center" }, [
                      _c("span", { staticClass: "text-h4 font-weight-bold" }, [
                        _vm._v("HOTELES")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("v-divider", { attrs: { inset: "", vertical: "" } }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "d-flex align-center mt-n1" },
                      [
                        _c(
                          "v-btn",
                          {
                            on: {
                              click: function($event) {
                                return _vm.newHotel()
                              }
                            }
                          },
                          [
                            _c("span", { staticClass: "black--text" }, [
                              _vm._v("NUEVO HOTEL")
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-icon",
                              { attrs: { size: "32", color: "primary" } },
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
                ),
                _vm._v(" "),
                _c(
                  "v-card",
                  [
                    _c("v-data-table", {
                      staticClass: "elevation-1",
                      attrs: {
                        "item-key": "id",
                        "show-select": "",
                        headers: _vm.headers,
                        items: _vm.hotels,
                        "items-per-page": 20,
                        "single-select": _vm.singleSelect,
                        "multi-sort": "",
                        search: _vm.search
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "top",
                          fn: function() {
                            return [
                              _c(
                                "v-toolbar",
                                { attrs: { flat: "", color: "white" } },
                                [
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      "append-icon": "mdi-magnify",
                                      label: "Buscar hotel",
                                      "single-line": "",
                                      "hide-details": "",
                                      outlined: "",
                                      dense: ""
                                    },
                                    model: {
                                      value: _vm.search,
                                      callback: function($$v) {
                                        _vm.search = $$v
                                      },
                                      expression: "search"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c(
                                    "v-dialog",
                                    {
                                      attrs: {
                                        persistent: "",
                                        "max-width": "290"
                                      },
                                      model: {
                                        value: _vm.deleteDialog,
                                        callback: function($$v) {
                                          _vm.deleteDialog = $$v
                                        },
                                        expression: "deleteDialog"
                                      }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        [
                                          _c(
                                            "v-card-title",
                                            { staticClass: "headline" },
                                            [_vm._v("¿Eliminar hoteles?")]
                                          ),
                                          _vm._v(" "),
                                          _c("v-card-text", [
                                            _vm._v(
                                              "\n                    Está a punto de eliminar uno o más registros de hotel.\n                    Esta acción no se puede deshacer. ¿Continuar?\n                  "
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "v-card-actions",
                                            [
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "gray darken-1",
                                                    text: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      _vm.deleteDialog = false
                                                    }
                                                  }
                                                },
                                                [_vm._v("CANCELAR")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "red darken-1",
                                                    text: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.deleteItem()
                                                    }
                                                  }
                                                },
                                                [_vm._v("ELIMINAR")]
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
                              _c(
                                "div",
                                {
                                  staticClass: "d-flex align-center ml-2 my-n4"
                                },
                                [
                                  _c("v-switch", {
                                    staticClass: "pa-3",
                                    attrs: {
                                      label: "Selección única",
                                      inset: ""
                                    },
                                    model: {
                                      value: _vm.singleSelect,
                                      callback: function($$v) {
                                        _vm.singleSelect = $$v
                                      },
                                      expression: "singleSelect"
                                    }
                                  })
                                ],
                                1
                              )
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "item.rooms",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-center justify-start ml-5"
                                },
                                [
                                  _c(
                                    "v-badge",
                                    {
                                      attrs: {
                                        content: item.rooms,
                                        value: item.rooms,
                                        color: "red",
                                        overlap: ""
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("mdi-bed")])],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        },
                        {
                          key: "item.rates",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-center justify-start ml-1"
                                },
                                [
                                  _c(
                                    "v-badge",
                                    {
                                      attrs: {
                                        content: item.rates,
                                        value: item.rates,
                                        color: "red",
                                        overlap: ""
                                      }
                                    },
                                    [
                                      _c("v-icon", [
                                        _vm._v("mdi-cash-multiple")
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        },
                        {
                          key: "item.discounts",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-center justify-start ml-5"
                                },
                                [
                                  _c(
                                    "v-badge",
                                    {
                                      attrs: {
                                        content: item.discounts,
                                        value: item.discounts,
                                        color: "red",
                                        overlap: ""
                                      }
                                    },
                                    [
                                      _c("v-icon", [
                                        _vm._v("mdi-label-percent")
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        },
                        {
                          key: "item.extras",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-center justify-start ml-1"
                                },
                                [
                                  _c(
                                    "v-badge",
                                    {
                                      attrs: {
                                        content: item.extras,
                                        value: item.extras,
                                        color: "red",
                                        overlap: ""
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("mdi-tag-plus")])],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        },
                        {
                          key: "item.actions",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "div",
                                { class: _vm.windowSize },
                                [
                                  _c(
                                    "router-link",
                                    {
                                      staticClass: "text-decoration-none mx-4",
                                      attrs: {
                                        to: {
                                          name: "Hotel",
                                          params: { id: item.id }
                                        }
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("mdi-pencil")])],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-switch", {
                                    attrs: {
                                      "input-value": item.enabled,
                                      value: "",
                                      dense: "",
                                      inset: ""
                                    },
                                    on: {
                                      change: function($event) {
                                        return _vm.changeStatus(item, $event)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ]),
                      model: {
                        value: _vm.selected,
                        callback: function($$v) {
                          _vm.selected = $$v
                        },
                        expression: "selected"
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
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Hotels/Hotels.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Hotels/Hotels.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hotels.vue?vue&type=template&id=36f273c0& */ "./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0&");
/* harmony import */ var _Hotels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hotels.vue?vue&type=script&lang=js& */ "./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Hotels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Hotels/Hotels.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Hotels.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotels/Hotels.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Hotels.vue?vue&type=template&id=36f273c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Hotels/Hotels.vue?vue&type=template&id=36f273c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Hotels_vue_vue_type_template_id_36f273c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);