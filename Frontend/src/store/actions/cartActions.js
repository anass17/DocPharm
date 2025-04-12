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

export function updateMedicineQuantity(id, quantity) {
    return {
        type: 'UPDATE_MEDICINE_QUANTITY_CART',
        payload: {id, quantity}
    }
}

export function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}