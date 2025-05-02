import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import RoutesList from './routes.jsx'; 
import { backend_url } from './config/app.js';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { addMedicineToCart } from './store/actions/cartActions.js';
import { loginUser } from './store/actions/userActions.js';
import LoadingOverlay from './components/Loading/LoadingOverlay.jsx';

const getCartItems = async (dispatch) => {
  try {

      const response = await fetch(`${backend_url}/api/cart`, {
          headers: {
              'Authorization': 'Bearer ' + Cookies.get('auth_token'),
          }
      });

      const responseData = await response.json();

      if (response.status === 401) {
          alert('Not Authorized')
      } else if (response.status === 200) {
          if (responseData.order) {
            responseData.order.medicines.forEach(item => {
              dispatch(addMedicineToCart(item))
            })
          }
      } else {
          console.log('Something went wrong! Could not load this data');
      }
  } catch (error) {
    console.log('Something went wrong! Could not load this data');
    console.log(error)
  }
}

const getUserDetails = async (dispatch) => {
  try {

      const response = await fetch(`${backend_url}/api/user`, {
          headers: {
              'Authorization': 'Bearer ' + Cookies.get('auth_token'),
          }
      });

      const responseData = await response.json();

      if (response.status === 401) {
          alert('Not Authorized')
      } else if (response.status === 200) {
          dispatch(loginUser(responseData.user))
      } else {
          console.log('Something went wrong! Could not load this data');
      }
  } catch (error) {
    console.log('Something went wrong! Could not load this data');
    console.log(error)
  }
}


function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        if (Cookies.get('auth_token')) {
          await getCartItems(dispatch);
          await getUserDetails(dispatch);
        }
        setLoading(false);
      };
  
      fetchUser();
    }, []);

    if (loading) {
      return <LoadingOverlay />
    }

  return(
    <div>
        <RoutesList />
    </div>
  )

}

export default App