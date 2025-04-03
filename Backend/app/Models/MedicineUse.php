<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineUse extends Model
{
    public function uses() {
        return $this->belongsToMany(Medicine::class, 'medicine_usage', 'use_id', 'medicine_id');
    }
}
