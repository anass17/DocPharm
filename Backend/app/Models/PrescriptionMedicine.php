<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescriptionMedicine extends Model
{
    protected $table = 'prescription_medicines';

    public $incrementing = false;

    protected $fillable = [
        'medicine_id',
        'prescription_id',
        'quantity'
    ];

    public $timestamps = false;
}
