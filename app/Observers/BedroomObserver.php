<?php

namespace App\Observers;

use App\Bedroom;
use App\Traits\SaveBinnacleTrait;

class BedroomObserver
{

    use SaveBinnacleTrait;
    /**
     * Handle the bedroom "created" event.
     *
     * @param  \App\Bedroom  $bedroom
     * @return void
     */
    public function created(Bedroom $bedroom)
    {
        $this->track($bedroom,'CREATED');
    }

    /**
     * Handle the bedroom "updated" event.
     *
     * @param  \App\Bedroom  $bedroom
     * @return void
     */
    public function updated(Bedroom $bedroom)
    {
        $this->track($bedroom,'UPDATED');
    }

    /**
     * Handle the bedroom "deleted" event.
     *
     * @param  \App\Bedroom  $bedroom
     * @return void
     */
    public function deleted(Bedroom $bedroom)
    {
        $this->track($bedroom,'DELETED');
    }

    

    /**
     * Handle the bedroom "force deleted" event.
     *
     * @param  \App\Bedroom  $bedroom
     * @return void
     */
    public function forceDeleted(Bedroom $bedroom)
    {
        $this->track($bedroom,'FORCE DELETED');
    }
}
