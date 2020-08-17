<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Hotel;
use Faker\Generator as Faker;

$factory->define(Hotel::class, function (Faker $faker) {
    return [
     
        'title' => $faker->words(3,true),
        'url' => $faker->url,
        'reference_code' => $faker->word(),
        'image' => url('/img/'),
        'large_text' => $faker->text(),
        'short_text' => $faker->words(5,true),
    ];
});
