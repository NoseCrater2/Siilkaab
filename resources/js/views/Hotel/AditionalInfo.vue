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
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Servicios destacados</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Spa</strong>
                        </span>
                        <v-select
                          :items="spaItems"
                          v-model="computedDdwnSpa"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Aire acondicionado</strong>
                        </span>
                        <v-switch v-model="computedSwAirConditioned" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Habitaciones libres de humo de tabaco</strong>
                        </span>
                        <v-switch v-model="computedSwNoSmokeRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio por traslado a aeropuerto(transfer)</strong>
                        </span>
                        <v-switch v-model="computedSwAirTransferService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio por traslado a hotel(collect)</strong>
                        </span>
                        <v-switch v-model="computedSwAirCollectService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                     <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Recepcion las 24 horas</strong>
                        </span>
                        <v-switch v-model="computedSwRecection_24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                     <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Gimnasio</strong>
                        </span>
                        <v-switch v-model="computedSwGym" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                     <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio a la habitación</strong>
                        </span>
                        <v-switch v-model="computedSwRoomService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                     <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Terraza</strong>
                        </span>
                        <v-switch v-model="computedSwTerrace" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                     <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Bar</strong>
                        </span>
                        <v-switch v-model="computedSwBar" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Jardin</strong>
                        </span>
                        <v-switch v-model="computedSwGarden" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Parque acuatico</strong>
                        </span>
                        <v-select
                          :items="acuaticItems"
                          v-model="computedDdwnAcuatic"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <!-- COMIENZA CARRUSEL -->
                    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                      <v-card outlined class="pa-3">
                        <CarrouselRestaurant></CarrouselRestaurant>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                      <v-card outlined class="pa-3">
                        <CarrouselPool></CarrouselPool>
                      </v-card>
                    </v-col>
                    <!-- TERMINA CARRUSEL -->
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Playa</strong>
                        </span>
                        <v-select
                          :items="beachItems"
                          v-model="computedDdwnBeach"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Actividades recreativas</strong>
                        </span>
                        <v-switch v-model="computedSwRecreationalActivities" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Cena romantica</strong>
                        </span>
                        <v-select
                          :items="romanticDItems"
                          v-model="computedDdwnRomanticD"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Tour turistico</strong>
                        </span>
                        <v-select
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Estacionamiento vigilado</strong>
                        </span>
                        <v-switch v-model="computedSwGuardedParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Estacionamiento en la calle</strong>
                        </span>
                        <v-switch v-model="computedSwStreetParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Estacionamiento en un garaje</strong>
                        </span>
                        <v-switch v-model="computedSwGarageParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Estacionamiento adaptado para personas de movilidad reducida</strong>
                        </span>
                        <v-switch v-model="computedSwSpecialParking" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Registro privado</strong>
                        </span>
                        <v-switch v-model="computedSwReg_inout_private" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Registro express</strong>
                        </span>
                        <v-switch v-model="computedSwReg_inout_express" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Informacion turistica</strong>
                        </span>
                        <v-switch v-model="computedSwTouristicInfo" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio de estacionamiento</strong>
                        </span>
                        <v-switch v-model="computedSwParkingService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Cambio de divisas</strong>
                        </span>
                        <v-switch v-model="computedSwCurrencyChange" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Mobiliario exterior</strong>
                        </span>
                        <v-switch v-model="computedSwOutdoorFurniture" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Terraza/Solárium</strong>
                        </span>
                        <v-switch v-model="computedSwTerraceSolarium" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Comedor compartido</strong>
                        </span>
                        <v-switch v-model="computedSwSharedDinner" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Salon compartido</strong>
                        </span>
                        <v-switch v-model="computedSwSharedSalon" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Zona de juegos</strong>
                        </span>
                        <v-switch v-model="computedSwGameZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Biblioteca</strong>
                        </span>
                        <v-switch v-model="computedSwLibrary" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Limpieza interna diaria</strong>
                        </span>
                        <v-select
                          :items="dailyHItems"
                          v-model="computedDdwnDailyH"
                          dense
                          outlined
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio de lavanderia</strong>
                        </span>
                        <v-switch v-model="computedSwLaundryService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio de planchado</strong>
                        </span>
                        <v-switch v-model="computedSwIronService" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Sala de reuniones</strong>
                        </span>
                        <v-switch v-model="computedSwMeetingRoom" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Centro de reuniones</strong>
                        </span>
                        <v-switch v-model="computedSwMeetingCenter" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Fax/Fotocopiadora</strong>
                        </span>
                        <v-switch v-model="computedSwFaxPhotocopier" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Descanso</strong>
                        </span>
                        <v-switch v-model="computedSwCoffeeBreak" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Tienda de recuerdos</strong>
                        </span>
                        <v-switch v-model="computedSwSouvenirsStore" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio para personas con capacidades reducidas</strong>
                        </span>
                        <v-switch v-model="computedSwInclusiveService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Elevador</strong>
                        </span>
                        <v-switch v-model="computedSwElevator" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Area para fumar</strong>
                        </span>
                        <v-switch v-model="computedSwSmokingZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>No fumar</strong>
                        </span>
                        <v-switch v-model="computedSwNoSmoking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Pet friendly</strong>
                        </span>
                        <v-switch v-model="computedSwPetFriendly" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Casa para mascotas</strong>
                        </span>
                        <v-switch v-model="computedSwPetHouse" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Pet basket</strong>
                        </span>
                        <v-switch v-model="computedSwPetBasket" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Solo adultos</strong>
                        </span>
                        <v-switch v-model="computedSwOnlyAdults" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Habitaciones sanitizadas</strong>
                        </span>
                        <v-switch v-model="computedSwSanitizedRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Suite nupcial</strong>
                        </span>
                        <v-switch v-model="computedSwBridalSuite" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Servicio VIP</strong>
                        </span>
                        <v-switch v-model="computedSwVipService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Calefacción</strong>
                        </span>
                        <v-switch v-model="computedSwCalefaction" inset></v-switch>
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
                  <v-row>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Bolsas de seguridad</strong>
                        </span>
                        <v-switch v-model="computedSwKeepBags" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Seguridad las 24 horas</strong>
                        </span>
                        <v-switch v-model="computedSwSecurity24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Alarma de seguridad</strong>
                        </span>
                        <v-switch v-model="computedSwSecurityAlarm" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Detectores de humo</strong>
                        </span>
                        <v-switch v-model="computedSwSmookeDetectors" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Camaras de seguridad internas</strong>
                        </span>
                        <v-switch v-model="computedSwInSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Camaras de seguridad externas</strong>
                        </span>
                        <v-switch v-model="computedSwOutSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Extintor de incendios</strong>
                        </span>
                        <v-switch v-model="computedSwFireExtinguishers" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="4" lg="6" md="6" sm="6" xs="12">
                      <v-card outlined class="d-flex align-center justify-space-between px-3 py-5">
                        <span class="mr-2">
                          <strong>Caja fuerte</strong>
                        </span>
                        <v-switch v-model="computedSwSafeDepositBox" inset></v-switch>
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
  mounted(){
      console.log("this.aditionalInfo", this.aditionalInfo)
  },
  data() {
    return {
      spaItems: ["Gratis", "De Pago", "Ninguno"],
      ddwnSpaModel: "Ninguno",
      acuaticItems: ["Gratis", "De Pago", "Ninguno"],
      ddwnAcuaticModel: "Ninguno",
      beachItems: ["Privada", "En frente", "Acantilado", "Ninguno"],
      ddwnBeachModel: "Ninguno",
      romanticDItems: ["Gratis", "De Pago", "Ninguno"],
      ddwnRomanticDModel: "Ninguno",
      touristicTItems: ["Gratis", "De Pago", "Ninguno"],
      ddwnTouristicTModel: "Ninguno",
      dailyHItems: ["Gratis", "De Pago", "Ninguno"],
      ddwnDailyHModel: "Ninguno",
      swAirConditionedModel: 0,
      swNoSmokeRoomsModel: 0,
      swAirTransferServiceModel: 0,
      swAirCollectServiceModel: 0,
      swRecection_24hModel: 0,
      swGymModel: 0,
      swRoomServiceModel: 0,
      swTerraceModel: 0,
      swBarModel: 0,
      swGardenModel: 0,
      swRecreationalActivitiesModel: 0,
      swGuardedParkingModel: 0,
      swStreetParkingModel: 0,
      swGarageParkingModel: 0,
      swSpecialParkingModel: 0,
      swReg_inout_privateModel: 0,
      swReg_inout_expressModel: 0,
      swTouristicInfoModel: 0,
      swParkingServiceModel: 0,
      swCurrencyChangeModel: 0,
      swOutdoorFurnitureModel: 0,
      swTerraceSolariumModel: 0,
      swSharedDinnerModel: 0,
      swSharedSalonModel: 0,
      swGameZoneModel: 0,
      swLibraryModel: 0,
      swLaundryServiceModel: 0,
      swIronServiceModel: 0,
      swMeetingRoomModel: 0,
      swMeetingCenterModel: 0,
      swFaxPhotocopierModel: 0,
      swCoffeeBreakModel: 0,
      swSouvenirsStoreModel: 0,
      swInclusiveServiceModel: 0,
      swElevatorModel: 0,
      swSmokingZoneModel: 0,
      swNoSmokingModel: 0,
      swPetFriendlyModel: 0,
      swPetHouseModel: 0,
      swPetBasketModel: 0,
      swOnlyAdultsModel: 0,
      swSanitizedRoomsModel: 0,
      swBridalSuiteModel: 0,
      swVipServiceModel: 0,
      swCalefactionModel: 0,
      swKeepBagsModel: 0,

      swSecurity24hModel: 0,
      swSecurityAlarmModel: 0,
      swSmookeDetectorsModel: 0,
      swInSecurityCamsModel: 0,
      swOutSecurityCamsModel: 0,
      swFireExtinguishersModel: 0,
      swSafeDepositBoxModel: 0,
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      aditionalInfo: (state) => state.HotelModule.aditionalInfo,
    }),
    computedDdwnSpa: {
      get() {
        if (this.aditionalInfo.spa != null) {
          if (this.aditionalInfo.spa == "flag") {
            this.ddwnSpaModel = "Ninguno";
          }
          if (this.aditionalInfo.spa == "free") {
            this.ddwnSpaModel = "Gratis";
          }
          if (this.aditionalInfo.spa == "paid") {
            this.ddwnSpaModel = "De Pago";
          }
        }
        return this.ddwnSpaModel;
      },
      set(model) {
        this.ddwnSpaModel = model;
        if (this.ddwnSpaModel == "Ninguno") {
          this.aditionalInfo.spa = "flag";
        }
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
        if (this.aditionalInfo.water_park != null) {
          if (this.aditionalInfo.water_park == "flag") {
            this.ddwnAcuaticModel = "Ninguno";
          }
          if (this.aditionalInfo.water_park == "free") {
            this.ddwnAcuaticModel = "Gratis";
          }
          if (this.aditionalInfo.water_park == "paid") {
            this.ddwnAcuaticModel = "De Pago";
          }
        }
        return this.ddwnAcuaticModel;
      },
      set(model) {
        this.ddwnAcuaticModel = model;
        if (this.ddwnAcuaticModel == "Ninguno") {
          this.aditionalInfo.water_park = "flag";
        }
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
        if (this.aditionalInfo.beach != null) {
          if (this.aditionalInfo.beach == "cliff") {
            this.ddwnBeachModel = "Acantilado";
          }
          if (this.aditionalInfo.beach == "flag") {
            this.ddwnBeachModel = "Ninguno";
          }
          if (this.aditionalInfo.beach == "private") {
            this.ddwnBeachModel = "Privada";
          }
          if (this.aditionalInfo.beach == "in front") {
            this.ddwnBeachModel = "En frente";
          }
        }
        return this.ddwnBeachModel;
      },
      set(model) {
        this.ddwnBeachModel = model;
        if (this.ddwnBeachModel == "Acantilado") {
          this.aditionalInfo.beach = "cliff";
        }
        if (this.ddwnBeachModel == "Ninguno") {
          this.aditionalInfo.beach = "flag";
        }
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
        if (this.aditionalInfo.romantic_dinners != null) {
          if (this.aditionalInfo.romantic_dinners == "flag") {
            this.ddwnRomanticDModel = "Ninguno";
          }
          if (this.aditionalInfo.romantic_dinners == "free") {
            this.ddwnRomanticDModel = "Gratis";
          }
          if (this.aditionalInfo.romantic_dinners == "paid") {
            this.ddwnRomanticDModel = "De Pago";
          }
        }
        return this.ddwnRomanticDModel;
      },
      set(model) {
        this.ddwnRomanticDModel = model;
        if (this.ddwnRomanticDModel == "Ninguno") {
          this.aditionalInfo.romantic_dinners = "flag";
        }
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
        if (this.aditionalInfo.touristic_tour != null) {
          if (this.aditionalInfo.touristic_tour == "flag") {
            this.ddwnTouristicTModel = "Ninguno";
          }
          if (this.aditionalInfo.touristic_tour == "free") {
            this.ddwnTouristicTModel = "Gratis";
          }
          if (this.aditionalInfo.touristic_tour == "paid") {
            this.ddwnTouristicTModel = "De Pago";
          }
        }
        return this.ddwnTouristicTModel;
      },
      set(model) {
        this.ddwnTouristicTModel = model;
        if (this.ddwnTouristicTModel == "Ninguno") {
          this.aditionalInfo.touristic_tour = "flag";
        }
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
        if (this.aditionalInfo.daily_housekipping != null) {
          if (this.aditionalInfo.daily_housekipping == "flag") {
            this.ddwnDailyHModel = "Ninguno";
          }
          if (this.aditionalInfo.daily_housekipping == "free") {
            this.ddwnDailyHModel = "Gratis";
          }
          if (this.aditionalInfo.daily_housekipping == "paid") {
            this.ddwnDailyHModel = "De Pago";
          }
        }
        return this.ddwnDailyHModel;
      },
      set(model) {
        this.ddwnDailyHModel = model;
        if (this.ddwnDailyHModel == "Ninguno") {
          this.aditionalInfo.daily_housekipping = "flag";
        }
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
        return this.aditionalInfo.air_conditioned != null ? this.aditionalInfo.air_conditioned : this.swAirConditionedModel;
      },
      set(model) {
        this.swAirConditionedModel = model;
        this.aditionalInfo.air_conditioned = this.swAirConditionedModel;
        return this.swAirConditionedModel;
      },
    },
    computedSwNoSmokeRooms: {
      get() {
        return this.aditionalInfo.no_smoke_rooms != null ? this.aditionalInfo.no_smoke_rooms : this.swNoSmokeRoomsModel;
      },
      set(model) {
        this.swNoSmokeRoomsModel = model;
        this.aditionalInfo.no_smoke_rooms = this.swNoSmokeRoomsModel;
        return this.swNoSmokeRoomsModel;
      },
    },
    computedSwAirTransferService: {
      get() {
        return this.aditionalInfo.air_transfer_service != null ? this.aditionalInfo.air_transfer_service : this.swAirTransferServiceModel;
      },
      set(model) {
        this.swAirTransferServiceModel = model;
        this.aditionalInfo.air_transfer_service = this.swAirTransferServiceModel;
        return this.swAirTransferServiceModel;
      },
    },
    computedSwAirCollectService: {
      get() {
        return this.aditionalInfo.air_collect_service != null ? this.aditionalInfo.air_collect_service : this.swAirCollectServiceModel;
      },
      set(model) {
        this.swAirCollectServiceModel = model;
        this.aditionalInfo.air_collect_service = this.swAirCollectServiceModel;
        return this.swAirCollectServiceModel;
      },
    },
    computedSwRecection_24h: {
      get() {
        return this.aditionalInfo.recection_24h != null ? this.aditionalInfo.recection_24h : this.swRecection_24hModel;
      },
      set(model) {
        this.swRecection_24hModel = model;
        this.aditionalInfo.recection_24h = this.swRecection_24hModel;
        return this.swRecection_24hModel;
      },
    },
    computedSwGym: {
      get() {
        return this.aditionalInfo.gym != null ? this.aditionalInfo.gym : this.swGymModel;
      },
      set(model) {
        this.swGymModel = model;
        this.aditionalInfo.gym = this.swGymModel;
        return this.swGymModel;
      },
    },
    computedSwRoomService: {
      get() {
        return this.aditionalInfo.room_service != null ? this.aditionalInfo.room_service : this.swRoomServiceModel;
      },
      set(model) {
        this.swRoomServiceModel = model;
        this.aditionalInfo.room_service = this.swRoomServiceModel;
        return this.swRoomServiceModel;
      },
    },
    computedSwTerrace: {
      get() {
        return this.aditionalInfo.terrace != null ? this.aditionalInfo.terrace : this.swTerraceModel;
      },
      set(model) {
        this.swTerraceModel = model;
        this.aditionalInfo.terrace = this.swTerraceModel;
        return this.swTerraceModel;
      },
    },
    computedSwBar: {
      get() {
        return this.aditionalInfo.bar != null ? this.aditionalInfo.bar : this.swBarModel;
      },
      set(model) {
        this.swBarModel = model;
        this.aditionalInfo.bar = this.swBarModel;
        return this.swBarModel;
      },
    },
    computedSwGarden: {
      get() {
        return this.aditionalInfo.garden != null ? this.aditionalInfo.garden : this.swGardenModel;
      },
      set(model) {
        this.swGardenModel = model;
        this.aditionalInfo.garden = this.swGardenModel;
        return this.swGardenModel;
      },
    },
    computedSwRecreationalActivities: {
      get() {
        return this.aditionalInfo.recreational_activities != null ? this.aditionalInfo.recreational_activities : this.swRecreationalActivitiesModel;
      },
      set(model) {
        this.swRecreationalActivitiesModel = model;
        this.aditionalInfo.recreational_activities = this.swRecreationalActivitiesModel;
        return this.swRecreationalActivitiesModel;
      },
    },
    computedSwGuardedParking: {
      get() {
        return this.aditionalInfo.guarded_parking != null ? this.aditionalInfo.guarded_parking : this.swGuardedParkingModel;
      },
      set(model) {
        this.swGuardedParkingModel = model;
        this.aditionalInfo.guarded_parking = this.swGuardedParkingModel;
        return this.swGuardedParkingModel;
      },
    },
    computedSwStreetParking: {
      get() {
        return this.aditionalInfo.street_parking != null ? this.aditionalInfo.street_parking : this.swStreetParkingModel;
      },
      set(model) {
        this.swStreetParkingModel = model;
        this.aditionalInfo.street_parking = this.swStreetParkingModel;
        return this.swStreetParkingModel;
      },
    },
    computedSwGarageParking: {
      get() {
        return this.aditionalInfo.garage_parking != null ? this.aditionalInfo.garage_parking : this.swGarageParkingModel;
      },
      set(model) {
        this.swGarageParkingModel = model;
        this.aditionalInfo.garage_parking = this.swGarageParkingModel;
        return this.swGarageParkingModel;
      },
    },
    computedSwSpecialParking: {
      get() {
        return this.aditionalInfo.special_parking != null ? this.aditionalInfo.special_parking : this.swSpecialParkingModel;
      },
      set(model) {
        this.swSpecialParkingModel = model;
        this.aditionalInfo.special_parking = this.swSpecialParkingModel;
        return this.swSpecialParkingModel;
      },
    },
    computedSwReg_inout_private: {
      get() {
        return this.aditionalInfo.reg_inout_private != null ? this.aditionalInfo.reg_inout_private : this.swReg_inout_privateModel;
      },
      set(model) {
        this.swReg_inout_privateModel = model;
        this.aditionalInfo.reg_inout_private = this.swReg_inout_privateModel;
        return this.swReg_inout_privateModel;
      },
    },
    computedSwReg_inout_express: {
      get() {
        return this.aditionalInfo.reg_inout_express != null ? this.aditionalInfo.reg_inout_express : this.swReg_inout_expressModel;
      },
      set(model) {
        this.swReg_inout_expressModel = model;
        this.aditionalInfo.reg_inout_express = this.swReg_inout_expressModel;
        return this.swReg_inout_expressModel;
      },
    },
    computedSwTouristicInfo: {
      get() {
        return this.aditionalInfo.touristic_info != null ? this.aditionalInfo.touristic_info : this.swTouristicInfoModel;
      },
      set(model) {
        this.swTouristicInfoModel = model;
        this.aditionalInfo.touristic_info = this.swTouristicInfoModel;
        return this.swTouristicInfoModel;
      },
    },
    computedSwParkingService: {
      get() {
        return this.aditionalInfo.parking_service != null ? this.aditionalInfo.parking_service : this.swParkingServiceModel;
      },
      set(model) {
        this.swParkingServiceModel = model;
        this.aditionalInfo.parking_service = this.swParkingServiceModel;
        return this.swParkingServiceModel;
      },
    },
    computedSwCurrencyChange: {
      get() {
        return this.aditionalInfo.currency_change != null ? this.aditionalInfo.currency_change : this.swCurrencyChangeModel;
      },
      set(model) {
        this.swCurrencyChangeModel = model;
        this.aditionalInfo.currency_change = this.swCurrencyChangeModel;
        return this.swCurrencyChangeModel;
      },
    },
    computedSwOutdoorFurniture: {
      get() {
        return this.aditionalInfo.outdoor_furniture != null ? this.aditionalInfo.outdoor_furniture : this.swOutdoorFurnitureModel;
      },
      set(model) {
        this.swOutdoorFurnitureModel = model;
        this.aditionalInfo.outdoor_furniture = this.swOutdoorFurnitureModel;
        return this.swOutdoorFurnitureModel;
      },
    },
    computedSwTerraceSolarium: {
      get() {
        return this.aditionalInfo.terrace_solarium != null ? this.aditionalInfo.terrace_solarium : this.swTerraceSolariumModel;
      },
      set(model) {
        this.swTerraceSolariumModel = model;
        this.aditionalInfo.terrace_solarium = this.swTerraceSolariumModel;
        return this.swTerraceSolariumModel;
      },
    },
    computedSwSharedDinner: {
      get() {
        return this.aditionalInfo.shared_dinner != null ? this.aditionalInfo.shared_dinner : this.swSharedDinnerModel;
      },
      set(model) {
        this.swSharedDinnerModel = model;
        this.aditionalInfo.shared_dinner = this.swSharedDinnerModel;
        return this.swSharedDinnerModel;
      },
    },
    computedSwSharedSalon: {
      get() {
        return this.aditionalInfo.shared_salon != null ? this.aditionalInfo.shared_salon : this.swSharedSalonModel;
      },
      set(model) {
        this.swSharedSalonModel = model;
        this.aditionalInfo.shared_salon = this.swSharedSalonModel;
        return this.swSharedSalonModel;
      },
    },
    computedSwGameZone: {
      get() {
        return this.aditionalInfo.game_zone != null ? this.aditionalInfo.game_zone : this.swGameZoneModel;
      },
      set(model) {
        this.swGameZoneModel = model;
        this.aditionalInfo.game_zone = this.swGameZoneModel;
        return this.swGameZoneModel;
      },
    },
    computedSwLibrary: {
      get() {
        return this.aditionalInfo.library != null ? this.aditionalInfo.library : this.swLibraryModel;
      },
      set(model) {
        this.swLibraryModel = model;
        this.aditionalInfo.library = this.swLibraryModel;
        return this.swLibraryModel;
      },
    },
    computedSwLaundryService: {
      get() {
        return this.aditionalInfo.laundry_service != null ? this.aditionalInfo.laundry_service : this.swLaundryServiceModel;
      },
      set(model) {
        this.swLaundryServiceModel = model;
        this.aditionalInfo.laundry_service = this.swLaundryServiceModel;
        return this.swLaundryServiceModel;
      },
    },
    computedSwIronService: {
      get() {
        return this.aditionalInfo.iron_service != null ? this.aditionalInfo.iron_service : this.swIronServiceModel;
      },
      set(model) {
        this.swIronServiceModel = model;
        this.aditionalInfo.iron_service = this.swIronServiceModel;
        return this.swIronServiceModel;
      },
    },
    computedSwMeetingRoom: {
      get() {
        return this.aditionalInfo.meeting_room != null ? this.aditionalInfo.meeting_room : this.swMeetingRoomModel;
      },
      set(model) {
        this.swMeetingRoomModel = model;
        this.aditionalInfo.meeting_room = this.swMeetingRoomModel;
        return this.swMeetingRoomModel;
      },
    },
    computedSwMeetingCenter: {
      get() {
        return this.aditionalInfo.meeting_center != null ? this.aditionalInfo.meeting_center : this.swMeetingCenterModel;
      },
      set(model) {
        this.swMeetingCenterModel = model;
        this.aditionalInfo.meeting_center = this.swMeetingCenterModel;
        return this.swMeetingCenterModel;
      },
    },
    computedSwFaxPhotocopier: {
      get() {
        return this.aditionalInfo.fax_photocopier != null ? this.aditionalInfo.fax_photocopier : this.swFaxPhotocopierModel;
      },
      set(model) {
        this.swFaxPhotocopierModel = model;
        this.aditionalInfo.fax_photocopier = this.swFaxPhotocopierModel;
        return this.swFaxPhotocopierModel;
      },
    },
    computedSwCoffeeBreak: {
      get() {
        return this.aditionalInfo.coffee_break != null ? this.aditionalInfo.coffee_break : this.swCoffeeBreakModel;
      },
      set(model) {
        this.swCoffeeBreakModel = model;
        this.aditionalInfo.coffee_break = this.swCoffeeBreakModel;
        return this.swCoffeeBreakModel;
      },
    },
    computedSwSouvenirsStore: {
      get() {
        return this.aditionalInfo.souvenirs_store != null ? this.aditionalInfo.souvenirs_store : this.swSouvenirsStoreModel;
      },
      set(model) {
        this.swSouvenirsStoreModel = model;
        this.aditionalInfo.souvenirs_store = this.swSouvenirsStoreModel;
        return this.swSouvenirsStoreModel;
      },
    },
    computedSwInclusiveService: {
      get() {
        return this.aditionalInfo.inclusive_service != null ? this.aditionalInfo.inclusive_service : this.swInclusiveServiceModel;
      },
      set(model) {
        this.swInclusiveServiceModel = model;
        this.aditionalInfo.inclusive_service = this.swInclusiveServiceModel;
        return this.swInclusiveServiceModel;
      },
    },
    computedSwElevator: {
      get() {
        return this.aditionalInfo.elevator != null ? this.aditionalInfo.elevator : this.swElevatorModel;
      },
      set(model) {
        this.swElevatorModel = model;
        this.aditionalInfo.elevator = this.swElevatorModel;
        return this.swElevatorModel;
      },
    },
    computedSwNoSmoking: {
      get() {
        return this.aditionalInfo.no_smoking != null ? this.aditionalInfo.no_smoking : this.swNoSmokingModel;
      },
      set(model) {
        this.swNoSmokingModel = model;
        this.aditionalInfo.no_smoking = this.swNoSmokingModel;
        return this.swNoSmokingModel;
      },
    },

    computedSwSmokingZone: {
      get() {
        return this.aditionalInfo.smoking_zone != null ? this.aditionalInfo.smoking_zone : this.swSmokingZoneModel;
      },
      set(model) {
        this.swSmokingZoneModel = model;
        this.aditionalInfo.smoking_zone = this.swSmokingZoneModel;
        return this.swSmokingZoneModel;
      },
    },
    computedSwPetFriendly: {
      get() {
        return this.aditionalInfo.pet_friendly != null ? this.aditionalInfo.pet_friendly : this.swPetFriendlyModel;
      },
      set(model) {
        this.swPetFriendlyModel = model;
        this.aditionalInfo.pet_friendly = this.swPetFriendlyModel;
        return this.swPetFriendlyModel;
      },
    },
    computedSwPetHouse: {
      get() {
        return this.aditionalInfo.pet_house != null ? this.aditionalInfo.pet_house : this.swPetHouseModel;
      },
      set(model) {
        this.swPetHouseModel = model;
        this.aditionalInfo.pet_house = this.swPetHouseModel;
        return this.swPetHouseModel;
      },
    },
    computedSwPetBasket: {
      get() {
        return this.aditionalInfo.pet_basket != null ? this.aditionalInfo.pet_basket : this.swPetBasketModel;
      },
      set(model) {
        this.swPetBasketModel = model;
        this.aditionalInfo.pet_basket = this.swPetBasketModel;
        return this.swPetBasketModel;
      },
    },
    computedSwOnlyAdults: {
      get() {
        return this.aditionalInfo.only_adults != null ? this.aditionalInfo.only_adults : this.swOnlyAdultsModel;
      },
      set(model) {
        this.swOnlyAdultsModel = model;
        this.aditionalInfo.only_adults = this.swOnlyAdultsModel;
        return this.swOnlyAdultsModel;
      },
    },
    computedSwSanitizedRooms: {
      get() {
        return this.aditionalInfo.sanitized_rooms != null ? this.aditionalInfo.sanitized_rooms : this.swSanitizedRoomsModel;
      },
      set(model) {
        this.swSanitizedRoomsModel = model;
        this.aditionalInfo.sanitized_rooms = this.swSanitizedRoomsModel;
        return this.swSanitizedRoomsModel;
      },
    },
    computedSwBridalSuite: {
      get() {
        return this.aditionalInfo.bridal_suite != null ? this.aditionalInfo.bridal_suite : this.swBridalSuiteModel;
      },
      set(model) {
        this.swBridalSuiteModel = model;
        this.aditionalInfo.bridal_suite = this.swBridalSuiteModel;
        return this.swBridalSuiteModel;
      },
    },
    computedSwVipService: {
      get() {
        return this.aditionalInfo.vip_service != null ? this.aditionalInfo.vip_service : this.swVipServiceModel;
      },
      set(model) {
        this.swVipServiceModel = model;
        this.aditionalInfo.vip_service = this.swVipServiceModel;
        return this.swVipServiceModel;
      },
    },
    computedSwCalefaction: {
      get() {
        return this.aditionalInfo.calefaction != null ? this.aditionalInfo.calefaction : this.swCalefactionModel;
      },
      set(model) {
        this.swCalefactionModel = model;
        this.aditionalInfo.calefaction = this.swCalefactionModel;
        return this.swCalefactionModel;
      },
    },
    computedSwKeepBags: {
      get() {
        return this.aditionalInfo.keep_bags != null ? this.aditionalInfo.keep_bags : this.swKeepBagsModel;
      },
      set(model) {
        this.swKeepBagsModel = model;
        this.aditionalInfo.keep_bags = this.swKeepBagsModel;
        return this.swKeepBagsModel;
      },
    },
    computedSwSecurity24h: {
      get() {
        return this.aditionalInfo.security_24h != null ? this.aditionalInfo.security_24h : this.swSecurity24hModel;
      },
      set(model) {
        this.swSecurity24hModel = model;
        this.aditionalInfo.security_24h = this.swSecurity24hModel;
        return this.swSecurity24hModel;
      },
    },
    computedSwSecurityAlarm: {
      get() {
        return this.aditionalInfo.security_alarm != null ? this.aditionalInfo.security_alarm : this.swSecurityAlarmModel;
      },
      set(model) {
        this.swSecurityAlarmModel = model;
        this.aditionalInfo.security_alarm = this.swSecurityAlarmModel;
        return this.swSecurityAlarmModel;
      },
    },
    computedSwSmookeDetectors: {
      get() {
        return this.aditionalInfo.smoke_detectors != null ? this.aditionalInfo.smoke_detectors : this.swSmookeDetectorsModel;
      },
      set(model) {
        this.swSmookeDetectorsModel = model;
        this.aditionalInfo.smoke_detectors = this.swSmookeDetectorsModel;
        return this.swSmookeDetectorsModel;
      },
    },
    computedSwInSecurityCams: {
      get() {
        return this.aditionalInfo.in_security_cams != null ? this.aditionalInfo.in_security_cams : this.swInSecurityCamsModel;
      },
      set(model) {
        this.swInSecurityCamsModel = model;
        this.aditionalInfo.in_security_cams = this.swInSecurityCamsModel;
        return this.swInSecurityCamsModel;
      },
    },
    computedSwOutSecurityCams: {
      get() {
        return this.aditionalInfo.out_security_cams != null ? this.aditionalInfo.out_security_cams : this.swOutSecurityCamsModel;
      },
      set(model) {
        this.swOutSecurityCamsModel = model;
        this.aditionalInfo.out_security_cams = this.swOutSecurityCamsModel;
        return this.swOutSecurityCamsModel;
      },
    },
    computedSwFireExtinguishers: {
      get() {
        return this.aditionalInfo.fire_extinguishers != null ? this.aditionalInfo.fire_extinguishers : this.swFireExtinguishersModel;
      },
      set(model) {
        this.swFireExtinguishersModel = model;
        this.aditionalInfo.fire_extinguishers = this.swFireExtinguishersModel;
        return this.swFireExtinguishersModel;
      },
    },
    computedSwSafeDepositBox: {
      get() {
        return this.aditionalInfo.safe_deposit_box != null ? this.aditionalInfo.safe_deposit_box : this.swSafeDepositBoxModel;
      },
      set(model) {
        this.swSafeDepositBoxModel = model;
        this.aditionalInfo.safe_deposit_box = this.swSafeDepositBoxModel;
        return this.swSafeDepositBoxModel;
      },
    },
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
