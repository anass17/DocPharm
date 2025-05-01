import { legacy_createStore as createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import favoriteReducer from './reducers/favoriteReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
});

const store = createStore(rootReducer);

export default store;