<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;

use Illuminate\Support\Str;

use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
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
            return response()->json(['fn' => $request->first_name, 'errors' => $validation->errors()], 422);
        }

        $user = User::returnUserByRole($request->type);

        $user -> first_name = $request -> first_name;
        $user -> last_name = $request -> last_name;
        $user -> email = $request -> email;
        $user -> password = Hash::make($request -> password);

        $user -> save();

        $token = $user -> createToken('auth_token')->plainTextToken;

        $this -> sendVerificationEmail($user);

        return response()->json(['message' => 'Successfully Registered', 'token' => $token, 'user' => $user]);
    }

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

    public function registerAsDoctor(Request $request) {

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
            $user->email_verified_at = now();
            $user->save();
        }
    
        return redirect()->away('http://localhost:5173/');
    }

    // Log the user out

    public function logout(Request $request) {
        $token = $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Successfully logged out']);
    }
}
