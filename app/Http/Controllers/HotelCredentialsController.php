<?php

namespace App\Http\Controllers;

use App\Messages;
use App\HotelCredentials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CredentialsIndexResource;
use GuzzleHttp\Client;

class HotelCredentialsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CredentialsIndexResource::collection(
            HotelCredentials::all()
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
            'paypal' => 'email',
            'mercadopago_client_id' => 'string',
            'expiration_at' => 'numeric',
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
        }else{
            $contact = HotelCredentials::create($data);
             return new CredentialsIndexResource(HotelCredentials::findOrFail($contact->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HotelCredentials  $hotelCredentials
     * @return \Illuminate\Http\Response
     */
    public function show(HotelCredentials $hotelCredentials)
    {
        return new CredentialsIndexResource(HotelCredentials::findOrFail($hotelCredentials->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HotelCredentials  $hotelCredentials
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HotelCredentials $hotelCredentials)
    {
        $data = $request->all();

        $rules = [
            'paypal' => 'email',
            'mercadopago_client_id' => 'string',
            'expiration_at' => 'numeric',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $hotelCredentials->update($data);
            return new CredentialsIndexResource(HotelCredentials::findOrFail($hotelCredentials->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HotelCredentials  $hotelCredentials
     * @return \Illuminate\Http\Response
     */
    public function destroy(HotelCredentials $hotelCredentials)
    {
        $hotelCredentials->delete();
    }

    public function getNewAuthorization(Request $request)
    {
        //https://auth.mercadopago.com.mx/authorization?client_id='+process.env.MIX_MERCADOPAGO_APP_ID+'&response_type=code&platform_id=mp&http://127.0.0.0:8000/payment-options';
        $client = new Client();
        $method = 'GET';
        $requestUrl = 'https://auth.mercadopago.com.mx/authorization';
        $queryParams = [
            'client_id' => env('MIX_MERCADOPAGO_APP_ID'),
            'response_type' => 'code',
            'platform_id' => 'mp',
            'https://127.0.0.0:8000/payments'
        ];


        $response = $client->request($method, $requestUrl, [
            //'form_params' => $formParams,
            //'headers' => $headers,
            'query' => $queryParams,
        ]);
        return $response->getBody()->getContents();
    }
}
