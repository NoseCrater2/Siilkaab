<?php

namespace App\Mail;

use App\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ChangedState extends Mailable
{
    use Queueable, SerializesModels;
    public $reservation;
    public $pastState;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Reservation $reservation, $pastState)
    {
        $this->reservation = $reservation;
        $this->pastState = $pastState;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.changedstate')->from(['address' => $this->reservation->hotel->contact->email, 'name' => $this->reservation->hotel->title])->subject('CAMBIO DE ESTADO DE RESERVACIÓN');
    }
}
