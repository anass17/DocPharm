<?php

use App\Http\Controllers\API\AdminDashboardController;
use App\Http\Controllers\API\AdminSettingsController;
use App\Http\Controllers\API\AppointmentAvailabilityController;
use App\Http\Controllers\API\AppointmentHistoryController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ClientDashboardController;
use App\Http\Controllers\API\DoctorController;
use App\Http\Controllers\API\DoctorDashboardController;
use App\Http\Controllers\API\DoctorSettingsController;
use App\Http\Controllers\API\MedicineController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderHistoryController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\PharmacyBuildingImageController;
use App\Http\Controllers\API\PharmacyController;
use App\Http\Controllers\API\PharmacyDashboardController;
use App\Http\Controllers\API\PharmacyMedicineController;
use App\Http\Controllers\API\PharmacySettingsController;
use App\Http\Controllers\API\PrescriptionController;
use App\Http\Controllers\API\UserAppointmentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UserOrdersController;
use App\Http\Controllers\API\UserPharmacyMedicineController;
use App\Http\Controllers\API\UserSettingsController;
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

Route::middleware('auth:sanctum')->get('/pharmacies', [PharmacyController::class, 'index']);
Route::middleware('auth:sanctum')->get('/pharmacies/{id}', [PharmacyController::class, 'show']);
Route::middleware('auth:sanctum')->post('/pharmacy/update/security', [PharmacySettingsController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/pharmacy/update/general', [PharmacySettingsController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->put('/pharmacy/update/working_hours', [PharmacySettingsController::class, 'updateWorkingHours']);
Route::middleware('auth:sanctum')->get('/pharmacy/dashboard', [PharmacyDashboardController::class, 'index']);
Route::middleware('auth:sanctum')->post('/pharmacy/building_image/upload', [PharmacyBuildingImageController::class, 'store']);

// Doctor Routes

Route::middleware('auth:sanctum')->get('/doctors', [DoctorController::class, 'index']);
Route::middleware('auth:sanctum')->get('/doctors/{id}', [DoctorController::class, 'show']);
Route::middleware('auth:sanctum')->post('/doctor/update/security', [DoctorSettingsController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/doctor/update/general', [DoctorSettingsController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->put('/doctor/update/working_hours', [DoctorSettingsController::class, 'updateWorkingHours']);
Route::middleware('auth:sanctum')->put('/doctor/update/reservation', [DoctorSettingsController::class, 'updateReservationDetails']);
Route::middleware('auth:sanctum')->get('/doctor/dashboard', [DoctorDashboardController::class, 'index']);

// Medicines

Route::middleware('auth:sanctum')->resource('medicines', MedicineController::class)->only(['index', 'show', 'store']);
Route::middleware('auth:sanctum')->resource('/pharmacy/medicines', PharmacyMedicineController::class)->only(['index', 'update', 'destroy']);
Route::middleware('auth:sanctum')->resource('/pharmacies/{id}/medicines', UserPharmacyMedicineController::class)->only(['index']);
Route::middleware('auth:sanctum')->get('/medicine/options', function () {
    $forms = DB::table('medicine_forms')->get();
    $uses = DB::table('medicine_uses')->get();
    return response()->json(['forms' => $forms, 'uses' => $uses]);
});

// Admin

Route::middleware('auth:sanctum')->post('/admin/update/security', [AdminSettingsController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/admin/update/general', [AdminSettingsController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->post('/admin/update/profile_picture', [AdminSettingsController::class, 'updateProfilePicture']);
Route::middleware('auth:sanctum')->get('/admin/dashboard', [AdminDashboardController::class, 'index']);

// User

Route::middleware('auth:sanctum')->post('/user/update/security', [UserSettingsController::class, 'updateSecurity']);
Route::middleware('auth:sanctum')->put('/user/update/general', [UserSettingsController::class, 'updateGeneralInfo']);
Route::middleware('auth:sanctum')->post('/user/update/profile_picture', [UserSettingsController::class, 'updateProfilePicture']);
Route::middleware('auth:sanctum')->get('/client/dashboard', [ClientDashboardController::class, 'index']);

// Orders

Route::middleware('auth:sanctum')->get('/orders/history', [OrderHistoryController::class, 'index']);
Route::middleware('auth:sanctum')->resource('orders', OrderController::class);
Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/cart/{id}', [CartController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/confirm-order/{sessionId}', [OrderController::class, 'confirm']);
Route::middleware('auth:sanctum')->resource('/client/orders', UserOrdersController::class)->only('index');

Route::post('/create-checkout-session', [PaymentController::class, 'medicinePayment']);
Route::post('/create-appointment-checkout-session', [PaymentController::class, 'appointmentPayment']);

// Appointments

Route::middleware('auth:sanctum')->get('/appointments/availability', [AppointmentAvailabilityController::class, 'index']);
Route::middleware('auth:sanctum')->get('appointments/history', [AppointmentHistoryController::class, 'index']);
Route::middleware('auth:sanctum')->resource('doctor/appointments', AppointmentController::class)->only(['index', 'update']);
Route::middleware('auth:sanctum')->resource('appointments', UserAppointmentController::class)->only(['index', 'store']);

// Prescriptions

Route::middleware('auth:sanctum')->resource('prescriptions', PrescriptionController::class)->only(['store', 'show']);

Route::middleware('auth:sanctum')->resource('users', UserController::class)->only(['index', 'show', 'update']);