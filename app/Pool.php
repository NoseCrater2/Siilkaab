<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pool extends Model
{
    protected $fillable = [
        'name',
        'type',
        'air_conditioned',
        'panoramic_view',
        'wading_pool',
        'towels',
        'bar_pool',
        'open_at',
        'hotel_id'
    ];


    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'pools', 'binnacleable_type','binnacleable_id');
    }
}
