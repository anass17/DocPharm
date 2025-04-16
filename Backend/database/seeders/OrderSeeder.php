<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'id' => 1,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 5
            ],
            [
                'id' => 2,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 5
            ],
            [
                'id' => 3,
                'confirmed_at' => now(),
                'status' => 'accepted',
                'client_id' => 6
            ],
            [
                'id' => 4,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 6
            ],
            [
                'id' => 5,
                'confirmed_at' => now(),
                'status' => 'accepted',
                'client_id' => 5
            ],
            [
                'id' => 6,
                'confirmed_at' => now(),
                'status' => 'accepted',
                'client_id' => 6
            ],
            [
                'id' => 7,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 5
            ],
            [
                'id' => 8,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 5
            ],
            [
                'id' => 9,
                'confirmed_at' => now(),
                'status' => 'pending',
                'client_id' => 6
            ],
            [
                'id' => 10,
                'confirmed_at' => now(),
                'status' => 'accepted',
                'client_id' => 5
            ],
        ]);

        DB::table('order_medicines')->insert([
            [
                'order_quantity' => 2,
                'unit_price' => 5.60,
                'order_id' => 1,
                'medicine_id' => 3
            ],
            [
                'order_quantity' => 3,
                'unit_price' => 14.22,
                'order_id' => 1,
                'medicine_id' => 5
            ],
            [
                'order_quantity' => 1,
                'unit_price' => 120.70,
                'order_id' => 1,
                'medicine_id' => 8
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 10.00,
                'order_id' => 2,
                'medicine_id' => 8
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 12.00,
                'order_id' => 3,
                'medicine_id' => 9
            ],
            [
                'order_quantity' => 1,
                'unit_price' => 13.50,
                'order_id' => 4,
                'medicine_id' => 10
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 105.90,
                'order_id' => 5,
                'medicine_id' => 8
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 13.00,
                'order_id' => 6,
                'medicine_id' => 9
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 120.90,
                'order_id' => 7,
                'medicine_id' => 10
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 130.50,
                'order_id' => 8,
                'medicine_id' => 8
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 11.50,
                'order_id' => 8,
                'medicine_id' => 11
            ],
            [
                'order_quantity' => 3,
                'unit_price' => 9.00,
                'order_id' => 8,
                'medicine_id' => 14
            ],
            [
                'order_quantity' => 1,
                'unit_price' => 19.00,
                'order_id' => 8,
                'medicine_id' => 16
            ],
            [
                'order_quantity' => 2,
                'unit_price' => 31.00,
                'order_id' => 9,
                'medicine_id' => 12
            ],
            [
                'order_quantity' => 1,
                'unit_price' => 52.00,
                'order_id' => 10,
                'medicine_id' => 15
            ],
        ]);

    }
}
