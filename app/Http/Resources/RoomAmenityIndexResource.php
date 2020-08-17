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
        'id' => $this->id,
        'air_conditioning' => $this->air_conditioning,
        'balcony' => $this->balcony,
        'bathrub' => $this->bathrub,
        'view' => $this->view,
        'flat_screen' => $this->flat_screen,
        'private_pool' => $this->private_pool,
        'terrace' => $this->terrace,
        'coffe_shop' => $this->coffe_shop,
        'spa_tub' => $this->spa_tub,
        'childrens_cribs' => $this->childrens_cribs,
        'clother_rack' => $this->clother_rack,
        'drying_rack_clothing' => $this->drying_rack_clothing,
        'fold_up_bed' => $this->fold_up_bed,
        'sofa_bed' => $this->sofa_bed,
        'trash_cans' => $this->trash_cans,
        'heated_pool' => $this->heated_pool,
        'infinity_pool' => $this->infinity_pool,
        'plunge_pool' => $this->plunge_pool,
        'pool_cover' => $this->pool_cover,
        'pool_towers' => $this->pool_towers,
        'pool_with_view' => $this->pool_with_view,
        'shallow_end' => $this->shallow_end,
        'saltwater_pool' => $this->saltwater_pool,
        'wardrobe_closet' => $this->wardrobe_closet,
        'fan' => $this->fan,
        'fireplace' => $this->fireplace,
        'heating' => $this->heating,
        'interconnecting_rooms' => $this->interconnecting_rooms,
        'iron_facilities' => $this->iron_facilities,
        'mosquito_net' => $this->mosquito_net,
        'private_entrance' => $this->private_entrance,
        'safe' => $this->safe,
        'sofa' => $this->sofa,
        'sitting_area' => $this->sitting_area,
        'electric_blankets' => $this->electric_blankets,
        'pajamas' => $this->pajamas,
        'socket_near_bed' => $this->socket_near_bed,
        'private_bath' => $this->private_bath,
        'shared_bath' => $this->shared_bath,
        'bathhub_shower' => $this->bathhub_shower,
        'bathrobe' => $this->bathrobe,
        'free_toileters' => $this->free_toileters,
        'hairdryer' => $this->hairdryer,
        'sauna' => $this->sauna,
        'shower' => $this->shower,
        'slippers' => $this->slippers,
        'additional_bathroom' => $this->additional_bathroom,
        'toothbrush' => $this->toothbrush,
        'shampoo' => $this->shampoo,
        'conditioner' => $this->conditioner,
        'body_soap' => $this->body_soap,
        'channel_cable' => $this->channel_cable,
        'paypervierw_channles' => $this->paypervierw_channles,
        'laptop_safe' => $this->laptop_safe,
        'satellite_channels' => $this->satellite_channels,
        'telephone' => $this->telephone,
        'tv' => $this->tv,
        'video' => $this->video,
        'key_card_access' => $this->key_card_access,
        'alarm_clock' => $this->alarm_clock,
        'key_access' => $this->key_access,
        'wakeup_service' => $this->wakeup_service,
        'linens' => $this->linens,
        'towels' => $this->towels,
        'city_view' => $this->city_view,
        'garden_view' => $this->garden_view,
        'lake_view' => $this->lake_view,
        'landmark_view' => $this->landmark_view,
        'ocean_view' => $this->ocean_view,
        'carbon_monixide_detector' => $this->carbon_monixide_detector,
        'carbon_monoxide_sources' => $this->carbon_monoxide_sources,
        'smoke_alarm' => $this->smoke_alarm,
        'fire_extinguisher' => $this->fire_extinguisher,
        'air_purifiers' => $this->air_purifiers,
        'room_id'=> isset($this->room)?$this->room->id:null,
        ];
    }
}
