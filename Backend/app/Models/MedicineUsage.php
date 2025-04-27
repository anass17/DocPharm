<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineUsage extends Model {

    protected $table = 'medicine_usage';

    public $incrementing = false;

    protected $fillable = [
        'medicine_id',
        'use_id',
    ];

}
