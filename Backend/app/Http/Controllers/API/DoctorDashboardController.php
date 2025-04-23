<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statistics = Appointment::selectRaw("
            COUNT(*) as total_appointments,
            COUNT(CASE WHEN appointment_type = 'online' THEN 1 END) as online_appointments,
            COUNT(CASE WHEN appointment_type = 'in_person' THEN 1 END) as in_person_appointments,
            COUNT(CASE WHEN appointment_status = 'active' THEN 1 END) as active_appointments,
            COUNT(CASE WHEN appointment_status = 'closed' THEN 1 END) as completed_appointments,
            SUM(CASE WHEN appointment_status = 'closed' THEN appointment_price ELSE 0 END) as total_earnings
        ")
        ->first();

        return response()->json(['statistics' => $statistics]);
    }
}
