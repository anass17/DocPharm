<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PharmacyBuildingImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate data

        $validator = Validator::make($request->all(), [
            'building_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Store the image

        if ($request->hasFile('building_image')) {
            $pharmacy = $request -> user();
            
            $image = $request->file('building_image');
            $imageName = time() . '-' . $pharmacy -> id . '.' . $image->getClientOriginalExtension();

            $image->storeAs('pharmacies', $imageName, 'public');

            $pharmacy -> building_image = "/storage/pharmacies/{$imageName}";

            $pharmacy -> save();

            return response()->json(['message' => "Successfully Uploaded", 'path' => "/storage/pharmacies/{$imageName}"]);
        }

        return response()->json(['errors' => ['No image file found.']], 422);
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
