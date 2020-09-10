<?php

namespace App\Http\Resources;

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
            'hotels' => $this->hotels->map(function ($hotel)
            {
                return $hotel->id;
            }),
            'expiration_at' => $this->expiration_at,
           
        ];
    }
}
