<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Hotel;

class RoomAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $data = $request->validate([
            //'id' => 'required|exists:hotels,id'
            //'from' => 'required|date_format:Y-m-d|after_or_equal:now',
            //'to' => 'required|date_format:Y-m-d|after_or_equal:from',

        ]);

        $hotel = Hotel::findOrFail($id);

       return  response($hotel->rooms,200);
               
    }
}
