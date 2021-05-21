<?php

namespace App\Http\Controllers\Api;

use App\Contact;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ContactIndexResource;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ContactIndexResource::collection(
            Contact::all()
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
            'url' => 'required|url',
            'email' => 'required|email',
            // 'phone' => 'required|alpha_num',
            // 'address' => 'required|string',
            // 'zipcode' => 'required|numeric',
            // 'city' => 'required|string',
            // 'state' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'display_name' => 'required|string',
            'manager_name' => 'required|string',
            'legal_rep' => 'required|string',
            // 'country_id' => 'required|exists:countries,id',
            'hotel_id' => 'required|exists:hotels,id'
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $contact = Contact::create($data);
             return new ContactIndexResource(Contact::findOrFail($contact->id));
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return new ContactIndexResource(Contact::findOrFail($contact->id));
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        $data = $request->all();

        $rules = [
            'url' => 'url',
            'email' => 'email',
            'phone' => 'alpha_num',
            // 'address' => 'string',
            // 'zipcode' => 'numeric',
            // 'city' => 'alpha_num',
            // 'state' => 'alpha_num',
            'manager_name' => 'string',
            'legal_rep' => 'string',
            'latitude' => 'numeric',
            'longitude' => 'numeric',
            'display_name' => 'string',
            // 'country_id' => 'exists:countries,id',
            'hotel_id' => 'exists:hotels,id'
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());
       
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $contact->update($data);
            return new ContactIndexResource(Contact::findOrFail($contact->id));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
    }
}
