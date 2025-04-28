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

        if ($request->page) {
            $page = $request->page;
        }

        
        if ($request->type == 2) {
            $users = Client::where('role', 'client');
        } else if ($request->type == 3) {
            $users = Client::where('role', 'doctor');
        } else if ($request->type == 4) {
            $users = Client::where('role', 'pharmacy');
        } else {
            $users = Client::query();
        }

        $users = $users -> whereNotNull('email_verified_at') -> orderBy('id') -> paginate(12, ['*'], 'page', $page);


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
