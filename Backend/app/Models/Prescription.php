<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'prescription_note'
    ];

    public function appointment() {
        return $this->hasOne(Appointment::class, 'appointment_prescription');
    }

    public function medicines() {
        return $this->belongsToMany(Medicine::class, 'prescription_medicines', 'prescription_id', 'medicine_id');
    }
}
