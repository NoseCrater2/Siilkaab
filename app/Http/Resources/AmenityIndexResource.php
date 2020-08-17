<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AmenityIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
        'spa'=> $this->spa,
        'air_conditioned'=> $this->air_conditioned,
        'no_smoke_rooms'=> $this->no_smoke_rooms,
        'air_transfer_service'=> $this->air_transfer_service,
        'air_collect_service'=> $this->air_collect_service,
        'recection_24h'=> $this->recection_24h,
        'gym'=> $this->gym,
        'room_service'=> $this->room_service,
        'terrace'=> $this->terrace,
        'bar'=> $this->bar,
        'garden'=> $this->garden,
        'water_park'=> $this->water_park,
        'num_rooms'=> $this->num_rooms,
        'num_floors'=> $this->num_floors,
        'beach'=> $this->beach,
        'recreational_activities'=> $this->recreational_activities,
        'romantic_dinners'=> $this->romantic_dinners,
        'touristic_tour'=> $this->touristic_tour,
        'guarded_parking'=> $this->guarded_parking,
        'street_parking'=> $this->street_parking,
        'garage_parking'=> $this->garage_parking,
        'special_parking'=> $this->special_parking,
        'reg_inout_private'=> $this->reg_inout_private,
        'reg_inout_express'=> $this->reg_inout_express,
        'touristic_info'=> $this->touristic_info,
        'parking_service'=> $this->parking_service,
        'currency_change'=> $this->currency_change,
        'outdoor_furniture'=> $this->outdoor_furniture,
        'terrace_solarium'=> $this->terrace_solarium,
        'shared_dinner'=> $this->shared_dinner,
        'shared_salon'=> $this->shared_salon,
        'game_zone'=> $this->game_zone,
        'library'=> $this->library,
        'daily_housekipping'=> $this->daily_housekipping,
        'laundry_service'=> $this->laundry_service,
        'iron_service'=> $this->iron_service,
        'meeting_room'=> $this->meeting_room,
        'meeting_center'=> $this->meeting_center,
        'fax_photocopier'=> $this->fax_photocopier,
        'coffee_break'=> $this->coffee_break,
        'souvenirs_store'=> $this->souvenirs_service,
        'inclusive_service'=> $this->inclusive_service,
        'elevator'=> $this->elevator,
        'smoking_zone'=> $this->smoking_zone,
        'no_smoking'=> $this->no_smoking,
        'pet_friendly'=> $this->pet_friendly,
        'pet_house'=> $this->pet_house,
        'pet_basket'=> $this->pet_basket,
        'only_adults'=> $this->only_adults,
        'sanitized_rooms'=> $this->sanitized_room,
        'bridal_suite'=> $this->bridal_suite,
        'vip_service'=> $this->vip_service,
        'calefaction'=> $this->calefaction,
        'keep_bags'=> $this->keep_bags,
        'security_24h'=> $this->security_24h,
        'security_alarm'=> $this->security_alarm,
        'smoke_detectors'=> $this->smoke_detectors,
        'in_security_cams'=> $this->in_security_cams,
        'out_security_cams'=> $this->out_security_cams,
        'fire_extinguishers'=> $this->fire_extinguishers,
        'safe_deposit_box'=> $this->safe_deposit_box,
        'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
        'hotel'=> isset($this->hotel)?$this->hotel->title:null,
    ];
              
    }
}
