<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['from', 'to'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('to','>=', $from)
                        ->where('from','<=', $to);
    }
}
