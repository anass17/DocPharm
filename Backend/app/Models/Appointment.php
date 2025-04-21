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
        'appointment_type',
        'appointment_description',
    ];
}
