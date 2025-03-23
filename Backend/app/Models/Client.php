<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends User {
    protected $attributes = [
        'role' => 'client',
    ];
}
