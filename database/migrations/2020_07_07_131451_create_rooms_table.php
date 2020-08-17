<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('name')->required();
            $table->enum('type',['single','double','twin','twin-double','triple','quad','family','suite','studio','apartment','bed-in-room','bungalow','challet','villa','vacation-home','trailer','tent']);
            $table->integer('quantity')->required();
            $table->double('rack_rate')->required();
            $table->string('default_image')->required();
            $table->string('short_text')->nullable();
            $table->text('large_text')->nullable();
            $table->enum('smoking_policy',['yes','no','both'])->nullable();
            $table->enum('pool_near',['all','some','none'])->nullable();
            $table->enum('floor_near',['ground','upper','both'])->nullable();
            $table->double('size')->required();
            $table->enum('size_type',['meters','feets'])->required();
            $table->integer('max_adults')->required();
            $table->integer('max_children')->required();
            $table->integer('max_occpancy')->required();
            $table->double('adult_extra')->nullable();
            $table->double('child_extra')->nullable();
            $table->double('baby_extra')->nullable();
            $table->unsignedBigInteger('hotel_id');
            $table->foreign('hotel_id')->index()->references('id')->on('hotels')->onDelete('cascade');
            $table->unsignedBigInteger('discount_id')->nullable();
            $table->foreign('discount_id')->references('id')->on('discounts');
            $table->unsignedBigInteger('rate_id')->nullable();
            $table->foreign('rate_id')->references('id')->on('rates');
            $table->unsignedBigInteger('extra_id')->nullable();
            $table->foreign('extra_id')->references('id')->on('extras');
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
        Schema::dropIfExists('rooms');
    }
}
