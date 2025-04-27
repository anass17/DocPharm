<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 30);
            $table->string('last_name', 30);
            $table->enum('role', ['admin', 'client', 'doctor', 'pharmacy']);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone_number', 20)->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('bio')->nullable();
            $table->string('medical_license_number')->nullable();
            $table->string('postal_code')->nullable();
            $table->enum('verification_step', ['complete', 'incomplete'])->default('incomplete');
            $table->enum('appointment_type', ['in_person', 'online', 'both'])->nullable();
            $table->json('appointment_prices')->nullable();
            $table->string('pharmacy_name')->nullable();
            $table->string('speciality')->nullable();
            $table->enum('order_type', ['in_person', 'both'])->nullable();
            $table->string('personal_files_path')->nullable();
            $table->string('building_image')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->json('working_hours')->nullable();
            $table->enum('status', ['pending', 'active', 'banned'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
