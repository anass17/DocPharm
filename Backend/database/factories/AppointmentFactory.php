<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Doctor;
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
            'appointment_date' => $this->faker->dateTimeBetween('-3 months', '+3 months'),
            'appointment_type' => $this->faker->randomElement(['online', 'in_person']),
            'appointment_price' => $this->faker->randomFloat(2, 100, 200),
            'appointment_description' => $this->faker->sentence(10),
            'appointment_status' => $this->faker->randomElement(['active', 'closed', 'rejected']),
            'appointment_prescription' => null,
            'appointment_rejection_note' => $this->faker->sentence(10),
            'client_id' => Client::where('role', 'client')->inRandomOrder()->value('id'),
            'doctor_id' => Doctor::where('role', 'doctor')->inRandomOrder()->value('id'),
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
