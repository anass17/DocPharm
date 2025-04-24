<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PharmacyController extends Controller {

    public function index(Request $request) {
        $page = 1;
        $sort_by = 'users.created_at';
        $dir = 'desc';

        if ($request->page) {
            $page = $request->page;
        }

        // if ($request->sort == "price") {
        //     $sort_by = 'medicine_price';
        // } else if ($request->sort == "alphabitically") {
        //     $sort_by = 'medicine_name';
        //     $dir = 'asc';
        // } else if ($request->sort == "availability") {
        //     $sort_by = 'medicine_quantity';
        // }

        $pharmacies = Pharmacy::where('role', 'pharmacy');

        if ($request->search) {
            $pharmacies = $pharmacies->where("pharmacy_name", "ILIKE", "%{$request->search}%");
        }

        // if ($request->min) {
        //     $pharmacies = $pharmacies->where('medicine_price', '>', $request->min);
        // }

        // if ($request->max) {
        //     $pharmacies = $pharmacies->where('medicine_price', '<', $request->max);
        // }
        // if ($request->prescription) {
        //     $pharmacies = $pharmacies->whereIn('prescription_required', explode(',', $request->prescription));
        // }
        // if ($request->forms) {
        //     $pharmacies = $pharmacies->whereIn('medicine_form', explode(',', $request->forms));
        // }
       
        $pharmacies = $pharmacies->orderBy($sort_by, $dir)
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['pharmacies' => $pharmacies]);
    }
    
}
