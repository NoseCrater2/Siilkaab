<?php

namespace App\Observers;

use App\Pool;
use App\Traits\SaveBinnacleTrait;

class PoolObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the pool "created" event.
     *
     * @param  \App\Pool  $pool
     * @return void
     */
    public function created(Pool $pool)
    {
        $this->track($pool,'CREATED');
    }

    /**
     * Handle the pool "updated" event.
     *
     * @param  \App\Pool  $pool
     * @return void
     */
    public function updated(Pool $pool)
    {
        $this->track($pool,'UPDATED');
    }

    /**
     * Handle the pool "deleted" event.
     *
     * @param  \App\Pool  $pool
     * @return void
     */
    public function deleted(Pool $pool)
    {
        $this->track($pool,'DELETED');
    }

    

    /**
     * Handle the pool "force deleted" event.
     *
     * @param  \App\Pool  $pool
     * @return void
     */
    public function forceDeleted(Pool $pool)
    {
        $this->track($pool,'FORCE DELETED');
    }
}
