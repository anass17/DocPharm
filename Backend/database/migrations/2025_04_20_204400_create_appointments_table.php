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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->timestamp('appointment_date');
            $table->enum('appointment_type', ['online', 'in_person']);
            $table->float('appointment_price');
            $table->string('appointment_description');
            $table->enum('appointment_status', ['active', 'closed', 'rejected']);
            $table->unsignedBigInteger('appointment_prescription')->nullable();
            $table->foreign('appointment_prescription')->on('prescriptions')->references('id')->onDelete('cascade');
            $table->string('appointment_rejection_note')->nullable();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('doctor_id');
            $table->foreign('client_id')->on('users')->references('id')->onDelete('cascade');
            $table->foreign('doctor_id')->on('users')->references('id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
