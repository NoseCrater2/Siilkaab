<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantIndexResource extends JsonResource
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
            'menu_type' => $this->menu_type,
            'schedules' => $this->schedules->map(function ($s)
            {
                return ['id' => $s->id,
                        'day' => json_decode($s->day),
                        'start_time' => $s->start_time,
                        'end_time' => $s->end_time,
                        ];
            }),
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
