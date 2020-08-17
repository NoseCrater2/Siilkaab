<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SecurityIndexResource extends JsonResource
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
            'alltime_security' => $this->alltime_security,
            'security_alarm' => $this->security_alarm,
            'smoke_alarm' => $this->smoke_alarm,
            'cctv_indoor' => $this->cctv_indoor,
            'cctv_outoor' => $this->cctv_outoor,
            'fire_extinguishers' => $this->fire_extinguishers,
            'safe' => $this->safe,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
