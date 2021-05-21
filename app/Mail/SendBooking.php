<?php

namespace App\Mail;

use App\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
// use Asahasrabuddhe\LaravelMJML\Mail\Mailable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class SendBooking extends Mailable
{
    use Queueable, SerializesModels;
    public $reservation;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.book')->from('anarqueabrn@gmail.com')->subject('Reservacion '.$this->reservation->id.' Enviada');
    }
}
