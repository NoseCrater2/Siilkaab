<?php

namespace App\Traits;

use GuzzleHttp\Client;

trait ConsumeExternalServices{

    public function makeRequest($method, $requestUrl, $queryParams = [], $formParams = [], $headers = [], $isJsonRequest = false)
    {
        $client = new Client([
            'base_uri' => $this->baseUri,

        ]);

        // $client->request('GET', '/', ['verify' => base_path('cacert.pem')]);

      
        if(method_exists($this, 'resolveAuthorization')){
            $this->resolveAuthorization($queryParams, $formParams, $headers);
        }
      
        $response = $client->request($method, $requestUrl, [
            $isJsonRequest ? 'json' : 'form_params' => $formParams,
            'headers' => $headers,
            'query' => $queryParams,
            'verify' => base_path('cacert.pem'),
        ]);

      
        $response = $response->getBody()->getContents();
        
        if(method_exists($this, 'decodeResponse')){
            $response = $this->decodeResponse($response);
        }
       
    
        return $response;
    }
}