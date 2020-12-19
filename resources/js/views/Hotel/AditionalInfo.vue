<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--AMENIDADES-->
        <v-banner single-line>
          <div class="d-flex align-center ml-1">
            <v-icon class="mb-1" left>mdi-tag-multiple</v-icon>
            <div class="mt-n1">
              <span class="text-h6 font-weight-bold">INFORMACIÓN ADICIONAL</span>
            </div>
          </div>
        </v-banner>
        <div class="pa-4">
          <v-col cols="12" sm="6" md="12">
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Servicios destacados</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Spa</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="spaItems"
                          v-model="computedDdwnSpa"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Aire acondicionado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwAirConditioned" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Habitaciones libres de humo de tabaco</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwNoSmokeRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio por traslado a aeropuerto(transfer)</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwAirTransferService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio por traslado a hotel(collect)</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwAirCollectService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Recepcion las 24 horas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwRecection_24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Gimnasio</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwGym" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio a la habitación</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwRoomService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Terraza</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwTerrace" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Bar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwBar" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Jardin</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwGarden" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Parque acuatico</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="acuaticItems"
                          v-model="computedDdwnAcuatic"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <!-- <v-col cols="12" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 2%">
                        <CarrouselRestaurant></CarrouselRestaurant>
                      </v-card>
                    </v-col>
                    <v-col cols="12" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 2%">
                        <CarrouselPool></CarrouselPool>
                      </v-card>
                    </v-col> -->
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Actividades</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Playa</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="beachItems"
                          v-model="computedDdwnBeach"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Actividades recreativas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwRecreationalActivities" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Cena romantica</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="romanticDItems"
                          v-model="computedDdwnRomanticD"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Tour turistico</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="touristicTItems"
                          v-model="computedDdwnTouristicT"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Transporte</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento vigilado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwGuardedParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento en la calle</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwStreetParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento en un garaje</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwGarageParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento adaptado para personas de movilidad reducida</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSpecialParking" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Servicios de recepcion</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Registro privado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwReg_inout_private" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Registro express</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwReg_inout_express" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Informacion turistica</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwTouristicInfo" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de estacionamiento</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwParkingService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Cambio de divisas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwCurrencyChange" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Zonas comunes</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Mobiliario exterior</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwOutdoorFurniture" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Terraza/Solárium</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwTerraceSolarium" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Comedor compartido</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSharedDinner" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Salon compartido</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSharedSalon" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Zona de juegos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwGameZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Biblioteca</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwLibrary" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Servicios de limpieza</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Limpieza interna diaria</strong>
                        </span>
                        <v-select
                          class="ml-auto"
                          :items="dailyHItems"
                          v-model="computedDdwnDailyH"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de lavanderia</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwLaundryService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de planchado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwIronService" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Instalaciones de negocios</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Sala de reuniones</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwMeetingRoom" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Centro de reuniones</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwMeetingCenter" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Fax/Fotocopiadora</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwFaxPhotocopier" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Varios</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Descanso</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwCoffeeBreak" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Tienda de recuerdos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSouvenirsStore" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio para personas con capacidades reducidas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwInclusiveService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Elevador</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwElevator" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Area para fumar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSmokingZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>No fumar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwNoSmoking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Pet friendly</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwPetFriendly" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Casa para mascotas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwPetHouse" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Pet basket</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwPetBasket" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Solo adultos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwOnlyAdults" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Habitaciones sanitizadas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSanitizedRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Suite nupcial</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwBridalSuite" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio VIP</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwVipService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Calefacción</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwCalefaction" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Seguridad</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Bolsas de seguridad</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwKeepBags" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Seguridad las 24 horas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSecurity24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Alarma de seguridad</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSecurityAlarm" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Detectores de humo</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSmookeDetectors" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Camaras de seguridad internas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwInSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Camaras de seguridad externas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwOutSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Extintor de incendios</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwFireExtinguishers" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Caja fuerte</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="computedSwSafeDepositBox" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarrouselRestaurant from "../../components/Hotel/CarrouselRestaurant";
import CarrouselPool from "../../components/Hotel/CarrouselPool";

