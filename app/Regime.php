<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regime extends Model
{
    protected $fillable = [
        'special',
        'only_room',
        'start_period',
        'final_period',
        'lodging_breakfast_children',
        'lodging_breakfast_adult',
        'half_pension_children',
        'half_pension_adult',
        'full_pension_children',
        'full_pension_adult',
        'all_included_children',
        'all_included_adult',
        'hotel_id'
    ];

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'regimes', 'binnacleable_type','binnacleable_id');
    }
}
