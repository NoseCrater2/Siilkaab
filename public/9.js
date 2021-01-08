(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/users/Users.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/users/Users.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      editedIndex: -1,
      dialog: false,
      deleteDialog: false,
      valid: false,
      search: '',
      singleSelect: false,
      selected: [],
      loading: false,
      loader: null,
      isEditing: false,
      selectedHotels: null,
      showDeleteButton: false,
      userIds: {
        userIds: []
      },
      actualHotels: [{
        id: null
      }, {
        hotels: null
      }],
      editedItem: {
        name: null,
        last_name: null,
        email: null,
        type: null,
        language: null,
        timezone: null,
        currency: null,
        currency_id: ''
      },
      defaultItem: {
        name: '',
        last_name: '',
        email: '',
        type: '',
        language: '',
        timezone: '',
        currency: '',
        currency_id: ''
      },
      defaultErrors: {
        data: [{
          currency_id: [],
          email: [],
          language: [],
          name: [],
          timezone: [],
          type: []
        }]
      },
      headers: [{
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'all_name'
      }, {
        text: 'Email',
        value: 'email'
      }, {
        text: 'Tipo',
        value: 'type'
      }, {
        text: 'ID',
        value: 'id'
      }, {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }]
    };
  },
  computed: _objectSpread(_objectSpread({
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario';
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    users: function users(state) {
      return state.UsersModule.users;
    },
    hotels: function hotels(state) {
      return state.HotelModule.hotels;
    },
    assignHotels: function assignHotels(state) {
      return state.HotelModule.assignHotels;
    },
    timezones: function timezones(state) {
      return state.UsersModule.timezones;
    }
  })), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(['getErrors', 'getStatus', 'getAssignHotels', 'getUserId'])),
  mounted: function mounted() {
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getTimeZones');
    this.$store.dispatch('getCurrencies');
    this.$store.dispatch('getHotelsForAdmin');
  },
  methods: {
    editItem: function editItem(item) {
      var _this = this;

      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.dispatch('getAssignHotels', item.id).then(function () {
        _this.dialog = true;
        _this.selectedHotels = _this.$store.getters.getAssignHotels;
      });
    },
    showDeleteDialog: function showDeleteDialog() {
      this.deleteDialog = true;
    },
    deleteItem: function deleteItem() {
      var _this2 = this;

      this.selected.forEach(function (element) {
        _this2.userIds.userIds.push(element.id);
      });
      this.$store.dispatch('deleteUser', this.userIds).then(function () {
        _this2.close();
      });
    },
    close: function close() {
      var _this3 = this;

      this.userIds.userIds = [];
      this.selectedHotels = null;
      this.selected = [];
      this.isEditing = false;
      this.actualHotels[0].id = null;
      this.actualHotels[1].hotels = null;
      this.dialog = false;
      this.deleteDialog = false;
      this.$nextTick(function () {
        _this3.editedItem = Object.assign({}, _this3.defaultItem);
        _this3.editedIndex = -1;
      });
      this.$store.commit('setErrors', this.defaultErrors);
    },
    save: function save() {
      var _this4 = this;

      if (this.editedIndex > -1) {
        try {
          this.$store.dispatch('editUser', this.editedItem).then(function () {
            if (_this4.getStatus === 200) {
              _this4.actualHotels[0].id = _this4.editedItem.id;
              _this4.actualHotels[1].hotels = _this4.selectedHotels;

              _this4.$store.dispatch('setHotelsToUsers', _this4.actualHotels).then(function () {
                _this4.close();
              });
            }
          });
        } catch (error) {}
      } else {
        try {
          this.$store.dispatch('saveUser', this.editedItem).then(function () {
            if (_this4.getStatus === 200) {
              _this4.actualHotels[0].id = _this4.$store.getters.getUserId;
              _this4.actualHotels[1].hotels = _this4.selectedHotels;

              _this4.$store.dispatch('setHotelsToUsers', _this4.actualHotels).then(function () {
                _this4.close();
              });
            }
          });
        } catch (error) {}
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true& ***!
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
  return _c("div", [
    _vm.users === []
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
                          "v-btn",
                          {
                            on: {
                              click: function($event) {
                                return _vm.showDeleteDialog()
                              }
                            }
                          },
                          [
                            _c("span", { attrs: { color: "error" } }, [
                              _vm._v("ELIMINAR SELECCIÓN")
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-icon",
                              { attrs: { large: "", color: "error" } },
                              [_vm._v("mdi-delete-sweep")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("v-divider", {
                      staticClass: "mx-4",
                      attrs: { inset: "", vertical: "" }
                    }),
                    _vm._v(" "),
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("h1", [_vm._v("USUARIOS")]),
                    _vm._v(" "),
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("v-divider", {
                      staticClass: "mx-4",
                      attrs: { inset: "", vertical: "" }
                    }),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        on: {
                          click: function($event) {
                            _vm.dialog = !_vm.dialog
                          }
                        }
                      },
                      [
                        _c("span", { attrs: { color: "error" } }, [
                          _vm._v("NUEVO USUARIO")
                        ]),
                        _vm._v(" "),
                        _c(
                          "v-icon",
                          { attrs: { large: "", color: "primary" } },
                          [_vm._v("mdi-plus")]
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
                        items: _vm.users,
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
                                      label: "Buscar Usuario",
                                      "single-line": "",
                                      "hide-details": "",
                                      align: "center"
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
                                        "max-width": "500px"
                                      },
                                      model: {
                                        value: _vm.dialog,
                                        callback: function($$v) {
                                          _vm.dialog = $$v
                                        },
                                        expression: "dialog"
                                      }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        [
                                          _c("v-card-title", [
                                            _c(
                                              "span",
                                              { staticClass: "headline" },
                                              [_vm._v(_vm._s(_vm.formTitle))]
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "v-card-text",
                                            [
                                              _c(
                                                "v-form",
                                                {
                                                  model: {
                                                    value: _vm.valid,
                                                    callback: function($$v) {
                                                      _vm.valid = $$v
                                                    },
                                                    expression: "valid"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-container",
                                                    [
                                                      _c(
                                                        "v-row",
                                                        [
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                                sm: "6",
                                                                md: "6"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "v-text-field",
                                                                {
                                                                  attrs: {
                                                                    label:
                                                                      "Nombre(s)*",
                                                                    required:
                                                                      "",
                                                                    "error-messages":
                                                                      _vm
                                                                        .getErrors
                                                                        .data
                                                                        .name
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm
                                                                        .editedItem
                                                                        .name,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.editedItem,
                                                                        "name",
                                                                        $$v
                                                                      )
                                                                    },
                                                                    expression:
                                                                      "editedItem.name"
                                                                  }
                                                                }
                                                              )
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                                sm: "6",
                                                                md: "6"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "v-text-field",
                                                                {
                                                                  attrs: {
                                                                    label:
                                                                      "Apellido(s)",
                                                                    "error-messages":
                                                                      _vm
                                                                        .getErrors
                                                                        .data
                                                                        .last_name
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm
                                                                        .editedItem
                                                                        .last_name,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.editedItem,
                                                                        "last_name",
                                                                        $$v
                                                                      )
                                                                    },
                                                                    expression:
                                                                      "editedItem.last_name"
                                                                  }
                                                                }
                                                              )
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "v-text-field",
                                                                {
                                                                  attrs: {
                                                                    label:
                                                                      "Email*",
                                                                    required:
                                                                      "",
                                                                    "error-messages":
                                                                      _vm
                                                                        .getErrors
                                                                        .data
                                                                        .email
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm
                                                                        .editedItem
                                                                        .email,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.editedItem,
                                                                        "email",
                                                                        $$v
                                                                      )
                                                                    },
                                                                    expression:
                                                                      "editedItem.email"
                                                                  }
                                                                }
                                                              )
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                                sm: "6",
                                                                md: "6"
                                                              }
                                                            },
                                                            [
                                                              _c("v-select", {
                                                                attrs: {
                                                                  items: [
                                                                    "super",
                                                                    "administrator",
                                                                    "manager"
                                                                  ],
                                                                  label:
                                                                    "Tipo*",
                                                                  "error-messages":
                                                                    _vm
                                                                      .getErrors
                                                                      .data
                                                                      .type,
                                                                  required: ""
                                                                },
                                                                model: {
                                                                  value:
                                                                    _vm
                                                                      .editedItem
                                                                      .type,
                                                                  callback: function(
                                                                    $$v
                                                                  ) {
                                                                    _vm.$set(
                                                                      _vm.editedItem,
                                                                      "type",
                                                                      $$v
                                                                    )
                                                                  },
                                                                  expression:
                                                                    "editedItem.type"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12",
                                                                sm: "6",
                                                                md: "6"
                                                              }
                                                            },
                                                            [
                                                              _c("v-select", {
                                                                attrs: {
                                                                  items: [
                                                                    "Español",
                                                                    "English"
                                                                  ],
                                                                  label:
                                                                    "Lenguaje*",
                                                                  "error-messages":
                                                                    _vm
                                                                      .getErrors
                                                                      .data
                                                                      .language,
                                                                  required: ""
                                                                },
                                                                model: {
                                                                  value:
                                                                    _vm
                                                                      .editedItem
                                                                      .language,
                                                                  callback: function(
                                                                    $$v
                                                                  ) {
                                                                    _vm.$set(
                                                                      _vm.editedItem,
                                                                      "language",
                                                                      $$v
                                                                    )
                                                                  },
                                                                  expression:
                                                                    "editedItem.language"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12"
                                                              }
                                                            },
                                                            [
                                                              _vm.timezones !==
                                                              []
                                                                ? _c(
                                                                    "div",
                                                                    [
                                                                      _c(
                                                                        "v-autocomplete",
                                                                        {
                                                                          attrs: {
                                                                            items:
                                                                              _vm.timezones,
                                                                            label:
                                                                              "Zona horaria*",
                                                                            "error-messages":
                                                                              _vm
                                                                                .getErrors
                                                                                .data
                                                                                .timezone,
                                                                            required:
                                                                              ""
                                                                          },
                                                                          model: {
                                                                            value:
                                                                              _vm
                                                                                .editedItem
                                                                                .timezone,
                                                                            callback: function(
                                                                              $$v
                                                                            ) {
                                                                              _vm.$set(
                                                                                _vm.editedItem,
                                                                                "timezone",
                                                                                $$v
                                                                              )
                                                                            },
                                                                            expression:
                                                                              "editedItem.timezone"
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                : _c(
                                                                    "div",
                                                                    [
                                                                      _c(
                                                                        "v-autocomplete",
                                                                        {
                                                                          attrs: {
                                                                            items: [],
                                                                            label:
                                                                              "Zona horaria*",
                                                                            "error-messages":
                                                                              _vm
                                                                                .getErrors
                                                                                .data
                                                                                .type
                                                                                .timezone,
                                                                            required:
                                                                              ""
                                                                          },
                                                                          model: {
                                                                            value:
                                                                              _vm
                                                                                .editedItem
                                                                                .timezone,
                                                                            callback: function(
                                                                              $$v
                                                                            ) {
                                                                              _vm.$set(
                                                                                _vm.editedItem,
                                                                                "timezone",
                                                                                $$v
                                                                              )
                                                                            },
                                                                            expression:
                                                                              "editedItem.timezone"
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              attrs: {
                                                                cols: "12"
                                                              }
                                                            },
                                                            [
                                                              _vm.hotels !== []
                                                                ? _c(
                                                                    "div",
                                                                    [
                                                                      _c(
                                                                        "v-autocomplete",
                                                                        {
                                                                          attrs: {
                                                                            hint: !_vm.isEditing
                                                                              ? "Click en el icono para editar"
                                                                              : "Clic en el icono para guardar",
                                                                            items:
                                                                              _vm.hotels,
                                                                            readonly: !_vm.isEditing,
                                                                            "item-text":
                                                                              "title",
                                                                            "item-value":
                                                                              "hotel_id",
                                                                            label:
                                                                              "Hoteles — " +
                                                                              (_vm.isEditing
                                                                                ? "Editable"
                                                                                : "Solo vista"),
                                                                            multiple:
                                                                              "",
                                                                            chips:
                                                                              "",
                                                                            "small-chips":
                                                                              "",
                                                                            "persistent-hint":
                                                                              "",
                                                                            "prepend-icon":
                                                                              "mdi-city"
                                                                          },
                                                                          scopedSlots: _vm._u(
                                                                            [
                                                                              {
                                                                                key:
                                                                                  "append-outer",
                                                                                fn: function() {
                                                                                  return [
                                                                                    _c(
                                                                                      "v-slide-x-reverse-transition",
                                                                                      {
                                                                                        attrs: {
                                                                                          mode:
                                                                                            "out-in"
                                                                                        }
                                                                                      },
                                                                                      [
                                                                                        _c(
                                                                                          "v-icon",
                                                                                          {
                                                                                            key:
                                                                                              "icon-" +
                                                                                              _vm.isEditing,
                                                                                            attrs: {
                                                                                              color: _vm.isEditing
                                                                                                ? "success"
                                                                                                : "info"
                                                                                            },
                                                                                            domProps: {
                                                                                              textContent: _vm._s(
                                                                                                _vm.isEditing
                                                                                                  ? "mdi-check-outline"
                                                                                                  : "mdi-circle-edit-outline"
                                                                                              )
                                                                                            },
                                                                                            on: {
                                                                                              click: function(
                                                                                                $event
                                                                                              ) {
                                                                                                _vm.isEditing = !_vm.isEditing
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        )
                                                                                      ],
                                                                                      1
                                                                                    )
                                                                                  ]
                                                                                },
                                                                                proxy: true
                                                                              }
                                                                            ],
                                                                            null,
                                                                            false,
                                                                            1684271296
                                                                          ),
                                                                          model: {
                                                                            value:
                                                                              _vm.selectedHotels,
                                                                            callback: function(
                                                                              $$v
                                                                            ) {
                                                                              _vm.selectedHotels = $$v
                                                                            },
                                                                            expression:
                                                                              "selectedHotels"
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
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
                                          ),
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
                                                    color: "blue darken-1",
                                                    text: ""
                                                  },
                                                  on: { click: _vm.close }
                                                },
                                                [_vm._v("Cancelar")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "blue darken-1",
                                                    text: ""
                                                  },
                                                  on: { click: _vm.save }
                                                },
                                                [
                                                  _vm._v(
                                                    "Guardar\n                            "
                                                  )
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
                                  ),
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
                                            [_vm._v("¿Eliminar usuarios?")]
                                          ),
                                          _vm._v(" "),
                                          _c("v-card-text", [
                                            _vm._v(
                                              "\n                        Está a punto de eliminar uno o más registros de usuario.\n                        Esta acción no se puede deshacer. ¿Continuar?\n                      "
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
                              _c("v-switch", {
                                staticClass: "pa-3",
                                attrs: { label: "Selección única" },
                                model: {
                                  value: _vm.singleSelect,
                                  callback: function($$v) {
                                    _vm.singleSelect = $$v
                                  },
                                  expression: "singleSelect"
                                }
                              })
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "item.actions",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c(
                                "v-icon",
                                {
                                  on: {
                                    click: function($event) {
                                      return _vm.editItem(item)
                                    }
                                  }
                                },
                                [_vm._v(" mdi-pencil")]
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

/***/ "./resources/js/users/Users.vue":
/*!**************************************!*\
  !*** ./resources/js/users/Users.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=3de4a8da&scoped=true& */ "./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/users/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3de4a8da",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/users/Users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/users/Users.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/users/Users.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/users/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=3de4a8da&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/users/Users.vue?vue&type=template&id=3de4a8da&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_3de4a8da_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);