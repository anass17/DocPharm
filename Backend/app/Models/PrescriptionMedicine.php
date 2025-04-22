<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescriptionMedicine extends Model
{
    protected $table = 'prescription_medicines';

    protected $fillable = [
        'medicine_id',
        'prescription_id',
        'quantity'
    ];
}
