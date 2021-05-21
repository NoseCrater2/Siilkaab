<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserIndexResource extends JsonResource
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
            'all_name' => $this->name.' '.$this->last_name,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'type' => $this->type,
            'language' => $this->language,
            'timezone' => $this->timezone,
            'hotels'  => $this->hotels->map(function($hotel){
                return [
                    'id' => $hotel->id,
                    'title' => $hotel->title."(". $hotel->reference_code.")",
                ];
            }),
            'parent_id' => $this->parent != null?$this->parent->id:null,
            'currency_id'=> isset($this->currency)?$this->currency->id:null,
            'currency'=> isset($this->currency)?$this->currency->name.' | '.$this->currency->code.' | '.$this->currency->symbol:null,
        ];
    }
}
