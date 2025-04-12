const initialState = {
    cart: []
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MEDICINE_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'DELETE_MEDICINE_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.id)
            }
        case 'UPDATE_MEDICINE_QUANTITY_CART':
            return {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload.id ? {...item, pivot: {...item.pivot, order_quantity : action.payload.quantity}} : item)
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}