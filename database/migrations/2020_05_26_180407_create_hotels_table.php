<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('title')->require();
            $table->string('url')->require();
            $table->string('reference_code')->require();
            $table->string('image')->nullable();
            $table->string('short_text')->nullable();
            $table->text('large_text')->nullable();
            $table->enum('type',['bungalow','cabana','build'])->default('build');
            $table->integer('num_rooms')->default(0);
            $table->integer('num_floors')->default(0);
            $table->boolean('enabled')->default(true);
            $table->unsignedBigInteger('credentials_id')->default(0);
            $table->foreign('credentials_id')->references('id')->on('hotel_credentials');
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
        Schema::dropIfExists('hotels');
    }
}
