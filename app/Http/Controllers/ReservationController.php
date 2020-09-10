<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function view($id){
        return view('reservations',$id);
    }
}
