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
            $results = new Collection();
            $omittedIds = [];
            $index = 0;
            $disponibilities = new Collection();
                
            foreach ($data['rooms'] as $key => $room) {
                $result =  AvailabilityRoomResource::collection(
                    $hotel->rooms()
                    ->where('quantity', '>=', 1)
                    ->where('max_adults','>=', intval($room['adults']))
                    ->where('max_children','>=', intval($room['children']))
                    ->whereNotIn('id',$omittedIds)
                    ->get()
                );
            
                if( isset($result[0]) ){
                    $index++;
                    if($disponibilities->has($result[0]->id)){
                        $disponibilities[$result[0]->id] = $disponibilities[$result[0]->id] - 1 ;
                    }else{
                        $disponibilities->put($result[0]->id, $result[0]->quantity);
                        $disponibilities[$result[0]->id] = $disponibilities[$result[0]->id] - 1 ;
                    }
                    if($disponibilities->search(0))
                    array_push($omittedIds, $disponibilities->search(0));
                    $disponibilities->forget($disponibilities->search(0));


                    $results->put($index, $result);
                }
            }
            return  response($results,200);
        }
    }

    public function searchRates($id, $from, $to)
    {
       
        $room = Room::find($id);
        $toAdded = Carbon::create($to)->addDays(1)->format('Y-m-d');
        $period = new DatePeriod(new DateTime($from), new DateInterval('P1D'), new DateTime($toAdded));
        foreach ($period as $date) {
           $rates[]= RateIndexResource::collection($room->rates()
                ->where('day', $date)
                ->orWhere(function ($query) use ($date){
                    $query->where('start', '<=', $date)
                          ->where('end', '>=', $date);
                })
                ->orWhere(lcfirst($date->format('l')),'>',0)
                ->get()
            );
        }

        return $rates;
       

    }

}
