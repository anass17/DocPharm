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

        Schema::create('medicine_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('unit');
            $table->timestamps();
        });

        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('medicine_name');
            $table->text('medicine_description');
            $table->float('medicine_price');
            $table->integer('medicine_weight');
            $table->boolean('prescription_required');
            $table->string('usage_instructions');
            $table->string('medicine_image');
            $table->unsignedBigInteger('medicine_form');
            $table->foreign('medicine_form')->on('medicine_forms')->references('id')->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('pharmacy_medicines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medicine_id');
            $table->unsignedBigInteger('pharmacy_id');
            $table->integer('medicine_quantity');
            $table->boolean('visibility')->default(true);
            $table->foreign('medicine_id')->on('medicines')->references('id')->onDelete('cascade');
            $table->foreign('pharmacy_id')->on('users')->references('id')->onDelete('cascade');
            $table->timestamps();
        });


        Schema::create('medicine_uses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('medicine_usage', function (Blueprint $table) {
            $table->unsignedBigInteger('medicine_id');
            $table->unsignedBigInteger('use_id');
            $table->primary(['medicine_id', 'use_id']);
            $table->foreign('medicine_id')->on('medicines')->references('id')->onDelete('cascade');
            $table->foreign('use_id')->on('medicine_uses')->references('id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacy_medicines');
        Schema::dropIfExists('medicine_usage');
        Schema::dropIfExists('medicines');
        Schema::dropIfExists('medicine_forms');
        Schema::dropIfExists('medicine_uses');
    }
};
