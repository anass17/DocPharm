<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\Prescription;
use App\Models\PrescriptionMedicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prescription_note' => $this->faker->sentence(10),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Prescription $prescription) {
            $medicines = Medicine::inRandomOrder()->limit(rand(1, 3))->get();

            foreach ($medicines as $medicine) {
                PrescriptionMedicine::create([
                    'medicine_id' => $medicine->id,
                    'prescription_id' => $prescription->id,
                    'quantity' => 1,
                ]);
            }
        });
    }
}
