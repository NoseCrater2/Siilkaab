<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Srmklive\PayPal\Facades\PayPal;
use Srmklive\Paypal\Services\AdaptivePayments;
use GuzzleHttp\Client;

class PayPalController extends Controller
{
    
    public function index(){
        
        $client = new Client([
            'base_url' => "https://api.sandbox.paypal.com",

        ]);

        $method = 'POST';
        $requestUrl = "/v2/checkout/orders";
        $isJsonRequest = true;
        $formParams = [
            'intent' => 'CAPTURE',
            'purchace_units' => [
                0 =>[
                    'amount' => [
                        'currency_code' => 'MXN',
                        'value' => '10.00',
                    ],
                    'payee' => [
                        'email_address' => 'sb-b1ukc2788291@business.example.com'
                    ],
                    'payment_instruction' => [
                        'disbursement_mode' => 'INSTANT',
                        'disbursement_mode' => [
                            0 => [
                                'amount' => [
                                    'currency_code' => 'MXN',
                                    'value' => "0.00"
                                ]
                            ]
                        ]
                    ],

                ]
            ],

        ];
        $headers = [
            'Content-Type'=> 'application/json',
            'Autorization' => 'Bearer A21AAEiX41dmXxl6Y2h6AekhlBJ0apSOsMKoF2AM4OEjrltodEtvf_PDRaLBYqsyc7Nqg1TAPcWdIdYCT8muwbL8L2WInZWzw'
        ];

        $queryParams = "";

        $response = $client->request($method, $requestUrl, [
            $isJsonRequest ? 'json' : 'form_params' => $formParams,
            'headers' => $headers,
            'query' => '',
        ]);

      
        $response = $response->getBody()->getContents();
    }

    public function store(Request $request)
    {
        return response(['id'=>"0VR91655FK612031F"],200,[]);
    }
}