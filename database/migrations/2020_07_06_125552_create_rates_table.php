<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rates', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->enum('type',['room','person'])->default('room');
            $table->double('rack')->default(0.0);
            $table->double('monday')->default(0.0);
            $table->double('tuesday')->default(0.0);
            $table->double('wednesday')->default(0.0);
            $table->double('thursday')->default(0.0);
            $table->double('friday')->default(0.0);
            $table->double('saturday')->default(0.0);
            $table->double('sunday')->default(0.0);
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
        Schema::dropIfExists('rates');
    }
}
