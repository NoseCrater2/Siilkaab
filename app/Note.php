<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'content', 
        'reservation_id',
        'user_id',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
