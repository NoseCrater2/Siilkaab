<?php

namespace App\Observers;

use App\Regime;
use App\Traits\SaveBinnacleTrait;

class RegimeObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the regime "created" event.
     *
     * @param  \App\Regime  $regime
     * @return void
     */
    public function created(Regime $regime)
    {
        $this->track($regime,'CREATED');
    }

    /**
     * Handle the regime "updated" event.
     *
     * @param  \App\Regime  $regime
     * @return void
     */
    public function updated(Regime $regime)
    {
        $this->track($regime,'UPDATED');
    }

    /**
     * Handle the regime "deleted" event.
     *
     * @param  \App\Regime  $regime
     * @return void
     */
    public function deleted(Regime $regime)
    {
        $this->track($regime,'DELETED');
    }

    /**
     * Handle the regime "force deleted" event.
     *
     * @param  \App\Regime  $regime
     * @return void
     */
    public function forceDeleted(Regime $regime)
    {
        $this->track($regime,'FORCE DELETED');
    }
}
