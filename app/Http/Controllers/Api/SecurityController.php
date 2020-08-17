<?php

namespace App\Http\Controllers\Api;

use App\Messages;
use App\Security;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SecurityIndexResource;


class SecurityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SecurityIndexResource::collection(
            Security::all()
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

            'alltime_security' => 'boolean',
            'security_alarm' => 'boolean',
            'smoke_alarm' => 'boolean',
            'cctv_indoor' => 'boolean',
            'cctv_outoor' => 'boolean',
            'fire_extinguishers' => 'boolean',
            'safe'  => 'in:free,paid,flag',
            'hotel_id' => 'required|exists:hotels,id',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $security = Security::create($data);
            return new SecurityIndexResource(Security::findOrFail($security->id));
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Security  $security
     * @return \Illuminate\Http\Response
     */
    public function show(Security $security)
    {
        return new SecurityIndexResource(Security::findOrFail($security->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Security  $security
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Security $security)
    {
        $data = $request->all();
        $rules = [

            'alltime_security' => 'boolean',
            'security_alarm' => 'boolean',
            'smoke_alarm' => 'boolean',
            'cctv_indoor' => 'boolean',
            'cctv_outoor' => 'boolean',
            'fire_extinguishers' => 'boolean',
            'safe'  => 'in:free,paid,flag',
            'hotel_id' => 'exists:hotels,id',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return $validator->errors();
        }else{
            $security->update($data);
            return new SecurityIndexResource(Security::findOrFail($security->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Security  $security
     * @return \Illuminate\Http\Response
     */
    public function destroy(Security $security)
    {
        $security->delete();
        
    }
}
