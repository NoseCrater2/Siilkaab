<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomAmenitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_amenities', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->boolean('air_conditioning')->default(false); 
            $table->boolean('balcony')->default(false);
            $table->boolean('bathrub')->default(false);
            $table->boolean('view')->default(false);
            $table->boolean('flat_screen')->default(false);
            $table->boolean('private_pool')->default(false);
            $table->boolean('terrace')->default(false);
            $table->boolean('coffe_shop')->default(false);
            $table->boolean('spa_tub')->default(false);
            $table->boolean('childrens_cribs')->default(false);
            $table->boolean('clother_rack')->default(false);
            $table->boolean('drying_rack_clothing')->default(false);
            $table->boolean('fold_up_bed')->default(false);
            $table->boolean('sofa_bed')->default(false);
            $table->boolean('trash_cans')->default(false);
            $table->boolean('heated_pool')->default(false);
            $table->boolean('infinity_pool')->default(false);
            $table->boolean('plunge_pool')->default(false);
            $table->boolean('pool_cover')->default(false);
            $table->boolean('pool_towers')->default(false);
            $table->boolean('pool_with_view')->default(false);
            $table->boolean('shallow_end')->default(false);
            $table->boolean('saltwater_pool')->default(false);
            $table->boolean('wardrobe_closet')->default(false);
            $table->boolean('fan')->default(false);
            $table->boolean('fireplace')->default(false);
            $table->boolean('heating')->default(false);
            $table->boolean('interconnecting_rooms')->default(false);
            $table->boolean('iron_facilities')->default(false);
            $table->boolean('mosquito_net')->default(false);
            $table->boolean('private_entrance')->default(false);
            $table->boolean('safe')->default(false);
            $table->boolean('sofa')->default(false);
            $table->boolean('sitting_area')->default(false);
            $table->boolean('electric_blankets')->default(false);
            $table->boolean('pajamas')->default(false);
            $table->boolean('socket_near_bed')->default(false);
            $table->boolean('private_bath')->default(false);
            $table->boolean('shared_bath')->default(false);
            $table->boolean('bathhub_shower')->default(false);
            $table->boolean('bathrobe')->default(false);
            $table->boolean('free_toileters')->default(false);
            $table->boolean('hairdryer')->default(false);
            $table->boolean('sauna')->default(false);
            $table->boolean('shower')->default(false);
            $table->boolean('slippers')->default(false);
            $table->boolean('additional_bathroom')->default(false);
            $table->boolean('toothbrush')->default(false);
            $table->boolean('shampoo')->default(false);
            $table->boolean('conditioner')->default(false);
            $table->boolean('body_soap')->default(false);
            $table->boolean('channel_cable')->default(false);
            $table->boolean('paypervierw_channles')->default(false);
            $table->boolean('laptop_safe')->default(false);
            $table->boolean('satellite_channels')->default(false);
            $table->boolean('telephone')->default(false);
            $table->boolean('tv')->default(false);
            $table->boolean('video')->default(false);
            $table->boolean('key_card_access')->default(false);
            $table->boolean('alarm_clock')->default(false);
            $table->boolean('key_access')->default(false);
            $table->boolean('wakeup_service')->default(false);
            $table->boolean('linens')->default(false);
            $table->boolean('towels')->default(false);
            $table->boolean('city_view')->default(false);
            $table->boolean('garden_view')->default(false);
            $table->boolean('lake_view')->default(false);
            $table->boolean('landmark_view')->default(false);
            $table->boolean('ocean_view')->default(false);
            $table->boolean('carbon_monixide_detector')->default(false);
            $table->boolean('carbon_monoxide_sources')->default(false);
            $table->boolean('smoke_alarm')->default(false);
            $table->boolean('fire_extinguisher')->default(false);
            $table->boolean('air_purifiers')->default(false);
            $table->unsignedBigInteger('room_id');
            $table->foreign('room_id')->index()->references('id')->on('rooms')->onDelete('cascade');
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
        Schema::dropIfExists('room_amenities');
    }
}
