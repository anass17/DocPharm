<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Client;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_statistics = Client::selectRaw("
            COUNT(*) as total_users,
            COUNT(CASE WHEN role = 'client' THEN 1 END) as total_clients,
            COUNT(CASE WHEN role = 'doctor' THEN 1 END) as total_doctors,
            COUNT(CASE WHEN role = 'pharmacy' THEN 1 END) as total_pharmacies
        ")
        ->first();

        $apt_statistics = Appointment::selectRaw("
            COUNT(*) as total_appointments,
            COUNT(CASE WHEN appointment_status = 'closed' THEN 1 END) as completed_appointments,
            SUM(CASE WHEN appointment_status = 'closed' THEN appointment_price ELSE 0 END) as total_earnings
        ")
        ->first();

        $order_statistics = Order::selectRaw("
            COUNT(*) as total_orders,
            COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders
        ")
        ->first();

        $appointments = DB::table('appointments')
            ->join('users', 'users.id', '=', 'appointments.doctor_id')
            ->select('appointments.created_at as created_at', 'appointment_date', 'first_name', 'last_name', DB::raw('NULL as status'), DB::raw("'appointment' as type"));

        $recent_activities = DB::table('orders')
            ->select('orders.created_at as created_at', DB::raw('NULL as appointment_date'), DB::raw('NULL as first_name'), DB::raw('NULL as last_name'), 'status', DB::raw("'order' as type"))
            ->unionAll($appointments)
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        return response()->json(['statistics' => [$user_statistics, $apt_statistics, $order_statistics], 'recent_activities' => $recent_activities, 'chart' => $this -> getAppointmentsCountPerMonth($request)]);
    }

    private function getAppointmentsCountPerMonth($request) {

        $orders = DB::table('orders')
        ->selectRaw("TO_CHAR(delivered_at, 'YYYY-MM') as month, COUNT(*) as total")
        ->groupBy('month')
        ->pluck('total', 'month');

        $appointments = DB::table('appointments')
        ->selectRaw("TO_CHAR(appointment_date, 'YYYY-MM') as month, COUNT(*) as total")
        ->groupBy('month')
        ->pluck('total', 'month');

        $start = Carbon::now()->subMonths(6)->startOfMonth();
        $end = Carbon::now()->addMonths(6)->startOfMonth();
        $allMonths = [];
        $allMonths2 = [];

        while ($start <= $end) {
            $key = $start->format('Y-m');
            $allMonths[$key] = $orders[$key] ?? 0;
            $allMonths2[$key] = $appointments[$key] ?? 0;
            $start->addMonth();
        }

        return ['labels' => array_keys($allMonths), 'orders' => array_values($allMonths), 'appointments' => array_values($allMonths2)];
    }

}
