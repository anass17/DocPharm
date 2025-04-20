<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
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

        $pharmacy = $request->user();

        $pharmacy -> password = Hash::make($request->pass);

        $pharmacy -> save();

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

        $pharmacy = $request->user();

        $pharmacy -> working_hours = $request -> hours;

        $pharmacy -> save();

        return response()->json([], 204);

    }
}
