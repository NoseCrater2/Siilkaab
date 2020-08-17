<?php

namespace App\Observers;

use App\HotelUser;
use App\Binnacle;

class HotelUserObserver
{
    /**
     * Handle the hotel user "created" event.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return void
     */
    public function created(HotelUser $hotelUser)
    {
        
    }

    /**
     * Handle the hotel user "updated" event.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return void
     */
    public function updated(HotelUser $hotelUser)
    {
        //
    }

    /**
     * Handle the hotel user "deleted" event.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return void
     */
    public function deleted(HotelUser $hotelUser)
    {
       
    }

    /**
     * Handle the hotel user "restored" event.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return void
     */
    public function restored(HotelUser $hotelUser)
    {
        //
    }

    /**
     * Handle the hotel user "force deleted" event.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return void
     */
    public function forceDeleted(HotelUser $hotelUser)
    {
        //
    }
}
