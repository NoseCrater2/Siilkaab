<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('reservations/{id}',function ($id)
// {
//     //return $id;
//     return view('reservations', ['id'=>$id]);
// })->where(['id' => '[0-9]+'])->name('reservations.hotels');


// Route::get('payments',function ()
//     {
//         return view('payments');
//     })->name('payments');


// Route::get('mercadopago',function ()
// {
//     return view('mercadopago');
// })->name('mercadopago');


// Route::get('calendar',function ()
// {
//     return view('calendar');
// })->name('calendar');

Auth::routes();



Route::get('/{any?}', function () {
    return view('welcome');
})->where('any','^(?!api\/)[\/\w\.-]*');

