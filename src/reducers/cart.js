import {
    saveFavoriteDb,
    findFavoriteDb,
    deleteFavoriteDb,
    saveCartDb
} from '../services/realm';

const stateInitial = findFavoriteDb() || [];

export default (state = stateInitial, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            saveFavoriteDb(action.payload);  
            return action.payload.map(item=>({...item,quantity:1}));
        case 'ADD_CART':
            console.log(action.payload)
            saveCartDb(action.payload);
            return [...state, action.payload];
        case 'REMOVE_CART':
            const newFavorites = state.filter(favorite => !action.payload.includes(favorite._id));
            deleteFavoriteDb(newFavorites);
            return newFavorites;
        case 'UPDATE_PRODUCT':
            const { payload, add } = action;
            const newState = state.reduce((accu, product) => {            
                if (product._id === payload) {
                    let quantity = add ? product.quantity+1 : product.quantity-1;
                    if(quantity<1) quantity=1;
                    const newProduct = {...product, quantity}
                    return [...accu, newProduct]
                } else {
                    return [...accu, product]
                }
            }, []);            
            return newState;
        case 'LOGOUT_USER':
            return [];
        default:
            return state;
    }
};