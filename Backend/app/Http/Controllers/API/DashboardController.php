<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function pharmacy(Request $request) {

        $latest_medicine = DB::table('medicines')
        ->join('pharmacy_medicines', 'medicines.id', '=', 'pharmacy_medicines.medicine_id')
        ->where('pharmacy_id', '=', $request->user()->id)
        ->orderBy('medicines.id', 'desc')->limit(4)->get();

        return response()->json(['recent_added' => $latest_medicine]);
    }
}
