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

        $pharmacies = Pharmacy::where('role', 'pharmacy');

        if ($request->search) {
            $pharmacies = $pharmacies->where("pharmacy_name", "ILIKE", "%{$request->search}%");
        }

        if ($request->city) {
            $pharmacies = $pharmacies->where('city', $request->city);
        }
        if ($request->status) {
            $params = explode(',', $request->status);
            $pharmacies = $pharmacies->where(function ($query) use ($params) {
                if (in_array('not_specified', $params)) {
                    $query->orWhereNull('working_hours');
                }
                if (in_array('open', $params)) {
                    $query->orWhereRaw("working_hours->'" . strtolower(now()->format('l')) . "'->>'active' = 'true'");
                }
                if (in_array('closed', $params)) {
                    $query->orWhereRaw("working_hours->'" . strtolower(now()->format('l')) . "'->>'active' = 'false'");
                }
            });
        }
       
        $pharmacies = $pharmacies->orderBy($sort_by, $dir)
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['pharmacies' => $pharmacies]);
    }
    
}
