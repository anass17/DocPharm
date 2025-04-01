<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends User {
    protected $attributes = [
        'role' => 'pharmacy',
    ];

    public function medicines() {
        return $this->belongsToMany(Medicine::class, 'pharmacy_medicines', 'pharmacy_id');
    }
}
