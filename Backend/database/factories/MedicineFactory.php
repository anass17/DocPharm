<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\MedicineUsage;
use App\Models\MedicineUse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medicine_name' => $this->faker->word(),
            'medicine_description' => $this->faker->paragraph(),
            'medicine_price' => $this->faker->randomFloat(2, 5, 200),
            'medicine_weight' => $this->faker->numberBetween(50, 500),
            'prescription_required' => $this->faker->boolean(),
            'usage_instructions' => $this->faker->sentence(),
            'medicine_image' => '/storage/medicines/' . $this->faker->image(storage_path('app/public/medicines'), 640, 480, null, true),
            'medicine_form' => $this->faker->numberBetween(1, 4),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Medicine $medicine) {
            $uses = MedicineUse::inRandomOrder()->limit(rand(1, 4))->get();

            foreach ($uses as $use) {
                MedicineUsage::create([
                    'medicine_id' => $medicine->id,
                    'use_id' => $use->id,
                ]);
            }
        });
    }
}
