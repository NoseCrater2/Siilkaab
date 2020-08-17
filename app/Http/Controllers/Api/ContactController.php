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
            'url' => 'url|required',
            'email' => 'required|email',
            'phone' => 'required|alpha_num',
            'address' => 'required|string',
            'zipcode' => 'required|numeric',
            'city' => 'required|alpha_num',
            'state' => 'required|alpha_num',
            'manager_name' => 'required|string',
            'legal_rep' => 'required|string',
            'country_id' => 'required|exists:countries,id',
            'hotel_id' => 'required|exists:hotels,id'
        ];
                  
        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return $validator->errors();
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
            'address' => 'string',
            'zipcode' => 'numeric',
            'city' => 'alpha_num',
            'state' => 'alpha_num',
            'manager_name' => 'string',
            'legal_rep' => 'string',
            'country_id' => 'exists:countries,id',
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
