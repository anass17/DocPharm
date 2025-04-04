<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 2,
                'first_name' => 'Aziz',
                'last_name' => 'Malki',
                'role' => 'pharmacy',
                'email' => 'aziz@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0612345678',
                'profile_picture' => '',
                'address' => '36 Hay al Amal',
                'city' => 'Safi',
                'bio' => '',
                'medical_license_number' => '1568754212',
                'postal_code' => '45876',
                'verification_step' => 'complete',
                'appointment_type' => null,
                'pharmacy_name' => 'Al Amal Pharmacy',
                'speciality' => '',
                'order_type' => 'both',
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
            ],
            [
                'id' => 3,
                'first_name' => 'Samir',
                'last_name' => 'fathi',
                'role' => 'pharmacy',
                'email' => 'samir@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0699999999',
                'profile_picture' => '',
                'address' => '52 Bd Massira',
                'city' => 'Safi',
                'bio' => '',
                'medical_license_number' => '1568754213',
                'postal_code' => '45876',
                'verification_step' => 'complete',
                'appointment_type' => null,
                'pharmacy_name' => 'Pharmacie Atlas Santé',
                'speciality' => '',
                'order_type' => 'both',
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
            ],
            [
                'id' => 4,
                'first_name' => 'Mohammed',
                'last_name' => 'Fathi',
                'role' => 'pharmacy',
                'email' => 'med@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000000',
                'profile_picture' => '',
                'address' => '45 Geliz',
                'city' => 'Marrakech',
                'bio' => '',
                'medical_license_number' => '1568754214',
                'postal_code' => '45876',
                'verification_step' => 'complete',
                'appointment_type' => null,
                'pharmacy_name' => 'Pharmacie Geliz',
                'speciality' => '',
                'order_type' => 'both',
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
            ]
        ]);
    }
}
