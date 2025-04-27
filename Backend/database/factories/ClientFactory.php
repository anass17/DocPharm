<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'role' => 'client',
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => $this->faker->optional()->dateTime(),
            'password' => bcrypt('123456789'),
            'phone_number' => $this->faker->optional()->phoneNumber,
            'profile_picture' => $this->faker->randomElement(['/storage/profile/image_' . $this->faker->optional()->numberBetween(2, 7) . '.jpg', '']),
            'address' => $this->faker->optional()->address,
            'city' => $this->faker->optional()->city,
            'bio' => $this->faker->optional()->sentence,
            'postal_code' => $this->faker->optional()->postcode,
            'verification_step' => 'complete',
            'status' => $this->faker->randomElement(['pending', 'active', 'banned']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

}
