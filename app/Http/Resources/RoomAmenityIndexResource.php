<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomAmenityIndexResource extends JsonResource
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
        'id' => intval($this->id),
        'air_conditioning' => intval($this->air_conditioning),
        'balcony' => intval($this->balcony),
        'bathrub' => intval($this->bathrub),
        'view' => intval($this->view),
        'flat_screen' => intval($this->flat_screen),
        'private_pool' => intval($this->private_pool),
        'terrace' => intval($this->terrace),
        'coffe_shop' => intval($this->coffe_shop),
        'spa_tub' => intval($this->spa_tub),
        'childrens_cribs' => intval($this->childrens_cribs),
        'clother_rack' => intval($this->clother_rack),
        'drying_rack_clothing' => intval($this->drying_rack_clothing),
        'fold_up_bed' => intval($this->fold_up_bed),
        'sofa_bed' => intval($this->sofa_bed),
        'trash_cans' => intval($this->trash_cans),
        'heated_pool' => intval($this->heated_pool),
        'infinity_pool' => intval($this->infinity_pool),
        'plunge_pool' => intval($this->plunge_pool),
        'pool_cover' => intval($this->pool_cover),
        'pool_towers' => intval($this->pool_towers),
        'pool_with_view' => intval($this->pool_with_view),
        'shallow_end' => intval($this->shallow_end),
        'saltwater_pool' => intval($this->saltwater_pool),
        'wardrobe_closet' => intval($this->wardrobe_closet),
        'fan' => intval($this->fan),
        'fireplace' => intval($this->fireplace),
        'heating' => intval($this->heating),
        'interconnecting_rooms' => intval($this->interconnecting_rooms),
        'iron_facilities' => intval($this->iron_facilities),
        'mosquito_net' => intval($this->mosquito_net),
        'private_entrance' => intval($this->private_entrance),
        'safe' => intval($this->safe),
        'sofa' => intval($this->sofa),
        'sitting_area' => intval($this->sitting_area),
        'electric_blankets' => intval($this->electric_blankets),
        'pajamas' => intval($this->pajamas),
        'socket_near_bed' => intval($this->socket_near_bed),
        'private_bath' => intval($this->private_bath),
        'shared_bath' => intval($this->shared_bath),
        'bathhub_shower' => intval($this->bathhub_shower),
        'bathrobe' => intval($this->bathrobe),
        'free_toileters' => intval($this->free_toileters),
        'hairdryer' => intval($this->hairdryer),
        'sauna' => intval($this->sauna),
        'shower' => intval($this->shower),
        'slippers' => intval($this->slippers),
        'additional_bathroom' => intval($this->additional_bathroom),
        'toothbrush' => intval($this->toothbrush),
        'shampoo' => intval($this->shampoo),
        'conditioner' => intval($this->conditioner),
        'body_soap' => intval($this->body_soap),
        'channel_cable' => intval($this->channel_cable),
        'paypervierw_channles' => intval($this->paypervierw_channles),
        'laptop_safe' => intval($this->laptop_safe),
        'satellite_channels' => intval($this->satellite_channels),
        'telephone' => intval($this->telephone),
        'tv' => intval($this->tv),
        'video' => intval($this->video),
        'key_card_access' => intval($this->key_card_access),
        'alarm_clock' => intval($this->alarm_clock),
        'key_access' => intval($this->key_access),
        'wakeup_service' => intval($this->wakeup_service),
        'linens' => intval($this->linens),
        'towels' => intval($this->towels),
        'city_view' => intval($this->city_view),
        'garden_view' => intval($this->garden_view),
        'lake_view' => intval($this->lake_view),
        'landmark_view' => intval($this->landmark_view),
        'ocean_view' => intval($this->ocean_view),
        'carbon_monixide_detector' => intval($this->carbon_monixide_detector),
        'carbon_monoxide_sources' => intval($this->carbon_monoxide_sources),
        'smoke_alarm' => intval($this->smoke_alarm),
        'fire_extinguisher' => intval($this->fire_extinguisher),
        'air_purifiers' => intval($this->air_purifiers),
        'room_id'=> isset($this->room)?$this->room->id:null,
        'room_name'=> isset($this->room)?$this->room->name:null,
        'hotel_id'=> isset($this->room)?$this->room->hotel_id:null,
        ];
    }
}
