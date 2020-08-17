<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    protected $fillable =[
        'name',
        'type',
        'quantity',
        'rack_rate',
        'default_image',
        'large_text',
        'short_text',
        'smoking_policy',
        'pool_near',
        'floor_near',
        'size',
        'size_type',
        'max_adults',
        'max_children',
        'max_occpancy',
        'adult_extra',
        'child_extra',
        'baby_extra',
        'hotel_id',
        'discount_id',
        'rate_id',
        'extra_id',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function bedrooms()
    {
        return $this->hasMany(Bedroom::class);
    }

    public function roomAmenity(){
        return $this->hasOne(RoomAmenity::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'rooms', 'binnacleable_type','binnacleable_id');
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function rate()
    {
        return $this->belongsTo(Rate::class);
    }

    public function extra()
    {
        return $this->belongsTo(Extra::class);
    }

    public function image()
    {
        return $this->hasOne(Image::class);
    }

    public function bookings()
    {
        return $this->HasMany(Booking::class);
    }

    public function availableFor($from, $to): bool
    {
        return 0 ===  $this->bookings()->betweenDates($from, $to)->count();
    }

}
