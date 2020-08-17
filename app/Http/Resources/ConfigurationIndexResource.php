<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConfigurationIndexResource extends JsonResource
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
            'notification_details' => $this->notification_details,
            'notification_voucher' => $this->notification_voucher,
            'notification_card' => $this->notification_card,
            'timezone' => $this->timezone,
            'payment_place' => $this->payment_place,
            'payment_type' => $this->payment_type,
            'currency_id' => isset($this->currency)?$this->currency->id:null,
            'currency' => isset($this->currency)?$this->currency->name.' | '.$this->currency->code.' | '.$this->currency->symbol:null,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
            
        ];
    }
}
