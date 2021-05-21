<?php

namespace App\Http\Controllers\Api;

use App\Rate;
use App\Room;
use App\Messages;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RateIndexResource;
use App\Http\Resources\RoomRateResource;




class RateController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['getRatesByRoom']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RateIndexResource::collection(
            Rate::all()
        );
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $rules = [
            'type' => 'required|in:room,person',
            'rack' => 'numeric|min:0',
            'bed_rooms' => 'numeric|min:0',
            'start' => 'date',
            'end' => 'date',
            'day' => 'date',
            'monday' => 'numeric|min:0',
            'tuesday' => 'numeric|min:0',
            'wednesday' => 'numeric|min:0',
            'thursday' => 'numeric|min:0',
            'friday' => 'numeric|min:0',
            'saturday' => 'numeric|min:0',
            'sunday' => 'numeric|min:0',
            'room_id' => 'required|exists:rooms,id',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $rate =  Rate::create($data);
            return new RateIndexResource(Rate::findOrFail($rate->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function show(Rate $rate)
    {
        return new RateIndexResource(Rate::findOrFail($rate->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rate $rate)
    {
        $data = $request->all();

        $rules = [
            'type' => 'in:room,person',
            'rack' => 'numeric|min:0',
            'bed_rooms' => 'numeric|min:0',
            'start' => 'date',
            'end' => 'date',
            'day' => 'date',
            'monday' => 'numeric|min:0',
            'tuesday' => 'numeric|min:0',
            'wednesday' => 'numeric|min:0',
            'thursday' => 'numeric|min:0',
            'friday' => 'numeric|min:0',
            'saturday' => 'numeric|min:0',
            'sunday' => 'numeric|min:0',
            'room_id' => 'exists:rooms,id',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $rate->update($data);
            return new RateIndexResource(Rate::findOrFail($rate->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rate $rate)
    {
        $rate->delete();
        return new RateIndexResource($rate);
    }


    public function getRatesByRoom(Room $room)
    {
        $now = Carbon::now()->format('Y-m-d');
        $rates = RateIndexResource::collection(
          $room->rates()
          ->whereRaw('CASE WHEN day is not null THEN day >= ? WHEN start is not null THEN start >= ? ELSE TRUE END',[$now, $now])
          ->get()
        );

        if($rates->isEmpty()){
            return new RoomRateResource($room);
        }else{
            return $rates;
        }
    }
}
