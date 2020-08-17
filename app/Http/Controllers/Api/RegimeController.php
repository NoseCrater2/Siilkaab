<?php

namespace App\Http\Controllers\Api;

use App\Regime;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RegimeIndexResource;


class RegimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RegimeIndexResource::collection(
            Regime::all()
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
            'priority' => 'required|in:normal,medium,high',
            'only_room' => 'boolean',
            'start_period' => 'date_format:Y-m-d H:i',
            'final_period' => 'date_format:Y-m-d H:i|after:start_period',
            'lodging_breakfast_children' => 'numeric',
            'lodging_breakfast_adult' => 'numeric',
            'half_pension_children' => 'numeric',
            'half_pension_adult' => 'numeric',
            'full_pension_children' => 'numeric',
            'full_pension_adult' => 'numeric',
            'all_included_children' => 'numeric',
            'all_included_adult' => 'numeric',
            'hotel_id' => 'required|exists:hotels,id',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return $validator->errors();
        }else{
            $regime = Regime::create($data);
            return new RegimeIndexResource(Regime::findOrFail($regime->id));
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Regime  $regime
     * @return \Illuminate\Http\Response
     */
    public function show(Regime $regime)
    {
        return new RegimeIndexResource(Regime::findOrFail($regime->id));
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Regime  $regime
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Regime $regime)
    {
        $data = $request->all();

        $rules  = [
            'priority' => 'in:normal,medium,high',
            'only_room' => 'boolean',
            'start_period' => 'date_format:Y-m-d H:i',
            'final_period' => 'date_format:Y-m-d H:i|after:start_time',
            'lodging_breakfast_children' => 'numeric',
            'lodging_breakfast_adult' => 'numeric',
            'half_pension_children' => 'numeric',
            'half_pension_adult' => 'numeric',
            'full_pension_children' => 'numeric',
            'full_pension_adult' => 'numeric',
            'all_included_children' => 'numeric',
            'all_included_adult' => 'numeric',
            'hotel_id' => 'exists:hotels,id',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $regime->update($data);
            return new RegimeIndexResource(Regime::findOrFail($regime->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Regime  $regime
     * @return \Illuminate\Http\Response
     */
    public function destroy(Regime $regime)
    {
        $regime->delete();
    }
}
