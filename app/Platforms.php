<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Platforms extends Model
{
    protected $fillable = [
        'name', 'image',
    ];
}
