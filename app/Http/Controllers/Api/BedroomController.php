<?php

namespace App\Http\Controllers\Api;

use App\Bedroom;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\BedroomIndexResource;

class BedroomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show','index']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BedroomIndexResource::collection(
            Bedroom::all()
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
             'private_bathroom' => 'Integer|in:0,1',
             'adult_extra' => 'Integer|min:0',
             'child_extra' => 'Integer|min:0',
             'baby_extra' => 'Integer|min:0',
             'room_id' => 'required|exists:rooms,id',
         ];
 
       
         $validator= Validator::make($data,$rules, Messages::getMessages());
         
         if($validator->fails()){
             return response($validator->errors(),422);
         }else{
             $bedroom = Bedroom::create($data);
             return new BedroomIndexResource(Bedroom::findOrFail($bedroom->id));
         }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Bedroom  $bedroom
     * @return \Illuminate\Http\Response
     */
    public function show(Bedroom $bedroom)
    {
        return new BedroomIndexResource(Bedroom::findOrFail($bedroom->id));
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bedroom  $bedroom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bedroom $bedroom)
    {
        $data = $request->all();
        $rules = [
             'private_bathroom' => 'Integer|in:0,1',
             'adult_extra' => 'Integer|min:0',
             'child_extra' => 'Integer|min:0',
             'baby_extra' => 'Integer|min:0',
             'room_id' => 'exists:rooms,id',
         ];
 
       
         $validator= Validator::make($data,$rules, Messages::getMessages());
         
         if($validator->fails()){
             return response($validator->errors(),422);
         }else{
             $bedroom->update($data);
             return new BedroomIndexResource(Bedroom::findOrFail($bedroom->id));
         }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Bedroom  $bedroom
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bedroom $bedroom)
    {
        $bedroom->delete();
        return new BedroomIndexResource(Bedroom::findOrFail($bedroom->id));
    }
}
