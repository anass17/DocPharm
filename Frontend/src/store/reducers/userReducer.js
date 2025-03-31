const initialState = {
    isAuthenticated: false,
    user: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case 'UPDATE_VERIFICATION_STEP':
            let newState = state;
            newState.user.verification_step = action.verification_step
            return newState 
        case 'LOGOUT_USER':
            return {
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}