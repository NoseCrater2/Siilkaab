<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConditionIndexResource extends JsonResource
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
            'adults' => $this->adults,
            'children_age' => $this->children_age,
            'adults_age' => $this->adults_age,
            'adults_regimen' => $this->adults_regimen,
            'checkin_time' => $this->checkin_time,
            'checkout_time' => $this->checkout_time,
            'cancelation_text' => $this->cancelation_text,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
