import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {

    const navigate = useNavigate()
    const user = useSelector(data => data.user.user);
    return (
        <Route
            {...rest}
            render={(props) =>
                user === null ? (
                    navigate('/login')
                ) : (
                    user.email_verified_at === null ? (
                        navigate('/verifyEmail')
                    ) : (
                        <Component {...props} />
                    )

                )
            }
        />
    );
};

export default AuthRoute;