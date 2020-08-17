<?php

namespace App\Http\Controllers\Api;

use App\Discount;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\DiscountIndexResource;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DiscountIndexResource::collection(
            Discount::all()
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
            'type' => 'required|in:range,date,days,percent,nights,hot_sale,code',
            'start' => 'required_if:type,range|date',
            'end' => 'required_if:type,range|date|after:start',
            'day' => 'required_if:type,date|date',
            'nights' => 'boolean',
            'monday' => 'boolean',
            'tuesday' => 'boolean',
            'wednesday' => 'boolean',
            'thursday' => 'boolean',
            'friday' => 'boolean',
            'saturday' => 'boolean',
            'sunday' => 'boolean',
            'code' => 'string',
            'unitary_discount' => 'numeric|min:0',
            'general_discount' => 'numeric|min:0',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
        }else{
            $discount = Discount::create($data);
             return new DiscountIndexResource(Discount::findOrFail($discount->id));
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function show(Discount $discount)
    {
        return new DiscountIndexResource(Discount::findOrFail($discount->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Discount $discount)
    {
        $data = $request->all();

        $rules = [
            'type' => 'in:range,date,days,percent,nights,hot_sale,code',
            'start' => 'required_if:type,range|date',
            'end' => 'required_if:type,range|date|after:start',
            'day' => 'required_if:type,date|date',
            'nights' => 'boolean',
            'monday' => 'boolean',
            'tuesday' => 'boolean',
            'wednesday' => 'boolean',
            'thursday' => 'boolean',
            'friday' => 'boolean',
            'saturday' => 'boolean',
            'sunday' => 'boolean',
            'code' => 'string',
            'unitary_discount' => 'numeric|min:0',
            'general_discount' => 'numeric|min:0',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $discount->update($data);
            return new DiscountIndexResource(Discount::findOrFail($discount->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function destroy(Discount $discount)
    {
        $discount->delete();
        return new DiscountIndexResource($discount);
    }
}
