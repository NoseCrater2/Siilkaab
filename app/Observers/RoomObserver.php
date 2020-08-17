<?php

namespace App\Observers;

use App\Room;
use App\Traits\SaveBinnacleTrait;

class RoomObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the = room "created" event.
     *
     * @param  \App\=Room  $=Room
     * @return void
     */
    public function created(Room $room)
    {
        $this->track($room,'CREATED');
    }

    /**
     * Handle the = room "updated" event.
     *
     * @param  \App\=Room  $=Room
     * @return void
     */
    public function updated(Room $room)
    {
        $this->track($room,'UPDATED');
    }

    /**
     * Handle the = room "deleted" event.
     *
     * @param  \App\=Room  $=Room
     * @return void
     */
    public function deleted(Room $room)
    {
        $this->track($room,'DELETED');
    }

    /**
     * Handle the = room "force deleted" event.
     *
     * @param  \App\=Room  $=Room
     * @return void
     */
    public function forceDeleted(Room $room)
    {
        $this->track($room,'FORCE DELETED');
    }
}
