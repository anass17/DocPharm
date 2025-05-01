<?php

namespace Database\Seeders;

use App\Models\Pharmacy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PharmacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Pharmacy::factory(40)->create();

        // DB::table('users')->insert([
        //     [
        //         'first_name' => 'Salma',
        //         'last_name' => 'Bennani',
        //         'role' => 'pharmacy',
        //         'email' => 'pharmacy@gmail.com',
        //         'email_verified_at' => now(),
        //         'password' => Hash::make('123456789'),
        //         'phone_number' => '0612345001',
        //         'profile_picture' => '/storage/profile/doctor/image_1.png',
        //         'address' => '123 Rue des Fleurs',
        //         'city' => 'Rabat',
        //         'bio' => 'Experienced pharmacist with a focus on patient care.',
        //         'medical_license_number' => 'MLN001245',
        //         'postal_code' => '10000',
        //         'verification_step' => 'complete',
        //         'pharmacy_name' => 'GreenMed',
        //         'order_type' => 'both',
        //         'personal_files_path' => '/sadasdtesrser',
        //         'status' => 'active',
        //         'facebook_url' => null,
        //         'instagram_url' => 'https://instagram.com',
        //         'twitter_url' => 'https://x.com',
        //         'working_hours' => json_encode([
        //             'monday' => ['active' => true, 'open' => '08:00', 'close' => '17:00'],
        //             'tuesday' => ['active' => true, 'open' => '08:00', 'close' => '17:00'],
        //             'wednesday' => ['active' => true, 'open' => '08:30', 'close' => '17:30'],
        //             'thursday' => ['active' => true, 'open' => '09:00', 'close' => '18:00'],
        //             'friday' => ['active' => true, 'open' => '08:00', 'close' => '16:00'],
        //             'saturday' => ['active' => false, 'open' => '', 'close' => ''],
        //             'sunday' => ['active' => false, 'open' => '', 'close' => ''],
        //         ]),
        //     ],     
        // ]);
    }
}
