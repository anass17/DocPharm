<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\Pharmacy;
use App\Models\PharmacyMedicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pharmacy>
 */
class PharmacyFactory extends Factory
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
            'role' => 'pharmacy',
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => $this->faker->optional()->dateTime(),
            'password' => bcrypt('123456789'),
            'phone_number' => $this->faker->phoneNumber,
            'profile_picture' => $this->faker->randomElement(['/storage/profile/image_' . $this->faker->optional()->numberBetween(2, 7) . '.jpg', '']),
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'bio' => $this->faker->optional()->sentence,
            'medical_license_number' => $this->faker->word,
            'postal_code' => $this->faker->postcode,
            'verification_step' => $this->faker->randomElement(['complete', 'incomplete']),
            'pharmacy_name' => $this->faker->company,
            'order_type' => $this->faker->randomElement(['in_person', 'both']),
            'personal_files_path' => $this->faker->word,
            'building_image' => '/storage/pharmacies/image_' . $this->faker->numberBetween(1,8) . '.jpg',
            'facebook_url' => $this->faker->optional()->url,
            'instagram_url' => $this->faker->optional()->url,
            'twitter_url' => $this->faker->optional()->url,
            'working_hours' => json_encode([
                'monday' => $this->generateWorkingDay(),
                'tuesday' => $this->generateWorkingDay(),
                'wednesday' => $this->generateWorkingDay(),
                'thursday' => $this->generateWorkingDay(),
                'friday' => $this->generateWorkingDay(),
                'saturday' => $this->generateWorkingDay(true), // weekend
                'sunday' => $this->generateWorkingDay(true),   // weekend
            ]),
            'status' => $this->faker->randomElement(['pending', 'active', 'banned']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    
    private function generateWorkingDay($isWeekend = false) {
            
        if ($isWeekend && $this->faker->boolean(80)) {
            // 80% chance of being closed on weekends
            return ['active' => false, 'open' => '', 'close' => ''];
        }

        $openHour = $this->faker->randomElement(['07:00', '08:00', '08:30', '09:00']);
        $closeHour = $this->faker->randomElement(['16:00', '17:00', '17:30', '18:00']);

        return [
            'active' => true,
            'open' => $openHour,
            'close' => $closeHour,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Pharmacy $pharmacy) {
            $medicines = Medicine::inRandomOrder()->limit(rand(1, 20))->get();

            foreach ($medicines as $medicine) {
                PharmacyMedicine::create([
                    'medicine_id' => $medicine->id,
                    'pharmacy_id' => $pharmacy->id,
                    'medicine_quantity' => $this->faker->numberBetween(0, 30),
                    'visibility' => $this->faker->boolean(90),
                ]);
            }
        });
    }
}
