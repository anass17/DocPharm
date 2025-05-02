<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\OrderMedicine;
use App\Models\PharmacyMedicine;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PharmacyMedicineController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {

        $this->authorize('pharmacy_access');

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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->authorize('pharmacy_access');

        $validation = Validator::make($request->all(), [
            'new_quantity' => 'required|integer',
            'new_visibility' => 'required|bool'
        ]);

        if ($validation -> fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }
        
        $medicine = PharmacyMedicine::where('medicine_id', '=', $id)->where('pharmacy_id', '=', $request->user() -> id)->first();
        
        if (!$medicine) {
            return response()->json(['errors' => ['Medicine not found']], 422);
        }

        if ($medicine->medicine_quantity + $request->new_quantity < 0) {
            return response()->json(['errors' => ['The total quantity should not be negative']], 422);
        }

        $medicine -> medicine_quantity += $request->new_quantity;
        $medicine -> visibility = $request->new_visibility;

        $medicine->save();

        return response()->json(['message' => 'Medicine Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id) {

        $this->authorize('pharmacy_access');
        
        $medicine = PharmacyMedicine::where('medicine_id', '=', $id)->where('pharmacy_id', '=', $request->user() -> id)->first();

        if (!$medicine) {
            return response()->json(['errors' => ['Medicine was not found']], 404);
        }

        $related_orders = OrderMedicine::where('medicine_id', $medicine->id)->first();

        if ($related_orders) {
            return response()->json(['errors' => ['Could not delete medicine due to previously placed orders']], 422);
        }

        $medicine->delete();

        return response()->json(['message' => 'Medicine Deleted Successfully', 'd' => $related_orders]);
    }

}
