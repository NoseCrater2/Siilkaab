<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Hotel;
use DateTimeZone;
use App\Messages;
use App\HotelUser;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\HotelShowResource;
use App\Http\Resources\HotelIndexResource;
use App\Http\Resources\HotelViewResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\RoomViewResource;


class HotelController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show']);
    }
    public function index()
    {
        // $logged_user = User::find($request->user()->id);
        if(auth('sanctum')->user()->type == 'super'){
            return HotelIndexResource::collection(
               Hotel::all()
            );
        };
        return HotelIndexResource::collection(
            auth('sanctum')->user()->hotels
        );

    }

    public function show(Hotel $hotel)
    {
        return new HotelShowResource(Hotel::findOrFail($hotel->id));
    }

    public function store(Request $request)
    {
        $image = null;
        $data = $request->all();
        $rules = [
            'title'=>'required|unique:hotels',
            'url'=>'required|url',
            'reference_code'=>'required',
            'image'=>'image|nullable',
            'short_text' => 'string|nullable',
            'large_text' => 'string|nullable',
            'type' => 'required|in:bungalow,cabana,build',
            'num_rooms' => 'required_if:type,build',
            'num_floors' => 'required_if:type,build',
            'enabled' => 'in:0,1',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());



        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            if($request->hasFile('image')){
                $image= $request->image->store('hotels');
                $data['image']=$image;
            }
            $hotel = Hotel::create($data);
            return new HotelShowResource(Hotel::findOrFail($hotel->id));
        }


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hotel $hotel)
    {
        $data = $request->all();

        $rules = [
            'title'=>'required|unique:hotels,id,'.'$hotel->id',
            'url'=>'url',
            'reference_code'=>'required',
            'image'=>'image',
            'short_text' => 'string|nullable',
            'large_text' => 'string|nullable',
            'type' => 'in:bungalow,cabana,build',
            'num_rooms' => 'required_if:type,build',
            'num_floors' => 'required_if:type,build',
            'enabled' => 'in:0,1',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());



        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            if($request->hasFile('image')){
                Storage::delete($hotel->image);
                $data['image'] = $request->image->store('hotels');
            }
            $hotel->update($data);
            return new HotelShowResource(Hotel::findOrFail($hotel->id));
        }


    }

    public function delete(Request $request)
    {

        $data = $request->all();

        $rules = [
            "hotelIds"    => "required|array|min:1",
            "hotelIds.*"  => "required|exists:hotels,id|distinct|min:1",
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            DB::transaction(function()use ($data){

            HotelUser::whereIn('hotel_id',$data['hotelIds'])->delete();
            Hotel::destroy($data['hotelIds']);

            });

            return response($data['hotelIds'],200);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hotel $hotel)
    {
        DB::transaction(function()use ($hotel){
        $hotel->users()->detach();
        Storage::delete($hotel->image);
        $hotel->delete();
        });
        return new HotelIndexResource($hotel);

    }


    public function convert_currency(Request $request)
    {

        $data = $request->validate([
            'origin'=>'required|in:EUR,USD,MXN',
            'destiny'=>'required|in:EUR,USD,MXN',
            'amount'=>'required|numeric|min:0',
        ]);

        $origen = $request['origin'];
        $destino = $request['destiny'];
        $cantidad = $request['amount'];

        $client = new Client([
            'base_uri' => 'https://api.exchangeratesapi.io/',
            'timeout' => 2.0,
        ]);

        $response = $client->request('GET',"latest?base=$origen&symbols=$destino");
        //$rate = $response->rates



        return $response;

    }

    public function getTimeZones()
    {

        return DateTimeZone::listIdentifiers(DateTimeZone::AMERICA);

    }

    public function getHotelsForNoAdmin()
    {
        $logged_user = User::find(auth('api')->user()->id);
        return HotelViewResource::collection(
            $logged_user->hotels

        );
    }

    public function getHotelsForAdmin()
    {
        return HotelViewResource::collection(
           Hotel::all()
        );
    }

    public function searchRooms(Request $request, Hotel $hotel)
    {
        $data = $request->all();
        $rules = [
            'start' => 'required|date_format:Y-m-d',
            'end' => 'required|date_format:Y-m-d|after:start',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{

          //  return new RoomViewResource(Hotel::findOrFail($hotel->id));
        }
    }

}
