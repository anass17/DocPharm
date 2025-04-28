<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserPharmacyMedicineController extends Controller
{
    public function index(Request $request)
    {

        $page = 1;

        if ($request->page) {
            $page = $request->page;
        }

        $medicines = DB::table('medicines')
        ->join('pharmacy_medicines', 'medicines.id', '=', 'pharmacy_medicines.medicine_id')
        ->leftJoin('medicine_forms', 'medicines.medicine_form', '=', 'medicine_forms.id')
        ->where('visibility', '=', true)
        ->where('pharmacy_id', '=', $request->id);

        $medicines = $medicines->orderBy('medicine_name')
        ->select(['medicines.*', 'pharmacy_medicines.*', 'medicine_forms.name As form_name', 'medicine_forms.unit As form_unit'])
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['medicines' => $medicines]);
    }
}
