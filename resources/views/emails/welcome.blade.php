@component('mail::message')
#Hola {{$user->name}}
Tu contraseña es: {{$GLOBALS['password_pivote']}}
Se acaba de crear una cuenta con tu email en Sillkab. Por favor verificala usando el siguiente enlace:

@component('mail::button',['url' => route('verify',$user->remember_token)])
Confirmar mi cuenta
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent