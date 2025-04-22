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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('prescription_note');
            $table->timestamps();
        });

        Schema::create('prescription_medicines', function (Blueprint $table) {
            $table->unsignedBigInteger('medicine_id');
            $table->unsignedBigInteger('prescription_id');
            $table->integer('quantity');
            $table->foreign('medicine_id')->on('medicines')->references('id')->onDelete('cascade');
            $table->foreign('prescription_id')->on('prescriptions')->references('id')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_medicines');
        Schema::dropIfExists('prescriptions');
    }
};
