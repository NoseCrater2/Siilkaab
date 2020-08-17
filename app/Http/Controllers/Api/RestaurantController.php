<?php

namespace App\Http\Controllers\Api;

use App\Messages;
use App\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RestaurantIndexResource;


class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RestaurantIndexResource::collection(
            Restaurant::all()
        );
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $rules = [
            'name' => 'required',
            'menu_type' => 'required|in:a la carte,buffet,both',
            'hotel_id' => 'required|exists:hotels,id'
        ];
                 
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $restaurant = Restaurant::create($data);
            return new RestaurantIndexResource(Restaurant::findOrFail($restaurant->id));
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function show(Restaurant $restaurant)
    {
        return new RestaurantIndexResource(Restaurant::findOrFail($restaurant->id));
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $data = $request->all();
        $rules = [
            'name' => 'string',
            'menu_type' => 'in:a la carte,buffet,both',
            'hotel_id' => 'exists:hotels,id'
        ];
                
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
        }else{
            $restaurant->update($data);
            return new RestaurantIndexResource(Restaurant::findOrFail($restaurant->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
    }
}
