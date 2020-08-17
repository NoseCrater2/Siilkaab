<?php

namespace App\Observers;

use App\Restaurant;
use App\Traits\SaveBinnacleTrait;

class RestaurantObserver
{
    use SaveBinnacleTrait;

    /**
     * Handle the restaurant "created" event.
     *
     * @param  \App\Restaurant  $restaurant
     * @return void
     */
    public function created(Restaurant $restaurant)
    {
        $this->track($restaurant,'CREATED');
    }

    /**
     * Handle the restaurant "updated" event.
     *
     * @param  \App\Restaurant  $restaurant
     * @return void
     */
    public function updated(Restaurant $restaurant)
    {
        $this->track($restaurant,'UPDATED');
    }

    /**
     * Handle the restaurant "deleted" event.
     *
     * @param  \App\Restaurant  $restaurant
     * @return void
     */
    public function deleted(Restaurant $restaurant)
    {
        $this->track($restaurant,'DELETED');
    }

   

    /**
     * Handle the restaurant "force deleted" event.
     *
     * @param  \App\Restaurant  $restaurant
     * @return void
     */
    public function forceDeleted(Restaurant $restaurant)
    {
        $this->track($restaurant,'FORCE DELETED');
    }
}
