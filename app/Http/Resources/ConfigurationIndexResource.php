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
            'notification_details' => json_decode($this->notification_details),
            'notification_voucher' => json_decode($this->notification_voucher),
            'notification_card' => json_decode($this->notification_card),
            'timezone' => $this->timezone,
            'payment_place' => $this->payment_place,
            'payment_type'  =>json_decode($this->payment_type),
            'currency_id' => isset($this->currency)?$this->currency->id:null,
            'currency' => isset($this->currency)?$this->currency->name.' | '.$this->currency->code.' | '.$this->currency->symbol:null,
            'currency_code' => $this->currency->code,
            'currency_symbol' => $this->currency->symbol,
            'color' => $this->color,
            'hotel_id'=> isset($this->hotel)?$this->hotel->id:null,
            'hotel'=> isset($this->hotel)?$this->hotel->title:null,
            
        ];
    }
}
