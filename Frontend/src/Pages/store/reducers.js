const initialState = {user: null}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_USER':
            return {
                user: null
            }
        default:
            return state
    }
}