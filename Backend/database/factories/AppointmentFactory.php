<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'appointment_date' => $this->faker->dateTimeBetween('now', '+6 months'),
            'appointment_type' => $this->faker->randomElement(['online', 'in_person']),
            'appointment_price' => $this->faker->randomFloat(2, 100, 1000),
            'appointment_description' => $this->faker->sentence(8),
            'appointment_status' => $this->faker->randomElement(['active', 'closed', 'rejected']),
            'appointment_prescription' => null,
            'appointment_rejection_note' => $this->faker->optional()->sentence(10),
            'client_id' => \App\Models\Client::factory(),
            'doctor_id' => \App\Models\Doctor::factory(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Appointment $appointment) {
            if (rand(0, 1)) { // 50% chance to create a prescription
                $prescription = Prescription::factory()->create();
                
                $appointment->update([
                    'appointment_prescription' => $prescription->id,
                ]);
            }
        });
    }
}
