<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable =  [
        'name',
        'room_id',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

}
