import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import Nav from './nav';
import loading from './loading';
import user from './user';
import cart from './cart';
import seller from './seller';
import garage from './garage';

export default createStore(combineReducers({
    navState: Nav,
    loading,
    user,
    seller,
    cart,
    garage,
}),applyMiddleware(thunk,promise))
