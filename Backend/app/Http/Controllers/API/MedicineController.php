<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Medicine;
use Illuminate\Support\Facades\DB;

class MedicineController extends Controller {

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

        if ($request->page) {
            $page = $request->page;
        }

        $medicines = Medicine::with('form')->paginate(9, ['*'], 'page', $page);

        return response()->json(['medicines' => $medicines]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        
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

        // Return success response
        return response()->json(['message' => 'Medicine Successfully Added'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
