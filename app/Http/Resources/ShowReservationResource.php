<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowReservationResource extends JsonResource
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
            'nights' => $this->nights,
            'from' => $this->from,
            'to' => $this->to,
            'guest_name' => $this->guest_name,
            'guest_last_name' => $this->guest_last_name,
            'guest_country' => $this->guest_country,
            'guest_email' => $this->guest_email,
            'guest_phone' => $this->guest_phone,
            'guest_petitions' => $this->guest_petitions,
            'check_in' => $this->check_in,
            'payed' => $this->payed,
            'total_price' => $this->total_price,
            'state' => $this->state,
            'check_in' => $this->check_in,
            'created_at' => $this->created_at,
            'count_rooms' => $this->rooms->count(),
            'rooms' => $this->rooms->map(function ($room)
                {
                    return [
                        'name' => $room->name,
                        'image' => $room->images->isNotEmpty() ? $room->images[0]->name : null, 
                        'smoking_policy' => $room->smoking_policy,
                        'type' => $room->type,
                        'short_text' => $room->short_text,
                        'rack_rate' => $room->rack_rate,
                        'guest_name' => ['id'=>$room->pivot->id,'name' => $room->pivot->guest_name],
                        'adults' => $room->pivot->adults,
                        'children' => $room->pivot->children,
                        'price' => $room->pivot->price,
                    ];
                }),
            'rates'=> $this->rates->map( function( $rate ){
                return[
                    'amount' => $rate->rack,
                    'monday'  => $rate->monday,
                    'tuesday'  => $rate->tuesday,
                    'wednesday'  => $rate->wednesday,
                    'thursday'  => $rate->thursday,
                    'friday'  => $rate->friday,
                    'saturday'  => $rate->saturday,
                    'sunday'  => $rate->sunday,
                ];
            }),
            'hotel_name' => $this->hotel->title,
            'hotel_image' => $this->hotel->image,
            'hotel_url' => $this->hotel->url,
            'hotel_email' => $this->hotel->contact->email,
            'hotel_phone' => $this->hotel->contact->phone,
            'hotel_address' => $this->hotel->contact->display_name,
            'currency' => $this->hotel->configuration->currency->code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
