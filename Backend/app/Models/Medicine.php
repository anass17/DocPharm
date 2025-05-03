<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{

    use HasFactory;

    protected $fillable = [
        'medicine_name',
        'medicine_description',
        'medicine_price',
        'medicine_image',
        'medicine_form',
        'medicine_weight',
        'prescription_required',
        'usage_instructions',
    ];

    public function form() {
        return $this->belongsTo(MedicineForm::class, 'medicine_form');
    }

    public function uses() {
        return $this->belongsToMany(MedicineUse::class, 'medicine_usage', 'medicine_id', 'use_id');
    }

    public function pharmacies() {
        return $this->belongsToMany(Pharmacy::class, 'pharmacy_medicines', 'medicine_id')->withPivot('medicine_quantity', 'visibility', 'id');
    }

    public function prescriptions() {
        return $this->belongsToMany(Prescription::class, 'prescription_medicines', 'medicine_id', 'prescription_id');
    }
}
