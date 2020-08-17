<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'menu_type',
        'hotel_id'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'restaurants', 'binnacleable_type','binnacleable_id');
    }
}
