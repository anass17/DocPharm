<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Medicines

        $this->call(MedicineFormSeeder::class);
        $this->call(MedicineUseSeeder::class);
        $this->call(MedicineSeeder::class);

        // Users

        $this->call(AdminSeeder::class);
        $this->call(PharmacySeeder::class);
        $this->call(ClientSeeder::class);
        $this->call(DoctorSeeder::class);

        // Orders

        $this->call(OrderSeeder::class);
        // $this->call(OrderMedicineSeeder::class);

        // Appointments

        $this->call(AppointmentSeeder::class);
    }
}
