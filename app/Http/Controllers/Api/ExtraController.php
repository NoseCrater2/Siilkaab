<?php

namespace App\Http\Controllers\Api;

use App\Extra;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ExtraIndexResource;

class ExtraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ExtraIndexResource::collection(
            Extra::all()
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
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0'
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
        }else{
            $extra = Extra::create($data);
             return new ExtraIndexResource(Extra::findOrFail($extra->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function show(Extra $extra)
    {
        return new ExtraIndexResource(Extra::findOrFail($extra->id));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Extra $extra)
    {
        $data = $request->all();

        $rules = [
            'title' => 'string',
            'description' => 'string',
            'date' => 'date',
            'amount' => 'numeric|min:0'
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $extra->update($data);
            return new ExtraIndexResource(Extra::findOrFail($extra->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Extra $extra)
    {
        $extra->delete();
        return new ExtraIndexResource($extra);
    }
}
