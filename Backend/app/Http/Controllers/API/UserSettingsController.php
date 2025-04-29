<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserSettingsController extends Controller
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

    // Update Admin's General Information

    public function updateGeneralInfo(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|string|regex:/^0[567][0-9]{8}$/',
            'address' => 'required|string',
            'city' => 'required|string',
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $doctor = $request->user();

        $doctor -> first_name = $request -> first_name;
        $doctor -> last_name = $request -> last_name;
        $doctor -> phone_number = $request -> phone_number;
        $doctor -> address = $request -> address;
        $doctor -> city = $request -> city;

        $doctor -> save();

        return response()->json([], 204);
    }

    // Update Profile Picture

    public function updateProfilePicture(Request $request)
    {
        // Validate data

        $validator = Validator::make($request->all(), [
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Store the image

        if ($request->hasFile('profile_picture')) {
            $admin = $request -> user();
            
            $image = $request->file('profile_picture');
            $imageName = time() . '-' . $admin -> id . '.' . $image->getClientOriginalExtension();

            $image->storeAs('profile', $imageName, 'public');

            $admin -> profile_picture = "/storage/profile/{$imageName}";

            $admin -> save();

            return response()->json(['message' => "Successfully Uploaded", 'path' => "/storage/profile/{$imageName}"]);
        }

        return response()->json(['errors' => ['No image file found.']], 422);
    }
}
