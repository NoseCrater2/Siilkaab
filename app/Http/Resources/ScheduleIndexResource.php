<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleIndexResource extends JsonResource
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
            'day' => $this->day,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'restaurant_id'=> isset($this->restaurant)?$this->restaurant->id:null,
            'restaurant'=> isset($this->restaurant)?$this->restaurant->name:null,
        ];
    }
}
