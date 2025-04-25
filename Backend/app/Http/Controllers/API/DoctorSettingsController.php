<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DoctorSettingsController extends Controller
{
    // Update Doctor's Security

    public function updateSecurity(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'pass' => 'required|string|min:8'
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = $request->user();

        $doctor -> password = Hash::make($request->pass);

        $doctor -> save();

        return response()->json([], 204);
    }

    // Update Doctor's General Information

    public function updateGeneralInfo(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|string|regex:/^0[567][0-9]{8}$/',
            'bio' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'facebook_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = $request->user();

        $doctor -> first_name = $request -> first_name;
        $doctor -> last_name = $request -> last_name;
        $doctor -> phone_number = $request -> phone_number;
        $doctor -> bio = $request -> bio;
        $doctor -> address = $request -> address;
        $doctor -> city = $request -> city;
        $doctor -> facebook_url = $request -> facebook_url;
        $doctor -> instagram_url = $request -> instagram_url;
        $doctor -> twitter_url = $request -> twitter_url;

        $doctor -> save();

        return response()->json([], 204);
    }

    // Update Doctor's Working Hours

    public function updateWorkingHours(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'hours' => 'required|array',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = $request->user();

        $doctor -> working_hours = $request -> hours;

        $doctor -> save();

        return response()->json([], 204);
    }

    // Update Doctor's Reservation Details

    public function updateReservationDetails(Request $request) {
        $validation = Validator::make($request->all(), [
            'appointment_type' => 'required|in:both,in-person,online',
            'in_person_appointment_price' => 'required|numeric',
            'online_appointment_price' => 'required|numeric',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = $request->user();

        $doctor -> appointment_type = $request -> appointment_type;
        $doctor -> appointment_prices = [
            'in_person' => $request -> in_person_appointment_price,
            'online' => $request -> online_appointment_price,
        ];

        $doctor -> save();

        return response()->json([], 204);
    }

}
