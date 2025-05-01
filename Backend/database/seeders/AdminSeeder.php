<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Anass',
                'last_name' => 'Boutaib',
                'role' => 'admin',
                'email' => 'anass@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '061234568',
                'profile_picture' => '/storage/profile/anass_boutaib_1.jpg',
                'address' => '12 Rue El Farabi',
                'city' => 'Rabat',
                'postal_code' => '10000',
                'verification_step' => 'complete',
                'personal_files_path' => '',
                'status' => 'active',
            ],
        ]);
    }
}
