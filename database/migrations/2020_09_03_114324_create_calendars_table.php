<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->enum('type',['success', 'processing', 'default','error','warning'])->default('success');
            $table->string('content');
            $table->tinyInteger('day',false,true);
            $table->string('hour',6);
            $table->tinyInteger('month',false,true);
            $table->mediumInteger('year', false, true);
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
        Schema::dropIfExists('calendars');
    }
}
