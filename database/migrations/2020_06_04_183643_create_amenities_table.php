<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmenitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('amenities', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->enum('spa',['free','paid','flag'])->default('flag');#SERVICIOS DESTACADOS
            $table->boolean('air_conditioned')->default(false);
            $table->boolean('no_smoke_rooms')->default(false);
            $table->boolean('air_transfer_service')->default(false);
            $table->boolean('air_collect_service')->default(false);
            $table->boolean('recection_24h')->default(false);
            $table->boolean('gym')->default(false);
            $table->boolean('room_service')->default(false);
            $table->boolean('terrace')->default(false);
            $table->boolean('bar')->default(false);
            $table->boolean('garden')->default(false);
            $table->enum('water_park',['free','paid','flag'])->default('flag');
            $table->enum('beach',['private','in front','flag'])->default('flag');#ACTIVITIES (ACTIVIDADES)
            $table->boolean('recreational_activities')->default(false);
            $table->enum('romantic_dinners',['free','paid','flag'])->default('flag');
            $table->enum('touristic_tour',['free','paid','flag'])->default('flag');
            $table->boolean('guarded_parking')->default(false);#TRANSPORT (TRANSPORTE)
            $table->boolean('street_parking')->default(false);
            $table->boolean('garage_parking')->default(false);
            $table->boolean('special_parking')->default(false);
            $table->boolean('reg_inout_private')->default(false);#RECEPCION SERVICES (SERVICIOS DE RECEPCION)
            $table->boolean('reg_inout_express')->default(false);
            $table->boolean('touristic_info')->default(false);
            $table->boolean('parking_service')->default(false);
            $table->boolean('currency_change')->default(false);
            $table->boolean('outdoor_furniture')->default(false);#COMMON AREAS (ZONAS COMUNES)
            $table->boolean('terrace_solarium')->default(false);
            $table->boolean('shared_dinner')->default(false);
            $table->boolean('shared_salon')->default(false);
            $table->boolean('game_zone')->default(false);
            $table->boolean('library')->default(false);
            $table->enum('daily_housekipping',['free','paid','flag'])->default('flag');#CLEANING SERVICES(SERVICIOS DE LIMPIEZA)
            $table->boolean('laundry_service')->default(false);
            $table->boolean('iron_service')->default(false);
            $table->boolean('meeting_room')->default(false);#BUSINESS FACILITIES(INSTALACIONES DE NEGOCIOS)
            $table->boolean('meeting_center')->default(false);
            $table->boolean('fax_photocopier')->default(false);
            $table->boolean('coffee_break')->default(false);#MISCELLANEOUS (VARIOS)
            $table->boolean('souvenirs_store')->default(false);
            $table->boolean('inclusive_service')->default(false);
            $table->boolean('elevator')->default(false);
            $table->boolean('smoking_zone')->default(false);
            $table->boolean('no_smoking')->default(false);
            $table->boolean('pet_friendly')->default(false);
            $table->boolean('pet_house')->default(false);
            $table->boolean('pet_basket')->default(false);
            $table->boolean('only_adults')->default(false);
            $table->boolean('sanitized_rooms')->default(false);
            $table->boolean('bridal_suite')->default(false);
            $table->boolean('vip_service')->default(false);
            $table->boolean('calefaction')->default(false);

            $table->boolean('keep_bags')->default(false);#seguridaD
            $table->boolean('security_24h')->default(false);
            $table->boolean('security_alarm')->default(false);
            $table->boolean('smoke_detectors')->default(false);
            $table->boolean('in_security_cams')->default(false);
            $table->boolean('out_security_cams')->default(false);
            $table->boolean('fire_extinguishers')->default(false);
            $table->boolean('safe_deposit_box')->default(false);

            $table->unsignedBigInteger('hotel_id');
            $table->foreign('hotel_id')->index()->references('id')->on('hotels')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('amenities');
    }
}
