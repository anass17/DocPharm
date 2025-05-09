<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderMedicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $cart = Order::with('medicines.medicine')->where('client_id', '=', $request->user()->id)->whereNull('confirmed_at')->first();
        return response()->json(['order' => $cart]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $el = DB::table('order_medicines')
            ->where('order_medicines.medicine_id', '=', $id)
            ->where('order_medicines.order_id', '=', function($query) use ($request) {
                $query->select('id')
                    ->from('orders')
                    ->where('client_id', '=', $request->user()->id)
                    ->whereNull('confirmed_at')
                    ->limit(1);
            })
            ->delete();
        return response()->json([], 204);
    }
}
