import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import RoutesList from './routes.jsx'; 
import { backend_url } from './config/app.js';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { addMedicineToCart } from './store/actions/cartActions.js';

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
          responseData.order.medicines.forEach(item => {
              dispatch(addMedicineToCart(item))
          })
      } else {
          alert('Something went wrong! Could not load this data');
      }
  } catch (error) {
      console.log(error)
      alert('Something went wrong! Could not load this data');
  }
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      if (Cookies.get('auth_token')) {
        getCartItems(dispatch)
      }
    }, [])


  return(
    <div>
        <RoutesList />
    </div>
  )

}

export default App