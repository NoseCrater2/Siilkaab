<?php

namespace App\Http\Controllers\Api;

use App\Amenity;
use App\Messages;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AmenityIndexResource;

use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index()
    {
        return AmenityIndexResource::collection(
            Amenity::all()
        );
    }

    public function show(Amenity $amenity)
    {
        return new AmenityIndexResource(Amenity::findOrFail($amenity->id));
    }


    public function store(Request $request)
    {
        $data = $request->all();
        $rules = [
            'spa'=> 'in:free,paid,flag',
            'air_conditioned'=>'boolean',
            'no_smoke_rooms'=>'boolean',
            'air_transfer_service'=>'boolean',
            'air_collect_service'=>'boolean',
            'recection_24h'=>'boolean',
            'gym'=>'boolean',
            'room_service'=>'boolean',
            'terrace'=>'boolean',
            'bar'=>'boolean',
            'garden'=>'boolean',
            'water_park'=>'in:free,paid,flag',
            'num_rooms'=>'required|integer|min:0',
            'num_floors'=>'required|integer|min:0',
            'beach'=>'in:private,in front,flag',
            'recreational_activities'=>'boolean',
            'romantic_dinners'=>'in:free,paid,flag',
            'touristic_tour'=>'in:free,paid,flag',
            'guarded_parking'=>'boolean',
            'street_parking'=>'boolean',
            'garage_parking'=>'boolean',
            'special_parking'=>'boolean',
            'reg_inout_private'=>'boolean',
            'reg_inout_express'=>'boolean',
            'touristic_info'=>'boolean',
            'parking_service'=>'boolean',
            'currency_change'=>'boolean',
            'outdoor_furniture'=>'boolean',
            'terrace_solarium'=>'boolean',
            'shared_dinner'=>'boolean',
            'shared_salon'=>'boolean',
            'game_zone'=>'boolean',
            'library'=>'boolean',
            'daily_housekipping'=>'in:free,paid,flag',
            'laundry_service'=>'boolean',
            'iron_service'=>'boolean',
            'meeting_room'=>'boolean',
            'meeting_center'=>'boolean',
            'fax_photocopier'=>'boolean',
            'coffee_break'=>'boolean',
            'souvenirs_store'=>'boolean',
            'inclusive_service'=>'boolean',
            'elevator'=>'boolean',
            'smoking_zone'=>'boolean',
            'no_smoking'=>'boolean',
            'pet_friendly'=>'boolean',
            'pet_house'=>'boolean',
            'pet_basket'=>'boolean',
            'only_adults'=>'boolean',
            'sanitized_rooms'=>'boolean',
            'bridal_suite'=>'boolean',
            'vip_service'=>'boolean',
            'calefaction'=>'boolean',
            'keep_bags'=>'boolean',
            'hotel_id'=> 'required|exists:hotels,id',
        ];
                
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return $validator->errors();
        }else{
            $amenity = Amenity::create($data);
            return new AmenityIndexResource(Amenity::findOrFail($amenity->id));
        }
        
    }

        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Amenity $amenity)
    {
        $data = $request->all();
        $rules =[
            'spa'=> 'in:free,paid,flag',
            'air_conditioned'=>'boolean',
            'no_smoke_rooms'=>'boolean',
            'air_transfer_service'=>'boolean',
            'air_collect_service'=>'boolean',
            'recection_24h'=>'boolean',
            'gym'=>'boolean',
            'room_service'=>'boolean',
            'terrace'=>'boolean',
            'bar'=>'boolean',
            'garden'=>'boolean',
            'water_park'=>'in:free,paid,flag',
            'num_rooms'=>'boolean',
            'num_floors'=>'boolean',
            'beach'=>'in:private,in front,flag',
            'recreational_activities'=>'boolean',
            'romantic_dinners'=>'in:free,paid,flag',
            'touristic_tour'=>'in:free,paid,flag',
            'guarded_parking'=>'boolean',
            'street_parking'=>'boolean',
            'garage_parking'=>'boolean',
            'special_parking'=>'boolean',
            'reg_inout_private'=>'boolean',
            'reg_inout_express'=>'boolean',
            'touristic_info'=>'boolean',
            'parking_service'=>'boolean',
            'currency_change'=>'boolean',
            'outdoor_furniture'=>'boolean',
            'terrace_solarium'=>'boolean',
            'shared_dinner'=>'boolean',
            'shared_salon'=>'boolean',
            'game_zone'=>'boolean',
            'library'=>'boolean',
            'daily_housekipping'=>'in:free,paid,flag',
            'laundry_service'=>'boolean',
            'iron_service'=>'boolean',
            'meeting_room'=>'boolean',
            'meeting_center'=>'boolean',
            'fax_photocopier'=>'boolean',
            'coffee_break'=>'boolean',
            'souvenirs_store'=>'boolean',
            'inclusive_service'=>'boolean',
            'elevator'=>'boolean',
            'smoking_zone'=>'boolean',
            'no_smoking'=>'boolean',
            'pet_friendly'=>'boolean',
            'pet_house'=>'boolean',
            'pet_basket'=>'boolean',
            'only_adults'=>'boolean',
            'sanitized_rooms'=>'boolean',
            'bridal_suite'=>'boolean',
            'vip_service'=>'boolean',
            'calefaction'=>'boolean',
            'keep_bags'=>'boolean',
            'hotel_id'=> 'exists:hotels,id',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());
        
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $amenity->update($data);
        return new AmenityIndexResource(Amenity::findOrFail($amenity->id));
        }
        
    }



     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Amenity $amenity)
    {
        $amenity->delete(); 
        //return new HotelShowResource(Hotel::findOrFail($hotel));

    }
}
