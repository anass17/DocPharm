<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PharmacyMedicineController extends Controller
{
    public function index(Request $request)
    {

        $page = 1;
        $sort_by = 'medicines.id';
        $dir = 'desc';

        if ($request->page) {
            $page = $request->page;
        }

        if ($request->sort == "price") {
            $sort_by = 'medicine_price';
        } else if ($request->sort == "alphabitically") {
            $sort_by = 'medicine_name';
            $dir = 'asc';
        } else if ($request->sort == "availability") {
            $sort_by = 'medicine_quantity';
        }

        $medicines = DB::table('medicines')
        ->join('pharmacy_medicines', 'medicines.id', '=', 'pharmacy_medicines.medicine_id')
        ->leftJoin('medicine_forms', 'medicines.medicine_form', '=', 'medicine_forms.id')
        ->where('pharmacy_id', '=', $request->user()->id);

        if ($request->search) {
            $search = $request->search;
            $medicines = $medicines->where("medicine_name", "ILIKE", "%{$request->search}%");
        }
       
        $medicines = $medicines->orderBy($sort_by, $dir)
        ->select(['medicines.*', 'pharmacy_medicines.*', 'medicine_forms.name As form_name', 'medicine_forms.unit As form_unit'])
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['medicines' => $medicines]);
    }
}
