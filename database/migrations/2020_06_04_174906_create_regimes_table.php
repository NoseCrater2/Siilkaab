<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regimes', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->enum('priority',['normal','medium','high'])->default('normal');
            $table->boolean('only_room')->required()->default(false);
            $table->datetime('start_period')->nullable();
            $table->datetime('final_period')->nullable();
            $table->double('lodging_breakfast_children')->default(0.0);
            $table->double('lodging_breakfast_adult')->default(0.0);
            $table->double('half_pension_children')->default(0.0);
            $table->double('half_pension_adult')->default(0.0);
            $table->double('full_pension_children')->default(0.0);
            $table->double('full_pension_adult')->default(0.0);
            $table->double('all_included_children')->default(0.0);
            $table->double('all_included_adult')->default(0.0);
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
        Schema::dropIfExists('regimes');
    }
}
