<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {

        DB::table('users')->insert([
            [
                'first_name' => 'Youssef',
                'last_name' => 'El Amrani',
                'role' => 'client',
                'email' => 'client@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000001',
                'profile_picture' => '/storage/profile/client/image_1.png',
                'address' => '12 Rue El Farabi',
                'city' => 'Rabat',
                'postal_code' => '10000',
                'verification_step' => 'complete',
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
            ],
        ]);

        Client::factory(19)->create();
        
    }
}
