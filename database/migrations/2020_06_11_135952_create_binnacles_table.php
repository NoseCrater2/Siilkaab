<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBinnaclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('binnacles', function (Blueprint $table) {

            $table->bigIncrements('id')->unsigned();
            $table->string('binnacleable_type');
            // Which record from the table are we referencing
            $table->integer('binnacleable_id')->unsigned();
            // Who made the action
            $table->integer('actor_id')->unsigned();
            $table->string('actor')->nullable();
            $table->text('body')->nullable();
            // What did they do
            $table->string('action')->nullable();
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
        Schema::dropIfExists('binnacles');
    }
}
