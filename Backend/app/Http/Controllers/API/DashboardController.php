<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function pharmacy() {
        $latest_medicine = Medicine::orderBy('id', 'desc')->limit(3)->get();
        return response()->json(['recent_added' => $latest_medicine]);
    }
}
