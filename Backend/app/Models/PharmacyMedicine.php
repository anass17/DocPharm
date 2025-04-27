<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PharmacyMedicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_quantity',
        'pharmacy_id',
        'medicine_id',
        'visibility'
    ];

    public function orders() {
        return $this->belongsToMany(Order::class, 'order_medicines', 'medicine_id', 'order_id');
    }

    public function medicine() {
        return $this->belongsTo(Medicine::class, 'medicine_id');
    }

    public function pharmacy() {
        return $this->belongsTo(Pharmacy::class, 'pharmacy_id');
    }

}
