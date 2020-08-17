<?php

namespace App\Http\Controllers\Api;

use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\CurrencyIndexResource;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CurrencyIndexResource::collection(
            Currency::all()
        );
    }

   


    /**
     * Display the specified resource.
     *
     * @param  \App\Currency  $currency
     * @return \Illuminate\Http\Response
     */
    public function show(Currency $currency)
    {
        return new CurrencyIndexResource(Currency::findOrFail($currency->id));
    }

    
}
