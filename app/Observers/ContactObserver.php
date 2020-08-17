<?php

namespace App\Observers;

use App\Contact;
use App\Traits\SaveBinnacleTrait;

class ContactObserver
{

    use SaveBinnacleTrait;
    /**
     * Handle the contact "created" event.
     *
     * @param  \App\Contact  $contact
     * @return void
     */
    public function created(Contact $contact)
    {
        $this->track($contact,'CREATED');
    }

    /**
     * Handle the contact "updated" event.
     *
     * @param  \App\Contact  $contact
     * @return void
     */
    public function updated(Contact $contact)
    {
        $this->track($contact,'UPDATED');
    }

    /**
     * Handle the contact "deleted" event.
     *
     * @param  \App\Contact  $contact
     * @return void
     */
    public function deleted(Contact $contact)
    {
        $this->track($contact,'DELETED');
    }

   

    /**
     * Handle the contact "force deleted" event.
     *
     * @param  \App\Contact  $contact
     * @return void
     */
    public function forceDeleted(Contact $contact)
    {
        $this->track($contact,'FORCE DELETED');
    }
}
