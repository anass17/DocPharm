<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\DoctorController;
use App\Http\Controllers\API\MedicineController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderHistoryController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\PharmacyController;
use App\Http\Controllers\API\PharmacyMedicineController;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

// Update Pharmacy Details

Route::middleware('auth:sanctum')->post('/pharmacy/update/security', [PharmacyController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/pharmacy/update/general', [PharmacyController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->put('/pharmacy/update/working_hours', [PharmacyController::class, 'updateWorkingHours']);

// Update Doctor Details

Route::middleware('auth:sanctum')->post('/doctor/update/security', [DoctorController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/doctor/update/general', [DoctorController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->put('/doctor/update/working_hours', [DoctorController::class, 'updateWorkingHours']);
Route::middleware('auth:sanctum')->put('/doctor/update/reservation', [DoctorController::class, 'updateReservationDetails']);

// Medicines

Route::middleware('auth:sanctum')->resource('medicines', MedicineController::class);
Route::middleware('auth:sanctum')->get('/pharmacy/medicines', [PharmacyMedicineController::class, 'index']);
Route::middleware('auth:sanctum')->get('/pharmacy/dashboard', [DashboardController::class, 'pharmacy']);
Route::middleware('auth:sanctum')->get('/medicine/options', function () {
    $forms = DB::table('medicine_forms')->get();
    $uses = DB::table('medicine_uses')->get();
    return response()->json(['forms' => $forms, 'uses' => $uses]);
});

// Orders

Route::middleware('auth:sanctum')->get('/orders/history', [OrderHistoryController::class, 'index']);
Route::middleware('auth:sanctum')->resource('orders', OrderController::class);
Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/cart/{id}', [CartController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/confirm-order/{sessionId}', [OrderController::class, 'confirm']);

Route::post('/create-checkout-session', [PaymentController::class, 'medicinePayment']);