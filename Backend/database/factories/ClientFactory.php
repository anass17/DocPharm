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
            'phone_number' => $this->faker->phoneNumber,
            'profile_picture' => $this->faker->randomElement(['/storage/profile/image_' . $this->faker->numberBetween(2, 7) . '.jpg', '']),
            'address' => $this->faker->optional()->address,
            'city' => $this->faker->randomElement(["Agadir", "Azilal", "Benslimane", "Berkane", "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", "Essaouira", "Fès", "Figuig", "Guelmim", "Ifrane", "Kénitra", "Khémisset", "Khouribga", "Laâyoune", "Larache", "Marrakesh", "Meknès", "Midelt", "Mohammedia", "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Tanger", "Tata", "Tiznit", "Taroudant", "Tétouan", "Tinghir", "Youssoufia"]),
            'bio' => $this->faker->optional()->sentence,
            'postal_code' => $this->faker->optional()->postcode,
            'verification_step' => 'complete',
            'status' => $this->faker->randomElement(['pending', 'active', 'banned']),
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'updated_at' => now(),
        ];
    }

}