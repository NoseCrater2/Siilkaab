<?php

namespace App\Http\Controllers\Api;

use App\Messages;
use App\Hotel;
use App\HotelCredentials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CredentialsIndexResource;
use App\Http\Controllers\Controller;


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
            "paypal" => "nullable|email",
            "hotels"    => "required|array|min:1",
            "hotels.*"  => "required|exists:hotels,id|distinct|min:1|different:hotel_id",
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $c = DB::transaction(function()use ($data){
            $credential = HotelCredentials::create($data);
            Hotel::whereIn('id',$data['hotels'])->update(['credentials_id' => $credential->id]);
            return $credential;
            });
            return new CredentialsIndexResource(HotelCredentials::findOrFail($c->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HotelCredentials  $hotelCredentials
     * @return \Illuminate\Http\Response
     */
    public function show($idHotel)
    {
        return new CredentialsIndexResource(HotelCredentials::findOrFail($idHotel));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HotelCredentials  $hotelCredentials
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idHotel)
    {
        $hotelCredentials = HotelCredentials::findOrFail($idHotel);
        $data = $request->all();

        $rules = [
            "paypal" => "nullable|email",
            "hotels"    => "array|min:1",
            "hotels.*"  => "exists:hotels,id|distinct|min:1",
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
           DB::transaction(function()use ($data, $hotelCredentials){
              // dd($hotelCredentials->id);
            $hotelCredentials->update($data);
            Hotel::whereIn('id',$data['hotels'])->update(['credentials_id' => $hotelCredentials->id]);
            });
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

   
}
