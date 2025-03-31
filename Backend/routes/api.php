<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MedicineController;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/registerasdoctor', [AuthController::class, 'registerAsDoctor']);
    Route::post('/registeraspharmacy', [AuthController::class, 'registerAsPharmacy']);
});

Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');

// Medicines

Route::middleware('auth:sanctum')->resource('medicines', MedicineController::class);

