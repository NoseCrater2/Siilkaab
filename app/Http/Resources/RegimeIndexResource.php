<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RegimeIndexResource extends JsonResource
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
            'priority' => $this->priority,
            'only_room' => $this->only_room,
            'start_period' => $this->start_period,
            'final_period' => $this->final_period,
            'lodging_breakfast_children' => $this->lodging_breakfast_children,
            'lodging_breakfast_adult' => $this->lodging_breakfast_adult,
            'half_pension_children' => $this->half_pension_children,
            'half_pension_adult' => $this->half_pension_adult,
            'full_pension_children' => $this->full_pension_children,
            'full_pension_adult' => $this->full_pension_adult,
            'all_included_children' => $this->all_included_children,
            'all_included_adult' => $this->all_included_adult,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
