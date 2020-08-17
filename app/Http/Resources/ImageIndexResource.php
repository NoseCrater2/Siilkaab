<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageIndexResource extends JsonResource
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
            'image1' => url('img/'.$this->image1),
            'image2' => url('img/'.$this->image2),
            'image3' => url('img/'.$this->image3),
            'image4' => url('img/'.$this->image4),
            'room_id'=> isset($this->room)?$this->room->id:null,
            ];
    }
}
