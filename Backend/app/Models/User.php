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

    static public function returnUserByRole($role) {
        if ($role == 'admin') {

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
            // $user
        } else if ($user_row->role == 'client') {
            return Client::find($user_row->id);
        }
    }

}
