<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class HotelIndexResource extends JsonResource
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
            'title' => $this->title,
            'reference_code' => $this->reference_code,
            'rooms' => $this->rooms->count(),
            'rates' => $this->rooms()->where('rate_id','!=' ,null)->count(),
            'discounts' => $this->rooms()->where('discount_id','!=' ,null)->count(),
            'extras' => $this->rooms()->where('extra_id','!=' ,null)->count(),
            'enabled' => $this->enabled
        ];
    }
}
