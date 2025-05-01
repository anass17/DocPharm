const initialState = {
    favorite: []
}

export default function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MEDICINE_FAVORITE':
            return {
                ...state,
                favorite: [...state.favorite, action.payload]
            }
        case 'DELETE_MEDICINE_FAVORITE':
            return {
                ...state,
                favorite: state.favorite.filter(item => item.id !== action.id)
            }
        default:
            return state
    }
}