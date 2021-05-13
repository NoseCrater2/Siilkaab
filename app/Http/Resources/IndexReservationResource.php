<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexReservationResource extends JsonResource
{
    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // $carbon = new Carbon();
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'guest' => $this->guest_last_name.', '.$this->guest_name,
            'hotel' => $this->hotel->title,
            'from' => $this->from,
            'to' => $this->to,
            'total_price' => $this->hotel->configuration->currency->symbol.$this->total_price.' '.$this->hotel->configuration->currency->code,
            'state' => $this->state,
            'guest_name' => $this->guest_name,
        ];
    }
}
