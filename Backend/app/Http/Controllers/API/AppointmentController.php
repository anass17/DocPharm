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
            
        $results = Appointment::with('client');

        if ($request->search != '') {
            $results = $results -> whereHas('client', function ($query) use ($request) {
                $query->where('first_name', 'ILIKE', "%" . $request->search . "%");
                $query->orWhere('last_name', 'ILIKE', "%" . $request->search . "%");
            });
        }

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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation = Validator::make($request->all(), [
            'appointment_status' => 'sometimes|in:rejected,closed',
            'appointment_rejection_note' => 'sometimes|string',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $appointment->update($validation->valid());

        return response()->json(['message' => 'Successfully Updated'], 204);

    }
}
