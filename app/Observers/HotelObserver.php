<?php

namespace App\Observers;

use App\Hotel;
use App\Binnacle;
use App\Traits\SaveBinnacleTrait;

class HotelObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the hotel "created" event.
     *
     * @param  \App\Hotel  $hotel
     * @return void
     */
    public function created(Hotel $hotel)
    {
        $this->track($hotel,'CREATED');
    }

    /**
     * Handle the hotel "updated" event.
     *
     * @param  \App\Hotel  $hotel
     * @return void
     */
    public function updated(Hotel $hotel)
    {
        $this->track($hotel,'UPDATED');
    }

    /**
     * Handle the hotel "deleted" event.
     *
     * @param  \App\Hotel  $hotel
     * @return void
     */
    public function deleted(Hotel $hotel)
    {
        $this->track($hotel,'DELETED');
    }

    /**
     * Handle the hotel "restored" event.
     *
     * @param  \App\Hotel  $hotel
     * @return void
     */
    public function restored(Hotel $hotel)
    {
        //
    }

    /**
     * Handle the hotel "force deleted" event.
     *
     * @param  \App\Hotel  $hotel
     * @return void
     */
    public function forceDeleted(Hotel $hotel)
    {
        $user = auth('api')->user();
        $binnacle = new Binnacle;
        $binnacle->user =  isset($user->name)?$user->name.' '.$user->last_name:null;
        $binnacle->action = 'force_deleted';
        $binnacle->model = 'Hotel';
        $binnacle->details = $hotel->title;
        $binnacle->save();
    }
}
