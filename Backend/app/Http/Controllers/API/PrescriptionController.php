<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\PrescriptionEmail;
use App\Models\Appointment;
use App\Models\Client;
use App\Models\Doctor;
use App\Models\Prescription;
use App\Models\PrescriptionMedicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'appointment' => 'required|integer',
            'description' => 'required|string',
            'medicines' => 'sometimes|array',
            'medicines.*' => 'integer',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $apt = Appointment::where('id', $request->appointment)->whereNull('appointment_prescription')->where('appointment_status', 'active')->where('appointment_date', '<', now())->first();

        if (!$apt) {
            return response()->json(['errors' => 'Could not add prescription to this appointment'], 404);
        }

        $prescription = Prescription::create([
            'prescription_note' => $request->description
        ]);

        foreach($request->medicines as $medicine) {
            PrescriptionMedicine::insert([
                'medicine_id' => $medicine,
                'prescription_id' => $prescription -> id,
                'quantity' => 1
            ]);
        }

        $apt -> appointment_prescription = $prescription -> id;
        $apt -> appointment_status = 'closed';
        $apt -> save();

        Mail::to('anassboutaib2018@gmail.com')->send(new PrescriptionEmail(Client::find($apt -> client_id), $request -> user(), $apt));

        return response()->json(['message' => 'Prescription Successfully Added'], 201);
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
