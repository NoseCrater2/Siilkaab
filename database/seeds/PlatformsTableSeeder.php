<?php

use App\Platforms;
use Illuminate\Database\Seeder;

class PlatformsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Platforms::create([
            'name' => 'PayPal',
            'image' => 'img/payment-platforms/paypal.png'
        ]);

        Platforms::create([
            'name' => 'Mercado Pago',
            'image' => 'img/payment-platforms/mercadopago.jpg'
        ]);
    }
}
