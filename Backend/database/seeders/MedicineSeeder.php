<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicine_forms')->insert([
            ['name' => 'Tablet', 'unit' => 'mg'],
            ['name' => 'Capsule', 'unit' => 'mg'],
            ['name' => 'Syrup', 'unit' => 'ml'],
            ['name' => 'Cream', 'unit' => 'mg']
        ]);

        DB::table('medicine_uses')->insert([
            ['name' => 'Fever'],
            ['name' => 'Pain'],
            ['name' => 'Infection'],
            ['name' => 'Inflammation'],
            ['name' => 'Allergy'],
            ['name' => 'Cough'],
            ['name' => 'Anxiety'],
            ['name' => 'Depression'],
            ['name' => 'Diabetes'],
            ['name' => 'Insomnia'],
            ['name' => 'Asthma'],
        ]);

        DB::table('medicines')->insert([
            [
                'medicine_name' => 'ImmunoCurexil',
                'medicine_description' => 'A potent monoclonal antibody for immune system regulation.',
                'medicine_price' => 85.99,
                'medicine_weight' => '50',
                'prescription_required' => true,
                'usage_instructions' => "Inject 1 dose weekly as prescribed.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 2,
            ],
            
            [
                'medicine_name' => 'Zyphorimab',
                'medicine_description' => 'Used for targeted treatment of inflammatory conditions.',
                'medicine_price' => 112.75,
                'medicine_weight' => '45',
                'prescription_required' => false,
                'usage_instructions' => "Administer 2 doses per month under medical supervision.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 2,
            ],
            
            [
                'medicine_name' => 'Cortanexumab',
                'medicine_description' => 'An antibody for corticosteroid-resistant disorders.',
                'medicine_price' => 78.45,
                'medicine_weight' => '60',
                'prescription_required' => true,
                'usage_instructions' => "Take 1 injection biweekly.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 3,
            ],
            
            [
                'medicine_name' => 'Neuroxinab',
                'medicine_description' => 'Effective against neurodegenerative diseases.',
                'medicine_price' => 145.50,
                'medicine_weight' => '55',
                'prescription_required' => true,
                'usage_instructions' => "Administer via intravenous infusion every 3 weeks.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 3,
            ],
            
            [
                'medicine_name' => 'Oncoveximab',
                'medicine_description' => 'Monoclonal antibody for cancer immunotherapy.',
                'medicine_price' => 210.30,
                'medicine_weight' => '70',
                'prescription_required' => false,
                'usage_instructions' => "Intravenous infusion once every 2 weeks.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 4,
            ],
            
            [
                'medicine_name' => 'Virolexumab',
                'medicine_description' => 'Treats viral infections resistant to standard treatments.',
                'medicine_price' => 95.40,
                'medicine_weight' => '40',
                'prescription_required' => false,
                'usage_instructions' => "Take 1 tablet daily until completion of prescribed regimen.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 1,
            ],
            
            [
                'medicine_name' => 'Immunogenixol',
                'medicine_description' => 'Boosts the immune system response for chronic infections.',
                'medicine_price' => 120.60,
                'medicine_weight' => '52',
                'prescription_required' => true,
                'usage_instructions' => "Inject 1 dose every 10 days.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 2,
            ],
            
            [
                'medicine_name' => 'Allerxizumab',
                'medicine_description' => 'Monoclonal antibody for severe allergic reactions.',
                'medicine_price' => 68.20,
                'medicine_weight' => '47',
                'prescription_required' => false,
                'usage_instructions' => "Administer subcutaneously as directed by your doctor.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 2,
            ],
            
            [
                'medicine_name' => 'Rheumomab',
                'medicine_description' => 'Targeted therapy for rheumatoid arthritis.',
                'medicine_price' => 138.90,
                'medicine_weight' => '60',
                'prescription_required' => false,
                'usage_instructions' => "Inject 1 dose every 4 weeks.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 4,
            ],
            
            [
                'medicine_name' => 'Autoimmunab',
                'medicine_description' => 'Treats autoimmune disorders with high specificity.',
                'medicine_price' => 155.80,
                'medicine_weight' => '53',
                'prescription_required' => false,
                'usage_instructions' => "Administer 1 injection every 2 months.",
                'medicine_image' => '/storage/medicines/fake_image.jpg',
                'medicine_form' => 1,
            ]
        ]);

        DB::table('medicine_usage')->insert([
            ['medicine_id' => 1, 'use_id' => 2],
            ['medicine_id' => 1, 'use_id' => 4],
            ['medicine_id' => 1, 'use_id' => 5],
            ['medicine_id' => 2, 'use_id' => 1],
            ['medicine_id' => 2, 'use_id' => 3],
            ['medicine_id' => 2, 'use_id' => 4],
            ['medicine_id' => 3, 'use_id' => 6],
            ['medicine_id' => 3, 'use_id' => 2],
            ['medicine_id' => 3, 'use_id' => 1],
            ['medicine_id' => 3, 'use_id' => 7],
            ['medicine_id' => 4, 'use_id' => 8],
            ['medicine_id' => 4, 'use_id' => 6],
            ['medicine_id' => 5, 'use_id' => 5],
            ['medicine_id' => 5, 'use_id' => 10],
            ['medicine_id' => 5, 'use_id' => 4],
            ['medicine_id' => 6, 'use_id' => 7],
            ['medicine_id' => 6, 'use_id' => 11],
            ['medicine_id' => 6, 'use_id' => 2],
            ['medicine_id' => 6, 'use_id' => 10],
            ['medicine_id' => 7, 'use_id' => 1],
            ['medicine_id' => 7, 'use_id' => 9],
            ['medicine_id' => 8, 'use_id' => 4],
            ['medicine_id' => 8, 'use_id' => 11],
            ['medicine_id' => 8, 'use_id' => 6],
            ['medicine_id' => 8, 'use_id' => 5],
            ['medicine_id' => 9, 'use_id' => 2],
            ['medicine_id' => 9, 'use_id' => 8],
            ['medicine_id' => 9, 'use_id' => 10],
            ['medicine_id' => 10, 'use_id' => 9],
        ]);
        
        DB::table('pharmacy_medicines')->insert([
            ['medicine_id' => 1, 'pharmacy_id' => 4, 'medicine_quantity' => 5, 'visibility' => 'true'],
            ['medicine_id' => 1, 'pharmacy_id' => 2, 'medicine_quantity' => 7, 'visibility' => 'true'],
            ['medicine_id' => 1, 'pharmacy_id' => 3, 'medicine_quantity' => 8, 'visibility' => 'true'],
            ['medicine_id' => 2, 'pharmacy_id' => 4, 'medicine_quantity' => 10, 'visibility' => 'true'],
            ['medicine_id' => 2, 'pharmacy_id' => 2, 'medicine_quantity' => 9, 'visibility' => 'true'],
            ['medicine_id' => 2, 'pharmacy_id' => 3, 'medicine_quantity' => 13, 'visibility' => 'true'],
            ['medicine_id' => 3, 'pharmacy_id' => 4, 'medicine_quantity' => 25, 'visibility' => 'true'],
            ['medicine_id' => 3, 'pharmacy_id' => 2, 'medicine_quantity' => 11, 'visibility' => 'true'],
            ['medicine_id' => 3, 'pharmacy_id' => 3, 'medicine_quantity' => 9, 'visibility' => 'true'],
            ['medicine_id' => 4, 'pharmacy_id' => 4, 'medicine_quantity' => 3, 'visibility' => 'true'],
            ['medicine_id' => 4, 'pharmacy_id' => 2, 'medicine_quantity' => 1, 'visibility' => 'true'],
            ['medicine_id' => 4, 'pharmacy_id' => 3, 'medicine_quantity' => 1, 'visibility' => 'true'],
            ['medicine_id' => 5, 'pharmacy_id' => 4, 'medicine_quantity' => 12, 'visibility' => 'true'],
            ['medicine_id' => 5, 'pharmacy_id' => 2, 'medicine_quantity' => 5, 'visibility' => 'true'],
            ['medicine_id' => 5, 'pharmacy_id' => 3, 'medicine_quantity' => 4, 'visibility' => 'true'],
            ['medicine_id' => 6, 'pharmacy_id' => 2, 'medicine_quantity' => 3, 'visibility' => 'true'],
            ['medicine_id' => 6, 'pharmacy_id' => 3, 'medicine_quantity' => 9, 'visibility' => 'true'],
            ['medicine_id' => 7, 'pharmacy_id' => 4, 'medicine_quantity' => 8, 'visibility' => 'true'],
            ['medicine_id' => 7, 'pharmacy_id' => 3, 'medicine_quantity' => 4, 'visibility' => 'true'],
            ['medicine_id' => 8, 'pharmacy_id' => 4, 'medicine_quantity' => 7, 'visibility' => 'true'],
            ['medicine_id' => 8, 'pharmacy_id' => 2, 'medicine_quantity' => 1, 'visibility' => 'true'],
            ['medicine_id' => 8, 'pharmacy_id' => 3, 'medicine_quantity' => 12, 'visibility' => 'true'],
            ['medicine_id' => 9, 'pharmacy_id' => 2, 'medicine_quantity' => 10, 'visibility' => 'true'],
            ['medicine_id' => 9, 'pharmacy_id' => 3, 'medicine_quantity' => 28, 'visibility' => 'true'],
            ['medicine_id' => 10, 'pharmacy_id' => 3, 'medicine_quantity' => 23, 'visibility' => 'true'],
        ]);
    }
}
