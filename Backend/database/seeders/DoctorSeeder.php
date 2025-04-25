<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {

        DB::table('users')->insert([
            [
                'first_name' => 'Amin',
                'last_name' => 'Ibrahim',
                'role' => 'doctor',
                'email' => 'amin1@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000001',
                'profile_picture' => '/storage/profile/doctor/image_1.png',
                'address' => '35 Jrifat',
                'city' => 'Casablanca',
                'bio' => 'Experienced cardiologist with over 10 years of practice, specializing in heart diseases and preventive care.',
                'medical_license_number' => '1568754225',
                'postal_code' => '45875',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Cardiology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/amin',
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Sami',
                'last_name' => 'BenAli',
                'role' => 'doctor',
                'email' => 'sami2@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000002',
                'profile_picture' => '/storage/profile/doctor/image_2.png',
                'address' => '12 Oued El Makhazine',
                'city' => 'Rabat',
                'bio' => 'Dermatologist passionate about skin care and the treatment of various skin conditions. Focused on creating personalized treatment plans.',
                'medical_license_number' => '2358971236',
                'postal_code' => '12345',
                'verification_step' => 'incomplete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'Dermatology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => 'https://facebook.com/sami',
                'instagram_url' => null,
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Rachid',
                'last_name' => 'Jabri',
                'role' => 'doctor',
                'email' => 'rachid3@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000003',
                'profile_picture' => '/storage/profile/doctor/image_3.png',
                'address' => '45 Hassan II',
                'city' => 'Marrakesh',
                'bio' => 'Orthopedic surgeon specializing in joint replacements and sports injuries. Always striving to provide the highest quality care for my patients.',
                'medical_license_number' => '4789875642',
                'postal_code' => '23456',
                'verification_step' => 'complete',
                'appointment_type' => 'in_person',
                'pharmacy_name' => '',
                'speciality' => 'Orthopedics',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'banned',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/rachid_jabri',
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Sofia',
                'last_name' => 'Amin',
                'role' => 'doctor',
                'email' => 'sofia4@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000004',
                'profile_picture' => '/storage/profile/doctor/image_4.png',
                'address' => '67 Tiznit',
                'city' => 'Tangier',
                'bio' => 'Passionate pediatrician dedicated to treating young patients with compassion and care. I believe in a holistic approach to child health.',
                'medical_license_number' => '5478963210',
                'postal_code' => '34567',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Pediatrics',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => 'https://facebook.com/sofia',
                'instagram_url' => null,
                'twitter_url' => 'https://twitter.com/sofia',
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '8:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '8:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '8:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '8:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Khalid',
                'last_name' => 'Mouhib',
                'role' => 'doctor',
                'email' => 'khalid5@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000005',
                'profile_picture' => '/storage/profile/doctor/image_5.png',
                'address' => '89 Boujdour',
                'city' => 'Fès',
                'bio' => 'Neurologist with a deep commitment to helping patients navigate neurological disorders. I focus on creating a supportive environment for recovery.',
                'medical_license_number' => '6758492561',
                'postal_code' => '45678',
                'verification_step' => 'incomplete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'Neurology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/khalid_mouhib',
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '15:00'
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Hassan',
                'last_name' => 'Tazi',
                'role' => 'doctor',
                'email' => 'hassan6@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000006',
                'profile_picture' => '/storage/profile/doctor/image_6.png',
                'address' => '56 Agadir',
                'city' => 'Agadir',
                'bio' => 'General practitioner with a passion for family medicine. I am focused on providing patient-centered care and preventative health services.',
                'medical_license_number' => '3421866542',
                'postal_code' => '56789',
                'verification_step' => 'complete',
                'appointment_type' => 'in_person',
                'pharmacy_name' => '',
                'speciality' => 'General Medicine',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => 'https://facebook.com/hassan',
                'instagram_url' => null,
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Meryem',
                'last_name' => 'Idrissi',
                'role' => 'doctor',
                'email' => 'meryem7@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000007',
                'profile_picture' => '/storage/profile/doctor/image_7.png',
                'address' => '123 Zerktouni',
                'city' => 'Oujda',
                'bio' => 'Psychiatrist focused on mental health support and therapy. I work with patients to manage anxiety, depression, and other mental disorders.',
                'medical_license_number' => '1236549873',
                'postal_code' => '67890',
                'verification_step' => 'incomplete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Psychiatry',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'banned',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/meryem_idrissi',
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Faycal',
                'last_name' => 'Azzouzi',
                'role' => 'doctor',
                'email' => 'faycal8@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000008',
                'profile_picture' => '/storage/profile/doctor/image_8.png',
                'address' => '34 Essaouira',
                'city' => 'El Jadida',
                'bio' => 'Surgeon specializing in minimally invasive techniques. I aim to provide safe and effective treatments that promote fast recovery.',
                'medical_license_number' => '3496573456',
                'postal_code' => '78901',
                'verification_step' => 'complete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'Surgery',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/faycal_azzouzi',
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '20:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '20:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '20:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '20:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '11:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Ranya',
                'last_name' => 'El Alami',
                'role' => 'doctor',
                'email' => 'ranya9@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000009',
                'profile_picture' => '/storage/profile/doctor/image_9.png',
                'address' => '24 Berrchid',
                'city' => 'Marrakesh',
                'bio' => 'Gynecologist dedicated to women’s health. I provide compassionate care and specialized treatments in obstetrics and gynecology.',
                'medical_license_number' => '7856443289',
                'postal_code' => '89012',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Gynecology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => 'https://facebook.com/ranya',
                'instagram_url' => null,
                'twitter_url' => 'https://twitter.com/ranya',
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '12:00'
                    ],
                    'saturday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '12:00'
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Omar',
                'last_name' => 'Fassi',
                'role' => 'doctor',
                'email' => 'omar10@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000010',
                'profile_picture' => '/storage/profile/doctor/image_10.png',
                'address' => '89 Place Mohammed V',
                'city' => 'Tangier',
                'bio' => 'Specialized in internal medicine, I focus on diagnosing and treating a wide range of chronic diseases. I aim for comprehensive care.',
                'medical_license_number' => '6758923456',
                'postal_code' => '91011',
                'verification_step' => 'incomplete',
                'appointment_type' => 'in_person',
                'pharmacy_name' => '',
                'speciality' => 'Internal Medicine',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/omar_fassi',
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Salma',
                'last_name' => 'Bouchra',
                'role' => 'doctor',
                'email' => 'salma11@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000011',
                'profile_picture' => '/storage/profile/doctor/image_11.png',
                'address' => '12 Boulevard Zerktouni',
                'city' => 'Casablanca',
                'bio' => 'Anesthesiologist with a focus on pain management and sedation techniques. I ensure patient comfort and safety during surgeries.',
                'medical_license_number' => '8765432190',
                'postal_code' => '11222',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Anesthesiology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => 'https://facebook.com/salma',
                'instagram_url' => 'https://instagram.com/salma_bouchra',
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Amina',
                'last_name' => 'Cherkaoui',
                'role' => 'doctor',
                'email' => 'amina12@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000012',
                'profile_picture' => '/storage/profile/doctor/image_12.png',
                'address' => '9 Avenue Hassan II',
                'city' => 'Rabat',
                'bio' => 'Orthopedic surgeon with a special interest in spinal surgeries. I am dedicated to restoring mobility and reducing pain for my patients.',
                'medical_license_number' => '7658392145',
                'postal_code' => '12378',
                'verification_step' => 'incomplete',
                'appointment_type' => 'in_person',
                'pharmacy_name' => '',
                'speciality' => 'Orthopedics',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => 'https://facebook.com/amina',
                'instagram_url' => null,
                'twitter_url' => null,
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Karim',
                'last_name' => 'El Habib',
                'role' => 'doctor',
                'email' => 'karim13@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000013',
                'profile_picture' => '/storage/profile/doctor/image_13.png',
                'address' => '8 Rue Mohammed V',
                'city' => 'Fez',
                'bio' => 'Surgeon with an expertise in minimally invasive techniques for treating abdominal diseases. I focus on reducing recovery time for my patients.',
                'medical_license_number' => '8726235481',
                'postal_code' => '67890',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Surgery',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/karim_habib',
                'twitter_url' => 'https://twitter.com/karim_habib',
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Wafaa',
                'last_name' => 'Berrada',
                'role' => 'doctor',
                'email' => 'wafaa14@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000014',
                'profile_picture' => '/storage/profile/doctor/image_14.png',
                'address' => '78 Zerktouni',
                'city' => 'Marrakesh',
                'bio' => 'A passionate ophthalmologist specializing in treating eye diseases. I believe in providing personalized care to improve my patients’ vision.',
                'medical_license_number' => '1234786543',
                'postal_code' => '89111',
                'verification_step' => 'complete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'Ophthalmology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'banned',
                'facebook_url' => 'https://facebook.com/wafaa',
                'instagram_url' => null,
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Mouad',
                'last_name' => 'El Ghazi',
                'role' => 'doctor',
                'email' => 'mouad15@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000015',
                'profile_picture' => '/storage/profile/doctor/image_15.png',
                'address' => '45 Boulevard Mohammed VI',
                'city' => 'Tangier',
                'bio' => 'A surgeon with expertise in vascular surgeries. My approach focuses on helping patients regain quality of life through effective treatments.',
                'medical_license_number' => '9987432095',
                'postal_code' => '93456',
                'verification_step' => 'incomplete',
                'appointment_type' => 'in_person',
                'pharmacy_name' => '',
                'speciality' => 'Vascular Surgery',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/mouad_elghazi',
                'twitter_url' => 'https://twitter.com/mouad_elghazi',
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Zineb',
                'last_name' => 'Lahlou',
                'role' => 'doctor',
                'email' => 'zineb16@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000016',
                'profile_picture' => '/storage/profile/doctor/image_16.png',
                'address' => '34 Taza',
                'city' => 'Casablanca',
                'bio' => 'Oncologist focused on cancer care. I aim to provide my patients with comprehensive treatment plans and emotional support.',
                'medical_license_number' => '3149875123',
                'postal_code' => '56789',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Oncology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => 'https://facebook.com/zineb',
                'instagram_url' => null,
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Yassir',
                'last_name' => 'Fadil',
                'role' => 'doctor',
                'email' => 'yassir17@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000017',
                'profile_picture' => '/storage/profile/doctor/image_17.png',
                'address' => '56 Rue Agadir',
                'city' => 'Rabat',
                'bio' => 'A dedicated urologist who specializes in the diagnosis and treatment of urinary tract conditions and male reproductive health.',
                'medical_license_number' => '9876345120',
                'postal_code' => '67890',
                'verification_step' => 'complete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'Urology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'banned',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/yassir_fadil',
                'twitter_url' => null,
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Nadia',
                'last_name' => 'Zouhair',
                'role' => 'doctor',
                'email' => 'nadia18@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000018',
                'profile_picture' => '/storage/profile/doctor/image_18.png',
                'address' => '34 Hassan II',
                'city' => 'Marrakesh',
                'bio' => 'Specialized in radiology, I focus on interpreting imaging tests to help with diagnosis and treatment planning for various conditions.',
                'medical_license_number' => '7567432189',
                'postal_code' => '82376',
                'verification_step' => 'incomplete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Radiology',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/nadia_zouhair',
                'twitter_url' => 'https://twitter.com/nadia_zouhair',
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '16:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '17:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ],
            [
                'first_name' => 'Mouhamad',
                'last_name' => 'Tazi',
                'role' => 'doctor',
                'email' => 'mouhamad19@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000019',
                'profile_picture' => '/storage/profile/doctor/image_19.png',
                'address' => '23 Youssoufia',
                'city' => 'Tangier',
                'bio' => 'General surgeon focused on providing high-quality surgical care, specializing in abdominal surgery and gallbladder treatments.',
                'medical_license_number' => '5498763451',
                'postal_code' => '76543',
                'verification_step' => 'incomplete',
                'appointment_type' => 'online',
                'pharmacy_name' => '',
                'speciality' => 'General Surgery',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'pending',
                'facebook_url' => 'https://facebook.com/mouhamad',
                'instagram_url' => null,
                'twitter_url' => 'https://twitter.com/mouhamad_tazi',
                'working_hours' => null,
                'appointment_prices' => null
            ],
            [
                'first_name' => 'Yasmina',
                'last_name' => 'El Hachimi',
                'role' => 'doctor',
                'email' => 'yasmina20@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'phone_number' => '0600000020',
                'profile_picture' => '/storage/profile/doctor/image_20.png',
                'address' => '45 Jabrin',
                'city' => 'Agadir',
                'bio' => 'A committed pediatrician who focuses on early childhood care and the prevention of diseases in children.',
                'medical_license_number' => '9988723465',
                'postal_code' => '84756',
                'verification_step' => 'complete',
                'appointment_type' => 'both',
                'pharmacy_name' => '',
                'speciality' => 'Pediatrics',
                'order_type' => null,
                'personal_files_path' => '/sadasdtesrser',
                'status' => 'active',
                'facebook_url' => null,
                'instagram_url' => 'https://instagram.com/yasmina',
                'twitter_url' => 'https://twitter.com/yasmina_elhachimi',
                'working_hours' => json_encode([
                    'monday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'tuesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'wednesday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'thursday' => [
                        'active' => true,
                        'open' => '9:00',
                        'close' => '17:00'
                    ],
                    'friday' => [
                        'active' => true,
                        'open' => '10:00',
                        'close' => '16:00'
                    ],
                    'saturday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ],
                    'sunday' => [
                        'active' => false,
                        'open' => '',
                        'close' => ''
                    ]
                ]),
                'appointment_prices' => json_encode([
                    'online' => 120,
                    'in_person' => 100
                ])
            ]
        ]);

    }
}
