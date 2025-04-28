<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $page = 1;
        $sort_dir = 'asc';

        if ($request->page) {
            $page = $request->page;
        }

        if ($request->sort == 'newest_first') {
            $sort_dir = 'desc';
        }

        
        if ($request->type == 2) {
            $users = Client::where('role', 'client');
        } else if ($request->type == 3) {
            $users = Client::where('role', 'doctor');
        } else if ($request->type == 4) {
            $users = Client::where('role', 'pharmacy');
        } else if ($request->type == 5) {
            $users = Client::where('role', 'admin');
        } else {
            $users = Client::query();
        }

        if ($request -> search) {
            $users = $users -> where(function ($query) use ($request) {
                $query->where('first_name', 'ILIKE', '%' . $request -> search . '%');
                $query->orWhere('last_name', 'ILIKE', '%' . $request -> search . '%');
            });
        }

        $users = $users -> whereNotNull('email_verified_at') -> orderBy('id', $sort_dir) -> paginate(12, ['*'], 'page', $page);


        return response()->json(['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
