<?php

namespace App\Http\Controllers\Api;

use App\Messages;
use App\Configuration;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ConfigurationIndexResource;


class ConfigurationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ConfigurationIndexResource::collection(
            Configuration::all()
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
            'notification_voucher' => 'required|array|min:1',
            'notification_voucher.*' => 'required|email|distinct',
            'notification_details' => 'required|array|min:1',
            'notification_details.*' => 'required|email|distinct',
            'notification_card' => 'required|array|min:1',
            'notification_card.*' => 'required|email|distinct',
            'timezone' => 'required|timezone',
            'payment_place' => 'required|in:online,offline,both',
            'payment_type'  =>'required',
            'color' => 'string|nullable',
            'currency_id' => 'required|exists:currencies,id',
            'hotel_id' => 'required|exists:hotels,id'
        ];
                
         
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $data['notification_voucher'] = json_encode($data['notification_voucher']);
            $data['notification_details'] = json_encode($data['notification_details']);
            $data['notification_card'] = json_encode($data['notification_card']);
            $data['payment_type'] = json_encode($data['payment_type']);
            $configuration = Configuration::create($data);
            return new ConfigurationIndexResource(Configuration::findOrFail($configuration->id));
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Configuration  $configuration
     * @return \Illuminate\Http\Response
     */
    public function show(Configuration $configuration)
    {
        return new ConfigurationIndexResource(Configuration::findOrFail($configuration->id));
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Configuration  $configuration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Configuration $configuration)
    {
        $data = $request->all();
        $rules = [
            'notification_voucher' => 'required|array|min:1',
            'notification_voucher.*' => 'required|email|distinct',
            'notification_details' => 'required|array|min:1',
            'notification_details.*' => 'required|email|distinct',
            'notification_card' => 'required|array|min:1',
            'notification_card.*' => 'required|email|distinct',
            'timezone' => 'required|timezone',
            'payment_place' => 'required|in:online,offline,both',
            'payment_type'  =>'required',
            'color' => 'string|nullable',
            'currency_id' => 'exists:currencies,id',
            'hotel_id' => 'exists:hotels,id'
        ];
                
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $data['notification_voucher'] = json_encode($data['notification_voucher']);
            $data['notification_details'] = json_encode($data['notification_details']);
            $data['notification_card'] = json_encode($data['notification_card']);
            $data['payment_type'] = json_encode($data['payment_type']);
            $configuration->update($data);
            return new ConfigurationIndexResource(Configuration::findOrFail($configuration->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Configuration  $configuration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Configuration $configuration)
    {
        $configuration->delete();
    }
}
