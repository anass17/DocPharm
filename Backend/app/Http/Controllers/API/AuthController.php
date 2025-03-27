<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;


use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {

        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'email' => 'required|string|max:255|unique:users,email',
            'type' => 'required|in:client,doctor,pharmacy',
            'password' => 'required|string|between:8,32',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $user = User::returnUserByRole($request->type);

        $user -> first_name = $request -> first_name;
        $user -> last_name = $request -> last_name;
        $user -> email = $request -> email;
        $user -> password = Hash::make($request -> password);

        $user -> save();

        $token = $user -> createToken('auth_token')->plainTextToken;

        // $this -> sendVerificationEmail($user);

        return response()->json(['message' => 'Successfully Registered', 'token' => $token, 'user' => $user]);
    }

    // Log User In

    public function login(Request $request) {

        $user = User::returnUserByEmail($request->email);

        if (!$user || Hash::check($request->passwor, $user->password)) {
            return response()->json(['message', 'Incorrect Login Credentials'], 401);
        }

        $token = $user -> createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    // Send Verification Email to the user

    public function sendVerificationEmail(User $user) {

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(10),
            [
                'id' => $user->id, 
                'hash' => sha1($user->email)
            ]
        );

        Mail::to($user->email)->send(new VerificationEmail($user, $verificationUrl));

    }

    // Get doctor's verification data and store it

    public function registerAsDoctor(Request $request) {

        $validation = Validator::make($request->all(), [
            'cne_front' => 'required|file|mimes:jpg,png,webp|max:10240',
            'cne_back' => 'required|file|mimes:jpg,png,webp|max:10240',
            'prof_document' => 'required|file|mimes:pdf|max:10240',
            'building_front' => 'required|file|mimes:jpg,png,webp|max:10240',
            'profile_picture' => 'required|file|mimes:jpg,png,webp|max:10240',
            'medical_license_number' => 'required|integer',
            'address' => 'required|string|max:255',
            'city' => 'required|string',
            'postal_code' => 'required|integer',
            'bio' => 'required|string',
            'speciality' => 'required|string',
            'appointment_type' => 'required|in:online,in-person,both',
            'phone_number' => 'required|string|regex:/^0[567][0-9]{8}$/',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $user = $request->user();

        $dir_name = $user->id . '_' . Str::uuid();

        $this -> uploadFile($request->file('cne_front'), "cne_front", $dir_name);
        $this -> uploadFile($request->file('cne_back'), "cne_back", $dir_name);
        $this -> uploadFile($request->file('prof_document'), "prof_document", $dir_name);
        $this -> uploadFile($request->file('building_front'), "building_front", $dir_name);
        $this -> uploadFile($request->file('profile_picture'), "profile_picture", $dir_name);

        $user -> medical_license_number = $request -> medical_license_number;
        $user -> personal_files_path = $request -> dir_name;
        $user -> address = $request -> address;
        $user -> city = $request -> city;
        $user -> postal_code = $request -> postal_code;
        $user -> bio = $request -> bio;
        $user -> speciality = $request -> speciality;
        $user -> appointment_type = $request -> appointment_type;
        $user -> phone_number = $request -> phone_number;
        $user -> verification_step = 'complete';

        $user -> save();

        return response()->json(['message' => 'Register Data has been saved']);
    }

    // Get pharmacy's verification data and store it

    public function registerAsPharmacy(Request $request) {

        $validation = Validator::make($request->all(), [
            'cne_front' => 'required|file|mimes:jpg,png,webp|max:10240',
            'cne_back' => 'required|file|mimes:jpg,png,webp|max:10240',
            'prof_document' => 'required|file|mimes:pdf|max:10240',
            'building_front' => 'required|file|mimes:jpg,png,webp|max:10240',
            'pharmacy_name' => 'required|string',
            'medical_license_number' => 'required|integer',
            'address' => 'required|string|max:255',
            'city' => 'required|string',
            'postal_code' => 'required|integer',
            'order_type' => 'required|in:online,in-person,both',
            'phone_number' => 'required|string|regex:/^0[567][0-9]{8}$/',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $user = $request->user();

        $dir_name = $user->id . '_' . Str::uuid();

        $this -> uploadFile($request->file('cne_front'), "cne_front", $dir_name);
        $this -> uploadFile($request->file('cne_back'), "cne_back", $dir_name);
        $this -> uploadFile($request->file('prof_document'), "prof_document", $dir_name);
        $this -> uploadFile($request->file('building_front'), "building_front", $dir_name);

        $user -> medical_license_number = $request -> medical_license_number;
        $user -> pharmacy_name = $request -> pharmacy_name;
        $user -> personal_files_path = $request -> dir_name;
        $user -> address = $request -> address;
        $user -> city = $request -> city;
        $user -> postal_code = $request -> postal_code;
        $user -> bio = $request -> bio;
        $user -> order_type = $request -> order_type;
        $user -> phone_number = $request -> phone_number;
        $user -> verification_step = 'complete';

        $user -> save();

        return response()->json(['message' => 'Register Data has been saved']);
    }

    // Get the user details from sanctum token

    public function getUser(Request $request) {
        $user = $request->user();
        return response()->json(['user' => $user]);
    }

    // Verify the email when the user clicks on the link

    public function verifyEmail($id, $hash) {
        $user = Client::findOrFail($id);
    
        if (hash_equals($hash, sha1($user->email))) {
            if ($user->role == 'client') {
                $user->status = 'active';
            }

            $user->email_verified_at = now();
            $user->save();
        }
    
        return redirect()->away('http://localhost:5173/');
    }

    // Log the user out

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function uploadFile($file_to_upload, $file_name, $dir_name) {
        $file = $file_to_upload;

        $fileName = $file_name . '.' . $file->getClientOriginalExtension();

        $folderPath = "private/{$dir_name}";

        $file->storeAs($folderPath, $fileName, 'local');

    }
}
