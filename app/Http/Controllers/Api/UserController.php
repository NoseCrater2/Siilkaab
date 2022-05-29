<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\HotelUser;
use App\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserIndexResource;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreated;
use Carbon\Carbon;

class UserController extends Controller
{
    public function __construct()
    {

        $this->middleware('auth:sanctum');
        // $this->middleware('can:view,user')->only('show','update');
        $this->authorizeResource(User::class, 'user');
        // $this->middleware('can:create,user')->only('store');

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if(auth('sanctum')->user()->type == 'super'){
            return UserIndexResource::collection(
                User::all()
            );
        };
        return UserIndexResource::collection(
            auth('sanctum')->user()->users
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
        $rules =[
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'type' => 'required|in:manager,administrator,super',
            'language' => 'required|string',
            'timezone' => 'required|timezone',
            'parent_id'    => 'nullable|required_if:type,manager|exists:users,id',
            "hotels"    => "array|min:1",
            "hotels.*"  => "distinct|min:1",

        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);

        }else{

                $pas = User::make_password();
                $GLOBALS['password_pivote'] = $pas;
                $data['password'] = bcrypt($pas);
                $data['remember_token'] = User::generarVerificationToken();


                $user = User::create($data);
                if(isset($data['hotels'])){
                    $hotels = array_map(function($hotel){return $hotel['id'];},$data['hotels']);
                    $user->hotels()->sync($hotels);
                }

                return new UserIndexResource(User::findOrFail($user->id));
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //$logged_user = User::find(auth('api')->user()->id);
        return new UserIndexResource(User::findOrFail(
           // $logged_user->users($user->id)
            $user->id
        ));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        $data = $request->all();
        $rules =[
            'name' => 'string',
            'email' => 'email|unique:users,email,'.$user->id,
            'type' => 'in:manager,administrator,super',
            'parent_id'    => 'nullable|required_if:type,manager|exists:users,id',
            'language' => 'string',
            'timezone' => 'timezone',
            "hotels"    => "array|min:1",
            "hotels.*"  => "distinct|min:1",

        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{

            if($data['email'] != $user->email){
                $user->email_verified_at = null;
                $user->remember_token = User::generarVerificationToken();
            }
            $user->update($data);
            $hotels = array_map(function($hotel){return $hotel['id'];},$data['hotels']);
            $user->hotels()->sync($hotels);
            return new UserIndexResource(User::findOrFail($user->id));
        }

    }


    public function delete(Request $request)
    {

        $data = $request->all();

        $rules = [
            "userIds"    => "required|array|min:1",
            "userIds.*"  => "required|exists:users,id|distinct|min:1",
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            DB::transaction(function()use ($data){

            HotelUser::whereIn('user_id',$data['userIds'])->delete();
            User::destroy($data['userIds']);

            });

            return response($data['userIds'],200);
        }


    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {


    }


    public function verify($token)
    {
        $user = User::where('remember_token', $token)->firstOrFail();

        $user->email_verified_at = Carbon::now();
        $user->remember_token = null;

        $user->save();

        return response()->json([
            'message' => 'Email verified'
        ]);
    }


    public function resend(User $user)
    {
        if($user->email_verified_at != null){
            return response()->json([
                'message' => 'This user has been verified'
            ]);
        }

        retry(5,function(
            $user){Mail::to($user)->send(new UserCreated($user));
            },100);
        return response()->json([
            'message' => 'Email has been resend'
        ]);
    }
}
