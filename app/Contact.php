<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [

        'url',
        'email',
        'phone',
        'address',
        'zipcode',
        'city',
        'state',
        'manager_name',
        'legal_rep',
        'country_id',
        'hotel_id'
           
    ];


    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }


    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'contacts', 'binnacleable_type','binnacleable_id');
    }
}
