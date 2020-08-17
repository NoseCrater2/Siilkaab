<?php

namespace App\Http\Controllers\Api;

use App\Rate;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RateIndexResource;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RateIndexResource::collection(
            Rate::all()
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
            'type' => 'required|in:room,person',
            'rack' => 'required|numeric|min:0',
            'monday' => 'numeric|min:0',
            'tuesday' => 'numeric|min:0',
            'wednesday' => 'numeric|min:0',
            'thursday' => 'numeric|min:0',
            'friday' => 'numeric|min:0',
            'saturday' => 'numeric|min:0',
            'sunday' => 'numeric|min:0',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
        }else{
            $rate =  Rate::create($data);
            return new RateIndexResource(Rate::findOrFail($rate->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function show(Rate $rate)
    {
        return new RateIndexResource(Rate::findOrFail($rate->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rate $rate)
    {
        $data = $request->all();

        $rules = [
            'type' => 'in:room|person',
            'rack' => 'numeric|min:0',
            'monday' => 'numeric|min:0',
            'tuesday' => 'numeric|min:0',
            'wednesday' => 'numeric|min:0',
            'thursday' => 'numeric|min:0',
            'friday' => 'numeric|min:0',
            'saturday' => 'numeric|min:0',
            'sunday' => 'numeric|min:0',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $rate->update($data);
            return new RateIndexResource(Rate::findOrFail($rate->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rate $rate)
    {
        $rate->delete();
        return new RateIndexResource($rate);
    }
}
