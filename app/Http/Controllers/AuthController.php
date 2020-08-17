<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;
        try {

            $email = $request->username;
            $password = $request->password;
            $request->request->add([
                'username' => $email,
                'password' => $password,
                'grant_type' => 'password',
                'client_id' => env('PASSPORT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_CLIENT_SECRET'),
                'scope' => '*'
            ]);
    
            $tokenRequest = Request::create(
                env('APP_URL').'/oauth/token',
                'post'
            );
            $response = Route::dispatch($tokenRequest);

            return $response;

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Please enter a username or a password.', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
            }

            return response()->json('$e->getMessage()');
        }
    }


    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        
        return response()->json('Logged out successfully', 200);
    }
}
