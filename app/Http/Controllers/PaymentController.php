<?php

namespace App\Http\Controllers;

use App\Messages;
use App\Resolvers\PaymentPlatformResolver;
use App\Services\PayPalService;
use Illuminate\Http\Request;
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
           'payee' => 'required|email',
           'platform' => 'required|exists:platforms,id'
       ];

       $validator= Validator::make($data,$rules, Messages::getMessages());

       if($validator->fails()){
           return $validator->errors();
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
}
