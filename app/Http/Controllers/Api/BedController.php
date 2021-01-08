<?php

namespace App\Http\Controllers\Api;

use App\Bed;
use Illuminate\Http\Request;
use App\Messages;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\BedIndexResource;

class BedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BedIndexResource::collection(
            Bed::all()
        );   
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'type' => 'required|in:twin,full,queen,king,triple,quad',
            'quantity' => 'required|Integer|min:0|max:20',
            'bedroom_id' => 'required|exists:bedrooms,id',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $bed = Bed::create($data);
             return new BedIndexResource(Bed::findOrFail($bed->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Bed  $bed
     * @return \Illuminate\Http\Response
     */
    public function show(Bed $bed)
    {
        return new BedIndexResource(Bed::findOrFail($bed->id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Bed  $bed
     * @return \Illuminate\Http\Response
     */
    public function edit(Bed $bed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bed  $bed
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bed $bed)
    {
        $data = $request->all();

        $rules = [
            'type' => 'in:twin,full,queen,king,triple,quad',
            'quantity' => 'Integer|min:0|max:20',
            'bedroom_id' => 'exists:bedrooms,id',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $bed->update($data);
            return new BedIndexResource(Bed::findOrFail($bed->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Bed  $bed
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bed $bed)
    {
        $bed->delete();
        return new BedIndexResource($bed);
    }
}
