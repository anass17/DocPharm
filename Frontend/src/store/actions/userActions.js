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

export function updateUserDetails(payload) {
    return {
        type: 'UPDATE_USER_DETAILS',
        payload
    }
}

export function updateUserbuidingImage(image_url) {
    return {
        type: 'UPDATE_USER_BUILDING_IMAGE',
        image_url
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT_USER'
    }
}