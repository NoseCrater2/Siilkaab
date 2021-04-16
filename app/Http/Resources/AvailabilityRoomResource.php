<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AvailabilityRoomResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'quantity' => $this->quantity,
            'rack_rate' => $this->rack_rate,
            'default_image' => $this->images->count()?$this->images[0]->name:null,
            'large_text' => $this->large_text,
            'short_text' => $this->short_text,
            'max_adults' => $this->max_adults,
            'max_children' => $this->max_children,
            'max_occpancy' => $this->max_occpancy,
            'adult_extra' => $this->adult_extra,
            'child_extra' => $this->child_extra,
            'baby_extra' => $this->baby_extra,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
        ];
    }
}
