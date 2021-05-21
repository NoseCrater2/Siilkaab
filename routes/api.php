<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function(Request $request){
    return $request->user();
});
//Route::get('getcredential/{hotel_credentials}','HotelCredentialsController@show');

Route::post('payments/pay', 'PaymentController@pay')->name('pay');
Route::get('payments/cancelled', 'PaymentController@cancelled')->name('cancelled');
Route::post('payments/success/', 'PaymentController@approval')->name('approval');
Route::post('payments/getCode', 'PaymentController@getSellerCode')->name('getCode');
Route::post('payments/updateCode', 'PaymentController@updateCredentials')->name('updateCode');
Route::get('currentHotelRooms/{hotel}', 'Api\RoomController@currentHotelRooms');


Route::post('searchRooms/{hotel}', 'Api\HotelController@searchRooms');

// RESERVACIONES
Route::get('reservations/{hotel}','ReservationController@index');
Route::post('reservations','ReservationController@store');
Route::get('reservation/{reservation}','ReservationController@show');
Route::get('history-reservation/{reservation}', 'ReservationController@history');
Route::post('reservation-client/{reservation}', 'ReservationController@updateClientInformation');
Route::post('reservation-state/{reservation}', 'ReservationController@updateState');


Route::get('dashboard','ReservationController@dashboard');

Route::get('earnings/{year}/{id}','ReservationController@earnings');
Route::get('anual-earnings/{id}','ReservationController@anualEarnings');

Route::get('dashboard-reservations','ReservationController@dashboardReservations');


// NOTAS DE RESERVACIONES
Route::get('notes/{reservation}','NoteController@index');
Route::post('notes','NoteController@store');
Route::delete('notes/{note}','NoteController@destroy');

Route::group(['prefix' => 'events'], function ()
{
    Route::get('/{year}', 'CalendarController@eventsCountForYear');
    Route::get('/{month}/{year}','CalendarController@eventsForMonth');
    Route::post('/','CalendarController@store');
});





Route::post('UploadImages/{room}','Api\ImageController@store');
Route::get('images/{room}','Api\ImageController@index');
Route::delete('images/{image}','Api\ImageController@destroy');

Route::post('/login', 'AuthController@login');

Route::middleware('auth:api')->post('/logout', 'AuthController@logout');


Route::apiResource('paypal_pays','PayPalController')->only('index','show','store','update','destroy');


Route::apiResource('credentials','Api\HotelCredentialsController')->only('index','show','store','update','destroy');
Route::resource('hotels','Api\HotelController')->only('index','show','store','update');
Route::post('deletehotels','Api\HotelController@delete');

Route::name('hotelsnoadmin')->get('myhotels/','Api\HotelController@getHotelsForNoAdmin');

Route::name('hotelsadmin')->get('adminhotels/','Api\HotelController@getHotelsForAdmin');

Route::name('roomsadmin')->get('adminrooms/{hotel}','Api\RoomController@currentHotelRooms');

Route::apiResource('rooms','Api\RoomController')->only('index','show','store','update','destroy');
Route::post('rooms/{hotel}/availability','Api\RoomAvailabilityController@getAvailabilityRooms')->name('rooms.availability.show');

Route::apiResource('rates','Api\RateController')->only('index','show','store','update','destroy');
Route::name('ratesByRoom')->get('ratesByRoom/{room}','Api\RateController@getRatesByRoom');

Route::apiResource('discounts','Api\DiscountController')->only('index','show','store','update','destroy');
Route::apiResource('extras','Api\ExtraController')->only('index','show','store','update','destroy');

Route::apiResource('bedrooms','Api\BedroomController')->only('index','show','store','update','destroy');
Route::apiResource('beds','Api\BedController')->only('index','show','store','update','destroy');
Route::apiResource('room_amenities','Api\RoomAmenityController')->only('show','store','update','destroy');
Route::get('hotel_rooms_amenities/{hotel}','Api\RoomAmenityController@index');

Route::apiResource('amenities','Api\AmenityController')->only('index','show','store','update','destroy');
Route::apiResource('conditions','Api\ConditionController')->only('index','show','store','update','destroy');
Route::apiResource('configurations','Api\ConfigurationController')->only('index','show','store','update','destroy');
Route::apiResource('countries','Api\CountryController')->only('index','show');
Route::apiResource('contacts','Api\ContactController')->only('index','show','store','update','destroy');
Route::apiResource('currencies','Api\CurrencyController')->only('index','show');
Route::apiResource('pools','Api\PoolController')->only('index','show','store','update','destroy');
Route::apiResource('regimes','Api\RegimeController')->only('index','show','store','update','destroy');
Route::apiResource('restaurants','Api\RestaurantController')->only('index','show','store','update','destroy');
Route::apiResource('schedules','Api\ScheduleController')->only('index','show','store','update','destroy');
Route::apiResource('securities','Api\SecurityController')->only('index','show','store','update','destroy');
Route::apiResource('users','Api\UserController')->only('index','show','store','update');
Route::post('deleteusers','Api\UserController@delete');
Route::name('verify')->get('users/verify/{token}','Api\UserController@verify');
Route::name('resend')->get('users/{user}/resend','Api\UserController@resend');

Route::apiResource('hotels_users/{user}','Api\HotelUserController')->only('index','store');
Route::apiResource('hotels_users/{user}/hotels','Api\HotelUserController')->only('destroy');
Route::get('timezones','Api\HotelController@getTimeZones');

Route::apiResource('binnacles','BinnacleController')->only('index','show','destroy');


Route::post('convert_currency','Api\HotelController@convert_currency');