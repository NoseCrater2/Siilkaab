<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class NoteIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $carbon = new Carbon();
        return [
            'id' => $this->id,
            'content' => $this->content,
            'user' => $this->user->name.' '.$this->user->last_name,
            'created_at' => $carbon->parse($this->created_at)->diffForHumans(),
        ];
    }
}
