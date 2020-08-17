<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBedroomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bedrooms', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->enum('type',['twin','full','queen','king','triple','quad']);
            $table->integer('quantity')->required();
            $table->double('adult_extra')->nullable();
            $table->double('child_extra')->nullable();
            $table->double('baby_extra')->nullable();
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
        Schema::dropIfExists('bedrooms');
    }
}
