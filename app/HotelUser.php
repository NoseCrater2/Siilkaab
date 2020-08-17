<?php

namespace App;

use App\Hotel;
use App\User;
use Illuminate\Database\Eloquent\Relations\Pivot;

class HotelUser extends Pivot
{
    public $incrementing = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
