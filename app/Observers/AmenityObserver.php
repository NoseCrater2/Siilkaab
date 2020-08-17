<?php

namespace App\Observers;

use App\Amenity;
use App\Binnacle;
use App\Traits\SaveBinnacleTrait;

class AmenityObserver
{

    use SaveBinnacleTrait;
    /**
     * Handle the amenity "created" event.
     *
     * @param  \App\Amenity  $amenity
     * @return void
     */
    public function created(Amenity $amenity)
    {
        $this->track($amenity,'CREATED');
    }

    /**
     * Handle the amenity "updated" event.
     *
     * @param  \App\Amenity  $amenity
     * @return void
     */
    public function updated(Amenity $amenity)
    {
        $this->track($amenity,'UPDATED');
    }

    /**
     * Handle the amenity "deleted" event.
     *
     * @param  \App\Amenity  $amenity
     * @return void
     */
    public function deleted(Amenity $amenity)
    {
        $this->track($amenity,'DELETED');
    }

   

    /**
     * Handle the amenity "force deleted" event.
     *
     * @param  \App\Amenity  $amenity
     * @return void
     */
    public function forceDeleted(Amenity $amenity)
    {
        $this->track($amenity,'FORCE DELETED');
    }
}
