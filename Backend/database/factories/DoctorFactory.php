<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
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
            'role' => 'doctor',
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => $this->faker->optional()->dateTime(),
            'password' => bcrypt('123456789'),
            'phone_number' => $this->faker->phoneNumber,
            'profile_picture' => $this->faker->randomElement(['/storage/profile/image_' . $this->faker->numberBetween(2, 7) . '.jpg', '']),
            'address' => $this->faker->address,
            'city' => $this->faker->randomElement(["Agadir", "Azilal", "Benslimane", "Berkane", "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", "Essaouira", "Fès", "Figuig", "Guelmim", "Ifrane", "Kénitra", "Khémisset", "Khouribga", "Laâyoune", "Larache", "Marrakesh", "Meknès", "Midelt", "Mohammedia", "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Tanger", "Tata", "Tiznit", "Taroudant", "Tétouan", "Tinghir", "Youssoufia"]),
            'bio' => $this->faker->sentence,
            'medical_license_number' => $this->faker->word,
            'postal_code' => $this->faker->postcode,
            'verification_step' => 'complete',
            'appointment_type' => $this->faker->randomElement(['in_person', 'online', 'both', 'paused']),
            'appointment_prices' => [
                'online' => $this->faker->randomFloat(2, 100, 200),
                'in_person' => $this->faker->randomFloat(2, 100, 200),
            ],
            'speciality' => $this->faker->randomElement(['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Psychiatry', 'Oncology', 'Ophthalmology', 'Orthopedics', 'Gynecology', 'Endocrinology', 'Gastroenterology', 'Pulmonology', 'Radiology', 'Anesthesiology', 'Urology', 'Rheumatology', 'General Surgery', 'Family Medicine', 'Infectious Disease', 'Nephrology']),
            'personal_files_path' => $this->faker->word,
            'building_image' => '/storage/pharmacies/image_' . $this->faker->numberBetween(1,8) . '.jpg',
            'facebook_url' => $this->faker->optional()->url,
            'instagram_url' => $this->faker->optional()->url,
            'twitter_url' => $this->faker->optional()->url,
            'working_hours' => [
                'monday' => $this->generateWorkingDay(),
                'tuesday' => $this->generateWorkingDay(),
                'wednesday' => $this->generateWorkingDay(),
                'thursday' => $this->generateWorkingDay(),
                'friday' => $this->generateWorkingDay(),
                'saturday' => $this->generateWorkingDay(true),
                'sunday' => $this->generateWorkingDay(true),
            ],
            'status' => $this->faker->randomElement(['pending', 'active', 'banned']),
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
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
}
