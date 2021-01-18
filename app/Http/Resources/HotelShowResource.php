<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

class HotelShowResource extends JsonResource
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
            'idConfiguration' => isset ($this->configuration) ? $this->configuration->id : null,
            'idContact' => isset ($this->contact) ? $this->contact->id : null,
            'idCondition' => isset ($this->condition) ? $this->condition->id : null,
            'idRegime' => $this->regimes->map(function($regime){return $regime->id;}),
            'idAmenity' => isset ($this->amenity) ? $this->amenity->id : null,
            'title' => $this->title,
            'url' => url($this->url),
            'reference_code' => $this->reference_code,
            'image' => $this->image,
            'large_text' => $this->large_text,
            'short_text' => $this->short_text,
            'type' => $this->type,
            'num_rooms' => $this->num_rooms,
            'num_floors' => $this->num_floors,
            'enabled' => $this->enabled,
            'children_age' => isset ($this->condition)?$this->condition->children_age:null,
            'only_adults' => isset ($this->condition)?$this->condition->adults:null,
            'max_adults' => $this->maxAdultsOcupancy(),
            'max_children' => $this->maxChildrenOcupancy(),

            
        ];
    }

    public function maxAdultsOcupancy()
    {
        if(isset($this->rooms)){
            $ocuppanciesA = new Collection();
            $this->rooms->map(function($room) use($ocuppanciesA){
             $ocuppanciesA->push($room->max_adults);
            });
            return $ocuppanciesA->max();
        }else{
            return 0;
        }
    }

    public function maxChildrenOcupancy()
    {
        if(isset($this->rooms)){
            $ocuppanciesC = new Collection();
            $this->rooms->map(function($room) use($ocuppanciesC){
             $ocuppanciesC->push($room->max_children);
            });
            return $ocuppanciesC->max();
        }else{
            return 0;
        }
    }
}
