<?php

use App\Calendar;
use App\Http\Controllers\CalendarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


//Route::get('getcredential/{hotel_credentials}','HotelCredentialsController@show');

Route::post('payments/pay', 'PaymentController@pay')->name('pay');
Route::get('payments/cancelled', 'PaymentController@cancelled')->name('cancelled');
Route::post('payments/success/', 'PaymentController@approval')->name('approval');
Route::post('payments/getCode', 'PaymentController@getSellerCode')->name('getCode');
Route::post('payments/updateCode', 'PaymentController@updateCredentials')->name('updateCode');
Route::get('currentHotelRooms/{hotel}', 'Api\RoomController@currentHotelRooms');




Route::group(['prefix' => 'events'], function ()
{
    Route::get('/{year}', 'CalendarController@eventsCountForYear');
    Route::get('/{month}/{year}','CalendarController@eventsForMonth');
    Route::post('/','CalendarController@store');
});

Route::post('oauth/token','\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', 'AuthController@login');

Route::middleware('auth:api')->post('/logout', 'AuthController@logout');


Route::apiResource('paypal_pays','PayPalController')->only('index','show','store','update','destroy');


Route::apiResource('credentials','Api\HotelCredentialsController')->only('index','show','store','update','destroy');
Route::apiResource('hotels','Api\HotelController')->only('index','show','store','update');
Route::post('deletehotels','Api\HotelController@delete');

Route::name('hotelsnoadmin')->get('myhotels/','Api\HotelController@getHotelsForNoAdmin');

Route::name('hotelsadmin')->get('adminhotels/','Api\HotelController@getHotelsForAdmin');

Route::name('roomsadmin')->get('adminrooms/{id}','Api\RoomController@getRoomsForAdmin');

Route::apiResource('rooms','Api\RoomController')->only('index','show','store','update','destroy');
Route::get('rooms/{hotel}/availability','Api\RoomAvailabilityController')->name('rooms.availability.show');

Route::apiResource('rates','Api\RateController')->only('index','show','store','update','destroy');
Route::name('ratesByRoom')->get('ratesByRoom/{room}','Api\RateController@getRatesByRoom');

Route::apiResource('discounts','Api\DiscountController')->only('index','show','store','update','destroy');
Route::apiResource('extras','Api\ExtraController')->only('index','show','store','update','destroy');

Route::apiResource('bedrooms','Api\BedroomController')->only('index','show','store','update','destroy');
Route::apiResource('beds','Api\BedController')->only('index','show','store','update','destroy');
Route::apiResource('room_amenities','Api\RoomAmenityController')->only('index','show','store','update','destroy');

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