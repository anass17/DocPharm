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
                user !== null ? (
                <Component {...props} />
                ) : (
                    navigate('/login')
                )
            }
        />
    );
};

export default AuthRoute;