<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Binnacle extends Model
{
    protected $fillable= [
        'id',
        'binnacleable_id',
        'actor_id',
        'actor',
        'action',
        'binnacleable_type',
        'body',
    ];

    public function binnacleable()
    {
        return $this->morphTo();
    }
}
