<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConditionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conditions', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->boolean('adults')->default(false);
            $table->integer('children_age')->nullable();
            $table->integer('adults_age')->required();
            $table->integer('adults_regimen')->nullable();
            $table->time('checkin_time')->required();
            $table->time('checkout_time')->required();
            $table->text('cancelation_text')->required();
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
        Schema::dropIfExists('conditions');
    }
}
