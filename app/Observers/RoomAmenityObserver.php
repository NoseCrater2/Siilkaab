<?php

namespace App\Observers;

use App\RoomAmenity;
use App\Traits\SaveBinnacleTrait;

class RoomAmenityObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the room amenity "created" event.
     *
     * @param  \App\RoomAmenity  $roomAmenity
     * @return void
     */
    public function created(RoomAmenity $roomAmenity)
    {
        $this->track($roomAmenity,'CREATED');
    }

    /**
     * Handle the room amenity "updated" event.
     *
     * @param  \App\RoomAmenity  $roomAmenity
     * @return void
     */
    public function updated(RoomAmenity $roomAmenity)
    {
        $this->track($roomAmenity,'UPDATED');
    }

    /**
     * Handle the room amenity "deleted" event.
     *
     * @param  \App\RoomAmenity  $roomAmenity
     * @return void
     */
    public function deleted(RoomAmenity $roomAmenity)
    {
        $this->track($roomAmenity,'DELETED');
    }

    /**
     * Handle the room amenity "force deleted" event.
     *
     * @param  \App\RoomAmenity  $roomAmenity
     * @return void
     */
    public function forceDeleted(RoomAmenity $roomAmenity)
    {
        $this->track($roomAmenity,'FORCE DELETED');
    }
}
