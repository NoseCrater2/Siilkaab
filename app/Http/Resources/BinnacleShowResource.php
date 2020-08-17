<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;

class BinnacleShowResource extends JsonResource
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
            'user' => $this->actor_id,
            'action' => $this->action,
            'parent' => isset($this->binnacleable)?$this->binnacleable->getModel():null,
            'details' => $this->body== null?$this->binnacleable:json_decode($this->body),
            'model' =>substr($this->binnacleable_type,4,strlen($this->binnacleable_type)),
            'model_id' => $this->binnacleable_id,
            'ip' =>$request->ip(),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
