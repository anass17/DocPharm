<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Medicine;
use App\Models\Order;
use App\Models\OrderMedicine;
use App\Models\Pharmacy;
use App\Models\PharmacyMedicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'confirmed_at' => $this->faker->optional()->dateTimeBetween('-1 week', 'now'),
            'delivered_at' => $this->faker->optional()->dateTimeBetween('now', '+1 week'),
            'status' => $this->faker->randomElement(['pending', 'accepted', 'ready', 'rejected', 'delivered']),
            'rejection_reason' => $this->faker->randomElement(['', 'Out of stock', 'Invalid address', 'Payment issue']),
            'rejection_note' => $this->faker->optional(0.5, '')->sentence,
            'delivery_code' => $this->faker->optional()->numberBetween(1000, 9999),
            'tries' => 0,
            'client_id' => Client::where('role', 'client')->inRandomOrder()->value('id'), // picking only clients
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            $pharmacy = Pharmacy::inRandomOrder()->first();

            $medicines = PharmacyMedicine::where('pharmacy_id', $pharmacy->id)->inRandomOrder()->limit(rand(1, 4))->get();

            foreach ($medicines as $medicine) {
                OrderMedicine::create([
                    'medicine_id' => $medicine->id,
                    'order_id' => $order->id,
                    'order_quantity' => $this->faker->numberBetween(1, 3),
                    'unit_price' => $this->faker->randomFloat(2, 5, 200),
                ]);
            }
        });
    }

}
