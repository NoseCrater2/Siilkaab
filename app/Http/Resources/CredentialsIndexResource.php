<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CredentialsIndexResource extends JsonResource
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
            'paypal' => $this->paypal,
            'mercadopago_client_id' => $this->mercadopago_client_id,
            'expiration_at' => Carbon::now()->addSeconds($this->expiration_at)->diffForHumans() ,
           
        ];
    }
}
