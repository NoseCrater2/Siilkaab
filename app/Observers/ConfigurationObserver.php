<?php

namespace App\Observers;

use App\Configuration;
use App\Traits\SaveBinnacleTrait;


class ConfigurationObserver
{

    use SaveBinnacleTrait;

    /**
     * Handle the configuration "created" event.
     *
     * @param  \App\Configuration  $configuration
     * @return void
     */
    public function created(Configuration $configuration)
    {
        $this->track($configuration,'CREATED');
    }

    /**
     * Handle the configuration "updated" event.
     *
     * @param  \App\Configuration  $configuration
     * @return void
     */
    public function updated(Configuration $configuration)
    {
        $this->track($configuration,'UPDATED');
    }

    /**
     * Handle the configuration "deleted" event.
     *
     * @param  \App\Configuration  $configuration
     * @return void
     */
    public function deleted(Configuration $configuration)
    {
        $this->track($configuration,'DELETED');

    }

    

    /**
     * Handle the configuration "force deleted" event.
     *
     * @param  \App\Configuration  $configuration
     * @return void
     */
    public function forceDeleted(Configuration $configuration)
    {
        $this->track($configuration,'FORCE DELETED');
    }
}
