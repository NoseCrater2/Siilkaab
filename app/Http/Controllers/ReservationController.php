<?php

namespace App\Http\Controllers;

use App\Room;
use App\Hotel;
use App\Messages;
use App\Binnacle;
use App\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\IndexReservationResource;
use App\Http\Resources\ShowReservationResource;
use App\Http\Resources\BinnacleShowResource;
use App\Http\Resources\BinnacleIndexResource;

class ReservationController extends Controller
{
    public function index(Hotel $hotel)
    {
        return IndexReservationResource::collection(
            $hotel->reservations
        );
    }

    public function show(Reservation $reservation)
    {
        return new ShowReservationResource(Reservation::findOrFail($reservation->id));
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $rules = [
            'nights' => 'required|numeric|min:1',
            'from' => 'required|date_format:Y-m-d',
            'to' => 'required|date_format:Y-m-d|after:from',
            'guest_name' => 'required|string',
            'guest_last_name' => 'required|string',
            'guest_country' => 'required|string',
            'guest_names' => 'required|string',
            'guest_email' => 'required|email',
            'guest_phone' => 'required|string',
            'guest_petitions' => 'nullable|string',
            'check_in' => 'required|date_format:H:i',
            'payed' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'state' => 'required|in:Confirmed,Cancelled',
            'hotel_id' => 'required|exists:hotels,id',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $reservation = Reservation::create($data);
            foreach ($data['rooms'] as $room) {
                $currentRoom = Room::find($room['id']);
                $currentRoom->quantity = $currentRoom->quantity - 1;
                $reservation->rooms()->syncWithoutDetaching([$currentRoom->id]);

            }
            
            return new ShowReservationResource(Reservation::findOrFail($reservation->id));
        }
    }

    public function update(Request $request, Reservation $reservation)
    {
    
    }

    public function delete(Reservation $reservation)
    {
        # code...
    }

    public function history(Reservation $reservation)
    {
        return  BinnacleShowResource::collection(
            Binnacle::where('binnacleable_id', $reservation->id)
                    ->where('binnacleable_type', 'App\Reservation')
                    ->orderBy('updated_at', 'desc')->get()
        );
    }

    public function updateClientInformation(Request $request, Reservation $reservation)
    {
        $data = $request->all();
        $rules = [
            'guest_name' => 'required|string',
            'guest_last_name' => 'required|string',
            'guest_country' => 'required|string',
            'guest_names' => 'required|array',
            'guest_email' => 'required|email',
            'guest_phone' => 'required|string',
            'guest_petitions' => 'nullable|string',
            'check_in' => 'required|date_format:H:i',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $data['guest_names'] = json_encode($data['guest_names']);
            $reservation->update($data);
            return new ShowReservationResource(Reservation::findOrFail($reservation->id));
        }
    }

    public function updateState(Request $request, Reservation $reservation)
    {
        $data = $request->all();
        $rules = [
            'state' => 'required|in:Confirmed,Pending,Cancelled,Aborted',
            'send_email' => 'required|boolean',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            if($data['send_email']){
                //SEND EMAIL
            }
            $reservation->update($data);
            return new ShowReservationResource(Reservation::findOrFail($reservation->id));
        }
    }

}
