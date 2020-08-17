<?php

namespace App\Http\Controllers\Api;

use App\Country;
use App\Http\Controllers\Controller;
use App\Http\Resources\CountryIndexResource;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CountryIndexResource::collection(
            Country::all()
        );
    }

    
    /**
     * Display the specified resource.
     *
     * @param  \App\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return new CountryIndexResource(Country::findOrFail($country->id));
    }

   
}
