<?php

namespace App\Http\Controllers\Api;

use App\Messages;
use App\RoomAmenity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RoomAmenityIndexResource;

class RoomAmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RoomAmenityIndexResource::collection(
            RoomAmenity::all()
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
       
        $validator= Validator::make($data,$this->getRules(), Messages::getMessages());
        
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $roomAmenity = RoomAmenity::create($data);
            return new RoomAmenityIndexResource(RoomAmenity::findOrFail($roomAmenity->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RoomAmenity  $RoomAmenity
     * @return \Illuminate\Http\Response
     */
    public function show(RoomAmenity $roomAmenity)
    {
        return new RoomAmenityIndexResource(RoomAmenity::findOrFail($roomAmenity->id));
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RoomAmenity  $RoomAmenity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RoomAmenity $roomAmenity)
    {
        $data = $request->all();
        $validator= Validator::make($data,$this->getRules(), Messages::getMessages());

        if($validator->fails()){
            return $validator->errors();
        }else{
            $roomAmenity->update($data);
            return new RoomAmenityIndexResource(RoomAmenity::findOrFail($roomAmenity->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RoomAmenity  $RoomAmenity
     * @return \Illuminate\Http\Response
     */
    public function destroy(RoomAmenity $roomAmenity)
    {
        $roomAmenity->delete();
        return new RoomAmenityIndexResource($roomAmenity);

    }

    public function getRules()
    {
        return [
            'air_conditioning' => 'boolean',
            'balcony' => 'boolean',
            'bathrub' => 'boolean',
            'view' => 'boolean',
            'flat_screen' => 'boolean',
            'private_pool' => 'boolean',
            'terrace' => 'boolean',
            'coffe_shop' => 'boolean',
            'spa_tub' => 'boolean',
            'childrens_cribs' => 'boolean',
            'clother_rack' => 'boolean',
            'drying_rack_clothing' => 'boolean',
            'fold_up_bed' => 'boolean',
            'sofa_bed' => 'boolean',
            'trash_cans' => 'boolean',
            'heated_pool' => 'boolean',
            'infinity_pool' => 'boolean',
            'plunge_pool' => 'boolean',
            'pool_cover' => 'boolean',
            'pool_towers' => 'boolean',
            'pool_with_view' => 'boolean',
            'shallow_end' => 'boolean',
            'saltwater_pool' => 'boolean',
            'wardrobe_closet' => 'boolean',
            'fan' => 'boolean',
            'fireplace' => 'boolean',
            'heating' => 'boolean',
            'interconnecting_rooms' => 'boolean',
            'iron_facilities' => 'boolean',
            'mosquito_net' => 'boolean',
            'private_entrance' => 'boolean',
            'safe' => 'boolean',
            'sofa' => 'boolean',
            'sitting_area' => 'boolean',
            'electric_blankets' => 'boolean',
            'pajamas' => 'boolean',
            'socket_near_bed' => 'boolean',
            'private_bath' => 'boolean',
            'shared_bath' => 'boolean',
            'bathhub_shower' => 'boolean',
            'bathrobe' => 'boolean',
            'free_toileters' => 'boolean',
            'hairdryer' => 'boolean',
            'sauna' => 'boolean',
            'shower' => 'boolean',
            'slippers' => 'boolean',
            'additional_bathroom' => 'boolean',
            'toothbrush' => 'boolean',
            'shampoo' => 'boolean',
            'conditioner' => 'boolean',
            'body_soap' => 'boolean',
            'channel_cable' => 'boolean',
            'paypervierw_channles' => 'boolean',
            'laptop_safe' => 'boolean',
            'satellite_channels' => 'boolean',
            'telephone' => 'boolean',
            'tv' => 'boolean',
            'video' => 'boolean',
            'key_card_access' => 'boolean',
            'alarm_clock' => 'boolean',
            'key_access' => 'boolean',
            'wakeup_service' => 'boolean',
            'linens' => 'boolean',
            'towels' => 'boolean',
            'city_view' => 'boolean',
            'garden_view' => 'boolean',
            'lake_view' => 'boolean',
            'landmark_view' => 'boolean',
            'ocean_view' => 'boolean',
            'carbon_monixide_detector' => 'boolean',
            'carbon_monoxide_sources' => 'boolean',
            'smoke_alarm' => 'boolean',
            'fire_extinguisher' => 'boolean',
            'air_purifiers' => 'boolean',
            'room_id' => 'exists:rooms,id',
        ];
    }
}
