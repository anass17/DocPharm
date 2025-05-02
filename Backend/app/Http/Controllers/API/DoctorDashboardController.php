<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoctorDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $statistics = Appointment::selectRaw("
            COUNT(*) as total_appointments,
            COUNT(CASE WHEN appointment_type = 'online' THEN 1 END) as online_appointments,
            COUNT(CASE WHEN appointment_type = 'in_person' THEN 1 END) as in_person_appointments,
            COUNT(CASE WHEN appointment_status = 'active' THEN 1 END) as active_appointments,
            COUNT(CASE WHEN appointment_status = 'closed' THEN 1 END) as completed_appointments,
            SUM(CASE WHEN appointment_status = 'closed' THEN appointment_price ELSE 0 END) as total_earnings
        ")
        ->where('doctor_id', $request->user()->id)
        ->first();

        $recent_added = Appointment::where('doctor_id', $request->user()->id)
        ->orderBy('created_at', 'desc')
        ->limit(4)->get();

        return response()->json(['statistics' => $statistics, 'recent_added' => $recent_added, 'chart' => $this -> getAppointmentsCountPerMonth($request)]);
    }

    private function getAppointmentsCountPerMonth($request) {

        $results = DB::table('appointments')
        ->where('doctor_id', $request->user()->id)
        ->selectRaw("TO_CHAR(appointment_date, 'YYYY-MM') as month, COUNT(*) as total")
        ->groupBy('month')
        ->pluck('total', 'month');

        $start = Carbon::now()->subMonths(6)->startOfMonth();
        $end = Carbon::now()->addMonths(6)->startOfMonth();
        $allMonths = [];

        while ($start <= $end) {
            $key = $start->format('Y-m');
            $allMonths[$key] = $results[$key] ?? 0;
            $start->addMonth();
        }

        return ['labels' => array_keys($allMonths), 'data' => array_values($allMonths)];
    }
}
