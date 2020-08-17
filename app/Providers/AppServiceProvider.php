<?php

namespace App\Providers;

use App\Condition;
use App\Configuration;
use App\Contact;
use App\Hotel;
use App\HotelUser;
use App\Pool;
use App\User;
use App\Observers\HotelObserver;
use App\Observers\ConditionObserver;
use App\Observers\ContactObserver;
use App\Observers\ConfigurationObserver;
use App\Observers\HotelUserObserver;
use App\Observers\PoolObserver;
use App\Observers\RegimeObserver;
use App\Observers\RestaurantObserver;
use App\Observers\UserObserver;
use App\Regime;
use App\Restaurant;
use App\Mail\UserCreated;
use App\Mail\UserMailChanged;
use App\Observers\RoomObserver;
use App\Room;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Mail;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Hotel::observe(HotelObserver::class);
        Condition::observe(ConditionObserver::class);
        Configuration::observe(ConfigurationObserver::class);
        Contact::observe(ContactObserver::class);
        Pool::observe(PoolObserver::class);
        Restaurant::observe(RestaurantObserver::class);
        Regime::observe(RegimeObserver::class);
        User::observe(UserObserver::class);
        HotelUser::observe(HotelUserObserver::class);
        Room::observe(RoomObserver::class);

        User::created(function($user)
        {
            retry(5,function() use($user){Mail::to($user)->send(new UserCreated($user));
                },100);
        });

        User::updated(function($user)
        {
            if($user->isDirty('email')){
                retry(5,function() use ($user){Mail::to($user)->send(new UserMailChanged($user));
                    },100);
            }   
           
        });
    }
}