export default {
  name: "AditionalInfo",
  created() {
    if (this.hotel.idAmenity !== null) {
      console.log("CON ID",this.aditionalInfo)
      this.fillModel(); //Ejecuta metodo para llenar la vista con los datos
      console.log("CON ID",this.aditionalInfo)
    }
    else{
      console.log("SIN ID",this.aditionalInfo)
      this.fillModel();
      console.log("SIN ID",this.aditionalInfo)
    }
  },
  data() {
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
      swSafeDepositBoxModel: null,
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      aditionalInfo: (state) => state.HotelModule.aditionalInfo,
    }),
    computedDdwnSpa: {
      get() {
        return this.ddwnSpaModel;
      },
      set(model) {
        this.ddwnSpaModel = model;
        if (this.ddwnSpaModel == "Gratis") {
          this.aditionalInfo.spa = "free";
        }
        if (this.ddwnSpaModel == "De Pago") {
          this.aditionalInfo.spa = "paid";
        }
        return this.ddwnSpaModel;
      },
    },
    computedDdwnAcuatic: {
      get() {
        return this.ddwnAcuaticModel;
      },
      set(model) {
        this.ddwnAcuaticModel = model;
        if (this.ddwnAcuaticModel == "Gratis") {
          this.aditionalInfo.water_park = "free";
        }
        if (this.ddwnAcuaticModel == "De Pago") {
          this.aditionalInfo.water_park = "paid";
        }
        return this.ddwnAcuaticModel;
      },
    },
    computedDdwnBeach: {
      get() {
        return this.ddwnBeachModel;
      },
      set(model) {
        this.ddwnBeachModel = model;
        if (this.ddwnBeachModel == "Privada") {
          this.aditionalInfo.beach = "private";
        }
        if (this.ddwnBeachModel == "En frente") {
          this.aditionalInfo.beach = "in front";
        }
        return this.ddwnBeachModel;
      },
    },
    computedDdwnRomanticD: {
      get() {
        return this.ddwnRomanticDModel;
      },
      set(model) {
        this.ddwnRomanticDModel = model;
        if (this.ddwnRomanticDModel == "Gratis") {
          this.aditionalInfo.romantic_dinners = "free";
        }
        if (this.ddwnRomanticDModel == "De Pago") {
          this.aditionalInfo.romantic_dinners = "paid";
        }
        return this.ddwnRomanticDModel;
      },
    },
    computedDdwnTouristicT: {
      get() {
        return this.ddwnTouristicTModel;
      },
      set(model) {
        this.ddwnTouristicTModel = model;
        if (this.ddwnTouristicTModel == "Gratis") {
          this.aditionalInfo.touristic_tour = "free";
        }
        if (this.ddwnTouristicTModel == "De Pago") {
          this.aditionalInfo.touristic_tour = "paid";
        }
        return this.ddwnTouristicTModel;
      },
    },
    computedDdwnDailyH: {
      get() {
        return this.ddwnDailyHModel;
      },
      set(model) {
        this.ddwnDailyHModel = model;
        if (this.ddwnDailyHModel == "Gratis") {
          this.aditionalInfo.daily_housekipping = "free";
        }
        if (this.ddwnDailyHModel == "De Pago") {
          this.aditionalInfo.daily_housekipping = "paid";
        }
        return this.ddwnDailyHModel;
      },
    },
    computedSwAirConditioned: {
      get() {
        return this.swAirConditionedModel;
      },
      set(model) {
        this.swAirConditionedModel = model;
        this.aditionalInfo.air_conditioned = this.swAirConditionedModel;
        return this.swAirConditionedModel;
      },
    },
    computedSwNoSmokeRooms: {
      get() {
        return this.swNoSmokeRoomsModel;
      },
      set(model) {
        this.swNoSmokeRoomsModel = model;
        this.aditionalInfo.no_smoke_rooms = this.swNoSmokeRoomsModel;
        return this.swNoSmokeRoomsModel;
      },
    },
    computedSwAirTransferService: {
      get() {
        return this.swAirTransferServiceModel;
      },
      set(model) {
        this.swAirTransferServiceModel = model;
        this.aditionalInfo.air_transfer_service = this.swAirTransferServiceModel;
        return this.swAirTransferServiceModel;
      },
    },
    computedSwAirCollectService: {
      get() {
        return this.swAirCollectServiceModel;
      },
      set(model) {
        this.swAirCollectServiceModel = model;
        this.aditionalInfo.air_collect_service = this.swAirCollectServiceModel;
        return this.swAirCollectServiceModel;
      },
    },
    computedSwRecection_24h: {
      get() {
        return this.swRecection_24hModel;
      },
      set(model) {
        this.swRecection_24hModel = model;
        this.aditionalInfo.recection_24h = this.swRecection_24hModel;
        return this.swRecection_24hModel;
      },
    },
    computedSwGym: {
      get() {
        return this.swGymModel;
      },
      set(model) {
        this.swGymModel = model;
        this.aditionalInfo.gym = this.swGymModel;
        return this.swGymModel;
      },
    },
    computedSwRoomService: {
      get() {
        return this.swRoomServiceModel;
      },
      set(model) {
        this.swRoomServiceModel = model;
        this.aditionalInfo.room_service = this.swRoomServiceModel;
        return this.swRoomServiceModel;
      },
    },
    computedSwTerrace: {
      get() {
        return this.swTerraceModel;
      },
      set(model) {
        this.swTerraceModel = model;
        this.aditionalInfo.terrace = this.swTerraceModel;
        return this.swTerraceModel;
      },
    },
    computedSwBar: {
      get() {
        return this.swBarModel;
      },
      set(model) {
        this.swBarModel = model;
        this.aditionalInfo.bar = this.swBarModel;
        return this.swBarModel;
      },
    },
    computedSwGarden: {
      get() {
        return this.swGardenModel;
      },
      set(model) {
        this.swGardenModel = model;
        this.aditionalInfo.garden = this.swGardenModel;
        return this.swGardenModel;
      },
    },
    computedSwRecreationalActivities: {
      get() {
        return this.swRecreationalActivitiesModel;
      },
      set(model) {
        this.swRecreationalActivitiesModel = model;
        this.aditionalInfo.recreational_activities = this.swRecreationalActivitiesModel;
        return this.swRecreationalActivitiesModel;
      },
    },
    computedSwGuardedParking: {
      get() {
        return this.swGuardedParkingModel;
      },
      set(model) {
        this.swGuardedParkingModel = model;
        this.aditionalInfo.guarded_parking = this.swGuardedParkingModel;
        return this.swGuardedParkingModel;
      },
    },
    computedSwStreetParking: {
      get() {
        return this.swStreetParkingModel;
      },
      set(model) {
        this.swStreetParkingModel = model;
        this.aditionalInfo.street_parking = this.swStreetParkingModel;
        return this.swStreetParkingModel;
      },
    },
    computedSwGarageParking: {
      get() {
        return this.swGarageParkingModel;
      },
      set(model) {
        this.swGarageParkingModel = model;
        this.aditionalInfo.garage_parking = this.swGarageParkingModel;
        return this.swGarageParkingModel;
      },
    },
    computedSwSpecialParking: {
      get() {
        return this.swSpecialParkingModel;
      },
      set(model) {
        this.swSpecialParkingModel = model;
        this.aditionalInfo.special_parking = this.swSpecialParkingModel;
        return this.swSpecialParkingModel;
      },
    },
    computedSwReg_inout_private: {
      get() {
        return this.swReg_inout_privateModel;
      },
      set(model) {
        this.swReg_inout_privateModel = model;
        this.aditionalInfo.reg_inout_private = this.swReg_inout_privateModel;
        return this.swReg_inout_privateModel;
      },
    },
    computedSwReg_inout_express: {
      get() {
        return this.swReg_inout_expressModel;
      },
      set(model) {
        this.swReg_inout_expressModel = model;
        this.aditionalInfo.reg_inout_express =this.swReg_inout_expressModel;
        return this.swReg_inout_expressModel;
      },
    },
    computedSwTouristicInfo: {
      get() {
        return this.swTouristicInfoModel;
      },
      set(model) {
        this.swTouristicInfoModel = model;
        this.aditionalInfo.touristic_info = this.swTouristicInfoModel;
        return this.swTouristicInfoModel;
      },
    },
    computedSwParkingService: {
      get() {
        return this.swParkingServiceModel;
      },
      set(model) {
        this.swParkingServiceModel = model;
        this.aditionalInfo.parking_service = this.swParkingServiceModel;
        return this.swParkingServiceModel;
      },
    },
    computedSwCurrencyChange: {
      get() {
        return this.swCurrencyChangeModel;
      },
      set(model) {
        this.swCurrencyChangeModel = model;
        this.aditionalInfo.currency_change = this.swCurrencyChangeModel;
        return this.swCurrencyChangeModel;
      },
    },
    computedSwOutdoorFurniture: {
      get() {
        return this.swOutdoorFurnitureModel;
      },
      set(model) {
        this.swOutdoorFurnitureModel = model;
        this.aditionalInfo.outdoor_furniture = this.swOutdoorFurnitureModel;
        return this.swOutdoorFurnitureModel;
      },
    },
    computedSwTerraceSolarium: {
      get() {
        return this.swTerraceSolariumModel;
      },
      set(model) {
        this.swTerraceSolariumModel = model;
        this.aditionalInfo.terrace_solarium = this.swTerraceSolariumModel;
        return this.swTerraceSolariumModel;
      },
    },
    computedSwSharedDinner: {
      get() {
        return this.swSharedDinnerModel;
      },
      set(model) {
        this.swSharedDinnerModel = model;
        this.aditionalInfo.shared_dinner = this.swSharedDinnerModel;
        return this.swSharedDinnerModel;
      },
    },
    computedSwSharedSalon: {
      get() {
        return this.swSharedSalonModel;
      },
      set(model) {
        this.swSharedSalonModel = model;
        this.aditionalInfo.shared_salon = this.swSharedSalonModel;
        return this.swSharedSalonModel;
      },
    },
    computedSwGameZone: {
      get() {
        return this.swGameZoneModel;
      },
      set(model) {
        this.swGameZoneModel = model;
        this.aditionalInfo.game_zone = this.swGameZoneModel;
        return this.swGameZoneModel;
      },
    },
    computedSwLibrary: {
      get() {
        return this.swLibraryModel;
      },
      set(model) {
        this.swLibraryModel = model;
        this.aditionalInfo.library = this.swLibraryModel;
        return this.swLibraryModel;
      },
    },
    computedSwLaundryService: {
      get() {
        return this.swLaundryServiceModel;
      },
      set(model) {
        this.swLaundryServiceModel = model;
        this.aditionalInfo.laundry_service = this.swLaundryServiceModel;
        return this.swLaundryServiceModel;
      },
    },
    computedSwIronService: {
      get() {
        return this.swIronServiceModel;
      },
      set(model) {
        this.swIronServiceModel = model;
        this.aditionalInfo.iron_service = this.swIronServiceModel;
        return this.swIronServiceModel;
      },
    },
    computedSwMeetingRoom: {
      get() {
        return this.swMeetingRoomModel;
      },
      set(model) {
        this.swMeetingRoomModel = model;
        this.aditionalInfo.meeting_room = this.swMeetingRoomModel;
        return this.swMeetingRoomModel;
      },
    },
    computedSwMeetingCenter: {
      get() {
        return this.swMeetingCenterModel;
      },
      set(model) {
        this.swMeetingCenterModel = model;
        this.aditionalInfo.meeting_center = this.swMeetingCenterModel;
        return this.swMeetingCenterModel;
      },
    },
    computedSwFaxPhotocopier: {
      get() {
        return this.swFaxPhotocopierModel;
      },
      set(model) {
        this.swFaxPhotocopierModel = model;
        this.aditionalInfo.fax_photocopier = this.swFaxPhotocopierModel;
        return this.swFaxPhotocopierModel;
      },
    },
    computedSwCoffeeBreak: {
      get() {
        return this.swCoffeeBreakModel;
      },
      set(model) {
        this.swCoffeeBreakModel = model;
        this.aditionalInfo.coffee_break = this.swCoffeeBreakModel;
        return this.swCoffeeBreakModel;
      },
    },
    computedSwSouvenirsStore: {
      get() {
        return this.swSouvenirsStoreModel;
      },
      set(model) {
        this.swSouvenirsStoreModel = model;
        this.aditionalInfo.souvenirs_store = this.swSouvenirsStoreModel;
        return this.swSouvenirsStoreModel;
      },
    },
    computedSwInclusiveService: {
      get() {
        return this.swInclusiveServiceModel;
      },
      set(model) {
        this.swInclusiveServiceModel = model;
        this.aditionalInfo.inclusive_service = this.swInclusiveServiceModel;
        return this.swInclusiveServiceModel;
      },
    },
    computedSwElevator: {
      get() {
        return this.swElevatorModel;
      },
      set(model) {
        this.swElevatorModel = model;
        this.aditionalInfo.elevator = this.swElevatorModel;
        return this.swElevatorModel;
      },
    },
    computedSwNoSmoking: {
      get() {
        return this.swNoSmokingModel;
      },
      set(model) {
        this.swNoSmokingModel = model;
        this.aditionalInfo.no_smoking = this.swNoSmokingModel;
        return this.swNoSmokingModel;
      },
    },

    computedSwSmokingZone: {
      get() {
        return this.swSmokingZoneModel;
      },
      set(model) {
        this.swSmokingZoneModel = model;
        this.aditionalInfo.smoking_zone = this.swSmokingZoneModel;
        return this.swSmokingZoneModel;
      },
    },
    computedSwPetFriendly: {
      get() {
        return this.swPetFriendlyModel;
      },
      set(model) {
        this.swPetFriendlyModel = model;
        this.aditionalInfo.pet_friendly = this.swPetFriendlyModel;
        return this.swPetFriendlyModel;
      },
    },
    computedSwPetHouse: {
      get() {
        return this.swPetHouseModel;
      },
      set(model) {
        this.swPetHouseModel = model;
        this.aditionalInfo.pet_house = this.swPetHouseModel;
        return this.swPetHouseModel;
      },
    },
    computedSwPetBasket: {
      get() {
        return this.swPetBasketModel;
      },
      set(model) {
        this.swPetBasketModel = model;
        this.aditionalInfo.pet_basket = this.swPetBasketModel;
        return this.swPetBasketModel;
      },
    },
    computedSwOnlyAdults: {
      get() {
        return this.swOnlyAdultsModel;
      },
      set(model) {
        this.swOnlyAdultsModel = model;
        this.aditionalInfo.only_adults = this.swOnlyAdultsModel;
        return this.swOnlyAdultsModel;
      },
    },
    computedSwSanitizedRooms: {
      get() {
        return this.swSanitizedRoomsModel;
      },
      set(model) {
        this.swSanitizedRoomsModel = model;
        this.aditionalInfo.sanitized_rooms = this.swSanitizedRoomsModel;
        return this.swSanitizedRoomsModel;
      },
    },
    computedSwBridalSuite: {
      get() {
        return this.swBridalSuiteModel;
      },
      set(model) {
        this.swBridalSuiteModel = model;
        this.aditionalInfo.bridal_suite = this.swBridalSuiteModel;
        return this.swBridalSuiteModel;
      },
    },
    computedSwVipService: {
      get() {
        return this.swVipServiceModel;
      },
      set(model) {
        this.swVipServiceModel = model;
        this.aditionalInfo.vip_service = this.swVipServiceModel;
        return this.swVipServiceModel;
      },
    },
    computedSwCalefaction: {
      get() {
        return this.swCalefactionModel;
      },
      set(model) {
        this.swCalefactionModel = model;
        this.aditionalInfo.calefaction = this.swCalefactionModel;
        return this.swCalefactionModel;
      },
    },
    computedSwKeepBags: {
      get() {
        return this.swKeepBagsModel;
      },
      set(model) {
        this.swKeepBagsModel = model;
        this.aditionalInfo.keep_bags = this.swKeepBagsModel;
        return this.swKeepBagsModel;
      },
    },
    computedSwSecurity24h: {
      get() {
        return this.swSecurity24hModel;
      },
      set(model) {
        this.swSecurity24hModel = model;
        this.aditionalInfo.security_24h = this.swSecurity24hModel;
        return this.swSecurity24hModel;
      },
    },
    computedSwSecurityAlarm: {
      get() {
        return this.swSecurityAlarmModel;
      },
      set(model) {
        this.swSecurityAlarmModel = model;
        this.aditionalInfo.security_alarm = this.swSecurityAlarmModel;
        return this.swSecurityAlarmModel;
      },
    },
    computedSwSmookeDetectors: {
      get() {
        return this.swSmookeDetectorsModel;
      },
      set(model) {
        this.swSmookeDetectorsModel = model;
        this.aditionalInfo.smoke_detectors = this.swSmookeDetectorsModel;
        return this.swSmookeDetectorsModel;
      },
    },
    computedSwInSecurityCams: {
      get() {
        return this.swInSecurityCamsModel;
      },
      set(model) {
        this.swInSecurityCamsModel = model;
        this.aditionalInfo.in_security_cams = this.swInSecurityCamsModel;
        return this.swInSecurityCamsModel;
      },
    },
    computedSwOutSecurityCams: {
      get() {
        return this.swOutSecurityCamsModel;
      },
      set(model) {
        this.swOutSecurityCamsModel = model;
        this.aditionalInfo.out_security_cams = this.swOutSecurityCamsModel;
        return this.swOutSecurityCamsModel;
      },
    },
    computedSwFireExtinguishers: {
      get() {
        return this.swFireExtinguishersModel;
      },
      set(model) {
        this.swFireExtinguishersModel = model;
        this.aditionalInfo.fire_extinguishers = this.swFireExtinguishersModel;
        return this.swFireExtinguishersModel;
      },
    },
    computedSwSafeDepositBox: {
      get() {
        return this.swSafeDepositBoxModel;
      },
      set(model) {
        this.swSafeDepositBoxModel = model;
        this.aditionalInfo.safe_deposit_box = this.swSafeDepositBoxModel;
        return this.swSafeDepositBoxModel;
      },
    },
  },
  methods:{
    fillModel(){
      if (this.aditionalInfo.spa != null) {
        if (this.aditionalInfo.spa == "free") {
          this.ddwnSpaModel = "Gratis";
        }
        if (this.aditionalInfo.spa == "paid") {
          this.ddwnSpaModel = "De Pago";
        }
      }
      else {
        this.aditionalInfo.spa = "free";
        this.ddwnSpaModel = "Gratis";
      }
      if (this.aditionalInfo.water_park != null) {
        if (this.aditionalInfo.water_park == "free") {
          this.ddwnAcuaticModel = "Gratis";
        }
        if (this.aditionalInfo.water_park == "paid") {
          this.ddwnAcuaticModel = "De Pago";
        }
      }
      else {
        this.aditionalInfo.water_park = "free"
        this.ddwnAcuaticModel = "Gratis";
      }
      if (this.aditionalInfo.beach != null) {
        if (this.aditionalInfo.beach == "private") {
          this.ddwnBeachModel = "Privada";
        }
        if (this.aditionalInfo.beach == "in front") {
          this.ddwnBeachModel = "En frente";
        }
      }
      else {
        this.aditionalInfo.beach = "private"
        this.ddwnBeachModel = "Privada";
      }
      if (this.aditionalInfo.romantic_dinners != null) {
        if (this.aditionalInfo.romantic_dinners == "free") {
          this.ddwnRomanticDModel = "Gratis";
        }
        if (this.aditionalInfo.romantic_dinners == "paid") {
          this.ddwnRomanticDModel = "De Pago";
        }
      }
      else {
        this.aditionalInfo.romantic_dinners = "free"
        this.ddwnRomanticDModel = "Gratis";
      }
      if (this.aditionalInfo.touristic_tour != null) {
        if (this.aditionalInfo.touristic_tour == "free") {
          this.ddwnTouristicTModel = "Gratis";
        }
        if (this.aditionalInfo.touristic_tour == "paid") {
          this.ddwnTouristicTModel = "De Pago";
        }
      }
      else {
        this.aditionalInfo.touristic_tour = "free"
        this.ddwnTouristicTModel = "Gratis";
      }
      if (this.aditionalInfo.daily_housekipping != null) {
        if (this.aditionalInfo.daily_housekipping == "free") {
          this.ddwnDailyHModel = "Gratis";
        }
        if (this.aditionalInfo.daily_housekipping == "paid") {
          this.ddwnDailyHModel = "De Pago";
        }
      }
      else {
        this.aditionalInfo.daily_housekipping = "free"
        this.ddwnDailyHModel = "Gratis";
      }
      if(this.aditionalInfo.air_conditioned != null){
        this.swAirConditionedModel = this.aditionalInfo.air_conditioned;
      }
      else{
        this.aditionalInfo.air_conditioned = 0;
        this.swAirConditionedModel = this.aditionalInfo.air_conditioned;
      }
      if(this.aditionalInfo.no_smoke_rooms != null){
        this.swNoSmokeRoomsModel = this.aditionalInfo.no_smoke_rooms;
      }
      else{
        this.aditionalInfo.no_smoke_rooms = 0;
        this.swNoSmokeRoomsModel = this.aditionalInfo.no_smoke_rooms;
      }
      if(this.aditionalInfo.air_transfer_service != null){
        this.swAirTransferServiceModel = this.aditionalInfo.air_transfer_service;
      }
      else{
        this.aditionalInfo.air_transfer_service = 0;
        this.swAirTransferServiceModel = this.aditionalInfo.air_transfer_service;
      }
      if(this.aditionalInfo.air_collect_service != null){
        this.swAirCollectServiceModel = this.aditionalInfo.air_collect_service;
      }
      else{
        this.aditionalInfo.air_collect_service = 0;
        this.swAirCollectServiceModel = this.aditionalInfo.air_collect_service;
      }
      if(this.aditionalInfo.recection_24h != null){
        this.swRecection_24hModel = this.aditionalInfo.recection_24h;
      }
      else{
        this.aditionalInfo.recection_24h = 0;
        this.swRecection_24hModel = this.aditionalInfo.recection_24h;
      }
      if(this.aditionalInfo.gym != null){
        this.swGymModel = this.aditionalInfo.gym;
      }
      else{
        this.aditionalInfo.gym = 0;
        this.swGymModel = this.aditionalInfo.gym;
      }
      if(this.aditionalInfo.room_service != null){
        this.swRoomServiceModel = this.aditionalInfo.room_service;
      }
      else{
        this.aditionalInfo.room_service = 0;
        this.swRoomServiceModel = this.aditionalInfo.room_service;
      }
      if(this.aditionalInfo.terrace != null){
        this.swTerraceModel = this.aditionalInfo.terrace;
      }
      else{
        this.aditionalInfo.terrace = 0;
        this.swTerraceModel = this.aditionalInfo.terrace;
      }     
      if(this.aditionalInfo.bar != null){
        this.swBarModel = this.aditionalInfo.bar;
      }
      else{
        this.aditionalInfo.bar = 0;
        this.swBarModel = this.aditionalInfo.bar;
      }    
      if(this.aditionalInfo.garden != null){
        this.swGardenModel = this.aditionalInfo.garden;
      }
      else{
        this.aditionalInfo.garden = 0;
        this.swGardenModel = this.aditionalInfo.garden;
      }
      if(this.aditionalInfo.recreational_activities != null){
        this.swRecreationalActivitiesModel = this.aditionalInfo.recreational_activities;
      }
      else{
        this.aditionalInfo.recreational_activities = 0;
        this.swRecreationalActivitiesModel = this.aditionalInfo.recreational_activities;
      }   
      if(this.aditionalInfo.guarded_parking != null){
        this.swGuardedParkingModel = this.aditionalInfo.guarded_parking;
      }
      else{
        this.aditionalInfo.guarded_parking = 0;
        this.swGuardedParkingModel = this.aditionalInfo.guarded_parking;
      }  
      if(this.aditionalInfo.street_parking != null){
        this.swStreetParkingModel = this.aditionalInfo.street_parking;
      }
      else{
        this.aditionalInfo.street_parking = 0;
        this.swStreetParkingModel = this.aditionalInfo.street_parking;
      } 
      if(this.aditionalInfo.garage_parking != null){
        this.swGarageParkingModel = this.aditionalInfo.garage_parking;
      }
      else{
        this.aditionalInfo.garage_parking = 0;
        this.swGarageParkingModel = this.aditionalInfo.garage_parking;
      } 
      if(this.aditionalInfo.special_parking != null){
        this.swSpecialParkingModel = this.aditionalInfo.special_parking;
      }
      else{
        this.aditionalInfo.special_parking = 0;
        this.swSpecialParkingModel = this.aditionalInfo.special_parking;
      } 
      if(this.aditionalInfo.reg_inout_private != null){
        this.swReg_inout_privateModel = this.aditionalInfo.reg_inout_private;
      }
      else{
        this.aditionalInfo.reg_inout_private = 0;
        this.swReg_inout_privateModel = this.aditionalInfo.reg_inout_private;
      } 
      if(this.aditionalInfo.reg_inout_express != null){
        this.swReg_inout_expressModel = this.aditionalInfo.reg_inout_express;
      }
      else{
        this.aditionalInfo.reg_inout_express = 0;
        this.swReg_inout_expressModel = this.aditionalInfo.reg_inout_express;
      } 
      if(this.aditionalInfo.touristic_info != null){
        this.swTouristicInfoModel = this.aditionalInfo.touristic_info;
      }
      else{
        this.aditionalInfo.touristic_info = 0;
        this.swTouristicInfoModel = this.aditionalInfo.touristic_info;
      } 
      if(this.aditionalInfo.parking_service != null){
        this.swParkingServiceModel = this.aditionalInfo.parking_service;
      }
      else{
        this.aditionalInfo.parking_service = 0;
        this.swParkingServiceModel = this.aditionalInfo.parking_service;
      }
      if(this.aditionalInfo.currency_change != null){
        this.swCurrencyChangeModel = this.aditionalInfo.currency_change;
      }
      else{
        this.aditionalInfo.currency_change = 0;
        this.swCurrencyChangeModel = this.aditionalInfo.currency_change;
      }
      if(this.aditionalInfo.outdoor_furniture != null){
        this.swOutdoorFurnitureModel = this.aditionalInfo.outdoor_furniture;
      }
      else{
        this.aditionalInfo.outdoor_furniture = 0;
        this.swOutdoorFurnitureModel = this.aditionalInfo.outdoor_furniture;
      }
      if(this.aditionalInfo.terrace_solarium != null){
        this.swTerraceSolariumModel = this.aditionalInfo.terrace_solarium;
      }
      else{
        this.aditionalInfo.terrace_solarium = 0;
        this.swTerraceSolariumModel = this.aditionalInfo.terrace_solarium;
      }
      if(this.aditionalInfo.shared_dinner != null){
        this.swSharedDinnerModel = this.aditionalInfo.shared_dinner;
      }
      else{
        this.aditionalInfo.shared_dinner = 0;
        this.swSharedDinnerModel = this.aditionalInfo.shared_dinner;
      }
      if(this.aditionalInfo.shared_salon != null){
        this.swSharedSalonModel = this.aditionalInfo.shared_salon;
      }
      else{
        this.aditionalInfo.shared_salon = 0;
        this.swSharedSalonModel = this.aditionalInfo.shared_salon;
      }
      if(this.aditionalInfo.game_zone != null){
        this.swGameZoneModel = this.aditionalInfo.game_zone;
      }
      else{
        this.aditionalInfo.game_zone = 0;
        this.swGameZoneModel = this.aditionalInfo.game_zone;
      }
      if(this.aditionalInfo.library != null){
        this.swLibraryModel = this.aditionalInfo.library;
      }
      else{
        this.aditionalInfo.library = 0;
        this.swLibraryModel = this.aditionalInfo.library;
      }
      if(this.aditionalInfo.laundry_service != null){
        this.swLaundryServiceModel = this.aditionalInfo.laundry_service;
      }
      else{
        this.aditionalInfo.laundry_service = 0;
        this.swLaundryServiceModel = this.aditionalInfo.laundry_service;
      }
      if(this.aditionalInfo.iron_service != null){
        this.swIronServiceModel = this.aditionalInfo.iron_service;
      }
      else{
        this.aditionalInfo.iron_service = 0;
        this.swIronServiceModel = this.aditionalInfo.iron_service;
      }
      if(this.aditionalInfo.meeting_room != null){
        this.swMeetingRoomModel = this.aditionalInfo.meeting_room;
      }
      else{
        this.aditionalInfo.meeting_room = 0;
        this.swMeetingRoomModel = this.aditionalInfo.meeting_room;
      }
      if(this.aditionalInfo.meeting_center != null){
        this.swMeetingCenterModel = this.aditionalInfo.meeting_center;
      }
      else{
        this.aditionalInfo.meeting_center = 0;
        this.swMeetingCenterModel = this.aditionalInfo.meeting_center;
      }
      if(this.aditionalInfo.fax_photocopier != null){
        this.swFaxPhotocopierModel = this.aditionalInfo.fax_photocopier;
      }
      else{
        this.aditionalInfo.fax_photocopier = 0;
        this.swFaxPhotocopierModel = this.aditionalInfo.fax_photocopier;
      }
      if(this.aditionalInfo.coffee_break != null){
        this.swCoffeeBreakModel = this.aditionalInfo.coffee_break;
      }
      else{
        this.aditionalInfo.coffee_break = 0;
        this.swCoffeeBreakModel = this.aditionalInfo.coffee_break;
      }
      if(this.aditionalInfo.souvenirs_store != null){
        this.swSouvenirsStoreModel = this.aditionalInfo.souvenirs_store;
      }
      else{
        this.aditionalInfo.souvenirs_store = 0;
        this.swSouvenirsStoreModel = this.aditionalInfo.souvenirs_store;
      }
      if(this.aditionalInfo.inclusive_service != null){
        this.swInclusiveServiceModel = this.aditionalInfo.inclusive_service;
      }
      else{
        this.aditionalInfo.inclusive_service = 0;
        this.swInclusiveServiceModel = this.aditionalInfo.inclusive_service;
      }
      if(this.aditionalInfo.elevator != null){
        this.swElevatorModel = this.aditionalInfo.elevator;
      }
      else{
        this.aditionalInfo.elevator = 0;
        this.swElevatorModel = this.aditionalInfo.elevator;
      }
      if(this.aditionalInfo.smoking_zone != null){
        this.swSmokingZoneModel = this.aditionalInfo.smoking_zone;
      }
      else{
        this.aditionalInfo.smoking_zone = 0;
        this.swSmokingZoneModel = this.aditionalInfo.smoking_zone;
      }
      if(this.aditionalInfo.no_smoking != null){
        this.swNoSmokingModel = this.aditionalInfo.no_smoking;
      }
      else{
        this.aditionalInfo.no_smoking = 0;
        this.swNoSmokingModel = this.aditionalInfo.no_smoking;
      }
      if(this.aditionalInfo.pet_friendly != null){
        this.swPetFriendlyModel = this.aditionalInfo.pet_friendly;
      }
      else{
        this.aditionalInfo.pet_friendly = 0;
        this.swPetFriendlyModel = this.aditionalInfo.pet_friendly;
      }
      if(this.aditionalInfo.pet_house != null){
        this.swPetHouseModel = this.aditionalInfo.pet_house;
      }
      else{
        this.aditionalInfo.pet_house = 0;
        this.swPetHouseModel = this.aditionalInfo.pet_house;
      }
      if(this.aditionalInfo.pet_basket != null){
        this.swPetBasketModel = this.aditionalInfo.pet_basket;
      }
      else{
        this.aditionalInfo.pet_basket = 0;
        this.swPetBasketModel = this.aditionalInfo.pet_basket;
      }
      if(this.aditionalInfo.only_adults != null){
        this.swOnlyAdultsModel = this.aditionalInfo.only_adults;
      }
      else{
        this.aditionalInfo.only_adults = 0;
        this.swOnlyAdultsModel = this.aditionalInfo.only_adults;
      }
      if(this.aditionalInfo.sanitized_rooms != null){
        this.swSanitizedRoomsModel = this.aditionalInfo.sanitized_rooms;
      }
      else{
        this.aditionalInfo.sanitized_rooms = 0;
        this.swSanitizedRoomsModel = this.aditionalInfo.sanitized_rooms;
      }
      if(this.aditionalInfo.bridal_suite != null){
        this.swBridalSuiteModel = this.aditionalInfo.bridal_suite;
      }
      else{
        this.aditionalInfo.bridal_suite = 0;
        this.swBridalSuiteModel = this.aditionalInfo.bridal_suite;
      }
      if(this.aditionalInfo.vip_service != null){
        this.swVipServiceModel = this.aditionalInfo.vip_service;
      }
      else{
        this.aditionalInfo.vip_service = 0;
        this.swVipServiceModel = this.aditionalInfo.vip_service;
      }
      if(this.aditionalInfo.calefaction != null){
        this.swCalefactionModel = this.aditionalInfo.calefaction;
      }
      else{
        this.aditionalInfo.calefaction = 0;
        this.swCalefactionModel = this.aditionalInfo.calefaction;
      }
      if(this.aditionalInfo.keep_bags != null){
        this.swKeepBagsModel = this.aditionalInfo.keep_bags;
      }
      else{
        this.aditionalInfo.keep_bags = 0;
        this.swKeepBagsModel = this.aditionalInfo.keep_bags;
      }
      if(this.aditionalInfo.security_24h != null){
        this.swSecurity24hModel = this.aditionalInfo.security_24h;
      }
      else{
        this.aditionalInfo.security_24h = 0;
        this.swSecurity24hModel = this.aditionalInfo.security_24h;
      }
      if(this.aditionalInfo.security_alarm != null){
        this.swSecurityAlarmModel = this.aditionalInfo.security_alarm;
      }
      else{
        this.aditionalInfo.security_alarm = 0;
        this.swSecurityAlarmModel = this.aditionalInfo.security_alarm;
      }
      if(this.aditionalInfo.smoke_detectors != null){
        this.swSmookeDetectorsModel = this.aditionalInfo.smoke_detectors;
      }
      else{
        this.aditionalInfo.smoke_detectors = 0;
        this.swSmookeDetectorsModel = this.aditionalInfo.smoke_detectors;
      }
      if(this.aditionalInfo.in_security_cams != null){
        this.swInSecurityCamsModel = this.aditionalInfo.in_security_cams;
      }
      else{
        this.aditionalInfo.in_security_cams = 0;
        this.swInSecurityCamsModel = this.aditionalInfo.in_security_cams;
      }
      if(this.aditionalInfo.out_security_cams != null){
        this.swOutSecurityCamsModel = this.aditionalInfo.out_security_cams;
      }
      else{
        this.aditionalInfo.out_security_cams = 0;
        this.swOutSecurityCamsModel = this.aditionalInfo.out_security_cams;
      }
      if(this.aditionalInfo.fire_extinguishers != null){
        this.swFireExtinguishersModel = this.aditionalInfo.fire_extinguishers;
      }
      else{
        this.aditionalInfo.fire_extinguishers = 0;
        this.swFireExtinguishersModel = this.aditionalInfo.fire_extinguishers;
      }
      if(this.aditionalInfo.safe_deposit_box != null){
        this.swSafeDepositBoxModel = this.aditionalInfo.safe_deposit_box;
      }
      else{
        this.aditionalInfo.safe_deposit_box = 0;
        this.swSafeDepositBoxModel = this.aditionalInfo.safe_deposit_box;
      }
    }
  },
  components: {
    CarrouselRestaurant,
    CarrouselPool,
  },
};
</script>

<style scoped>
.iconsInformation {
  margin-bottom: 6px;
}

.v-expansion-panel-header {
  color: white;
}

.v-expansion-panel-content {
  margin-top: 2%;
}
</style>