<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelCredentialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotel_credentials', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('paypal')->nullable();
            $table->string('mercadopago_at')->nullable();
            $table->string('mercadopago_rt')->nullable();
            $table->string('mercadopago_client_id')->nullable();
            $table->integer('expiration_at')->nullable();
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
        Schema::dropIfExists('hotel_credentials');
    }
}
