<template>
  <div>
    <v-card class="pa-2" outlined tile>
      <!--Contenido del card-->
      <!--AMENIDADES-->
      <div v-if="hotel!==null">
        <v-banner single-line>
          <div class="flexed">
            <v-icon class="iconsInformation" left>mdi-tag-multiple</v-icon>
            <h3>Información adicional</h3>
          </div>
        </v-banner>
        <div class="pa-4">
          <v-col cols="12" sm="6" md="12">
            <v-expansion-panels focusable accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="#b2b2b2">
                  <strong>Informacion de propiedad</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Numero de habitaciones</strong>
                        </span>
                        <v-text-field class="ml-auto" v-model="aditionalInfo.num_rooms" required></v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Numero de pisos</strong>
                        </span>
                        <v-text-field class="ml-auto" v-model="aditionalInfo.num_floors" required></v-text-field>
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
                  <strong>Servicios destacados</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Spa</strong>
                        </span>
                        <v-autocomplete
                          class="ml-auto"
                          :items="spaItems"
                          v-model="ddwnSpa"
                          dense
                          filled
                        ></v-autocomplete>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Aire acondicionado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swAirConditioned" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Habitaciones libres de humo de tabaco</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swNoSmokeRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio por traslado a aeropuerto(transfer)</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swAirTransferService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio por traslado a hotel(collect)</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swAirCollectService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Recepcion las 24 horas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swRecection_24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Gimnasio</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swGym" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio a la habitación</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swRoomService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Terraza</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swTerrace" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Bar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swBar" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Jardin</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swGarden" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Parque acuatico</strong>
                        </span>
                        <v-autocomplete
                          class="ml-auto"
                          :items="acuaticItems"
                          v-model="ddwnAcuatic"
                          dense
                          filled
                        ></v-autocomplete>
                      </v-card>
                    </v-col>
                    <v-col cols="12" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 2%">
                        <CarrouselRestaurant></CarrouselRestaurant>
                      </v-card>
                    </v-col>
                    <v-col cols="12" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 2%">
                        <CarrouselPool></CarrouselPool>
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
                  <strong>Actividades</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Playa</strong>
                        </span>
                        <v-autocomplete
                          class="ml-auto"
                          :items="beachItems"
                          v-model="ddwnBeach"
                          dense
                          filled
                        ></v-autocomplete>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Actividades recreativas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swRecreationalActivities" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Cena romantica</strong>
                        </span>
                        <v-autocomplete
                          class="ml-auto"
                          :items="romanticDItems"
                          v-model="ddwnRomanticD"
                          dense
                          filled
                        ></v-autocomplete>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Tour turistico</strong>
                        </span>
                        <v-autocomplete
                          class="ml-auto"
                          :items="touristicTItems"
                          v-model="ddwnTouristicT"
                          dense
                          filled
                        ></v-autocomplete>
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
                        <v-switch class="ml-auto" v-model="swGuardedParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento en la calle</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swStreetParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento en un garaje</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swGarageParking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Estacionamiento adaptado para personas de movilidad reducida</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSpecialParking" inset></v-switch>
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
                        <v-switch class="ml-auto" v-model="swReg_inout_private" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Registro express</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swReg_inout_express" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Informacion turistica</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swTouristicInfo" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de estacionamiento</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swParkingService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Cambio de divisas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swCurrencyChange" inset></v-switch>
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
                        <v-switch class="ml-auto" v-model="swOutdoorFurniture" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Terraza/Solárium</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swTerraceSolarium" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Comedor compartido</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSharedDinner" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Salon compartido</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSharedSalon" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Zona de juegos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swGameZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Biblioteca</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swLibrary" inset></v-switch>
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
                        <v-autocomplete
                          class="ml-auto"
                          :items="dailyHItems"
                          v-model="ddwnDailyH"
                          dense
                          filled
                        ></v-autocomplete>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de lavanderia</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swLaundryService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio de planchado</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swIronService" inset></v-switch>
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
                        <v-switch class="ml-auto" v-model="swMeetingRoom" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Centro de reuniones</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swMeetingCenter" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Fax/Fotocopiadora</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swFaxPhotocopier" inset></v-switch>
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
                        <v-switch class="ml-auto" v-model="swCoffeeBreak" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Tienda de recuerdos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSouvenirsStore" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio para personas con capacidades reducidas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swInclusiveService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Elevador</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swElevator" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Area para fumar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSmokingZone" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>No fumar</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swNoSmoking" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Pet friendly</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swPetFriendly" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Casa para mascotas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swPetHouse" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Pet basket</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swPetBasket" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Solo adultos</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swOnlyAdults" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Habitaciones sanitizadas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSanitizedRooms" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Suite nupcial</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swBridalSuite" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Servicio VIP</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swVipService" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Calefacción</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swCalefaction" inset></v-switch>
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
                        <v-switch class="ml-auto" v-model="swKeepBags" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Seguridad las 24 horas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSecurity24h" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Alarma de seguridad</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSecurityAlarm" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Detectores de humo</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSmookeDetectors" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Camaras de seguridad internas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swInSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Camaras de seguridad externas</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swOutSecurityCams" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; margin-right: 7%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Extintor de incendios</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swFireExtinguishers" inset></v-switch>
                      </v-card>
                    </v-col>
                    <v-col cols="6" style="margin-bottom: 1%">
                      <v-card outlined style="padding: 5%; display: flex">
                        <span class="d-flex align-center" style="margin-right: 5%">
                          <strong>Caja fuerte</strong>
                        </span>
                        <v-switch class="ml-auto" v-model="swSafeDepositBox" inset></v-switch>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </div>
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
    if (this.aditionalInfo.spa != null) {
      if (this.aditionalInfo.spa == "free") {
        this.ddwnSpa = "Gratis";
      }
      if (this.aditionalInfo.spa == "paid") {
        this.ddwnSpa = "De Pago";
      }
      if (this.aditionalInfo.spa == "flag") {
        this.ddwnSpa = "Flag";
      }
    }
    if (this.aditionalInfo.water_park != null) {
      if (this.aditionalInfo.water_park == "free") {
        this.ddwnAcuatic = "Gratis";
      }
      if (this.aditionalInfo.water_park == "paid") {
        this.ddwnAcuatic = "De Pago";
      }
      if (this.aditionalInfo.water_park == "flag") {
        this.ddwnAcuatic = "Flag";
      }
    }
    if (this.aditionalInfo.beach != null) {
      if (this.aditionalInfo.beach == "private") {
        this.ddwnBeach = "Privada";
      }
      if (this.aditionalInfo.beach == "in front") {
        this.ddwnBeach = "En frente";
      }
      if (this.aditionalInfo.beach == "flag") {
        this.ddwnBeach = "Flag";
      }
    }
    if (this.aditionalInfo.romantic_dinners != null) {
      if (this.aditionalInfo.romantic_dinners == "free") {
        this.ddwnRomanticD = "Gratis";
      }
      if (this.aditionalInfo.romantic_dinners == "paid") {
        this.ddwnRomanticD = "De pago";
      }
      if (this.aditionalInfo.romantic_dinners == "flag") {
        this.ddwnRomanticD = "Flag";
      }
    }
    if (this.aditionalInfo.touristic_tour != null) {
      if (this.aditionalInfo.touristic_tour == "free") {
        this.ddwnTouristicT = "Gratis";
      }
      if (this.aditionalInfo.touristic_tour == "paid") {
        this.ddwnTouristicT = "De pago";
      }
      if (this.aditionalInfo.touristic_tour == "flag") {
        this.ddwnTouristicT = "Flag";
      }
    }
    if (this.aditionalInfo.daily_housekipping != null) {
      if (this.aditionalInfo.daily_housekipping == "free") {
        this.ddwnDailyH = "Gratis";
      }
      if (this.aditionalInfo.daily_housekipping == "paid") {
        this.ddwnDailyH = "De pago";
      }
      if (this.aditionalInfo.daily_housekipping == "flag") {
        this.ddwnDailyH = "Flag";
      }
    }
    (this.swAirConditioned = this.aditionalInfo.air_conditioned),
      (this.swNoSmokeRooms = this.aditionalInfo.no_smoke_rooms),
      (this.swAirTransferService = this.aditionalInfo.air_transfer_service),
      (this.swAirCollectService = this.aditionalInfo.air_collect_service),
      (this.swRecection_24h = this.aditionalInfo.recection_24h),
      (this.swGym = this.aditionalInfo.gym),
      (this.swRoomService = this.aditionalInfo.room_service),
      (this.swTerrace = this.aditionalInfo.terrace),
      (this.swBar = this.aditionalInfo.bar),
      (this.swGarden = this.aditionalInfo.garden),
      (this.swRecreationalActivities = this.aditionalInfo.recreational_activities),
      (this.swGuardedParking = this.aditionalInfo.guarded_parking),
      (this.swStreetParking = this.aditionalInfo.street_parking),
      (this.swGarageParking = this.aditionalInfo.garage_parking),
      (this.swSpecialParking = this.aditionalInfo.special_parking),
      (this.swReg_inout_private = this.aditionalInfo.reg_inout_private),
      (this.swReg_inout_express = this.aditionalInfo.reg_inout_express),
      (this.swTouristicInfo = this.aditionalInfo.touristic_info),
      (this.swParkingService = this.aditionalInfo.parking_service),
      (this.swCurrencyChange = this.aditionalInfo.currency_change),
      (this.swOutdoorFurniture = this.aditionalInfo.outdoor_furniture),
      (this.swTerraceSolarium = this.aditionalInfo.terrace_solarium),
      (this.swSharedDinner = this.aditionalInfo.shared_dinner),
      (this.swSharedSalon = this.aditionalInfo.shared_salon),
      (this.swGameZone = this.aditionalInfo.game_zone),
      (this.swLibrary = this.aditionalInfo.library),
      (this.swLaundryService = this.aditionalInfo.laundry_service),
      (this.swIronService = this.aditionalInfo.iron_service),
      (this.swMeetingRoom = this.aditionalInfo.meeting_room),
      (this.swMeetingCenter = this.aditionalInfo.meeting_center),
      (this.swFaxPhotocopier = this.aditionalInfo.fax_photocopier),
      (this.swCoffeeBreak = this.aditionalInfo.coffee_break),
      (this.swSouvenirsStore = this.aditionalInfo.souvenirs_store),
      (this.swInclusiveService = this.aditionalInfo.inclusive_service),
      (this.swElevator = this.aditionalInfo.elevator),
      (this.swSmokingZone = this.aditionalInfo.smoking_zone),
      (this.swNoSmoking = this.aditionalInfo.no_smoking),
      (this.swPetFriendly = this.aditionalInfo.pet_friendly),
      (this.swPetHouse = this.aditionalInfo.pet_house),
      (this.swPetBasket = this.aditionalInfo.PetBasket),
      (this.swOnlyAdults = this.aditionalInfo.only_adults),
      (this.swSanitizedRooms = this.aditionalInfo.sanitized_rooms),
      (this.swBridalSuite = this.aditionalInfo.bridal_suite),
      (this.swVipService = this.aditionalInfo.vip_service),
      (this.swCalefaction = this.aditionalInfo.calefaction),
      (this.swKeepBags = this.aditionalInfo.keep_bags);
    (this.swSecurity24h = this.aditionalInfo.security_24h),
      (this.swSecurityAlarm = this.aditionalInfo.security_alarm),
      (this.swSmookeDetectors = this.aditionalInfo.smoke_detectors),
      (this.swInSecurityCams = this.aditionalInfo.in_security_cams),
      (this.swOutSecurityCams = this.aditionalInfo.out_security_cams),
      (this.swFireExtinguishers = this.aditionalInfo.fire_extinguishers),
      (this.swSafeDepositBox = this.aditionalInfo.safe_deposit_box);
  },
  updated() {
    if (this.ddwnSpa == "Gratis") {
      this.aditionalInfo.spa = "free";
    }
    if (this.ddwnSpa == "De Pago") {
      this.aditionalInfo.spa = "paid";
    }
    if (this.ddwnSpa == "Flag") {
      this.aditionalInfo.spa = "flag";
    }

    if (this.ddwnAcuatic == "Gratis") {
      this.aditionalInfo.water_park = "free";
    }
    if (this.ddwnAcuatic == "De Pago") {
      this.aditionalInfo.water_park = "paid";
    }
    if (this.ddwnAcuatic == "Flag") {
      this.aditionalInfo.water_park = "flag";
    }

    if (this.ddwnBeach == "Privada") {
      this.aditionalInfo.beach = "private";
    }
    if (this.ddwnBeach == "En frente") {
      this.aditionalInfo.beach = "in front";
    }
    if (this.ddwnBeach == "Flag") {
      this.aditionalInfo.beach = "flag";
    }

    if (this.ddwnRomanticD == "Gratis") {
      this.aditionalInfo.romantic_dinners = "free";
    }
    if (this.ddwnRomanticD == "De Pago") {
      this.aditionalInfo.romantic_dinners = "paid";
    }
    if (this.ddwnRomanticD == "Flag") {
      this.aditionalInfo.romantic_dinners = "flag";
    }

    if (this.ddwnTouristicT == "Gratis") {
      this.aditionalInfo.touristic_tour = "free";
    }
    if (this.ddwnTouristicT == "De Pago") {
      this.aditionalInfo.touristic_tour = "paid";
    }
    if (this.ddwnTouristicT == "Flag") {
      this.aditionalInfo.touristic_tour = "flag";
    }

    if (this.ddwnDailyH == "Gratis") {
      this.aditionalInfo.daily_housekipping = "free";
    }
    if (this.ddwnDailyH == "De Pago") {
      this.aditionalInfo.daily_housekipping = "paid";
    }
    if (this.ddwnDailyH == "Flag") {
      this.aditionalInfo.daily_housekipping = "flag";
    }
  },
  data() {
    return {
      spaItems: ["Gratis", "De Pago", "Flag"],
      ddwnSpa: null,
      acuaticItems: ["Gratis", "De Pago", "Flag"],
      ddwnAcuatic: null,
      beachItems: ["Privada", "En frente", "Flag"],
      ddwnBeach: null,
      romanticDItems: ["Gratis", "De Pago", "Flag"],
      ddwnRomanticD: null,
      touristicTItems: ["Gratis", "De Pago", "Flag"],
      ddwnTouristicT: null,
      dailyHItems: ["Gratis", "De Pago", "Flag"],
      ddwnDailyH: null,
      swAirConditioned: null,
      swNoSmokeRooms: null,
      swAirTransferService: null,
      swAirCollectService: null,
      swRecection_24h: null,
      swGym: null,
      swRoomService: null,
      swTerrace: null,
      swBar: null,
      swGarden: null,
      swRecreationalActivities: null,
      swGuardedParking: null,
      swStreetParking: null,
      swGarageParking: null,
      swSpecialParking: null,
      swReg_inout_private: null,
      swReg_inout_express: null,
      swTouristicInfo: null,
      swParkingService: null,
      swCurrencyChange: null,
      swOutdoorFurniture: null,
      swTerraceSolarium: null,
      swSharedDinner: null,
      swSharedSalon: null,
      swGameZone: null,
      swLibrary: null,
      swLaundryService: null,
      swIronService: null,
      swMeetingRoom: null,
      swMeetingCenter: null,
      swFaxPhotocopier: null,
      swCoffeeBreak: null,
      swSouvenirsStore: null,
      swInclusiveService: null,
      swElevator: null,
      swSmokingZone: null,
      swNoSmoking: null,
      swPetFriendly: null,
      swPetHouse: null,
      swPetBasket: null,
      swOnlyAdults: null,
      swSanitizedRooms: null,
      swBridalSuite: null,
      swVipService: null,
      swCalefaction: null,
      swKeepBags: null,

      swSecurity24h: null,
      swSecurityAlarm: null,
      swSmookeDetectors: null,
      swInSecurityCams: null,
      swOutSecurityCams: null,
      swFireExtinguishers: null,
      swSafeDepositBox: null,
    };
  },
  computed: {
    ...mapState({
      hotel: (state) => state.HotelModule.hotel,
      aditionalInfo: (state) => state.HotelModule.aditionalInfo,
    }),
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
.flexed {
  display: flex;
}

.v-expansion-panel-header {
  color: white;
}

.v-expansion-panel-content {
  margin-top: 2%;
}
</style>