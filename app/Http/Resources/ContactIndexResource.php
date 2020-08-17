<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactIndexResource extends JsonResource
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
            'url' => $this->url,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'zipcode' => $this->zipcode,
            'city' => $this->city,
            'state' => $this->state,
            'manager_name' => $this->manager_name,
            'legal_rep' => $this->legal_rep,
            'country_id'=> isset($this->country)?$this->country->id:null,
            'country'=> isset($this->country)?$this->country->name:null,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
        ];
    }
}
