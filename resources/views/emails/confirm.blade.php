@component('mail::message')
#Hola {{$user->name}}

Se ha cambiado tu correo de acceso a Sillkaab. Por favor confirma esta acción usando el siguiente enlace:

@component('mail::button',['url' => route('verify',$user->remember_token)])
Confirmar nuevo Email
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent