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
            $table->string('name');
            $table->text('description');
            $table->float('price');
            $table->integer('quantity');
            $table->integer('weight');
            $table->enum('type', ['Over The Counter', 'Prescription Required']);
            $table->string('usage_instructions');
            $table->string('product_image');
            $table->unsignedBigInteger('medicine_form');
            $table->foreign('medicine_form')->on('medicine_forms')->references('id')->onDelete('set null');
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
        Schema::dropIfExists('medicine_forms');
        Schema::dropIfExists('medicine_usage');
        Schema::dropIfExists('medicines');
        Schema::dropIfExists('medicine_uses');
    }
};
