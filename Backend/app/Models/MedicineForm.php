<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineForm extends Model
{
    protected $table = 'medicine_forms';

    public function medicines() {
        return $this->hasMany(Medicine::class);
    }
}
