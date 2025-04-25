<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller {

    // List all doctors

    public function index(Request $request) {
        $page = 1;
        $sort_by = 'users.created_at';
        $dir = 'desc';

        if ($request->page) {
            $page = $request->page;
        }

        $doctors = Doctor::where('role', 'doctor');

        if ($request->search) {
            $doctors = $doctors->where(function ($query) use ($request) {
                $query->where("first_name", "ILIKE", "%{$request->search}%");
                $query->orWhere("last_name", "ILIKE", "%{$request->search}%");
            });
        }

        if ($request->city) {
            $doctors = $doctors->where('city', $request->city);
        }
        if ($request->speciality) {
            $doctors = $doctors->where('sepeciality', $request->speciality);
        }
       
        $doctors = $doctors->orderBy($sort_by, $dir)
        ->paginate(9, ['*'], 'page', $page);

        return response()->json(['doctors' => $doctors]);
    }

    // Get Doctor Details

    public function show($id) {
        $doctor = Doctor::where('role', 'doctor')->where('id', $id)->first();
        
        if (!$doctor) {
            return response()->json(['message' => 'Not Found'], 404);
        }
        
        return response()->json(['doctor' => $doctor]);
    }

}
