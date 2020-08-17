<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = [
        'spa',
        'air_conditioned',
        'no_smoke_rooms',
        'air_transfer_service',
        'air_collect_service',
        'recection_24h',
        'gym',
        'room_service',
        'terrace',
        'bar',
        'garden',
        'water_park',
        'num_rooms',
        'num_floors',
        'beach',
        'recreational_activities',
        'romantic_dinners',
        'touristic_tour',
        'guarded_parking',
        'street_parking',
        'garage_parking',
        'special_parking',
        'reg_inout_private',
        'reg_inout_express',
        'touristic_info',
        'parking_service',
        'currency_change',
        'outdoor_furniture',
        'terrace_solarium',
        'shared_dinner',
        'shared_salon',
        'game_zone',
        'library',
        'daily_housekipping',
        'laundry_service',
        'iron_service',
        'meeting_room',
        'meeting_center',
        'fax_photocopier',
        'coffee_break',
        'souvenirs_store',
        'inclusive_service',
        'elevator',
        'smoking_zone',
        'no_smoking',
        'pet_friendly',
        'pet_house',
        'pet_basket',
        'only_adults',
        'sanitized_rooms',
        'bridal_suite',
        'vip_service',
        'calefaction',
        'keep_bags',
        'security_24h',
        'security_alarm',
        'smoke_detectors',
        'in_security_cams',
        'out_security_cams',
        'fire_extinguishers',
        'safe_deposit_box',
        'hotel_id'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'amenities', 'binnacleable_type','binnacleable_id');
    }
   
}
