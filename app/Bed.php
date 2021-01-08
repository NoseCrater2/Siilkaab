<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    //
    protected $fillable = ['type', 'quantity', 'bedroom_id'];
    public function bedroom()
    {
        return $this->belongsTo(Bedroom::class);
    }
}
