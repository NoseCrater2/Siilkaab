<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('url')->nullable();
            $table->string('email')->required();
            $table->string('phone')->required();
            $table->string('address')->required();
            $table->string('zipcode')->required();
            $table->string('city')->required();
            $table->string('state')->required();
            $table->string('manager_name')->required();
            $table->string('legal_rep')->required();
            $table->unsignedBigInteger('country_id');
            $table->unsignedBigInteger('hotel_id');
            $table->foreign('country_id')->references('id')->on('countries');
            $table->foreign('hotel_id')->references('id')->on('hotels')->onDelete('cascade');
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
        Schema::dropIfExists('contacts');
    }
}
