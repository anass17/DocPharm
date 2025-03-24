export function loginUser(payload) {
    return {
        type: 'LOGIN_USER',
        payload: payload
    }
}

export function updateUserVerificationStep(verification_step) {
    return {
        type: 'UPDATE_VERIFICATION_STEP',
        verification_step
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT_USER'
    }
}