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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('delivered_at')->nullable();

            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->on('users')->references('id')->onDelete('set null');

            $table->timestamps();
        });

        Schema::create('order_medicines', function (Blueprint $table) {
            $table->id();
            $table->integer('order_quantity');
            $table->float('unit_price');
            
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->on('orders')->references('id')->onDelete('cascade');
            $table->unsignedBigInteger('medicine_id');
            $table->foreign('medicine_id')->on('pharmacy_medicines')->references('id')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_medicines');
        Schema::dropIfExists('orders');
    }
};
