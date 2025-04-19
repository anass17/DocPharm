<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

abstract class User extends Model {

    use HasApiTokens;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'working_hours' => 'array',
    ];

    static public function returnUserByRole($role) {
        if ($role == 'admin') {
            return new Admin();
        } else if ($role == 'pharmacy') {
            return new Pharmacy();
        } else if ($role == 'doctor') {
            return new Doctor();
        } else {
            return new Client();
        }
    }

    static public function returnUserByEmail($email) {
        $user_row = DB::table('users')->where('email', $email)->first();

        if (!$user_row) {
            return null;
        }

        if ($user_row->role == 'admin') {
            return Admin::find($user_row->id);
        } else if ($user_row->role == 'pharmacy') {
            return Pharmacy::find($user_row->id);
        } else if ($user_row->role == 'doctor') {
            return Doctor::find($user_row->id);
        } else if ($user_row->role == 'client') {
            return Client::find($user_row->id);
        }
    }

}
