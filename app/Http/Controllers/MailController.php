<?php

namespace App\Http\Controllers;

use App\Mail\SendBooking;
use Illuminate\Support\Facades\Mail;
use App\Messages;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Reservation;

class MailController extends Controller
{
    public function resendBooking(Request $request, Reservation $reservation)
    {
        $data = $request->all();
        $rules = [
            'emails' => 'required|array|min:1',
            'emails.*' => 'required|email|distinct',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            foreach ($data['emails'] as $email) {
                Mail::to($email)->send(new SendBooking($reservation));
            }
            return response(['data'=>'SENDED EMAIL'],200);
        }
    }
}
