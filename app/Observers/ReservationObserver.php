<?php

namespace App\Observers;

use App\Reservation;
use App\Binnacle;
use App\Traits\SaveBinnacleTrait;

class ReservationObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the reservation "created" event.
     *
     * @param  \App\Reservation  $reservation
     * @return void
     */
    public function created(Reservation $reservation)
    {
        $this->track($reservation,'CREATED');
    }

    /**
     * Handle the reservation "updated" event.
     *
     * @param  \App\Reservation  $reservation
     * @return void
     */
    public function updated(Reservation $reservation)
    {
        $this->track($reservation,'UPDATED');
    }

    /**
     * Handle the reservation "deleted" event.
     *
     * @param  \App\Reservation  $reservation
     * @return void
     */
    public function deleted(Reservation $reservation)
    {
        $this->track($reservation,'DELETED');
    }

    /**
     * Handle the reservation "restored" event.
     *
     * @param  \App\Reservation  $reservation
     * @return void
     */
    public function restored(Reservation $reservation)
    {
        //
    }

    /**
     * Handle the reservation "force deleted" event.
     *
     * @param  \App\Reservation  $reservation
     * @return void
     */
    public function forceDeleted(Reservation $reservation)
    {
        //
    }
}
