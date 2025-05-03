<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\DeliveryCodeEmail;
use App\Models\Order;
use App\Models\OrderMedicine;
use App\Models\PharmacyMedicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Stripe\Checkout\Session;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = 1;
        $status = 'pending';

        if ($request->page) {
            $page = $request->page;
        }

        if ($request->type) {
            $status = $request->type;
        }

        $orders = Order::whereHas('medicines.pharmacy', function ($query) use ($request) {
            $query->where('users.id', $request->user()->id);
        })
        ->with('medicines.medicine')
        ->with('client')
        ->whereNotNull('confirmed_at')
        ->where('status', '=', $status)
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validation = Validator::make($request->all(), [
            'pharmacy' => 'required|int',
            'quantity' => 'required|integer|max:3',
            'price' => 'required|numeric',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $pharmacy_medicine = PharmacyMedicine::find($request->pharmacy);

        if (!$pharmacy_medicine) {
            return response()->json(['error' => 'This medicine does not exist'], 404);
        } else if ($pharmacy_medicine->medicine_quantity < $request -> quantity) {
            return response()->json(['errors' => ['The pharmacy does not have that number of units']], 422);
        }

        $order = Order::whereNull('confirmed_at')->where('client_id', '=', $request->user()->id)->first();

        if (!$order) {
            $order = Order::create([
                'client_id' => $request->user()->id
            ]);
        }
        
        OrderMedicine::create([
            'order_quantity' => $request->quantity,
            'unit_price' => $request->price,
            'order_id' => $order->id,
            'medicine_id' => $request->pharmacy,
        ]);

        return response()->json(['message' => 'Product added to cart'], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validation = Validator::make($request->all(), [
            'status' => 'sometimes|in:accepted,ready,delivered,rejected',
            'code' => 'sometimes|integer|between:100000,999999',
            'note' => 'sometimes|string|max:250',
            'reason' => 'sometimes|string|max:250'
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        if ($request->status) {
            if ($request -> status == 'accepted' && $order -> status == 'pending') {

                $order->status = $request->status;
                
            } else if ($request -> status == 'ready' && $order -> status == 'accepted') {
                
                $order->status = $request->status;
                $order->delivery_code = rand(100000, 999999);

                Mail::to("anassboutaib2018@gmail.com")->send(new DeliveryCodeEmail($request->user(), $order->delivery_code));
            
            } else if ($request -> status == 'delivered' && $order -> status == 'ready') {

                if ($order -> tries === 5) {
                    return response()->json(['error' => 'You have exceeded the number of tries, please contact an admin'], 422);
                } else if ($order -> delivery_code && $order -> delivery_code === ($request -> code - 0)) {
                    $order->status = $request->status;
                    $order->delivered_at = now();
                    $order->delivery_code = null;
                    $order->save();

                    return response()->json([], 204);
                }
                
                $order -> tries += 1;
                $order -> save();

                return response()->json(['error' => "Incorrect Code - " . (5 - $order -> tries) . " tries left"], 422);

            } else if ($request -> status == 'rejected' && $order -> status == 'pending') {
                $order->status = $request->status;
                $order->rejection_reason = str_replace('_', ' ', $request->reason);
                $order->rejection_note = $request->note;
            } else {
                return response()->json(['errors' => ['Invalid Status']], 422);
            }
        }

        $order -> save();

        return response()->json([], 204);
    }

    public function confirm (Request $request, $sessionId) {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    
        try {
            $session = Session::retrieve($sessionId);
    
            if ($session->payment_status === 'paid') {
                
                $order = Order::where('client_id', '=', $request->user()->id)->whereNull('confirmed_at')->first();

                $order_medicines = OrderMedicine::where('order_id', $order->id)->get();
                
                foreach($order_medicines as $item) {
                    $pharmacy_medicine = PharmacyMedicine::where('id', $item->medicine_id)->first();
                    $pharmacy_medicine -> medicine_quantity = $pharmacy_medicine -> medicine_quantity - $item -> order_quantity;
                    $pharmacy_medicine -> save();
                }

                $order->confirmed_at = now();
                $order->save();

                return response()->json(['success' => true, 'message' => 'Order Confirmed']);
            } else {
                return response()->json(['success' => false, 'message' => 'Payment failed']);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
