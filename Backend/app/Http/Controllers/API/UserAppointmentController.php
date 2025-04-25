<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $results = Appointment::with('doctor');

        if ($request->search != '') {
            $results = $results -> whereHas('doctor', function ($query) use ($request) {
                $query->where('first_name', 'ILIKE', "%" . $request->search . "%");
                $query->orWhere('last_name', 'ILIKE', "%" . $request->search . "%");
            });
        }

        if ($request->type != '') {
            $results = $results -> where('appointment_type', $request->type);
        }

        if ($request->status != '') {
            $results = $results -> where('appointment_status', $request->status);
        }
        
        $results = $results -> where('client_id', $request->user()->id) -> orderByRaw("
            CASE appointment_status
                WHEN 'active' THEN 1
                WHEN 'closed' THEN 2
                WHEN 'rejected' THEN 3
                ELSE 4
            END,
            appointment_date
        ")->get();

        return response()->json(['results' => $results]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'doctor' => 'required|integer',
            'selectedDate' => 'required|date',
            'selectedType' => 'required|in:online,in_person',
            'addedDescription' => 'required|string',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = Doctor::where('role', 'doctor')->where('id', $request->doctor)->first();

        if (!$doctor) {
            return response()->json(['error' => 'Doctor Not Found'], 404);
        }

        Appointment::create([
            'doctor_id' => $doctor->id,
            'client_id' => $request->user()->id,
            'appointment_date' => $request->selectedDate,
            'appointment_type' => $request->selectedType,
            'appointment_price' => $doctor->appointment_prices[$request->selectedType],
            'appointment_description' => $request->addedDescription,
        ]);

        return response()->json(['message' => 'Successfully Booked'], 201);
    }
}
