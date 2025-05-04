<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Jobs\SendUserApproveEmailJob;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        
        $page = 1;
        $sort_dir = 'asc';
        $status = 'active';

        if ($request->page) {
            $page = $request->page;
        }

        if ($request->sort == 'newest_first') {
            $sort_dir = 'desc';
        }

        if ($request->status) {
            $status = $request->status;
        }

        if ($request->type == 2) {
            $users = Client::where('role', 'client');
        } else if ($request->type == 3) {
            $users = Client::where('role', 'doctor');
        } else if ($request->type == 4) {
            $users = Client::where('role', 'pharmacy');
        } else if ($request->type == 5) {
            $users = Client::where('role', 'admin');
        } else if ($request->status == 'pending') {
            $users = Client::where(function ($query) use ($request) {
                $query -> where('role', 'doctor');
                $query -> orWhere('role', 'pharmacy');
            });
        } else {
            $users = Client::query();
        }

        if ($request -> search) {
            $users = $users -> where(function ($query) use ($request) {
                $query->where('first_name', 'ILIKE', '%' . $request -> search . '%');
                $query->orWhere('last_name', 'ILIKE', '%' . $request -> search . '%');
            });
        }

        $users = $users -> where('verification_step', 'complete') -> where('status', $status) -> orderBy('id', $sort_dir) -> paginate(12, ['*'], 'page', $page);


        return response()->json(['users' => $users]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {

        $user = Client::where('status', 'pending')->where('id', $id)->first();

        // $path = 'private/private/' . $user->personal_files_path . '/cne_back.jpg';
        $path = 'private/' . $user->personal_files_path . '/cne_back.jpg';

        $front = Storage::disk('local')->get('private/' . $user->personal_files_path . '/cne_front.jpg');
        $base64_front = base64_encode($front);
        $mime_front = Storage::mimeType($path);

        $back = Storage::disk('local')->get('private/' . $user->personal_files_path . '/cne_back.jpg');
        $base64 = base64_encode($back);
        $mime = Storage::mimeType($path);

        return response()->json(['user' => $user, 'cne_front' => "data:$mime_front;base64,$base64_front", 'cne_back' => "data:$mime;base64,$base64"]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $validation = Validator::make($request->all(), [
            'status' => 'required|in:active,banned'
        ]);

        if ($validation->fails()) {
            return response()->json(['errors', $validation->errors()], 422);
        }

        $client = Client::find($id);
        $client -> status = $request -> status;
        $client -> save();

        if ($request -> status == 'active') {
            SendUserApproveEmailJob::dispatch($client);
        }

        return response()->json([], 204);
    }
}
