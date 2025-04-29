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
        case 'UPDATE_USER_DETAILS':
            return {
                isAuthenticated: true,
                user: {
                    ...state.user, ...action.payload
                }
            }
        case 'UPDATE_USER_BUILDING_IMAGE':
            return {
                isAuthenticated: true,
                user: {
                    ...state.user, building_image: action.image_url
                }
            }
        case 'UPDATE_USER_PROFILE_PICTURE':
            return {
                isAuthenticated: true,
                user: {
                    ...state.user, profile_picture: action.image_url
                }
            }
        case 'LOGOUT_USER':
            return {
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}