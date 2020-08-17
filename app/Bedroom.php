<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bedroom extends Model
{
    protected $fillable = [
        'type',
        'quantity',
        'adult_extra',
        'child_extra',
        'baby_extra',
        'room_id',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'bedrooms', 'binnacleable_type','binnacleable_id');
    }

}
