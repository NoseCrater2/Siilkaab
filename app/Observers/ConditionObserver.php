<?php

namespace App\Observers;

use App\Condition;
use App\Traits\SaveBinnacleTrait;

class ConditionObserver
{
    use SaveBinnacleTrait;
    /**
     * Handle the condition "created" event.
     *
     * @param  \App\Condition  $condition
     * @return void
     */
    public function created(Condition $condition)
    {
        $this->track($condition,'CREATED');
    }

    /**
     * Handle the condition "updated" event.
     *
     * @param  \App\Condition  $condition
     * @return void
     */
    public function updated(Condition $condition)
    {
        $this->track($condition,'UPDATED');
    }

    /**
     * Handle the condition "deleted" event.
     *
     * @param  \App\Condition  $condition
     * @return void
     */
    public function deleted(Condition $condition)
    {
        $this->track($condition,'DELETED');
    }

    

    /**
     * Handle the condition "force deleted" event.
     *
     * @param  \App\Condition  $condition
     * @return void
     */
    public function forceDeleted(Condition $condition)
    {
        $this->track($condition,'FORCE DELETED');
    }
}
