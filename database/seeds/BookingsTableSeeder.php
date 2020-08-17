<?php

use App\Booking;
use App\Room;

use Illuminate\Database\Seeder;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Room::all()->each(function(Room $room){
            $booking = factory(Booking::class)->make();
            $bookings = collect([$booking]);

            for($i = 0; $i < random_int(1,20); $i++){
                $from = (clone $booking->to)->addDays(random_int(1,14));
                $to = (clone $from)->addDays(random_int(0,14));

                $booking = Booking::make([
                    'from' => $from,
                    'to' => $to
                ]);

                $bookings->push($booking);
            }

            $room->bookings()->saveMany($bookings);
        });
    }
}
