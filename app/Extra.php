<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    protected $fillable =  [
        'title',
        'hotel_id',
        'description',
        'date',
        'amount',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
