<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','last_name','email', 'password','type','language','timezone','remember_token', 'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at','parent_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function hotels(){
        return $this->belongsToMany(Hotel::class);
    }
    
    public function currency()
    {
        return $this->belongsTo('App\Currency');
    }

    public static function make_password(){
        $pass = '';
        $pass = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 8);
        return $pass;
    }

    public function HotelUser()
    {
        return $this->hasMany(HotelUser::class);
    }

    public function parent()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(User::class,'parent_id');
    }

    public function binnacles()
    {
        return $this->morphMany(Binnacle::class,'users', 'binnacleable_type','binnacleable_id');
    }

    public static function generarVerificationToken(){
        return Str::random(40);
    }
}
