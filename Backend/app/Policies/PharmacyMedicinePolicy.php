<?php

namespace App\Policies;

use App\Models\PharmacyMedicine;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PharmacyMedicinePolicy
{

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, PharmacyMedicine $pharmacyMedicine): bool
    {
        return $user->role === 'pharmacy' && $pharmacyMedicine->pharmacy_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PharmacyMedicine $pharmacyMedicine): bool
    {
        return $user->role === 'pharmacy' && $pharmacyMedicine->pharmacy_id === $user->id;
    }
}
