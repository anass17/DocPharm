<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('appointments')->insert([
            [
                'client_id' => 5, 
                'doctor_id' => 7,
                'appointment_date' => '2025-05-15 12:00:00',
                'appointment_price' => 150,
                'appointment_type' => 'online',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'active'
            ],
            [
                'client_id' => 5, 
                'doctor_id' => 7,
                'appointment_date' => '2025-04-28 12:30:00',
                'appointment_price' => 120,
                'appointment_type' => 'in_person',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'active'
            ],
            [
                'client_id' => 6, 
                'doctor_id' => 7,
                'appointment_date' => '2025-05-16 12:00:00',
                'appointment_price' => 150,
                'appointment_type' => 'online',
                'appointment_description' => 'I don\'t feel okay',
                'appointment_status' => 'active'
            ],
            [
                'client_id' => 4, 
                'doctor_id' => 7,
                'appointment_date' => '2025-04-22 10:30:00',
                'appointment_price' => 100,
                'appointment_type' => 'in_person',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'active'
            ],
            [
                'client_id' => 3, 
                'doctor_id' => 7,
                'appointment_date' => '2025-04-11 12:00:00',
                'appointment_price' => 150,
                'appointment_type' => 'online',
                'appointment_description' => 'My leg is broken',
                'appointment_status' => 'closed'
            ],
            [
                'client_id' => 2, 
                'doctor_id' => 7,
                'appointment_date' => '2025-04-16 12:00:00',
                'appointment_price' => 150,
                'appointment_type' => 'online',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'closed'
            ],
            [
                'client_id' => 4, 
                'doctor_id' => 7,
                'appointment_date' => '2025-04-22 11:00:00',
                'appointment_price' => 120,
                'appointment_type' => 'online',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'active'
            ],
            [
                'client_id' => 2, 
                'doctor_id' => 7,
                'appointment_date' => '2025-05-11 16:00:00',
                'appointment_price' => 100,
                'appointment_type' => 'in_person',
                'appointment_description' => 'I have a bad Fever',
                'appointment_status' => 'active'
            ],
        ]);
    }
}
