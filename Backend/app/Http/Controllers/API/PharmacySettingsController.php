<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PharmacySettingsController extends Controller
{

    // Update Security

    public function updateSecurity(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'pass' => 'required|string|min:8'
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $pharmacy = $request->user();

        $pharmacy -> password = Hash::make($request->pass);

        $pharmacy -> save();

        return response()->json([], 204);

    }

    // Update General Information

    public function updateGeneralInfo(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'pharmacy_name' => 'required|string',
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

        $pharmacy = $request->user();

        $pharmacy -> pharmacy_name = $request -> pharmacy_name;
        $pharmacy -> phone_number = $request -> phone_number;
        $pharmacy -> bio = $request -> bio;
        $pharmacy -> address = $request -> address;
        $pharmacy -> city = $request -> city;
        $pharmacy -> facebook_url = $request -> facebook_url;
        $pharmacy -> instagram_url = $request -> instagram_url;
        $pharmacy -> twitter_url = $request -> twitter_url;

        $pharmacy -> save();

        return response()->json([], 204);
    }

    // Update Working Hours

    public function updateWorkingHours(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'hours' => 'required|array',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $pharmacy = $request->user();

        $pharmacy -> working_hours = $request -> hours;

        $pharmacy -> save();

        return response()->json([], 204);

    }
}
