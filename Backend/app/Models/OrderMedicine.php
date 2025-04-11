<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderMedicine extends Model
{
    protected $fillable = [
        'order_quantity',
        'unit_price',
        'order_id',
        'medicine_id',
    ];

}
