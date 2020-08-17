<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = [
        'name',
        'code',
        'symbol',
    ];
    

    public function configurations()
    {
        $this->hasMany(Configuration::class);
    }


    public function users()
    {
        $this->hasMany(User::class);
    }
}
