<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends User {
    protected $attributes = [
        'role' => 'doctor',
    ];
}
