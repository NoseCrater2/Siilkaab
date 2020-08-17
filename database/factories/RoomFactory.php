<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Room;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;


$suffix = [
    'single',
    'double',
    'twin',
    'twin-double',
    'triple',
    'quad',
    'family',
    'suite',
    'studio',
    'apartment',
    'bed-in-room',
    'bungalow',
    'challet',
    'villa',
    'vacation-home',
    'trailer',
    'tent'
];

$factory->define(Room::class, function (Faker $faker) use ($suffix){
    return [
        //'title' => $faker->city . ' '. ,
        'name' => $faker->words(3,true),
        'type' => Arr::random($suffix),
        'quantity' => $faker->numberBetween(1,5),
        'rack_rate' => $faker->numberBetween(300,1000),
        'default_image' => $faker->imageUrl(640,480),
        'large_text' => $faker->realText(200,2),
        'short_text' => $faker->realText(100,2),
        'smoking_policy' => $faker->randomElement(['yes','no','both']),
        'pool_near' => $faker->randomElement(['all','some','none']),
        'floor_near' => $faker->randomElement(['ground','upper','both']),
        'size' => $faker->numberBetween(9,30),
        'size_type' => $faker->randomElement(['meters','feets']),
        'max_adults' => $faker->numberBetween(1,10),
        'max_children' => $faker->numberBetween(1,10),
        'max_occpancy' => $faker->numberBetween(1,20),
        'adult_extra' => $faker->numberBetween(0,300),
        'child_extra' => $faker->numberBetween(0,300),
        'baby_extra' => $faker->numberBetween(0,300),
        'hotel_id' => $faker->numberBetween(1,5),
    ];
});
