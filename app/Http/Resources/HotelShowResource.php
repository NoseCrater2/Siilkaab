<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HotelShowResource extends JsonResource
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
            'idConfiguration' => isset ($this->configuration) ? $this->configuration->id : null,
            'idContact' => isset ($this->contact) ? $this->contact->id : null,
            'idCondition' => isset ($this->condition) ? $this->condition->id : null,
            'idRegime' => $this->regimes->map(function($regime){return $regime->id;}),
            'idAmenity' => isset ($this->amenity) ? $this->amenity->id : null,
            'Title' => $this->title,
            'Url' => url($this->url),
            'ReferenceCode' => $this->reference_code,
            'Image' => $this->image,
            'LargeText' => $this->large_text,
            'ShortText' => $this->short_text,
            'type' => $this->type,
            'num_rooms' => $this->num_rooms,
            'num_floors' => $this->num_floors,
            'enabled' => $this->enabled,
        ];
    }
}
