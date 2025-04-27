<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {

        // 20 Doctors

        DB::table('users')->insert([
            [
                'first_name' => 'Amin',
                'last_name' => 'Ibrahim',
                'role' => 'doctor',
                'email' => 'doctor@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000001',
                'profile_picture' => '/storage/profile/doctor/image_1.png',
                'address' => '35 Jrifat',
                'city' => 'Casablanca',
                'bio' => 'Experienced cardiologist with over 10 years of practice, specializing in heart diseases and preventive care.',
                'medical_license_number' => '1568754225',
                'postal_code' => '45875',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Cardiology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/amin',
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
        ]);

        Doctor::factory(19)->create();
    }
}
