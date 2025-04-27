<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderMedicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_quantity',
        'unit_price',
        'order_id',
        'medicine_id',
    ];

}
