<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomAmenity extends Model
{
    protected $fillable =[
        'id',
        'air_conditioning',
        'balcony',
        'bathrub',
        'view',
        'flat_screen',
        'private_pool',
        'terrace',
        'coffe_shop',
        'spa_tub',
        'childrens_cribs',
        'clother_rack',
        'drying_rack_clothing',
        'fold_up_bed',
        'sofa_bed',
        'trash_cans',
        'heated_pool',
        'infinity_pool',
        'plunge_pool',
        'pool_cover',
        'pool_towers',
        'pool_with_view',
        'shallow_end',
        'saltwater_pool',
        'wardrobe_closet',
        'fan',
        'fireplace',
        'heating',
        'interconnecting_rooms',
        'iron_facilities',
        'mosquito_net',
        'private_entrance',
        'safe',
        'sofa',
        'sitting_area',
        'electric_blankets',
        'pajamas',
        'socket_near_bed',
        'private_bath',
        'shared_bath',
        'bathhub_shower',
        'bathrobe',
        'free_toileters',
        'hairdryer',
        'sauna',
        'shower',
        'slippers',
        'additional_bathroom',
        'toothbrush',
        'shampoo',
        'conditioner',
        'body_soap',
        'channel_cable',
        'paypervierw_channles',
        'laptop_safe',
        'satellite_channels',
        'telephone',
        'tv',
        'video',
        'key_card_access',
        'alarm_clock',
        'key_access',
        'wakeup_service',
        'linens',
        'towels',
        'city_view',
        'garden_view',
        'lake_view',
        'landmark_view',
        'ocean_view',
        'carbon_monixide_detector',
        'carbon_monoxide_sources',
        'smoke_alarm',
        'fire_extinguisher',
        'air_purifiers',
        'room_id',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'room_amenities', 'binnacleable_type','binnacleable_id');
    }
}
