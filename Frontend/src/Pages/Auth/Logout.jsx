import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { backend_url } from "../../config/app";

export default function Logout() {
    // const [count, setCount] = useState(0)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(data => data.user.user)

    useEffect(() => {
        async function removeToken() {
            const response = await fetch(backend_url + '/api/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();

            if (response.status === 200) {
                dispatch(logoutUser())
                Cookies.remove('auth_token');
                navigate('/login');
            }
        }

        removeToken()
    })
    

    return (
        <>

        </>
    )
}