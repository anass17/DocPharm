<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = 1;
        $sort = 'orders.id';

        if ($request->page) {
            $page = $request->page;
        }
        
        if ($request->sort) {
            if ($request->sort == 'modify_date') {
                $sort = 'orders.updated_at';
            }
        }

        $orders = Order::whereHas('medicines.pharmacy', function ($query) use ($request) {
            $query->where('users.id', $request->user()->id);
        })
        ->with('medicines.medicine')
        ->with('client')
        ->whereNotNull('confirmed_at')
        ->where(function($query) {
            $query->where('status', '=', 'delivered')
                  ->orWhere('status', '=', 'rejected');
        })
        ->orderBy($sort, 'desc')
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
