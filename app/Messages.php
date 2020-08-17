<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    public static function getMessages()
    {
       return  [
           
            'required' => 'Campo requerido',
            'required_if' => 'Es requerido si se elige Tipo: Edificio o Torre',
            'boolean' => 'Debe ser 1 o true, 0 o false',
            'integer' => 'Debe ser un número entero',
            'min' => 'Debe ser mínimo de :min',
            'date_format' => 'Debe ser en formato HH:mm',
            'after' => 'Debe ser una hora mayor ',
            'exists' => 'Debe ser un id válido de :attribute',
            'in' => 'Debe ser uno de estos campos :values',
            'email' => 'Debe ser un email válido',
            'timezone' => 'Debe ser una zona horaria válida',
            'url' => 'Debe ser una url válida',
            'alpha_num' => 'Solo debe contener numeros y letras',
            'string' => 'Debe ser una cadena de texto',
            'numeric' => 'Debe ser un número',
            'unique' => 'Ya hay un registro con este :attribute y debe ser único',
            'image' => 'Debe ser una imagen',
            'distinct' => 'Los campos deben ser distintos',
            'different' => 'Está intentando agregar un registro que ya existe :input',
            

        ];
    }
}
