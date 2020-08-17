<?php

namespace App\Observers;

use App\User;
use App\Traits\SaveBinnacleTrait;
use Illuminate\Support\Facades\Mail;

class UserObserver
{

    use SaveBinnacleTrait;
    /**
     * Handle the user "created" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function created(User $user)
    {
       
        $this->track($user,'CREATED');
    }

    /**
     * Handle the user "updated" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function updated(User $user)
    {

        $this->track($user,'UPDATED');
       
    }

    /**
     * Handle the user "deleted" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function deleted(User $user)
    {
        $this->track($user,'DELETED');
    }

    /**
     * Handle the user "force deleted" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        $this->track($user,'FORCE DELETED');
    }
}
