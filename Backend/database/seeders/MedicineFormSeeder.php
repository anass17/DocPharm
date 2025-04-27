<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicine_forms')->insert([
            ['name' => 'Tablet', 'unit' => 'mg'],
            ['name' => 'Capsule', 'unit' => 'mg'],
            ['name' => 'Syrup', 'unit' => 'ml'],
            ['name' => 'Cream', 'unit' => 'mg']
        ]);
    }
}
