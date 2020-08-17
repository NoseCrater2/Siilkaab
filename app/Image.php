<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable =  [
        'image1',
        'image2',
        'image3',
        'image4',
        
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

}
