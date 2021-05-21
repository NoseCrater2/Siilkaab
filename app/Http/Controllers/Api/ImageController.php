<?php

namespace App\Http\Controllers\Api;

use App\Room;
use App\Image;
use App\Messages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ImageIndexResource;
use Illuminate\Support\Facades\Response;

class ImageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Room $room)
    {
        return ImageIndexResource::collection(
            $room->images
        );
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Room $room ,Request $request)
    {
        foreach ($request['image'] as $file) {
            $image = new Image;
            $name= $file->store('rooms');
            $image->name = $name;
            $image->room_id = $room->id;
            $image->save();
        }

        return json_encode("Operación terminada");
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
        // $data = $request->all();

        // $rules = [
        //     'title'=>'unique:hotels,id,'.'$hotel->id',
        //     'url'=>'url',
        //     'image'=>'image',
        //     'type' => 'in:bungalow,cabana,build',
        //     'num_rooms' => 'required_if:type,build',
        //     'num_floors' => 'required_if:type,build',
        //     'enabled' => 'in:0,1',
        // ];
        // $validator= Validator::make($data,$rules, Messages::getMessages());

        

        // if($validator->fails()){
        //     return response($validator->errors(),422);
        // }else{
        //     if($request->hasFile('image1')){
        //         Storage::delete($image->image1);
        //         $data['image1'] = $request->image1->store('');
        //     }
        //     if($request->hasFile('image2')){
        //         Storage::delete($image->image2);
        //         $data['image2'] = $request->image2->store('');
        //     }
        //     if($request->hasFile('image3')){
        //         Storage::delete($image->image3);
        //         $data['image3'] = $request->image3->store('');
        //     }
        //     if($request->hasFile('image4')){
        //         Storage::delete($image->image4);
        //         $data['image4'] = $request->image4->store('');
        //     }
        //     $image->update($data);
        //     return new ImageIndexResource(Image::findOrFail($image->id));
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $images
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        Storage::delete($image->name);
        $image->delete(); 
        return Response( $image, 200);
    }
}
