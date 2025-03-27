import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = () => {

    const navigate = useNavigate()
    const user = useSelector(data => data.user.user);

    useEffect(() => {
        if (!user) {
            // navigate('/login')
        } else if (user.email_verified_at == null) {
            navigate('/verifyEmail')
        } else if (user.role == 'doctor' && user.verification_step == 'incomplete') {
            navigate('/registerAsDoctor')
        } else if (user.role == 'pharmacy' && user.verification_step == 'incomplete') {
            navigate('/registerAsPharmacy')
        } else if (user.status == 'pending') {
            navigate('/pending')
        }
    }, [user])

    return (
     <>
     </>   
    )
};

export default AuthMiddleware;