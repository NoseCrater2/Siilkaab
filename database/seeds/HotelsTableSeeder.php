<?php

use Illuminate\Database\Seeder;
use App\Hotel;

class HotelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Hotel::class,5)->create();
    }
}
