<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\Pharmacy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PharmacyMedicine>
 */
class PharmacyMedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medicine_id' => Medicine::inRandomOrder()->value('id'),
            'pharmacy_id' => Pharmacy::where('role', 'pharmacy')->inRandomOrder()->value('id'),
            'medicine_quantity' => $this->faker->numberBetween(0, 30),
            'visibility' => $this->faker->boolean(90),
        ];
    }
}
