<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class User extends Model {

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

}
