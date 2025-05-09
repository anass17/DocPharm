<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Medicine;
use App\Models\Pharmacy;
use App\Models\PharmacyMedicine;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class MedicineController extends Controller {

    use AuthorizesRequests;

    protected $fileController;

    public function __construct(FileController $fileController)
    {
        $this->fileController = $fileController;
    }

    /**
     * Display a listing of the resource.
     */
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
        } else if ($request->sort == "oldest_first") {
            $dir = 'asc';
        }

        $medicines = DB::table('medicines')->leftJoin('medicine_forms', 'medicines.medicine_form', '=', 'medicine_forms.id');

        if ($request->search) {
            $medicines = $medicines->where("medicine_name", "ILIKE", "%{$request->search}%");
        }

        if ($request->min) {
            $medicines = $medicines->where('medicine_price', '>', $request->min);
        }

        if ($request->max) {
            $medicines = $medicines->where('medicine_price', '<', $request->max);
        }
        if ($request->prescription) {
            $medicines = $medicines->whereIn('prescription_required', explode(',', $request->prescription));
        }
        if ($request->forms) {
            $medicines = $medicines->whereIn('medicine_form', explode(',', $request->forms));
        }

        // $medicines = PharmacyMedicine::with('medicines')->where("medicine_name", "ILIKE", "%{$search}%")->orderBy($sort_by, $dir)->paginate(9, ['*'], 'page', $page);
       
        $medicines = $medicines->orderBy($sort_by, $dir)
        ->select(['medicines.*', 'medicine_forms.name As form_name', 'medicine_forms.unit As form_unit'])
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['medicines' => $medicines]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {

        $this->authorize('pharmacy_access');
        
        $validation = Validator::make($request->all(), [
            'medicine_name' => 'required|string|max:255',
            'medicine_description' => 'required|string',
            'medicine_quantity' => 'required|integer',
            'medicine_price' => 'required|numeric',
            'medicine_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'medicine_form' => 'required|integer|exists:medicine_forms,id',
            'medicine_weight' => 'required|integer',
            'prescription_required' => 'required|boolean',
            'medicine_uses' => 'required|string',
            'usage_instructions' => 'required|string',
        ],
        [
            'medicine_form.integer' => 'The selected medicine form is invalid'
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }

        $medicine_search = Medicine::where('medicine_name', 'ILIKE', $request->medicine_name)->where('medicine_weight', 'ILIKE', $request->medicine)->first();

        if ($medicine_search) {
            PharmacyMedicine::insert([
                'medicine_quantity' => $request->medicine_quantity,
                'medicine_id' => $medicine_search->id,
                'pharmacy_id' => $request->user()->id
            ]);
            return response()->json(['message' => 'Medicine exists, it is now linked to your pharmacy'], 201);
        }

        $response = $this->fileController->uploadPublicImage($request, 'medicines', 'medicine_image');

        if ($response->getStatusCode() == 200) {
            $imagePath = json_decode($response->getContent())->image_path;
            $data = $validation->validated();
            $data['medicine_image'] = $imagePath;
        } else {
            return $response; // Return any upload errors
        }

        $medicine = Medicine::create($data);

        $uses = explode(',', $request->medicine_uses);

        $uses_ids = DB::table('medicine_uses')->whereIn('name', $uses)->select('id')->get();

        foreach($uses_ids as $id) {
            DB::table('medicine_usage')->insert([
                'medicine_id' => $medicine->id, 
                'use_id' => $id->id
            ]);
        }

        PharmacyMedicine::insert([
            'medicine_quantity' => $request->medicine_quantity,
            'medicine_id' => $medicine->id,
            'pharmacy_id' => $request->user()->id
        ]);

        // Return success response
        return response()->json(['message' => "The Medicine '{$request->medicine_name}' was successfully added"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $medicine = Medicine::with(['pharmacies' => function($query) {
            $query->wherePivot('visibility', '=', 'true');
            $query->wherePivot('medicine_quantity', '>', 0);
        }])->with('uses')->with('form')->find($id);

        if (!$medicine) {
            return response()->json([], 404);
        }

        return response()->json(['medicine' => $medicine]);
    }

    /**
     * Update the specified resource.
    */

    public function update(Request $request, $id) {

    }

    /**
     * Delete the specified resource.
    */
    public function destroy(Request $request, $id) {
        $medicine = Medicine::find($id);
        
        if (!$medicine) {
            return response()->json(['message' => 'Medicine was not found!'], 404);
        }

        $medicine -> delete();

        return response()->json([], 204);
    }

}
