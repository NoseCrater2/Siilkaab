<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
    protected $fillable = [
        'adults',
        'children_age',
        'adults_age',
        'adults_regimen',
        'checkin_time',
        'checkout_time',
        'cancelation_text',
        'hotel_id'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'conditions', 'binnacleable_type','binnacleable_id');
    }
   
}
