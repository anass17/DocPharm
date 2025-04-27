<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\MedicineUse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MedicineUsageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medicine_id' => Medicine::inRandomOrder()->first()->id,  // Get a random medicine ID
            'use_id' => MedicineUse::inRandomOrder()->first()->id,  // Get a random use ID
        ];
    }
}
