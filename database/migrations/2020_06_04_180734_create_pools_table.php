<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pools', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('name')->required();
            $table->enum('type',['indoor','outdoor'])->default('outdoor');
            $table->boolean('air_conditioned')->default(false);
            $table->boolean('panoramic_view')->default(false);
            $table->boolean('wading_pool')->default(false);
            $table->boolean('towels')->default(false);
            $table->boolean('bar_pool')->default(false);
            $table->time('open_at');
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
        Schema::dropIfExists('pools');
    }
}
