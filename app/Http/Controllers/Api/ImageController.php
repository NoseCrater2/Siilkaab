<?php

namespace App\Http\Controllers\Api;

use App\Image;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ImageIndexResource;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ImageIndexResource::collection(
            Image::all()
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
        $image1 = null;
        $image2 = null;
        $image3 = null;
        $image4 = null;
        $data = $request->all();
        $rules = [
            'image1'=>'required|image',
            'image2'=>'image',
            'image3'=>'image',
            'image4'=>'image',
            'room_id' => 'required|exists:rooms,id'
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        
           
        if($validator->fails()){
            return $validator->errors();
        }else{
            if($request->hasFile('image1')){
                $image1= $request->image1->store('');
                $data['image1']=$image1;
            } 
            if($request->hasFile('image1')){
                $image2= $request->image2->store('');
                $data['image2']=$image2;
            } 
            if($request->hasFile('image1')){
                $image3= $request->image3->store('');
                $data['image3']=$image3;
            } 
            if($request->hasFile('image1')){
                $image4= $request->image4->store('');
                $data['image4']=$image4;
            } 
            $image = Image::create($data);
            return new ImageIndexResource(Image::findOrFail($image->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Image  $images
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        return new ImageIndexResource(Image::findOrFail($image->id));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Image  $images
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image)
    {
        $data = $request->all();

        $rules = [
            'title'=>'unique:hotels,id,'.'$hotel->id',
            'url'=>'url',
            'image'=>'image',
            'type' => 'in:bungalow,cabana,build',
            'num_rooms' => 'required_if:type,build',
            'num_floors' => 'required_if:type,build',
            'enabled' => 'in:0,1',
        ];
        $validator= Validator::make($data,$rules, Messages::getMessages());

        

        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            if($request->hasFile('image1')){
                Storage::delete($image->image1);
                $data['image1'] = $request->image1->store('');
            }
            if($request->hasFile('image2')){
                Storage::delete($image->image2);
                $data['image2'] = $request->image2->store('');
            }
            if($request->hasFile('image3')){
                Storage::delete($image->image3);
                $data['image3'] = $request->image3->store('');
            }
            if($request->hasFile('image4')){
                Storage::delete($image->image4);
                $data['image4'] = $request->image4->store('');
            }
            $image->update($data);
            return new ImageIndexResource(Image::findOrFail($image->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $images
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        Storage::delete($image->image1);
        Storage::delete($image->image2);
        Storage::delete($image->image3);
        Storage::delete($image->image4);
        $image->delete(); 
    }
}
