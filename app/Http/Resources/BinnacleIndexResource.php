<?php

namespace App\Http\Resources;
use App\User;

use Illuminate\Http\Resources\Json\JsonResource;

class BinnacleIndexResource extends JsonResource
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
            'user' => $this->actor_id > 0 ? $this->userName($this->actor_id) : 'Cliente',
            'user_id' => $this->actor_id,
            'action' => $this->action,
            'model' =>substr($this->binnacleable_type,4,strlen($this->binnacleable_type)),
            'ip' =>$request->ip(),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }

    public function userName($id)
    {
        $user = User::find($id);
        if($user == null){
            return 'Deleted user';
        }
        return $user->name.' '.$user->last_name;
    }
}
