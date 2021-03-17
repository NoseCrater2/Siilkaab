<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->integer('nights')->required();
            $table->date('from')->required();
            $table->date('to')->required();
            $table->string('guest_name')->required();
            $table->string('guest_last_name')->required();
            $table->string('guest_country')->required();
            $table->string('guest_names')->required();
            $table->string('guest_email')->required();
            $table->string('guest_phone')->required();
            $table->string('guest_petitions')->required();
            $table->time('check_in')->required();
            $table->decimal('payed',8,2)->required();
            $table->decimal('total_price',8,2)->required();
            $table->enum('state',['Confirmed', 'Cancelled'])->required();
            $table->unsignedBigInteger('hotel_id');
            $table->foreign('hotel_id')->references('id')->on('hotels');
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
        Schema::dropIfExists('reservations');
    }
}
