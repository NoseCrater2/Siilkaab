<?php

namespace App\Services;

use GuzzleHttp\Client;
use App\Hotel;
use Illuminate\Http\Request;
use App\Traits\ConsumeExternalServices;


class PayPalService{

    use ConsumeExternalServices;

    protected $clientId;

    protected $clientSecret;

    public  $baseUri;
    
    public function __construct() {
        $this->baseUri = config('services.paypal.base_uri');
        $this->clientId = config('services.paypal.client_id');
        $this->clientSecret = config('services.paypal.client_secret');
    }
   
    public function resolveAuthorization(&$queryParams, &$formParams, &$headers)
    {
      

        $headers['Authorization'] = "Bearer ".$this->resolveAccesToken();
      
    }

    public function decodeResponse($response)
    {
       return json_decode($response);
    }


    public function resolveAccesToken()
    {

        // $credentials = base64_encode("{$this->clientId}:{$this->clientSecret}");
        // return "Basic {$credentials}";
        $client = new Client();
       $res = $client->request('POST','https://api.sandbox.paypal.com/v1/oauth2/token',
            [
            "auth"=> [$this->clientId,$this->clientSecret],
            "headers"=> [
                "Accept"=> "application/json",
                "Accept-Language"=> "en_US",
            ],
            
            "body" => "grant_type=client_credentials"]
        ); 

        $response =  $res->getBody()->getContents();
        return json_decode($response)->{'access_token'};
    }

    public function handlePayment(Request $request)
    {
        $order = $this->createOrder($request->value, $request->currency, $request->idHotel);

        $orderLinks = collect($order->links);

        $approve = $orderLinks->where('rel', 'approve')->first();

        session()->put('approvalId', $order->id);
        
       
        return (['id'=> $order->id]);
    }

    public function handleApproval($orderID)
    {
        if($orderID !== null){
           // $approvalId = session()->get('approvalId');

            $payment = $this->capturePayment($orderID);

            $name = $payment->payer->name->given_name;
            $payment = $payment->purchase_units[0]->payments->captures[0]->amount;
            $amount = $payment->value;
            $currency = $payment->currency_code;

            return response(['payment' => "Thanks, {$name}. We received your {$amount}{$currency} payment."],200);
            // return redirect()
            //     ->route('payments')
            //     ->withSuccess(['payment' => "Thanks, {$name}. We received your {$amount}{$currency} payment."]);
        }

        return response('We cannot capture your payment. Try again, please.',200);
    }

    public function createOrder($value, $currency, $idHotel)
    {
     $register =  Hotel::findOrFail($idHotel);
        return $this->makeRequest(
            'POST',
            '/v2/checkout/orders',
            [],
            [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    0 => [
                        'amount' => [
                            'currency_code' => strtoupper($currency),
                            'value' => round($value * $factor = $this->resolveFactor($currency)) / $factor,
                        ],
                        'payee' => [
                            'email_address' => $register->hotelCredentials->paypal
                        ]
                    ]
                ],
                'application_context' => [
                    'brand_name' => config('app.name'),
                    'shipping_preference' => 'NO_SHIPPING',
                    'user_action' => 'PAY_NOW',
                    'return_url' => route('approval'),
                    'cancel_url' => route('cancelled'),
                ]
            ],
            [],
            $isJsonRequest = true
        );
        
    }

    public function capturePayment($approvalId)
    {
        return $this->makeRequest(
            'POST',
            "/v2/checkout/orders/{$approvalId}/capture",
            [],
            [],
            [
                'Content-Type' => 'application/json',
            ]
        );
    }

    public function resolveFactor($currency)
    {
        $zeroDecimalCurrencies = ['JPY'];

        if(in_array(strtoupper($currency), $zeroDecimalCurrencies)){
            return 1;
        }

        return 100;
    }
}