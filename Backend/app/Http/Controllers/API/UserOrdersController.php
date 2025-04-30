<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class UserOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $orders = Order::with('medicines.pharmacy')
        ->with('medicines.medicine')
        ->where('client_id', $request->user()->id)
        ->whereNotNull('confirmed_at')
        ->orderByRaw("
            CASE status
                WHEN 'pending' THEN 1
                WHEN 'accepted' THEN 2
                WHEN 'ready' THEN 3
                ELSE 4
            END,
            created_at
        ")
        ->get();

        return response()->json(['result' => $orders]);
    }

}
