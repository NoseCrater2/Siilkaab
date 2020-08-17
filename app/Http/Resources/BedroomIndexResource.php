<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BedroomIndexResource extends JsonResource
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
            'type' => $this->type,
            'quantity' => $this->quantity,
            'adult_extra' => $this->adult_extra,
            'child_extra' => $this->child_extra,
            'baby_extra' => $this->baby_extra,
            'room_id'=> isset($this->room)?$this->room->id:null,
            
        ];
    }
}
