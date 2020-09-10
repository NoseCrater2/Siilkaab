<?php

namespace App\Services;

use App\HotelCredentials;
use App\Hotel;
use Illuminate\Http\Request;
use App\Traits\ConsumeExternalServices;

class MercadoPagoService{

    use ConsumeExternalServices;

    protected $baseUri;

    protected $key;

    protected $secret;

    protected $secretKey;
    protected $redirectUri;
    protected $appID;

    protected $base_currency;

    protected $converter;
    
    public function __construct(CurrencyConversionService $converter) {
        $this->baseUri = config('services.mercadopago.base_uri');
        $this->key = config('services.mercadopago.key');
       // $this->secret = config('services.mercadopago.secret');
        $this->secretKey = config('services.mercadopago.secret_key');
        $this->redirectUri = config('services.mercadopago.redirect_uri');
        $this->appID = config('services.mercadopago.app_id');
        $this->baseCurrency = config('services.mercadopago.base_currency');
        $this->converter = $converter;
    
    }

    public function resolveAuthorization(&$queryParams, &$formParams, &$headers)
    {
        //$queryParams['access_token'] = $this->resolveAccesToken();
    }

    public function decodeResponse($response)
    {
        return json_decode($response);
    }


    public function resolveAccesToken()
    {
       //return $this->secret;
    }

    public function handlePayment(Request $request)
    {

       $request->validate([
           'card_network' => 'required',
           'card_token' => 'required',
           'email' => 'required',
           'idHotel' => 'required|exists:hotels,id'
       ]); 

       $payment = $this->createPayment(
           $request->value,
           $request->currency,
           $request->card_network,
           $request->card_token,
           $request->email,
           1,
           $request->idHotel
       );

       
       if ($payment->status === "approved") {
           $name = $payment->payer->first_name;
           $currency = $payment->currency_id;
           $amount = number_format($payment->transaction_amount,0,",",".");
           $originalAmount = $request->value;
           $originalCurrency = $request->currency;
           $res = ['payment' => "Thanks, {$name}. We received your {$originalAmount}{$originalCurrency} payment ({$amount}{$currency})"];
           return response($res,200);
           
       }
       $res = 'We were unable to confirm your payment. Try again, please';
       return response($res,500);
    }

    public function handleApproval()
    {
        //
    }

    public function createPayment($value, $currency, $cardNetwork, $cardToken, $email, $installments = 1, $idHotel)
    {
        $register =  Hotel::findOrFail($idHotel);
        return $this->makeRequest(
            'POST',
            '/v1/payments',
            ['access_token' =>$register->hotelCredentials->mercadopago_at],//Token de vendedor
            [
                'payer' => [
                    'email' => $email
                ],
                'binary_mode' => true,
                'transaction_amount' => round($value * $this->resolveFactor($currency)),
                'payment_method_id' => $cardNetwork,
                'token' => $cardToken,
                'installments' => $installments,
                'statement_descriptor' => config('app.name'),
            ],
            [],
            $isJsonRequest  = true
        );
    }

    
    public function resolveFactor($currency)
    {
        return $this->converter->convertCurrency($currency,$this->baseCurrency);
    }


    public function setSellerAuthentication($code)
    {
        return $this->makeRequest(
            'POST',
            '/oauth/token',
            [],
            [
                'client_secret' => $this->secretKey,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $this->redirectUri,
                'code' => $code,

                'client_id' => $this->appID,
            ],
            [],
            $isJsonRequest  = true
        );
    }

    public function updateSellerAuthentication($id)
    {
       $register =  HotelCredentials::findOrFail($id);
       return $this->makeRequest(
        'POST',
        '/oauth/token',
        [],
        [
            'client_secret' => $this->secretKey,
            'grant_type' => 'refresh_token',
            'refresh_token' => $register->mercadopago_rt,
            'live_mode' => false,
            'client_id' => $this->appID,
        ],
        ['content-type' => 'application/x-www-form-urlencoded'],
        $isJsonRequest  = true
    );

    }

  
}