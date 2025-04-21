<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get reserved Time Slots

        if ($request->type == "timeonly") {
            if (!$request->date) {
                return response()->json([], 422);
            }
    
            $results = Appointment::whereDate('appointment_date', $request->date)
            ->selectRaw("TO_CHAR(appointment_date, 'HH24:MI') as time")
            ->get();

            return response()->json(['results' => $results]);
        }

        // Get All Appointment
            
        $results = Appointment::with('client');

        // if ($request->search != '') {
            $results = $results -> whereHas('client', function ($query) use ($request) {
                $query->where('first_name', 'ILIKE', "%" . $request->search . "%");
                $query->orWhere('last_name', 'ILIKE', "%" . $request->search . "%");
            });
        // }

        if ($request->date != 'null') {
            $results = $results -> whereDate('appointment_date', $request->date);
        }

        if ($request->type != '') {
            $results = $results -> where('appointment_type', $request->type);
        }
        
        $results = $results -> where('appointment_status', 'active') -> orderBy('appointment_date')->get();

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
