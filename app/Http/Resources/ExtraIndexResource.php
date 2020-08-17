<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExtraIndexResource extends JsonResource
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
        'title' => $this->title,
        'hotel_id' => $this->hotel_id,
        'description' => $this->description,
        'date' => $this->date,
        'amount' => $this->amount,
        ];
    }
}
