import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/userActions";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { backend_url } from "../../config/app";
import { clearCart } from "../../store/actions/cartActions";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function removeToken() {
            const response = await fetch(backend_url + '/api/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });

            if (response.status === 200) {
                dispatch(logoutUser())
                dispatch(clearCart())
                Cookies.remove('auth_token');
                navigate('/login');
            }
        }

        removeToken()
    })
    

    return (
        <></>
    )
}