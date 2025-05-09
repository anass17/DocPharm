<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineUseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicine_uses')->insert([
            ['name' => 'Fever'],
            ['name' => 'Pain'],
            ['name' => 'Infection'],
            ['name' => 'Inflammation'],
            ['name' => 'Allergy'],
            ['name' => 'Cough'],
            ['name' => 'Anxiety'],
            ['name' => 'Depression'],
            ['name' => 'Diabetes'],
            ['name' => 'Insomnia'],
            ['name' => 'Asthma'],
        ]);
    }
}
