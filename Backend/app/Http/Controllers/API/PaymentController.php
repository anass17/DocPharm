<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaymentController extends Controller
{
    public function medicinePayment(Request $request) {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $payment_items = [];

        foreach($request->items as $item) {

            array_push($payment_items, [
                'price_data' => [
                    'currency' => 'mad',
                    'product_data' => [
                        'name' => $item['name'],
                    ],
                    'unit_amount' => $item['unit_price'] * 100,
                ],
                'quantity' => $item['quantity'],
            ]);
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $payment_items,
            'mode' => 'payment',
            'success_url' => env('APP_FRONT_URL') . '/payment_success?session_id={CHECKOUT_SESSION_ID}',
        ]);

        return response()->json(['id' => $session->id]);
    }

    public function appointmentPayment(Request $request) {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'mad',
                        'product_data' => [
                            'name' => 'Appointment - ' . ucfirst($request -> type),
                        ],
                        'unit_amount' => $request->price * 100,
                    ],
                    'quantity' => 1
                ]
            ],
            'mode' => 'payment',
            'success_url' => env('APP_FRONT_URL') . '/appointment_payment_success?session_id={CHECKOUT_SESSION_ID}',
        ]);

        return response()->json(['id' => $session->id]);
    }
}
