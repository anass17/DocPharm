<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminSettingsController extends Controller
{
    // Update Admin's Security

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
}
