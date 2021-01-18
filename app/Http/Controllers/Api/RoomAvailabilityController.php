<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Hotel;
use App\Messages;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class RoomAvailabilityController extends Controller
{
    // /**
    //  * Handle the incoming request.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function __invoke(Hotel $hotel, Request $request)
    // {
           

               
    // }

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

            if($hotel->rooms()->has('rates')->count() > 0){

            }else{
               foreach ($data['rooms'] as $key => $room) {
                $result = $hotel->rooms()->where('max_adults','>=', intval($room['adults']))->where('max_children','>=', intval($room['children']))->get();
                 $results->put($key, $result);
               }
            };
            return  response($results,200);
        }
    }
}
