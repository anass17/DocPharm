<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends User {
    protected $attributes = [
        'role' => 'client',
    ];

    public function orders() {
        return $this->hasMany(Order::class, 'client_id');
    }
}
