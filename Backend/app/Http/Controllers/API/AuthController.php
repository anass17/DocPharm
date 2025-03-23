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

        // $user -> first_name = $request -> first_name;
        // $user -> last_name = $request -> last_name;
        // $user -> email = $request -> email;
        // $user -> password = Hash::make($request -> password);
        // $user = User::returnUserByRole($request->type);

        $user -> first_name = $request -> first_name;
        $user -> last_name = $request -> last_name;
        $user -> email = $request -> email;
        $user -> password = Hash::make($request -> password);

        $user -> save();

        // $this -> sendTestEmail($user);

        return response()->json(['message' => 'Successfully Registered', 'user' => $user]);
    }

    public function sendTestEmail(User $user) {

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(10),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        Mail::to($user->email)->send(new VerificationEmail($user, $verificationUrl));

    }

    public function registerAsDoctor(Request $request) {

    }
}
