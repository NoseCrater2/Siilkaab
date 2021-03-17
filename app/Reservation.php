<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable =  [
        'nights',
        'from',
        'to',
        'guest_name',
        'guest_last_name',
        'guest_country',
        'guest_names',
        'guest_email',
        'guest_phone',
        'guest_petitions',
        'check_in',
        'payed',
        'total_price',
        'state',
        'hotel_id',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'reservations', 'binnacleable_type','binnacleable_id');
    }
}
