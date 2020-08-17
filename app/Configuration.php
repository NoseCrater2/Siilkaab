<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    protected $fillable = [
        'notification_voucher',
        'notification_details',
        'notification_card',
        'timezone',
        'payment_place',
        'payment_type',
        'currency_id',
        'hotel_id'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function currency()
    {
        return $this->belongsTo('App\Currency');
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'configurations', 'binnacleable_type','binnacleable_id');
    }
   
}
