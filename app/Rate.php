<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $fillable =  [
        'type',
        'rack',
        'start',
        'end',
        'day',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'room_id'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
