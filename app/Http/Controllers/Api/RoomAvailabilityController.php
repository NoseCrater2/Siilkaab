<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Hotel;
use App\Messages;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use  App\Http\Resources\RoomIndexResource;

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

                $omittedIds = [];
                $index = 0;
                $disponibilities = new Collection();
                
               foreach ($data['rooms'] as $key => $room) {

                $result =  RoomIndexResource::collection(
                    $hotel->rooms()
                    ->where('quantity', '>=', 1)
                    ->where('max_adults','>=', intval($room['adults']))
                    ->where('max_children','>=', intval($room['children']))
                    ->whereNotIn('id',$omittedIds)
                    ->get()
                );
                
                if( isset($result[0])){
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



            };
            return  response($results,200);
        }
    }

}
