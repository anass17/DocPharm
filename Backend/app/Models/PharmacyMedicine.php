<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacyMedicine extends Model
{
    protected $fillable = [
        'medicine_quantity',
        'medicine_id'
    ];

}
