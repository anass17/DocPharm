<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Order;
use App\Models\OrderMedicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        $orders = Order::with('medicines.pharmacy')->whereNotNull('confirmed_at')->where('status', '=', 'pending')->paginate(9, ['*'], 'page', $page);

        $orders = Order::whereHas('medicines.pharmacy', function ($query) use ($request) {
            $query->where('users.id', $request->user()->id);
        })
        ->with('medicines.medicine')
        ->with('client')
        ->whereNotNull('confirmed_at')
        ->where('status', '=', $status)
        ->paginate(2, ['*'], 'page', $page);

        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validation = Validator::make($request->all(), [
            'pharmacy' => 'required|int',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
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
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        return response()->json(['Y' => 'N']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
    

    public function confirm (Request $request, $sessionId) {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    
        try {
            $session = Session::retrieve($sessionId);
    
            if ($session->payment_status === 'paid') {
                
                $order = Order::where('client_id', '=', $request->user()->id)->whereNull('confirmed_at')->first();
                $order->delivery_method = $request->method;
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
