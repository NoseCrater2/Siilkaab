<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecuritiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('securities', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->boolean('alltime_security')->default(false);
            $table->boolean('security_alarm')->default(false);
            $table->boolean('smoke_alarm')->default(false);
            $table->boolean('cctv_indoor')->default(false);
            $table->boolean('cctv_outoor')->default(false);
            $table->boolean('fire_extinguishers')->default(false);
            $table->enum('safe',['free','paid','flag'])->default('flag');
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
        Schema::dropIfExists('securities');
    }
}
