<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PoolIndexResource extends JsonResource
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
            'air_conditioned' => $this->air_conditioned,
            'panoramic_view' => $this->panoramic_view,
            'wading_pool' => $this->wading_pool,
            'towels' => $this->towels,
            'bar_pool' => $this->bar_pool,
            'open_at' => $this->open_at,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
