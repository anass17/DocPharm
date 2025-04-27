<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id'
    ];

    public function medicines() {
        return $this->belongsToMany(PharmacyMedicine::class, 'order_medicines', 'order_id', 'medicine_id')->withPivot(['order_quantity', 'unit_price']);
    }

    public function client() {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
