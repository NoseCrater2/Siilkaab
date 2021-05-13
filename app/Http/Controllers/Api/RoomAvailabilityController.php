<?php

namespace App\Http\Controllers\Api;

use App\Rate;
use DateTime;
use App\Room;
use App\Hotel;
use DatePeriod;
use App\Messages;
use DateInterval;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AvailabilityRoomResource;
use App\Http\Resources\RateIndexResource;

class RoomAvailabilityController extends Controller
{
    // /**
    //  * Handle the incoming request.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */

    public function getAvailabilityRooms(Hotel $hotel, Request $request)
    {
        $data = $request->all();
        $rules = [
            'from' => 'required|date_format:Y-m-d',
            'to' => 'required|date_format:Y-m-d|after:from',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
           
            $toAdded = Carbon::create($data['to'])->format('Y-m-d');
            $period = new DatePeriod(new DateTime($data['from']), new DateInterval('P1D'), new DateTime($toAdded));

            $results = new Collection();
            $index = 0;
                
            foreach ($data['rooms'] as $room) {
                $preresults =  AvailabilityRoomResource::collection(
                    $hotel->rooms()
                    ->where('quantity', '>=', 1)
                    ->where('max_adults','>=', intval($room['adults']))
                    ->where('max_children','>=', intval($room['children']))
                    ->get()
                );
                $index++;

              
                foreach ($preresults as $key => $result) {
                    $rates = $this->searchRates($result->id, $period);
                    if($rates->contains('quantity',0)){
                        $preresults->forget($key);
                    }else{
                        $result->additional([$rates]);
                    }
                }

                $results->put($index, $preresults);
            
            }

            
            return  response($results,200);
        }
    }

    public function searchRates($id, $period)
    {
        $rates = new Collection();
        $room = Room::find($id);
        foreach ($period as $date) {
            $dayName = lcfirst($date->format('l'));
            $result = $room->rates()
                        ->select('id','bed_rooms as quantity')
                        ->selectRaw("IF(rack = 0,".$dayName.",rack) as price")
                        ->where(function ($query) use ($date, $dayName){
                            $query
                                ->whereRaw('IF(day = null,DATE(start) <= ? and DATE(end) >= ?, DATE(day) = ?)  ',[$date, $date,$date])
                                ->orWhere($dayName,'>',0)
                                ->first();
                        })
                        ->orderBy('rack','desc')
                        ->first();
            if($result == null){
                $r = Rate::make();
                $r->quantity = $room->quantity;
                $r->price = $room->rack_rate;
                $result = $r;
            }

            $rates->push($result);    
        }

        return $rates;  
    }
}
