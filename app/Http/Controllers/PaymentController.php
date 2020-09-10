<?php

namespace App\Http\Controllers;

use App\Messages;
use App\HotelCredentials;
use App\Resolvers\PaymentPlatformResolver;
use App\Services\PayPalService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{

    protected $paymentPlatformResolver;

    public function __construct(PaymentPlatformResolver $paymentPlatformResolver) {
        $this->paymentPlatformResolver = $paymentPlatformResolver;
    }

    public function pay(Request $request)
    {
    $data = $request->all();
       $rules = [
           'value' => 'required|numeric|min:3',
           'currency' => 'required|exists:currencies,code',
           'platform' => 'required|exists:platforms,id',
           'idHotel' => 'required|exists:hotels,id',
           'email' => 'email'
       ];

       $validator= Validator::make($data,$rules, Messages::getMessages());

       if($validator->fails()){
           return response($validator->errors(),422);
       }else{
        $paymentPlatform = $this->paymentPlatformResolver->resolveService($request->platform);

        session()->put('paymentPlatformId');

        return $paymentPlatform->handlePayment($request);
       }

      
    }
   
    public function cancelled()
    {
       return redirect()
            ->route('payments')
            ->withErrors('You cancelled the payment');
    }
  
    public function approval(Request $request)
    {
       
      
            $paymentPlatform = $this->paymentPlatformResolver->resolveService($request["paymentPlatformID"]);

            return $paymentPlatform->handleApproval($request["orderID"]);
      
       
        // return redirect()
        //     ->route('payments')
        //     ->withErrors('We cannot retrieve your payment platform. Try again, please.');
      
    }

    public function getSellerCode(Request $request)
    {
        $data = $request->all();
       $rules = [
           'paymentPlatformID' => 'required|numeric|in:2',
           'code' => 'required|string',
           'id' => 'required|exists:hotel_credentials,id'
       ];

       $validator= Validator::make($data,$rules, Messages::getMessages());

       if($validator->fails()){
           return $validator->errors();
       }else{
        $paymentPlatform = $this->paymentPlatformResolver->resolveService($request["paymentPlatformID"]);

        $sellerCredentials = $paymentPlatform->setSellerAuthentication($request['code']);
 
        $expirationDate = $sellerCredentials->{'expires_in'};
        $expirationDate  = Carbon::now()->addSeconds($expirationDate)->toDateTimeString();

        
        $register =  HotelCredentials::findOrFail($request['id']);
        $register->mercadopago_client_id = $sellerCredentials->{'user_id'};
        $register->mercadopago_at = $sellerCredentials->{'access_token'};
        $register->expiration_at  = $expirationDate;
        $register->mercadopago_rt = $sellerCredentials->{'refresh_token'};

        $register->save();

        return response('Tu cuenta de Mercadopago se ha sincronizada satisfactoriamente',200);   
       }
        
    }


    public function updateCredentials(Request $request)
    {
        $data = $request->all();
       $rules = [
           'paymentPlatformID' => 'required|numeric|in:2',
           'id' => 'required|exists:hotel_credentials,id',
       ];

       $validator= Validator::make($data,$rules, Messages::getMessages());

       if($validator->fails()){
           return $validator->errors();
       }else{
        $paymentPlatform = $this->paymentPlatformResolver->resolveService($request["paymentPlatformID"]);

        $sellerCredentials = $paymentPlatform->updateSellerAuthentication($request['id']);

        $expirationDate = $sellerCredentials->{'expires_in'};
        $expirationDate  = Carbon::now()->addSeconds($expirationDate)->toDateTimeString();


        $register =  HotelCredentials::findOrFail($request['id']);
        $register->mercadopago_at = $sellerCredentials->{'access_token'};
        $register->expiration_at  = $expirationDate;
        $register->mercadopago_rt = $sellerCredentials->{'refresh_token'};

        $register->save();
        return response('Tu cuenta de Mercadopago se ha sincronizado satisfactoriamente',200);   
       }
        
    }
}
