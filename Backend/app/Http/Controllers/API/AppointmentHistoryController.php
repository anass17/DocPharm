<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentHistoryController extends Controller
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

        if ($request->status != '') {
            $results = $results -> where('appointment_status', $request->status);
        }
        
        $results = $results -> whereNot('appointment_status', 'active') -> orderBy('appointment_date')->get();

        return response()->json(['results' => $results]);
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
