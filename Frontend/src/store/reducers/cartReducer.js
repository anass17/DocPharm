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
        // case 'UPDATE_VERIFICATION_STEP':
        //     let newState = state;
        //     newState.user.verification_step = action.verification_step
        //     return newState 
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}