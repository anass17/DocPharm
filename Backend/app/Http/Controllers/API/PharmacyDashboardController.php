<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderMedicine;
use App\Models\PharmacyMedicine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PharmacyDashboardController extends Controller
{
    public function index(Request $request) {

        $medicine_statistics = PharmacyMedicine::selectRaw("
            COUNT(*) as total_medicines,
            SUM(medicine_quantity) as medicine_units
        ")->where('pharmacy_id', 2)->first();

        $order_statistics = DB::table('order_medicines')
        ->join('pharmacy_medicines', 'pharmacy_medicines.id', '=', 'order_medicines.medicine_id')
        ->join('orders', 'orders.id', '=', 'order_medicines.order_id')
        ->selectRaw("
            COUNT(CASE WHEN status = 'delivered' THEN medicine_quantity END) as sold_units,
            SUM(CASE WHEN status = 'delivered' THEN unit_price * medicine_quantity END) as earnings,
            COUNT(DISTINCT order_id) as total_orders,
            COUNT(DISTINCT CASE WHEN status = 'delivered' THEN order_id END) as delivered_orders
        ")
        ->where('pharmacy_medicines.pharmacy_id', 2)
        ->first();

        $latest_medicine = DB::table('medicines')
        ->join('pharmacy_medicines', 'medicines.id', '=', 'pharmacy_medicines.medicine_id')
        ->where('pharmacy_id', '=', $request->user()->id)
        ->orderBy('medicines.id', 'desc')->limit(4)->get();

        return response()->json(['recent_added' => $latest_medicine, 'medicine_statistics' => $medicine_statistics, 'order_statistics' => $order_statistics, 'chart' => $this -> getCountPerMonth($request)]);
    }

    private function getCountPerMonth($request) {

        $results = DB::table('orders')
        ->join('order_medicines', 'order_medicines.order_id', '=', 'orders.id')
        ->join('pharmacy_medicines', 'pharmacy_medicines.id', '=', 'order_medicines.medicine_id')
        ->where('pharmacy_medicines.pharmacy_id', $request->user()->id)
        ->whereNotNull('orders.confirmed_at')
        ->selectRaw("TO_CHAR(orders.confirmed_at, 'YYYY-MM') as month, COUNT(*) as total")
        ->groupBy('month')
        ->pluck('total', 'month');

        $start = Carbon::now()->subMonths(11)->startOfMonth();
        $end = Carbon::now()->addMonths(1)->startOfMonth();
        $allMonths = [];

        while ($start <= $end) {
            $key = $start->format('Y-m');
            $allMonths[$key] = $results[$key] ?? 0;
            $start->addMonth();
        }

        return ['labels' => array_keys($allMonths), 'data' => array_values($allMonths)];
    }
}
