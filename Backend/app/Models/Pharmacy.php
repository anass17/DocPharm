<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends User {
    protected $attributes = [
        'role' => 'pharmacy',
    ];
}
