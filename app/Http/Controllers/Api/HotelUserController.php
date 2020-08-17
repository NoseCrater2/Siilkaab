<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Hotel;
use App\Messages;
use App\HotelUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\HotelUserIndexResource;

class HotelUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {

        return HotelUserIndexResource::collection(
            HotelUser::where('user_id','=',$user->id)->get()
        );

    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $data = $request->all();

        $rules = [
            "hotels"    => "required|array|min:1",
            "hotels.*"  => "required|exists:hotels,id|distinct|min:1|different:hotel_id",
        ];
                
        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $hotel_array = $data['hotels'];
            $user->hotels()->sync($hotel_array);
            return HotelUserIndexResource::collection(
                HotelUser::where('user_id','=',$user->id)->get()
            );
        }
       
    }

    
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HotelUser  $hotelUser
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HotelUser $hotelUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HotelUser  $hotelUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user,Hotel $hotel)
    {
        if (!$user->hotels()->find($hotel->id)) {
            return $this->errorResponse('El hotel especificado no es un hotel de este usuario', 404);
        }
        $user->hotels()->detach([$hotel->id]);
        return HotelUserIndexResource::collection(
            HotelUser::all()
        );
    }
}
