<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Traits\ConsumeExternalServices;

class CurrencyConversionService
{
    use ConsumeExternalServices;

    protected $baseUri;
    protected $apiKey;

    public function __construct() {
        $this->baseUri = config('services.currency_conversion.base_uri'); 
    }


    public function decodeResponse($response)
    {
        return json_decode($response);
    }



    public function convertCurrency($from, $to)
    {
        $response = $this->makeRequest(
            'GET',
            '/latest',
            [
                'base' => $from,
                'symbols' => $to
            ]

        );
        return $response->rates->{$to};
    }
}
