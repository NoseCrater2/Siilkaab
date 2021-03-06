<?php

namespace App\Http\Controllers\Api;

use App\Hotel;
use App\Room;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RoomIndexResource;
use App\Http\Resources\RoomViewResource;
use App\Http\Resources\RoomClientResource;
use App\RoomAmenities;

class RoomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show']);
    }
    public function index()
    {
        //$logged_user = User::find(auth('api')->user()->id);
        return RoomIndexResource::collection(
            //$logged_user->hotels
           Room::all()
        );
    }

    public function show(Room $room)
    {
        if(auth('sanctum')->check()){
            return new RoomIndexResource($room);
        }
        return  new RoomClientResource($room);
        
    }

    public function store(Request $request)
    {
        $image = null;
        $data = $request->all();
        $rules = [
            'name' => 'required|string',
            'type' => 'required|in:single,double,twin,twin-double,triple,quad,family,suite,studio,apartment,bed-in-room,bungalow,challet,villa,vacation-home,trailer,tent',
            'quantity' => 'required|integer|min:0',
            'rack_rate' => 'required|numeric|min:0',
            'large_text' => 'string',
            'short_text' => 'string',
            'smoking_policy' => 'in:yes,no,both',
            'pool_near' => 'in:all,some,none',
            'floor_near' => 'in:ground,upper,both',
            'size' => 'required|numeric|min:0',
            'size_type' => 'required|in:meters,feets',
            'max_adults' => 'required|integer|min:0',
            'max_children' => 'required|integer|min:0',
            'max_occpancy' => 'required|integer|min:0',
            'adult_extra' => 'numeric|min:0',
            'child_extra' => 'numeric|min:0',
            'baby_extra' => 'numeric|min:0',
            'hotel_id' => 'required|exists:hotels,id',
            'discount_id' => 'exists:discounts,id',
            'extra_id' => 'exists:extras,id',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        
           
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $room = Room::create($data);
            $room->roomAmenity()->create([
                'room_id' => $room->id,
            ]);
            return new RoomIndexResource(Room::findOrFail($room->id));
        }
        
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        $data = $request->all();

        $rules = [
            'name' => 'string',
            'type' => 'in:single,double,twin,twin-double,triple,quad,family,suite,studio,apartment,bed-in-room,bungalow,challet,villa,vacation-home,trailer,tent',
            'quantity' => 'integer|min:0',
            'rack_rate' => 'numeric|min:0',
            'large_text' => 'string',
            'short_text' => 'string',
            'smoking_policy' => 'in:yes,no,both',
            'pool_near' => 'in:all,some,none',
            'floor_near' => 'in:ground,upper,both',
            'size' => 'numeric|min:0',
            'size_type' => 'in:meters,feets',
            'max_adults' => 'integer|min:0',
            'max_children' => 'integer|min:0',
            'max_ocupancy' => 'integer|min:0',
            'adult_extra' => 'numeric|min:0',
            'child_extra' => 'numeric|min:0',
            'baby_extra' => 'numeric|min:0',
            'hotel_id' => 'exists:hotels,id',
            'discount_id' => 'exists:discounts,id',
            'rate_id' => 'exists:rates,id',
            'extra_id' => 'exists:extras,id',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $room->update($data);
            return new RoomIndexresource(Room::findOrFail($room->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        Storage::delete($room->default_image);
        $room->delete();
        return new RoomIndexResource($room);

    }

    // public function getRoomsForAdmin($id)
    // {
    //     return RoomViewResource::collection(
    //         Hotel::findOrFail($id)->rooms
    //     );
    // }

    public function currentHotelRooms(Hotel $hotel)
    {
        return RoomIndexResource::collection(
            $hotel->rooms
        );
    }


}
