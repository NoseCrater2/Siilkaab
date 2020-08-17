<?php

namespace App\Http\Controllers\Api;

use App\Pool;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PoolIndexResource;


class PoolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PoolIndexResource::collection(
            Pool::all()
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
            'type' => 'in:outdoor,indoor',
            'name' => 'required|string',
            'air_conditioned' => 'boolean',
            'panoramic_view' => 'boolean',
            'wading_pool' => 'boolean',
            'towels' => 'boolean',
            'bar_pool' => 'boolean',
            'open_at' => 'required|date_format:H:i',
            'hotel_id' => 'required|exists:hotels,id'
        ];
                
         
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return $validator->errors();
        }else{
            $pool = Pool::create($data);
            return new PoolIndexResource(Pool::findOrFail($pool->id));
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Pool  $pool
     * @return \Illuminate\Http\Response
     */
    public function show(Pool $pool)
    {
        return new PoolIndexResource(Pool::findOrFail($pool->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pool  $pool
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pool $pool)
    {
        $data = $request->all();
        $rules = [
            'type' => 'in:outdoor,indoor',
            'name' => 'string',
            'air_conditioned' => 'boolean',
            'panoramic_view' => 'boolean',
            'wading_pool' => 'boolean',
            'towels' => 'boolean',
            'bar_pool' => 'boolean',
            'open_at' => 'date_format:H:i',
            'hotel_id' => 'exists:hotels,id'
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $pool->update($data);
            return new PoolIndexResource(Pool::findOrFail($pool->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pool  $pool
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pool $pool)
    {
        $pool->delete();
    }
}
