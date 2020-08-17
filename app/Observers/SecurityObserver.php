<?php

namespace App\Observers;

use App\Security;
use App\Traits\SaveBinnacleTrait;

class SecurityObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the security "created" event.
     *
     * @param  \App\Security  $security
     * @return void
     */
    public function created(Security $security)
    {
        $this->track($security,'CREATED');
    }

    /**
     * Handle the security "updated" event.
     *
     * @param  \App\Security  $security
     * @return void
     */
    public function updated(Security $security)
    {
        $this->track($security,'UPDATED');
    }

    /**
     * Handle the security "deleted" event.
     *
     * @param  \App\Security  $security
     * @return void
     */
    public function deleted(Security $security)
    {
        $this->track($security,'DELETED');
    }

    

    /**
     * Handle the security "force deleted" event.
     *
     * @param  \App\Security  $security
     * @return void
     */
    public function forceDeleted(Security $security)
    {
        $this->track($security,'FORCE DELETED');
    }
}
