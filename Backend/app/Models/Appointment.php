<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'client_id',
        'appointment_date',
        'appointment_price',
        'appointment_status',
        'appointment_rejection_note',
        'appointment_type',
        'appointment_description',
    ];

    public function client() {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function doctor() {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function prescription() {
        return $this->hasOne(Prescription::class, 'appointment_prescription');
    }
}
