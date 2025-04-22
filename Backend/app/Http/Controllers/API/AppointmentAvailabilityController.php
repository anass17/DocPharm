<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentAvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!$request->date) {
            return response()->json([], 422);
        }

        $results = Appointment::whereDate('appointment_date', $request->date)
        ->selectRaw("TO_CHAR(appointment_date, 'HH24:MI') as time")
        ->get();

        return response()->json(['results' => $results]);
    }

}
