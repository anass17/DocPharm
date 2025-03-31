<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $fillable = [
        'medicine_name',
        'medicine_description',
        'medicine_quantity',
        'medicine_price',
        'medicine_image',
        'medicine_form',
        'medicine_weight',
        'prescription_required',
        'usage_instructions',
    ];
}
