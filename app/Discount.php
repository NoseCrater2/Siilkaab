<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable =  [
        'type',
        'start',
        'end',
        'day',
        'nights',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'code',
        'unitary_discount',
        'general_discount',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
