export function addMedicineToFavorite(payload) {
    return {
        type: 'ADD_MEDICINE_FAVORITE',
        payload: payload
    }
}

export function deleteMedicineFromFavorite(id) {
    return {
        type: 'DELETE_MEDICINE_FAVORITE',
        id
    }
}