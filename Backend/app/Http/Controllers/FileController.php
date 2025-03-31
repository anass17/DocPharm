<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller {
    
    // Handle public image upload

    public function uploadPublicImage(Request $request, $folder, $image_name) {

        // Validate data

        $validator = Validator::make($request->all(), [
            $image_name => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Store the image

        if ($request->hasFile($image_name)) {
            $image = $request->file($image_name);

            $imageName = time() . '.' . $image->getClientOriginalExtension();

            $image->storeAs($folder, $imageName, 'public');

            return response()->json(['image_path' => "/storage/$folder/" . $imageName], 200);
        }

        return response()->json(['errors' => ['No image file found.']], 422);
    }

}
