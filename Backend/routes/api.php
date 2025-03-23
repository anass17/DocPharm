<?php

use App\Http\Controllers\API\AuthController;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    $user = Client::findOrFail($id);

    if (! hash_equals($hash, sha1($user->email))) {
        abort(404);
    }
     
    $user->email_verified_at = now();
    $user->save();

    return response()->json(['message' => 'Accepted']);
})->name('verification.verify');



