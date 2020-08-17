<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Security extends Model
{
    protected $fillable = [
        'alltime_security',
        'security_alarm',
        'smoke_alarm',
        'cctv_indoor',
        'cctv_outoor',
        'fire_extinguishers',
        'safe',
        'hotel_id'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'security', 'binnacleable_type','binnacleable_id');
    }
}
