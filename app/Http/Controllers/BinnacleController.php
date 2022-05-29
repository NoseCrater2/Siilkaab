<?php

namespace App\Http\Controllers;

use App\Binnacle;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\BinnacleIndexResource;
use App\Http\Resources\BinnacleShowResource;
use Illuminate\Http\Request;

class BinnacleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = auth('sanctum')->user()->users->map(function($user){
            return $user->id;
        });
        return  BinnacleIndexResource::collection(
            Binnacle::whereIn('actor_id',$users)->latest()->get()->unique('actor_id')
        );

    }





    /**
     * Display the specified resource.
     *
     * @param  \App\Binnacle  $binnacle
     * @return \Illuminate\Http\Response
     */
    public function show(Binnacle $binnacle)
    {
        return  BinnacleShowResource::collection(
            Binnacle::where('actor_id', $binnacle->actor_id)->orderBy('updated_at', 'desc')->get()
        );
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Binnacle  $binnacle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Binnacle $binnacle)
    {
        $binnacle->delete();
    }
}
