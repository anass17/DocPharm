export function addMedicineToCart(payload) {
    return {
        type: 'ADD_MEDICINE_CART',
        payload: payload
    }
}

export function deleteMedicineFromCart(id) {
    return {
        type: 'DELETE_MEDICINE_CART',
        id
    }
}

export function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}