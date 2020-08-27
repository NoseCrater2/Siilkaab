<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HotelCredentials extends Model
{
    protected $fillable = [
        'paypal',
        'mercadopago_at',
        'mercadopago_rt',
        'mercadopago_client_id',
        'expiration_at'
    ];

    protected $hidden = [
        'mercadopago_at', 'mercadopago_rt'
    ];
    
    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }
}
