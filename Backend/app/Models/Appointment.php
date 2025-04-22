<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
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
}
